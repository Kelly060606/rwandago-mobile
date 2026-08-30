import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebase';
import { handleRedirectResult } from '../services/socialAuthService';

//importing all screens u will see , by using navigator

import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import SignIn from '../screens/auth/signIn';
import SignUp from '../screens/auth/signUp';
import ForgotPassword from '../screens/auth/ForgotPassword';
import OTPVerification from '../screens/auth/OtpVerification';
import { AppTabs } from './AppTabs';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {

  //state management variables to track app state , to decide whixh screen to show
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // what runs when the app starts 
  //it checks if the user logged in and if the user has seen onboarding and it stops loading spinner 

  useEffect(() => {
    handleRedirectResult();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser?.email);
      setUser(currentUser);
      setIsLoading(false);
      
    });

    checkOnboardingStatus();

    return unsubscribe;
  }, []);

  const checkOnboardingStatus = async ()=> {
    setHasSeenOnboarding(false);
  };

  if(isLoading){
    return (
      <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size="large" color="#1E88E5" />
      </View>
    );
  }

  return(
    <Stack.Navigator
      initialRouteName={!hasSeenOnboarding ? 'Onboarding' : user ? 'AppTabs' : 'SignIn'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
      <Stack.Screen name="SignIn">
        {({ navigation }) => (
          <SignIn
            onNavigateToSignUp={() => navigation.navigate('SignUp')}
            onNavigateToForgotPassword={() => navigation.navigate('ForgotPassword')}
            onNavigateToHome={() => navigation.replace('AppTabs')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="SignUp">
        {({ navigation }) => (
          <SignUp onNavigateToSignIn={() => navigation.navigate('SignIn')} />
        )}
      </Stack.Screen>
      <Stack.Screen name="ForgotPassword">
        {({ navigation }) => (
          <ForgotPassword
            onNavigateToSignIn={() => navigation.navigate('SignIn')}
            onNavigateToOTP={() => navigation.navigate('OTPVerification')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="OTPVerification">
        {({ navigation }) => (
          <OTPVerification onNavigateToSignIn={() => navigation.navigate('SignIn')} />
        )}
      </Stack.Screen>
      <Stack.Screen name="AppTabs" component={AppTabs} />
    </Stack.Navigator>
  ); 
}