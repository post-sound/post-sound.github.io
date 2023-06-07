const coverInp = document.querySelector('.cover-prew')
const clearBtn = document.querySelector('.clear-form')
const prewImage = document.querySelector('.prew-image')
const fileDataOutput = document.querySelector('.file-data span')
const audioInp = document.querySelector('.trackFileInp')
const addTrackBt = document.querySelector('.addTrackBt')
const tempTrackListBox = document.querySelector('.tempTrackList')
const pushFormBtn = document.querySelector('.push-form')

const inputs = document.querySelectorAll('.textInp input')
const trackInp = document.querySelector('#trackNameInp')

let savedFiles = {images: [], audio: [], indexes: []}
let formData = {}
let trackData = []
let trackItems = []
let pushData
let newGlobalData

coverInp.addEventListener('click', e => {
    eel.openCover()(addPath)
})

clearBtn.addEventListener('click', () => {
    clearForm(true)
})

audioInp.addEventListener('click', e => {
    eel.openAudio()(fileSelect)
})

addTrackBt.addEventListener('click', e => {
    addTrack()
})

pushFormBtn.addEventListener('click', e => {
    if (!checkForm()) {
        alert('Не все поля заполнены или не добавлено не одной композиции')
        return
    }
    pushForm()
})

function pushForm() {
    statusUpdate('Обработка формы...')
    disabledOn();
    document.querySelector('.loader-box').style.display = 'block';
    pushData = {
        id: data.length,
        title: formData.titleAlbInp,
        artist: formData.artInp,
        type: formData.typeInp,
        date: formData.dateInp,
        list: []
    }
    
    savedFiles.indexes[savedFiles.indexes.length] = data.length - 1
    
    let titleCover = `${formData.artInp}-${formData.titleAlbInp}-${formData.dateInp}`
    eel.saveImage(formData.coverSrc, `${titleCover}.jpg`)(() => {
        let arrLength = savedFiles.images.length
        savedFiles.images[arrLength] = `${titleCover}.jpg`
        statusUpdate(`${titleCover}.jpg saved (1000, 350, 60)`)
    })
    
    let i = 0
    while (i < trackData.length) {
        let arrLength = pushData.list.length,
            dur = 0,
            title = trackData[i].title
//            loadEnd = new Event('loadEnd')
        
        let titleAudio = `${formData.artInp}-${title}-${formData.dateInp}`
        eel.saveAudio(trackData[i].src, titleAudio)(returnData => {
            
            let arrLength = savedFiles.audio.length
            savedFiles.audio[arrLength] = titleAudio + returnData[1]
            
            pushData.list[pushData.list.length] = {
                index: pushData.list.length,
                title: title,
                duration: returnData[0]
            }
            statusUpdate(`${titleAudio + returnData[1]} saved   [${pushData.list.length} из ${trackData.length}]`)
            if (pushData.list.length === trackData.length) loadEnded()
        })
        i++
    }
    

}

function loadEnded() {
    statusUpdate('Обновление JSON...')
    newGlobalData = data
    newGlobalData[newGlobalData.length] = pushData
    eel.jsonWriter(JSON.stringify(newGlobalData, null, 2))(() => {
        getFile('./data/albums.json')
        clearForm(false)
        pushData = {}
        newGlobalData = null
        statusUpdate('Успешно добавлено')
        disabledOff()
        document.querySelector('.loader-box').style.display = 'none';
        renderTableItem(data[data.length - 1])
        clpForm()
    })
}

function addTrack() {
    let isName = formData.trackNameInp == undefined || formData.trackNameInp == '' || formData.trackNameInp == '_NULL_'
    let isFile = formData.lastAudio == undefined || formData.lastAudio == '' || formData.lastAudio == '_NULL_'
    if (isName || isFile) return
    
    trackData[trackData.length] = {
        index: trackData.length,
        title: formData.trackNameInp,
        src: formData.lastAudio
    }
   
    formData.addedTracks = trackData.length
    formData.trackNameInp = '_NULL_'
    formData.lastAudio = '_NULL_'
    trackInp.value = ''
    audioInp.innerHTML = 'Выберите файл'
    audioInp.setAttribute('title', 'Audio')
    console.table(trackData)
    
    renderTracks()
}

function renderTracks() {
    let elem = document.createElement('div')
    elem.classList.add('tempTrackItem')
    elem.insertAdjacentHTML('beforeend', `
        <div class="temp-track-index">${trackData[trackData.length - 1].index + 1}</div>
        <div class="temp-track-title">${trackData[trackData.length - 1].title}</div>
        <div class="temp-track-file">${trackData[trackData.length - 1].src}</div>
        <div class="delete-temp-item">
            <div class="delete-temp-ico">
                <svg>
                    <use xlink:href="#clear"></use>
                </svg>
            </div>
        </div>
    `)
    trackItems[trackItems.length] = elem
    tempTrackListBox.appendChild(elem)
}

function clearTracksBox() {
    let i = 0
    while (i < trackItems.length) {
//        console.log(trackItems[i])
        trackItems[i].remove()
        i++
    }
}



function inputChanged() {
    let i = 0
    while (i < inputs.length) {
        let input = inputs[i],
            id = input.getAttribute('id')
        input.addEventListener('input', e => {
            formData[id] = input.value
        })
        addKeyEl(input, 'Enter', e => {
            console.table(formData)
        })
        i++
    }
}
inputChanged()

function inputsClear() {
    let i = 0,
        event = new Event('input')
    while (i < inputs.length) {
        let input = inputs[i]
        input.value = ''
        input.dispatchEvent(event)
        i++
    }
}


function checkInps() {
    let i = 0
    while (i < Object.keys(formData).length) {
        if (formData[Object.keys(formData)[i]] != '') return true
        i++
    }
    return false
}

function checkForm() {
    if (Object.keys(formData).length != 8) return false
    let i = 0
    while (i < Object.keys(formData).length) {
        if (formData[Object.keys(formData)[i]] == '') return false
        i++
    }
    return true
}

function clearForm(is) {
    if (checkInps() && is) {
        if (!confirm('Стереть данные формы?')) return false
    }
    coverInp.classList.remove('changed')
    prewImage.style.backgroundImage = null
    coverInp.setAttribute('title', 'Выберите файл...')
    audioInp.innerHTML = 'Выберите файл'
    audioInp.setAttribute('title', 'Audio')
    
    inputsClear()
    clearTracksBox()
    formData = {}
    trackData = []
    eel.resetForm()()
    return true
}

function addPath(fileName) {
    if (fileName == 0) return
    formData.coverSrc = fileName
    if (!coverInp.classList.contains('changed')) coverInp.classList.add('changed')
    prewImage.style.backgroundImage = 'url(../temp/covers/' + fileName + ')'
    fileDataOutput.innerHTML = fileName
    coverInp.setAttribute('title', fileName)
    console.table(formData)
}

function fileSelect(fileName) {
    if (fileName == 0) return
    formData.lastAudio = fileName

    audioInp.innerHTML = fileName
    audioInp.setAttribute('title', fileName)
    
    addTrackBt.focus()
    console.table(formData)
}


function removeChange() {
    let i = 0
    while (i < savedFiles.images.length) {
        eel.removeFile('./data/cover/1000/' + savedFiles.images[i])
        eel.removeFile('./data/cover/350/' + savedFiles.images[i])
        eel.removeFile('./data/cover/60/' + savedFiles.images[i])
        i++
    }
    let e = 0
    while (e < savedFiles.audio.length) {
        eel.removeFile('./data/audio/' + savedFiles.audio[e])
        e++
    }
    data.splice(savedFiles.indexes[0] + 1, savedFiles.indexes.length)
    eel.jsonWriter(JSON.stringify(data, null, 2))(() => {
        console.log('%cИзменения текущего сеанса отменены', 'color: #1bdd1b')
        savedFiles = {images: [], audio: [], indexes: []}
        clearItems()
        render()
    })
}


function statusUpdate(status) {
    document.querySelector('.status-load').innerHTML = status
    let date = new Date()
    console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] %c${status}`, 'color: #1bdd1b')
}








