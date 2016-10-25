// Global variables
var gamePattern = [];

var timeOut = 0;
var green = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var red = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var blue = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var yellow = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

var error = new Audio("http://soundbible.com/mp3/Kick-SoundBible.com-1331196005.mp3");

var clickingFlag = false;
var expectClickIndex = 0;


var simon = function() {
  var nextMove = Math.floor(Math.random() * 4);
  gamePattern.push(nextMove);
  playEntirePattern();

}

var lightUpAndSoundPlay = function(lightNum) {
  // console.log(lightNum);
  switch (lightNum) {
    case 0:
      // console.log("Green should light upp");
      $("#green-block").addClass("green-light-up");
      green.play();
      timeOut = setTimeout(function(){
        $("#green-block").removeClass("green-light-up", 400);
      }, 500);
      break;
    case 1:
    // console.log("Red should light upp");
      $("#red-block").addClass("red-light-up");
      red.play();
      timeOut = setTimeout(function(){
        $("#red-block").removeClass("red-light-up", 400);
      }, 500);
      break;
    case 2:
      // console.log("Yellow should light upp");
      $("#yellow-block").addClass("yellow-light-up");
      yellow.play();
      timeOut = setTimeout(function(){
        $("#yellow-block").removeClass("yellow-light-up", 400);
      }, 500);
      break;
    case 3:
      // console.log("Blue should light upp");
      $("#blue-block").addClass("blue-light-up");
      blue.play();
      timeOut = setTimeout(function(){
        $("#blue-block").removeClass("blue-light-up", 400);
      }, 500);
      break;
  }
}

$(document).ready(function(){
  $(".light-block").click(function(event){
    // console.log(event);
    var clickedBlock = event.currentTarget.id;
    // console.log(clickedBlock);
    var clickedBlockNum = -1;

    switch (clickedBlock) {
      case "green-block":
        clickedBlockNum = 0;
        break;
      case "red-block":
        clickedBlockNum = 1;
        break;
      case "yellow-block":
        clickedBlockNum = 2;
        break;
      case "blue-block":
        clickedBlockNum = 3;
        break;
    }

    lightUpAndSoundPlay(clickedBlockNum);

    // console.log("clickedBlockNum",clickedBlockNum);
    // console.log("gamePattern[expectClickIndex]",gamePattern[expectClickIndex]);

    if(clickedBlockNum === gamePattern[expectClickIndex]) {
      // console.log("Correct");
      // console.log("expectClickIndex",expectClickIndex);
      // console.log("gamePattern.length-1",gamePattern.length-1);
      if(expectClickIndex === (gamePattern.length-1)) {
        clickingFlag = false;
        expectClickIndex = 0;
        $(".light-block").removeClass("activated");
        simon();
      } else {
        expectClickIndex ++;
      }
    } else {
      // console.log("Wrong");
      error.play();
      clickingFlag = false;
      expectClickIndex = 0;
      $(".light-block").removeClass("activated");
      playEntirePattern();
    }
  });
});

var playEntirePattern = function(){
  // console.log("gamePattern: ",gamePattern);
  var playTime = 0;
  gamePattern.forEach(function(item, index, array){
    timeOut = setTimeout(function(){
      lightUpAndSoundPlay(item);
      playTime ++;
      if(playTime === array.length){
        timeOut = setTimeout(function(){
          clickingFlag = true;
          $(".light-block").addClass("activated");
        }, array.length * 1500);
      }
    }, (index+1)*1500);
  })
}

timeOut = setTimeout(function(){
  simon();
}, 3000);
