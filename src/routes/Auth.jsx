/** @format */

import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "fBase";

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
  const onSubmit = async(event) => {
    event.preventDefault();
    try{
      let data = null;
      if (newAccount) {
         data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        )
        // create account
      } else {
         data = await signInWithEmailAndPassword(
          authService,
          email,
          password
        )
        // log in
      }
      console.log(data);
    } catch(error) {
      console.log(error);
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
        <button> {newAccount ? "Create Account" : "Log In"} </button>
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
