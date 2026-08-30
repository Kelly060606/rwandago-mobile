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
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';

interface ForgotPasswordProps {
  onNavigateToSignIn: () => void;
  onNavigateToOTP?: () => void;
}

const { height } = Dimensions.get('window');

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onNavigateToSignIn,
  onNavigateToOTP,
}) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendReset = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      alert('Password reset email sent! Check your inbox.');
      onNavigateToSignIn();
    } catch (error: any) {
      setLoading(false);
      setErrors({ submit: error.message });
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
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Please enter your email for sending OTP
          </Text>

          <View style={styles.formSection}>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={errors.email}
            />
          </View>

          {errors.submit && (
            <Text style={[styles.errorText, { marginBottom: 16 }]}>
              {errors.submit}
            </Text>
          )}

          <Button
            title="Send"
            onPress={handleSendReset}
            loading={loading}
            fullWidth
          />

          <View style={styles.divider}>
            <View style={styles.line} />
          </View>

          <View style={styles.linkSection}>
            <Text style={styles.linkText}>
              Remember password?{' '}
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
    marginBottom: 24,
  },

  formSection: {
    marginBottom: 24,
  },

  errorText: {
    color: '#F44336',
    fontSize: 12,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },

  linkSection: {
    alignItems: 'center',
  },

  linkText: {
    color: '#666',
    fontSize: 14,
  },

  link: {
    color: '#1E88E5',
    fontWeight: '600',
  },
});

export default ForgotPassword;