import React from "react";
import { useHistory } from "react-router-dom";

import SideNav from "../components/SideNav";
import SearchControl from "../components/SearchControl";

export default function Layout({ children }) {
  const history = useHistory();

  function onSearchSubmit(searchTerm) {
    history.push(`/search?ingredient=${searchTerm}`);
  }

  return (
    <>
      <LayoutHeader onSearchSubmit={onSearchSubmit} />
      <main className="min-h-screen px-6 bg-gray-300">{children}</main>
    </>
  );
}

function LayoutHeader({ onSearchSubmit }) {
  return (
    <header className="p-6 pt-10">
      <div className="flex justify-between mb-6">
        <SideNav />
        <SearchControl onSearchSubmit={onSearchSubmit} />
      </div>
    </header>
  );
}
