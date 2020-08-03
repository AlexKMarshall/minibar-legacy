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

export function getRandomDrinks() {
  return fetch(`${API_URL}/drinks/random`)
    .then((res) => res.json())
    .then((data) => data.drinks);
}

export function searchDrinks(_key, searchTerm) {
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

export function getIngredients() {
  return fetch(`${API_URL}/ingredients`)
    .then((res) => res.json())
    .then((data) =>
      data.ingredients.sort((a, b) => {
        return a.name < b.name ? -1 : 1;
      })
    );
}

export function updateSavedIngredient({ id, action }) {
  return fetch(`${API_URL}/ingredients/${id}/${action}_saved`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => data.ingredient);
}
