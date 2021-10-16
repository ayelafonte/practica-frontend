import SignupController from "./controladores/ControladorSignup.js"
import MessageController from "./controladores/ControladorMensaje.js"

window.addEventListener('DOMContentLoaded', function(){

    // Seleccionamos el nodo del formulario
    const form = document.querySelector('form')

    // Se crea una instancia del controlador con el formulario
    new ControladorSignup(form)

    // Se selecciona el nodo para mostrar mensajes de error
    const mensajes = document.querySelector('.mensaje-error')

    // Se crea una instancia del mensaje de error
    new ControladorMensaje(mensajes)

})
