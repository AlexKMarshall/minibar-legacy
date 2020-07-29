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
    <main className="min-h-screen p-6 bg-gray-300">
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
