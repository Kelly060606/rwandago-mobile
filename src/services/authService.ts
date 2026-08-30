import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, Auth } from 'firebase/auth';
import { auth } from '../config/firebase';

// Sign up a new user
export const signUpUser = async (email: string, password: string, userData?: any) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created:', userCredential.user.uid);
    return userCredential.user;
  } catch (error: any) {
    console.error('Sign up error:', error);
    throw new Error(error.message);
  }
};

// Sign in an existing user
export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCredential.user.uid);
    return userCredential.user;
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw new Error(error.message);
  }
};

// Sign out the current user
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error: any) {
    console.error('Sign out error:', error);
    throw new Error(error.message);
  }
};
