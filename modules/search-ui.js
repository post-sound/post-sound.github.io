const searchBox = document.querySelector('.search-list'),
      wrapBox = document.querySelector('.wrap'),
      one = document.querySelector('.mSearchIcon'),
      off = document.querySelector('.cancel-btn'),
      input = document.querySelector('#searchInput'),
      clearBtn = document.querySelector('.clear-btn');

clearBtn.addEventListener('click', () => {
    input.value = '';
    input.focus();
})

input.onkeydown = (e) => {
    if (e.key == 'Enter') {
        input.blur();
    }
}

searchBox.addEventListener('touchmove', (e) => {
    if (e.target == searchBox) {
        e.preventDefault();
    }
})

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
//    let addH = Number(res);
//    searchBox.style.marginTop = 68 + addH + s + 'px';
    searchBox.style.top = 68 + 'px';
}

function sInit() {
    let top = wrapBox.offsetHeight,
        h = window.innerHeight;
//    console.log(s);
//    searchBox.style.marginTop = '-' + top + 'px';
    searchBox.style.height = (h + 121) + 'px';
}


one.addEventListener('click', () => {
    input.focus();
    getBodyScrollTop();
    document.body.classList.add('search-active');
})

off.addEventListener('click', () => {
    input.value = '';
    document.body.classList.remove('search-active');
})

searchBox.addEventListener('click', (e) => {
    if (e.target == searchBox) {
        input.value = '';
        document.body.classList.remove('search-active');
    }
})

