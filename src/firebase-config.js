// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsPFHzRg35rm93j78B0M5HG1bBd3cqvb8",
  authDomain: "sequence-surge-ai.firebaseapp.com",
  projectId: "sequence-surge-ai",
  storageBucket: "sequence-surge-ai.appspot.com",
  messagingSenderId: "1044055401665",
  appId: "1:1044055401665:web:60554d268e4382185c2040"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };