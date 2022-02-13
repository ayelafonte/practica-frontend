import { adView } from '../views.js'
import DataServices from '../services/DataServices.js'
import PubSub from '../services/PubSub.js'

export default class AdsListController {

    constructor(element, messageController) {
        this.element = element 
        this.messageController = messageController

    }

    async renderAds() {
        PubSub.publish(PubSub.events.SHOW_LOADING) 
        try {
            
            const ads = await DataServices.getAds()
            
            if (ads.length === 0) {
                PubSub.publish(PubSub.events.SHOW_ALERT, 'No hay anuncios para mostrar') 
            } else {
                
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