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
import { signUpUser } from '../../services/authService';
import { createUserProfile } from '../../services/userService';
import { signInWithGoogle, signInWithTwitter } from '../../services/socialAuthService';
import { User } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type SignUpNavigationProp = NativeStackNavigationProp<RootStackParamList, "SignUp">;

interface SignUpProps {
  onNavigateToSignIn: () => void;
}

type UserRole = 'tourist' | 'tour_guide';
const { height } = Dimensions.get('window');

const SignUp: React.FC<SignUpProps> = ({ onNavigateToSignIn }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const user = await signUpUser(email, password, {
        name,
        email,
        role: selectedRole!,
      });

      if (user) {
        await createUserProfile(user.uid, {
          name,
          email,
          role: selectedRole!,
        });
      }

      setLoading(false);
      alert('Account Created! Please Sign In');
      // navigation.navigate("Home");
    } catch (error: any) {
      setLoading(false);
      setErrors({ submit: error.message });
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      setLoading(false);
      alert('Google Sign Up Successful!');
    } catch (error: any) {
      setLoading(false);
      setErrors({ submit: 'Google sign up failed' });
    }
  };

  const handleTwitterSignUp = async () => {
    setLoading(true);
    try {
      await signInWithTwitter();
      setLoading(false);
      alert('Twitter Sign Up Successful!');
    } catch (error: any) {
      setLoading(false);
      setErrors({ submit: 'Twitter sign up failed' });
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
          scrollEnabled={true}
          contentContainerStyle={styles.cardContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Create an account, it's free</Text>

          {/* Role Selection */}
          <View style={styles.roleSection}>
            <Text style={styles.roleLabel}>Who are you?</Text>

            <TouchableOpacity
              style={styles.selectBox}
              activeOpacity={0.85}
              onPress={() => setShowRoleMenu((prev) => !prev)}
            >
              <Text style={styles.selectBoxText}>
                {selectedRole === 'tourist'
                  ? 'Tourist'
                  : selectedRole === 'tour_guide'
                    ? 'Tour Guide'
                    : 'Select your role'}
              </Text>
              <Text style={styles.selectArrow}>{showRoleMenu ? '▴' : '▾'}</Text>
            </TouchableOpacity>

            {showRoleMenu && (
              <View style={styles.menuBox}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setSelectedRole('tourist');
                    setShowRoleMenu(false);
                    setErrors((prev) => ({ ...prev, role: '' }));
                  }}
                >
                  <Text style={styles.menuItemText}>Tourist</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setSelectedRole('tour_guide');
                    setShowRoleMenu(false);
                    setErrors((prev) => ({ ...prev, role: '' }));
                  }}
                >
                  <Text style={styles.menuItemText}>Tour Guide</Text>
                </TouchableOpacity>
              </View>
            )}

            {errors.role && (
              <Text style={styles.errorText}>{errors.role}</Text>
            )}
          </View>

          <View style={styles.formSection}>
            <TextInput
              label="Name"
              placeholder="Your name"
              value={name}
              onChangeText={setName}
              error={errors.name}
            />

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
          </View>

          <Button
            title="Sign Up"
            onPress={handleSignUp}
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
              onPress={handleGoogleSignUp}
            >
              <Text style={styles.googleIcon}>G</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleTwitterSignUp}
            >
              <Text style={styles.xIcon}>𝕏</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linkSection}>
            <Text style={styles.linkText}>
              Have account?{' '}
              <Text style={styles.link} onPress={onNavigateToSignIn}>
                Sign In
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
    paddingTop: 20,
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
    marginBottom: 16,
  },

  roleSection: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  roleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 6,
  },

  formSection: {
    marginBottom: 16,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
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
    marginBottom: 14,
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
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
  selectBoxText: {
    color: '#333',
    fontSize: 13,
    fontWeight: '500',
  },
  selectArrow: {
    color: '#1E88E5',
    fontSize: 16,
    fontWeight: '700',
  },
  menuBox: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  menuItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemText: {
    color: '#222',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default SignUp;