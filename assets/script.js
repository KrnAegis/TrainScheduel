
var config = {
    apiKey: "AIzaSyCCNW1fzBpCCpQq2646OfeHlGzIc8NYB94",
    authDomain: "first-f-fc670.firebaseapp.com",
    databaseURL: "https://first-f-fc670.firebaseio.com",
    projectId: "first-f-fc670",
    storageBucket: "first-f-fc670.appspot.com",
    messagingSenderId: "902510542600"
  };
  firebase.initializeApp(config);
var database = firebase.database();

//on sumbit button
$("#submitBtn").on("click", function(){

	//all for Next arrival and Minutes away calculation
	var t = $("#trainTime").val().trim(); //value user input first train departure time
	var convertedTime = moment(t, 'HH:mm').subtract(1, "years"); //conver user input to managable data 
	var difT = moment().diff(moment(convertedTime), "minutes"); // difference of current time and converted time in minutes
	var remT = difT % newFreq; //find the remainder of value of user entered train freequence and the difference using module
	var tmA = newFreq - remT; //minutes away is the frequency minus the remainder
	var nextTrain = moment().add(tmA, "minute"); //next train arrives adding current and the remainder
	var ntConverted = moment(nextTrain).format("LT"); //formating the data to readable data by user


	//value of user input data, with time data from above
	newName = $("#trainName").val().trim();
	newDest = $("#trainDest").val().trim();
	newFreq = $("#trainFreq").val().trim();
	var newTime = ntConverted
	var newAway = tmA

//if statement to only take in data if the fields are all filled
if (newName !== "" && newDest !== "" && newTime !== "" && newFreq !== "" ){
	//making table at sumbit button click with user input data
	var newRow = $("<tr>");
	newRow.attr("class", "newTrains")

	var newcolName = $("<td>");
	var newcolDest = $("<td>");
	var newcolTime = $("<td>");
	var newcolFreq = $("<td>");
	var newcolAway = $("<td>");
	//giving the colums text with user input data and appending to the row
	newcolName.text(newName);
	newRow.append(newcolName);

	newcolDest.text(newDest);
	newRow.append(newcolDest);

	newcolFreq.text(newFreq);
	newRow.append(newcolFreq);

	newcolTime.text(newTime);
	newRow.append(newcolTime);

	newcolAway.text(newAway);
	newRow.append(newcolAway);
	//attaching row to the div created
	$("#trainInfo").append(newRow);
	//pushing the data to firebase and storing not replacing
	 database.ref().push({
	 	newName: newName,
	 	newDest: newDest,
	 	newFreq: newFreq,
	 	newTime: newTime,
	 	newAway: newAway
	 });
	}
	else {
		alert("Missing some fields!");
	}
//reload the doc once sumbit is pressed to get an update
location.reload();
});

//call data stored in firebase and displaying the data in the table
database.ref().on("child_added", function(childSnapshot) {
	//datas from firebase
	newName = (childSnapshot.val().newName)
	newDest = (childSnapshot.val().newDest)
	newFreq = (childSnapshot.val().newFreq)

	//all for Next arrival and Minutes away calculation
	var t = (childSnapshot.val().newTime); //value user input first train departure time
	var convertedTime = moment(t, 'HH:mm').subtract(1, "years"); //conver user input to managable data 
	var difT = moment().diff(moment(convertedTime), "minutes"); // difference of current time and converted time in minutes
	var remT = difT % newFreq; //find the remainder of value of user entered train freequence and the difference using module
	var tmA = newFreq - remT; //minutes away is the frequency minus the remainder
	var nextTrain = moment().add(tmA, "minute"); //next train arrives adding current and the remainder
	var ntConverted = moment(nextTrain).format("LT"); //formating the data to readable data by user

	newTime = ntConverted
	newAway = tmA

	var newRow = $("<tr>");
	newRow.attr("class", "newTrains")

	var newcolName = $("<td>");
	var newcolDest = $("<td>");
	var newcolTime = $("<td>");
	var newcolFreq = $("<td>");
	var newcolAway = $("<td>");

	newcolName.text(newName);
	newRow.append(newcolName);

	newcolDest.text(newDest);
	newRow.append(newcolDest);

	newcolFreq.text(newFreq);
	newRow.append(newcolFreq);

	newcolTime.text(newTime);
	newRow.append(newcolTime);

	newcolAway.text(newAway);
	newRow.append(newcolAway);

	$("#trainInfo").append(newRow);
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });	


