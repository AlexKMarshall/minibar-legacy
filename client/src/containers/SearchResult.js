import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { searchDrinks } from "../utils/api-client";

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

  if (!drinks.length) return "Loading...";

  return (
    <>
      <h2 className="mb-4 text-2xl font-display">
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
            <div className="flex-grow px-3 py-2">
              <Link to={`/recipe/${drink._id}`}>
                <h3 className="font-semibold font-display">{drink.name}</h3>
              </Link>
              <p className="text-xs">
                {drink.ingredients.map(({ name }) => name).join(", ")}
              </p>
            </div>
            {drink.isFav ? (
              <div className="self-center ml-2 text-gray-600">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6 "
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}
