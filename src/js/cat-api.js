
const BASE_URL = "https://api.thecatapi.com/v1";
const ENDPOINT = "/breeds";
const API_KEY = "live_Bi8AwkzapbIJZnIUXOmKdyDpKgv5O3rYtpQzlFDTYmtAgrynwGRmcCeZdUWzL2d1";
const SEARCH = "/images/search";


export function fetchBreeds() {

    return fetch(`${BASE_URL}${ENDPOINT}`, { headers: { 'x-api-key': API_KEY } })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });

}

export function fetchCatByBreed(breedId) {

    return fetch(`${BASE_URL}${SEARCH}?breed_ids=${breedId}`, { headers: { 'x-api-key': API_KEY } }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

