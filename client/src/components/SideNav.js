import React from "react";
import { Link } from "react-router-dom";

export default function SideNav({ isExpanded, onClick }) {
  return (
    <div
      className={`flex absolute z-10 overflow-hidden ${
        isExpanded ? "w-full" : "w-0"
      }`}
    >
      <nav className="w-3/5 p-3 text-gray-100 bg-gray-700">
        <ul className="space-y-3">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">My favorites</Link>
          </li>
        </ul>
      </nav>
      <div
        className="flex-grow h-screen bg-black opacity-75"
        onClick={onClick}
      ></div>
    </div>
  );
}
