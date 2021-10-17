import DataService from "../services/DataService.js"
import PubSub from "../services/PubSub.js"

export default class SignupController {

    constructor(element) {
        this.element = element  // <form> de HTML
        this.attachEventListeners() // Añade manejador de evento
    }

    checkIfAllPasswordsAreEqual() {
        // Guardo las contraseñas de los inputs del form
        const inputsPassword = this.element.querySelectorAll('input[type="password"]')

        let passwords = []
        for (const input of inputsPassword) {
            if (passwords.includes(input.value) === false) {
                passwords.push(input.value)
            }
        }

        if (passwords.length == 1) { // Las contraseñas coinciden
            for (const input of inputsPassword) {
                input.setCustomValidity('') // Envía un mensaje vacío
            }
        } else {
            for (const input of inputsPassword) {
                input.setCustomValidity('Las contraseñas no coinciden. Intenta de nuevo') // Envía un mensaje de error
            }
        }

    }

    attachEventListeners() {

        // Validación general del formulario (campos llenos)
        this.element.addEventListener('submit', async function(event) {
            
            // Evitamos que el formulario se envíe por defecto
            event.preventDefault()
            
            // Se comprueba que los campos del formulario se validan
            if (this.checkValidity()) { // this es form
                try {
                    const data = new FormData(this) // Formulario con los datos
                    const username = data.get('username')  // Valor del input[name="username"]
                    const password = data.get('password')  // Valor del input[name="password"]
                    const result = await DataService.registerUser(username, password) // Registra nuevo usuario
                    PubSub.publish(PubSub.events.SHOW_SUCCESS, 'Registrado correctamente')
                    window.location.href = './index.html' // Redirige al usuario al Inicio
                } catch (error) {
                    PubSub.publish(PubSub.events.SHOW_ERROR, error) // Publica el error para "avisar" a otros controladores
                }
            } else {
                // Si no hay validación, se muestra un mensaje de error
                let errorMessage = ''
                for (const element of this.elements) { // elements = componentes del form
                    if (element.validity.valid === false) {
                        errorMessage += `Error en el campo ${element.name}: ${element.validationMessage}. `
                    }
                }
                PubSub.publish(PubSub.events.SHOW_ERROR, errorMessage)
            }

        })
        
        // Establecer la validación personalizada de los input de tipo password
        this.element.querySelectorAll('input[type="password"]').forEach(input => {
            input.addEventListener('input', () => {
               this.checkIfAllPasswordsAreEqual()
            })
        })

        // Se controlan los cambios en cada uno de los inputs y se activa el botón cuando se valida el formulario
        this.element.querySelectorAll('input').forEach(inputElement => {
            // Para cada input del formulario
            inputElement.addEventListener('input', () => {
                // Cada vez que el usuario escriba se comprobará la validación
                if (this.element.checkValidity()) {
                    // Si el formulario esta ok, se habilita el botón
                    this.element.querySelector('button').removeAttribute('disabled')
                } else {
                    // Si no lo está se deshabilita el botón
                    this.element.querySelector('button').setAttribute('disabled', true)
                }
            })
        })

    }

}
