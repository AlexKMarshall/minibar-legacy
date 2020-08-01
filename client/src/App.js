import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import { ReactQueryDevtools } from "react-query-devtools";

import Discover from "./pages/Discover";
import Recipe from "./pages/Recipe";
import SearchResult from "./pages/SearchResult";
import Favorites from "./pages/Favorites";
import Ingredients from "./pages/Ingredients";

function App() {
  return (
    <div className="relative max-w-screen-sm min-h-screen mx-auto bg-gray-300">
      <Router>
        <Switch>
          <Route path="/recipe/:id">
            <Recipe />
          </Route>
          <Route path="/search">
            <SearchResult />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/ingredients">
            <Ingredients />
          </Route>
          <Route path="/">
            <Discover />
          </Route>
        </Switch>
      </Router>
      {/* <ReactQueryDevtools /> */}
    </div>
  );
}

export default App;
