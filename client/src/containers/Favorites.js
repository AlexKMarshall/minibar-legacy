import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import { getFavoriteDrinks } from "./../utils/api-client";
import SearchControl from "./../components/SearchControl";

export default function Favorites() {
  const [drinks, setDrinks] = useState([]);
  const history = useHistory();

  function onSearchSubmit(searchTerm) {
    history.push(`/search?ingredient=${searchTerm}`);
  }

  useEffect(() => {
    getFavoriteDrinks().then((drinks) => setDrinks(drinks));
  }, []);

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
      <h2 className="mb-4 text-2xl font-display">Favorite Drinks</h2>
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
    </main>
  );
}
