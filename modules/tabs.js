let ul = document.querySelector('.tabs ul');
let bar = document.querySelector('.leftMenu ul');
let line = document.querySelector('.line');
let tabWrap = document.querySelector('.tabWrap');
let footBar = document.querySelector('.foot-bar ul');

function tabSwither(elem, className, line) {
    if (line != undefined) {
        try {
            window.addEventListener('resize', resizes);
            if (screen.orientation) {
                screen.orientation.addEventListener('change', resizes);
            }
            window.addEventListener('orientationchange', resizes);
        } catch (err) {
            alert(err);
        }

    } 
    elem.addEventListener('click', function(e) {
        let vrk = e.target.tagName != 'LI' || e.target.classList.contains(className);
        if (vrk) return;
        
        function lineMove(line) {
            if (line == undefined) return;
            
            let offsX = e.target.offsetLeft,
                offsW = e.target.offsetWidth;
            line.style.width = `${offsW - 24}px`;
            line.style.left = `${offsX + 12}px`;
        }
        lineMove(line);
        
        let lis = elem.children;
        
        let i = 0;
        while (i < lis.length) {
            lis[i].classList.remove(className);
            i++
        }
        e.target.classList.add(className);
    })
    
    function resizes(e) {
        let el = document.querySelector('.'+className);
        
        if (window.innerWidth <= 489) {

            if (el.classList.contains('min')) return
            el.classList.add('min');
            minimize();
            return
        }

        if (!el.classList.contains('min')) return;
        el.classList.remove('min');
        minimize();

        function minimize() {
            let offsX = el.offsetLeft,
                offsW = el.offsetWidth;
            
            line.style.width = `${offsW - 24}px`;
            line.style.left = `${offsX + 12}px`;
        }
    }
    

}

//ul.addEventListener('click', move);
//function move() {
//    tabWrap.scrollLeft ;
//}

//function tabMove(elem, scrollBlock, className) {
//    elem.addEventListener('click', e => {
//        let vrk = e.target.tagName != 'LI';
//        if (vrk) return;
//        
//        const render = () => {
//            let pos = e.target.offsetLeft + (e.target.offsetWidth / 2);
//            if (pos <= window.innerWidth / 2) return;
//            scrollBlock.scrollLeft = pos - window.innerWidth / 2;
//            requestAnimationFrame(render);
//        }
//        render();
//        
//    });
//}

window.addEventListener('load', event => {
    tabSwither(bar, 'l-active');
    tabSwither(footBar, 'f-active');
    tabSwither(ul, 'active', line);
//    tabMove(ul, tabWrap, 'active');
})


