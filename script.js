const url = "https://cors-anywhere.herokuapp.com/http://jservice.io/api/";
var searchTerm, difficulty = "", startDate, endDate;
var diffQuery, minDateQuery, maxDateQuery, queryString;

function initValues() {
    searchTerm = document.getElementById("search-bar").value;
    difficulty = document.getElementById("difficulty-input").value; // integer ?
    startDate = document.getElementById("start-date").value;
    endDate = document.getElementById("end-date").value;

    console.log(searchTerm);
    console.log(difficulty);
    console.log(startDate);
    console.log(endDate);
    
    if (difficulty != "") {
        diffQuery = "value=" + difficulty;
    } else {
        diffQuery = "";
    }

    if (startDate != "" && endDate != "") {
        minDateQuery = "&min_date=" + startDate;
        maxDateQuery = "&max_date=" + endDate;
    }
    console.log(diffQuery);
    queryString = "clues?" + diffQuery + minDateQuery + maxDateQuery;
    console.log(queryString);
}

// Filter clues when button is clicked
const submitBtn = document.getElementById("submit");
const goRandom = document.getElementById("getRandom");
var filteredArray;

submitBtn.addEventListener('click', function() {
    var qs = initValues();
    fetch(url + queryString).then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
            }
            // Examine the text in the response
            response.json().then(function(data) {
                // do stuff with JSON data
                console.log(data[0].question);
                filteredArray = data.filter(function (e) {
                    return e.value == difficulty;
                });
                console.log(filteredArray);
            });
        }
    ).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
});
 
goRandom.addEventListener('click', function() {
    fetch(url + "/random").then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
            }
            // Examine the text in the response
            response.json().then(function(data) {
                // do stuff with JSON data
                console.log(data[0].question);
            });
        }
    ).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
});
