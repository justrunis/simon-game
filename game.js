var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

function startGame() {
  if (!started) {
      $("#level-title").text("Level " + level);
      $('#instruction-title').hide();
      $('.instruction-button').hide();
      nextSequence();
      started = true;
  }
}

$(document).on('keypress', startGame);

$('.start-game').click(startGame);

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkanswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playPatternAtIndex(0);
}

function playPatternAtIndex(index) {
  if (index < gamePattern.length) {
    $("#" + gamePattern[index])
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100, function () {
        playSound(gamePattern[index]);

        setTimeout(function () {
          playPatternAtIndex(index + 1);
        }, 300);
      });
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkanswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    animateWrong();
    startOver();
  }
}

function animateWrong(){
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
}

function startOver(){
    $("#level-title").text("GAME OVER!");
    $('#instruction-title').text("Press Any Key to Restart");
    $('#instruction-title').show();
    $('.instruction-button').show();
    level = 0;
    gamePattern = [];
    started = false;
}