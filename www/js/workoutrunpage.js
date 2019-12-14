


function ini_workoutrunpage(){
	

	

}


var selectedtrack=null;
function showRunWorkoutPage(atrack){
	//tracks=JSON.parse('{"track1":[20,30,33,23,23,55,"Setonex23",20,30,33,20,30,33,"settwox01",66,77,33,20,30,33,"settreeex01"], //"track2":[20,30,33,23,23,55,"setoneex23",20,30,33,"melox01"],"track3":[20,30,33,23,23,55,"setfuckx23",20,30,33,"perax02"],"track4"//:[20,30,33,23,23,55,"settx23",20,30,33,"pasax04"]}');
	
	// "track3":[20,30,33,23,23,55,"setfuckx23",20,30,33,"perax02"]
	
	// atrack = [nametrack,infotrack]
	selectedtrack = atrack;
	
	
	activePage = "workoutRunPage";
	WorkoutmainPage.style.display="none";
	WorkoutRunPage.style.display="block";
	
	
	//HAGO DOS MAIN DIV: meto todo edit dentro de run_div, PARA LOS BOTONES EL RUNDIV0
	var run_div0=document.createElement('div');
	run_div0.style.cssText="z-index: 4;background-color: #2a2218; overflow: hidden; position: fixed; top:0; width: 100%;";
	run_div0.id="run_div0";
	WorkoutRunPage.appendChild(run_div0);
	
	var run_div=document.createElement('div');
	run_div.id="run_div";
	run_div.style.cssText="z-index: 1; margin-top: 4em; position:relative;";
	WorkoutRunPage.appendChild(run_div);
	//###############//

	//ADD BUTTONS:
	r_add_buttons();
	
	//ADD NODE TRACK TITLE
	var div1 = document.createElement('div');
	div1.innerHTML=atrack[0];
	div1.style.cssText="font-size: 2em;  font-family: 'Digital-7 Regular'; padding:1em;";
	run_div.appendChild(div1);
	//div1.addEventListener(TOUCH_START,  function(){}, false);
	
	//LEGEND OF INTERVALS
	run_div.appendChild(legend_of_intervals("m/min","m/min","secs","m"));

	
	//LAP 0 NODE
	//################TODODDDOOOOOOOOOOOOOOOOOOOOO
	
	
	//CREATE LINES OF  A SET
	r_create_lines(atrack);
	
	
	
	
	
	
	
	//ADD NODE INTERVAL
	//ADD NODE SET
	
}
var playing=false;
function r_add_buttons(){
	var play = document.createElement('button');
	play.id="play";
	play.className="myButton"; play.style.padding="0.4em 0.8em";play.style.margin="0.2em";
	//esto no funciona en un boton: play.disabled = true; porque est touchstart,no onclick event;
	
	var img=document.createElement('img');
	img.src = "img/play2_300_w.png";
	img.style.cssText="height:40px; width:40px;";
	play.appendChild(img);
	run_div0.appendChild(play);
	
	
	play.addEventListener(TOUCH_START,  function(){
		if(playing==true){return;}
		
		//quitar azul:
		var allintervals = document.querySelectorAll('[data-rindex]');
		allintervals[rindex].style.background="#2a2218";
		//SET METERS TO 0 FROM RINDEX TO END:
		r_set_m_to_zero();
		
		//AÑADR BLOQUEO DE TODO
		var avoid = document.createElement('div');
		avoid.id="avoid";
		avoid.style.cssText="width:100%;height:100%;position:absolute;top:0";
		run_div.appendChild(avoid);
		//bloqueo de button PLAY:
		
		
		// START BLUETOOTH SEND DATA
		s_sendData();
		//RESET METERS:
		reset_m();
		
		
		//START TIMER!!!
		run_interval = setInterval(function(){runTimer();}, 250);//la primera ejecucion es despues de 250ms
				
		playing=true;play.style.opacity=0.3;
		
	}, false);
	
	
	
	
	
	
	
	
	var stop = document.createElement('button');
	stop.className="myButton";stop.style.padding="0.4em 0.8em";stop.style.margin="0.2em";
	var img=document.createElement('img');
	img.src = "img/stop_300_w.png";
	img.style.cssText="height:40px; width:40px;";
	stop.appendChild(img);
	stop.addEventListener(TOUCH_START,  function(){r_stop();}, false);
	run_div0.appendChild(stop);
	
	
	
	
	/*var tozero = document.createElement('button');
	tozero.className="myButton"; tozero.style.padding="0.4em 0.8em";tozero.style.margin="0.2em";
	var img=document.createElement('img');
	img.src = "img/reset_300_w.png";
	img.style.cssText="height:40px; width:40px;";
	tozero.appendChild(img);
	tozero.addEventListener(TOUCH_START,  function(){}, false);
	run_div0.appendChild(tozero);*/
	
	
	var repeat = document.createElement('button');
	repeat.className="myButton"; repeat.style.padding="0.4em 0.8em";repeat.style.margin="0.2em";
	var img=document.createElement('img');
	img.src = "img/repeat_300_w.png";
	img.style.cssText="height:40px; width:40px;";
	repeat.appendChild(img);
	repeat.addEventListener(TOUCH_START,  function(){if (relap==true){relap=false;this.style.opacity="1";} else {relap=true;this.style.opacity="0.2";}}, false);
	run_div0.appendChild(repeat);
}
function fix_string_intervals(atrack_){
	//convertimos el string el un array tal que asi:
	// [20,30,33,23,23,55,"setonex23",20,30,33,20,30,33,"settwox2"]
	//                       =
	//[  {setname:setone, reps:23, intervals:[20,30,33,23,23,55]},    {setname:settwo, reps:2, intervals:[20,30,33,20,30,33]}   ]
	
	var t_name = atrack_[0];	
	var myintervals = atrack_[1]; //  [20,30,33,23,23,55,"setonex23",20,30,33,20,30,33,"settwox2"]
		
			
	var fixed_intervals=[];
	var vals=[];
	for ( i=0;i < myintervals.length;i++)
	{
		if (typeof(myintervals[i])=="string"){
			var name_reps = myintervals[i];
			var name_ = name_reps.slice(0,-3);
			var reps_ = name_reps.slice(-2);
			var myobject ={"setname":name_, "reps":parseInt(reps_), "intervals": vals}
			fixed_intervals.push(myobject);
			vals=[];
		}
		else{
		vals.push(myintervals[i]);
		}
	}
	//console.log(fixed_intervals);
	return fixed_intervals;
}




var lines_index=0;
function r_create_lines(atrack_){
	
	var fintervals = fix_string_intervals(atrack_);
	
	var i=0;
	for (i=0;i<fintervals.length;i++){
		r_aset(fintervals[i], i);
	}
	lines_index=0;
	return;
}

function r_aset(aset, ii){
	
	//aset={setname:settwo, reps:2, intervals:[20,30,33,20,30,33]}
	
	
	
	for (j=0;j<aset.reps;j++){ //j es el numero de repeticiones de un set
		r_create_xN(aset,j);
		
		var z=0;
		for (z=0; z < aset.intervals.length/3; z++){
			values =[aset.intervals[z*3],  aset.intervals[z*3+1], aset.intervals[z*3+2]];
			r_create_a_line(values);
			lines_index+=1;
		}
		
		
	}//END FOR	
}


function r_create_xN(aset,j){
	//GENERAL DIV
	var div =  document.createElement('div');
	div.style.cssText="padding-top:0.3em;padding-bottom:1em;";
	
	//SET NAME
	var div0 = document.createElement('div');
	div.appendChild(div0);
	var div1 = document.createElement('div');
	div1.innerHTML=aset.setname+" x" + (j+1) ;
	div1.style.cssText="font-size:1.5em;display:inline-block;padding-top:1.5em;font-family: 'Digital-7 Regular';";
	div0.appendChild(div1);
		
	run_div.appendChild(div);
	return;
}





function  r_create_a_line(values){

	
	var div3 = document.createElement('div');
	div3.dataset.rindex=lines_index;
	div3.style.cssText="font-size: 2em;  font-family: 'Digital-7 Regular';padding-bottom:0.3em;";
	var spanE = document.createElement('div'); spanE.innerHTML=values[0]; div3.appendChild(spanE); 
	var spanF = document.createElement('div'); spanF.innerHTML=values[1]; div3.appendChild(spanF);
	var spanG = document.createElement('div'); spanG.innerHTML=values[2]; div3.appendChild(spanG);
	var spanH = document.createElement('div'); spanH.innerHTML=23.343.toFixed(2); div3.appendChild(spanH);


	spanE.style.cssText="width:2.5em;display:inline-block;";
	spanF.style.cssText="width:2.5em;display:inline-block;";
	spanG.style.cssText="width:2em;display:inline-block;";
	spanH.style.cssText="width:3em;display:inline-block;";
	run_div.appendChild(div3);
	
	
	var v_i= document.createElement('div'); v_i.innerHTML=values[0]; div3.appendChild(v_i);
	v_i.style.cssText="font-size:2em; padding:0.2em; display:none;";
	v_i.dataset.yi=values[0];//dataset lo guarda en string
	
	var t_i= document.createElement('div'); t_i.innerHTML=0; div3.appendChild(t_i);
	t_i.style.cssText="font-size:2em;padding:0.2em; display:none;";
	t_i.dataset.xi=0;//dataset lo guarda en string
	
	
	//EVENTS
	//spanE.addEventListener(TOUCH_START,  function(){}, false);
	//spanF.addEventListener(TOUCH_START,  function(){}, false);
	//spanG.addEventListener(TOUCH_START,  function(){}, false);
	
	div3.addEventListener(TOUCH_START,  playonpoint, false);
}





var run_interval;
var rindex=0;//indice del set que esta corriendo;

function playonpoint(){
	
	//SET RINDEX TO START INTERVALTIMER
	rindex = parseInt(this.dataset.rindex);
	
	//QUITAR AZUL A TODOS
	var allintervals = document.querySelectorAll('[data-rindex]');
	var i=0;
	for (i=0; i < allintervals.length;i++){
		allintervals[i].style.background="#2a2218";
	}
	
	//PONER AZUL EL SELECCIONADO:
	this.style.background="blue";
	
}


function r_set_m_to_zero(){
	
	
			
	var allintervals = document.querySelectorAll('[data-rindex]');

	//HIDE ALL xi,yi BUT SELECTED:
	var k=0;
	for (k=0; k < allintervals.length; k++){
		if (k == rindex){continue;}
		allintervals[k].childNodes[4].style.display="none";
		allintervals[k].childNodes[5].style.display="none";
	}
	
	
	//FROM SELECTED TO DOWN RESET VALUES
	
	
	for (i=rindex; i < allintervals.length; i++){
		 
		 //SKIP FIRST VALUE IF THIS IS JUST STOOPED IN THE MIDDLE
		 if (i==rindex && parseInt(allintervals[i].childNodes[5].innerHTML) != 0){
				console.log('no reseteo');//no reseteo los metros!  
		 }
		 else{
		 allintervals[i].childNodes[3].innerHTML="0.0"; //reset m
		 allintervals[i].childNodes[5].dataset.xi="0.0";//reset time xi
		 }
	}
	return;
}





function runTimer(){
	
//LEER VALORES DEL NODE	
	var allintervals = document.querySelectorAll('[data-rindex]');
	var node1 =  allintervals[rindex];
	var y1 = parseInt(node1.childNodes[0].innerHTML);
	var y2 = parseInt(node1.childNodes[1].innerHTML);
	var x1 = 0;
	var x2 = parseInt(node1.childNodes[2].innerHTML);
	//var mi = parseFloat(node1.childNodes[3].innerHTML);
	
	var yi = parseFloat( node1.childNodes[4].dataset.yi );
	var xi = parseFloat( node1.childNodes[5].dataset.xi );
	
	
//CALCULAR VALORES	
	
	
	//ecuacion de una recta:
	// pendiente: m= (y2 -y1)/(x2-x1)
	//ecuacion recta: (y-y1)=m(x-x1);
	//y es la velocidad
	//x es el tiempo ---x1 es el tiempo 0; x2 es el tiempo total del intervalo. xi es el tiempo entre medias de estos.
		
	
	var m = (y2-y1)/(x2-x1);
	var yi = m*(xi-x1)+y1;
	
	//UPDATE BLUETOOTH SPEED!!!!
	thespeed=yi;//console.log(thespeed);console.log(("0" + thespeed).slice(-2) + "x");

	//CAMBIAR VALORES DE NODE
	
	node1.childNodes[3].innerHTML =  s_meters.innerHTML; //METERS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
	node1.childNodes[4].innerHTML = yi.toFixed(); 
	node1.childNodes[5].innerHTML = xi.toFixed(); 
	node1.childNodes[4].style.display="block";
	node1.childNodes[5].style.display="block";
	//No es necesario: node1.childNodes[4].dataset.yi=yi;
	xi += 0.250;
	node1.childNodes[5].dataset.xi=xi;
	


	
	if (xi>=x2){
		node1.childNodes[4].style.display="none";
		node1.childNodes[5].style.display="none";
		node1.childNodes[5].dataset.xi="0.0";
		reset_m();//METERS_!!!!!!!!!!!!!!!!!!!!!!!!!!!		
		
		if (rindex == allintervals.length-1){
			rindex=0;
			if (relap==true){} else{r_stop();} 	//make_relap();//si no quiero hacer laps pondria y así daría la vuelta
playAudio("img/beep-10.mp3"); 
		}
		else {
			rindex+=1;
playAudio("img/beep-29.mp3");
		}
	document.querySelectorAll('[data-rindex]')[rindex].scrollIntoView({behavior: "smooth", block: "center"});//make_relap cambia allintervals array
	
	}
	
	
	return;
}





var relap=false;
function r_stop(){
	if (playing==true){
		playing=false;play.style.opacity=1;
		clearInterval(run_interval);
		//QUITAR BLOQUEO DE TODO
		avoid.remove();
		
		//STOP BLUETOOTH SPEED INTERVAL
		
		
		
		thespeed=0;setTimeout( function(){clearInterval(s_interval)}, 780) //asi da tiempo a que se mande 0 varias veces
		
		console.log('stoping');
	}
}



/*


var lap = 1;
function make_relap(){
	
	var allintervals = document.querySelectorAll('[data-rindex]');
	
	if (relap==true){
		//create new intervals:
		lines_index=allintervals.length;
		lap+=1;
		r_create_lines(selectedtrack);
		rindex+=1;
	}
	else {
		r_stop();//rindex=0;
	}
		
		
	return;
}



*/



















































