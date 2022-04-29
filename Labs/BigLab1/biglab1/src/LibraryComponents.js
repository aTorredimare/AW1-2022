import { List, Button } from 'react-bootstrap';
//import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import dayjs from 'dayjs';

function Film(id, title, favorite, ...opt) {
    this.id = id;
    this.title = title;
    this.favorite = favorite;

    if (opt[0] == null)
        this.watchDate = undefined;
    else
        this.watchDate = opt[0];

    this.score = opt[1];

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

        for (let f of list) {
            let diff = today.diff(f.watchDatetoday, "day");
            if (diff >= 30)
                list.pop(f);
        }
        return list;
    }

    this.getUnseen = () => {
        let list = [...this.library].filter( f => f.watchDate === undefined);
        return list;
    }
}


export { Film, FilmLibrary }
