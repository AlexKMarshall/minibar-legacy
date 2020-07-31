import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { searchDrinks } from "../utils/api-client";
import CompactList from "../components/CompactList";

function useSearchDrinksByIngredient() {
  const [drinks, setDrinks] = useState([]);
  const { search } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(search);
    const term = query.get("ingredient");
    setSearchTerm(term);
    searchDrinks(term).then((results) => setDrinks(results));
  }, [search]);

  return {
    drinks,
    searchTerm,
  };
}

export default function Discover() {
  const { drinks, searchTerm } = useSearchDrinksByIngredient();

  if (!drinks.length) return "Loading...";

  return (
    <>
      <h2 className="mb-4 text-xl font-display">
        Search results for {searchTerm}
      </h2>
      <CompactList drinks={drinks} />
    </>
  );
}
