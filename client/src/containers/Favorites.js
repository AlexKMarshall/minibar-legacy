import React from "react";

import { useQuery } from "react-query";

import { getFavoriteDrinks } from "./../utils/api-client";
import CompactList from "../components/CompactList";

export default function Favorites() {
  const { isLoading, error, data: drinks } = useQuery(
    "favorites",
    getFavoriteDrinks
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred " + error.message;

  return (
    <>
      <h2 className="mb-4 text-2xl font-display">Favorite Drinks</h2>
      <CompactList drinks={drinks} />
    </>
  );
}
