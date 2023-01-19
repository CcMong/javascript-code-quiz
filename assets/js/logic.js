
var timeEl = document.querySelector("#time");
var startScreenEl = document.querySelector("#start-screen");
var startButtonEl = document.querySelector("#start");
var questionScreenContainerEl = document.querySelector("#questions");
var questionTitleEl = document.querySelector("#question-title");
var questionChoiceContainerEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");
var endScreenContainerEl = document.querySelector("#end-screen");
var finalScoreEl = document.querySelector("#final-score");

var timeRemaining;
var questionsRemaining = 11; // 11 questions in the array, but only 10 of them will be displayed at random.
var quizQuestionIndex = 0;

//1. Function to set the timer to 100 seconds, and then to start counting down:

function setTimer() {

    timeRemaining = 100; // Declared in global scope, but set within the function's local scope

    // Set the time interval, such that it counts down second by second

    var timerInterval = setInterval(function () {

        timeRemaining--;

        timeEl.textContent = timeRemaining; // Set the "Time Remaining" text to count down in real time
        
        if(questionsRemaining === 0 || timeRemaining < 1) { 
            
            // We want to stop the timer when there is no more time left OR when there are no more questions to answer
            clearInterval(timerInterval);

            fromQuestionToEndScreen(); // We also want to move to the end screen when either of those things happens
            
            finalScoreEl.textContent = timeRemaining; // Logs the time remaining in the final score span element
        }
                
    }, 1000); // This will cause the timer to count down per second (1000ms)
}

//2. Function to take the user from the "Start" screen to the questions screen by hiding the welcome element and making the question elements visible

function fromStartToQuestions() {

    startScreenEl.setAttribute("class", "hide");
    questionScreenContainerEl.setAttribute("class", "visible");
    
}

//3. Function to take the user from the questions screen to the "End" screen. This can be used BOTH when the timer runs out and when the user has answered all the questions

function fromQuestionToEndScreen() { 
        
    questionScreenContainerEl.setAttribute("class", "hide");
    feedbackEl.setAttribute("class", "hide");
    endScreenContainerEl.setAttribute("class", "visible");    
}



