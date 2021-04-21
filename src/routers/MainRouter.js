import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Nav from "../components/Nav";
import ScrollToTop from "../components/ScrollToTop";
import Notes from "../pages/Notes";
import Settings from "../pages/Settings";

export default function MainRouter() {
  // px-6 md: lg:max-w-5xl lg:mx-auto mb-1
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Nav />
        <main className="min-h-screen pt-24 overflow-x-hidden pb-16">
          <Route exact path="/">
            <Notes />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </main>
      </ScrollToTop>
    </BrowserRouter>
  );
}
