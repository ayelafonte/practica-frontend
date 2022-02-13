

export default {

    
    request: async function (method, url, body) {
        const requestConfig = {
            method: method,
            headers: {
                'content-type': 'application/json' 
            },
            body: JSON.stringify(body) 
        }

        
        if (this.isAuthenticated()) {
            const token = localStorage.getItem('AUTH_TOKEN')
            requestConfig.headers['Authorization'] = `Bearer ${token}`
        }

        const response = await fetch(url, requestConfig) 
        try {
            const data = await response.json();
            if (response.ok) {
                return data; 
            } else {
                throw new Error(data.message); 
            }
        } catch (error) {
            throw (error); 
        }
    },

    delete: async function (url, body = {}) { 
        return await this.request('DELETE', url, body)
    },

    post: async function (url, body) { 
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
        const data = await this.post(url, { username, password }) 
        const token = data.accessToken  
        localStorage.setItem('AUTH_TOKEN', token) 
    },
    isAuthenticated: function () { 
        return localStorage.getItem('AUTH_TOKEN') !== null
    },

    parseAd: function (ad) { 
        ad.name = ad.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        ad.type = ad.type
        ad.price = ad.price
        ad.photo = ad.photo
        ad.id = ad.id
        ad.tags = ad.tags
        ad.canBeDeleted = ad.userId === this.getAuthUserId() 
    },

    getAds: async function () {
        const url = 'http://localhost:8000/api/ads?expand=user'
        const response = await fetch(url)

        if (response.ok) { 
            const ads = await response.json() 
            return ads.map(ad => this.parseAd(ad)) 
        } else {
            throw new Error('Error al recuperar los anuncios')
        }
    },

    getAdsDetail: async function(adID){
        const url = `http://localhost:8000/api/ads/${adID}?expand=user` 
        const response = await fetch(url) 

        if (response.ok) { 
            const ad = await response.json() 
            return this.parseAd(ad) 
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

    getAuthUserId: function() { 
        const token = localStorage.getItem('AUTH_TOKEN') 
        if (token === null) { 
            return null
        }
        const b64Part = token.split('.')
        if (b64Part.length !== 3) { 
            return null
        }
        const b64data = b64Part[1] 
        try {
            const userJSON = atob(b64data) 
            const user = JSON.parse(userJSON) 
            return user.userId 
        } catch(error) {
            console.error('Error while decoding JWT Token', error)
            return null
        }
    }
}