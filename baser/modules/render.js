const tableBox = document.querySelector('.table-box')

let addedItems = []


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
        let fileName = `${data[i].artist}-${data[i].title}-${data[i].date}`
        let item = document.createElement('div')
        item.className = 'table-item box'
        item.setAttribute('tabindex', '1')
        item.setAttribute('data-id', i)
        item.insertAdjacentHTML('beforeend', `
            <div class="left-cul">
                <div class="cover-info">
                    <div class="image-c">
                        <img src="data/cover/350/${fileName}.jpg" alt="${fileName}.jpg">
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
            <div class="options-btn pulsed">
                <svg>
                    <use xlink:href="#options">
                </svg>
            </div>
        `)
        let trackItem = item.querySelector('.track-list')
        let trackList = data[i].list
        let e = 0
        while (e < trackList.length) {
            trackItem.insertAdjacentHTML('beforeend', `
                <div class="track-item">
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

function clearItems() {
    let i = 0
    while (i < addedItems.length) {
        addedItems[i].remove()
        i++
    }
}