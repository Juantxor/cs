

var activePage = "loginPage";//"bluetoothPage","introPage" "speedPage", "workoutPage", "workoutEditPage","workoutRunPage"


function ini_intropage(){
	
    i_speedButton.addEventListener(TOUCH_START, showSpeedPage, false);
	i_workoutButton.addEventListener(TOUCH_START, function(){showWorkoutmainPage();}, false);
//i_positionButton.addEventListener(TOUCH_START, function(){}, false);//#TO    DOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
	i_logOutButton.addEventListener(TOUCH_START, function(){f_logout();  }, false);
	disconnectButton.addEventListener(TOUCH_START, b_disconnect, false);
	document.addEventListener("backbutton", onBackKeyDown, false);
	
	//para simular en chrome!!luego comentar!!#################COMMENT!!!!!!!!!!!!####################################################################################
registerBackButtonFake();
}




function onBackKeyDown() { 

  
	if (typeof(popup0)!="undefined"){
	 popup0.remove();popup1.remove();
	}
	else if (activePage =="bluetoothPage"){
	 showIntroPage();//####################################CAMBIAR AL FINAL DE DEBUGEARRRRRR######################################################################################
	}
	else if(activePage =="speedPage"){
	showIntroPage();
	thespeed=0;s_slider.value=thespeed; s_speed.innerHTML=thespeed; reset_m(); setTimeout( function(){clearInterval(s_interval)}, 780)  ; //asi se pone a 0
	}
	else if (activePage =="workoutPage"){
		showIntroPage();
	}
	else if (activePage =="workoutEditPage"){
		edit_div.remove(); 	
		showWorkoutmainPage();
	}
	else if (activePage =="workoutRunPage"){
		r_stop();rindex=0;
		run_div0.remove();
		run_div.remove();
		showWorkoutmainPage();
	}
	else if (activePage == "introPage"){
		//xml_add_request();//#######################################UNCOMMENT!!!################################################
	}
	else if (activePage == "loginPage"){
	//no hacemos nada	
	}
	else if (activePage == "insertpasswordPage"){
		if (typeof(passwordmainnode)!="undefined"){passwordmainnode.remove();}
		showLoginPage();
	}
	
	
}
 
function showBluetoothPage() {
activePage = "bluetoothPage";

b_list();
bluePage.style.display = "block";
IntroPage.style.display= "none";
SpeedPage.style.display="none";
WorkoutmainPage.style.display="none";

}
function showIntroPage() {
activePage = "introPage";
//xml_add_request();//#######################################UNCOMMENT!!!################################################
bluePage.style.display = "none";
IntroPage.style.display= "block";
SpeedPage.style.display="none";
WorkoutmainPage.style.display="none";

}	
function showWorkoutmainPage(){

activePage = "workoutPage";
/* alert(tracks);
alert(typeof(tracks));
alert(tracks==undefined); */
if (tracks==undefined){read_mytracks(); }else {add_tracks(tracks);}

bluePage.style.display = "none";
IntroPage.style.display= "none";
SpeedPage.style.display="none";
WorkoutmainPage.style.display="block";
}
function showSpeedPage() {
activePage = "speedPage";
s_sendData();
bluePage.style.display = "none";
IntroPage.style.display= "none";
SpeedPage.style.display="block";
WorkoutmainPage.style.display="none";
}  
















//####ESTO CARGA UN ANUNCIO FACILMENTE SI PONGO UN LINK EN MYADD.PHP######
function xml_add_request(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() { 
		if (xhr.readyState == 4) {
			if (xhr.status == 200) 
			{
				var str = xhr.responseText;//add date(not necessary) and id to news objcets!!!!!!!!!!!!!!
					console.log(str);
					if (str.slice(0,32) =="http://climbingseries.com/images" ) {myadd(str);}
					//else nothing
			} 
			else
			{
				
			}
		}
	};
	
	xhr.open('POST', "http://climbingseries.com/scripts/myphp/myadd.php", true);
	xhr.send()
	
}
function myadd(str){
	var addnode=document.createElement('div');
	addnode.style.cssText="position:absolute;";
	var add_img= document.createElement('img');
	add_img.style.cssText="width:100%;";
	add_img.src = str; 
	addnode.appendChild(add_img);
	
	document.body.appendChild(addnode);
	addnode.addEventListener(TOUCH_START,function(){addnode.remove();},false);
	return;
}








//######################################################################
//PARA SIMULAR BACKBUTTON EVENT EN CHROME!!::
//SIMPLEMENTE APRETAMOS Z EN EL TECLADO Y ES COMO SI LE DIERAMOS A BACK BUTTON EN EL MOVIL
//QUITAR CUANDO PUBLIQUEMOS!!!!!!!!!!!!!!!!!
//###################################################################
  
   function triggerBackButton() {
        var backButtonEvent = document.createEvent('Events');
        backButtonEvent.initEvent('backbutton', false, false);
        document.dispatchEvent(backButtonEvent);
    }

    function registerBackButtonFake() {
        document.addEventListener('keyup', function (event) {
            // z=90 //Alt+Ctrl+<
            //if (event.altKey && event.ctrlKey && event.keyCode === 188) {
              if ( event.keyCode === 90) {
			  triggerBackButton();
            }
        });
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	