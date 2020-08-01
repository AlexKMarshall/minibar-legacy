import React, { useState } from "react";
import { useQuery } from "react-query";

import Layout from "./../components/Layout";

import { getIngredients } from "./../utils/api-client";

export default function Ingredients() {
  const { isLoading, error, data: ingredients } = useQuery(
    "ingredients",
    getIngredients
  );

  const [type, setType] = useState("alcohol");

  function predicate(ingredient) {
    if (type === "alcohol") {
      return ingredient.alcohol === true;
    } else if (type === "non-alcohol") {
      return ingredient.alcohol === false;
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
        <button onClick={() => setType("alcohol")}>Alchol</button>
        <button onClick={() => setType("non-alcohol")}>Non-Alcohol</button>
      </div>
      <ul className="space-y-3">
        {ingredients.filter(predicate).map((ingredient) => (
          <li key={ingredient._id}>{ingredient.name}</li>
        ))}
      </ul>
    </Layout>
  );
}
