import {
  createUserWithEmailAndPassword,
  Auth,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { UserLoginCred, FireBaseError } from "../types/types";

// returning a string is dumb, do something smarter in the future
export async function register(
  auth: Auth,
  email: string,
  password: string
): Promise<UserLoginCred> {
  const fireBaseError: FireBaseError = {
    error: false,
    errorCode: "",
    errorMessage: "",
  };

  const userCred: UserLoginCred = {
    userCred: "",
    error: fireBaseError,
  };

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);

      userCred.userCred = user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      fireBaseError.error = true;
      fireBaseError.errorCode = errorCode;
      fireBaseError.errorMessage = errorMessage;

      console.log(errorCode + " " + errorMessage);
    });

  return userCred;
}

export async function signIn(
  auth: Auth,
  email: string,
  password: string
): Promise<UserLoginCred> {
  const fireBaseError: FireBaseError = {
    error: false,
    errorCode: "",
    errorMessage: "",
  };

  const userCred: UserLoginCred = {
    userCred: "",
    error: fireBaseError,
  };

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      userCred.userCred = user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode + " " + errorMessage);

      fireBaseError.error = true;
      fireBaseError.errorCode = errorCode;
      fireBaseError.errorMessage = errorMessage;
    });

  return userCred;
}
