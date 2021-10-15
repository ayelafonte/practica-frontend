window.addEventListener('DOMContentLoaded', function() {

    // Controlador de mensaje de error
    const errorDiv = document.querySelector('.error-message')
    const errorMessageController = new ErrorMessageController(errorDiv)

    // coger el elemento del DOM (HTML) donde quiero cargar los tweets
    const tweetListDiv = document.querySelector('.tweet-list')

    // crear un controlador pasándole el elemento del DOM donde cargar los tweets
    const tweetListController = new TweetListController(tweetListDiv, errorMessageController)

    // decir al controlador que pinte los tweets
    tweetListController.renderTweets()

    const search = document.querySelector('#search')
    new SearchController(search)

})