/** @format */

import React, { useState, useEffect } from "react";
import { authService, dbService } from "fBase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = ({refreshUser, userObj, userObj: { uid, displayName } }) => {
  const [userName, setUserName] = useState(displayName);

  const changeHandle = (event) => {
    const {
      target: { value },
    } = event;
    setUserName(value);
  };

  const editUserName = async (event) => {
    event.preventDefault();
    if (displayName !== userName) {
      await updateProfile(authService.currentUser, { displayName: userName });
      refreshUser();
    }
    
  };

  const history = useHistory();
  const logOutFunc = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyNweets = async () => {
    if (uid) {
      const q = query(
        collection(dbService, "nweets"),
        where("creatorId", "==", uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
      });
    }
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <form onSubmit={editUserName}>
        <input
          onChange={changeHandle}
          type='text'
          placeholder='update profile name'
        />
        <button>Edit</button>
      </form>
      <button onClick={logOutFunc}>Log Out</button>
    </>
  );
};

export default Profile;
