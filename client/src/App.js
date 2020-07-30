import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Discover from "./containers/Discover";
import Recipe from "./containers/Recipe";
import SearchResult from "./containers/SearchResult";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/recipe/:id">
          <Recipe />
        </Route>
        <Route path="/search">
          <SearchResult />
        </Route>
        <Route path="/">
          <Discover />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
