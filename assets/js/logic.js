
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

    timeRemaining = 100; 

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

