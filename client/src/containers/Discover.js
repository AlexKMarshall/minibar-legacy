import React from "react";
import { Link } from "react-router-dom";

import { getDrinks, getFavoriteDrinks } from "./../utils/api-client";

import CompactList from "../components/CompactList";
import { useQuery } from "react-query";

export default function Discover() {
  const {
    isLoading: isFeaturedLoading,
    error: featuredError,
    data: featuredDrinks,
  } = useQuery("featured", getDrinks);

  const {
    isLoading: isSecondaryLoading,
    error: secondaryError,
    data: secondaryDrinks,
  } = useQuery("favorites", getFavoriteDrinks);

  if (isFeaturedLoading) return "Loading...";
  if (featuredError) return "An error ocurred " + featuredError;

  return (
    <>
      <h2 className="mb-4 text-2xl font-display">Featured drinks</h2>
      <ul className="flex px-6 -mx-6 overflow-x-auto">
        {featuredDrinks.map((drink) => (
          <li key={drink._id}>
            <div className="mr-4" style={{ width: "50vw" }}>
              <div className="relative overflow-hidden rounded-lg pb-5/6">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="absolute object-cover w-full h-full"
                />
              </div>
              <Link to={`/recipe/${drink._id}`}>
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
      {isSecondaryLoading && "Loading..."}
      {secondaryError && "An error ocurred " + secondaryError}
      {secondaryDrinks && <CompactList drinks={secondaryDrinks} />}
    </>
  );
}
