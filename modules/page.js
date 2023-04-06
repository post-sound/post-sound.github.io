let page = document.querySelector('.page');

let pageItems = page.children;

function onResize() {
    let i = 0;
    while (i < pageItems.length) {
        let w = pageItems[i].clientWidth;
        pageItems[i].style.height = `${w - 10}px`;
        i++
    }
    sInit();
}

window.onload = onResize;
window.addEventListener('resize', onResize);