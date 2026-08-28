import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';

interface SignInProps {
  onNavigateToSignUp: () => void;
  onNavigateToHome: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onNavigateToSignUp, onNavigateToHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Validation
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

  // Handle Sign In
  const handleSignIn = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log('Sign In:', { email, password });
      
      setTimeout(() => {
        setLoading(false);
        onNavigateToHome();
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error('Sign in error:', error);
    }
  };

  // Background image - YOU CUSTOMIZE THIS
  const backgroundImage = require('../../../assets/gorilla.jpg');

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Dark Overlay */}
      <View style={styles.overlay} />

      {/* Scrollable Content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* White Card */}
        <View style={styles.card}>
          {/* Title */}
          <Text style={styles.title}>Log In</Text>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Email Input */}
            <TextInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={errors.email}
              style={styles.input}
            />

            {/* Password Input */}
            <TextInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              error={errors.password}
              style={styles.input}
            />
          </View>

          {/* Log In Button */}
          <Button
            title="LOG IN"
            onPress={handleSignIn}
            loading={loading}
            fullWidth
            style={styles.submitButton}
          />

          {/* Sign Up Link */}
          <View style={styles.signUpSection}>
            <Text style={styles.signUpText}>
              Don't have account?{' '}
              <Text
                style={styles.signUpLink}
                onPress={onNavigateToSignUp}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },

  backgroundImage: {
    ...StyleSheet.absoluteFill,
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: '100%',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },

  card: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
  },

  formSection: {
    marginBottom: 24,
  },

  input: {
    marginBottom: 16,
  },

  submitButton: {
    marginBottom: 24,
  },

  signUpSection: {
    alignItems: 'center',
  },

  signUpText: {
    color: '#666',
    fontSize: 14,
  },

  signUpLink: {
    color: '#1E88E5',
    fontWeight: '600',
  },
});

export default SignIn;