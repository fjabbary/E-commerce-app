import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import { getFirestore, doc, setDoc, getDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD5UO2Ib_1yVHfhxNar1NJOMhJJwyjGpFI",
  authDomain: "e-commerce-92c20.firebaseapp.com",
  projectId: "e-commerce-92c20",
  storageBucket: "e-commerce-92c20.appspot.com",
  messagingSenderId: "533873261212",
  appId: "1:533873261212:web:0efd8746861bb50f7d0b59"
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);


export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const documentRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(documentRef, obj);
  })
  await batch.commit();

  console.log('done');
}


export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'Categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = await querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items
    return acc;
  }, {})

  return categoryMap;
}



export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      })

    } catch (err) {
      console.error('Error creating document', err.message);
    }
  }
  return userDocRef;
}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)


export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)