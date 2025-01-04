const coverInp = document.querySelector('.cover-prew')
const clearBtn = document.querySelector('.clear-form')
const prewImage = document.querySelector('.prew-image')
const fileDataOutput = document.querySelector('.file-data span')
const audioInp = document.querySelector('.trackFileInp')
const addTrackBt = document.querySelector('.addTrackBt')
const tempTrackListBox = document.querySelector('.tempTrackList')
const pushFormBtn = document.querySelector('.push-form')

const inputsForClean = Array.from(document.querySelectorAll('.textInp input'))
const inputs = [...inputsForClean,
                ...Array.from(document.querySelectorAll('.swith-input input'))]

const trackInp = document.querySelector('#trackNameInp')

// Array.from(document.querySelectorAll('.swith-input'))

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
    addTrack()
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
    
    let titleCover = validation(`${formData.artInp}-${formData.titleAlbInp}-${formData.dateInp}.jpg`)
    
    eel.saveImage(formData.coverSrc, `${titleCover}`)(() => {
        let arrLength = savedFiles.images.length
        savedFiles.images[arrLength] = `${titleCover}`
        statusUpdate(`${titleCover} saved (1000, 350, 60)`)
    })
    
    
    pushData.coverFileName = `${titleCover}`
    
    let i = 0
    while (i < trackData.length) {
        let arrLength = pushData.list.length,
            dur = 0,
            title = trackData[i].title
//            loadEnd = new Event('loadEnd')
        
        let titleAudio = validation(`${formData.artInp}-${title}-${formData.dateInp}`)
        eel.saveAudio(trackData[i].src, titleAudio)(returnData => {
            
            let arrLength = savedFiles.audio.length
            savedFiles.audio[arrLength] = titleAudio + returnData[1]
            
            pushData.list[pushData.list.length] = {
                index: pushData.list.length,
                format: returnData[1],
                title: title,
                duration: returnData[0],
                audioFileName: `${titleAudio + returnData[1]}`
            }
            statusUpdate(`${titleAudio + returnData[1]} saved   [${pushData.list.length} из ${trackData.length}]`)
            if (pushData.list.length === trackData.length) loadEnded()
        })
        i++
    }
    

}


function validation(string) {
    let outStr = []
    Array.from(string).forEach((char, i, arr) => {
        let IsValidChar = char == '\\' || char == '/' || char == ':' || char == '*' || char == '?' || char == '<' || char == '>' || char == '|'
        if (!IsValidChar) {
            outStr.push(char)
        }
    })
    return outStr.join('')
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
    let trackIndex = trackData.length - 1
    
    elem.classList.add('tempTrackItem')
    elem.setAttribute('data-index', trackIndex)
    
    elem.insertAdjacentHTML('afterbegin', `
        <div class="temp-track-index">${trackIndex + 1}</div>
        <div class="temp-track-title">${trackData[trackIndex].title}</div>
        <div class="temp-track-file">${trackData[trackIndex].src}</div>
        <div class="delete-temp-item">
            <div class="delete-temp-ico">
                <svg>
                    <use xlink:href="#clear"></use>
                </svg>
            </div>
        </div>
    `)
    
    elem.querySelector('.delete-temp-item').onclick = () => {
        removeTrack(elem.getAttribute('data-index'))
    }
    
    trackItems[trackItems.length] = elem
    tempTrackListBox.insertBefore(elem, tempTrackListBox.firstChild);
}

function removeTrack(trackIndex) {
    trackItems[trackIndex].remove()
    trackItems.splice(trackIndex, 1)
    trackData.splice(trackIndex, 1)

    trackData.forEach((item, i) => {
        trackData[i].index = i
        trackItems[i].setAttribute('data-index', i)
        trackItems[i].querySelector('.temp-track-index').innerHTML = i + 1
    })
}

function clearTracksBox() {
    trackItems.forEach(trackItem => {
        trackItem.remove()
    })
}



function inputChanged() {
    inputs.forEach(input => {
        let id = input.getAttribute('id')
        
        input.addEventListener('input', e => {
            formData[id] = input.value
            console.log(formData)
        })
    })
}
inputChanged()

function finalInputsChack() {
    inputs.forEach(input => {
        formData[id] = input.value
    })
}

function inputsClear() {    
    let event = new Event('input')
    
    inputsForClean.forEach(input => {
        input.value = ''
        input.dispatchEvent(event)
    })
}


function checkInps() {
    Object.keys(formData).forEach(key => {
        if (key != '') return true
    })
    
    return false
}

function checkForm() {
    if (Object.keys(formData).length != 8) return false
    Object.keys(formData).forEach(key => {
        if (key == '') return false
    })
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
    savedFiles.images.forEach(image => {
        eel.removeFile('./data/cover/1000/' + image)
        eel.removeFile('./data/cover/350/' + image)
        eel.removeFile('./data/cover/60/' + image)
    })

    savedFiles.audio.forEach(audio => {
        eel.removeFile('./data/audio/' + audio)
    })
    
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