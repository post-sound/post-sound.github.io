getFile("./baser/data/albums.json");
const page = document.querySelector('.page');

//json onload render
function render() {
    renderItems("all")
    tabSwithHandler('release-type', v => {
        renderItems(v)
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