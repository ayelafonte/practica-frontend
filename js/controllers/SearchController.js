const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export default class SearchController {

    constructor(element) {
        this.element = element
        this.attachEventListeners()
    }

    attachEventListeners() {
        this.element.addEventListener('input', debounce(() => {
            console.log('PUBLISH', 'SEARCH', this.element.value)
        }, 1000))
    }

}
