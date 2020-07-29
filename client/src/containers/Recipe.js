import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSingleDrink } from "./../utils/api-client";

export default function Recipe() {
  const [drink, setDrink] = useState();
  const { id } = useParams();

  useEffect(() => {
    getSingleDrink(id).then((fetchedDrink) => {
      setDrink(fetchedDrink);
    });
  }, [id]);
  if (!drink) return "Loading...";
  return (
    <div>
      <img src={drink.image} alt="" />
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
