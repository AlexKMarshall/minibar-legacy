import { client } from "./api-client";

export function getIngredients() {
  return client(`ingredients`).then((data) => data.ingredients);
}

export function updateSavedIngredient({ id, action }) {
  return client(`ingredients/${id}/${action}_saved`, { method: "POST" }).then(
    (data) => data.ingredients
  );
}
