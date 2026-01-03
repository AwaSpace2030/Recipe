import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgynpTrrcEMYbIyR6b6gwT70ORR4Bq5e4",
  authDomain: "recipe-c93c8.firebaseapp.com",
  projectId: "recipe-c93c8",
  storageBucket: "recipe-c93c8.appspot.com",
  messagingSenderId: "10127320862",
  appId: "1:10127320862:web:530d56f97479642b178b0f",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { db, firebase };
