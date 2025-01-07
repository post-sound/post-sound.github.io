const themeMedia = window.matchMedia('(prefers-color-scheme: light)');

const metaTheme = document.querySelector('meta[data-id="theme"]')

const html = document.querySelector('html')

function swither(isLight) {
    if (isLight) {
        html.setAttribute('theme', 'light');
        metaTheme.setAttribute('content', '#fff');
    } else {
        html.setAttribute('theme', 'dark');
        metaTheme.setAttribute('content', '#000');
    }
}

themeMedia.addEventListener('change', event => {
    swither(themeMedia.matches);
})
window.addEventListener('load', event => {
    swither(themeMedia.matches);
})