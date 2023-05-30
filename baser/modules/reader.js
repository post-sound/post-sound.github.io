let data

getFile('./data/albums.json')

function loadContent() {
    
}

function getFile(path) {
    let request = new XMLHttpRequest()
    request.open('GET', path)
    request.onloadend = e => {
        parse(request.responseText)
    }
    request.send()
}

function parse(obj) {
    data = JSON.parse(obj)
    loadContent()
}