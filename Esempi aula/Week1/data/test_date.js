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


function Exam(nome,voto,data){
    this.nome = nome;
    this.voto = voto;
    this.data = data;
    this.str = function() {
        return `${this.nome} ${this.voto} ${this.data.format()}`;
    }
};

const esame2 = new Exam('WA1',30,dayjs('2022-03-02'));

//console.log(esame);
console.log(esame2.str());