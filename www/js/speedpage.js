//cuando hago showSpeedPage empiezo a enviar datos bluetooth con velocidad cada 300ms
//cuando le doy a backbutton para de enviar.

var thespeed=0;

var s_interval;

function ini_speedpage(){
	
	s_speed_less.addEventListener(TOUCH_START, s_slider_left, false);
	s_speed_more.addEventListener(TOUCH_START, s_slider_right, false);
	s_slider.addEventListener('input', s_slider_range, false);
	s_reset_m.addEventListener('click', reset_m, false);
	s_voiceonoff.addEventListener('click', ff7_1, false);
}

function reset_m(){
	relative_meters=0;
}
	
function s_slider_left(){
	if (thespeed==0){}else{thespeed -= 1;s_slider.value=thespeed; s_speed.innerHTML=thespeed;}
}
function s_slider_right(){
	if (thespeed==60){}else{thespeed =thespeed+ 1;s_slider.value=thespeed; s_speed.innerHTML=thespeed;}
}
function s_slider_range(){
	s_speed.innerHTML= s_slider.value;
	thespeed=parseInt(s_slider.value);//ojo que es un strin el .value!
}


function s_sendData(){
		s_interval= setInterval(myTimer ,400);//con 500 va bien, con 50 no va nada bien con 150 tampoco va bien, con 250 va mal se ve en workoutrun, con 400bien,  tarda la vida y lo hace todo de repente...
}
function myTimer(){
	
	
	var success = function() {
        };
    var failure = function() {
            //console.log("speed data not sent");
			//alert("Failed writing data to Bluetooth peripheral");
        };
if (typeof(thespeed) != "number"){console.log('thespeed is  not a number');}
	var strtosend = ("0" + thespeed.toFixed()).slice(-2) + "x";//we send "02x" "23x"....
	bluetoothSerial.write(strtosend, success, failure);
	
}









//#######SPEECH RECOGNITION#######################//





// <button onclick="ff1();" class="myButton">Is recognition available?</button>

var its_available=false;
var has_permission=false;

function ff1(){
  window.plugins.speechRecognition.isRecognitionAvailable(
  function(successCallback){ 
  if (successCallback){its_available=true;}  else   {alert("Go to you settings and activate speech recognition.");its_available=false;}
  }, 
  function(errorCallback){ alert(errorCallback);return false;}
  );	
}

function ff2(){//<button onclick="ff2();">Get Supported Languages</button>
  window.plugins.speechRecognition.getSupportedLanguages(
  function(successCallback){ alert(successCallback);}, 
  function(errorCallback){ alert(errorCallback);}
  );	
}
function ff3(){
  window.plugins.speechRecognition.hasPermission(
  function(successCallback){ console.log(successCallback); has_permission=true;}, 
  function(errorCallback){ alert(errorCallback); has_permission=false;}
  );	
}
function ff4(){
  window.plugins.speechRecognition.requestPermission(
  function(successCallback){ console.log(successCallback);has_permission=true;}, //successCallback= 'Ok'
  function(errorCallback){ alert(errorCallback); has_permission=false}
  );	
}







function ff6(){//<button onclick="ff6();">stop</button>
	window.plugins.speechRecognition.stopListening(
  function(successCallback){ console.log(successCallback); s_voiceonoff.style.opacity = "1"; }, 
  function(errorCallback){ console.log(errorCallback);}
  );	
}


function ff7_1(){
	if ( s_voiceonoff.style.opacity == "0.5"){  
		ff6(); //STOP
		setTimeout(ff6, 4000);//si le doy a stop despues de que acierte una palabra tengo 4 secs en que se va a volver a ejecutar, es necesario volver a cerrarlo
		return;
	}
	else {
	  ff1();
	  ff3(); if (!has_permission ) {ff4();}
	  //alert('aqui');
	  //alert(its_available); // es asincrono parece, asi que vale 0 la primera vez...
	  //alert(has_permission);// es asincrono parece, asi que vale 0 la primera vez...
	  if (its_available && has_permission){
		 s_voiceonoff.style.opacity = "0.5"; 
		 ff7_continuous();  
	  }
	}  
  
}






//onclick="ff7_1();" id="s_voiceonoff" TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO


function ff7_continuous(){        //<button onclick="ff5();">start</button>

	options = {
	  language: navigator.language, //"en-US",
	  matches:1,
	  prompt:  "Hi!",   //ESTO ES PARA EL DIALOGO DE GOOGLE
	  showPopup:false, //ESTO HACE QUE NO APAREZCA EL DIALOGO DE GOOGLE !!! 
	  showPartial:false, //esto debe de ir dando resultados a medida que hablas
	};
	
window.plugins.speechRecognition.startListening(
	function(successCallback){
		var anumber = parseInt(successCallback);
		if (anumber!=NaN && anumber>=0 && anumber <= 60){	
			thespeed = anumber;
			s_speed.innerHTML= thespeed;
			s_slider.value = thespeed;
			setTimeout(ff7_continuous, 4000);
		}
		else {
			playAudio("img/couldyourepeat.mp3");
			setTimeout(ff7_continuous, 1700);
		}
			
	   
	  },//DEVUELVE ESTO CD DICES UNA PALABRA
	  
	function(errorCallback){ 
	setTimeout(ff7_continuous, 1100); 
	},options);   //DEVUELVE ESTO SI NO HAY SPEECH INPUT, es decir si no hablas! 

	
}







//#######################
//ejemplos:
function ff5(){//<button onclick="ff5();">start</button>
	
options = {
  language: navigator.language, //"en-US",
  matches:1,
  prompt:  "Hi!",   //ESTO ES PARA EL DIALOGO DE GOOGLE
  showPopup:false, //ESTO HACE QUE NO APAREZCA EL DIALOGO DE GOOGLE !!! 
  showPartial:false, //esto debe de ir dando resultados a medida que hablas
};

window.plugins.speechRecognition.startListening(
  function(successCallback){ alert(successCallback);},//DEVUELVE ESTO CD DICES UNA PALABRA
  function(errorCallback){ alert(errorCallback);},//DEVUELVE ESTO SI NO HAY SPEECH INPUT, es decir si no hablas! 
  options);
	
}











//###################################
//PLUGIN MEDIA.AUDIOS:
function musica(){
	playAudio("img/beep-29.mp3");	
	playAudio("img/beep-10.mp3"); 
}
function getPhoneGapPath() {//console.log(window.location.pathname)// en el movil devuelve: "/android_asset/www/index.html";
    var path = window.location.pathname;
    path = path.substr( path, path.length - 10 );
    return 'file://' + path;//="file:///android_asset/www/"
};
function playAudio(subpath) {//subpath='test.wav' o 'img/test.wav'
		    
    var my_media = new Media(getPhoneGapPath() +subpath,
            // success callback
             function () { console.log("playAudio():Audio Success"); },
            // error callback
             function (err) { console.log("playAudio():Audio Error: " + err);
console.log(err);			 }
    );
           // Play audio
    my_media.play();
}











	