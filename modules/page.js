getFile("./baser/data/albums.json");
const page = document.querySelector('.page');

//json onload render
function render() {
    createMethods()
    renderItems("all")
    tabSwithHandler('release-type', hideItems)
    tabSwithHandler('content', changeContent)
}

//tabs change render
function renderItems(type) {
    page.innerHTML = '';
    data.forEach((item, i, arr) => {
        if (type == item.type) {
            renderItem(item)
            return
        }
        if (type == 'all') {
            renderItem(item)
            return
        }
    })
    
    data.forEach((item, i, arr) => {
        if (type == item.type) {
            renderItem(item)
            return
        }
        if (type == 'all') {
            renderItem(item)
            return
        }
    })
}

function hideItems(type) {
    let items = Array.from(page.children)
    
    items.forEach((item) => {
        let itemId = item.getAttribute('data-id')
        let itemObj = data.searchById(Number(itemId))
        let itemType = itemObj.type
        
        if (type == 'all') {
            item.style.display = 'block'
            return
        }
        
        if (itemType == type) {
            item.style.display = 'block'
        }
        
        if (itemType != type) {
            item.style.display = 'none'
        }
    })
}

function renderItem(dataItem) {
    page.insertAdjacentHTML('afterBegin', widgets.card.rel.type1(dataItem))
}

function changeContent(val) {
    let contents = Array.from(document.querySelectorAll('[data-content]'))
    
    contents.forEach(item => {
        if (item.getAttribute('data-content') != val) {
            item.style.display = 'none'
        }
        if (item.getAttribute('data-content') == val) {
            item.style.display = 'flex'
            loadContent(val, item)
        }
    })
}

function loadContent(val, contentBlock) {
    if (val == 'arts') {
        if (contentBlock.getAttribute('is-load')) return
        
        autoCreateArtists().forEach(item => {
            contentBlock.insertAdjacentHTML(
                'afterBegin',
                widgets.carusel.art.allRels(item)
            )  
        })
        contentBlock.setAttribute('is-load', true)
    }
}