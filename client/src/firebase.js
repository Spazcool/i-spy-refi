import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from './firebase-config.json';
const firebaseConfig = config; // used to run Google server operations when hosting locally

firebase.initializeApp(firebaseConfig);

// ---------------- SIGN IN WITH GOOGLE ----------------
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// ---------------- SIGN IN WITH EMAIL ----------------
export const signUpWithEmail = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  console.log(userRef)
  console.log(user)
  if (!snapshot.exists) {
    const { email, firstName, lastName } = additionalData;
    try {
      await userRef.set({
        email,
        firstName,
        lastName
        // ,
        // ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

// ---------------- PULL EMAIL VALIDATED USER FROM DB ----------------
export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();