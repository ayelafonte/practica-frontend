import LoaderController from "./controllers/LoaderController.js"
import MessageController from "./controllers/MessageController.js"
import AdsDetailController from "./controllers/AdsDetailController.js"
import LoginController from "./controllers/LoginController.js"


window.addEventListener('DOMContentLoaded', function() {

    // Controlador de mensajes
    const messagesDiv = document.querySelector('.messages')
    new MessageController(messagesDiv)

    // Contralador del loader
    const loaderDiv = document.querySelector('.loader')
    new LoaderController(loaderDiv)

    // Controlador del login
    const form = document.querySelector('.login')
    new LoginController(form)

    // Se obtiene el ID del anuncio de la URL
    const id = new URLSearchParams(window.location.search).get('id')
    
    // Controlador del detalle del anuncio
    const adDiv = document.querySelector('.ad')
    new AdsDetailController(adDiv, id)

})
