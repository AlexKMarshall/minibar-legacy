import React, { useState } from "react";
import { useQuery, useMutation, queryCache } from "react-query";

import Layout from "./../components/Layout";

import {
  getIngredients,
  updateSavedIngredient,
} from "./../utils/ingredients-client";

export default function Ingredients() {
  const { isLoading, error, data: ingredients } = useQuery(
    "ingredients",
    getIngredients
  );

  const [mutate] = useMutation(updateSavedIngredient, {
    onSuccess: () => {
      queryCache.invalidateQueries("ingredients");
    },
  });

  const [type, setType] = useState("alcohol");

  async function toggleSaved({ _id: id, isSaved }) {
    const action = isSaved ? "remove" : "add";
    try {
      await mutate({ id, action });
    } catch (e) {
      console.log("something went wrong ", e);
    }
  }

  function predicate(ingredient) {
    if (type === "alcohol") {
      return ingredient.alcohol === true;
    } else if (type === "non-alcohol") {
      return ingredient.alcohol === false;
    } else if (type === "saved") {
      return ingredient.isSaved === true;
    } else {
      return true;
    }
  }

  if (isLoading) return "Loading...";
  if (error) return "An error ocurred " + error;

  return (
    <Layout>
      <h2 className="mb-4 text-2xl font-display">Ingredients</h2>
      <div className="flex justify-around mb-4">
        <button onClick={() => setType("alcohol")}>Alcohol</button>
        <button onClick={() => setType("non-alcohol")}>Non-Alcohol</button>
        <button onClick={() => setType("saved")}>Saved</button>
      </div>
      <ul className="space-y-3">
        {ingredients.filter(predicate).map((ingredient) => (
          <li key={ingredient._id} className="flex justify-between">
            {ingredient.name}
            <button onClick={() => toggleSaved(ingredient)}>
              {ingredient.isSaved ? "-" : "+"}
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
