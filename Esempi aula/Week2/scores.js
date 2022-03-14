"use strict";

const myScores = [18, 30, 26, 28, 24, 30, 27];

const modifiedScores = [...myScores];

//SORT attenzione: converte tutto in stringhe, quindi in automatico mette in ordine "alfabetico"
//modifiedScores.sort(); NO
modifiedScores.sort( (a,b) => (a-b) );


modifiedScores.shift(); //rimuovo il primo
modifiedScores.shift(); //rimuovo il secondo

let avg = 0;

for (const val of modifiedScores)
    avg += val;

avg = avg / modifiedScores.length;

modifiedScores.push(avg);


console.log(myScores);
console.log(modifiedScores);
console.log(avg);