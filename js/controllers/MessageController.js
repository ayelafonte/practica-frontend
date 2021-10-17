import PubSub from "../services/PubSub.js"
import { errorView, successView } from "../views.js"

export default class MessageController {

    constructor(element) {
        this.element = element
        // Suscribimos el controlador a los eventos que nos interesan
        PubSub.subscribe(PubSub.events.SHOW_ERROR, error => {
            this.showError(error)
        })
        // Muestra mensajes de error
        PubSub.subscribe(PubSub.events.SHOW_SUCCESS, message => {
            this.showSuccess(message)
        })
    }
    // Oculta el mensaje al hacer click en cancelar
    attachCloseMessageEventListener() {
        const button = this.element.querySelector('button')
        button.addEventListener('click', () => {
            this.hideError()
        })
    }
    showError(message) {
        this.element.innerHTML = errorView(message)
        this.attachCloseMessageEventListener()
    }
    showSuccess(message) {
        this.element.innerHTML = successView(message)
        this.attachCloseMessageEventListener()
    }
    hideError() {
        this.element.innerHTML = ''
    }
}
