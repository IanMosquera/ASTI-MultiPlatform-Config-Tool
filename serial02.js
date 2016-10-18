//get comport at the launch of program

var strstatus="";
var strstationtype="";
var strtextarea ="";
var currentConfig="";
var connectionId;

var onGetDevices = function(ports) {
  var x = document.getElementById("ports");
  
  for (var i=0; i<ports.length; i++) {
    var option = document.createElement("option");
    option.text = ports[i].path;
    x.add(option);
  }
}


//get serial ports
chrome.serial.getDevices(onGetDevices);
console.log("ASTI Multiplatform Config Tool - Mosquera2016\nPlease install latest version of Google Chrome.")
var waiting = setInterval(ProgramLoop,500);
var sec = 0;

function ProgramLoop(){
	switch (strstatus){
		case "ExitDebugFirst":
			if (sec>=3){
				console.log("W\n");
				document.getElementById("textarea").value="Checking arQ1010 if its currently on DEBUG mode.\n";
				document.getElementById("textarea").value+="Waiting for response. /"
				chrome.serial.send(connectionId,str2ab('W\n'),function(){});
				sec=0;
			}
			else{
				sec+=1;
				console.log("ExitDebugFirst" + sec + "\n");
				document.getElementById("textarea").value="Checking arQ1010 if its currently on DEBUG mode.\n";
				document.getElementById("textarea").value+="Waiting for response. " + loading(sec);
			}
			break;
		case "ConfirmExitDebug":
			if (sec>=3){
				console.log("o\n");
				chrome.serial.send(connectionId,str2ab('o\n'),function(){});
				sec=0;
			}
			else{
				sec+=1;
				console.log("ConfirmExitDebug" + sec + "\n");
				
			}
			document.getElementById("textarea").value="";
			document.getElementById("textarea").value="Exit DEBUG mode.\n";
			break;
		case "Wait1MinuteThenSendDEBUG":
			if (sec >= 60){
				if(sec==60){
					console.log('DEBUG\n');
					chrome.serial.send(connectionId,str2ab('DEBUG\n'),function(){});
					//strstatus ="Wait1MinuteThenSendDEBUG";
					//sec=0;
				}
				sec+=1;
				document.getElementById("textarea").value="Attempting to enter DEBUG mode. " + loading(sec) + "\n";
			}
			else{
				sec+=1;
				console.log("Wait1MinuteThenSendDEBUG" + sec + "\n")
				document.getElementById("textarea").value="Attempting to enter DEBUG mode. " + loading(sec) + "\n";
			}

			break;
		case "StopWatchdog":
			if (sec >= 3){
				console.log('S\n');
				document.getElementById("textarea").value='Watchdog has been turned off.\nPlease select station type then click "Configure arQ1010"';
				chrome.serial.send(connectionId,str2ab('S\n'),function(){});
				strstatus="";
				sec=0;
			}
			else{
				sec+=1;
				console.log("Turning off watchdog in: " + (4-sec) + "\n");
				document.getElementById("textarea").value="Turning off watchdog. " + loading(sec) + "\n";
			}
			break;

		case "SetSensorType":
			if (sec >= 3){
				console.log("O\n");
				document.getElementById("textarea").value="Getting current sensor type. . . .\n";
				chrome.serial.send(connectionId,str2ab("O\n"),function(){})
				sec=0
			}
			else{
				sec+=1;
				console.log("Selecting sensor type on menu in: " + (4-sec) + "\n");
				document.getElementById("textarea").value="Getting current sensor type." + Array(sec).join(" .") + "\n";
			}
			break;
		case "ChangeValueSensorType":
			if (sec>=3){
				console.log('C\n');
				document.getElementById("textarea").value="Changing current sensor type. . . .\n";
				chrome.serial.send(connectionId,str2ab('C\n'),function(){})
				sec=0;
			}
			else{
				sec+=1;
				console.log("Changing value in: " + (4-sec) + "\n");
				document.getElementById("textarea").value="Changing current sensor type." + Array(sec).join(" .") + "\n";
			}
			break;
		case "NewSensorType":
			if (sec>=3){
				document.getElementById("textarea").value="";
				document.getElementById("textarea").value="Done configuring sensor type.\n";
				switch(strstationtype){
					case "DEWS Rain Gauge":
						console.log('RG\n');
						chrome.serial.send(connectionId,str2ab('RG\n'),function(){});
						strstatus="SelectMenuSetPowerBoard";
						sec=0;
						strtextarea = "√Sensor Type: RG\n";
						break;
					case "DEWS Waterlevel":
						console.log('WL\n');
						chrome.serial.send(connectionId,str2ab('WL\n'),function(){});
						strstatus="SelectMenuSetPowerBoard";
						sec=0;
						strtextarea = "√Sensor Type: WL\n";
						break;
					case "DEWS Tandem":
						console.log('TM\n');
						chrome.serial.send(connectionId,str2ab('TM\n'),function(){});
						strstatus="SelectMenuSetPowerBoard";
						sec=0;
						strtextarea = "√Sensor Type: TM\n";
						break;
					case "DEWS IDP only":
						console.log('RG\n');
						chrome.serial.send(connectionId,str2ab('RG\n'),function(){});
						strstatus="SelectMenuSetPowerBoard";
						sec=0;
						strtextarea = "√Sensor Type: RG\n";
						break;
					case "DEWS IDP w/ GSM":
						console.log('RG\n');
						chrome.serial.send(connectionId,str2ab('RG\n'),function(){});
						strstatus="SelectMenuSetPowerBoard";
						sec=0;
						strtextarea = "√Sensor Type: RG\n";
						break;
					case "DEWS Alerting Station":
						console.log('DEWS\n');
						chrome.serial.send(connectionId,str2ab('DEWS\n'),function(){});
						strstatus="SelectMenuSetPowerBoard";
						sec=0;
						strtextarea = "√Sensor Type: DEWS\n";
						break;
					case "ABOITIZ":
						console.log('ABTZ\n');
						chrome.serial.send(connectionId,str2ab('ABTZ\n'),function(){});
						strstatus="SelectMenuSetPowerBoard";
						sec=0;
						strtextarea = "√Sensor Type: DEWS\n";
						break;
					case "BSWM":
						console.log('BSWM\n');
						chrome.serial.send(connectionId,str2ab('BSWM\n'),function(){});
						strstatus="SelectMenuSetPowerBoard";
						sec=0;
						strtextarea = "√Sensor Type: BSWM\n";
						break;
					case "Radar Waterlevel":
						console.log('RDR\n');
						chrome.serial.send(connectionId,str2ab('RDR\n'),function(){});
						strstatus="SelectMenuSetPowerBoard";
						sec=0;
						strtextarea = "√Sensor Type: RDR\n";
						break;
					case "Radar Tandem":
						console.log('RDRR\n');
						chrome.serial.send(connectionId,str2ab('RDRR\n'),function(){});
						strstatus="SelectMenuSetPowerBoard";
						sec=0;
						strtextarea = "√Sensor Type: RDRR\n";
						break;
					case "TEWS Detection":
						console.log('TD\n');
						chrome.serial.send(connectionId,str2ab('TD\n'),function(){});
						strstatus="SelectMenuSetPowerBoard";
						sec=0;
						strtextarea = "√Sensor Type: TD\n";
						break;
					case "TEWS Warning":
						console.log('TW\n');
						chrome.serial.send(connectionId,str2ab('TW\n'),function(){});
						strstatus="SelectMenuSetPowerBoard";
						sec=0;
						strtextarea = "√Sensor Type: TW\n";
						break;
					default:
				}
				document.getElementById("textarea").value=strtextarea;
			}
			else{
				sec+=1;
				console.log("Setting new Sensor Type in: " + (4-sec) + "\n");
				document.getElementById("textarea").value="Setting new Sensor Type." + Array(sec).join(" .") +"\n";
			}
			break;

		case "SetPowerBoard":
			if(sec>=3){
				console.log('J\n');
				document.getElementById("textarea").value = strtextarea + "Getting current power board configuration. . . .\n";
				chrome.serial.send(connectionId,str2ab('J\n'),function(){});
				sec=0;
			}
			else{
				sec+=1;
				console.log('Selecting Power Board Config from menu in:' + (4-sec) + '\n');
				document.getElementById("textarea").value = strtextarea + "Getting current power board configuration." + Array(sec).join(" .") + "\n";
			}
			break;
		case "ChangeValuePowerBoard":
			if(sec>=3){
				console.log('C\n');
				document.getElementById("textarea").value = strtextarea + "Changing current power board configuration. . . .\n";
				chrome.serial.send(connectionId,str2ab('C\n'),function(){});
				sec=0;
			}
			else{
				sec+=1;
				console.log("Changing value in: " + (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea + "Changing current power board configuration." + Array(sec).join(" .") + "\n";
			}
			break;
		case "NewPowerBoardConfig":
			if (sec>=3){
				switch(strstationtype){
					case "DEWS Rain Gauge":
						console.log('00\n');
						chrome.serial.send(connectionId,str2ab('00\n'),function(){});
						strstatus="SelectMenuSetPassword";
						strtextarea+="√Power Board Config: 00\n";
						sec=0;
						break;
					case "DEWS Waterlevel":
						console.log('20\n');
						chrome.serial.send(connectionId,str2ab('20\n'),function(){});
						strstatus="SelectMenuSetPassword";
						strtextarea+="√Power Board Config: 20\n";
						sec=0;
						break;
					case "DEWS Tandem":
						console.log('20\n');
						chrome.serial.send(connectionId,str2ab('20\n'),function(){});
						strstatus="SelectMenuSetPassword";
						strtextarea+="√Power Board Config: 20\n";
						sec=0;
						break;
					case "DEWS IDP only":
						console.log('22\n');
						chrome.serial.send(connectionId,str2ab('22\n'),function(){});
						strstatus="SelectMenuSetPassword";
						strtextarea+="√Power Board Config: 22\n";
						sec=0;
						break;
					case "DEWS IDP w/ GSM":
						console.log('22\n');
						chrome.serial.send(connectionId,str2ab('22\n'),function(){});
						strstatus="SelectMenuSetPassword";
						strtextarea+="√Power Board Config: 22\n";
						sec=0;
						break;
					case "DEWS Alerting Station":
						console.log('\n');
						chrome.serial.send(connectionId,str2ab('\n'),function(){});
						strstatus="SelectMenuSetPassword";
						strtextarea+="√Power Board Config: \n";
						sec=0;
						break;
					case "ABOITIZ":
						console.log('20\n');
						chrome.serial.send(connectionId,str2ab('20\n'),function(){});
						strstatus="SelectMenuSetPassword";
						strtextarea+="√Power Board Config: 20\n";
						sec=0;
						break;
					case "BSWM":
						console.log('20\n');
						chrome.serial.send(connectionId,str2ab('20\n'),function(){});
						strstatus="SelectMenuSetPassword";
						strtextarea+="√Power Board Config: 20\n";
						sec=0;
						break;
					case "Radar Waterlevel":
						console.log('20\n');
						chrome.serial.send(connectionId,str2ab('20\n'),function(){});
						strstatus="SelectMenuSetPassword";
						strtextarea+="√Power Board Config: 20\n";
						sec=0;
						break;
					case "Radar Tandem":
						console.log('20\n');
						chrome.serial.send(connectionId,str2ab('20\n'),function(){});
						strstatus="SelectMenuSetPassword";
						strtextarea+="√Power Board Config: 20\n";
						sec=0;
						break;
					case "TEWS Detection":
						console.log('22\n');
						chrome.serial.send(connectionId,str2ab('22\n'),function(){});
						strstatus="SelectMenuSetPassword";
						strtextarea+="√Power Board Config: 22\n";
						sec=0;
						break;
					case "TEWS Warning":
						console.log('22\n');
						chrome.serial.send(connectionId,str2ab('22\n'),function(){});
						strstatus="SelectMenuSetPassword";
						strtextarea+="√Power Board Config: 22\n";
						sec=0;
						break;
					default:
				}
				document.getElementById("textarea").value=strtextarea;
			}
			else{
				sec+=1;
				console.log("Setting new Power Board Config in: " + (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea + "Setting new Power Board Config." + Array(sec).join(" .") +"\n";
			}
			break;

		case "SetPassword":
			if(sec>=3){
				console.log('M\n');
				document.getElementById("textarea").value = strtextarea + "Getting current password. . . .\n";
				chrome.serial.send(connectionId,str2ab('M\n'),function(){});
				sec=0;
			}
			else{
				sec+=1;
				console.log('Selecting Password from menu in: ' + (4-sec) + '\n');
				document.getElementById("textarea").value = strtextarea + "Getting current password." + Array(sec).join(" .") + "\n";
			}
			break;
		case "ChangeValuePassword":
			if(sec>=3){
				console.log('C\n');
				document.getElementById("textarea").value = strtextarea + "Changing current password. . . .\n";
				chrome.serial.send(connectionId,str2ab('C\n'),function(){});
				sec=0;
			}
			else{
				sec+=1;
				console.log("Changing value in: " + (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea + "Changing current password." + Array(sec).join(" .") + "\n";
			}
			break;
		case "NewPassord":
			if(sec>=3){
				switch(strstationtype){
					case "DEWS Rain Gauge":
						console.log('RAINP\n');
						chrome.serial.send(connectionId,str2ab('RAINP\n'),function(){});
						strstatus="SelectMenuSetSendingTIme";
						strtextarea += "√Password: RAINP\n"
						sec=0;
						break;
					case "DEWS Waterlevel":
						console.log('WATER\n');
						chrome.serial.send(connectionId,str2ab('WATER\n'),function(){});
						strstatus="SelectMenuSetSendingTIme";
						strtextarea += "√Password: WATER\n"
						sec=0;
						break;
					case "DEWS Tandem":
						console.log('WATERR\n');
						chrome.serial.send(connectionId,str2ab('WATERR\n'),function(){});
						strstatus="SelectMenuSetSendingTIme";
						strtextarea += "√Password: WATERR\n"
						sec=0;
						break;
					case "DEWS IDP only":
						console.log('RAINIDP\n');
						chrome.serial.send(connectionId,str2ab('RAINIDP\n'),function(){});
						strstatus="SelectMenuSetSendingTIme";
						strtextarea += "√Password: RAINIDP\n"
						sec=0;
						break;
					case "DEWS IDP w/ GSM":
						console.log('RAINIDP\n');
						chrome.serial.send(connectionId,str2ab('RAINIDP\n'),function(){});
						strstatus="SelectMenuSetSendingTIme";
						strtextarea += "√Password: RAINIDP\n"
						sec=0;
						break;
					case "DEWS Alerting Station":
						console.log('DEWS\n');
						chrome.serial.send(connectionId,str2ab('DEWS\n'),function(){});
						strstatus="SelectMenuSetSendingTIme";
						strtextarea += "√Password: DEWS\n"
						sec=0;
						break;
					case "ABOITIZ":
						console.log('ABTZ\n');
						chrome.serial.send(connectionId,str2ab('ABTZ\n'),function(){});
						strstatus="SelectMenuSetSendingTIme";
						strtextarea += "√Password: ABTZ\n"
						sec=0;
						break;
					case "BSWM":
						console.log('BSWM\n');
						chrome.serial.send(connectionId,str2ab('BSWM\n'),function(){});
						strstatus="SelectMenuSetSendingTIme";
						strtextarea += "√Password: BSWM\n"
						sec=0;
						break;
					case "Radar Waterlevel":
						console.log('WATER\n');
						chrome.serial.send(connectionId,str2ab('WATER\n'),function(){});
						strstatus="SelectMenuSetSendingTIme";
						strtextarea += "√Password: WATER\n"
						sec=0;
						break;
					case "Radar Tandem":
						console.log('WATERR\n');
						chrome.serial.send(connectionId,str2ab('WATERR\n'),function(){});
						strstatus="SelectMenuSetSendingTIme";
						strtextarea += "√Password: WATERR\n"
						sec=0;
						break;
					case "TEWS Detection":
						console.log('EWST\n');
						chrome.serial.send(connectionId,str2ab('EWST\n'),function(){});
						strstatus="SelectMenuSetSendingTIme";
						strtextarea += "√Password: EWST\n"
						sec=0;
						break;
					case "TEWS Warning":
						console.log('EWST\n');
						chrome.serial.send(connectionId,str2ab('EWST\n'),function(){});
						strstatus="SelectMenuSetSendingTIme";
						strtextarea += "√Password: EWST\n"
						sec=0;
						break;
					default:
				}
				document.getElementById("textarea").value=strtextarea;
			}
			else{
				sec+=1;
				console.log("Setting new password in: " + (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea + "Setting new password." + Array(sec).join(" .") + "\n";
			}
			break;

		case "SetSendingTime":
			if(sec>=3){
				console.log('D\n');
				document.getElementById("textarea").value = strtextarea + "Getting current sending time value. . . .\n";
				chrome.serial.send(connectionId,str2ab('D\n'),function(){});
				sec=0;
			}
			else{
				sec+=1;
				console.log('Selecting Sending Time from menu in: ' + (4-sec) + '\n');
				document.getElementById("textarea").value = strtextarea + "Getting current sending time value." + Array(sec).join(" .") + "\n";
			}
			break;
		case "ChangeValueSendingTime":
			if(sec>=3){
				console.log('C\n');
				document.getElementById("textarea").value = strtextarea + "Changing current sending time value. . . .\n";
				chrome.serial.send(connectionId,str2ab('C\n'),function(){});
				sec=0;
			}
			else{
				sec+=1;
				console.log('Changing value in: ' + (4-sec) + '\n');
				document.getElementById("textarea").value = strtextarea + "Changing current sending time value." + Array(sec).join(" .") + "\n";
			}
			break;
		case "NewSendingTime":
			if(sec>=3){
				switch(strstationtype){
					case "DEWS Rain Gauge":
						console.log('10\n');
						chrome.serial.send(connectionId,str2ab('10\n'),function(){});
						strstatus="SelectMenuSetDateandTime";
						strtextarea += "√Sending Time: 10min\n";
						sec=0;
						break;
					case "DEWS Waterlevel":
						console.log('15\n');
						chrome.serial.send(connectionId,str2ab('15\n'),function(){});
						strstatus="SelectMenuSetDateandTime";
						strtextarea += "√Sending Time: 15min\n";
						sec=0;
						break;
					case "DEWS Tandem":
						console.log('10\n');
						chrome.serial.send(connectionId,str2ab('10\n'),function(){});
						strstatus="SelectMenuSetDateandTime";
						strtextarea += "√Sending Time: 10min\n";
						sec=0;
						break;
					case "DEWS IDP only":
						console.log('0\n');
						chrome.serial.send(connectionId,str2ab('0\n'),function(){});
						strstatus="SelectMenuSetDateandTime";
						strtextarea += "√Sending Time: 0min\n";
						sec=0;
						break;
					case "DEWS IDP w/ GSM":
						console.log('15\n');
						chrome.serial.send(connectionId,str2ab('15\n'),function(){});
						strstatus="SelectMenuSetDateandTime";
						strtextarea += "√Sending Time: 15min\n";
						sec=0;
						break;
					case "DEWS Alerting Station":
						console.log('3\n');
						chrome.serial.send(connectionId,str2ab('3\n'),function(){});
						strstatus="SelectMenuSetDateandTime";
						strtextarea += "√Sending Time: 3Hrs\n";
						sec=0;
						break;
					case "ABOITIZ":
						console.log('15\n');
						chrome.serial.send(connectionId,str2ab('15\n'),function(){});
						strstatus="SelectMenuSetDateandTime";
						strtextarea += "√Sending Time: 15min\n";
						sec=0;
						break;
					case "BSWM":
						console.log('15\n');
						chrome.serial.send(connectionId,str2ab('15\n'),function(){});
						strstatus="SelectMenuSetDateandTime";
						strtextarea += "√Sending Time: 15min\n";
						sec=0;
						break;
					case "Radar Waterlevel":
						console.log('10\n');
						chrome.serial.send(connectionId,str2ab('10\n'),function(){});
						strstatus="SelectMenuSetDateandTime";
						strtextarea += "√Sending Time: 10min\n";
						sec=0;
						break;
					case "Radar Tandem":
						console.log('10\n');
						chrome.serial.send(connectionId,str2ab('10\n'),function(){});
						strstatus="SelectMenuSetDateandTime";
						strtextarea += "√Sending Time: 10min\n";
						sec=0;
						break;
					case "TEWS Detection":
						console.log('15\n');
						chrome.serial.send(connectionId,str2ab('15\n'),function(){});
						strstatus="SelectMenuSetDateandTime";
						strtextarea += "√Sending Time: 15min\n";
						sec=0;
						break;
					case "TEWS Warning":
						console.log('3\n');
						chrome.serial.send(connectionId,str2ab('3\n'),function(){});
						strstatus="SelectMenuSetDateandTime";
						strtextarea += "√Sending Time: 3Hrs\n";
						sec=0;
						break;
					default:
				}
				document.getElementById("textarea").value=strtextarea;
			}
			else{
				sec+=1;
				console.log('Setting new Sending Time value in: ' + (4-sec) + '\n');
				document.getElementById("textarea").value = strtextarea + "Setting new Sending Time value." + Array(sec).join(" .") + "\n";
			}
			break;

		case "SetDateandTime":
			if (sec>=3){
				console.log('I\n');
				document.getElementById("textarea").value = strtextarea + "Getting current date and time. . . .\n";
				chrome.serial.send(connectionId,str2ab('I\n'),function(){});
				sec=0;
			}
			else{
				sec+=1;
				console.log('Selecting DateandTime from menu in: ' + (4-sec) + '\n');
				document.getElementById("textarea").value = strtextarea + "Getting current date and time." + Array(sec).join(" .") + "\n";
			}
			break;
		case "ChangeValueDateandTime":
			if (sec>=3){
				console.log('C\n');
				document.getElementById("textarea").value = strtextarea + "Changing current Date and Time. . . .\n";
				chrome.serial.send(connectionId,str2ab('C\n'),function(){});
				strstatus = "NewDateandTime";
				sec=0;
			}
			else{
				sec+=1;
				console.log("Changing value in: " + (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea + "Changing current Date and Time." + Array(sec).join(" .") + "\n";
			}
			break;
		case "NewDateandTime":
			if (sec>=3){
				document.getElementById("textarea").value = strtextarea + "Setting latest Date and Time. . . .\n";
				chrome.serial.send(connectionId,str2ab(getDateandTime()),function(){});
				strtextarea += "√Current Date and Time: " + getDateandTime() + "\n";
				strstatus="ExitDebug"
				sec=0;
			}
			else{
				sec+=1;
				console.log("Setting new Date and Time: " + (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea + "Setting latest Date and Time." + Array(sec).join(" .") + "\n";
			}
			break;

		case "ExitDebug":
			if(sec>=3){
				console.log('W\n');
				document.getElementById("textarea").value = strtextarea + "Exiting DEBUG mode. . . .\n";
				chrome.serial.send(connectionId,str2ab('W\n'),function(){});
				strstatus="ConfirmExit";
				sec=0;
			}
			else{
				sec+=1;
				console.log("Exiting Debug in: " + (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea + "Exiting DEBUG mode." + Array(sec).join(" .") + "\n";

			}
			break;
		case "ConfirmExit":
			if(sec>=3){
				console.log("o\n");
				document.getElementById("textarea").value = strtextarea + "Confirming exit. . . .\n";
				chrome.serial.send(connectionId,str2ab("o\n"),function(){});
				sec=0;
			}
			else{
				sec+=1;
				console.log("Confirming Exit in : " + (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea + "Confirming exit." + Array(sec).join(" .") + "\n";
			}
			break;

		case "GetSensorType":
			if(sec>=3){
				console.log("O\n");
				document.getElementById("textarea").value = "Getting sensor type. /"
				chrome.serial.send(connectionId,str2ab("O\n"),function(){});
				sec=0;
			}
			else{
				sec+=1;
				console.log("Selecting sensor type from menu in:" + (4-sec) + "\n");
				document.getElementById("textarea").value = "Getting sensor type. " + loading(sec);
			}
			break;
		case "SendDummy1":
			if(sec>=3){
				console.log("\n");
				document.getElementById("textarea").value = strtextarea + "Getting Power Board Congfig. /";
				chrome.serial.send(connectionId,str2ab("\n"), function(){});
				strstatus = "GetPowerBoardConfig";
				sec=0;
			}
			else{
				sec+=1;
				console.log("Exiting to menu in: " + (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea + "Getting Power Board Congfig. " + loading(sec);
			}
			break;
		case "GetPowerBoardConfig":
			if(sec>=3){
				console.log("J\n");
				document.getElementById("textarea").value = strtextarea + "Getting Power Board Congfig. /";
				chrome.serial.send(connectionId,str2ab("J\n"),function(){});
				sec=0;
			}
			else{
				sec+=1;
				console.log("Selecting Power Board Config on menu in: " + (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea + "Getting Power Board Congfig. " + loading(sec);
			}
			break;
		case "SendDummy2":
			if(sec>=3){
				console.log("\n");
				document.getElementById("textarea").value = strtextarea+ "Getting Password. /";
				chrome.serial.send(connectionId,str2ab("\n"),function(){});
				strstatus="GetPassword";
				sec=0;
			}
			else{
				sec+=1;
				console.log("Exiting to menu in: " + (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea+ "Getting Password. " + loading(sec);
			}
			break;
		case "GetPassword":
			if(sec>=3){
				console.log("M\n");
				document.getElementById("textarea").value = strtextarea+ "Getting Password. /";
				chrome.serial.send(connectionId,str2ab("M\n"),function(){});
				sec=0;
			}
			else{
				sec+=1;
				console.log("Selecting Password on menu in: " +  (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea+ "Getting Password. " + loading(sec);
			}

			break;
		case "SendDummy3":
			if(sec>=3){
				console.log("\n");
				document.getElementById("textarea").value = strtextarea + "Getting Sending Time value. /";
				chrome.serial.send(connectionId,str2ab("\n"),function(){});
				strstatus="GetSendingTime";
				sec=0;
			}
			else{
				sec+=1;
				console.log("Exiting to menu in: " + (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea + "Getting Sending Time value. " + loading(sec);
			}
			break;
		case "GetSendingTime":
			if(sec>=3){
				console.log("D\n");
				document.getElementById("textarea").value = strtextarea + "Getting Sending Time value. /";
				chrome.serial.send(connectionId,str2ab("D\n"),function(){});
				sec=0;
			}
			else{
				sec+=1;
				console.log("Selecting Sending Time from menu in: " + (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea + "Getting Sending Time value. " + loading(sec);
			}
			break;
		case "SendDummy4":
			if(sec>=0){
				console.log("\n");
				document.getElementById("textarea").value = strtextarea+ "Getting current Date and Time. /";
				chrome.serial.send(connectionId,str2ab("\n"),function(){});
				strstatus="GetCurrentDateandTime";
				sec=0;
			}
			else{
				sec+=1;
				console.log("Exiting to menu in: " + (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea+ "Getting current Date and Time. " + loading(sec);
			}
			break;
		case "GetCurrentDateandTime":
			if(sec>=3){
				console.log("I\n");
				document.getElementById("textarea").value = strtextarea+ "Getting current Date and Time. /";
				chrome.serial.send(connectionId,str2ab("I\n"),function(){});
				sec=0;
			}
			else{
				sec+=1;
				console.log("Selecting Date and Time from menu in: " + (4-sec) + "\n");
				document.getElementById("textarea").value = strtextarea+ "Getting current Date and Time. " + loading(sec);
			}
			break;
		case "SendDummy5":
			if(sec>=0){
				console.log("\n");
				chrome.serial.send(connectionId,str2ab("\n"),function(){});
				strstatus="ExitDebug";
				sec=0;
			}
			else{
				sec+=1;
				console.log("Exiting to menu in: " + (4-sec) + "\n");
			}
			break;
		default:
	}
}


document.addEventListener('DOMContentLoaded', function(){
	document.querySelector("button.SerialConnect").addEventListener('click', btnconnect);
	document.querySelector("#configure").addEventListener('click', btnConfigure);
	document.querySelector("button.SendSerial").addEventListener('click', btnsendserial);
	document.querySelector("#AcquireSettings").addEventListener('click', btnacquiresettings);
});

/*var is_on = false;
var btnSend = function() {
	is_on = !is_on;
	var msg = is_on ? 'y' : 'n';
	chrome.serial.send(connectionId, str2ab(msg), function(){});
	console.log(msg);
};*/
var is_connected = false;
var btnconnect = function(){
	if (is_connected == false){
		chrome.serial.connect(document.getElementById("ports").value, {bitrate: 57600}, function(info){
			connectionId=info.connectionId;
			document.getElementById("SerialConnect").textContent = "Disconnect";
			console.log("Connected to arQ...");
			strstatus = "ExitDebugFirst";
			//strstatus = "Wait1MinuteThenSendDEBUG";
		});
	} else {
		chrome.serial.disconnect(connectionId, function(){});
		document.getElementById("SerialConnect").textContent = "Connect";
		console.log("Disconnected from arQ...");
	};

	is_connected = !is_connected;
};
var btnConfigure = function(){
	strstationtype = document.getElementById('StationType').value;
	strstatus = "SetSensorType";
};

var btnacquiresettings = function(){
	strstatus = "GetSensorType";
	sec=0;

}
var btnsendserial = function(){
	var msg = document.getElementById("TextSerial").value  + "\n";
	chrome.serial.send(connectionId, str2ab(msg), function(){});
	console.log(msg);
};


//receiveing
var stringReceived = '';
var ss;
var arqVer;

var onReceiveCallback = function(info) {
  var str = convertArrayBufferToString(info.data);
  if (str.charAt(str.length-1) === '\n') {
    stringReceived += str.substring(0, str.length-1);

    console.log(stringReceived);
    ss = stringReceived.split("\n");
    

    if (stringReceived.substr(0,8) == "primary=" && strstatus == "Wait1MinuteThenSendDEBUG"){//iigh debug mode can be entered
    	sec = 58;
    }
    else if(stringReceived.substr(0,8)  == "primary=" && strstatus == "ExitDebugFirst"){
    	strstatus="Wait1MinuteThenSendDEBUG";
    	sec = 58;
    }
    else if(stringReceived.substr(0,25) == "For Deploy? (Y)es or N(o)" && strstatus == "ExitDebugFirst"){
    	strstatus="ConfirmExitDebug";
    	sec=0;
    }
    else if(stringReceived.substr(0,15) =="EXIT DEBUG MODE" && strstatus == "ConfirmExitDebug"){
    	strstatus ="Wait1MinuteThenSendDEBUG";
    	sec=0;
    }
    else if(stringReceived.substr(0,17) == "FIRMWARE VERSION:" && strstatus=="Wait1MinuteThenSendDEBUG"){
    	strstatus = "StopWatchdog";
    	sec=0;
    }

    else if(stringReceived.substr(0,15) == "CURRENT CONFIG=" && strstatus == "SetSensorType"){
    	strstatus = "ChangeValueSensorType";
    	sec=0;
    }
    else if(stringReceived.substr(0,15) == "ENTER NEW VALUE" && strstatus ==  "ChangeValueSensorType"){
    	strstatus = "NewSensorType";
    	sec=0;
    }
    else if(stringReceived.substr(0,13) == "ENTER CHOICE:" && strstatus == "SelectMenuSetPowerBoard"){
    	strstatus = "SetPowerBoard";
    	sec=0;
    }

    else if(stringReceived.substr(0,13) == "PBOARDCONFIG=" && strstatus =="SetPowerBoard"){
    	strstatus = "ChangeValuePowerBoard";
    	sec=0;
    }
    else if(stringReceived.substr(0,15) == "ENTER NEW VALUE" && strstatus == "ChangeValuePowerBoard") {
    	strstatus = "NewPowerBoardConfig";
    	sec=0;
    }
    else if(stringReceived.substr(0,13) == "ENTER CHOICE:" && strstatus == "SelectMenuSetPassword"){
    	strstatus = "SetPassword";
    	sec=0;
    }

    else if(stringReceived.substr(0,17) == "CURRENT PASSWORD=" && strstatus == "SetPassword"){
    	strstatus="ChangeValuePassword";
    	sec=0;
    }
    else if(stringReceived.substr(0,15) == "ENTER NEW VALUE" && strstatus == "ChangeValuePassword"){
    	strstatus = "NewPassord";
    	sec=0;
    }
    else if(stringReceived.substr(0,13) == "ENTER CHOICE:" && strstatus == "SelectMenuSetSendingTIme"){
    	strstatus="SetSendingTime";
    	sec=0;
    }

    else if(stringReceived.substr(0,21) == "CURRENT SENDING TIME=" && strstatus =="SetSendingTime"){
    	strstatus = "ChangeValueSendingTime";
    	sec=0;
    }
    else if(stringReceived.substr(0,15) == "ENTER NEW VALUE" && strstatus == "ChangeValueSendingTime"){
    	strstatus="NewSendingTime";
    	sec=0;
    }
    else if(stringReceived.substr(0,15) == "SENDING TIME = " && strstatus == "SelectMenuSetDateandTime"){
    	strstatus="SetDateandTime";
    	sec=0;
    }

    else if(stringReceived.substr(0,17) == "CURRENT DateTime=" && strstatus == "SetDateandTime"){
    	strstatus="ChangeValueDateandTime";
    	sec=0;
    }
    else if(stringReceived.substr(0,15) == "EXIT DEBUG MODE" && strstatus == "ConfirmExit"){
    	console.log("Configuring " + strstationtype + " completed.\n");
    	console.log("Click Disconnect then remove the USB cord.\n");

    	document.getElementById("textarea").value = strtextarea + "\nConfiguring " + strstationtype + " completed.\nClick Disconnect then remove the USB cord.";
    	strstatus="";
    }

    else if(stringReceived.substr(0,15) == "CURRENT CONFIG=" && strstatus =="GetSensorType"){
    	strtextarea = "Sensor Type: " + ss[0].substr(15,(ss[0].length-15)) + "\n";
    	document.getElementById("textarea").value = strtextarea;
    	strstatus="SendDummy1";
    	sec=0;
    }
    else if(stringReceived.substr(0,13) == "PBOARDCONFIG=" && strstatus =="GetPowerBoardConfig"){
    	strtextarea+="Power Board Config: " + ss[0].substr(13,(ss[0].length-13)) + "\n";
    	document.getElementById("textarea").value = strtextarea;
    	strstatus="SendDummy2";
    	sec=0;
    }
    else if(stringReceived.substr(0,17) == "CURRENT PASSWORD=" && strstatus == "GetPassword"){
    	strtextarea+="Password: " + ss[0].substr(17,(ss[0].length-17)) + "\n";
    	document.getElementById("textarea").value = strtextarea;
    	strstatus="SendDummy3";
    	sec=0;
    }
    else if(stringReceived.substr(0,21) ==  "CURRENT SENDING TIME=" && strstatus =="GetSendingTime"){
    	strtextarea+="Sending Time: " + ss[0].substr(21,(ss[0].length-21)) + "\n";
    	document.getElementById("textarea").value = strtextarea;
    	strstatus="SendDummy4";
    	sec=0;
    }
    else if(stringReceived.substr(0,17) ==  "CURRENT DateTime=" && strstatus == "GetCurrentDateandTime"){
    	strtextarea+="Current Date and Time: " + ss[0].substr(17,(ss[0].length-17)) + "\n";
    	document.getElementById("textarea").value = strtextarea;
    	strstatus="SendDummy5";
    	sec=0;
    }

    else{
    }
    stringReceived = '';

  } else {
    stringReceived += str;
  }
};

chrome.serial.onReceive.addListener(onReceiveCallback);



//other functions
function convertArrayBufferToString(buf){
  var bufView = new Uint8Array(buf);
  var encodedString = String.fromCharCode.apply(null, bufView);
  return decodeURIComponent(encodedString);
};
//converts string to array
var str2ab = function(str) {
   var encodedString = unescape(encodeURIComponent(str));
   var bytes = new Uint8Array(encodedString.length);
   for (var i = 0; i < encodedString.length; ++i) {
      bytes[i] = encodedString.charCodeAt(i);
   }
   return bytes.buffer;
};
var getSensorType = function(){
	chrome.serial.send(connectionId,str2ab("O\n"),function(){});
};

function getDateandTime(){
	var today = new Date();
	var formatteddateandtime;
	//getdate
	var DD = today.getDate();
	var MM = today.getMonth() + 1;
	var YYYY = today.getFullYear();
	//get time
	var hh = today.getHours();//format is 24hrs
	var mm = today.getMinutes();
	var ss = today.getSeconds();

	if (DD<10) DD = "0" + DD;
	if (MM<10) MM = "0" + MM;
	if (hh<10) hh = "0" + hh;
	if (mm<10) mm = "0" + mm;
	if (ss<10) ss = "0" + ss;

	formatteddateandtime = (YYYY-2000) + "/" + MM + "/" + DD + "," + hh + ":" + mm + ":" + ss;
	console.log(formatteddateandtime);
	return formatteddateandtime;
};

function loading(vartime){
	var aa =""
	if (vartime<=4){
		switch(vartime){
			case 1:
				aa="─";
				break;
			case 2:
				aa="\\";
				break;
			case 3:
				aa="|";
				break;
			case 4:
				aa="/";
				break;
			default:
		}
	}
	else{
		var endmod = vartime % 4;
		switch(endmod){
			case 1:
				aa="─";
				break;
			case 2:
				aa="\\";
				break;
			case 3:
				aa="|";
				break;
			case 0:
				aa="/";
				break;
			default:
		}
	}
	return aa;
}
