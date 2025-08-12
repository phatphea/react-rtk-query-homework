import { useEffect, useState } from "react";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/firebase-config"; // Adjust the import path as necessary
import { set } from "zod";

export const useLoginWithFacebook = () => {
  // setup login, popup, logout
  const [error, setError] = useState();
  // pending
  const [ispending, setIsPending] = useState(false);
  // data (user credentials)
  const [user, setUser] = useState(null);
  // create provider
  const provider = new FacebookAuthProvider();

  // useEffect tracking on user credentials
  useEffect(() => {
    const unsubriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        throw new Error("Unsubscribed user");
      }
    });
    return () => unsubriber();
  }, []);

  // setup login with github
  const loginWithFacebook = async () => {
    setIsPending(true);
    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Login unsuccessfully");
      }
      const user = res.user;
      console.log("Facebook info: ", user);
      setIsPending(false);
    } catch (error) {
      setError(error);
      console.log(error.message);
      setIsPending(false);
    }
  };

  // logout function
  const facebookLogout = async () => {
    setIsPending(false);
    setError(null);
    try {
      await signOut(auth);
      setIsPending(true);
      console.log("Logout successfully");
    } catch (error) {
      setError(error);
      console.log(error.message);
      setIsPending(false);
    }
  };
  return { loginWithFacebook, facebookLogout, error, ispending, user };
};
