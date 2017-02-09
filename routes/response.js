"use strict";
var express = require('express');
var router = express.Router();
var app = express();

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('database.db')

var stmt = db.prepare('INSERT INTO results VALUES (?,?,?,?,?,?,?,?)')

/* GET users listing. */
router.get('/', function(req, res, next) {

  //res.status(status).send("Hello world, this should be sent inmediately");
  var ip = req.hostname;
  var genero = unescape(req.query.genero);
  var edad = unescape(req.query.edad);
  var provincia = unescape(req.query.provincia);
  var trans = unescape(req.query.trans);
  var nac = unescape(req.query.nac);
  var oracion = unescape(req.query.oracion);
  var nivel = unescape(req.query.nivel);
  console.log( "Upcoming response from: " + ip + " oracion: " + oracion + " nivel: " + nivel + " audio: "+ audio + " genero: " + genero + " provincia: " + provincia + " transcription: " + trans + " LANG: " + nac + " audio: " + audio );
  //CREATE TABLE results(IP INT,ORACION INT, NIVEL INT,EDAD INT,GENERO TEXT,PROVINCIA TEXT,LANG TEXT, TRANSC TEXT);
  //IP como int? ver mejor esto...
  // que pasa si alguien pone "====" en un formulario
  stmt.run(ip,oracion,nivel, edad,genero,provincia,nac,trans );
  res.send('ok');
});


var ipV4StringToInteger = function(string) {
  var parts = string.split(".");
  if(parts.length != 4)
    throw new Error("IPv4 string does not have 4 parts.");

  var sum = 0;

  for(var i = 0; i < 4; i++) {

    var part = parts[i];
    if(!part.match("^\\d+$"))
      throw new Error("Non-digit, non-period character in IPv4 string.");

    var partVal = Number(part);
    if(partVal > 255)
      throw new Error("IPv4 string contains invalid value.");

    sum = (sum << 8) + partVal;
  }

  return sum;
};

module.exports = router;
