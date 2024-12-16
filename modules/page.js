getFile("./baser/data/albums.json");
const page = document.querySelector('.page');

//json onload render
function render() {
    createMethods()
    renderItems("all")
    tabSwithHandler('release-type', v => {
        hideItems(v)
    })
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
    page.insertAdjacentHTML('beforeend', `
            <div class="page-item" data-id="${dataItem.id}">
                <div class="cover-wrap">
                    <div class="cover-block">
                        <img src="./baser/data/cover/350/${dataItem.artist}-${dataItem.title}-${dataItem.date}.jpg" alt="">
                    </div>
                    <div class="action-area">
                        <div class="item-play-btn">
                        </div>
                    </div>
                </div>
                <div class="item-info">
                    <div class="title-item" title="${dataItem.title}">
                        <span>${dataItem.title}</span>
                    </div>
                    <div class="artist-item" title="${dataItem.artist} • ${dataItem.type}">
                        <span>${dataItem.artist}</span>
                        <span style="text-decoration: none; cursor: default;">${
                            " • " + dataItem.type
                            }</span>
                    </div>
                </div>
            </div>
    `)
}

function searchObjInArrByProp(prop) {
    
}