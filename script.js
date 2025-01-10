// DOM-elementer
const breedsList = document.getElementById("breedsList");
const viewImagesBtnContainer = document.getElementById(
  "viewImagesBtnContainer"
);
const randomBreedDiv = document.getElementById("randomBreed");
const randomBreedBtn = document.getElementById("randomBreedBtn");

// Hent hunderacer fra API og udfyld dropdown
async function populateBreedsDropdown() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const breeds = Object.keys(data.message);

    // Fyld dropdown-menuen
    breeds.forEach((breed) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<a class="dropdown-item" href="#" data-breed="${breed}">${
        breed.charAt(0).toUpperCase() + breed.slice(1)
      }</a>`;
      breedsList.appendChild(listItem);
    });

    // Tilføj eventlistener til hver menuitem
    breedsList.addEventListener("click", (event) => {
      const breed = event.target.getAttribute("data-breed");
      if (breed) {
        createViewImagesButton(breed);
      }
    });
  } catch (error) {
    console.error("Fejl ved hentning af hunderacer:", error);
  }
}

// Opret knap til at se billeder af valgt race
function createViewImagesButton(breed) {
  viewImagesBtnContainer.innerHTML = `
    <button class="btn btn-success" onclick="redirectToGallery('${breed}')">
      Se billeder af ${breed.charAt(0).toUpperCase() + breed.slice(1)}
    </button>
  `;
}

// Omdirigertil galleri-siden med valgt race
function redirectToGallery(breed) {
  window.location.href = `gallery.html?breed=${breed}`;
}

// Hent random hunderace
async function fetchRandomBreed() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();

    // Vis billedet
    randomBreedDiv.innerHTML = `
      <img src="${data.message}" alt="Random Dog" class="img-fluid shadow-sm rounded">
    `;
  } catch (error) {
    console.error("Fejl ved hentning af random hund:", error);
  }
}

// Event listeners
randomBreedBtn.addEventListener("click", fetchRandomBreed);

// Start ved at hente hunderacer
populateBreedsDropdown();
