"use strict";

const dayjs = require("dayjs");
const sqlite = require("sqlite3");


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

    this.getAllFromDB = () => {
        const db = new sqlite.Database('./films.db', (err) => {if (err) throw err;} );        
        const sql = "SELECT * FROM films";

        return new Promise( (resolve,reject) => {
            db.all(sql,
                (err,rows) => {
                    if(err)
                        reject(err);
                    else{
                        resolve(rows);
                        db.close();
                    }
                });
        } );
    }


    this.getFavoritesFromDB = () => {
        const db = new sqlite.Database('./films.db', (err) => {if (err) throw err;} );        
        const sql = "SELECT * FROM films WHERE favorite = 1";

        return new Promise( (resolve,reject) => {
            db.all(sql,
                (err,rows) => {
                    if(err)
                        reject(err);
                    else{
                        resolve(rows);
                        db.close();
                    }
                });
        } );
    }

    this.getWatchedToday = () => {
        const db = new sqlite.Database('./films.db', (err) => {if (err) throw err;} );        
        const sql = "SELECT * FROM films WHERE watchdate = ?";
        const today = dayjs().format("YYYY-MM-DD");

        return new Promise( (resolve,reject) => {
            db.all(sql, today,
                (err,rows) => {
                    if(err)
                        reject(err);
                    else{
                        resolve(rows);
                        db.close();
                    }
                });
        } );
    }

    this.getWatchedBefore = (date) => {
        const db = new sqlite.Database('./films.db', (err) => {if (err) throw err;} );        
        const sql = "SELECT * FROM films WHERE watchdate < ?";
        const d = date.format("YYYY-MM-DD");

        return new Promise( (resolve,reject) => {
            db.all(sql, d,
                (err,rows) => {
                    if(err)
                        reject(err);
                    else{
                        resolve(rows);
                        db.close();
                    }
                });
        } );
    }

    this.getRatingGE = (r) => {
        const db = new sqlite.Database('./films.db', (err) => {if (err) throw err;} );        
        const sql = "SELECT * FROM films WHERE rating >= ?";

        return new Promise( (resolve,reject) => {
            db.all(sql, r,
                (err,rows) => {
                    if(err)
                        reject(err);
                    else{
                        resolve(rows);
                        db.close();
                    }
                });
        } );
    }

    this.getTitles = (title) => {
        const db = new sqlite.Database('./films.db', (err) => {if (err) throw err;} );        
        const sql = "SELECT * FROM films WHERE title = ?";

        return new Promise( (resolve,reject) => {
            db.all(sql, title,
                (err,rows) => {
                    if(err)
                        reject(err);
                    else{
                        resolve(rows);
                        db.close();
                    }
                });
        } );
    }
}


async function main() {
    let lib1 = new FilmLibrary();
    
    // let filmList = [];
    // const filmList = await lib1.getAllFromDB()
    //     .then( (result) => filmList = [...result] )
    //     .catch( (err) => console.log(err) );;
    // console.log("************ LIST ************");
    // console.log(filmList);
    // console.log("************ END ************")
    
    // let favList = [];
    // favList = await lib1.getFavoritesFromDB()
    //     .then( (result) => favList = [...result] )
    //     .catch( (err) => console.log(err) );
    // console.log("************ FAV. LIST ************");
    // console.log(favList);
    // console.log("   ************ END ************")
    
    // let todayList = [];
    // todayList = await lib1.getWatchedToday()
    //     .then( (result) => todayList = [...result] )
    //     .catch( (err) => console.log(err) );
    // console.log("************ TODAY LIST ************");
    // console.log(todayList);
    // console.log("   ************ END ************")
    
    // let beforeList = [];
    // beforeList = await lib1.getWatchedBefore( dayjs("2022-03-17") )
    //     .then( (result) => beforeList = [...result] )
    //     .catch( (err) => console.log(err) );
    // console.log("************ TODAY LIST ************");
    // console.log(beforeList);
    // console.log("   ************ END ************")

    // let ratingList = [];
    // ratingList = await lib1.getRatingGE( 4 )
    //     .then( (result) => ratingList = [...result] )
    //     .catch( (err) => console.log(err) );
    // console.log("************ TODAY LIST ************");
    // console.log(ratingList);
    // console.log("   ************ END ************")

    let titleList = [];
    titleList = await lib1.getTitles( "Pulp Fiction" )
        .then( (result) => titleList = [...result] )
        .catch( (err) => console.log(err) );
    console.log("************ TODAY LIST ************");
    console.log(titleList);
    console.log("   ************ END ************")
}

main();