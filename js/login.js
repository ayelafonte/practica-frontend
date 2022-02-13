import LoginController from "./controllers/LoginController.js"
import MessageController from "./controllers/MessageController.js"
import LoaderController from "./controllers/LoaderController.js"
import PubSub from "./services/PubSub.js"


window.addEventListener('DOMContentLoaded', function(){

    
    const form = document.querySelector('form')

    
    new LoginController(form)

    
     const messages = document.querySelector('.message')

    
     new MessageController(messages)

    
    const loaderDiv = document.querySelector('.loader')

    
    new LoaderController(loaderDiv)

    
    PubSub.publish(PubSub.events.HIDE_LOADING) 
   
})