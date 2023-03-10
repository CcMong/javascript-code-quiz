
var timeEl = document.querySelector("#time");
var startScreenEl = document.querySelector("#start-screen");
var startButtonEl = document.querySelector("#start");
var questionScreenContainerEl = document.querySelector("#questions");
var questionTitleEl = document.querySelector("#question-title");
var questionChoiceContainerEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");
var endScreenContainerEl = document.querySelector("#end-screen");
var finalScoreEl = document.querySelector("#final-score");
var audioCorrect = new Audio("./assets/sfx/correct.wav");
var audioWrong = new Audio("./assets/sfx/incorrect.wav");
var submitButtonEl = document.querySelector("#submit");

var timeRemaining;
var questionsRemaining = 11; // 11 questions in the array, but only 10 of them will be displayed at random.
var quizQuestionIndex = 0;

//1. Function to set the timer to 100 seconds, and then to start counting down

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


/*Creating Our Source of Questions to Directly Populate the Quiz
=================================================================*/

// Let's define a new array which will be a copy of the main quizQuestions array, so we do not mutate the main array

var quizQuestionsCopy = [...quizQuestions]; 

//console.log(quizQuestionsCopy);

// Create a function to shuffle this new array and call it, to ensure that the questions do not appear in the same order whenever the quiz is run 

function arrayShuffle(array) {

    array.sort( () => 0.5 - Math.random());

    return array;
}

arrayShuffle(quizQuestionsCopy); // This output array now becomes our direct source of quiz questions

//4. Function to populate the questions screen with questions and multiple choice options

function fillInQuestionsAndOptions() { 

    
    if (quizQuestionIndex > quizQuestionsCopy.length) return; // We come out of the function when there are no more questions to ask

    var objectOfQuestionAsked = quizQuestionsCopy[quizQuestionIndex]; // It will start from index 0 and take the corresponding question object in the shuffled array one by one, which should be in random order every time the quiz is run

    var questionAsked = objectOfQuestionAsked.question; // The question value of the object
    var questionOptions = objectOfQuestionAsked.options; // The array of multiple choice options
    var questionAnswerIndex = objectOfQuestionAsked.answerIndex; // The answer index value of the object

    /* Fill in the Quiz Questions
    ------------------------------*/
    
    questionTitleEl.innerHTML = ""; // Makes the Questions area in the HTML empty
    
    questionTitleEl.textContent = questionAsked; // Fills in the quiz question with the corresponding "question" value of the randomly chosen object

    /* Fill in the Quiz Answer Options
    -----------------------------------*/

    questionChoiceContainerEl.innerHTML = ""; // Makes the choices area in the HTML empty

    // Now to populate the options, we will create button elements, loop through the questionOptions array and put each element to fill in the text content of each of the button elements, and then append them to the div with the #choices id

    for (let i = 0; i < questionOptions.length; i++) {

        var questionOption = document.createElement("button"); // Each multiple choice option is basically a button
        questionOption.textContent = questionOptions[i]; // We set the text content of each option button to the element in the array

        questionOption.setAttribute("data-index", i); // Assign the index value as the data-index attribute, to be able to identify each button later. I can then use it to compare with the answer, perhaps?

        // Next, add click event listeners to the individual buttons

        questionOption.addEventListener("click", function(event) {

            var element = event.target;
            
            var index;
            
            if (element.matches("button")) {

                index = element.getAttribute("data-index"); 

                if (index == questionAnswerIndex) { // Compare the option's data index with the answer index
                    
                    audioCorrect.play();// Sound
                    feedbackEl.setAttribute("class", "visible feedback");// Populate feedback HTML and make visible
                    feedbackEl.textContent = "Correct";

                    setTimeout(function() { // To make the "Correct" feedback disappear after half a second
                        feedbackEl.setAttribute("class", "hidden");
                        feedbackEl.innerHTML = "";
                    }, 500);
                    

                } else {
                    
                    audioWrong.play(); // Sound

                    if(timeRemaining > 10) {
                        timeRemaining -= 10;// Deduct 10 secs from the time
                    } else {
                        timeRemaining = 1; // Accounts for the timeRemaining-- condition to zero time out when time is up
                    }
                    
                    feedbackEl.setAttribute("class", "visible feedback");// Populate feedback HTML and make visible
                    feedbackEl.textContent = "Wrong";

                    setTimeout(function() { // To make the "Wrong" feedback disappear after half a second
                        feedbackEl.setAttribute("class", "hidden");
                        feedbackEl.innerHTML = "";
                    }, 500);
                }

            }

            // If there are questions left, then the click should move to populate the next question and options. Otherwise, move to the end screen

            if(questionsRemaining > 0) {

                fillInQuestionsAndOptions();
        
            } else {
        
                fromQuestionToEndScreen();
            }
        })

        // Now append the created option button element to the options container element

        questionChoiceContainerEl.appendChild(questionOption);
        
    }

    quizQuestionIndex++
    questionsRemaining--
}    


/*Start the Quiz By Clicking the "Start Quiz" Button
=====================================================*/

// Add an event listener to the "Starr Quiz" button, which will call functions to start the quiz, start the timer, and populate the questions and options.

startButtonEl.addEventListener("click", function() { // FINE
    setTimer(); // FINE
    fromStartToQuestions(); // FINE
    fillInQuestionsAndOptions(); // FINE
})


/*Submitting and Registering User Scores
=========================================*/

// Add event listener to the "Submit" button on the end screen, to save scores and initials to local storage

submitButtonEl.addEventListener("click", function(event) {

    event.preventDefault();
    
    // We start by getting any existing saved scores from local storage, if there are any, and capturing them in a variable. Bear in mind that this will be in string form

    var localScores = localStorage.getItem("scores");

    // We also define a variable, which will refer to an array that will contain score items in object form, and where we can add new score items
        
    var parsedLocalScores;

    // If no score items exist (either if "Submit" is clicked for the first time, or after local storage has been cleared), we want to set this variable to an empty array

    if (!localScores) {

        parsedLocalScores = [];

    } else {
            
        parsedLocalScores = JSON.parse(localScores); // We get scores from local storage and convert them from string form to object form, and stick them in our array
    }

    // Whenever a user plays the quiz game to the end, they will be prompted for their initials alongside their final score, both of which we can reference

    var initials = document.querySelector("#initials").value; // Reference the user's initials input
    var score = document.querySelector("#final-score").textContent; // Reference the user's final score
    
    // Create an object and put this new high score information into it

    var newHighScore = {
        initials: initials,
        score: score
    }

    // Now, we push this new object into our parsedLocalScores array that contains score items in object form

    parsedLocalScores.push(newHighScore); 

    // Finally, we convert the entire array, now containing all scores information, into string form and set it into local storage

    localStorage.setItem("scores", JSON.stringify(parsedLocalScores));

    // Clicking the button should also take us to the page showing the high scores leaderboard
    
    window.location.href = "highscores.html";

});




