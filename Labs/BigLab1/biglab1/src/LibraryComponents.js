import { List, Button } from 'react-bootstrap';
//import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import dayjs from 'dayjs';

function Film(id, title, favorite, watchDate, score) {
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.watchDate = (watchDate ? watchDate : undefined)
    this.score = (score ? score : undefined)


    this.toString = () => {
        return `Id: ${this.id}, Title: ${this.title}, Favorite: ${this.favorite}, Watch date: ${this.watchDate}, score: ${this.score}`;
    }
}


function FilmLibrary() {
    this.library = [];

    this.toString = () => {
        let str = '';
        for (let f of this.library)
            str = str + f.toString() + '\n';
        return str;
    }


    this.addNewFilm = (f) => {
        this.library.push(f);
    }

    this.deleteFilm = (id) => {
        this.library = this.library.filter((f) => (f.id !== id));
    }

    this.getFavorites = () => {
        let list = [...this.library].filter(f => f.favorite === true);
        return list;
    }

    this.getBestRated = () => {
        let list = [...this.library].filter(f => f.score === 5);
        return list;
    }

    this.getLastWatched = () => {
        let today = dayjs();
        let list = [...this.library].filter(f => f.watchDate !== undefined);
    
        return list.filter( f => today.subtract(f.watchDate, "day") >= 30);
    }

    this.getUnseen = () => {
        let list = [...this.library].filter( f => f.watchDate === undefined);
        return list;
    }
}


const f1 = new Film(1,"Pulp Fiction", true, dayjs("2022-03-10"), 5);
const f2 = new Film(2,"21 Grams", true, dayjs("2022-03-17"), 4);
const f3 = new Film(3, "Star Wars", false);
const f4 = new Film(4, "Matrix", false);
const f5 = new Film(5, "Shrek", false, dayjs("2022-03-21"), 3);

let library =  new FilmLibrary();

library.addNewFilm(f1);
library.addNewFilm(f2);
library.addNewFilm(f3);
library.addNewFilm(f4);
library.addNewFilm(f5);


export { library, Film, FilmLibrary }
