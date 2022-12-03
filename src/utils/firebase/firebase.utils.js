import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDx3EKVFAnJUJYTRBj8bjUifXAIeKNqJqs",
  authDomain: "clothing-ecommerce-448fd.firebaseapp.com",
  projectId: "clothing-ecommerce-448fd",
  storageBucket: "clothing-ecommerce-448fd.appspot.com",
  messagingSenderId: "433766931374",
  appId: "1:433766931374:web:3e71e128c8cac027dec63f",
};

const app = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider();

googleprovider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleprovider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleprovider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //if user data does not exist
  //create /set the document with the data from userAuth in my collection

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdDate = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdDate,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the account", error.message);
    }
  }

  //if user data exists
  //return back userDocRef

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
