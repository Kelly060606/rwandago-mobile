import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import { signInUser } from '../../services/authService';
import { signInWithGoogle, signInWithTwitter } from '../../services/socialAuthService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type SignInNavigationProp = NativeStackNavigationProp<RootStackParamList, "SignIn">;

interface SignInProps {
  onNavigateToSignUp: () => void;
  onNavigateToForgotPassword: () => void;
  onNavigateToHome?: () => void;
}
const { height } = Dimensions.get('window');

const SignIn: React.FC<SignInProps> = ({
  onNavigateToSignUp,
  onNavigateToForgotPassword,
  onNavigateToHome,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<SignInNavigationProp>();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await signInUser(email, password);
      setLoading(false);
      // alert('Sign In Successful!');
      if (onNavigateToHome) {
        onNavigateToHome();
      } else {
        navigation.replace('AppTabs');
      }
    } catch (error: any) {
      setLoading(false);
      setErrors({ submit: error.message });
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      setLoading(false);
      alert('Google Sign In Successful!');
    } catch (error: any) {
      setLoading(false);
      setErrors({ submit: 'Google sign in failed' });
    }
  };

  const handleTwitterSignIn = async () => {
    setLoading(true);
    try {
      await signInWithTwitter();
      setLoading(false);
      alert('Twitter Sign In Successful!');
    } catch (error: any) {
      setLoading(false);
      setErrors({ submit: 'Twitter sign in failed' });
    }
  };

  const backgroundImage = require('../../../assets/gorilla.jpg');

  return (
    <View style={styles.container}>
      {/* Background Image - Fixed at top */}
      <Image
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Overlay */}
      <View style={styles.overlay} />

      {/* White Card at Bottom - Fixed Height */}
      <View style={styles.cardContainer}>
        <ScrollView 
          scrollEnabled={false}
          contentContainerStyle={styles.cardContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Please enter a valid account</Text>

          <View style={styles.formSection}>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={errors.email}
            />

            <TextInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              error={errors.password}
            />

            <TouchableOpacity
              style={styles.forgotContainer}
              onPress={onNavigateToForgotPassword}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {errors.submit && (
            <Text style={styles.submitErrorText}>
              Invalid email or password
            </Text>
          )}

          <Button
            title="Sign In"
            onPress={handleSignIn}
            loading={loading}
            fullWidth
          />

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleSignIn}
            >
              <Text style={styles.googleIcon}>G</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleTwitterSignIn}
            >
              <Text style={styles.xIcon}>𝕏</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linkSection}>
            <Text style={styles.linkText}>
              Don't have account?{' '}
              <Text style={styles.link} onPress={onNavigateToSignUp}>
                Sign Up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.55,
    width: '100%',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.55,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  cardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.78,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  cardContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },

  formSection: {
    marginBottom: 20,
  },

  submitErrorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 12,
    marginTop: -6,
  },

  forgotContainer: {
    alignItems: 'flex-end',
    marginTop: 12,
  },

  forgotText: {
    color: '#1E88E5',
    fontSize: 13,
    fontWeight: '500',
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },

  orText: {
    color: '#999',
    fontSize: 12,
    marginHorizontal: 12,
  },

  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 16,
  },

  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  googleIcon: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4285F4',
  },

  xIcon: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },

  linkSection: {
    alignItems: 'center',
  },

  linkText: {
    color: '#666',
    fontSize: 13,
  },

  link: {
    color: '#1E88E5',
    fontWeight: '600',
  },
});

export default SignIn;