import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import { getSingleDrink, addToFav, removeFromFav } from "./../utils/api-client";

export default function Recipe() {
  const [drink, setDrink] = useState();
  const { id } = useParams();
  const history = useHistory();

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
    <main className="relative w-full min-h-screen bg-gray-300">
      <div className="relative mb-6 overflow-hidden rounded-b-xl pb-5/4">
        <img
          src={drink.image}
          alt=""
          className="absolute object-cover w-full h-full"
        />
      </div>

      <button onClick={() => history.goBack()}>
        <div className="fixed top-0 flex items-center justify-center w-12 h-12 mt-10 ml-6 text-gray-800 bg-gray-200 rounded-full">
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </button>
      <h1 className="mb-6 text-4xl font-bold text-center">{drink.name}</h1>
      <div className="px-6 pt-4 pb-8 bg-gray-200 rounded-t-xl">
        <h3 className="text-xl font-bold text-center">Ingredients</h3>
        <ul className="my-4 divide-y">
          {drink.ingredients.map(({ name, quantity }) => (
            <li key={name} className="flex justify-between py-4">
              <div>{name}</div>
              <div>{quantity}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 -mt-4 bg-gray-300 rounded-t-xl">
        <h3 className="text-xl font-bold text-center">Method</h3>
        <ol className="my-4 list-decimal list-inside">
          {drink.method.map((step) => (
            <li key={step} className="py-2">
              {step}
            </li>
          ))}
        </ol>
      </div>
      <footer className="flex justify-center m-6">
        <button
          className={`py-2 px-3 rounded bg-gray-700 text-gray-100 text-sm`}
          onClick={toggleFave}
        >
          {drink.isFav ? "Remove favorite" : "Add as favorite"}
        </button>
      </footer>
    </main>
  );
}
