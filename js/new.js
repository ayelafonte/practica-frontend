import AdsFormController from "./controllers/AdsFormController.js"
import MessageController from "./controllers/MessageController.js"
import DataServices from "./services/DataServices.js"
import LoaderController from './controllers/LoaderController.js'
import PubSub from "./services/PubSub.js"

window.addEventListener('DOMContentLoaded', function () {

    
    if (DataServices.isAuthenticated() === false) { 
        window.location.href = '/login.html?next=/new.html' 
    }

    
    const form = document.querySelector('form')

    
    new AdsFormController(form)

    
    const messages = document.querySelector('.message');
    new MessageController(messages)

    
    const loaderDiv = document.querySelector('.loader')
    new LoaderController(loaderDiv)
    PubSub.publish(PubSub.events.HIDE_LOADING)
})