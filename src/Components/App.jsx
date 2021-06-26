import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import PageHome from "./PageMain";
import PageContact from "./PageContact";
import { CSSTransition } from "react-transition-group";

// function App() {
//   return (
//     <div>
//       <Navbar />
//       <Switch>
//         <Route path="/" exact component={PageHome} />
//         <Route path="/contact" component={PageContact} />
//       </Switch>
//     </div>
//   );
// }

//this function is returning routes that are using the react-transition-group animations

function App() {
  const routes = [
    { path: "/", Component: PageHome, name: "PageHome" },
    { path: "/contact", Component: PageContact, name: "PageContact" },
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
