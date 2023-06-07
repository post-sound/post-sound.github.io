const forEach = Array.prototype.forEach;

function btnActive(elem) {
    var buttons = document.getElementsByClassName(elem);

    forEach.call(buttons, function (b) {
        b.addEventListener('mousedown', addElement);
    });

    function addElement(e) {
        var addDiv  = document.createElement('div'),
            mValue  = Math.max(this.clientWidth, this.clientHeight),
            rect    = this.getBoundingClientRect(),
            sDiv    = addDiv.style,
            px      = 'px';

        sDiv.width  = sDiv.height = mValue/1 + px;
        sDiv.left   = e.clientX - rect.left - (mValue / 2) + px;
        sDiv.top    = e.clientY - rect.top - (mValue / 2) + px;

        addDiv.classList.add('pulse');
        this.appendChild(addDiv);
        setTimeout(() => addDiv.remove(), 1000);
    }
}

btnActive('btn1')
btnActive('btn2')
btnActive('pulsed')


function textInp(className) {
    let elems = document.getElementsByClassName(className)
    forEach.call(elems, elem => {
        let input = document.createElement('input'),
            clearBt = document.createElement('div'),
            id    = elem.getAttribute('data-inp-id'),
            ph    = elem.getAttribute('data-ph'),
            onInput = new Event('input')
        
        input.setAttribute('type', 'text')
        input.setAttribute('id', id)
        input.setAttribute('placeholder', ph)
        input.setAttribute('tabindex', 1)
        
        clearBt.classList.add('clearInp')
        clearBt.insertAdjacentHTML('beforeend', `
            <svg>
                <use xlink:href="#clear"></use>
            <svg>
        `)
        input.addEventListener('input', e => {
            if (input.value != '') {
                elem.classList.add('input-changed')
            } else {
                elem.classList.remove('input-changed')
            }
        })
        clearBt.addEventListener('click', e => {
            if (input.value != '') {
                input.value = ''
                elem.classList.remove('input-changed')
                input.dispatchEvent(onInput)
                input.focus()
            }
        })
        
        elem.appendChild(clearBt)
        elem.appendChild(input)
    })
}
textInp('textInp')