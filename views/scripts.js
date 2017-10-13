  var alreadySubmmited = false
  var maxTimesToComplete = 5

  function submit(oracion, nivel) {
      //datos de la encuesta
      var nac = document.getElementById('nac').value
      var trans = document.getElementById('trans').value
      var timesComplet = timesCompleted()

      if (nac == "") {
          var guardarAlert = document.getElementById('guardarAlert');
          guardarAlert.className = "alert alert-danger"
          return
      }
      if (alreadySubmmited == true)
          return

      var [edad, provincia, genero] = getPersonalData();
      var xmlHttp = new XMLHttpRequest();
      url = "response?nac=" + nac + "&trans=" + trans + "&genero=" + genero + "&provincia=" + provincia + "&edad=" + edad + "&oracion=" + oracion + "&nivel=" + nivel
      alreadySubmmited = true
      timesComplet++
      document.cookie = "timesComplet=" + timesComplet + ";";
      if (timesComplet < maxTimesToComplete) {
          var previousAudios = getCookie("audiosCompleted")
          if (previousAudios == "") {
              document.cookie = "audiosCompleted=" + oracion + ";";
          } else {
              document.cookie = "audiosCompleted=" + previousAudios + "," + oracion + ";";
          }
      }
      httpGetAsync(url, showFinalOfPoll)
  }

  function httpGetAsync(theUrl, callback) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              callback(xmlHttp.responseText);
      }
      xmlHttp.open("GET", theUrl, true); // true for asynchronous 
      xmlHttp.send(null);
  }

  function showFinalOfPoll(response) {
      var timesComplet = timesCompleted()
      var experimento = document.getElementById("experimento");
      experimento.className = "hide";
      if (timesComplet < maxTimesToComplete) {
          var otherTry = document.getElementById('otherTry');
          otherTry.className = ""
      } else {
          var noMoreTries = document.getElementById('noMoreTries');
          noMoreTries.className = ""
      }
  }

  function continuar() {
      var audios = getCookie("audiosCompleted")
      var url = "?audiosCompleted=" + audios
      console.log(url)
          //httpGetAsync(url, refresh)
      window.location.href = url
  }

  function refresh(response) {
      document.body.innerHTML = response;
      location.reload();
  }

  function getPersonalData() {
      if (getCookie("personalInfo") === "") {
          var edad = document.getElementById('edad').value
          var provincia = document.getElementById('provincia').value
          var genero = document.getElementById('genero').value
      } else {
          var edad = getCookie("edad");
          var provincia = getCookie("provincia");
          var genero = getCookie("genero");
      }
      return [edad, provincia, genero];
  }

  function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
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

  function checkIfCompleted() {
      if (timesCompleted() < maxTimesToComplete) {
          var personalInfo = getCookie("personalInfo")
          if (personalInfo === "") {
              showPoll();
          } else {
              showInstructions();
              entendido();
              showPoll();
          }
      } else {
          document.body.innerHTML = "¡Muchas gracias por tu participación! Ya podés cerrar la ventana del navegador.";
      }
  }

  function showPoll() {
      var all = document.getElementById("all");
      all.className = "";
  }


  function timesCompleted() {
      var sub = getCookie("timesComplet");
      if (sub === "") {
          return 0
      }
      sub = parseInt(sub)
      return sub
  }

  function guardar() {
      var edad = document.getElementById('edad').value;
      var provincia = document.getElementById('provincia').value;
      var genero = document.getElementById('genero').value;
      var missing = false;
      if (edad == -1) {
          missing = true;
          var edadAlert = document.getElementById('edadAlert');
          edadAlert.className = "alert alert-danger"
      }
      if (genero == "-") {
          missing = true;
          var generoAlert = document.getElementById('generoAlert');
          generoAlert.className = "alert alert-danger"
      }
      if (provincia == "-") {
          missing = true;
          var provinciaAlert = document.getElementById('provinciaAlert');
          provinciaAlert.className = "alert alert-danger"
      }
      if (missing)
          return;
      document.cookie = "personalInfo=ok;";
      document.cookie = "edad=" + edad + ";";
      document.cookie = "provincia=" + provincia + ";";
      document.cookie = "genero=" + genero + ";";
      showInstructions();
  }

  function showInstructions() {
      var datosPersonales = document.getElementById("datosPersonales");
      datosPersonales.className = "hide";
      var infoGral = document.getElementById("infoGral");
      infoGral.className = "hide";
      var instrucciones = document.getElementById("instrucciones");
      instrucciones.className = "btn-group.bootstrap-select"
  }

  var reproduccionesRestantes = 2;
  var notified = false;

  function play() {
      var oAudio = document.getElementById('myaudio');
      if (!oAudio.paused)
          return;
      reproduccionesRestantes--;
      document.getElementById("contador").innerHTML = "Te quedan " + reproduccionesRestantes + " reproducciones";
      oAudio.play();
      if (reproduccionesRestantes == 0)
          document.getElementById('playExp').disabled = "disabled"
  }

  function entendido() {
      var instrucciones = document.getElementById("button2Div");
      instrucciones.className = "hide"
      var experimento = document.getElementById("experimento");
      experimento.className = "form-group";
  }