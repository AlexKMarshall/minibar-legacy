import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Discover from "./containers/Discover";
import Recipe from "./containers/Recipe";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/recipe/:id">
          <Recipe />
        </Route>
        <Route path="/">
          <Discover />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
