import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXZuxHCEeSURXBeyu6-KQStDqKy9ehnks",
  authDomain: "whatsapp-clone-63047.firebaseapp.com",
  projectId: "whatsapp-clone-63047",
  storageBucket: "whatsapp-clone-63047.appspot.com",
  messagingSenderId: "397749342661",
  appId: "1:397749342661:web:58bb9b1447ca0b03667bac",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
