import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import SideNav from "../components/SideNav";
import SearchControl from "../components/SearchControl";

export default function Layout({ children }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const history = useHistory();

  function onSearchSubmit(searchTerm) {
    history.push(`/search?ingredient=${searchTerm}`);
  }

  function toggleNav() {
    setIsNavOpen((isNavExpanded) => !isNavExpanded);
  }

  return (
    <>
      <SideNav isOpen={isNavOpen} close={() => setIsNavOpen(false)} />
      <LayoutHeader toggleNav={toggleNav} onSearchSubmit={onSearchSubmit} />
      <main className="min-h-screen px-6 bg-gray-300">{children}</main>
    </>
  );
}

function LayoutHeader({ toggleNav, onSearchSubmit }) {
  return (
    <header className="p-6 pt-10">
      <div className="flex justify-between mb-6">
        <button onClick={toggleNav}>
          <img
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.5&w=144&q=80"
            alt=""
            className="w-12 h-12 rounded-full"
          />
        </button>
        <SearchControl onSearchSubmit={onSearchSubmit} />
      </div>
    </header>
  );
}
