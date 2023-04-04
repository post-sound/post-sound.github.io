const html = document.children[0],
      head = html.querySelector('head');
if (html.hasAttribute('data-light')) {
    head.insertAdjacentHTML('afterbegin', 
                            `
    <meta name="theme-color" content="#ffffff">
    <meta name="background-color" content="#dedede">
    <meta name="msapplication-navbutton-color" content="#ffffff">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    `)}

if (html.hasAttribute('data-dark')) {
    head.insertAdjacentHTML('afterbegin', 
    `
    <meta name="theme-color" content="#1d1d1d">
    <meta name="background-color" content="#000">
    <meta name="msapplication-navbutton-color" content="#1d1d1d">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    `)}