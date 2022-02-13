import DataService from "../services/DataService.js"
import PubSub from "../services/PubSub.js"

export default class LoginController {

    constructor(element) {
        this.element = element // Formulario del html
        this.attachEventListeners() // Maneja evento 'submit'
    }

    attachEventListeners() {
        // Envio de formulario para hacer login
        this.element.addEventListener('submit', async event => {
            event.preventDefault() // Desactiva comportamiento por defecto del formulario

            if (this.element.checkValidity()) {
                // Login
                const data = new FormData(this.element) // Formulario con los datos
                const username = data.get('Usuario')  // Valor del input[name="username"]
                const password = data.get('Contraseña')  // Valor del input[name="password"]
                const url = new URLSearchParams(window.location.search) // url con parámetro 'next' redirige a otra página luego del login
                const next = url.get('next') || '/'
                try {
                    PubSub.publish(PubSub.events.SHOW_LOADING) // Muestra loader
                    const result = await DataService.login(username, password)
                    PubSub.publish(PubSub.events.SHOW_SUCCESS, `Bienvenido ${username} a NodePop`)
                    location.href = next  // Se redirige al usuario al home
                } catch (error) {
                    PubSub.publish(PubSub.events.SHOW_ERROR, error)
                } finally {
                    PubSub.publish(PubSub.events.HIDE_LOADING) // Oculta el loader
                }
            } else {
                PubSub.publish(PubSub.events.SHOW_ERROR, 'Ambos campos son obligatorios')
            }
        })
    }

}