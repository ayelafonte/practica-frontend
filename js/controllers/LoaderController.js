import { loaderView } from "../views.js"
import PubSub from "../services/PubSub.js"

export default class LoaderController {

    constructor(element) {
        this.element = element
        this.element.innerHTML = loaderView()  // Obtiene la estructura html del loader

        // Suscribe a los eventos y actúa segun corresponda
        PubSub.subscribe(PubSub.events.SHOW_LOADING, () => {
            this.showLoader()
        })
        PubSub.subscribe(PubSub.events.HIDE_LOADING, () => {
            this.hideLoader()
        })        
    }

    hideLoader() {
        this.element.style.display = 'none' 
    }

    showLoader() {
        this.element.style.display = 'initial' 
    }
}