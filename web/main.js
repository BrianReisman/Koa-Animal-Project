// Grab all DOM elements that will be needed
const image = document.getElementById("randomDogImg");
const quote = document.querySelector(".quote");
const input = document.querySelector(".form-control");
const form = document.querySelector("form");
const loadingDog = document.querySelector(".loadingDog");
const loadingCat = document.querySelector(".loadingCat");

//Add an event listener on the form for when it is submitted. ie. button click and when it is clicked...
form.addEventListener("submit", (e) => {
  //...first prevent the default which is to refresh the page
  e.preventDefault();

  loadingDog.textContent = "Dog incoming!";
  loadingCat.textContent = "loading cat quote...";
  
  //...then capture the input element's value for use in our fetch below
  const inputValue = input.value;
  
  //...make a fetch request to our localhost endpoint with the query breed and its value set to that which is assigned to our inputValue.
  fetch(`http://localhost:3011/dogPix?breed=${inputValue}`)
  //upon response convert the response out of JSON
  .then((res) => res.json())
  //Then take the res.message (which contains the img URL and set the image element's src attribute to that URL, res.message)
  .then((res) => {
    image.setAttribute("src", res.message);
    loadingDog.textContent = "";
  })
  //send to the console any errors
  .catch((err) => {
    console.log(err);
    loadingDog.textContent = "Uh oh! Something went wrong";
  });
  //no string interpolation needed for the catFact request since it's endpoint is static.
  fetch("http://localhost:3011/catFact")
  //like above conver the response to JSON
  .then((res) => res.json())
  //similar to above, our DOM element we are calling quote in this file, gets its .textContent set to the payload of the request which is on res.fact
  .then((res) => {
    loadingCat.textContent = "";
    quote.textContent = res.fact;
  })
  //send to the console any errors
  .catch((err) => {
      loadingCat.textContent = "Uh oh! Something went wrong";
      console.log(err)
    });
});

console.log(isFetchingDog);
console.log(isFetchingCat);
