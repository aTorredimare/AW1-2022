"use strict";

let p = document.createElement('p');
let d = dayjs().format('YYYY-MM-DD HH:mm:ss');
p.innerText = d;
document.getElementById('ora').prepend(p);


setInterval(() => { p.innerText = dayjs().format('YYYY-MM-DD HH:mm:ss'); }, 1000)
//document.getElementById('ora').innerText = "Qui ci va l'ora";


window.addEventListener('load', event => {
    const rows = document.querySelectorAll('table tr');
    for (const r of rows) {
        r.addEventListener('click', (event) => { //RICORDA MECCANISMO CLOSURE!
            console.log(event.target);
            const voto = r.children[1].innerText;
            const p = document.createElement('p');
            p.innerText = voto;
            document.getElementById('comment').appendChild(p)
        })
    }
});
