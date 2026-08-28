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

interface SignUpProps {
  onNavigateToSignIn: () => void;
}

type UserRole = 'tourist' | 'tour_guide';

const SignUp: React.FC<SignUpProps> = ({ onNavigateToSignIn }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!selectedRole) {
      newErrors.role = 'Please select a role';
    }

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Sign Up
  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log('Sign Up:', { selectedRole, name, email, password });
      
      setTimeout(() => {
        setLoading(false);
        alert('Account Created! Please Sign In');
        onNavigateToSignIn();
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error('Sign up error:', error);
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
          <Text style={styles.title}>Sign Up</Text>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Name Input */}
            <TextInput
              label="Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              error={errors.name}
              style={styles.input}
            />

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

            {/* Confirm Password Input */}
            <TextInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
              error={errors.confirmPassword}
              style={styles.input}
            />
          </View>

          {/* Role Selection - RADIO BUTTONS */}
          <View style={styles.roleSection}>
            <Text style={styles.roleLabel}>Who are you?</Text>

            {/* Tourist Option */}
            <TouchableOpacity
              style={[
                styles.roleOption,
                selectedRole === 'tourist' && styles.roleOptionSelected,
              ]}
              onPress={() => {
                setSelectedRole('tourist');
                setErrors({ ...errors, role: '' });
              }}
            >
              <View
                style={[
                  styles.radioCircle,
                  selectedRole === 'tourist' && styles.radioCircleSelected,
                ]}
              >
                {selectedRole === 'tourist' && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Text style={styles.roleText}>Tourist</Text>
            </TouchableOpacity>

            {/* Tour Guide Option */}
            <TouchableOpacity
              style={[
                styles.roleOption,
                selectedRole === 'tour_guide' && styles.roleOptionSelected,
              ]}
              onPress={() => {
                setSelectedRole('tour_guide');
                setErrors({ ...errors, role: '' });
              }}
            >
              <View
                style={[
                  styles.radioCircle,
                  selectedRole === 'tour_guide' && styles.radioCircleSelected,
                ]}
              >
                {selectedRole === 'tour_guide' && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Text style={styles.roleText}>Tour Guide</Text>
            </TouchableOpacity>

            {errors.role && (
              <Text style={styles.errorText}>{errors.role}</Text>
            )}
          </View>

          {/* Sign Up Button */}
          <Button
            title="Sign Up"
            onPress={handleSignUp}
            loading={loading}
            fullWidth
            style={styles.submitButton}
          />

          {/* Sign In Link */}
          <View style={styles.signInSection}>
            <Text style={styles.signInText}>
              Have account?{' '}
              <Text
                style={styles.signInLink}
                onPress={onNavigateToSignIn}
              >
                Sign In
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

  // Role Selection Styles
  roleSection: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },

  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  roleOptionSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#1E88E5',
  },

  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  radioCircleSelected: {
    borderColor: '#1E88E5',
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E88E5',
  },

  roleText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },

  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 8,
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

  signInSection: {
    alignItems: 'center',
  },

  signInText: {
    color: '#666',
    fontSize: 14,
  },

  signInLink: {
    color: '#1E88E5',
    fontWeight: '600',
  },
});

export default SignUp;