getFile('./data/albums.json')

const openFormBtn = document.querySelector('.addElementBtn')
const formBlock = document.querySelector('.main-form')
const cancelArea = document.querySelector('.cancelArea')
const expandArea = document.querySelector('.expandArea')
const cancel = document.querySelector('.cancel')
const contextMenuElem = document.querySelector('.context-menu')
const contextDisabledArea = document.querySelector('.context-disabled')

openFormBtn.addEventListener('click', expForm)
cancelArea.addEventListener('click', clpForm)
expandArea.addEventListener('click', expForm)
cancel.addEventListener('click', closeForm)

addHotKey('KeyA', expForm)
addHotKey('KeyQ', closeForm)
addKey('Escape', clpForm)





let expanded = false
let closed = true


function clpForm() {
    if (closed) return
    if (!expanded) {
        expForm()
        return
    }
    disabledOn()
    formBlock.style.bottom = 'calc(-100vh + 130px)'
    cancelArea.style.display = 'none'
    expandArea.style.display = 'flex'
    expanded = false
}

function expForm(e) {
    disabledOff()
    coverInp.focus()
    
    resizeTrackList()
    
    formBlock.style.bottom = '-17px'
    cancelArea.style.display = 'block'
    expandArea.style.display = 'none'
    expanded = true
    closed = false
}

function closeForm() {
    if (!clearForm(true)) return
    disabledOn()
    formBlock.style.bottom = 'calc(-100vh)'
    cancelArea.style.display = 'none'
    expanded = false
    closed = true
}

window.addEventListener('resize', resizeTrackList)

function resizeTrackList() {
    formBlock.querySelector('.tempTrackList').style.height = formBlock.clientHeight - 380 + 'px'
}

const tabElems = document.querySelectorAll('[tabindex]')
function setEventEnter() {
    let event = new Event('click'),
        i = 0
    while (i < tabElems.length) {
        let elem = tabElems[i]
        tabElems[i].addEventListener('keyup', e => {
            if (e.code != 'Enter' || e.ctrlKey) return
            elem.dispatchEvent(event)
//            console.log(elem)
        })
        i++
    }
}
setEventEnter()

const disElem = formBlock.querySelectorAll('[tabindex]')
function disabledOn() {
    let i = 0
    while (i < disElem.length) {
        disElem[i].setAttribute('disabled', '')
        disElem[i].setAttribute('tabindex', '-1')
        i++
    }
}
disabledOn()

function disabledOff() {
    let i = 0
    while (i < disElem.length) {
        disElem[i].removeAttribute('disabled')
        disElem[i].setAttribute('tabindex', '1')
        i++
    }
}


contextMenuElem.addEventListener('click', e => {
    let ElemId = contextMenuElem.getAttribute('data-id')
    let handlerType = e.target.id
    
    if (handlerType == 'edit') {
        console.log(`${handlerType} ${ElemId} (Функция в разработке)`)
        return
    }
    if (handlerType == 'del') {
        if (confirm('Подтвердите удаление элемента...')) removeGlobalElement(ElemId)
        return
    }
})

function removeGlobalElement(id) {
    let renderElement = document.querySelector(`.table-item[data-id="${id}"]`)
    let dataElement = data[id]

    eel.removeFile('./data/cover/1000/' + dataElement.coverFileName)
    eel.removeFile('./data/cover/350/' + dataElement.coverFileName)
    eel.removeFile('./data/cover/60/' + dataElement.coverFileName)
    
    dataElement.list.forEach(track => {
        eel.removeFile('./data/audio/' + track.audioFileName)
    })
    
    data.splice(id, 1)
    eel.jsonWriter(JSON.stringify(data, null, 2))
    
    renderElement.remove()
    disabledContext()
}





