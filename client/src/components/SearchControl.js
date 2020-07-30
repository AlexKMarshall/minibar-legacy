import React, { useState } from "react";

export default function SearchControl({ onSearchSubmit }) {
  const [searchTerm, setSearchTerm] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    onSearchSubmit(searchTerm);
  }

  return (
    <form
      action="submit"
      onSubmit={onSubmit}
      className="relative flex items-center justify-center flex-grow w-12 h-12 ml-6 text-gray-800 bg-gray-200 rounded-full"
    >
      <input
        type="text"
        className="w-full h-full p-2 bg-transparent rounded-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="absolute right-0 mr-4">
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </form>
  );
}
