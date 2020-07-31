import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import SideNav from "../components/SideNav";
import SearchControl from "../components/SearchControl";

export default function Layout({ children }) {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const history = useHistory();

  function onSearchSubmit(searchTerm) {
    console.log("submitting search: ", searchTerm);
    history.push(`/search?ingredient=${searchTerm}`);
  }

  function toggleNav() {
    setIsNavExpanded((isNavExpanded) => !isNavExpanded);
  }

  return (
    <>
      <SideNav isExpanded={isNavExpanded} onClick={toggleNav} />
      <main className="min-h-screen p-6 pt-10 bg-gray-300">
        <div className="flex justify-between mb-6">
          <img
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.5&w=144&q=80"
            alt=""
            className="w-12 h-12 rounded-full"
            onClick={toggleNav}
          />
          <SearchControl onSearchSubmit={onSearchSubmit} />
        </div>
        {children}
      </main>
    </>
  );
}
