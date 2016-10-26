// Global variables
var gamePattern = [];
var level = 0;
var powerOff = true;
var strictMode = false;
var clickingFlag = false;
var expectClickIndex = 0;
var tempoPattern = 1;
var timeOuts = [];
var difficulty = 19;

// Audio files for game voice
var green = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var red = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var blue = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var yellow = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var error = new Audio("http://soundbible.com/mp3/Kick-SoundBible.com-1331196005.mp3");
var youWin = new Audio("http://soundbible.com/mp3/SMALL_CROWD_APPLAUSE-Yannick_Lemieux-1268806408.mp3");


// ********** Simon Function ************
// Simon() will add one extra step to previous pattern
var simon = function() {
  level ++;
  // for tempo control
  if(level >= 5 ) {
    tempoPattern = 0.9;
  }
  if(level >= 9 ) {
    tempoPattern = 0.7;
  }
  if(level >= 13 ) {
    tempoPattern = 0.5;
  }

  var nextMove = Math.floor(Math.random() * 4);
  gamePattern.push(nextMove);
  playEntirePattern();

  timeOuts.push(setTimeout(function(){
    display();
  },1000));
}
// ********** End of Simon Function ************

// ********** lightUpAndSoundPlay Function ************
var lightUpAndSoundPlay = function(lightNum) {
  // console.log(lightNum);
  switch (lightNum) {
    case 0:
      // console.log("Green should light upp");
      $("#green-block").addClass("green-light-up");
      green.play();
      timeOuts.push(setTimeout(function(){
        $("#green-block").removeClass("green-light-up", 300*tempoPattern);
      }, 300*tempoPattern));
      break;
    case 1:
    // console.log("Red should light upp");
      $("#red-block").addClass("red-light-up");
      red.play();
      timeOuts.push(setTimeout(function(){
        $("#red-block").removeClass("red-light-up", 300*tempoPattern);
      }, 300*tempoPattern));
      break;
    case 2:
      // console.log("Yellow should light upp");
      $("#yellow-block").addClass("yellow-light-up");
      yellow.play();
      timeOuts.push(setTimeout(function(){
        $("#yellow-block").removeClass("yellow-light-up", 300*tempoPattern);
      }, 300*tempoPattern));
      break;
    case 3:
      // console.log("Blue should light upp");
      $("#blue-block").addClass("blue-light-up");
      blue.play();
      timeOuts.push(setTimeout(function(){
        $("#blue-block").removeClass("blue-light-up", 300*tempoPattern);
      }, 300*tempoPattern));
      break;
  }
}
// ********** End of lightUpAndSoundPlay Function ************

$(document).ready(function(){
// For diccifulty choose
  $(".difficulty-choose").click(function(event){
    var difficultySet = event.currentTarget.id;
    switch (difficultySet) {
      case "easy":
        difficulty = 9 - 1;
        $("#dropdownMenu1").html("Easy (9 steps)");
        break;
      case "medium":
        difficulty = 15 - 1;
        $("#dropdownMenu1").html("Medium (15 steps)");
        break;
      case "hard":
        difficulty = 20 - 1;
        $("#dropdownMenu1").html("Hard (20 steps)");
        break;
    }
    // console.log(difficulty);
  });

// switch on or off control
  $("#off").click(function(event){
    if(powerOff) {
      $("#off").addClass("powerOn");
      powerOff = false;
      $("#display-content").html("- -");
    } else {
      $("#off").removeClass("powerOn");
      powerOff = true;
      $("#display-content").html("");
      reset();
    }
  });


    $("#start-button").click(function(event){
        if(!powerOff) {
          // if restart during lights up, turn off lights
        $("#green-block").removeClass("green-light-up");
        $("#red-block").removeClass("red-light-up");
        $("#yellow-block").removeClass("yellow-light-up");
        $("#blue-block").removeClass("blue-light-up");

        // clear all the code in setTimeout and reset all the value
        for (var i = 0; i < timeOuts.length; i++) {
          clearTimeout(timeOuts[i]);
        }
        gamePattern = [];
        level = 0;
        clickingFlag = false;
        expectClickIndex = 0;
        tempoPattern = 1;
        timeOuts = [];

        // Display animation
        timeOuts.push(setTimeout(function(){
          $("#display-content").html("");
        },200));
        timeOuts.push(setTimeout(function(){
          $("#display-content").html("- -");
        },300));
        timeOuts.push(setTimeout(function(){
          $("#display-content").html("");
        },400));
        timeOuts.push(setTimeout(function(){
          $("#display-content").html("- -");
        },600));
        timeOuts.push(setTimeout(function(){
          simon();
        },800));
      }
    }); // End of start-button control

    $("#strict-button").click(function(event){
      if(!powerOff) {
        if(!strictMode) {
          strictMode = true;
          $("#strict-light").addClass("strict-mode-on");
        } else {
          strictMode = false;
          $("#strict-light").removeClass("strict-mode-on");
        }
      }
    });

    $(".light-block").click(function(event){
      if(clickingFlag) {
        var clickedBlock = event.currentTarget.id;
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
            // console.log("expectClickIndex",expectClickIndex);
          // console.log("gamePattern.length-1",gamePattern.length-1);

          // YOU WIN, after achieve 9,15 or 20 levels, depends on the difficulty you choose
          if(expectClickIndex === difficulty) {
            timeOuts.push(setTimeout(function(){
              // simon();
              winning();
            },2000));
          }

          // If you finish one round
          if(expectClickIndex === (gamePattern.length-1) && expectClickIndex < difficulty) {
            clickingFlag = false;
            expectClickIndex = 0;
            $(".light-block").removeClass("activated");
            simon();
          } else {
            expectClickIndex ++;
          }

        } else {
          // you clicked the wrong pattern
          error.play();
          $("#display-content").html("! ! !");
          if(strictMode) {
            gamePattern = [];
            level = 0;
            clickingFlag = false;
            expectClickIndex = 0;
            timeOuts.push(setTimeout(function(){
              simon();
            },2000));
          } else {
            timeOuts.push(setTimeout(function(){
              display();
            },1000));
            clickingFlag = false;
            expectClickIndex = 0;
            $(".light-block").removeClass("activated");
            playEntirePattern();
          }
        }
      } // End of clickingFlag "if" control
    }); // End of $(".light-block").click

});

var playEntirePattern = function(){
  // For cheating test
  // console.log("gamePattern: ",gamePattern);
  // for(var i = 0; i < gamePattern.length; i ++) {
  //   console.log(i);
  //   switch (gamePattern[i]) {
  //     case 0:
  //       console.log("Green");
  //       break;
  //     case 1:
  //       console.log("Red");
  //       break;
  //     case 2:
  //       console.log("Yellow");
  //       break;
  //     case 3:
  //       console.log("Blue");
  //       break;
  //   }
  // }

  var playTime = 0;
  gamePattern.forEach(function(item, index, array){
      timeOuts.push(setTimeout(function(){
        lightUpAndSoundPlay(item);
        playTime ++;
        if(playTime === array.length){
          timeOut = setTimeout(function(){
            clickingFlag = true;
            $(".light-block").addClass("activated");
          }, 400+600*tempoPattern);
        }
      }, (index+1)*(400+600*tempoPattern) ));
  });
}

var display = function() {
  var displayLevel = "";
  if(level < 10) {
    displayLevel = "0 " + level + " ";
  } else {
    displayLevel = Math.floor(level/10) + " " + (level - Math.floor(level/10)*10) + " ";
  }
  // console.log("displayLevel: ",displayLevel);
  $("#display-content").html(displayLevel);
  // Try to use jQuery animate() for display animation, doesn't work
  // $("#display-content").animate({
  //   html(displayLevel);
  // })
}

var winning = function() {
  youWin.play();

  // display animations
  $("#display-content").html("! ! !");
  var intervalLight = setInterval(function(){
    $("#green-block").addClass("green-light-up");
    $("#red-block").addClass("red-light-up");
    $("#yellow-block").addClass("yellow-light-up");
    $("#blue-block").addClass("blue-light-up");
    timeOuts.push(setTimeout(function(){
      $("#green-block").removeClass("green-light-up", 400);
      $("#red-block").removeClass("red-light-up", 400);
      $("#yellow-block").removeClass("yellow-light-up", 400);
      $("#blue-block").removeClass("blue-light-up", 400);
    }, 500));
  }, 1500);
  timeOuts.push(setTimeout(function(){
    clearInterval(intervalLight);
  }, 6000));
}

var reset = function(){
  gamePattern = [];
  level = 0;
  powerOff = true;
  strictMode = false;
  clickingFlag = false;

  tempoPattern = 1;
  $(".light-block").removeClass("activated");
  expectClickIndex = 0;

  // if power off during lights up, turn off lights
  $("#green-block").removeClass("green-light-up");
  $("#red-block").removeClass("red-light-up");
  $("#yellow-block").removeClass("yellow-light-up");
  $("#blue-block").removeClass("blue-light-up");

  for (var i = 0; i < timeOuts.length; i++) {
    clearTimeout(timeOuts[i]);
    // console.log("clearing timeout!");
  }

  timeOuts = [];
}

// for initial test without Start button
// timeOut = setTimeout(function(){
//   simon();
// }, 3000);

// for winning display test
// timeOuts.push(setTimeout(function(){
//   winning();
// },3000));
