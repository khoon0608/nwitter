/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({userObj:{displayName}}) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/profile'>{displayName} Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
