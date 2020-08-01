import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import { ReactQueryDevtools } from "react-query-devtools";

import Discover from "./containers/Discover";
import Recipe from "./containers/Recipe";
import SearchResult from "./containers/SearchResult";
import Favorites from "./containers/Favorites";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="max-w-screen-sm mx-auto">
      <Router>
        <Switch>
          <Route path="/recipe/:id">
            <Recipe />
          </Route>
          <Route path="/search">
            <Layout>
              <SearchResult />
            </Layout>
          </Route>
          <Route path="/favorites">
            <Layout>
              <Favorites />
            </Layout>
          </Route>
          <Route path="/">
            <Layout>
              <Discover />
            </Layout>
          </Route>
        </Switch>
      </Router>
      {/* <ReactQueryDevtools /> */}
    </div>
  );
}

export default App;
