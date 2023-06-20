
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_Bi8AwkzapbIJZnIUXOmKdyDpKgv5O3rYtpQzlFDTYmtAgrynwGRmcCeZdUWzL2d1';
const SEARCH = '/images/search';



export const fetchBreeds = () => {
    return fetch(`${BASE_URL}/breeds`, {
        headers: {
            'x-api-key': API_KEY,
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });

}

export const fetchCatByBreed = breedId => {
    return fetch(`${BASE_URL}${SEARCH}?breed_id=${breedId}`, {
        headers: {
            'x-api-key': API_KEY
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
        .then(data => {
            if (data.length > 0) {
                const cat = data[0];
                return {
                    name: cat.breeds[0].name,
                    description: cat.breeds[0].description,
                    temperament: cat.breeds[0].temperament,
                    image: cat.url,
                };
            }
            throw new Error('Oops! Something went wrong! Try reloading the page!');
        });
};