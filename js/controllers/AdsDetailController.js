import DataService from "../services/DataServices.js"
import PubSub from "../services/PubSub.js"
import { adDetailView } from "../views.js"

export default class AdsDetailController {

    constructor(element, adID) {
        this.element = element 
        this.loadAd(adID) 
    }

    async loadAd(adID) {
        PubSub.publish(PubSub.events.SHOW_LOADING) 
        
        try { 
            const ad = await DataService.getAdsDetail(adID) 
            this.element.innerHTML = adDetailView(ad) 
           
            this.addDeleteButtonEventListener(ad)
        } catch (error) {
            PubSub.publish(PubSub.events.SHOW_ERROR, error)
        } finally {
            PubSub.publish(PubSub.events.HIDE_LOADING) 
        }
    }

    addDeleteButtonEventListener(ad) {
        
        const button = this.element.querySelector('button')
        
        if (button) {
            button.addEventListener('click', async () => {
                const answer = confirm('¿Estás seguro de borrar el anuncio?')
                if (answer === true) {
                    PubSub.publish(PubSub.events.SHOW_LOADING) 
                    button.setAttribute('disabled', 'disabled') 
                    try {
                        await DataServices.deleteAd(ad.id) 
                        PubSub.publish(PubSub.events.SHOW_SUCCESS, 'Anuncio eliminado')
                        setTimeout( function() {
                            window.location.href = '/index.html' 
                        }, 2000)
                        
                    } catch(error) {
                        PubSub.publish(PubSub.events.SHOW_ERROR, error)
                        button.removeAttribute('disabled') 
                    } finally {
                        PubSub.publish(PubSub.events.HIDE_LOADING) 
                    }
                }
            })
        }
    }
}