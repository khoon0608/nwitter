/** @format */

import React, { useState } from "react";
import { authService } from "fBase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      let data = null;
      if (newAccount === true) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
        // create account
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
        // log in
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name='email'
          type='email'
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
        />
        <input
          name='password'
          type='text'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
        />
        <button> {newAccount ? "create Account" : "Log In"} </button>
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
