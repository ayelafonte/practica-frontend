

export default {

    // Se conectará al servidor (url), dará una orden (method) y enviará datos (body)
    request: async function (method, url, body) {
        const requestConfig = {
            method: method,
            headers: {
                'content-type': 'application/json' // usa json con el servidor para comunicarte
            },
            body: JSON.stringify(body) // datos como usuario y password que ha introducido el usuario
        }

        // El usuario debe estar autenticado para crear anuncios (token ok)
        if (this.isAuthenticated()) {
            const token = localStorage.getItem('AUTH_TOKEN')
            requestConfig.headers['Authorization'] = `Bearer ${token}`
        }

        const response = await fetch(url, requestConfig) // Conexión al servidor
        try {
            const data = await response.json();
            if (response.ok) {
                return data; // Se envían los datos del usuario registrados en sparrest.
            } else {
                throw new Error(data.message); // Por ej. error en el registro
            }
        } catch (error) {
            throw (error); // Por ej. no hay respuesta del servidor
        }
    },

    delete: async function (url, body = {}) { // body vacío
        return await this.request('DELETE', url, body)
    },

    post: async function (url, body) { // body con datos (user o passsword)
        return await this.request('POST', url, body)
    },
    put: async function(url, body) {
        return await this.request('PUT', url, body)
    },

    registerUser: async function (username, password) {
        const url = 'http://localhost:8000/auth/register' 
        return await this.post(url, { username, password })
    },

    login: async function (username, password) {
        const url = 'http://localhost:8000/auth/login'
        const data = await this.post(url, { username, password }) // Se guarda la respuesta enviada por el backend para acceder al token del usuario
        const token = data.accessToken // Se almacena el token 
        localStorage.setItem('AUTH_TOKEN', token) // Se introduce en el navegador permanentemente
    },
    isAuthenticated: function () { // Si hay token
        return localStorage.getItem('AUTH_TOKEN') !== null
    },

    parseAd: function (ad) { // Se obtiene la info del anuncio
        ad.name = ad.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        ad.type = ad.type
        ad.price = ad.price
        ad.photo = ad.photo//.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        ad.id = ad.id
        ad.tags = ad.tags
        ad.canBeDeleted = ad.userId === this.getAuthUserId() // Si es true el usuario registrado es el creador del anuncio.
        return ad
    },

    getAds: async function () {
        const url = 'http://localhost:8000/api/ads?expand=user'
        const response = await fetch(url)

        if (response.ok) { // El servidor responde correctamente
            const ads = await response.json() // Me devolverá los datos en JSON
            return ads.map(ad => this.parseAd(ad)) // Muestra los datos de cada anuncio
        } else {
            throw new Error('Error al recuperar los anuncios')
        }
    },

    getAdsDetail: async function(adID){
        const url = `http://localhost:8000/api/ads/${adID}?expand=user` // conectar con servidor
        const response = await fetch(url) 

        if (response.ok) { // El servidor responde correctamente
            const ad = await response.json() // Me devolverá los datos en JSON
            return this.parseAd(ad) // Evita que codigo malicioso
        } else {
            if (response.status === 404) {
                return null 
            } else {
                throw new Error('Algo salió mal. Error al cargar los anuncios') 
            }
        }
    },
    
    createAd: async function(name, type, price, photo, tags=[]) {
        const url ='http://localhost:8000/api/ads'
        return await this.post(url, {name, type, price, photo, tags})
    },

    deleteAd: async function(AdID) {
        const url = `http://localhost:8000/api/ads/${AdID}`
        return await this.delete(url)
    },

    getAuthUserId: function() { // Obtener el userID del token
        const token = localStorage.getItem('AUTH_TOKEN') // token almacenado en el navegador
        if (token === null) { 
            return null
        }
        const b64Part = token.split('.')
        if (b64Part.length !== 3) { // Debe tener 3 partes
            return null
        }
        const b64data = b64Part[1] // Obtener la parte del token con info del usuario
        try {
            const userJSON = atob(b64data) // Decodificador gratuito de https://www.base64decode.org/www.base64
            const user = JSON.parse(userJSON) // Pasar a JSON
            return user.userId // El resultado es id del usuario guardado en el token
        } catch(error) {
            console.error('Error while decoding JWT Token', error)
            return null
        }
    }
}