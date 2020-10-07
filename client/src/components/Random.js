import React from "react";

import { useGetRandomDrinks } from "../hooks/drinks";

import CompactList from "./CompactList";

export default function Random() {
  const { isLoading, error, data: drinks } = useGetRandomDrinks();

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred " + error.message;

  return <CompactList drinks={drinks} />;
}
