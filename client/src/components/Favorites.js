import React from "react";

import { useGetFavoriteDrinks } from "../hooks/drinks";
import CompactList from "./CompactList";

export default function Favorites() {
  const { isLoading, error, data: drinks } = useGetFavoriteDrinks();

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred " + error.message;

  return <CompactList drinks={drinks} />;
}
