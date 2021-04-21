import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav
      className="hidden md:flex flex-col w-48  text-sm"
      style={{ minWidth: "12rem" }}
    >
      <NavLink
        exact
        to="/settings"
        className="py-1.5"
        activeClassName="font-semibold"
      >
        General
      </NavLink>
      <NavLink
        exact
        to="/settings/endpoints"
        className="py-1.5"
        activeClassName="font-semibold"
      >
        API Endpoints
      </NavLink>
      <NavLink
        exact
        to="/settings/tags"
        className="py-1.5"
        activeClassName="font-semibold"
      >
        Tags
      </NavLink>
    </nav>
  );
}
