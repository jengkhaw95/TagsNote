import React from "react";
import recttagnotes from "../recttagnotes.png";
import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <header className="block fixed top-0 w-full border-b border-gray-300 bg-white z-20 ">
      <div className="flex w-full justify-center mt-3">
        <img
          src={recttagnotes}
          alt="Logo"
          style={{ height: "1.6rem", width: "auto" }}
        />
      </div>
      <div className="px-6 lg:max-w-5xl  lg:mx-auto  w-full flex justify-start overflow-auto flex-nowrap no-scrollbar space-x-3 text-gray-600 ">
        <NavLink
          to="/"
          className="py-2 "
          activeClassName="text-black border-b-2 border-black"
          exact
        >
          Notes
        </NavLink>
        <NavLink
          to="/settings"
          className="py-2"
          activeClassName="text-black border-b-2 border-black"
        >
          Settings
        </NavLink>

        <div className="px-3"></div>
      </div>
    </header>
  );
}
