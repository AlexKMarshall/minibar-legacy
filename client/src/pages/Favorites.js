import React from "react";
import FavoritesComponent from "../components/Favorites";
import Layout from "../components/Layout";

export default function Favorites() {
  return (
    <>
      <h2 className="mb-4 text-2xl font-display">Favorite Drinks</h2>
      <FavoritesComponent />
    </>
  );
}
