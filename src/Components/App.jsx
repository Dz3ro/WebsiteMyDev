import React from "react";
import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Navbar from "./Navbar/Navbar";
import PageHome from "./Pages/PageMain";
import PageContact from "./Pages/PageContact";
import PageProject from "./Pages/PageProject";
import PageLogin from "./Pages/PageLogin";
import PageAdmin from "./Pages/PageAdmin";

function App() {
  const routes = [
    { path: "/", Component: PageHome, name: "PageHome" },
    { path: "/contact", Component: PageContact, name: "PageContact" },
    { path: "/project/:id", Component: PageProject, name: "PageProject" },
    { path: "/login", Component: PageLogin, name: "PageLogin" },
    { path: "/admin", Component: PageAdmin, name: "PageAdmin" },
  ];

  return (
    <div>
      <Navbar />

      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={300}
              classNames="page"
              unmountOnExit
            >
              <div className="page">
                <Component />
              </div>
            </CSSTransition>
          )}
        </Route>
      ))}
    </div>
  );
}

export default App;
