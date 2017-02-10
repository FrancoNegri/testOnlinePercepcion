var express = require('express');
var router = express.Router();
var audioBag = [];


router.init123 = function() {
    console.log("Initializing bag...");
    refillBag();
    return this;
};

/* GET home page. */
router.get('/', function(req, res, next) {
  if (audioBag.length > 0){
    audio = audioBag.pop();
  }else{
    console.log("Refilling bag...");
    refillBag();
    audio = audioBag.pop();
  }
  var oracion = audio[0];
  var nivel = audio[1];
  console.log("Audio Asignado: " + oracion + "." + nivel);
  res.render('index', { oracionN: oracion, nivelN: nivel});
});

var oraciones = 10;
var niveles = 5;
var refillBag = function(string){
    //re feo
    for (var i = 1; i <= oraciones; i++) {
        for (var j = 0; j < niveles; j++) {
            audioBag.push([i,j]);
        }
    }
  shuffle(audioBag);
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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