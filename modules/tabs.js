let ul = document.querySelector('.tabs ul');
let bar = document.querySelector('.leftMenu ul');
let line = document.querySelector('.line');
let tabWrap = document.querySelector('.tabWrap');
let footBar = document.querySelector('.foot-bar ul');

let tabEvent = new Event("tabChange", {bubbles: true});

function tabSwither(elem, className, line) {
    if (line != undefined) {
        try {
            window.addEventListener('resize', resizes);
            if (screen.orientation) {
                screen.orientation.addEventListener('change', resizes);
            }
            window.addEventListener('orientationchange', resizes);
            resizes();
        } catch (err) {
            alert(err);
        }

    }
    
    let dataName = elem.getAttribute('data-tabs-name'),
        allTabs
    if (dataName) {
        allTabs = document.querySelectorAll(`[data-tabs-name="${dataName}"]`)
    } else {
        allTabs = [elem]
    }
    
    elem.addEventListener('click', function(e) {
//        tabEvent.value = e.target.firstChild.nodeValue;
        tabEvent.value = e;

        document.dispatchEvent(tabEvent);
        
        let vrk = e.target.tagName != 'LI' || e.target.classList.contains(className);
        if (vrk) return;
        
        function lineMove(line) {
            if (line == undefined) return;
            
            let offsX = e.target.offsetLeft,
                offsW = e.target.offsetWidth;
            line.style.width = `${offsW - 24}px`;
            line.style.left = `${offsX + 14}px`;
        }
        lineMove(line);
        
        
        let tabValue = e.target.getAttribute('data-value')
        allTabs.forEach(tabs => {
            let lis = Array.from(tabs.querySelectorAll('[data-value]')),
                liTarget = tabs.querySelector(`[data-value="${tabValue}"]`)

            lis.forEach(li => {
                li.classList.remove(className);
                li.style.opacity = null;
            })
            liTarget.classList.add(className);
            liTarget.style.opacity = 1;  
        })
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
            
            line.style.width = `${offsW - 22}px`;
            line.style.left = `${offsX + 12}px`;
        }
    }
    

}

function tabSwithHandler(tabsName, collBack) {
    document.addEventListener("tabChange", e => {
        let btn = e.value.target;
        let name = btn.parentElement.getAttribute('data-tabs-name');
        if (name !== tabsName) return
        
        let value = btn.getAttribute('data-value');
        if (value == undefined) return
        if (value == '') return
        
        collBack(value)
    })
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
    tabSwither(footBar, 'l-active');
    tabSwither(ul, 'active', line);
//    alert(navigator.userAgent);
//    tabMove(ul, tabWrap, 'active');
})

let ratio = window.devicePixelRatio || 1;
let screen = {
  width: window.screen.width * ratio,
  height: window.screen.height * ratio
};

// iPhone 10—12
if ( screen.width === 1125 && screen.height === 2436 ||
     screen.width ===  828 && screen.height === 1792 ||
     screen.width === 1242 && screen.height === 2688 ||
     screen.width === 1170 && screen.height === 2532 ||
     screen.width === 1284 && screen.height === 2778 ||
     screen.width === 1080 && screen.height === 2340 )
   {
     document.documentElement.classList.add("ios-iphonex");
//     alert('ты пидор');
}










