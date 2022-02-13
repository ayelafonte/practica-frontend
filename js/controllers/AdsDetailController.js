import DataService from "../services/DataServices.js"
import PubSub from "../services/PubSub.js"
import { adDetailView } from "../views.js"

export default class AdsDetailController {

    constructor(element, adID) {
        this.element = element 
        this.loadAd(adID) // Obtengo los datos del anuncio
    }

    async loadAd(adID) {
        PubSub.publish(PubSub.events.SHOW_LOADING) // Muestra el loader
        // Obtener datos del anuncio
        try { 
            const ad = await DataService.getAdsDetail(adID) // Se pide al servidor los detalles del anuncio
            this.element.innerHTML = adDetailView(ad) // Muestra detalles
            // Si el token está autenticado se añade manejador de eventos al boton delete
            this.addDeleteButtonEventListener(ad)
        } catch (error) {
            PubSub.publish(PubSub.events.SHOW_ERROR, error)
        } finally {
            PubSub.publish(PubSub.events.HIDE_LOADING) // Oculta el loader
        }
    }

    addDeleteButtonEventListener(ad) {
        // Se selecciona el botón
        const button = this.element.querySelector('button')
        // El botón solo se muestra si el usuario es el que creó el anuncio 
        if (button) {
            button.addEventListener('click', async () => {
                const answer = confirm('¿Estás seguro de borrar el anuncio?')
                if (answer === true) {
                    PubSub.publish(PubSub.events.SHOW_LOADING) 
                    button.setAttribute('disabled', 'disabled') // Desactiva el botón después de hacer click
                    try {
                        await DataServices.deleteAd(ad.id) // Elimina del dataservice pasandole el id 
                        PubSub.publish(PubSub.events.SHOW_SUCCESS, 'Anuncio eliminado')
                        setTimeout( function() {
                            window.location.href = '/index.html' 
                        }, 2000)
                        
                    } catch(error) {
                        PubSub.publish(PubSub.events.SHOW_ERROR, error)
                        button.removeAttribute('disabled') // Se vuelve a activar el botón
                    } finally {
                        PubSub.publish(PubSub.events.HIDE_LOADING) 
                    }
                }
            })
        }
    }
}