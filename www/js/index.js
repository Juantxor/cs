// (c) 2013-2015 Don Coleman
//uso el plugin de don coleman para el bluetooth


var TOUCH_START = 'touchstart' //'touchstart';
        if (window.navigator.msPointerEnabled) { // windows phone
            TOUCH_START = 'MSPointerUp';
        }

		
var useremail;
var useremail2;


function on_load_index(){
	document.addEventListener('deviceready', start_my_program, false);
	return;
}	

function start_my_program(){
	
	
	ini_intropage();
	ini_speedpage();
	ini_workoutpage();
	ini_workoutrunpage();
	ini_workouteditpage();
	ini_BluePage();
	
	
useremail = window.localStorage.getItem("email");
if (useremail == null){showLoginPage();} else {showBluetoothPage();}

	
}






	
	
		



 

 
 
 
 
 
 
 
 
 
 
 
 
 
 

  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  




