'use strict';
/*
* Extension of calendar controller.js
*/

function tutorialInit($scope, $location){
	
	var msg = [
	           "Let's begin our tutorial by navigate with the <strong>Right(&raquo;)</strong> buttons below to proceed.<br>To return to your previous step click <strong>Left(&laquo;)</strong> buttons below.",
	           "You will need to change your Profile Settings first. Click on the blinking button on top right which indicates <strong>Settings</strong> or, click the button here to proceed: <a class='btn btn-primary' href="+settingsURL+"#/?tut=1'>Continue tutorial</a>."
	           ];
	
	var msg_2 = [
	           "After you've changed your settings, your booking will be made here with this link/screen.<br>All available events that you have subscribed to will be displayed here.",
	           "As tutorial, you've subscribed to <strong><i>JOM Jaring</i></strong>&copy; account in your subscription profile. Check out <strong>Today's</strong> <i>My Demo Event</i>.",
	           "<i>Now, let's start a reservation!</i> Click on the blinking event and you'll see the event being displayed in <strong>Scheduled Events</strong> dialog.<br><strong>Try it !</strong>",
	           "The <strong>Scheduled Events</strong> dialog, displays your booking status, which includes the date, time(as demo this a full day event, hence the unavailability) and an explanation of the event by the publisher.",
	           "Click on the <strong>Book</strong> button under Scheduled Event and you will be confirmed.<br><strong>Try it !</strong>",
	           "Your confirmed booking will have a different style. Click on the event again and see the <strong>Scheduled Event</strong> stated reserved.<br><strong>Try it !</strong>",
	           "<i>Now, let's cancel your reservation!</i> Click on <strong>Cancel Booking</strong> button under <strong>Scheduled Events</strong> dialog.<br><strong>Try it !</strong>",
	           "Your reservation is now cancelled(if you followed the tutorial that is!) and the event will be returned to it's normal status.<br><strong>Note: </strong>Sometimes your event cannot be cancelled or reserved. But this will not be covered in this tutorial.",
	           "Your can change your view settings as well based on <strong>Day</strong>,<strong>Week</strong> and <strong>Month</strong> under the <strong>Calendar</strong> dialog.",
	           "If you noticed, there is a weather forecast under <strong>Weather Forecast</strong> dialog. The weather changes based on your selected dates.<br><strong>Note:</strong> Due to that this is a network based, the response will have display <strong>delays</strong>.",
	           "Click on any of the dates in the calendar and the <strong>weather prediction</strong> around your state will be displayed.<br><strong>Try it !</strong>",
	           "You have completed your tutorial. To exit click on the button: <a class='btn btn-primary' href='/selfservice/booking/calendar'>Complete</a>.<br>Thank you for your participation."
	           ];
	var firstTrigger = false;
	
	var makeAnimation = function(count){
		switch(count){
		case 1:
			$('#setting').addClass("tutorialblink");
			//override the settings button.
			$scope.goSettings = function(){
				window.location.href=settingsURL+"#/?tut=1";
			}
			break;
		default:
			break;
		}
		
	}
	
	/**Override all triggers**/
	var overrideTriggers = function(){
		
		var addEvent = {title: 'My Demo Event',desc: 'This is just a demo event', start: new Date(),end: new Date(), allDay: true, id: 'demo', className:'tutorialblink'};
		var removeEvent = {title: 'A new Demo Event',desc: 'This is just a demo event', start: new Date(),end: new Date(), allDay: true, id: 'demo', textColor:'rgb(0,0,0)', color:'rgb(223, 240, 216)'};
		
		$scope.tutEvents.push(addEvent);
	    
		$scope.confirmBooking = function(method, id){
			if(method=='POST'){
				$scope.tutEvents.splice(0,1);
				$scope.tutEvents.push(removeEvent);
				$scope.currEvents=[];
				$scope.open('ok');
			}else if(method=='DELETE'){
				$scope.tutEvents.splice(0,1);
				$scope.tutEvents.push(addEvent);
				$scope.currEvents=[];
				$scope.open('ok');
			}
		}
	}
	
	var makeAnimation_2 = function(count){
		switch(count){
		case 1:
			if(!firstTrigger){
				firstTrigger = true;
				overrideTriggers();
			}
		    break;
		}
	}
	
	var msgType = msg;
	var animationFunc = makeAnimation;
	
	$scope.tutorialChgMessage = function(s_count){
		$scope.tut_last=false;
		$scope.tut_first=false;
		
		if($scope.count+s_count <= 0){
			$scope.tut_first=true;
		}else if($scope.count+s_count >= msgType.length-1){
			$scope.tut_last=true;
		}
		
		$scope.count += s_count;
		animationFunc($scope.count);
		$scope.tutorialMsg = msgType[$scope.count];
	}
	
	var tutorialOn = $location.search().tut;
	if(tutorialOn != undefined){
		$scope.count = 0;
		$scope.tutorialRun = true;
		if(tutorialOn == 1){
			msgType = msg;
			animationFunc = makeAnimation;
		}else if(tutorialOn == 2){
			msgType = msg_2;
			animationFunc = makeAnimation_2;
		}
		
		$scope.tutorialChgMessage(0);
	}
}

