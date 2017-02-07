var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //Determino una oracion
  var oracion = Math.floor(Math.random() * 10) + 1;
  //Determino un nivel
  var nivel = Math.floor(Math.random() * 5);
  //Renderizo pag
  res.render('index', { oracionN: oracion, nivelN: nivel});
});
 
module.exports = router;
