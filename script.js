const x = require('./script2');
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#fruitNutrition");

const fruitFrom = document.querySelector("#inputSection form");
fruitFrom.addEventListener("submit", extractFruit);

function extractFruit(e){
    e.preventDefault();
    fetchFruitData(e.target.fruitInput.value);
    e.target.fruitInput.value = "";
}
 let cal = 0;
function addFruit(fruit){
    const li = document.createElement("li");
    li.textContent = fruit;
    li.addEventListener("click", () => li.remove()); // Add click event listener to delete the item when clicked
    fruitList.appendChild(li);

    cal += fruit.nutrition.calories;
    fruitNutrition.textContent = cal;
}

function fetchFruitData(fruit) {
    fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`) //returns a promise
        .then((resp) => resp.json()) //converts response to JSON
        .then(data => addFruit(data)) 
        .catch((e) => console.log(e));
}
