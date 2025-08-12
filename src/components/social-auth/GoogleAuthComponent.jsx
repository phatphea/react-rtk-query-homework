import { useEffect, useState } from "react";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import {auth} from "../../firebase/firebase-config"
import { set } from "zod";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../features/auth/authSlide";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router";
import {
  getDecryptedAccessToken,
  storeAccessToken,
} from "../../utils/tokenUtils";

export const useLoginWithGoogle = () => {
  // setup login, popup, logout
  const [error, setError] = useState();
  // pending
  const [ispending, setIsPending] = useState(false);
  // data (user credentials)
  const [user, setUser] = useState(null);

  const provider = new GoogleAuthProvider();
  provider.addScope("email");
  provider.setCustomParameters({prompt: "select_account"}); // Prompt user to select an account
  // create provider


  // calling signup slice
  const [signUpRequest, { error: signUpError }] = useRegisterMutation();

  //calling login slice
  const [loginRequest, { data }] = useLoginMutation();

  // navigation
  const navigate = useNavigate();

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
  const loginWithGoogle = async () => {
    setIsPending(true);
    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Login unsuccessfully");
      }
      const user = res.user;
      console.log("Google info: ", user);

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

          // implement to store accessToken in SecureLocalStorage
          if (data.accessToken) {
            // const ENCRYPT_KEY =
            //   import.meta.env.VITE_ENCRYPT_KEY || "teco_accessToken";
            // secureLocalStorage.setItem(ENCRYPT_KEY, data?.accessToken);

            storeAccessToken(data?.accessToken);
            console.log(" After Decrypted: ", getDecryptedAccessToken());

            navigate("/products");
          }
          if (!data.accessToken) {
            navigate("/login");
          }
        }
      }
      setIsPending(false);
    } catch (error) {
      setError(error);
      console.log(error.message); setIsPending(false); } };

  // logout function
  const googleLogout = async () => {
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
  return { loginWithGoogle, googleLogout, error, ispending, user };
};
