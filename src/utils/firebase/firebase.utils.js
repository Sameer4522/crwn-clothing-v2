import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const creatUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch (error) {
      console.log("error creating the account", error.message);
    }
  }

  //if user data exists
  //return back userDocRef

  return userDocRef;
};
