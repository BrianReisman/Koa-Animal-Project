const image = document.getElementById("randomDogImg");
const quote = document.querySelector(".quote");
const input = document.querySelector(".form-control");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {  
  e.preventDefault();
  
  fetch("https://catfact.ninja/fact")
  .then((res) => res.json())
  .then((res) => {
    // console.log(res.fact);
    quote.textContent = res.fact

  })
  .catch((err) => console.log(err));
  
  fetch(`https://dog.ceo/api/breed/${input.value}/images/random`)
  .then((res) => res.json())
  .then((res) => {
    // console.log(res.message);
    image.setAttribute('src', res.message)
  })
  .catch((err) => console.log(err));
  
});
