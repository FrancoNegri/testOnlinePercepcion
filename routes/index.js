var express = require('express');
var router = express.Router();
var audioBag = [];
var levelBag = [];

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
  if(typeof audiosCompleted === "undefined" || audiosCompleted === ""){
    if (audioBag.length === 0){
      console.log("Refilling Audio bag...");
      refillAudioBag();
    }
    audio = audioBag.pop();
    var nuevaOracion = audio[0];
    var newLevel = audio[1];
  }else{
    if (levelBag.length === 0){
      console.log("Refilling Level bag...");
      refillLevelBag();
    }
    var audiosCompleted = audiosCompleted.split(',');
    var nuevaOracion = parseInt(audiosCompleted[audiosCompleted.length-1]) + 1
    if(nuevaOracion>oraciones){
      nuevaOracion=1
    }

    var newLevel = levelBag.pop()
  }
  console.log("Audio Asignado: " + nuevaOracion + "." + newLevel);
  res.render('index', { oracionN: nuevaOracion, nivelN: newLevel});
});

var oraciones = 10;
var niveles = 5;
var refillAudioBag = function(string){
    //re feo
    for (var i = 1; i <= oraciones; i++) {
        for (var j = 0; j < niveles; j++) {
            audioBag.push([i,j]);
        }
    }
  shuffle(audioBag);
}

var refillLevelBag = function(string){
    for (var j = 0; j < niveles; j++) {
      levelBag.push(j);
    }
  shuffle(levelBag);
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