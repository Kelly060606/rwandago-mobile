import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Google Sign In
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
    // After redirect, user will return and RootNavigator will detect auth change
  } catch (error: any) {
    console.error('Google sign in error:', error);
    throw error;
  }
};

// Twitter/X Sign In
export const signInWithTwitter = async () => {
  try {
    const provider = new TwitterAuthProvider();
    await signInWithRedirect(auth, provider);
    // After redirect, user will return and RootNavigator will detect auth change
  } catch (error: any) {
    console.error('Twitter sign in error:', error);
    throw error;
  }
};

// Call this in RootNavigator to handle redirect result
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      // User just logged in via redirect
      const userDocRef = doc(db, 'users', result.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: result.user.uid,
          name: result.user.displayName || 'User',
          email: result.user.email,
          role: 'tourist',
          profileImage: result.user.photoURL,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
  } catch (error: any) {
    console.error('Redirect result error:', error);
  }
};