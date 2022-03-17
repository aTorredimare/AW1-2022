"use strict";

const dayjs = require("dayjs");
const sqlite = require("sqlite3");


function Film(id, title, favorite, ...opt) {
    this.id = id;
    this.title = title;
    this.favorite = favorite;

    if (opt[0] == null)
        this.watchDate = undefined;
    else
        this.watchDate = opt[0].format("YYYY-MM-DD");

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

    this.sortByDate = () => {
        let sortlist = [...this.library];
        sortlist.sort((a, b) => {
            if (a.watchDate == undefined) return 1;
            if (b.watchDate == undefined) return -1;
            if (a.watchDate > b.watchDate) return 1;
            if (a.watchDate < b.watchDate) return -1;
            if (a.watchDate == b.watchDate) return 0;
        });

        return sortlist;

        /* problema: se ritorno semplicemente il vettore ordinato, toString() non funziona (giustamente)
           posso ritornare però una nuova libreria*/
        // let sortedLib = new FilmLibrary();
        // for(let f of sortlist)
        //     sortedLib.addNewFilm(f);

        // return sortedLib;
    }

    this.deleteFilm = (id) => {
        this.library = this.library.filter((f) => (f.id !== id));
    }

    this.resetWatchedFilms = () => {
        for (let f of this.library)
            f.watchDate = undefined;
    }

    this.getRated = () => {
        this.library = this.library.filter((f) => (f.score != undefined));
        this.library.sort((a, b) => {
            if (a.score > b.score) return -1;
            if (a.score == b.score) return 0;
            if (a.score < b.score) return 1;
        });
    }

    this.getAllFromDB = () => {
        const db = new sqlite.Database('./films.db', (err) => { if (err) throw err; });
        const sql = "SELECT * FROM films";

        return new Promise((resolve, reject) => {
            db.all(sql,
                (err, rows) => {
                    if (err)
                        reject(err);
                    else {
                        this.library = [...rows];
                        resolve(rows);
                        db.close();
                    }
                });
        });
    }


    this.getFavoritesFromDB = () => {
        const db = new sqlite.Database('./films.db', (err) => { if (err) throw err; });
        const sql = "SELECT * FROM films WHERE favorite = 1";

        return new Promise((resolve, reject) => {
            db.all(sql,
                (err, rows) => {
                    if (err)
                        reject(err);
                    else {
                        resolve(rows);
                        db.close();
                    }
                });
        });
    }

    this.getWatchedToday = () => {
        const db = new sqlite.Database('./films.db', (err) => { if (err) throw err; });
        const sql = "SELECT * FROM films WHERE watchdate = ?";
        const today = dayjs().format("YYYY-MM-DD");

        return new Promise((resolve, reject) => {
            db.all(sql, today,
                (err, rows) => {
                    if (err)
                        reject(err);
                    else {
                        resolve(rows);
                        db.close();
                    }
                });
        });
    }

    this.getWatchedBefore = (date) => {
        const db = new sqlite.Database('./films.db', (err) => { if (err) throw err; });
        const sql = "SELECT * FROM films WHERE watchdate < ?";
        const d = date.format("YYYY-MM-DD");

        return new Promise((resolve, reject) => {
            db.all(sql, d,
                (err, rows) => {
                    if (err)
                        reject(err);
                    else {
                        resolve(rows);
                        db.close();
                    }
                });
        });
    }

    this.getRatingGE = (r) => {
        const db = new sqlite.Database('./films.db', (err) => { if (err) throw err; });
        const sql = "SELECT * FROM films WHERE rating >= ?";

        return new Promise((resolve, reject) => {
            db.all(sql, r,
                (err, rows) => {
                    if (err)
                        reject(err);
                    else {
                        resolve(rows);
                        db.close();
                    }
                });
        });
    }

    this.getTitles = (title) => {
        const db = new sqlite.Database('./films.db', (err) => { if (err) throw err; });
        const sql = "SELECT * FROM films WHERE title = ?";

        return new Promise((resolve, reject) => {
            db.all(sql, title,
                (err, rows) => {
                    if (err)
                        reject(err);
                    else {
                        resolve(rows);
                        db.close();
                    }
                });
        });
    }

    this.storeFilm = (f) => {
        const db = new sqlite.Database('./films.db', (err) => { if (err) throw err; });
        const sql = "INSERT INTO films (id,title,favorite,watchdate,rating) VALUES (?,?,?,?,?)";

        return new Promise((resolve, reject) => {
            db.run(sql, [f.id, f.title, f.favorite, f.watchDate, f.score],
                function (err) {
                    if (err) {
                        console.log("Failure!");
                        reject(err);
                    }
                    else {
                        console.log("Success! Inserted " + f.toString());
                        db.close();
                        resolve();
                    }
                });
        });
    }

    this.deleteFilm = (id) => {
        const db = new sqlite.Database('./films.db', (err) => { if (err) throw err; });
        const sql = "DELETE FROM films WHERE id = ?";

        return new Promise((resolve, reject) => {
            db.run(sql, id,
                function (err) {
                    if (err) {
                        console.log("Failure!");
                        reject(err);
                    }
                    else {
                        console.log(`Success! Film with id ${id} is no more in the database`);
                        db.close();
                        resolve();
                    }
                });
        });
    }

    this.deleteDates = () => {
        const db = new sqlite.Database('./films.db', (err) => { if (err) throw err; });
        const sql = "UPDATE films SET watchdate = NULL";

        return new Promise((resolve, reject) => {
            db.run(sql, [],
                function (err) {
                    if (err) {
                        console.log("Failure!");
                        reject(err);
                    }
                    else {
                        console.log("Success! All watchdates deleted");
                        db.close();
                        resolve();
                    }
                });
        });
    }

}


async function main() {
    let lib1 = new FilmLibrary();
    const film = new Film(33, "Laurea", true, dayjs("2022-03-18"), 100);

    await lib1.storeFilm(film)
        .then()
        .catch((err) => console.log(err));

    await lib1.deleteFilm(33)
        .then()
        .catch((err) => console.log(err));


    await lib1.deleteDates()
        .then()
        .catch((err) => console.log(err));



    let list = [];
    list = await lib1.getAllFromDB()
        .then((result) => list = [...result])
        .catch((err) => console.log(err));

    console.log("************ TODAY LIST ************");
    console.log(list);
    console.log("   ************ END ************")
}



main();