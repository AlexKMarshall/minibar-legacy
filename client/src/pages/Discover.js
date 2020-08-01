import React from "react";
import { Link } from "react-router-dom";

import { getDrinks } from "../utils/api-client";

import { useQuery } from "react-query";
import Favorites from "../components/Favorites";
import Layout from "../components/Layout";

export default function Discover() {
  const { isLoading, error, data: featuredDrinks } = useQuery(
    "featured",
    getDrinks
  );

  if (isLoading) return "Loading...";
  if (error) return "An error ocurred " + error;

  return (
    <Layout>
      <h2 className="mb-4 text-2xl font-display">Featured drinks</h2>
      <ul className="flex px-6 -mx-6 overflow-x-auto">
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
        <div className="py-2 text-xs font-semibold text-center text-gray-600">
          Newest
        </div>
        <div className="py-2 text-xs font-semibold text-center text-gray-800">
          Favorites
        </div>
        <div className="py-2 text-xs font-semibold text-center text-gray-600">
          Random
        </div>
      </nav>
      <Favorites />
    </Layout>
  );
}
