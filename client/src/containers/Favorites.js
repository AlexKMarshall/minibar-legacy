import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getFavoriteDrinks } from "./../utils/api-client";
import CompactList from "../components/CompactList";

export default function Favorites() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    getFavoriteDrinks().then((drinks) => setDrinks(drinks));
  }, []);

  if (!drinks.length) return "Loading...";

  return (
    <>
      <h2 className="mb-4 text-2xl font-display">Favorite Drinks</h2>
      <CompactList drinks={drinks} />
    </>
  );
}
