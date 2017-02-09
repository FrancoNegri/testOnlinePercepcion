  function submit(oracion, nivel){
      var edad = document.getElementById('edad').value;
      var provincia = document.getElementById('provincia').value;
      var genero = document.getElementById('genero').value;
      var nac = document.getElementById('nac').value;
      var trans = document.getElementById('trans').value;

      var missing = false;
      if(edad == -1){
          missingArg("pEdad");
          missing = true;
      }
      if(genero == "-"){
          missingArg("pGenero");
          missing = true;
      }
      if(provincia == "-"){
          missingArg("pProvincia");
          missing = true;
      }
      if(missing)
          return;

      checkIfCompleted();  
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", "response?nac=" + nac + "&trans=" + trans + "&genero=" + genero + "&provincia=" + provincia + "&edad=" + edad + "&oracion=" + oracion + "&nivel=" + nivel, true );
      xmlHttp.send( null );
      document.cookie = "submisionCompleted=true";
      document.body.innerHTML="Gracias por participar!";
  }
  function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }
  function missingArg(parent){
      var para = document.createElement("p.red");
      para.style = "color:red"
      var node = document.createTextNode("Por favor complete este campo");
      para.appendChild(node);
      var element = document.getElementById(parent);
      if(element.children.length == 1)
          element.appendChild(para);
      return;
  }

function checkIfCompleted(){
  var sub = getCookie("submisionCompleted");
  if (sub == "") {
  }else{
    document.body.innerHTML="Ya habías completado la encuesta!";
  }
}

function guardar(){
  var datosPersonales = document.getElementById("datosPersonales");
  datosPersonales.className = "hide";
  var infoGral = document.getElementById("infoGral");
  infoGral.className = "hide";
  var instrucciones = document.getElementById("instrucciones");
  instrucciones.className = "btn-group.bootstrap-select"

}
var vecesReproducido = 0;
var notified = false;
function play(){
  var oAudio = document.getElementById('myaudio');
  vecesReproducido++;
  if (vecesReproducido == 1){
    var playExp = document.getElementById("playExp");
    playExp.className="btn btn-warning"
  }
  if (vecesReproducido == 2){
    var playExp = document.getElementById("playExp");
    playExp.disabled="disabled"
  }
  oAudio.play();
}

function entendido(){
  var instrucciones = document.getElementById("instrucciones");
  instrucciones.className = "hide"
  var experimento = document.getElementById("experimento");
  experimento.className = "form-group";
}