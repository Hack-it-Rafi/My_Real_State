// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfKJVP_i6YU83u00U7EFyWwcuv9j-p3wE",
  authDomain: "my-real-state-website.firebaseapp.com",
  projectId: "my-real-state-website",
  storageBucket: "my-real-state-website.appspot.com",
  messagingSenderId: "2301600164",
  appId: "1:2301600164:web:4d93057ff680a2a70b6131"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;