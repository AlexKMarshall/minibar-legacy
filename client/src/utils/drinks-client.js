import { client } from "./api-client";

export function getDrinks() {
  return client(`drinks`).then((data) => data.drinks);
}

export function getFavoriteDrinks() {
  return client(`drinks/favorites`).then((data) => data.drinks);
}

export function getRandomDrinks() {
  return client(`drinks/random`).then((data) => data.drinks);
}

export function searchDrinks(_key, searchTerm) {
  return client(`drinks?q=${encodeURIComponent(searchTerm)}`).then(
    (data) => data.drinks
  );
}

export function getSingleDrink(_key, drinkId) {
  return client(`drinks/${drinkId}`).then((data) => data.drink);
}

export function updateFav({ id, action }) {
  return client(`drinks/${id}/${action}_fav`, { method: "POST" }).then(
    (data) => data.drink
  );
}
