import LoginController from "./controllers/LoginController.js"
import MessageController from "./controllers/MessageController.js"
import LoaderController from "./controllers/LoaderController.js"
import PubSub from "./services/PubSub.js"


window.addEventListener('DOMContentLoaded', function(){

    // Se selecciona el nodo del formulario
    const form = document.querySelector('form')

    // Se instancia el controlador del formulario
    new LoginController(form)

    // Se selecciona el nodo para mostrar mensajes de error
     const messages = document.querySelector('.message')

    // Se instancia el controlador de mensajes de error
     new MessageController(messages)

    // Se selecciona el nodo del loader
    const loaderDiv = document.querySelector('.loader')

    // Se instancia el controlador del loader
    new LoaderController(loaderDiv)

    // Ocultar el loader
    PubSub.publish(PubSub.events.HIDE_LOADING) 
   
})