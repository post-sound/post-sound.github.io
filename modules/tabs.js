let ul = document.querySelector('.tabs ul');
let bar = document.querySelector('.leftMenu ul')
let line = document.querySelector('.line');

function tabSwither(elem, className, line) {
    if (line != undefined) {
        try {
            window.addEventListener('resize', resizes);
            if (screen.orientation) {
                screen.orientation.addEventListener('change', resizes);
            }
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

window.addEventListener('load', event => {
    tabSwither(bar, 'l-active');
    tabSwither(ul, 'active', line);
})


