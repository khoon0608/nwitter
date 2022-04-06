/** @format */

import React from "react";
import { authService } from "fBase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
  const history = useHistory();
  const logOutFunc = () => {
    authService.signOut();
    history.push("/");
  }
  return (
    <>
      <button onClick={logOutFunc}>Log Out</button>
    </>
  );
};

export default Profile;
