import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhbH29TvPgi0vlxrSoltaDphIf38MqHJM",
  authDomain: "rwandago-2.firebaseapp.com",
  projectId: "rwandago-2",
  storageBucket: "rwandago-2.firebasestorage.app",
  messagingSenderId: "282798762645",
  appId: "1:282798762645:web:c9dd5aafbe0b765fb2899c",
  measurementId: "G-D37HTRNVW2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);