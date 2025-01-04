let widgets = {
    card: {
        rel: {},
    },
    carusel: {
        art: {},
    },
}

widgets.carusel.art.allRels = function(dataItem) {
    let relWidgets = []
    dataItem.list.forEach(relId => {
        let rel = data.searchById(relId)
        
        relWidgets.push(
            widgets.card.rel.type2(rel)
        )
    })

    return `
        <div class="art-item-block">
            <div class="art-name-block">
                <div class="art-name">
                    <span>${dataItem.name}</span>
                </div>
            </div>
            <div class="art-rel-list-block">
                <div class="art-rel-list-line">
                    ${relWidgets.join('')}
                </div>
            </div>
        </div> 
    `
}

widgets.card.rel.type1 = function(dataItem) {
    let typeRel
    if (dataItem.type == 'single') {
        typeRel = 'сингл'
    }
    if (dataItem.type == 'album') {
        typeRel = 'альбом'
    }
    
    return `
            <div class="page-item" data-id="${dataItem.id}">
                <div class="cover-wrap">
                    <div class="cover-block">
                        <img src="./baser/data/cover/350/${dataItem.coverFileName}" alt="${dataItem.coverFileName}">
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
                    <div class="artist-item" title="${dataItem.artist} • ${dataItem.type}" data-art-widgwt-name>
                        <span class="artist-item-span">${dataItem.artist}</span>
                        <span> • ${typeRel}</span>
                    </div>
                </div>
            </div>
    `
}

widgets.card.rel.type2 = function(dataItem) {
    let typeRel
    if (dataItem.type == 'single') {
        typeRel = 'сингл'
    }
    if (dataItem.type == 'album') {
        typeRel = 'альбом'
    }
    
    return `
            <div class="page-item" data-id="${dataItem.id}">
                <div class="cover-wrap">
                    <div class="cover-block">
                        <img src="./baser/data/cover/350/${dataItem.coverFileName}" alt="${dataItem.coverFileName}">
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
                    <div class="artist-item" title="${dataItem.artist} • ${dataItem.type}" data-art-widgwt-name>
                        <span class="artist-item-span">${dataItem.artist}</span>
                        <span> • ${typeRel}</span>
                        <div><span>${dataItem.date}</span></div>
                    </div>
                </div>
            </div>
    `
}