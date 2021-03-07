const image = document.getElementById("randomDogImg");
const quote = document.querySelector(".quote");
const input = document.querySelector(".form-control");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("http://localhost:3011/dogPix")
    .then((res) => res.json())
    .then((res) => image.setAttribute("src", res.message))
    .catch((err) => console.log(err));
  fetch("http://localhost:3011/catFact")
    .then((res) => res.json())
    .then((res) => (quote.textContent = res.fact))
    .catch((err) => console.log(err));
});