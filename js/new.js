import AdsFormController from "./controllers/AdsFormController.js"
import MessageController from "./controllers/MessageController.js"
import DataServices from "./services/DataServices.js"
import LoaderController from './controllers/LoaderController.js'
import PubSub from "./services/PubSub.js"

window.addEventListener('DOMContentLoaded', function () {

    // Si el token no está autorizado no tiene acceso a crear anuncios
    if (DataServices.isAuthenticated() === false) { 
        window.location.href = '/login.html?next=/new.html' // Redirige a la pág de login y luego a "new.html"
    }

    // Seleccionamos el nodo del formulario
    const form = document.querySelector('form')

    // Instancia el controlador del formulario
    new AdsFormController(form)

    // Instancia el controlador de mensajes
    const messages = document.querySelector('.message');
    new MessageController(messages)

    // Controlador del loader
    const loaderDiv = document.querySelector('.loader')
    new LoaderController(loaderDiv)
    PubSub.publish(PubSub.events.HIDE_LOADING)
})