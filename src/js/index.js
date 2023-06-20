import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('p.loader');
const catInfoContainer = document.querySelector('div.cat-info');
const error = document.querySelector('.error');

breedSelect.style.display = 'none';
loader.style.display = 'none';
error.style.display = 'none';
breedSelect.style.cursor = 'pointer';

function makeCatsOption(breeds) {
    breedSelect.innerHTML = '';
    breeds.forEach(breed => {
        let option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
    });
}
fetchBreeds()
    .then(breeds => {
        breedSelect.style.display = 'block';
        loader.style.display = 'none'
        makeCatsOption(breeds);
    }).catch(error => {
        loader.style.display = 'none';
        Notiflix.Notify.failure(
            'Oops! Something went wrong! Try reloading the page!'
        );
        console.log(error);
    });
function createCatInfo(cat) {
    const catInfo = `<img src="${cat.image}" width="600" alt="${cat.name}"><h2>${cat.name}</h2><p>${cat.description}</p><p>Temperament: ${cat.temperament}</p>`;
    catInfoContainer.innerHTML = catInfo;

}
breedSelect.addEventListener('change', (evt) => {
    loader.style.display = 'block'
    error.style.display = 'none'
    breedSelect.style.display = 'none';
    catInfoContainer.style.display = 'none';
    const breedId = evt.target.value;

    fetchCatByBreed(breedId).then(cat => {
        createCatInfo(cat)
        breedSelect.style.display = 'block';
        loader.style.display = 'none';
        catInfoContainer.style.display = 'block';
    }).catch(error => {
        loader.style.display = 'none';
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        breedSelect.style.display = 'block';
        console.log(error);
    })
});



















