import React from "react";

import { useQuery } from "react-query";

import { getRandomDrinks } from "../utils/drinks-client";
import CompactList from "./CompactList";

export default function Random() {
  const { isLoading, error, data: drinks } = useQuery(
    "random",
    getRandomDrinks
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred " + error.message;

  return <CompactList drinks={drinks} />;
}
