  function submit(oracion, nivel){
      var nac = document.getElementById('nac').value
      var trans = document.getElementById('trans').value
      var edad = document.getElementById('edad').value
      var provincia = document.getElementById('provincia').value
      var genero = document.getElementById('genero').value

      var timesCompleted = checkIfCompleted()

      if(nac == ""){
        var guardarAlert = document.getElementById('guardarAlert');
        guardarAlert.className = "alert alert-danger"
        return
      }

      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", "response?nac=" + nac + "&trans=" + trans + "&genero=" + genero + "&provincia=" + provincia + "&edad=" + edad + "&oracion=" + oracion + "&nivel=" + nivel, true );
      xmlHttp.send( null );
      timesCompleted++
      document.cookie = "submisionCompleted=" + timesCompleted + ";";
      if(timesCompleted < 5){
        document.body.innerHTML="Gracias por participar, en instantes se le proporcionará otro audio para escuchar, si desea salir, puede hacerlo ahora y continuar mas adelante...";
        setTimeout(function(){ location.reload(); }, 4000);
      }
      else
        document.body.innerHTML="Gracias por participar, eso es todo, si querés parcipar de más experimentos podés entrar en...";
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

function checkIfCompleted(){
  var sub = getCookie("submisionCompleted");
  if (sub == "") {
    var all = document.getElementById("all");
      all.className = "";
      return 0
    }

  sub = parseInt(sub)
  if (sub < 5) {
      var all = document.getElementById("all");
      all.className = "";
      return sub
  }else{
    document.body.innerHTML="Gracias por participar, eso es todo, si querés parcipar de más experimentos podés entrar en...";
    return 5
  }
}

function guardar(){
  var edad = document.getElementById('edad').value;
  var provincia = document.getElementById('provincia').value;
  var genero = document.getElementById('genero').value;
  var missing = false;
  if(edad == -1){
      missing = true;
      var edadAlert = document.getElementById('edadAlert');
      edadAlert.className = "alert alert-danger"
  }
  if(genero == "-"){
      missing = true;
      var generoAlert = document.getElementById('generoAlert');
      generoAlert.className = "alert alert-danger"
  }
  if(provincia == "-"){
      missing = true;
      var provinciaAlert = document.getElementById('provinciaAlert');
      provinciaAlert.className = "alert alert-danger"
  }
  if(missing)
      return;
  var datosPersonales = document.getElementById("datosPersonales");
  datosPersonales.className = "hide";
  var infoGral = document.getElementById("infoGral");
  infoGral.className = "hide";
  var instrucciones = document.getElementById("instrucciones");
  instrucciones.className = "btn-group.bootstrap-select"

}
var reproduccionesRestantes = 2;
var notified = false;
function play(){
  var oAudio = document.getElementById('myaudio');
  if(!oAudio.paused)
    return;
  reproduccionesRestantes--;
  document.getElementById("contador").innerHTML = "Te quedan " + reproduccionesRestantes + " reproducciones";
  oAudio.play();
  if(reproduccionesRestantes == 0)
    document.getElementById('playExp').disabled="disabled"
}

function entendido(){
  var instrucciones = document.getElementById("instrucciones");
  instrucciones.className = "hide"
  var experimento = document.getElementById("experimento");
  experimento.className = "form-group";
}