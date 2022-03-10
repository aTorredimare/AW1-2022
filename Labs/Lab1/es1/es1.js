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

    this.addNewFilm = (f) => {
        this.library.push(f);
    }

    this.toString = () => {
        let str = '';
        for(let f of this.library)
            str = str + f.toString() + '\n';
        return str;
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

console.log(''+lib1);