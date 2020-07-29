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
    <div>
      <img src={drink.image} alt="" />

      <button
        className={`p-4 rounded ${drink.isFav ? "bg-red-500" : "bg-blue-500"}`}
        onClick={toggleFave}
      >
        {drink.isFav ? "Remove fave" : "Add fave"}
      </button>

      <Link to="/">Home</Link>
      <h2>{drink.name}</h2>
      <h3>Ingredients</h3>
      <ul>
        {drink.ingredients.map(({ name, quantity }) => (
          <li key={name}>
            {quantity} {name}
          </li>
        ))}
      </ul>
      <h3>Method</h3>
      <ol>
        {drink.instructions.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
