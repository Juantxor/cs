






//########################


function ini_BluePage(){
	
    refreshButton.addEventListener(TOUCH_START, b_list, false);
    deviceList.addEventListener(TOUCH_START, b_connect, false);
}





function b_disconnect(event){
   bluetoothSerial.disconnect(showBluetoothPage, b_onError);
}
  		
function b_list(){
	bluetoothSerial.list(b_onDeviceList, b_onError);
	
}
function b_onDeviceList(devices){

    var option;

        // remove existing devices
        deviceList.innerHTML = "";
        setStatus("");

        devices.forEach(function(device) {

            var listItem = document.createElement('li');//aqui tenia un error!!!!
                html = '<b>' + device.name + '</b><br/>' + device.id;

            listItem.innerHTML = html;

            if (cordova.platformId === 'windowsphone') {
              // This is a temporary hack until I get the list tap working
              var button = document.createElement('button');
              button.innerHTML = "Connect";
              button.addEventListener('click', b_connect, false);
              button.dataset = {};
              button.dataset.deviceId = device.id;
              listItem.appendChild(button);
            } else {
              listItem.dataset.deviceId = device.id;
            }
            deviceList.appendChild(listItem);
        });

        if (devices.length === 0) {

            option = document.createElement('option');
            option.innerHTML = "No Bluetooth Devices";
            deviceList.appendChild(option);

            if (cordova.platformId === "ios") { // BLE
                setStatus("No Bluetooth Peripherals Discovered.");
            } else { // Android or Windows Phone
                setStatus("Please Pair a Bluetooth Device.");
            }

        } else {
            setStatus("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
        }
	
	
}
function b_onError(reason){
	showBluetoothPage();
	alert(reason); // real apps should use notification.alert
}
function setStatus(message){
		console.log(message);

        window.clearTimeout(setTimeout(function () { statusDiv.className = 'fadeout';  }, 5000) );
        statusDiv.innerHTML = message;
        statusDiv.className = 'fadein';
	
}


function b_connect(e) {
        var onConnect = function() {
			
                // subscribe for incoming data
				bluePage.style.cssText = "pointer-events: auto; opacity: 1;"//la dejamos como estaba antes
				bluetoothSerial.subscribe('m', b_onData, b_onError);
      
                setStatus("Connected");
                //showDetailPage();
				 showIntroPage();
				//showIntervalTimerPage()
				
            };

        var deviceId = e.target.dataset.deviceId;
        if (!deviceId) { // try the parent
            deviceId = e.target.parentNode.dataset.deviceId;
        }
	bluePage.style.cssText = "pointer-events: none; opacity: 0.4;";//SI le doy varias veces al boton peta, hay que esperar asi que bloqueo el display hasta que se obtenga respuesta.
	bluetoothSerial.connect(deviceId, onConnect, b_onError);
		
}

//#####################
//el arduino envia los metros totales cada nosecuantos ms. Estamos a la escucha y hallamos los  "relative_meters"
//Por otro lado hay que mandar al arduino la velocidad 20x cada 200ms o por ahí.
//##########################

var relative_meters=0;
var m_before=0;

function b_onData(data) { // data received from Arduino "9234.24m"
	var m_now= parseInt(data.slice(0,-1)); 
	relative_meters += m_now - m_before;
	m_before = m_now;
	s_meters.innerHTML = (relative_meters * 0.15).toFixed(2);
}

