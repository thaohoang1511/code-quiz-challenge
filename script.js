var startButton = document.getElementById("startButton");
var submitButton = document.querySelector("button.submitButton");
var scoreEl = document.getElementById("#score");
var userName;
var questionDisplay = document.getElementById("question");
var userAnswer = document.getElementById("multipleChoice");

var timeEl = document.querySelector("#time");
var secondLeft = 5;
var questionNum = -1;

//When user click start
startButton.addEventListener("click", quizScreen);


//When user click start, the starter screen will disappear the question screen will appear 
function quizScreen(){
    document.getElementById("starterScreen").classList.add('d-none');
    document.getElementById("questionScreen").classList.remove('d-none');

    setTime();
    displayQuestion();
    
}


//Function to set timer for the quiz
function setTime(){
    var timerInterval = setInterval(function(){
        secondLeft--;
        timeEl.textContent = "Time: " + secondLeft;

        if(secondLeft === 0 || secondLeft < 0 || questionNum === question.length){
            clearInterval(timerInterval);
            setTimeout(displayResult, 1000);
        }
        
    }, 1000);
}


//Function to display questions
function displayQuestion(){
    questionNum = 0;
    
    questionDisplay.textContent = question[questionNum].title;
    userAnswer.innerHTML="";
    var choices = question[questionNum].choices;
    for(var i = 0; i < 4; i++){
        var nextChoice = document.createElement("button");
        nextChoice.textContent = choices[i];
        answerBtn = userAnswer.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
    }

}


//Function to display the result and let user enter their name
function displayResult(){
    document.getElementById("questionScreen").classList.add('d-none');
    document.getElementById("resultScreen").classList.remove('d-none');
    scoreEl.textContent = "Your final score is: " + secondLeft ;
}

//When user enter their name click submit
submitButton.addEventListener("click", function(event){
    event.stopPropagation;
    addScore();
   
    window.location.href='./highscore.html';
});


function hideResult(){
    var pickAnswer = document.getElementsByClassName("result")[0]
    pickAnswer.style.display='none'
}

function showResult(){
    var pickAnswer = document.getElementsByClassName("result")[0]
    pickAnswer.removeAttribute('style');
}

//When user pick the answer
userAnswer.addEventListener("click", function(event){
    var pickAnswer = document.getElementsByClassName("result")[0];

    if(answer === event.target.textContent){
        pickAnswer.innerHTML = "Correct!";
        setTimeout(hideResult, 500);
        showResult();
    }
    else{
        pickAnswer.innerHTML = "Wrong!";
        secondLeft -= 10;
        setTimeout(hideResult, 500);
        showResult();
    }
    displayQuestion();
});

