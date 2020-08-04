import React from "react";
import { useParams, useHistory } from "react-router-dom";

import { getSingleDrink, updateFav } from "../utils/drinks-client";
import { useQuery, useMutation, queryCache } from "react-query";

export default function Recipe() {
  const { id } = useParams();
  const history = useHistory();

  const { isLoading, error, data: drink } = useQuery(
    ["drink", id],
    getSingleDrink
  );

  const [mutate] = useMutation(updateFav, {
    onSuccess: (data) => {
      queryCache.setQueryData(["drink", id], data);
    },
  });

  async function toggleFave() {
    const action = drink.isFav ? "remove" : "add";

    try {
      await mutate({ id, action });
    } catch (e) {
      console.log("something went wrong ", e);
    }
  }

  if (isLoading) return "Loading...";
  if (error) return "An error ocurred " + error;

  return (
    <main className="relative w-full min-h-screen bg-gray-300">
      <div className="relative mb-6 overflow-hidden rounded-b-xl pb-5/4">
        <img
          src={drink.image}
          alt=""
          className="absolute object-cover w-full h-full"
        />
      </div>

      <button onClick={() => history.goBack()} aria-label="back">
        <div className="fixed top-0 flex items-center justify-center w-12 h-12 mt-10 ml-6 text-gray-800 bg-gray-200 rounded-full">
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </button>
      <h1 className="mb-6 text-4xl text-center font-display">{drink.name}</h1>
      <div className="px-6 pt-4 pb-8 bg-gray-200 rounded-t-xl">
        <h3 className="text-xl text-center font-display">Ingredients</h3>
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
        <h3 className="text-xl text-center font-display">Method</h3>
        <ol className="my-4 list-decimal list-inside">
          {drink.method.map((step) => (
            <li key={step} className="py-2">
              {step}
            </li>
          ))}
        </ol>
      </div>
      <footer className="flex justify-center p-8">
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
