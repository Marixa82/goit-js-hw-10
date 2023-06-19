import SlimSelect from 'slim-select'
new SlimSelect({
    select: '#selectElement',
    settings: {
        openPosition: 'auto',
    },
});
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('p.loader');
const catInfoContainer = document.querySelector('div.cat-info');
const error = document.querySelector('.error');


loader.style.display = 'block'
error.style.display = 'none'
breedSelect.style.cursor = 'pointer'

function makeCatsOption(data) {
    for (let i = 0; i < data.length; i++) {
        const breed = data[i];
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = `${breed.name}`;
        breedSelect.appendChild(option);
    }
}
fetchBreeds()
    .then(data => {
        loader.style.display = 'none'
        makeCatsOption(data);
    }).catch(error => {
        Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!")
        console.log(error)
    });
function createCatInfo(data) {
    const cat = data[0];
    const catInfo = `
    <img src="${cat.url}" alt="Cat Image" width="300">
    <h2>${cat.breeds[0].name}</h2>
    <p>${cat.breeds[0].description}</p>
    <p>Temperament: ${cat.breeds[0].temperament}</p>`;
    catInfoContainer.innerHTML = catInfo;
}
breedSelect.addEventListener('change', () => {
    loader.style.display = 'block'
    error.style.display = 'none'

    breedSelect.style.cursor = 'pointer'
    const breedId = breedSelect.value;

    fetchCatByBreed(breedId)
        .then(data => {
            loader.style.display = 'none'
            catInfoContainer.style.display = 'block'
            createCatInfo(data);
        })
        .catch(error => { Notiflix.Notify.failure(error, "Oops! Something went wrong! Try reloading the page!") })
        .finally(() => {
            breedSelect.style.display = 'block';
        })
})

















