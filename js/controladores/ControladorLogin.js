import DataService from "../servicios/DataService.js"
import PubSub from "../servicios/PubSub.js"

export default class ControladorLogin {

    constructor(element) {
        this.element = element
        this.attachEventListeners()
    }

    attachEventListeners() {
        // Envio de formulario para hacer login
        this.element.addEventListener('submit', async event => {
            event.preventDefault()

            if (this.element.checkValidity()) {
                // Login
                const data = new FormData(this.element)
                const username = data.get('username')  // Valor del input[name="username"]
                const password = data.get('password')  // Valor del input[name="password"]
                const url = new URLSearchParams(window.location.search)
                const next = url.get('next') || '/'
                try {
                    const result = await DataService.login(username, password)
                    location.href = next  // Se redirige al usuario al home
                } catch (error) {
                    PubSub.publish(PubSub.events.SHOW_ERROR, error)
                }
            } else {
                PubSub.publish(PubSub.events.SHOW_ERROR, 'Ambos campos son obligatorios')
            }
        })
    }

}