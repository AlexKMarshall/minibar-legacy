import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function fetchDrinks() {
  return fetch("http://localhost:3001/api/drinks")
    .then((res) => res.json())
    .then((data) => data.drinks);
}

export default function Discover() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetchDrinks().then((drinks) => setDrinks(drinks));
  }, []);

  if (!drinks.length) return "Loading...";
  return (
    <ul>
      {drinks.map((drink) => (
        <li key={drink._id}>
          <img src={drink.image} alt={drink.name} />
          <Link to={`/recipe/${drink._id}`}>{drink.name}</Link>
        </li>
      ))}
    </ul>
  );
}
