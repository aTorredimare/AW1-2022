"use strict";

let book = {
    author : "Enrico",
    title : "Learning JS",
    for : "students",
    pages : 340,
    "chapter pages" : [30,50,60,100]
};

console.log(book);
const persona = book.author;
console.log(persona);
book.title = "Advanced JS";
book.editor = "Polito";
console.log(book);

let surname = book && book.author && book.author.surname; 
//controlla se esistono tutte le proprietà e se esiste book.author.surname lo assegna a surname
//se non esiste mette undefined, ma non si blocca
console.log(surname);

//let sur = book.author2.surname;
//errore: qui si blocca, la proprietà author2 non esiste --> meglio aver un undefined

const book2 = Object.assign({}, book);
const book3 = {...book}; //con operatore spread
console.log(book2);
console.log(book3);

const {title,...rest} = book; //estraggo alcune proprietà
console.log(title);

