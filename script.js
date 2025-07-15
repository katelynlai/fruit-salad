const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");
const createForm = document.querySelector("#create-form");
let cal = 0;
const fruitCal = {};
const apiKey = "50435851-73f213f32ab40e115e4c505e2";
fruitForm.addEventListener("submit", extractFruit);
createForm.addEventListener("submit", createNewFruit);
function extractFruit(e) {
    e.preventDefault();
    fetchFruitData(e.target.fruitInput.value);
    e.target.fruitInput.value = "";
}
async function fetchFruitData(fruit) {
    let messageStatus = document.querySelector("#message");
    
    try {
        console.log(`Searching for: "${fruit}"`);
        //Make sure to replace this link with your deployed API URL in this fetch
        const respData = await fetch(`https://fruit-salad-backend-9qu3.onrender.com/fruits/${fruit}`);
        
        if (!respData.ok) {
            if (respData.status === 404) {
                messageStatus.textContent = `"${fruit}" not found in database. You can create it using the form below.`;
                setTimeout(() => {
                    messageStatus.textContent = "";
                }, 5000);
                console.log(`404 error: "${fruit}" not found`);
                return;
            } else {
                throw `Fruit API error: ${respData.status}`;
            }
        }
        
        const respImg = await fetch(
            `https://pixabay.com/api/?q=${fruit}+fruit&key=${apiKey}`
        );
        
        const data = await respData.json();
        console.log(`Found fruit data:`, data);
        
        if (respImg.ok) {
            const imgData = await respImg.json();
            if (imgData.hits && imgData.hits.length > 0) {
                addFruit(data, imgData);
            } else {
                // Use placeholder if no image found
                const defaultImg = {
                    hits: [{ previewURL: "https://via.placeholder.com/150x150/90EE90/000000?text=🍎" }]
                };
                addFruit(data, defaultImg);
                messageStatus.textContent = `Added "${fruit}" with default image.`;
                setTimeout(() => { messageStatus.textContent = ""; }, 3000);
            }
        } else {
            // Use placeholder if image API fails
            const defaultImg = {
                hits: [{ previewURL: "https://via.placeholder.com/150x150/90EE90/000000?text=🍎" }]
            };
            addFruit(data, defaultImg);
            messageStatus.textContent = `Added "${fruit}" (image unavailable).`;
            setTimeout(() => { messageStatus.textContent = ""; }, 3000);
        }
        
    } catch (e) {
        console.error('Error:', e);
        messageStatus.textContent = `Error loading "${fruit}". Check console for details.`;
        setTimeout(() => {
            messageStatus.textContent = "";
        }, 4000);
    }
}
async function createNewFruit(e) {
    e.preventDefault();
    const data = {
        name: e.target.fruitInput.value,
        nutritions: {
            calories: parseInt(e.target.caloriesInput.value)
        }
    };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    //Make sure to add your deployed API URL in this fetch
    const response = await fetch(`https://fruit-salad-backend-9qu3.onrender.com/fruits`, options);
    let messageStatus = document.querySelector("#message")
    if(response.status === 201) {
        e.target.fruitInput.value = ''
        e.target.caloriesInput.value = ''
        messageStatus.textContent = "Fruit successfully created."
        setTimeout(() => {
          messageStatus.textContent = ""
        }, 4000)
    } else {
        e.target.fruitInput.value = ''
        e.target.caloriesInput.value = ''
        messageStatus.textContent = "This fruit already exists. Please enter another fruit!"
        setTimeout(() => {
          messageStatus.textContent = ""
        }, 4000)
    }
}
function addFruit(fruit, fruitImg) {
    const img = document.createElement("img");
    img.classList.add('fruits');
    img.alt = fruit.name;
    img.src = fruitImg.hits[0].previewURL;
    img.addEventListener("click", removeFruit, { once: true });
    fruitList.appendChild(img);
    fruitCal[fruit.name] = fruit.nutritions.calories;
    cal += fruit.nutritions.calories;
    fruitNutrition.textContent = "Total Calories: " + cal;
}
function removeFruit(e) {
    const fruitName = e.target.alt;
    cal -= fruitCal[fruitName];
    fruitNutrition.textContent = "Total Calories: " + cal;
    delete fruitCal[fruitName];
    e.target.remove();
}