let ul = document.querySelector('.tabs ul');
let line = document.querySelector('.line');
let lies = document.querySelectorAll('.tabs ul li');

console.log(lies);

ul.addEventListener('click', function(e) {
    let vrk = e.target.tagName != 'LI' || e.target.classList.contains('active');
    if (vrk) {
        return
    }
    let offsX = e.target.offsetLeft,
        offsW = e.target.offsetWidth;
    console.log(`left: ${offsX}, with: ${offsW}`);
    line.style.width = `${offsW - 14}px`;
    line.style.left = `${offsX + 8}px`;
    let i = 0;
    while (i < lies.length) {
        lies[i].classList.remove('active');
        i++
    }
    e.target.classList.add('active');
    console.log(e.target.tagName);
});
