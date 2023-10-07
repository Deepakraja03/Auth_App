// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGV531kDcnTLnGLkBYWAlE0cV_GmozFzU",
  authDomain: "auth-app-eabe0.firebaseapp.com",
  projectId: "auth-app-eabe0",
  storageBucket: "auth-app-eabe0.appspot.com",
  messagingSenderId: "1067272906007",
  appId: "1:1067272906007:web:844e56ac0b5c74a5814352"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;