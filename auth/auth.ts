import {
  createUserWithEmailAndPassword,
  Auth,
  signInWithEmailAndPassword,
  signOut 
} from "firebase/auth";

import { UserLoginCred, FireBaseError, User } from "../types/types";
import {
  query,
  where,
  Firestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { dbConverter } from "../db_conversion/db_converter";
import { db } from "../pages/index";

// returning a string is dumb, do something smarter in the future
export async function register(
  auth: Auth,
  email: string,
  password: string,
  db: Firestore
): Promise<UserLoginCred> {
  const fireBaseError: FireBaseError = {
    error: false,
    errorCode: "",
    errorMessage: "",
  };

  const userCred: UserLoginCred = {
    userCred: "",
    error: fireBaseError,
    user: null,
  };

  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user);

      userCred.userCred = user;

      const collectionRef = collection(db, "User");
      const docRef = doc(collectionRef);
      const id = docRef.id;

      const userModel: User = {
        email: email,
        id: id,
        currentBooking: [],
        rewardPoints: 0,
      };

      await setDoc(docRef, await dbConverter.userToJson(userModel));

      userCred.user = userModel;
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
  password: string,
): Promise<UserLoginCred> {
  const fireBaseError: FireBaseError = {
    error: false,
    errorCode: "",
    errorMessage: "",
  };

  const userCred: UserLoginCred = {
    userCred: "",
    error: fireBaseError,
    user: null,
  };

  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;

      userCred.userCred = user;
      
      const userRef = collection(db, "User")

      const q = query(userRef, where("email", "==", email));
      const snapshot = await getDocs(q);


      // This is dumb but I am lazy
      const userModel: User = await dbConverter.jsonToUser(
        snapshot.docs[0].data(),
        snapshot.docs[0].ref
      );

      userCred.user = userModel
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

export async function signout(auth : Auth) : Promise<FireBaseError> {

  const fireBaseError: FireBaseError = {
    error: false,
    errorCode: "",
    errorMessage: "",
  };

  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
  
    console.log(error)
    
    fireBaseError.error = true
    fireBaseError.errorCode = error.errorCode
    fireBaseError.errorMessage = error.errorMessage
  });

  return fireBaseError;
}


