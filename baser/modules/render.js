const tableBox = document.querySelector('.table-box')

let addedItems = []
let contextActive = false

function render() {
    clearItems()
    let i = data.length - 1
    while (i != -1) {
        renderTableItem(i)
        i--
    }
}

function renderTableItem(i) {
    try {
        let fileName = data[i].coverFileName
        let item = document.createElement('div')
        item.className = 'table-item box'
        item.setAttribute('tabindex', '1')
        item.setAttribute('data-id', i)
        item.insertAdjacentHTML('beforeend', `
            <div class="left-cul">
                <div class="cover-info">
                    <div class="image-c">
                        <img src="data/cover/350/${fileName}" alt="${fileName}">
                    </div>
                </div>
            </div>
            <div class="right-cul">
                <div class="item-info">
                    <div class="i-id" title="id"><span>${i + 1}</span></div>
                    <div class="i-title" title="${data[i].title}"><span>${data[i].title}</span></div>
                    <div class="i-art" title="${data[i].artist}"><span>${data[i].artist}</span></div>
                    <div class="i-type" title="${data[i].type}"><span>${data[i].type}</span></div>
                    <div class="i-date" title="${data[i].date}"><span>${data[i].date}</span></div>
                </div>
                <div class="track-list"></div>
            </div>
            <div class="options-btn pulsed" data-id="${i}">
                <svg>
                    <use xlink:href="#more">
                </svg>
            </div>
        `)
        
        item.querySelector('.options-btn').addEventListener('click', optionsHanler)
        
        let trackItem = item.querySelector('.track-list')
        let trackList = data[i].list
        let e = 0
        while (e < trackList.length) {
            trackItem.insertAdjacentHTML('beforeend', `
                <div class="track-item" data-index="${e}">
                    <div class="track-id">${e + 1}</div>
                    <div class="track-name">${trackList[e].title}</div>
                </div>
            `)
            e++
        }
        addedItems[addedItems.length] = item
        tableBox.appendChild(item)
    } catch (err) {
        
    }
}

function optionsHanler(e) {
    if (contextActive) {
        disabledContext()
        return
    }
    let button = e.target
    let dataId = button.getAttribute('data-id')
    let rect = button.getBoundingClientRect()
    let cord = [rect.right, rect.bottom]
    
    contextDisabledArea.style.display = 'block'
    contextMenuElem.style.display = 'block'
    contextMenuElem.style.left = `${cord[0]}px`
    contextMenuElem.style.top = `${cord[1]}px`
    contextMenuElem.setAttribute('data-id', dataId)
    contextActive = true
}

contextDisabledArea.addEventListener('click', () => {
    if (contextActive) {
        disabledContext()
        return
    }
})

function disabledContext() {
    contextDisabledArea.style.display = 'none'
    contextMenuElem.style.display = 'none'
    contextActive = false
}

function clearItems() {
    let i = 0
    while (i < addedItems.length) {
        addedItems[i].remove()
        i++
    }
}