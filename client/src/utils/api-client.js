const API_URL = "http://localhost:3001/api";

export function getDrinks() {
  return fetch(`${API_URL}/drinks`)
    .then((res) => res.json())
    .then((data) => data.drinks);
}

export function getFavoriteDrinks() {
  return fetch(`${API_URL}/drinks/favorites`)
    .then((res) => res.json())
    .then((data) => data.drinks);
}

export function searchDrinks(searchTerm) {
  return fetch(`${API_URL}/drinks?q=${searchTerm}`)
    .then((res) => res.json())
    .then((data) => data.drinks);
}

export function getSingleDrink(_key, drinkId) {
  return fetch(`${API_URL}/drinks/${drinkId}`)
    .then((res) => res.json())
    .then((data) => data.drink);
}

export function updateFav({ id, action }) {
  return fetch(`${API_URL}/drinks/${id}/${action}_fav`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => data.drink);
}

export function addToFav(drinkId) {
  return fetch(`${API_URL}/drinks/${drinkId}/add_fav`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => data.drink);
}

export function removeFromFav(drinkId) {
  return fetch(`${API_URL}/drinks/${drinkId}/remove_fav`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => data.drink);
}
