import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQMIv4WwDX3DK3rh9-vs3KyW3Zs16SpqA",
  authDomain: "rwandago-bfa60.firebaseapp.com",
  projectId: "rwandago-bfa60",
  storageBucket: "rwandago-bfa60.firebasestorage.app",
  messagingSenderId: "286592106499",
  appId: "1:286592106499:web:4b0952ae525bf31c2ece36",
  measurementId: "G-GLK4V31T93"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log('Firebase initialized successfully!');