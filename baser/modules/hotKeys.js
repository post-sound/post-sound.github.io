//document.addEventListener('keydown', e => {
//    if (e.altKey && e.code === "KeyX") {
//        alert('Alt + X pressed!')
//        e.preventDefault()
//    }
//});

function hotKeyPressed(e, key, func) {
    if (e.altKey && e.code === key) {
        e.preventDefault()
        func(e)
    }
}

function addHotKey(key, func) {
    document.addEventListener('keydown', e => hotKeyPressed(e, key, func))
}

function addKey(key, func) {
    document.addEventListener('keyup', e => {
        if (e.code === key) {
            e.preventDefault()
            func(e)
        }
    })
}

function addKeyEl(element, key, func) {
    element.addEventListener('keyup', e => {
        if (e.code === key) {
            e.preventDefault()
            func(e)
        }
    })
}

document.addEventListener('keyup', e => {
    if (e.key == 'Alt') {
        e.preventDefault()
    }
})