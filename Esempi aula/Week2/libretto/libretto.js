"use strict";

//npm init
//npm install dayjs

const dayjs = require("dayjs");

let now = dayjs();
//console.log(now.format());

let libretto = [];

let esame = {
    nome : "AW1",
    voto : "30",
    data : dayjs('2022-03-04')
};


function Exam(nome, voto, code, cfu, lode, data){
    this.nome = nome;
    this.voto = voto;
    this.code = code;
    this.cfu = cfu;
    this.lode = lode;
    this.data = data;

    this.str = function() {
        return `${this.nome} ${this.voto} ${this.code} ${this.cfu} ${this.lode} ${this.data.format()}`;
    }
};


function ExamList() {
    this.list = [];

    this.add = (e) => {
        this.list.push(e);
    }

    this.average = () => {
        let avg = 0;
        for (const e of this.list)
            avg += e.voto;
        avg = avg / this.list.length;
        return avg;
    }

    this.find = (c) => {
        for (const e of this.list)
            if(e.code = c)
                return e;
        return undefined;
    }

    this.filter = (callback) => {
        for (const e of this.list)
            if(callback(e))
                return e;
        return undefined;
    }

    this.filterFunctional = (callback) => this.list.filter(callback);

    this.increase = () => {
        return this.list.map(
            x => {
                const new_x = Object.assign( {}, x, {voto: x.voto+1});
                return new_x;
            }
        );
    }
}


const wa1 = new Exam('WA1', 30, '01abc', 6, false, dayjs('2022-03-02'));
const ps = new Exam('PS', 29, '02abc', 10, false, '2022-03-08');


const exams = new ExamList();
exams.add(wa1);
exams.add(ps);

//console.log(esame);
//console.log(wa1.str());

console.log( exams.average() );

const e = exams.find('01abc');
console.log(e.str());

const e2 = exams.filter( e => (e.code == '01abc') );    //usando la callback!! stesso risultato di find
console.log(e2.str());


const e3 = exams.filterFunctional( e => (e.code == '01abc') );
console.log(e3); //non è un esame, ma è una lista di esami (con un solo elemento) --> non posso usare str

const list2 = exams.increase();
console.log(list2);