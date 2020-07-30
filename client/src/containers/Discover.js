import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { getDrinks, getFavoriteDrinks } from "./../utils/api-client";

import SearchControl from "../components/SearchControl";
import SideNav from "../components/SideNav";
import CompactList from "../components/CompactList";

export default function Discover() {
  const [drinks, setDrinks] = useState([]);
  const [secondaryDrinks, setSecondaryDrinks] = useState([]);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getDrinks().then((drinks) => setDrinks(drinks));
  }, []);

  useEffect(() => {
    getFavoriteDrinks().then((favDrinks) => setSecondaryDrinks(favDrinks));
  }, []);

  function onSearchSubmit(searchTerm) {
    console.log("submitting search: ", searchTerm);
    history.push(`/search?ingredient=${searchTerm}`);
  }

  function toggleNav() {
    setIsNavExpanded((isNavExpanded) => !isNavExpanded);
  }

  if (!drinks.length) return "Loading...";

  return (
    <>
      <SideNav isExpanded={isNavExpanded} onClick={toggleNav} />
      <main className="min-h-screen p-6 pt-10 bg-gray-300">
        <div className="flex justify-between mb-6">
          <img
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.5&w=144&q=80"
            alt=""
            className="w-12 h-12 rounded-full"
            onClick={toggleNav}
          />
          <SearchControl onSearchSubmit={onSearchSubmit} />
        </div>
        <h2 className="mb-4 text-2xl font-display">Featured drinks</h2>
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
                  <h3 className="py-4 text-lg font-semibold">{drink.name}</h3>
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
        <CompactList drinks={secondaryDrinks} />
      </main>
    </>
  );
}
