import React from "react";

import { useQuery } from "react-query";

import { getFavoriteDrinks } from "../utils/api-client";
import CompactList from "./CompactList";

export default function Favorites() {
  const { isLoading, error, data: drinks } = useQuery(
    "favorites",
    getFavoriteDrinks
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred " + error.message;

  return <CompactList drinks={drinks} />;
}
