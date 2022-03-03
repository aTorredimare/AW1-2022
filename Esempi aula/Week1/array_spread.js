"use strict";

let a = [1,4,9,16];

let a_string = a.join(' '); //tira fuori una stringa, separando gli elementi con il separatore che passo (def --> ',')
console.log(a_string);

let b = ['a','b','c'];
let c = a.concat(b); //crea un nuovo array che unisce a e b
console.log(c);

let d = ['*', ...b , '*']; //se non metto spread d = ['*', '['a','b','c'], '*']
let len_d = d.push('+'); //ritorna la nuova lunghezza del vettore
console.log(d,len_d);

const e = [...d];
console.log(e);

e[0] = 2; //posso modificare ciò che è puntato, ma non il riferimento
console.log(e);

for(let i =0; i<e.length;i++){ //per i devo usare let: non viene ricreata, ma incrementata, quindi deve essere modificabile
    console.log(e[i]);
}
//SONO EQUIVALENTI
for(const val of e){ //per array keyword --> of (posso mettere const perché ad ogni iterazione viene ricreata)
    console.log(val);
}

