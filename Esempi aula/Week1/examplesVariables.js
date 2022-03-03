"strict mode";
/* c = 7;       hoisting --> prima assegno il valore, poi dichiaro la variabile
                vale anche per funzioni, non solo per variabili
                pericoloso se usato male (meglio usare let/const) */

let a = 5;          //definizione variabile
const b = '5';      //definizione costante

/*
    ATTENZIONE: con vettori e oggetti, const permette di cambiare i valori, ma non il "tipo" (vettore deve rimanere vettore, un certo oggetto
    deve rimanere tale)
    es.
    cons b = [0,1,2];
    b[0] = 6 
    LEGALE!!
    b diventa [6,1,2]
*/

/*var c;        permette di dichiarare una variabile in un punto, ma di usarla anche prima di averla dichiarata
d = 6;          no keyword --> vecchia (disabilitata in strict mode) */

console.log(a);
console.log(b);

//b = 'non posso';  --> ERRORE, b è una costante

if(a == b){         //doppio uguale --> confronto con conversione
    console.log('a and b are equals (conversion made)');
}
else {
    console.log('a and b are not equals (conversion made)');
}

if(a === b){        //triplo uguale --> confronto stretto (C-like)
    console.log('a and b are equals (conversion not made)');
}
else {
    console.log('a and b are not equals (conversion not made)');
}
