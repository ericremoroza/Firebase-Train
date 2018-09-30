// Initialize Firebase
var config = {
  apiKey: "AIzaSyAK-QSTmJVas9LMXxlPquDBLxIFUXzxmuw",
  authDomain: "fir-train-bb36a.firebaseapp.com",
  databaseURL: "https://fir-train-bb36a.firebaseio.com",
  projectId: "fir-train-bb36a",
  storageBucket: "",
  messagingSenderId: "97902743591"
};
firebase.initializeApp(config);

var database = firebase.database();

//button to submit train
$("#trainButton").on("click", function (event) {
  //Prevents page from refreshing
  event.preventDefault();

  //user input
  var trainName = $("#trainInput").val().trim();
  var destination = $("#destInput").val().trim();
  var firstTrain = $("#firstTrainInput").val().trim();
  var frequency = $("#frequencyInput").val().trim();

  //temporary hold for data
  var newTrain = {
    name: trainName,
    dest: destination,
    first: firstTrain,
    freq: frequency
  }

  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);
  //new data pushed to database
  database.ref().push(newTrain);




  //clear text boxes
  $("#trainInput").val("");
  $("#destInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

});

//Firebase event prints row on index.html
database.ref().on("child_added", function (snapshot) {
  console.log(snapshot.val());

  var trainName = snapshot.val().name;
  var destination = snapshot.val().dest;
  var firstTrain = snapshot.val().first;
  var frequency = snapshot.val().freq;

  //train first run
  var firstTrainTime = moment(firstTrain, "hh:mm").subtract(1, "years");
  console.log(firstTrainTime);

  //current time
  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("HH:mm"));

  //difference between times
  var timeDifference = moment().diff(moment(firstTrainTime), "minutes");
  console.log("Time Difference: " + timeDifference);

  //remainder of time
  var timeRemain = timeDifference % frequency;
  console.log(timeRemain);

  //time until train in minutes
  var nextTrainMin = frequency - timeRemain;
  console.log("Minutes until Train: " + nextTrainMin);

  //next train arrival time
  var nextTrainTime = moment().add(nextTrainMin, "minutes").format("hh:mm");
  console.log("Arrival Time: " + moment(nextTrainTime).format("HH:mm"));


  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrainTime),
    $("<td>").text(nextTrainMin)
  );

  $("#trainsInfo > tbody").append(newRow);
});