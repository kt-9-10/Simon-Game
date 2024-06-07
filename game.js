var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


function playSound(name) {
  var Sound = new Audio('sounds/' + name + '.mp3');
  Sound.play();
}


function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');
  setTimeout(function() {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}


function nextSequence() {
  userClickedPattern = []

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}


function checkAnswer(currentLevel) {
  console.log(gamePattern);
  console.log(userClickedPattern);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


$(".btn").on("click", function() {
  if(started) {

    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  }
});


$(document).on("keypress", function() {
  if(!started) {
    started = true;
    nextSequence();
  }
});
