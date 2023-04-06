const searchBox = document.querySelector('.search-list'),
      wrapBox = document.querySelector('.wrap'),
      one = document.querySelector('.mSearchIcon'),
      off = document.querySelector('.cancel-btn'),
      input = document.querySelector('#searchInput');

function getBodyScrollTop() {
    let s = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
        h = searchBox.style.marginTop;
    let i = 0;
    let res = '';
    while (i < h.length) {
        if (h[i] != 'p' && h[i] != 'x') {
            res = res+h[i];
        }
        i++
    }
    let addH = Number(res);
    searchBox.style.marginTop = 70 + addH + s + 'px';
}

function sInit() {
    let top = wrapBox.offsetHeight,
        h = window.innerHeight;
//    console.log(s);
    searchBox.style.marginTop = '-' + (top + 120) + 'px';
    searchBox.style.height = (h + 121) + 'px';
}


one.addEventListener('click', () => {
    input.focus();
    getBodyScrollTop();
    document.body.classList.add('search-active');
})

off.addEventListener('click', () => {
    input.value = '';
    searchBox.style.marginTop = '-' + (wrapBox.offsetHeight + 120) + 'px';
    document.body.classList.remove('search-active')
})

