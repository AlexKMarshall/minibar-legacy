import React from "react";
import FavoritesComponent from "../components/Favorites";
import Layout from "../components/Layout";

export default function Favorites() {
  return (
    <Layout>
      <h2 className="mb-4 text-2xl font-display">Favorite Drinks</h2>
      <FavoritesComponent />
    </Layout>
  );
}
