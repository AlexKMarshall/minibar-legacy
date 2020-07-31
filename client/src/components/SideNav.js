import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

export default function SideNav({ isOpen, close }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute z-10 w-full h-full overflow-hidden">
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariant}
            className="relative z-10 w-3/5 h-screen p-3 pt-10 origin-left bg-gray-800"
          >
            <motion.nav
              key="sidebar"
              variants={navVariant}
              className="text-gray-100"
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
          </motion.div>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 z-0 w-full h-screen bg-black opacity-75"
            onClick={close}
          ></motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
