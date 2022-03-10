"use strict";

const dayjs = require("dayjs");

function Film(id, title, favorite, ...opt){
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    
    if(opt[0] == null)
        this.watchDate = undefined;
    else
        this.watchDate = opt[0].format("YYYY-MM-DD");
    
    this.score = opt[1];

    this.toString = () => {
        return `Id: ${this.id}, Title: ${this.title}, Favorite: ${this.favorite}, Watch date: ${this.watchDate}, score: ${this.score}`;
    }
}


function FilmLibrary(){
    this.library = [];

    this.toString = () => {
        let str = '';
        for(let f of this.library)
            str = str + f.toString() + '\n';
        return str;
    }

    
    this.addNewFilm = (f) => {
        this.library.push(f);
    }

    this.sortByDate = () => {
        let sortlist = [...this.library];
        sortlist.sort((a,b) => {
            if(a.watchDate == undefined) return 1;
            if(b.watchDate == undefined) return -1;
            if(a.watchDate > b.watchDate) return 1;
            if(a.watchDate < b.watchDate) return -1;
            if(a.watchDate == b.watchDate) return 0;
        } );

        return sortlist;

        /* problema: se ritorno semplicemente il vettore ordinato, toString() non funziona (giustamente)
           posso ritornare però una nuova libreria*/
        // let sortedLib = new FilmLibrary();
        // for(let f of sortlist)
        //     sortedLib.addNewFilm(f);
        
        // return sortedLib;
    }

    this.deleteFilm = (id) => {
        this.library = this.library.filter( (f) => (f.id !== id) );
    }

    this.resetWatchedFilms = () => {
        for (let f of this.library)
            f.watchDate = undefined;
    }

    this.getRated = () => {
        this.library = this.library.filter( (f) => (f.score != undefined) );
        this.library.sort( (a,b) => {
            if(a.score > b.score) return -1;
            if(a.score == b.score) return 0;
            if(a.score < b.score) return 1;
        } );
    }
}



let f1 = new Film(1,"Pulp Fiction", true, dayjs("2022-03-10"), 5);
let f2 = new Film(2,"21 Grams", true, dayjs("2022-03-17"), 4);
let f3 = new Film(3, "Star Wars", false);
let f4 = new Film(4, "Matrix", false);
let f5 = new Film(5, "Shrek", false, dayjs("2022-03-21"), 3);

let lib1 = new FilmLibrary();
lib1.addNewFilm(f1);
lib1.addNewFilm(f2);
lib1.addNewFilm(f3);
lib1.addNewFilm(f4);
lib1.addNewFilm(f5);

//console.log(lib1);

let list1 = lib1.sortByDate();
//console.log(list1); //stampa grezza
//non posso usare toString() di FilmLibrary per stampa formattata, mi serve un ciclo
//console.log(''+list1);
for(let l of list1)
    console.log('' + l);

//lib1.deleteFilm(1);
//console.log(lib1);

//lib1.resetWatchedFilms();
//console.log(lib1);


//lib1.getRated();
//console.log(lib1);