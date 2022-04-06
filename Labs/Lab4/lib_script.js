"use strict";

//const dayjs = require("dayjs"); non serve, basta includerlo dal file html

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

function displayFilms(filmList, filterName) {
    const displayed = document.getElementById("filter-displayed");
    displayed.innerText = filterName;

    const list = document.getElementById("list-films")
    for (let f of filmList) {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.id = f.title.replace(/\s+/g, "");
        list.appendChild(li);

        let div = document.createElement("div");
        div.className = "d-flex w-100 justify-content-between";
        li.appendChild(div);

        let a = document.createElement("a");
        a.className = "delete-icon";
        a.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg>'
        div.appendChild(a);

        let p = document.createElement("p");
        if (f.favorite === true) {
            p.className = "favorite text-start col-md-5 col-3";
        }
        else {
            p.className = "text-start col-md-5 col-3"
        }
        p.innerText = f.title;
        div.appendChild(p);

        let span1 = document.createElement("span");
        span1.className = "custom-control custom-checkbox col-md-1 col-3";
        if (f.favorite === true) {
            span1.innerHTML = '<input type="checkbox" class="custom-control-input" id="check-f1" checked> <label class="custom-control-label" for="check-f1">Favorite</label>'
        }
        else {
            span1.innerHTML = '<input type="checkbox" class="custom-control-input" id="check-f3"> <label class="custom-control-label" for="check-f3">Favorite</label>';
        }
        div.appendChild(span1);

        let small = document.createElement("small");
        small.className = 'watch-date col-md-3 col-3';
        if (f.watchDate === undefined) {
            small.innerText = '';
        }
        else {
            small.innerText = f.watchDate.format("YYYY-MM-DD");
        }
        div.appendChild(small);

        let span2 = document.createElement("span");
        span2.className = "rating text-end col-md-3 col-3";
        let s = '';
        for (let i = 0; i < 5; i++) {
            if (i < (f.score)) { //inserisco stella piena
                s += ('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /> </svg>');
            }
            else { //inserisco stella vuota
                s += ('<svg class="empty-star" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"> <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" /> </svg>');
            }
        }
        span2.innerHTML = s;
        div.append(span2);
    }
}

function main() {
    let f1 = new Film(1, "Pulp Fiction", true, dayjs("2022-03-10"), 5);
    let f2 = new Film(2, "21 Grams", true, dayjs("2022-03-17"), 4);
    let f3 = new Film(3, "Star Wars", false);
    let f4 = new Film(4, "Matrix", false);
    let f5 = new Film(5, "Shrek", false, dayjs("2022-03-21"), 3);

    let lib1 = new FilmLibrary();
    lib1.addNewFilm(f1);
    lib1.addNewFilm(f2);
    lib1.addNewFilm(f3);
    lib1.addNewFilm(f4);
    lib1.addNewFilm(f5);

    window.addEventListener('load', event => {
        displayFilms(lib1.library, "All");
    });

    const filterAll = document.getElementById("filter-all");
    const filterFavorites = document.getElementById("filter-favorites");
    const filterBest = document.getElementById("filter-best");
    const filterSeenLastMonth = document.getElementById("filter-seen-last-month");
    const filterUnseen = document.getElementById("filter-unseen");

    filterAll.addEventListener('click', event => {
        let l = document.getElementById("list-films");
        let active = document.getElementsByClassName("active")[0];
        active.setAttribute("class", "list-group-item list-group-item-action");
        filterAll.setAttribute("class", "list-group-item list-group-item-action active");
        l.innerHTML = '<!--- Insert films in this list-->';
        displayFilms(lib1.library,"All");
    });

    filterFavorites.addEventListener('click', event => {
        let l = document.getElementById("list-films");
        let active = document.getElementsByClassName("active")[0];
        active.setAttribute("class", "list-group-item list-group-item-action");
        filterFavorites.setAttribute("class", "list-group-item list-group-item-action active");
        l.innerHTML = '<!--- Insert films in this list-->';
        displayFilms(lib1.getFavorites(),"Favorites");
    });

    filterBest.addEventListener('click', event => {
        let l = document.getElementById("list-films");
        let active = document.getElementsByClassName("active")[0];
        active.setAttribute("class", "list-group-item list-group-item-action");
        filterBest.setAttribute("class", "list-group-item list-group-item-action active");
        l.innerHTML = '<!--- Insert films in this list-->';
        displayFilms(lib1.getBestRated(),"Best Rated");
    });

    filterSeenLastMonth.addEventListener('click', event => {
        let l = document.getElementById("list-films");
        let active = document.getElementsByClassName("active")[0];
        active.setAttribute("class", "list-group-item list-group-item-action");
        filterSeenLastMonth.setAttribute("class", "list-group-item list-group-item-action active");
        l.innerHTML = '<!--- Insert films in this list-->';
        displayFilms(lib1.getLastWatched(),"Seen Last Month");
    });

    filterUnseen.addEventListener('click', event => {
        let l = document.getElementById("list-films");
        let active = document.getElementsByClassName("active")[0];
        active.setAttribute("class", "list-group-item list-group-item-action");
        filterUnseen.setAttribute("class", "list-group-item list-group-item-action active");
        l.innerHTML = '<!--- Insert films in this list-->';
        displayFilms(lib1.getUnseen(),"Unseen");
    });
}

main();
