export function adView(ad) {
    if (ad.photo === "") {
        ad.photo = "no_image.png"
    }

    let property = ''
    if (ad.canBeDeleted) {
        property = '<h4 class="property-p"> Este anuncio fue creado por ti </h4>'
    }

    return `<div class = "ad-container">
        <a href="/detail.html?id=${ad.id}">
        ${property}
        <div class="ad-img-container">
        <img id="ad-photo" src="${ad.photo}" alt="ad-photo">
        </div>
        <div class="ad-text-container">
        <strong class="price"> ${ad.price}€ </strong>
        <p class="name">${ad.name}</p>
        <p class="type"> ${ad.type} </p>
        </div>
        </a>
    </div>`
}

// html para el mensaje de error
export function errorView(message) {
    return `<div class='error'> 
        ${message}
        <button>X</button>
    </div>`
}

//  html para el mensaje de éxito
export function successView(message) {
    return `<div class='success'> 
    ${message}
    <button>X</button>
</div>`
}

// html del loader
export function loaderView() {
    return '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
}

// html para el mensaje de WARNING
export function warningView(message) {
    return `<div class='warning'> 
    ${message}
    <button>X</button>
</div>`
}


// html del detalle del anuncio
export function adDetailView(ad) {
    if (ad === null) {
        return '<h1> El anuncio no existe.</h1>'
    }
    
    let button = ''
    if (ad.canBeDeleted) {
        button = '<button class="delete" id="delete-btn"> Borrar </button>'
    }

    if (ad.photo === "") {
        ad.photo = "no_image.png"
    }
    
    return `<div class="ad-img-container">
                <img src="${ad.photo}" alt="ad-photo">
            </div>
            <br>
            <div class="ad-detail-text-container">
                <p class="price"> Price: ${ad.price}€ </p>
                <p class="name"> Description: ${ad.name}</p>
                <p class="type"> What's it for?: ${ad.type} </p>
                <p class="tags"> Tags: ${ad.tags} </p>
            </div>
            <br>
            ${button}`
}