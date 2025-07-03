const x = require('./script2');
const fruitList = document.querySelector("#fruitSection ul");
console.log(x);

const fruitFrom = document.querySelector("#inputSection form");
console.log(fruitFrom);
fruitFrom.addEventListener("submit", extractFruit);

function extractFruit(e){
    e.preventDefault();
    addFruit(e.target.fruitInput.value);
    e.target.fruitInput.value = "";
}

function addFruit(fruit){
    const li = document.createElement("li");
    li.textContent = fruit;
    if (fruit.trim() === "") {
        return;
    } else {
        // Add click event listener to delete the item when clicked
        li.addEventListener("click", () => li.remove());
        fruitList.appendChild(li);
    }
}

function fetchFruitData(fruit) {
    fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`) //returns a promise
        .then((resp) => resp.json()) //converts response to JSON
        .then(data => addFruit(data)) 
        .catch((e) => console.log(e));
}
