
var clearButtonEl = document.querySelector("#clear");

// Function to sort a list element, accessed by its ID, in descending order by using its data-index

function sortList(listId) { 

    var orderedList = document.getElementById(listId);
  
    var indexes = document.querySelectorAll("[data-index]");
  
    var arrayOfIndexes = Array.from(indexes);
  
    var sortedArray = arrayOfIndexes.sort(function(a, b) {
        if (a.dataset.index < b.dataset.index)
        return 1;
        if (a.dataset.index > b.dataset.index)
        return -1;
        return 0;
    });

    sortedArray.forEach(li => orderedList.appendChild(li));
}

/*Populate the High Score Leaderboard with User Scores
=======================================================*/

var highScoresList = document.querySelector("#highscores"); // Reference the ordered list to contain the high scores

// First get all scores from local storage and convert them to array/object form

var highScores = JSON.parse(localStorage.getItem("scores")); 

// Then loop through the array of objects. For each array element, ie. a score object:

highScores.forEach((score) => {

    // Create a <li> element

    var listItem = document.createElement("li");

    // Print in the initials and score information

    listItem.textContent = `${score.initials}: ${score.score}`;

    // Set an attribute, data index, which will be equal to the score

    listItem.setAttribute("data-index", score.score); 

    // And then append the populated <li> element to the ordered list that will contain the high scores

    highScoresList.appendChild(listItem);
    
})

// Now call the function to sort the scores in descending order, after the most recent scores are logged

sortList("highscores");

// To only show 10 scores on the highscore board, I have decided to use CSS to make sure only the top 10 list items are displayed


/*Clear the High Score Leaderboard Page
========================================*/

// Add a click Event Listener for the "Clear High Scores" button

clearButtonEl.addEventListener("click", function() {

    localStorage.clear(); // This will clear local storage

    highScoresList.innerHTML = ""; // This clears the content within the ordered list HTML
    
});


