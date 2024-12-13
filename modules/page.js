//let page = document.querySelector('.page');
//
//let pageItems = page.children;
//
//function onResize() {
//    let i = 0;
//    while (i < pageItems.length) {
//        let w = pageItems[i].clientWidth;
//        pageItems[i].style.height = `${w - 10}px`;
//        i++
//    }
////    setTimeout(() => {
//        document.body.classList.remove('hide-page');
////    }, 1300)
//    sInit();
//}
//
//window.onload = onResize;
//window.addEventListener('resize', onResize);

getFile("./baser/data/albums.json");
const page = document.querySelector('.page');

function render() {
    renderItems("all")
}

function renderItems(type) {
    data.forEach((item, i, arr) => {
        if (type == item.type) {
            console.log(item.type)
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

function pageSwith() {
    page.addEventListener("tabChange", e => {
        let type = e.value;
        
        page.innerHTML = '';
        
        switch(type) {
            case 'Все':
                renderItems("all")
                break;
            case 'Альбомы':
                renderItems("album")
                break;
            case 'Синглы':
                renderItems("single")
                break;
        }
    })
}

pageSwith()