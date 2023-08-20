// This script fetches & displays Chuck Norris jokes from the API !!

// Clear the console !!
console.clear();

// Get DOM elements by their IDs !!
const displayJoke = document.getElementById("display-joke");
const category = document.getElementById("category");
const btn = document.getElementById("btn"); 
const likeButton = document.getElementById('likeButton');
const likeCount = document.getElementById('likeCount');
let likes = 0;

// Event listener for the "Like" button !!
likeButton.addEventListener('click', () => {
  likes++;
  likeCount.textContent = likes;
});

// Set the initial joke category !!
let chosenCategory = `dev`;

// Event listener for the category dropdown menu !!
category.addEventListener("change", () => {
  chosenCategory = category.value;
  fetchJoke(); 
});

// Function to generate options for the category dropdown menu !!
async function generateCategoryOptions() {
  let outPut = ``;

  try {
      // Fetch joke categories from the API !!
      const results = await fetch(`https://api.chucknorris.io/jokes/categories`);

      if (!results.ok) {
      throw new Error("Request failed.");
      }

      const data = await results.json();

      // Enable the category dropdown !!
      category.removeAttribute("disabled");

      // Generate options for the dropdown !!
      data.forEach((category) => {
        outPut += `<option value="${category}">${category}</option>`;
      });

      // Populate the dropdown with options and set the selected category !!
      category.innerHTML = outPut;
      category.value = chosenCategory; 
      } catch (error) {
      console.error(error);
    }
}

// Call the function to generate category options !!
generateCategoryOptions();

// Function to fetch a random Chuck Norris joke and display it !!
async function fetchJoke() {
  const errorMessage = `Chuck Norris is hosting guests in his studio and requests that no one disturbs him.`;

  try {
      // Fetch a random joke from the selected category !!
      const results = await fetch(`https://api.chucknorris.io/jokes/random?category=${chosenCategory}`);

      if (!results.ok) {
      displayJoke.textContent = errorMessage;
      throw new Error("Request failed.");
      }

      const data = await results.json();
      displayJoke.textContent = data.value;
      console.log(data.value);
      } catch (error) {
      displayJoke.textContent = errorMessage;
      console.error(error);
    }
}

// Function to change the background color of the document !!
function changeColor() {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}

/// Function to generate a random number between 0 and `number` !!
function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

// Call the fetchJoke function initially to display a joke !!
fetchJoke();




