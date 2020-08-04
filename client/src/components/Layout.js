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
      <main className="min-h-screen p-8 pt-0 bg-gray-300">{children}</main>
    </>
  );
}

function LayoutHeader({ onSearchSubmit }) {
  return (
    <header className="p-8 pt-12">
      <div className="flex justify-between mb-6">
        <SideNav />
        <SearchControl onSearchSubmit={onSearchSubmit} />
      </div>
    </header>
  );
}
