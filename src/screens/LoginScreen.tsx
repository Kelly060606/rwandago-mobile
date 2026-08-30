import React, { useState } from 'react';
import SignIn from './auth/signIn';
import SignUp from './auth/signUp';

type LoginScreenProps = {
  navigation: {
    replace: (screen: string) => void;
  };
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [showSignUp, setShowSignUp] = useState(false);

  if (showSignUp) {
    return <SignUp onNavigateToSignIn={() => setShowSignUp(false)} />;
  }

  return (
    <SignIn
      onNavigateToSignUp={() => setShowSignUp(true)}
      onNavigateToForgotPassword={() => navigation.replace('ForgotPassword')}
    />
  );
}
