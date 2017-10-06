"use strict";
var express = require('express');
var router = express.Router();
var app = express();

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('database.db')

var stmt = db.prepare('INSERT INTO results VALUES (?,?,?,?,?,?,?,?)')

router.get('/', function(req, res, next) {

    var error = false;
    if (req.query.oracion && req.query.nivel && req.query.edad) {
        var oracion = parseInt(unescape(req.query.oracion));
        var nivel = parseInt(unescape(req.query.nivel));
        var edad = parseInt(unescape(req.query.edad));
        if (isNaN(oracion) || isNaN(nivel) || isNaN(edad)) {
            error = true;
        }
    } else {
        error = true;
    }
    if (req.query.genero && req.query.provincia && req.query.nac && req.query.trans) {
      try{
        var ip = req.ip;
      }catch(error){
        console.log("Error with upcoming response from: ")
        console.log(req.ip)
        console.log(error)
      }
        var genero = unescape(req.query.genero);
        var provincia = unescape(req.query.provincia);
        var nac = unescape(req.query.nac);
        var trans = unescape(req.query.trans);
    } else {
        error = true;
    }
    if (error) {
        console.log("invalid data!");
        res.send('invalid');
        return;
    }
    console.log("Upcoming response from: ")
    console.log(req.ip)
    console.log(ip)
    console.log("oracion: ")
    console.log(oracion)
    console.log("nivel: ")
    console.log(nivel)
    console.log("genero: ")
    console.log(genero)
    console.log("edad: ")
    console.log(edad)
    console.log("provincia: ")
    console.log(provincia)
    console.log("LANG: ")
    console.log(nac)
    console.log("transcription: ")
    console.log(trans)

    //CREATE TABLE results(IP INT PRIMARY KEY,ORACION INT, NIVEL INT,EDAD INT,GENERO TEXT,PROVINCIA TEXT,LANG TEXT, TRANSC TEXT);
    //IP como int? ver mejor esto...
    // que pasa si alguien pone "====" en un formulario
    stmt.run(ip, oracion, nivel, edad, genero, provincia, nac, trans);
    res.send('ok');
});

var ipV4StringToInteger = function(string) {
    var hola;

    console.log(string)
    var parts = string.split(".");
    if (parts.length != 4)
        throw new Error("IPv4 string does not have 4 parts.");

    var sum = 0;

    for (var i = 0; i < 4; i++) {

        var part = parts[i];
        if (!part.match("^\\d+$"))
            throw new Error("Non-digit, non-period character in IPv4 string.");

        var partVal = Number(part);
        if (partVal > 255)
            throw new Error("IPv4 string contains invalid value.");

        sum = (sum << 8) + partVal;
    }

    return sum;
};

module.exports = router;