import { AES, enc } from "crypto-js";
import secureLocalStorage from "react-secure-storage";

// set up machanism of encrypting and decrypting token
export const ENCRYPT_KEY = import.meta.env.VITE_ENCRYPT_KEY;

// set up encrypt with crypto-js to encrypt token
const encryptToken = (token) => {
  const dataEncrypted = AES.encrypt(token, ENCRYPT_KEY).toString();
  console.log("dataEncrypted: ", dataEncrypted);
  return dataEncrypted;
};

// stored accessToken
export const storeAccessToken = (accessToken) => {
  console.log("accessToken: ", accessToken);
  const dataEncrypted = encryptToken(accessToken);
  console.log("===?", dataEncrypted);
  secureLocalStorage.setItem(ENCRYPT_KEY, dataEncrypted);
};

// decrypt token
export const decryptAccessToken = (encryptedToken) => {
  if (encryptedToken) {
    const decryptedAccessToken = AES.decrypt(encryptedToken, ENCRYPT_KEY);
    return decryptedAccessToken.toString(enc.Utf8);
  }
};

// get Decrypted access token
export const getDecryptedAccessToken = () => {
  const encryptedToken = secureLocalStorage.getItem(ENCRYPT_KEY);
  console.log("The encrypted token: ", encryptedToken);
  if (encryptedToken) {
    return decryptAccessToken(encryptedToken);
  }
  return null;
};
