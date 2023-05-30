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

let savedFiles = {images: [], audio: []}
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
    console.log('Обработка формы начата...')
    
    pushData = {
        id: data.length,
        title: formData.titleAlbInp,
        artist: formData.artInp,
        type: formData.typeInp,
        date: formData.dateInp,
        list: []
    }
    
    let titleCover = `${formData.artInp}-${formData.titleAlbInp}-${formData.dateInp}`
    eel.saveImage(formData.coverSrc, `${titleCover}.jpg`)(() => {
        let arrLength = savedFiles.images.length
        savedFiles.images[arrLength] = `${titleCover}.jpg`
        console.log(`${titleCover}.jpg saved (1000, 350, 60)`)
    })
    
    let i = 0
    while (i < trackData.length) {
        let arrLength = pushData.list.length,
            dur = 0,
            title = trackData[i].title,
            loadEnd = new Event('loadEnd')
        
        let titleAudio = `${formData.artInp}-${title}-${formData.dateInp}`
        eel.saveAudio(trackData[i].src, `${titleAudio}.mp3`)(duration => {
            
            let arrLength = savedFiles.audio.length
            savedFiles.audio[arrLength] = `${titleAudio}.jpg`
            
            pushData.list[arrLength] = {
                index: arrLength,
                title: title,
                duration: duration
            }
            
            console.log(`${titleAudio}.mp3 saved`)
            if (pushData.list.length === trackData.length) document.dispatchEvent(loadEnd)
        })
        i++
    }
    
    document.addEventListener('loadEnd', () => {
        console.log('Файлы обработаны и сохранены')
        newGlobalData = data
        newGlobalData[newGlobalData.length] = pushData
        eel.jsonWriter(JSON.stringify(newGlobalData, null, 2))(() => {
            getFile('./data/albums.json')
            clearForm(false)
            pushData = {}
            console.log('JSON Обновлен')
        })
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
        <div class="delete-temp-item">x</div>
    `)
    trackItems[trackItems.length] = elem
    tempTrackListBox.appendChild(elem)
}

function clearTracksBox() {
    let i = 0
    while (i < trackItems.length) {
        console.log(trackItems[i])
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
    savedFiles = {images: [], audio: []}
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














