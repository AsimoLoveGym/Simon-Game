// Global variables
var gamePattern = [];
var clickingFlag = false;
var timeOut = 0;
var green = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var red = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var blue = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var yellow = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

var error = new Audio("http://soundbible.com/mp3/Kick-SoundBible.com-1331196005.mp3");

var expectClickIndex = 0;


var simon = function() {
  var nextMove = Math.floor(Math.random() * 4);
  gamePattern.push(nextMove);
  playEntirePattern();
}

var lightUpAndSoundPlay = function(lightNum) {
  switch (lightNum) {
    case 0:
      $("green-block").addClass("light-up");
      green.play();
      timeOut = setTimeout(function(){
        $("green-block").removeClass("light-up", 400);
      }, 1000);
      break;
    case 1:
      $("red-block").addClass("light-up");
      red.play();
      timeOut = setTimeout(function(){
        $("red-block").removeClass("light-up", 400);
      }, 1000);
      break;
    case 2:
      $("blue-block").addClass("light-up");
      blue.play();
      timeOut = setTimeout(function(){
        $("blue-block").removeClass("light-up", 400);
      }, 1000);
      break;
    case 3:
      $("yellow-block").addClass("light-up");
      yellow.play();
      timeOut = setTimeout(function(){
        $("yellow-block").removeClass("light-up", 400);
      }, 1000);
      break;
  }
}

$(document).ready(function(){
  $(".light-block").click(function(event){
    console.log(event);
    // may have bug here
    var clickedBlock = event.currentTarget.data();

    lightUpAndSoundPlay(clickedBlock);
    if(clickedBlock === expectClickIndex) {
      if(expectClickIndex === gamePattern.length) {
        clickingFlag = false;
        $(".light-block").removeClass("activated");
        simon();
      } else {
        expectClickIndex ++;
      }
    } else {
      error.play();
      clickingFlag = false;
      $(".light-block").removeClass("activated");
      playEntirePattern();
    }
  });
});

var playEntirePattern = function(){
  var playTime = 0;
  gamePattern.forEach(function(item, index, array){
    timeOut = setTimeout(function(){
      lightUpAndSoundPlay(item);
      playTime ++;
      if(playTime === array.length){
        timeOut = setTimeout(function(){
          clickingFlag = true;
          $(".light-block").addClass("activated");
        }, 1000);
      }
    }, 1000)
  })
}

timeOut = setTimeout(function(){
  simon();
}, 3000);
