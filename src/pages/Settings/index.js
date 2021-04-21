import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { stringify } from "uuid";
import Container from "../../components/Container";
import Endpoints from "./Endpoints";
import General from "./General";
import Nav from "./Nav";
import Tags from "./Tags";

export default function Settings() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className="relative h-full">
      {isMobile ? (
        <>
          <Switch>
            <Route exact strict path="/settings">
              <div className="w-full">
                <Container className="border-b pb-4">
                  <h1 className="my-2">Settings</h1>
                </Container>
                <Container>
                  <div className="flex flex-col w-full ">
                    <Link
                      className="text-lg py-5 border-b "
                      to="/settings/general"
                    >
                      General
                    </Link>
                    <Link
                      className="text-lg py-5 border-b "
                      to="/settings/endpoints"
                    >
                      API Endpoints
                    </Link>
                    <Link
                      className="text-lg py-5 border-b "
                      to="/settings/tags"
                    >
                      Tags
                    </Link>
                  </div>
                </Container>
              </div>
            </Route>
            <Route exact strict path="/settings/general">
              <Container>
                <General />
              </Container>
            </Route>
            <Route exact strict path="/settings/endpoints">
              <Container>
                <Endpoints />
              </Container>
            </Route>
            <Route exact strict path="/settings/tags">
              <Container>
                <Tags />
              </Container>
            </Route>
            <Route path="/*">
              <Redirect to="/settings/endpoints" />
            </Route>
          </Switch>
        </>
      ) : (
        <Container>
          <div className="flex flex-row md:space-x-4">
            <Nav />
            <div className="w-full">
              <Switch>
                <Route exact strict path="/settings">
                  <General />
                </Route>
                <Route exact strict path="/settings/endpoints">
                  <Endpoints />
                </Route>
                <Route exact strict path="/settings/tags">
                  <Tags />
                </Route>
                <Route path="/*">
                  <Redirect to="/settings" />
                </Route>
              </Switch>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
