const API_URL = "http://localhost:3001/api";

export function getDrinks() {
  return fetch(`${API_URL}/drinks`)
    .then((res) => res.json())
    .then((data) => data.drinks);
}

export function getSingleDrink(id) {
  return fetch(`${API_URL}/drinks/${id}`)
    .then((res) => res.json())
    .then((data) => data.drink);
}
