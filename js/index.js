import MessageController from './controllers/MessageController.js'
import LoaderController from './controllers/LoaderController.js'
import AdsListController from './controllers/AdsListController.js'
import SearchController from './controllers/SearchController.js'



window.addEventListener('DOMContentLoaded', function() {

    
    const messages = document.querySelector('.message')
    new MessageController(messages)

    
    const loaderDiv = document.querySelector('.loader')
    new LoaderController(loaderDiv)

    
    const adsListDiv = document.querySelector('.ads-list') 
    const adsListController = new AdsListController(adsListDiv) 
    adsListController.renderAds() 

  
    const search = document.querySelector('#search')
    new SearchController(search)

})