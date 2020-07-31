import React from "react";
import { Link } from "react-router-dom";

export default function SideNav({ isExpanded, toggleExpanded }) {
  return (
    <div
      className={`flex absolute z-10 overflow-hidden ${
        isExpanded ? "w-full" : "w-0"
      }`}
    >
      <nav className="w-3/5 p-3 text-gray-100 bg-gray-700">
        <ul className="space-y-3">
          <li>
            <Link to="/" onClick={toggleExpanded}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/favorites" onClick={toggleExpanded}>
              My favorites
            </Link>
          </li>
        </ul>
      </nav>
      <div
        className="flex-grow h-screen bg-black opacity-75"
        onClick={toggleExpanded}
      ></div>
    </div>
  );
}
