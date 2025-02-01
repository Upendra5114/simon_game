var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var soundOn = true;

$(".rules").hide();

$(".start").click(function () {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    nextSequence();
});

$("#rules").click(function () {
    $(".rules").slideToggle();
    if (soundOn){
        var audio = new Audio("bclick.wav");
        audio.play();
    }
});

// Toggle sound button
$("#muteButton").click(function () {
    soundOn = !soundOn;
    if (soundOn) {
        $(this).text("🔊"); 
    } else {
        $(this).text("🔇");
    }
});

function nextSequence() {
    var random = Math.random();
    random = random * 4;
    random = Math.floor(random);
    var randomChosenColour = buttonColors[random];
    gamePattern.push(randomChosenColour);

    // Flash the color
    $("#" + randomChosenColour).fadeOut().fadeIn();

    playsound(randomChosenColour);

    // Changing level
    $("#level-title").text("Level " + level);
    level++;
}

function playsound(name) {
    if (soundOn) { 
        var audio = new Audio(name + ".mp3");
        audio.play();
    }
}

// Button clicked!
$(".btn").on("click", function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    // Sounds for buttons clicked!
    playsound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer();
});

// Adding animations!
function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

// Sequence check
function checkAnswer() {
    current = level;
    var rec = false;
    var u = userClickedPattern.length;
    var g = gamePattern.length;
    while (current !== -1) {
        if (userClickedPattern[current] === gamePattern[current]) {
            rec = true;
        } else {
            rec = false;
            break;
        }
        current--;
    }
    if (rec === true) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
        userClickedPattern = [];
    } else if (rec === false && g <= u) {
        if (soundOn) {
            var audio = new Audio("wrong.mp3");
            audio.play();
        }
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game over! Press start key to start again");
    }
}