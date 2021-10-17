import SignupController from "./controllers/SignupController.js"
import MessageController from "./controllers/MessageController.js"
import LoaderController from "./controllers/LoaderController.js"
import PubSub from "./services/PubSub.js"

window.addEventListener('DOMContentLoaded', function(){

    // Se selecciona el nodo del formulario
    const form = document.querySelector('form')

    // Se crea una instancia del controlador con el formulario
    new SignupController(form)

    // Se selecciona el nodo para mostrar mensajes de error
    const messages = document.querySelector('.message')

    // Se crea una instancia del controlador de mensaje de error
    new MessageController(messages)

    // Se selecciona el nodo del loader 
    const loaderDiv = document.querySelector('.loader')
    
    // Se crea una instancia del controlador del loader
    new LoaderController(loaderDiv)

    // Se oculta el loader
    PubSub.publish(PubSub.events.HIDE_LOADING) 

})
