const themeMedia = window.matchMedia('(prefers-color-scheme: light)');

const html = document.querySelector('html')

function swither(isLight) {
    if (isLight) {
        html.setAttribute('theme', 'light');
    } else {
        html.setAttribute('theme', 'dark')
    }
}

themeMedia.addEventListener('change', event => {
    swither(themeMedia.matches);
})
window.addEventListener('load', event => {
    swither(themeMedia.matches);
})