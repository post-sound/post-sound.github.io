let ul = document.querySelector('.tabs ul');
let bar = document.querySelector('.bar ul')
let line = document.querySelector('.line');


function tabSwither(elem, className, line) {
    elem.addEventListener('click', function(e) {
        
        let vrk = e.target.tagName != 'LI' || e.target.classList.contains(className);
        if (vrk) {
            return
        }
        
        function lineMove(line) {
            if (line == undefined) {
                return
            }
            
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
}

tabSwither(ul, 'active', line);
tabSwither(bar, 'bActive');
