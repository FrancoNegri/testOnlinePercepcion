"use strict";
var express = require('express');
var router = express.Router();
var app = express();

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('database.db')

var stmt = db.prepare('INSERT INTO results VALUES (?,?,?,?,?,?,?)')

/* GET users listing. */
router.get('/', function(req, res, next) {


	var ip = req.hostname;
	var genero = unescape(req.query.genero);
	var edad = unescape(req.query.edad);
	var provincia = unescape(req.query.provincia);
	var trans = unescape(req.query.trans);
	var nac = unescape(req.query.nac);
	var audio = unescape(req.query.audio);
    console.log( "Upcoming response from: " + ip + " genero: " + genero + " provincia: " + provincia + " transcription: " + trans + " LANG: " + nac + " audio: " + audio );
    //CREATE TABLE results(IP INT,EDAD INT,GENERO TEXT,PROVINCIA TEXT,LANG TEXT, TRANSC TEXT);
    stmt.run(ip,audio, edad,genero,provincia,nac,trans );
    res.send('respond with a resource');
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
