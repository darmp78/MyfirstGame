
//array with colors
var buttonColours = ["red","blue","green","yellow"];

//next array 
var gamePattern = [];

//what color the user chose
var userClickedPattern = [];

//level variable
var level = 0;

//game started
var started = false;

//press A
$(document).on('keypress',function(e){
    console.log(e.key);
    if(e.key === "a" && !started){
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }

})

//Create my main function
function nextSequence (){
    //increase level by 1
    level++;

    //change the h1 text
    $("h1").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);

    //contain the random color
    var randomChosenColour = buttonColours[randomNumber];

    //add the new item to the game pattern
    gamePattern.push(randomChosenColour);

    //get the pressed button
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //play sound
    playSound(randomChosenColour);


}

//get the id of pressed button
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

//play sound
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animate
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed").delay(100).queue(function(next){
        $(this).removeClass("pressed");
        next();
    });
}

//check the answer 
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(nextSequence,1000);
            userClickedPattern = [];
        }
    }else {
        console.log("Wrong");
        //play wrong sound 
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        //change the body color to red
        $("body").addClass("game-over").delay(200).queue(function(next){
            $(this).removeClass("game-over");
            next();
        });
        //change the level text to game over
        $("h1").text("Game Over, Press A to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}


