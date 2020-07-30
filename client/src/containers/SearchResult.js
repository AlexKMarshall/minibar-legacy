import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import { searchDrinks } from "../utils/api-client";

import SearchControl from "../components/SearchControl";

function useSearchDrinksByIngredient() {
  const [drinks, setDrinks] = useState([]);
  const { search } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(search);
    const term = query.get("ingredient");
    setSearchTerm(term);
    searchDrinks(term).then((results) => setDrinks(results));
  }, [search]);

  return {
    drinks,
    searchTerm,
  };
}

export default function Discover() {
  const { drinks, searchTerm } = useSearchDrinksByIngredient();
  const history = useHistory();

  function onSearchSubmit(searchTerm) {
    history.push(`/search?ingredient=${searchTerm}`);
  }

  if (!drinks.length) return "Loading...";

  return (
    <main className="min-h-screen p-6 pt-10 bg-gray-300">
      <div className="flex justify-between mb-6">
        <img
          src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.5&w=144&q=80"
          alt=""
          className="w-12 h-12 rounded-full"
        />
        <SearchControl onSearchSubmit={onSearchSubmit} />
      </div>
      <h2 className="mb-4 text-2xl font-bold">
        Search results for {searchTerm}
      </h2>
      <ul className="space-y-3">
        {drinks.map((drink) => (
          <li key={drink._id} className="flex">
            <div className="w-1/6">
              <div className="relative overflow-hidden rounded pb-5/4">
                <img
                  src={drink.image}
                  alt=""
                  className="absolute object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="px-3 py-2">
              <Link to={`/recipe/${drink._id}`}>
                <h3 className="font-semibold">{drink.name}</h3>
              </Link>
              <p className="text-xs">
                {drink.ingredients.map(({ name }) => name).join(", ")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
