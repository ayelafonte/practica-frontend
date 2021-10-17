import MessageController from './controllers/MessageController.js'
import LoaderController from './controllers/LoaderController.js'
import AdsListController from './controllers/AdsListController.js'
import SearchController from './controllers/SearchController.js'



window.addEventListener('DOMContentLoaded', function() {

    // Controlador de mensaje de error
    const messages = document.querySelector('.message')
    new MessageController(messages)

    // Controlador del loader
    const loaderDiv = document.querySelector('.loader')
    new LoaderController(loaderDiv)

    // Controlador de la lista de anuncios
    const adsListDiv = document.querySelector('.ads-list') // Selecciona el elemento del DOM (HTML) donde quiero cargar los anuncios
    const adsListController = new AdsListController(tweetListDiv, errorMessageController) // Instancia controlador pasándole el elemento del DOM donde cargar los anuncios
    adsListController.renderAds() // Renderiza los anuncios

    // Controlador del buscador
    const search = document.querySelector('#search')
    new SearchController(search)

})