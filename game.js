let buttonList = ["green", "red", "yellow" ,"blue"];
let gamePattern = [];
let playerPattern = [];
let level = 0;
let started = false;

//Check for initial keyboard input
debugger;
document.addEventListener("keydown", function() {
    if (!started) {
        nextLevel();
        started = true;
    }
})

//Always check for button mouse click
for (var i = 0; i < buttonList.length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function() {
        playerPattern.push(this.id);
        buttonAnimation(this.id);
        playSound(this.id);
        checkAnswer(this.id);
    });
}

//Check if current clicked button (lastest player button) matches game's button corressponding to the game pattern
function checkAnswer(currentPlayerButton) {
    if (currentPlayerButton === gamePattern[playerPattern.length - 1]) {
        if (playerPattern.length == gamePattern.length) {
            setTimeout(function() {     //Refresh time for new level
                nextLevel();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        document.querySelector("h1").textContent = "Game Over, Press Any Key to Restart.";
        setTimeout(function() {
            document.querySelector("body").classList.remove("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}

// Clear player's pattern sequence, generate new random button
function nextLevel() {
    playerPattern = [];
    level++;
    document.querySelector("h1").textContent = "Level " + level;
    randomButton = buttonList[Math.floor(Math.random() * 4)];
    gamePattern.push(randomButton);
    buttonAnimation(randomButton);
    playSound(randomButton);
}

function buttonAnimation(button) {
    var activeButton = document.querySelector("#" + button);
    activeButton.classList.add("pressed");

    function inactiveButton() {
        activeButton.classList.remove("pressed");
    }
    setTimeout(inactiveButton, 100);
};

function playSound(name) {
    audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
};