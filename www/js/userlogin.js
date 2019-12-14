






function showLoginPage(){
	
	activePage = "loginPage";
	IntroPage.style.display= "none";
	login_create_nodes();
}



function login_create_nodes(){
	var mainlogin = document.createElement('div');
	loginPage.appendChild(mainlogin);
	
	
	var singin = document.createElement('button');
	singin.className="myButton";
	singin.innerHTML="Sign In";
	singin.style.cssText="width:60%;";
	mainlogin.appendChild(singin);

	var img1 = document.createElement('img');
	img1.style.cssText="width:40px;height:40px;padding-top:0.8em;"
	img1.src="img/signin_300_w.png";
	singin.appendChild(document.createElement('br'));
	singin.appendChild(img1);



	var login = document.createElement('button');
	login.className="myButton";
	login.innerHTML="Log In";
	login.style.cssText="width:60%;";
	mainlogin.appendChild(login);

	var img2 = document.createElement('img');
	img2.style.cssText="width:40px;height:40px;padding-top:0.8em;"
	img2.src="img/login_300_w.png";
	login.appendChild(document.createElement('br'));
	login.appendChild(img2);
	
	//EVENTS
	singin.addEventListener(TOUCH_START, function(){
		openmypopup(login.offsetTop,"&#x2709; Email:","all",100,"width:10em;",singin_email);
	},false);
	
	login.addEventListener(TOUCH_START, function(){mainlogin.remove(); showinsertpasswordPage();},false);
}


function singin_email(em0){
	useremail =em0.toLowerCase();
	openmypopup("150px","Insert again email:","all",100,"width:10em;",singin_email2);
	
	
}

function singin_email2(em1){
	useremail2 = em1.toLowerCase();
	if (useremail2==useremail ){
		var form = new FormData();
		form.append('email', useremail);
		ajax_signin_str(form);	
		
		//bloquear boton hasta que llegue ajax
		loginPage.style.display="none";
	}
	else
	{	

	alert("Mails don't mach. Start again.");
		
	}
	
	
}







function ajax_signin_str(form){
		
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() { 
		if (xhr.readyState == 4) {
			if (xhr.status == 200) 
			{
				var str = xhr.responseText;//add date(not necessary) and id to news objcets!!!!!!!!!!!!!!
				console.log(str);
				
				
				if (str=="emailnotvalid"){
					alert('Your email is not valid');
				}
				else if (str=="insertedintable" || str=="emailintable" ){
					alert("An email with your password has been sent. Search in your spam if you don't find it.\r\n Click log-in to use the app and insert your password.");
				}
				else if (str=="sentfailed"){
					alert("Email with password couldn't be sent for unknown reason.")
				}
				loginPage.style.display="block";
			} 
			else
			{
				
			}
		}
	};
	
	xhr.open('POST', 'http://climbingseries.com/scripts/myphp/signin_app.php', true);    //  NO CACHE: ?t=' + Math.random()
	xhr.send(form);


}




//#####################################
//#####################################
//#####################################
//#####################################
//######################################
//#####LOGIN###############################
//#####################################
//#####################################
//#####################################




function showinsertpasswordPage(){
	
	activePage = "insertpasswordPage";
	insertpassword_create_nodes();
	
}




function insertpassword_create_nodes(){
	
	
	var passwordmainnode = document.createElement('div');
	passwordmainnode.id="passwordmainnode";
	insertpasswordPage.appendChild(passwordmainnode);
	
	
	
	
	
	var r0 = document.createElement('div');
	r0.className="myButton";
	r0.style.cssText="width:60%;display:inline-block;margin-top:4em;padding-bottom:2em;border-radius: 25px;";
	passwordmainnode.appendChild(r0);
	
	var r01 = document.createElement('div');
	r0.appendChild(r01);
	var i0 = document.createElement('img');
	i0.src = 'img/email_300_w.png';
	i0.style.cssText="width:2em; padding-top:0.6em; padding-bottom:0.6em;";
	r01.appendChild(i0);
	
	var r02 = document.createElement('div');
	r0.appendChild(r02);
	var atext0 = document.createElement("INPUT");
	atext0.id="input_email";
	atext0.style.cssText="width:10em;"
	atext0.setAttribute("type", "text");
	atext0.maxLength = "100";
	r02.appendChild(atext0);
	
	
	var r03 = document.createElement('div');
	r0.appendChild(r03);
	var i1 = document.createElement('img');
	i1.src = 'img/password_300_w.png';
	i1.style.cssText="width:2em; padding-top:1em; padding-bottom:0.6em;";
	r03.appendChild(i1);
	
	var r04 = document.createElement('div');
	r0.appendChild(r04);
	var atext1 = document.createElement("INPUT");
	atext1.id="input_password";
	atext1.style.cssText="width:8em; "
	atext1.setAttribute("type", "text");
	atext1.maxLength = "6";
	r04.appendChild(atext1);
	
	passwordmainnode.appendChild(document.createElement('br'))
	
	var x0 = document.createElement('div');
	x0.className="myButton";
	x0.style.cssText="display:inline-block;margin-top:1em;padding:0.5em;";
	passwordmainnode.appendChild(x0);
	var i2 = document.createElement('img');
	i2.src = 'img/formsend_300_w.png';
	i2.style.cssText="width:4em; padding-top:0em; padding-bottom:0.0em;";
	x0.appendChild(i2);
	
	
	//######################################
	//EVENTS
	x0.addEventListener(TOUCH_START,function(){ sendloginform();},false);
	
	
}


function sendloginform(){
	
	var kmail = document.getElementById("input_email").value.toLowerCase();
	var kpass = document.getElementById("input_password").value.toUpperCase();
	useremail=kmail;
	passwordmainnode.remove();
	
	var form = new FormData();
	form.append('email', kmail);
	form.append('password',kpass),
	ajax_login_str(form);	
	
	
	//ajax_login_str(form);
}






function ajax_login_str(form){
		
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() { 
		if (xhr.readyState == 4) {
			if (xhr.status == 200) 
			{
				var str = xhr.responseText;//add date(not necessary) and id to news objcets!!!!!!!!!!!!!!
				console.log(str);
				if (str=="emailnotvalid"){
						alert("Email not right.");showLoginPage();
				}
				else if (str=="passwordnotmatch"){
					alert("Password not match");showLoginPage();
				}
				else if (str=="Notfound"){
					alert("Email not found. Check if you write it ok.");showLoginPage();
				}
				else if (str=="perfect"){
					alert("Login succesfull");
					window.localStorage.setItem("email", useremail);	
					showBluetoothPage();
				}
			}
		}
	};
	
	xhr.open('POST', 'http://climbingseries.com/scripts/myphp/login_app.php', true);    //  NO CACHE: ?t=' + Math.random()
	xhr.send(form);


}


function f_logout(){
	
	//disconnect bluetooth
	bluetoothSerial.disconnect();
	//remove email
	window.localStorage.removeItem("email");
	
	showLoginPage();
}































































































