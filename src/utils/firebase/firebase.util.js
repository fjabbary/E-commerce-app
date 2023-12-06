import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD5UO2Ib_1yVHfhxNar1NJOMhJJwyjGpFI",
  authDomain: "e-commerce-92c20.firebaseapp.com",
  projectId: "e-commerce-92c20",
  storageBucket: "e-commerce-92c20.appspot.com",
  messagingSenderId: "533873261212",
  appId: "1:533873261212:web:0efd8746861bb50f7d0b59"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })

    } catch (err) {
      console.error('Error creating document', err.message);
    }
  }


  return userDocRef;
}