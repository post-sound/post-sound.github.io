function btnActive(elem) {
    var buttons = document.getElementsByClassName(elem),
        forEach = Array.prototype.forEach;

    forEach.call(buttons, function (b) {
        b.addEventListener('click', addElement);
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


btnActive('btn');