
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

