import React, { useState } from "react";
import { Link } from "react-router-dom";

import { getDrinks } from "../utils/drinks-client";

import { useQuery } from "react-query";
import Favorites from "../components/Favorites";
import Random from "../components/Random";
import Layout from "../components/Layout";

export default function Discover() {
  const { isLoading, error, data: featuredDrinks } = useQuery(
    "featured",
    getDrinks
  );

  const [displayList, setDisplayList] = useState("random");

  if (isLoading) return "Loading...";
  if (error) return "An error ocurred " + error;

  return (
    <>
      <h2 className="mb-4 text-2xl font-display">Featured drinks</h2>
      <ul className="flex px-8 -mx-8 overflow-x-auto">
        {featuredDrinks.map((drink) => (
          <li key={drink._id} className="flex-shrink-0 w-3/4">
            <div className="mr-4">
              <Link to={`/recipe/${drink._id}`}>
                <div className="relative overflow-hidden rounded-lg pb-5/6">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="absolute object-cover w-full h-full"
                  />
                </div>
                <h3 className="py-4 text-lg font-semibold font-display">
                  {drink.name}
                </h3>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <nav className="grid grid-cols-3 my-4 bg-gray-200 divide-x divide-gray-400 rounded-lg">
        <button
          onClick={() => setDisplayList("newest")}
          className={`py-2 text-xs font-semibold text-center
           ${displayList === "newest" ? "text-gray-800" : "text-gray-600"}
           `}
        >
          Newest
        </button>
        <button
          onClick={() => setDisplayList("favorites")}
          className={`py-2 text-xs font-semibold text-center
           ${displayList === "favorites" ? "text-gray-800" : "text-gray-600"}
           `}
        >
          Favorites
        </button>
        <button
          onClick={() => setDisplayList("random")}
          className={`py-2 text-xs font-semibold text-center
          ${displayList === "random" ? "text-gray-800" : "text-gray-600"}
          `}
        >
          Random
        </button>
      </nav>
      <SecondaryList type={displayList} />
    </>
  );
}

function SecondaryList({ type }) {
  switch (type) {
    case "random":
      return <Random />;
    case "favorites":
      return <Favorites />;
    default:
      return null;
  }
}
