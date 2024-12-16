import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDlRbJp_2CdsUKE64AeZjDFrzdDiwQSRh8",
  authDomain: "booom-7c7c5.firebaseapp.com",
  projectId: "booom-7c7c5",
  storageBucket: "booom-7c7c5.firebasestorage.app",
  messagingSenderId: "812309037023",
  appId: "1:812309037023:web:bee28a8fdf5125c0048e6a",
  measurementId: "G-5C269XKK5B",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app;