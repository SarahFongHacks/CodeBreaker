import {
  createUserWithEmailAndPassword,
  Auth,
  signInWithEmailAndPassword,
} from "firebase/auth";


export async function register(auth: Auth, email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user)

	  // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

	  console.log(errorCode + " " + errorMessage);
	  // ..
    });
}

export async function signIn(auth: Auth, email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ..

      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

	  console.log(errorCode + " " + errorMessage);
	});
}
