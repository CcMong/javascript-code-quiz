
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

