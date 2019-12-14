


var tracks;   //ejemplo:{"track1":[20,30,33,23,23,55,"x23",20,30,33], "track2":[20,30,33,23,23,55,"x23",20,30,33],"track3":[20,30,33,23,23,55,"x23",20,30,33],"track4":[20,30,33,23,23,55,"x23",20,30,33]}
var currenttrack=[];//ejemplo:["track1":[20,30,33,23,23,55,"x23",20,30,33]]
	
	
	
function read_mytracks(){
	var form = new FormData();
	form.append('email', useremail);
	ajax_load_mytracks(form);
	return;
	
}	
function ajax_load_mytracks(form){
		
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() { 
		if (xhr.readyState == 4) {
			if (xhr.status == 200) 
			{
				var str = xhr.responseText;//add date(not necessary) and id to news objcets!!!!!!!!!!!!!!
				tracks = JSON.parse(str);
				//alert(xhr.getAllResponseHeaders());
				add_tracks(tracks);
				
			} 
			else
			{	//alert('insidenotseparar200');
				//alert(xhr.status);
				//alert(xhr.getAllResponseHeaders());//me lo devuelve vacio, significa que ni llega a server.
			}
		}
	};
	  
	xhr.open('POST', 'http://climbingseries.com/scripts/myphp/loading_workouts.php', true);    //  NO CACHE: ?t=' + Math.random()
	xhr.send(form);


}

function save_mytracks(){
	var form = new FormData();
	form.append('email', useremail);
	form.append('tracks',JSON.stringify(tracks) );
	ajax_save_mytracks(form);
	return;
}
function ajax_save_mytracks(form){
		
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() { 
		if (xhr.readyState == 4) {
			if (xhr.status == 200) 
			{
				var str = xhr.responseText;//add date(not necessary) and id to news objcets!!!!!!!!!!!!!!
				console.log(str);
				alert(str);
				WorkoutmainPage.style.display="block";
				
			} 
			else
			{
				
			}
		}
	};
	  
	xhr.open('POST', 'http://climbingseries.com/scripts/myphp/saving_workouts.php', true);    //  NO CACHE: ?t=' + Math.random()
	xhr.send(form);


}

	

function ini_workoutpage(){
	
	
	
	//si no quiero usar ajax requiest descomento esto:
	//tracks=JSON.parse('{"track1":[50,30,8,23,23,7,"SetONEx03",20,30,9,20,30,5,"setTWOx02",66,77,5,20,30,2,"setTRESx01"], "track2":[20,30,33,23,23,55,"setoneex23",20,30,33,"melox01"],"track3":[20,30,33,23,23,55,"setfuckx23",20,30,33,"perax02"],"track4":[20,30,33,23,23,55,"settx23",20,30,33,"pasax04"]}');
		
	w_create.addEventListener(TOUCH_START, function(){openmypopup(w_create.offsetTop,"Name of the workout:","only30alphanumeric_space",30,"width:10em;",add_new_track)}, false);
	w_saving.addEventListener(TOUCH_START, function(){WorkoutmainPage.style.display="none";save_mytracks();}, false);
	
}






function openmypopup(mytopoffset, str1,typeofstring,maxlength,width,mycallback){
	
	
//GREY BODY	
	var newDiv = document.createElement("div");
	newDiv.style.cssText="position: absolute;left: 0px;top: 0px;width:100%;height:100%;background:#2a2218;opacity:0.6;"
	//newDiv.style.opacity = "0.5";
	newDiv.innerHTML="";
	newDiv.id="popup0";
	document.body.appendChild(newDiv); 
newDiv.addEventListener(TOUCH_START, function(){ popup0.remove();popup1.remove();}
	);
 

//POP UP
var newContent = document.createElement("div"); //este div ocupa el 100 de ancho
newContent.id="popup1";
newContent.style.cssText="position:absolute;top:"+ mytopoffset +"px;left:0px;width:100%;margin:0;padding:0;text-align:center;";
var newContent2 = document.createElement("div"); 
newContent2.className="myButton";
newContent2.style.cssText="width:60%;display: inline-block;"; //text-align me alinea elementos inline-block; com div no lo tengo que convertirlo.
newContent.appendChild(newContent2);

var x1= document.createElement("span"); 
x1.innerHTML=str1;  //dentro del segundo div puedo meter lo que quiera y text-align funcionará.
newContent2.appendChild(x1);

newContent2.appendChild(document.createElement("br"));//con esto consigo bajar de línea!
newContent2.appendChild(document.createElement("br"));//con esto consigo bajar de línea!


var itext2 = document.createElement("INPUT");
itext2.id="user_input_tex";
itext2.style.cssText=width; //
itext2.setAttribute("type", "text");
itext2.maxLength = maxlength;

newContent2.appendChild(itext2);


itext2.addEventListener("keyup", function(){
	// only digits:    /^\d*\.?\d*$/.test("0023.300"); returns true or false.
	//only letters and digits:  /^\w*$/.test("0023`36s0");returns true or false.
	
		if (event.keyCode === 13) {
			if  (itext2.value==""){newDiv.remove();	newContent.remove();return;}
			//else if (typeofstring=="all"){}
			else if (typeofstring=="only15alphanumeric" && ! /^\w*$/.test(itext2.value) ){ alert('Only alphanumeric and underscore chars');}
			else if (typeofstring=="only30alphanumeric_space" && ! /^[\w ]*$/.test(itext2.value) ){ alert('Only alphanumeric,space or underscore chars');}
			else if (typeofstring=="onlydigits" && !  /^\d*$/.test(itext2.value) ){ alert('Only numbers');}
			
			else if (typeofstring=="onlydigitsmax99" && !  /^\d*$/.test(itext2.value) ) { alert('Only numbers, max 99');}
			
			else if (typeofstring=="onlydigitsmax60" && !  /^\d*$/.test(itext2.value) ) { alert('Only numbers');}	 
			else if (typeofstring=="onlydigitsmax60" && parseInt(itext2.value) > 60 ) {alert('Max 60');}
			
			else if (typeofstring=="onlydigitsmax999" && !  /^\d*$/.test(itext2.value) ) { alert('Only numbers');}	 
			else if (typeofstring=="onlydigitsmax999" && parseInt(itext2.value) > 999 ) {alert('Max 999');}
				
			
			
			else if (typeofstring=="onlyfloat" && !  /^\d*\.?\d*$/.test(itext2.value) ){ alert('Only float numbers');}
			else
			{
			mycallback(itext2.value);
			newDiv.remove();
			newContent.remove();
			
			}			
		}
	
			
			
			}
			);
			
newContent2.appendChild(document.createElement("br"));
newContent2.appendChild(document.createElement("br"));


document.body.appendChild(newContent);
//itext2.value="zorra";

//user_input_tex.focus(); //ESTO NO VA, PIERDE EL FOCUS;
setTimeout(function(){user_input_tex.focus();}, 200);//ES NECESARIO PONER UN TIMEOUT O PIERDE EL FOCUS...

return;	
}




function add_new_track(aname){
	tracks[aname]=[];
	add_tracks();
	document.getElementById(aname).scrollIntoView();	
}	
function add_tracks(){
	
	trackList.innerHTML=""; //borrarla y crearla de nuevo siempre que mostramos la pagina WorkoutmainPage
	
	const entries = Object.entries(tracks);//asi es como se itera un objeto correctamente...
	for (const [nametrack, infotrack] of entries) {
	  var lili = document.createElement('li');
	  lili.style.cssText="display: flex;justify-content: space-between;"
	  
	  var aspan1= document.createElement('span');
	  aspan1.innerHTML = '<b>' + nametrack + '</b>';
	  aspan1.id=nametrack;
	  aspan1.style.cssText="padding-left:2em;line-height:200%;";
	  aspan1.addEventListener(TOUCH_START,  function(){}, false);
	  lili.appendChild(aspan1);
	  
	  
	  var aspan2= document.createElement('span');
	  lili.appendChild(aspan2)
	  
	  
	  var trun = document.createElement('img');
	  trun.src = 'img/play_300_w.png';
	  trun.style.cssText="width:2em; padding-left:2em;";
	  trun.addEventListener(TOUCH_START,  function(){showRunWorkoutPage([nametrack,infotrack]);}, false);
	  aspan2.appendChild(trun);
	  
	  var tedit = document.createElement('img');
	  tedit.src = 'img/edit_300_w.png';
	  tedit.style.cssText="width:2em; padding-left:2em;";
	  tedit.addEventListener(TOUCH_START,  function(){showEditWorkoutPage([nametrack,infotrack]);}, false);
	  aspan2.appendChild(tedit);
	  
	  
	  var ttrash = document.createElement('img');
	  ttrash.src = 'img/trash_300.png';
	  ttrash.style.cssText="width:2em; padding-left:2em; padding-right:1em;";
	  ttrash.addEventListener(TOUCH_START,  function(){trackDelete([nametrack,infotrack]);}, false);
	  aspan2.appendChild(ttrash);
	  
	  lili.appendChild(aspan2);
	  
	  
	  trackList.appendChild(lili); 
	}

	return;
	
}

	 
function trackDelete(atrack){
	delete tracks[atrack[0]];
	add_tracks();
}
	





















































// id-email-password-string
	//array=[['nametrack',v1,v2,ss,v1,v2,ss,'x003',v1,v2,v3....], ['nametrack',v1,v2,ss,v1,v2,ss,'x003',v1,v2,v3....]]
	//var obj = JSON.parse('{'track1':[20,30,33,23,23,55,'x23',20,30,33], 'track2':[20,30,33,23,23,55,'x23',20,30,33]}');
	//var str = JSON. stringify({"track1":[20,30,33,23,23,55,"x23",20,30,33], "track2":[20,30,33,23,23,55,"x23",20,30,33]})

	
	//JSON.parse('{"track1":[20,30,33,23,23,55,"x23",20,30,33], "track2":[20,30,33,23,23,55,"x23",20,30,33]}'); asi funciona
	//JSON.parse("{'track1':[20,30,33,23,23,55,'x23',20,30,33], 'track2':[20,30,33,23,23,55,'x23',20,30,33]}"); asi no funciona!!!


//...
	//var storedNames = JSON.parse(localStorage.getItem("names"));
	//var storage = window.localStorage;
	//var value = storage.getItem(key); // Pass a key name to get its value.
	//storage.setItem(key, value) // Pass a key name and its value to add or update that key.
	//storage.removeItem(key) // Pass a key name to remove that key from storage	



//################################################################
//####TEST AJAX ES NECESARIO WHITELIST PLUGIN PARA QUE VALLA#########################
//###############################################################
function temp(){
	alert('a');
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() { 
		if (xhr.readyState == 4) {
			if (xhr.status == 200) 
			{
				var str = xhr.responseText;//add date(not necessary) and id to news objcets!!!!!!!!!!!!!!
					alert(str);			
				
			} 
			else
			{
				
			}
		}
	};
	
	xhr.open('GET', 'http://climbingseries.com/scripts/mybooks/loading_books.php?user_id=1150',true);
	xhr.send();


}
  














