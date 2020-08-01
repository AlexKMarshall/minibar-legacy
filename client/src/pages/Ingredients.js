import React from "react";
import { useQuery } from "react-query";

import Layout from "./../components/Layout";

import { getIngredients } from "./../utils/api-client";

export default function Ingredients() {
  const { isLoading, error, data: ingredients } = useQuery(
    "ingredients",
    getIngredients
  );

  if (isLoading) return "Loading...";
  if (error) return "An error ocurred " + error;

  return (
    <Layout>
      <h2 className="mb-4 text-2xl font-display">Ingredients</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>{ingredient.name}</li>
        ))}
      </ul>
    </Layout>
  );
}
