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

interface OTPVerificationProps {
  onNavigateToSignIn: () => void;
}

const { height } = Dimensions.get('window');

const OTPVerification: React.FC<OTPVerificationProps> = ({
  onNavigateToSignIn,
}) => {
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!otp.trim()) {
      newErrors.otp = 'OTP code is required';
    } else if (otp.length < 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyOTP = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log('Verifying OTP:', otp);
      
      setLoading(false);
      alert('Password reset successful! Please sign in with your new password.');
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
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subtitle}>Please enter a code from email</Text>

          <View style={styles.formSection}>
            <TextInput
              label="Your code"
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              error={errors.otp}
              maxLength={6}
            />
          </View>

          {errors.submit && (
            <Text style={[styles.errorText, { marginBottom: 16 }]}>
              {errors.submit}
            </Text>
          )}

          <Button
            title="Verification"
            onPress={handleVerifyOTP}
            loading={loading}
            fullWidth
          />

          <View style={styles.divider}>
            <View style={styles.line} />
          </View>

          <View style={styles.linkSection}>
            <Text style={styles.linkText}>
              Back to{' '}
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

export default OTPVerification;