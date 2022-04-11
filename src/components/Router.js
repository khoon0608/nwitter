/** @format */

import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({refreshUser, isLoggedIn, userObj }) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <>
            {console.log(isLoggedIn)}
            <Route exact path='/'>
              <Home userObj={userObj} />
            </Route>
            <Route exact path='/profile'>
              <Profile refreshUser={refreshUser} userObj={userObj} />
            </Route>
          </>
        ) : (
          // Fragment: 부모요소는 없지만 많은 요소들을 render하고 싶을 때 사용하는 빈 엘리먼트
          <Route exact path='/'>
            {console.log(isLoggedIn)}
            <Auth />
          </Route>
        )}
      </Switch>
    </HashRouter>
  );
};

export default AppRouter;
