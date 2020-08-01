import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { ReactComponent as HamburgerIcon } from "./../assets/hamburger-icon.svg";

const sidebarVariant = {
  open: {
    scaleX: 1,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    scaleX: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const navVariant = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
};

export default function SideNav() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function toggleNav() {
    setIsNavOpen((isNavExpanded) => !isNavExpanded);
  }

  return (
    <>
      <AnimatePresence>
        {isNavOpen ? <Menu close={() => setIsNavOpen(false)} /> : null}
      </AnimatePresence>
      <button onClick={toggleNav}>
        <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
          <HamburgerIcon className="w-6 h-6" />
        </div>
      </button>
    </>
  );
}

function Menu({ close }) {
  return (
    <div className="absolute top-0 left-0 z-10 w-full h-full overflow-hidden">
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={sidebarVariant}
        className="relative z-10 w-4/5 h-screen p-6 pt-8 origin-left bg-indigo"
      >
        <motion.nav
          key="sidebar"
          variants={navVariant}
          className="text-gray-500"
        >
          <Link to="/" onClick={close}>
            <h2 className="mb-6 text-2xl text-gray-100 font-display">
              Minibar
            </h2>
          </Link>
          <ul className="space-y-6">
            <li>
              <NavLink
                to="/"
                exact
                onClick={close}
                activeClassName="text-gray-100"
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                  </div>
                  <div>Home</div>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favorites"
                exact
                onClick={close}
                activeClassName="text-gray-100"
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      stroke="currentColor"
                    >
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <div>Favorites</div>
                </div>
              </NavLink>
            </li>
          </ul>
        </motion.nav>
      </motion.div>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        className="absolute top-0 left-0 z-0 w-full h-screen bg-black opacity-50"
        onClick={close}
      ></motion.div>
    </div>
  );
}
