//jquery.js
var playing = false;
var score;
var trialsLeft;
var fruits = ["apple", "banana", "cherries", "grapes", "orange", "peach", "pineapple", "strawberry", "watermelon"];
var step;
var action; // used for the setInterval function

$(function(){
// click on start/reset button
$("#startreset").click(function(){
// we are playing

if(playing ==  true){
   // reload the page
   location.reload();

}else{
    // we are not playing

   playing = true; // game initiated
   // set score to 0
   score = 0; // set score to 0
   $("#scorevalue").html(score);

   // show trials left
   $("#trialsLeft").show();
   trialsLeft = 3;
   addHearts();

   // hide game over box
   $("#gameOver").hide();

   //change button text to "reset game"
   $("#startreset").html("Reset Game");

   // start sending fruits
   startAction();
}
});


$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //updating the score
//    document.getElementById("#slicesound").play();
    $("#slicesound")[0].play(); // play sound
    
    // stop fruit 
    clearInterval(action);
    
    // hide the fruit
    $("#fruit1").hide("explode", 500); // slicing the fruit
    
    // send a new fruit
    setTimeout(startAction, 500);
})    




// slice a fruit
     // play sound in the background
     // explode fruit
function addHearts(){
    $("#trialsLeft").empty();
    for(i=0; i < trialsLeft; i++){
               $("#trialsLeft").append('<img src="images/heart.png" class="life">');
           }
};

function startAction(){
    
    // generate a fruit
   $("#fruit1").show();
    chooseFruit();  // choose a random fruit
    $("#fruit1").css({"left" : Math.round(550*Math.random()), "top": -50});
    // random position 
    
    // generate a random step
    step = 1+Math.round(5*Math.random());// change step
    
    // move fruit down by 1 step ever 10ms
    action = setInterval(function(){
        
        //move fruit by one step
        $("#fruit1").css("top", $("#fruit1").position().top + step); 
        
        // check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
            // check if we have trials left
            if(trialsLeft > 1){
                // generate a fruit
              $("#fruit1").show();
              chooseFruit();  // choose a random fruit
              $("#fruit1").css({"left" : Math.round(550*Math.random()), "top": -50}); // random position 
    
             // generate a random step
              step = 1+Math.round(5*Math.random());// change step
                
                // reduce trials by one
                trialsLeft --;
                
                // populate trials left box
                addHearts();
                 
            }else{ // game over
               playing = false;// we are not playing anymore
                $("#startreset").html("Start Game");// Change button to start game
                $("#gameOver").show();
                $("#gameOver").html("<p>Game Over!</p><p>Your score is " + score + "</p>");
                
                $("#trialsLeft").hide();
                stopAction();
                                    
            }
            
        }
    }, 10)
    
}

// generate a random fruit
function chooseFruit(){
    $("#fruit1").attr("src", "images/" + fruits[Math.round(8*Math.random())] + ".png");
};

// stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
};

});