import { useEffect, useState } from "react";
import {
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase-config"; // Adjust the import path as necessary
import { set } from "zod";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../features/auth/authSlide";

export const useLoginWithGithub = () => {
  // setup login, popup, logout
  const [error, setError] = useState();
  // pending
  const [ispending, setIsPending] = useState(false);
  // data (user credentials)
  const [user, setUser] = useState(null);
  // create provider
  const provider = new GithubAuthProvider();

  // calling signup slice
  const [signUpRequest, { error: signUpError }] = useRegisterMutation();

  //calling login slice
  const [loginRequest, { data }] = useLoginMutation();

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
  const loginWithGithub = async () => {
    setIsPending(true);
    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Login unsuccessfully");
      }
      const user = res.user;
      console.log("Github info: ", user);

      //implement signup with api
      try {
        await signUpRequest({
          username: user?.displayName.substring(0, 4),
          phoneNumber: user?.phoneNumber,
          address: {
            addressLine1: "",
            addressLine2: "",
            road: "",
            linkAddress: "",
          },
          email: user?.email,
          password: `${user?.displayName.substring(0, 4)}${
            import.meta.env.VITE_SECRET_KEY
          }`,
          confirmPassword: `${user?.displayName.substring(0, 4)}${
            import.meta.env.VITE_SECRET_KEY
          }`,
          profile: user?.photoURL,
        }).unwrap();
        if (!data) {
          console.log("SignUp Failed");
        }
        const res = data.json();
        console.log("Response: ", res);
        console.log("=====> ", signUpError.code.status);
      } catch (error) {
        console.log("======> error signup : ", error);
        const checkAuth = error.status;

        if (checkAuth == 400 || checkAuth == 200) {
          loginRequest({
            email: user?.email,
            password: `${user?.displayName.substring(0, 4)}${
              import.meta.env.VITE_SECRET_KEY
            }`,
          }).unwrap();

          if (!data) {
            console.log("Login isn't success");
          }
          // const response =await  data.json();
          console.log("======>user data after login", data.accessToken);
        }
      }

      setIsPending(false);
    } catch (error) {
      setError(error);
      console.log(error.message);
      setIsPending(false);
    }
  };

  // logout function
  const gitHubLogout = async () => {
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
  return { loginWithGithub, gitHubLogout, error, ispending, user };
};
