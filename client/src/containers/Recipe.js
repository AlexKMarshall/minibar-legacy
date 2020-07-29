import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getSingleDrink, addToFav, removeFromFav } from "./../utils/api-client";

export default function Recipe() {
  const [drink, setDrink] = useState();
  const { id } = useParams();

  useEffect(() => {
    getSingleDrink(id).then((fetchedDrink) => {
      setDrink(fetchedDrink);
    });
  }, [id]);

  async function toggleFave() {
    let updatedDrink;
    if (drink.isFav) {
      updatedDrink = await removeFromFav(id);
    } else {
      updatedDrink = await addToFav(id);
    }
    setDrink(updatedDrink);
  }

  if (!drink) return "Loading...";

  return (
    <main className="w-full min-h-screen bg-gray-300">
      <div className="relative mb-6 overflow-hidden rounded-b-xl pb-5/4">
        <img
          src={drink.image}
          alt=""
          className="absolute object-cover w-full h-full"
        />
      </div>

      <h1 className="mb-6 text-4xl font-bold text-center">{drink.name}</h1>
      <div className="p-4 pb-8 bg-gray-200 rounded-t-xl">
        <h3 className="text-xl font-bold text-center">Ingredients</h3>
        <ul>
          {drink.ingredients.map(({ name, quantity }) => (
            <li key={name}>
              {quantity} {name}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 -mt-4 bg-gray-300 rounded-t-xl">
        <h3 className="text-xl font-bold text-center">Method</h3>
        <ol>
          {drink.instructions.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
      <button
        className={`p-4 rounded ${drink.isFav ? "bg-red-500" : "bg-blue-500"}`}
        onClick={toggleFave}
      >
        {drink.isFav ? "Remove fave" : "Add fave"}
      </button>
      <Link to="/">Home</Link>
    </main>
  );
}
