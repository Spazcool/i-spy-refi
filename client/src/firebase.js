import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// todo hide this shit
const firebaseConfig = {
  apiKey: "AIzaSyBHG9SB8nsay0_QoNzDB7PIRS6gszak9Hw",
  authDomain: "ispyrefi.firebaseapp.com",
  databaseURL: "https://ispyrefi.firebaseio.com",
  projectId: "ispyrefi",
  storageBucket: "ispyrefi.appspot.com",
  messagingSenderId: "147305305255",
  appId: "1:147305305255:web:25c17225fe1b8261cbf782",
  measurementId: "G-407G8NP0HX"
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const auth = firebase.auth();
export const firestore = firebase.firestore();