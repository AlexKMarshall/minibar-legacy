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
    <ul>
      {drinks.map((drink) => (
        <li key={drink._id}>
          <div className="w-1/2">
            <div className="relative overflow-hidden bg-red-300 rounded-lg pb-5/6">
              <img
                src={drink.image}
                alt={drink.name}
                className="absolute object-cover w-full h-full"
              />
            </div>
            <Link to={`/recipe/${drink._id}`}>{drink.name}</Link>
            {drink.isFav ? <div>Fave</div> : <div>Not a Fave</div>}
          </div>
        </li>
      ))}
    </ul>
  );
}
