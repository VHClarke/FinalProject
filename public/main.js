//codepen =================================================
var maxItems = 20;
var initItemAmount = 10; //this is the intial amount of input rows created in the HTML
var buttonAmount = 1;
var nonInputRows = 2; //The thead row and the bottom 2, button rows
var calColumn = 2;
var yellow = "#ffff00";
var white = "#ffffff";



/*
* totalCalories function adds all valid calories in the column of calories by
* modding the index by the calColumn to see if the index is the correct
* input field. Those calorie fields are then added together and displayed
* at the bottom of the table.
*/
function totalCalories(e) {
  console.log(e)
  e.preventDefault();
  var total = 0;
  var totalCalories = document.getElementById("totalCalories");
  var amountOfInputFields = document.getElementsByTagName("input").length - buttonAmount; //ignores the 3 buttons

  for (var index = 0; index < amountOfInputFields; index++) {
    if ((index % calColumn) == 1) {
      var calInput = document.getElementsByTagName("input")[index];
      var calNum = Number(calInput.value);
      total += calNum;
    }
  }
  totalCalories.value = total;
}


/*
* isValid function checks if the input value is valid. This checks for too many
* decimals, plus symbols, blanks, fractions, and if the value between the max and min.
*/
function isValid(input) {
  var minCalories = 0;
  var maxCalories = 100000;

  if ((Number(input.value) > minCalories) && ((Number(input.value) < maxCalories)) && !isNaN(input.value) && (Number(input.value) % 1 == 0))
  return true;
  else {
    input.value = "";
    input.style.backgroundColor = yellow;
  }
  return false;
}


/*
* addRow function adds a row with the corresponding number and input cells.
* This also hides the "Add Another" button when the table adds the 20th row.
*/
function addRow() {
  var table = document.getElementById("calTable");
  var lastIndex = document.getElementsByTagName("tr").length - 1;

  if (lastIndex <= maxItems) {
    var row = table.insertRow(lastIndex);
    var numCell = row.insertCell(0);
    var foodCell = row.insertCell(1);
    var calCell = row.insertCell(2);
    var textElement = document.createElement("input");
    var numElement = document.createElement("input");
    textElement.type = "text";
    numElement.type = "number";
    row.className = "active";
    numCell.innerHTML = lastIndex + ".";
    foodCell.appendChild(textElement);
    calCell.appendChild(numElement);
  }
  if (lastIndex == maxItems)
  document.getElementById("Add").style.visibility = "hidden";
}

/*
* reset function sets the table back to its blank initial state of 10 rows and
* adds back the "Add Another" button. It also clears any yellowed input fields.
*/
function reset() {
  var amountOfInputFields = document.getElementsByTagName("input").length - buttonAmount; //ignores the 3 buttons
  var table = document.getElementById("calTable");
  var lastIndex = document.getElementsByTagName("tr").length - nonInputRows;

  for (var index = 0; index < amountOfInputFields; index++) {
    var inputField = document.getElementsByTagName("input")[index];
    inputField.value = "";
    inputField.style.backgroundColor = "#ffffff";
  }
  while (lastIndex > initItemAmount) {
    table.deleteRow(lastIndex);
    lastIndex = document.getElementsByTagName("tr").length - nonInputRows;
  }
  document.getElementById("totalCalories").innerHTML = 0;
  document.getElementById("Add").style.visibility = "visible";
}

function submitIngredients(e) {
  e.preventDefault()
  let submittedList = [];
  let ingredientsList = document.getElementsByClassName('active');

  Array.from(ingredientsList).forEach(ingredient => {
    // const calories = ingredient.childNodes[5].childNodes[1].value;
    const ingredientValue = ingredient.getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    const calories = ingredient.getElementsByTagName('td')[2].getElementsByTagName('input')[0].value;

    submittedList.push({ingredient: ingredientValue, calories: calories})
  })
  console.log(submittedList)

  fetch('/userInput', {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({submittedList})
  })
  .then(function(response) {
    return response.json();
  })
  .then(function() {
    console.log('derp');
  });
}
