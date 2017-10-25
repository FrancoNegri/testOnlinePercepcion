var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();
var audioBag = [];
var levelBag = [];
var oraciones = 10;
var niveles = 5;

var THRESHHOLD = 5
router.init123 = function() {
    console.log("Initializing bag...");
    refillAudioBag();
    refillLevelBag();
    return this;
};

/* GET home page. */
router.get('/', function(req, res, next) {

    var audiosCompleted = req.query.audiosCompleted
    console.log(audiosCompleted);
    if (typeof audiosCompleted === "undefined" || audiosCompleted === "") {
        console.log(audioBag)
        if (audioBag.length === 0) {
            console.log("Refilling Audio bag...");
            refillAudioBag();
        }
        audio = audioBag.pop();
        var nuevaOracion = audio[0];
        var newLevel = audio[1];
    } else {
        if (levelBag.length === 0) {
            console.log("Refilling Level bag...");
            refillLevelBag();
        }
        var audiosCompleted = audiosCompleted.split(',');
        var nuevaOracion = parseInt(audiosCompleted[audiosCompleted.length - 1]) + 1
        if (nuevaOracion > oraciones) {
            nuevaOracion = 1
        }

        var newLevel = levelBag.pop()
    }
    console.log("Audio Asignado: " + nuevaOracion + "." + newLevel);
    res.render('index', {
        oracionN: nuevaOracion,
        nivelN: newLevel
    });
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var refillAudioBag = function(string) {
    getBag();
}

var refillLevelBag = function(string) {
    for (var j = 0; j < niveles; j++) {
        levelBag.push(j);
    }
    shuffle(levelBag);
}

var getBag = function() {
    var db = new sqlite3.Database('database.db');
    let myFirstPromise = new Promise((resolve, reject) => {
      var oracionesBag = []
      for (var i = 1; i <= oraciones; i++) {
          var nivelesBag = []
          for (var j = 0; j < niveles; j++) {
              nivelesBag.push(0);
          }
          oracionesBag.push(nivelesBag);
      }
      db.all("SELECT ORACION,NIVEL FROM results", function(err, rows) {
          rows.forEach(function(row) {
              //console.log(row.ORACION, row.NIVEL);
              if(parseInt(row.NIVEL) < niveles)
                oracionesBag[parseInt(row.ORACION) - 1][parseInt(row.NIVEL)]++;
          })
        resolve(oracionesBag)
      });
    });
    myFirstPromise.then((oracionesBag) => {
      for (var i = 1; i <= oraciones; i++) {
          for (var j = 0; j < niveles; j++) {
              if (oracionesBag[i - 1][j] < THRESHHOLD)
                  audioBag.push([i, j]);
          }
      }
      if (audioBag.length === 0)
          THRESHHOLD += 5
      shuffle(audioBag);
    });
}


function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
}

module.exports = router;