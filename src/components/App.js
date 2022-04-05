/** @format */
import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  console.log(isLoggedIn);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; Nwitter {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
