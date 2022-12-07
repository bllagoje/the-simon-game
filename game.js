let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// Start the Game:
$(document).on("keypress", function(e) {
    if(started == false) {
        // console.log("STARTED");
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Next Sequence:
function nextSequence() {
    userClickedPattern = [];

    // Generate Random:
    let randomNumber = Math.floor(Math.random() * 3 ) + 1;
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Sound:
    playSound(randomChosenColour);

    // Animation:
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // Level:
    $("h1").text("Level " + level);
    level++;
};

// Sound:
function playSound(name) {
    var audio = new Audio("sounds/ " + name + ".mp3");
    audio.play();
};

// Detect Button Click:
$(".btn").click(function() {
    let userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    let indexOfLastAnswer = userClickedPattern.length - 1;
    checkAnswer(indexOfLastAnswer);
});

// Play Sound:
function playSound(name) {
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
};
   
// User Click Animation:
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

// Check Answer:
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        console.log("Wrong");
        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("$level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
};

// Start Over:
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
};

