import LoginController from "./controladores/ControladorLogin"
import MessageController from "./controladores/ControladorMensajeError"

window.addEventListener('DOMContentLoaded', function(){

    // Seleccionamos el nodo del formulario
    const form = document.querySelector('form')

    // Se crea una instancia del controlador del formulario
    new ControladorLogin(form)

    // Se selecciona el nodo para mostrar mensajes de error
    const mensajes = document.querySelector('.mensaje-error')

    // Se crea una instancia del controlador del mensaje de error
    new MensajesControlador(mensajes)

})