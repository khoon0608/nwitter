/** @format */

import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>
          </>
        ) : (
          // Fragment: 부모요소는 없지만 많은 요소들을 render하고 싶을 때 사용하는 빈 엘리먼트

          <Route exact path='/'>
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
