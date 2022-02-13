import PubSub from "../services/PubSub.js"
import DataServices from "../services/DataServices.js"

export default class AdFormController{

    constructor(element) {
        this. element = element 
        this.attachEventListener()
    }

    attachEventListener() {
        this.element.addEventListener('submit', async (event) => {
            event.preventDefault()
            PubSub.publish(PubSub.events.SHOW_LOADING)

            if (this.element.checkValidity()) {
                const data = new FormData(this.element) 
                const name = data.get('name')
                const type = data.get('type')
                const price = Number(data.get('price'))
                const photo = data.get('photo')
                const tags = data.getAll('tags')

                try {
                    
                    const result = await DataServices.createAd(name, type, price, photo, tags);
                    
                    PubSub.publish(PubSub.events.SHOW_SUCCESS, 'Se ha creado el anuncio correctamente')
                } catch (error) {
                    PubSub.publish(PubSub.events.SHOW_ERROR, error) 
                } finally {
                    PubSub.publish(PubSub.events.HIDE_LOADING)
                }
            } else {
                PubSub.publish(PubSub.events.HIDE_LOADING)
                PubSub.publish(PubSub.events.SHOW_ERROR, 'Compruebe que todos los campos esten completos')
            }
        })
    }
}
