import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getDrinks } from "./../utils/api-client";

export default function Discover() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    getDrinks().then((drinks) => setDrinks(drinks));
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
        <div className="flex items-center justify-center w-12 h-12 text-gray-800 bg-gray-200 rounded-full">
          <svg
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      <h2 className="mb-4 text-2xl font-bold">Featured drinks</h2>
      <ul className="flex w-full overflow-x-auto">
        {drinks.map((drink) => (
          <li key={drink._id}>
            <div className="mr-4" style={{ width: "50vw" }}>
              <div className="relative overflow-hidden bg-red-300 rounded-lg pb-5/6">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="absolute object-cover w-full h-full"
                />
              </div>
              <Link to={`/recipe/${drink._id}`}>
                <h3 className="py-4 text-lg font-bold">{drink.name}</h3>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
