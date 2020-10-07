import React from "react";
import { useQuery, useMutation, queryCache } from "react-query";
import { Route, useParams, useRouteMatch, NavLink } from "react-router-dom";
import {
  useGetIngredients,
  useUpdateSavedIngredient,
} from "../hooks/ingredients";

import {
  getIngredients,
  updateSavedIngredient,
} from "./../utils/ingredients-client";

export default function Ingredients() {
  const { path, url } = useRouteMatch();

  return (
    <>
      <h2 className="mb-4 text-2xl font-display">Ingredients</h2>
      <div className="grid grid-cols-3 my-4 bg-gray-200 divide-x divide-gray-400 rounded-lg">
        <NavLink
          to={`${url}/alcohol`}
          className="py-2 text-xs font-semibold text-center text-gray-600"
          activeClassName="text-gray-800"
        >
          Alcohol
        </NavLink>
        <NavLink
          to={`${url}/non-alcohol`}
          className="py-2 text-xs font-semibold text-center text-gray-600"
          activeClassName="text-gray-800"
        >
          Non-Alcohol
        </NavLink>
        <NavLink
          to={`${url}/saved`}
          className="py-2 text-xs font-semibold text-center text-gray-600"
          activeClassName="text-gray-800"
        >
          Saved
        </NavLink>
      </div>
      <Route path={`${path}/:type`}>
        <IngredientsList />
      </Route>
    </>
  );
}

function IngredientsList() {
  const { type } = useParams();

  const { isLoading, error, data: ingredients } = useGetIngredients();

  const [mutate] = useUpdateSavedIngredient();

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
  );
}
