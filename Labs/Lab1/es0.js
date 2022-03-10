"use strict";

function firstLast(vett){
    for (let el of vett){
        let l = el.length;
        console.log(l);
        if(l < 2)
            console.log("");
        else{
            let buf = el.charAt(0) + el.charAt(1) + el.charAt(l-2) + el.charAt(l-1);
            console.log(buf);
        }
    }
}


let vect = ["ciao", "come", "alessandro", "parola", "già", "no", "i"];
firstLast(vect);

