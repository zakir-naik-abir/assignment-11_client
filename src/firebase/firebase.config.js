// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB251ixNXw-zRJPeugNQECgmgtmK5sXb6I",
  authDomain: "food-donat-web.firebaseapp.com",
  projectId: "food-donat-web",
  storageBucket: "food-donat-web.appspot.com",
  messagingSenderId: "788014564754",
  appId: "1:788014564754:web:1ae4e58e4d5b8c759a2d4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)