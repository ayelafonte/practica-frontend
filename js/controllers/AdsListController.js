import { adView } from '../views.js'
import DataServices from '../services/DataServices.js'
import PubSub from '../services/PubSub.js'

export default class AdsListController {

    constructor(element, messageController) {
        this.element = element //element class = ads-list
        this.messageController = messageController

    }

    async renderAds() {
        PubSub.publish(PubSub.events.SHOW_LOADING) // Muestra el loader
        try {
            // Obtiene los datos
            const ads = await DataServices.getAds()
            // Si no hay anuncios para mostrar
            if (ads.length === 0) {
                PubSub.publish(PubSub.events.SHOW_ALERT, 'No hay anuncios para mostrar') 
            } else {
                // Muestra cada anuncio en una lista
                for (const ad of ads) {
                    const adElement = document.createElement('li')
                    adElement.innerHTML = adView(ad)
                    this.element.appendChild(adElement)
                }
            }
        } catch (error) {
            PubSub.publish(PubSub.events.SHOW_ERROR, error)
        } finally {
            PubSub.publish(PubSub.events.HIDE_LOADING)
        }
    }
}