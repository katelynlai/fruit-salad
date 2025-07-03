const x = require('./script2');

console.log(x);

const fruitFrom = document.querySelector("#inputSection form");
console.log(fruitFrom);
fruitFrom.addEventListener("submit", extractFruit);

function extractFruit(e){
    e.preventDefault();
    const fruitInput = document.querySelector("#fruitinput");
    console.log(fruitInput.value);
}