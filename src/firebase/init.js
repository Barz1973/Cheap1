import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA7K1q8OkU8G4aGKSMhB_axQVWlwnr5ndE",
  authDomain: "mini-capstone-50918.firebaseapp.com",
  projectId: "mini-capstone-50918",
  storageBucket: "mini-capstone-50918.appspot.com",
  messagingSenderId: "854561025798",
  appId: "1:854561025798:web:a8c31a54bd5c58f47df887"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db, app };
