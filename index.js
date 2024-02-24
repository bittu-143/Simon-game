var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if(userClickedPattern[level-1]==gamePattern[level-1]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 500);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
});
function startOver(){
    gamePattern = [];
    level = 0;
    started = false; 
    userClickedPattern = [];
}
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level"+level);
        nextSequence();
        started = true;
    }
});
function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");    
    }, 50);
}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}