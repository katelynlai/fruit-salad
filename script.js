const x = require('./script2');
const fruitList = document.querySelector("#FruitSection ul");
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
    fruitList.appendChild(li);
}
