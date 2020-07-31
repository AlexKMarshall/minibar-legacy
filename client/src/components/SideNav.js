import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function SideNav({ close }) {
  return (
    <div className="absolute z-10 w-full h-full overflow-hidden">
      <motion.nav
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className="relative z-10 w-3/5 h-screen p-3 text-gray-100 origin-left bg-gray-800"
      >
        <ul className="space-y-3">
          <li>
            <Link to="/" onClick={close}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/favorites" onClick={close}>
              My favorites
            </Link>
          </li>
        </ul>
      </motion.nav>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute top-0 left-0 z-0 w-full h-screen bg-black opacity-75"
        onClick={close}
      ></motion.div>
    </div>
  );
}
