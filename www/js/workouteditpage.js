



function ini_workouteditpage(){
	

	

}



function showEditWorkoutPage(atrack){
//["track1":[20,30,33,23,23,55,"Setonex23",20,30,33,20,30,33,"settwox01"]]
activePage = "workoutEditPage";
WorkoutmainPage.style.display="none";
WorkoutEditPage.style.display="block";

//MAIN DIV: meto todo edit dentro de edit_div
var edit_div=document.createElement('div');
edit_div.id="edit_div"; //la convertierte a global de repente!
WorkoutEditPage.appendChild(edit_div);
//###############//


//TRACK NAME
var div1 = document.createElement('div');
div1.innerHTML=atrack[0];
div1.style.cssText="font-size: 2em;  font-family: 'Digital-7 Regular'; padding:1em;";
edit_div.appendChild(div1);
	div1.addEventListener(TOUCH_START,  function(){openmypopup(div1.offsetTop,"Set workout name:","only30alphanumeric_space",30,"width:10em;",function(ttitle){
	
	if (tracks[ttitle] != null){alert('this name already exist');return;}
	else 
	{	
	tracks[ttitle] = tracks[atrack[0]];
	delete tracks[atrack[0]];
	edit_div.remove(); 	
	showEditWorkoutPage([ttitle,tracks[ttitle]  ]); 
	}
	}
	)}, false);

//LEGEND OF INTERVALS
edit_div.appendChild(legend_of_intervals("m/min","m/min","secs","th. m"));

//CREATE LINES OF  A SET
e_create_lines(atrack);



//BUTTON ADD SET
//var div = document.createElement('div');
var but = document.createElement('button');
but.className="myButton";
var img=document.createElement('img');
img.src = "img/add_300_w.png";
img.style.cssText="height:40px; width:40px;";
but.appendChild(img);
but.addEventListener(TOUCH_START,  function(){openmypopup(but.offsetTop-100,"Set intervals number:","onlydigits",2,"width:4em;",function(xn){
	
	xn=parseInt(xn);
	var xxx= new Array(xn*3).fill(0);
	xxx=xxx.concat(["New Setx01"]);
	tracks[atrack[0]] = tracks[atrack[0]].concat(xxx);
	edit_div.remove(); 	
	showEditWorkoutPage([atrack[0],tracks[atrack[0]]  ]);  
	
}



)}, false);
edit_div.appendChild(but);

return;		
}






function legend_of_intervals(str1,str2,str3,str4){
	var div2 = document.createElement('div');
	div2.style.cssText="text-align:center;font-size: 2em;  font-family: 'Digital-7 Regular';padding-bottom:0.3em;";
	var spanA = document.createElement('div'); spanA.innerHTML=str1; 
	var spanB = document.createElement('div'); spanB.innerHTML=str2; 
	var spanC = document.createElement('div'); spanC.innerHTML=str3; 
	var spanD = document.createElement('div'); spanD.innerHTML=str4; 

	spanA.style.cssText="width:2.5em;display:inline-block;";
	spanB.style.cssText="width:2.5em;display:inline-block;";
	spanC.style.cssText="width:2em;display:inline-block;";
	spanD.style.cssText="width:3em;display:inline-block;";

	div2.appendChild(spanA);
	div2.appendChild(spanB);
	div2.appendChild(spanC);
	div2.appendChild(spanD);
return div2;
}






function calculate_meters(values){
	var theoric=(values[1]+values[0])/2.0/60.0 *values[2]//(v1+v2 /2 * t = espacio)
	return theoric;
}




function e_create_lines(atrack_){
	var t_name = atrack_[0];	
	var myintervals = atrack_[1];
		
	var j=0;
	var i=0;           
	var vals=[0,0,0]; 
	for ( i=0;i < myintervals.length;i++)
	{
		vals[j]=myintervals[i];
		
		if (typeof(myintervals[i])=="string"){e_create_xN(t_name,myintervals[i],i); j=0;}
		else if (j==2){
		create_a_line(t_name,vals,i);	
		j=0;
		}
		else
		{
		j+=1;
		}
	}


return;
}
function create_a_line(tname,values,ii){ //ii va a ser el ultimo de la triada //me cambia tracks si cambio un valor;
	//console.log(ii);
	//console.log(values);
	//vals guarda los valores de un intervalo dentro de myintervals.
	    //0 1  2  3  4  5   6   7    8 9  10 11 12  13  //values son los valores de una triada
	// [20,30,33,23,23,55,"x23",20,30,33,20,30,33,"x2"] //2 5 9 12....ii es la posicion del ultimo valor de la triada dentro de arrayIntervalo
	
	var theoric = calculate_meters(values);
	var div3 = document.createElement('div');
	div3.style.cssText="font-size: 2em;  font-family: 'Digital-7 Regular';padding-bottom:0.3em;";
	var spanE = document.createElement('div'); spanE.innerHTML=values[0]; div3.appendChild(spanE); 
	var spanF = document.createElement('div'); spanF.innerHTML=values[1]; div3.appendChild(spanF);
	var spanG = document.createElement('div'); spanG.innerHTML=values[2]; div3.appendChild(spanG);
	var spanH = document.createElement('div'); spanH.innerHTML=theoric.toFixed(2); div3.appendChild(spanH);


	spanE.style.cssText="width:2.5em;display:inline-block;";
	spanF.style.cssText="width:2.5em;display:inline-block;";
	spanG.style.cssText="width:2em;display:inline-block;";
	spanH.style.cssText="width:3em;display:inline-block;";
	edit_div.appendChild(div3);

	spanE.addEventListener(TOUCH_START,  function(){
		openmypopup(spanE.offsetTop,"Initial speed (m/s):","onlydigitsmax60",2,"width:3em;",function(vv){
			spanE.innerHTML=vv;tracks[tname][ii-2]=parseInt(vv);
			spanH.innerHTML=calculate_meters([tracks[tname][ii-2],tracks[tname][ii-1],tracks[tname][ii]]).toFixed(2);
	})}, false);
	spanF.addEventListener(TOUCH_START,  function(){
		openmypopup(spanF.offsetTop,"End speed (m/s):","onlydigitsmax60",2,"width:3em;",function(vv){
			spanF.innerHTML=vv;tracks[tname][ii-1]=parseInt(vv);
			spanH.innerHTML=calculate_meters([tracks[tname][ii-2],tracks[tname][ii-1],tracks[tname][ii]]).toFixed(2);
	})}, false);
	spanG.addEventListener(TOUCH_START,  function(){
		openmypopup(spanG.offsetTop,"Interval seconds:","onlydigitsmax999",3,"width:3em;",function(vv){
			spanG.innerHTML=vv;tracks[tname][ii]=parseInt(vv);
			spanH.innerHTML=calculate_meters([tracks[tname][ii-2],tracks[tname][ii-1],tracks[tname][ii]]).toFixed(2);
	})}, false);

return;
}

function e_create_xN(thetrack,name_reps,ind){
	var name=name_reps.slice(0,-3);
	var reps=name_reps.slice(-3);

	
	//GENERAL DIV
	var div =  document.createElement('div');
	div.style.cssText="padding-top:0.3em;padding-bottom:1em;";
	
	//SET NAME
	var div0 = document.createElement('div');
	div.appendChild(div0);
	var div1 = document.createElement('div');
	div1.innerHTML=name;
	div1.style.cssText="font-size:1.5em;display:inline-block;font-family: 'Digital-7 Regular';";//con este display inline evitamos que tocando donde no hay texto se dispare el evento y se ponga ya a editar el nombre
	div0.appendChild(div1);
	
	//xN
	var div2 = document.createElement('div'); 
	div2.style.cssText="display:inline-block;width:33%;padding-bottom:1.5em;";
	var div21 = document.createElement('div');
	div21.innerHTML=reps;
	div21.style.cssText="display:inline-block;font-size:1.5em;border-radius:50%;background:#a73f2d;font-family: 'Digital-7 Regular'; width:2em;height:2em;line-height:200%;"
	div2.appendChild(div21);
	div.appendChild(div2);
	
	//TRASH
	var div3 = document.createElement('div');
	div3.style.cssText="display:inline-block;width:33%;position:relative;top:0.4em;";
	var ttrash = document.createElement('img');
	ttrash.src = 'img/trash_300.png';
	ttrash.style.cssText="width:2em;";
	ttrash.addEventListener(TOUCH_START,  function(){}, false);
	div3.appendChild(ttrash);
	div.appendChild(div3);
	
		
	edit_div.appendChild(div);
	
	
	//EVENTS:
	div1.addEventListener(TOUCH_START,  function(){openmypopup(div1.offsetTop,"Set name:","only30alphanumeric_space",30,"width:10em;",
	function(str){tracks[thetrack][ind] = str+"x"+('00' + reps).slice(-2); div1.innerHTML=str;}
	)}, false);
	
	div21.addEventListener(TOUCH_START,  function(){openmypopup(div21.offsetTop,"Set repetitions:","onlydigitsmax99",2,"width:3em;",
	function(strr){tracks[thetrack][ind] = name+"x"+('00' + strr).slice(-2); div21.innerHTML= 'x'+strr;}
	)}, false);
	
	//trash tiene que borrar todo el set, hay que dibujar todo el track otra vez porque sino los eventos no irían bien creo yo...
	ttrash.addEventListener(TOUCH_START,  function(){
		//averiguar el numero de intervalos del set:
		var z;
		for (z=ind;z>=0;z--)
		{ 
			if (z==ind) {
				tracks[thetrack].splice(z,1);
			}
			else if(typeof(tracks[thetrack][z])=="string"){
				
				break;
			}
			else
			{
				 tracks[thetrack].splice(z,1);
			}
		}
		
		edit_div.remove(); 	
		showEditWorkoutPage([thetrack,tracks[thetrack]]);  
		
		}, false);
	
}






	


//12345 12345 1234 123456
//m/min m/min secs m
//20     20    600 200.15

  














