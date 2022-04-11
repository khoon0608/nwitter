/** @format */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage, ref} from "firebase/storage";
import "firebase/database"


const firebaseConfig = {
  apiKey: process.env.REACT_APP_ApiKey,

  authDomain: process.env.REACT_APP_AuthDomain,

  projectId: process.env.REACT_APP_ProjectId,

  storageBucket: process.env.REACT_APP_StorageBucket,

  messagingSenderId: process.env.REACT_APP_MessagingSenderId,

  appId: process.env.REACT_APP_AppId,
};

export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storageService = getStorage(app);
