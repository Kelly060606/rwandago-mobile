import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';


interface Onboarding3Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
}

const Onboarding3: React.FC<Onboarding3Props> = ({ onNext, onBack, currentStep }) => {
  // IMAGE 3 - Import onboarding3.png
  const backgroundImage = require('../../../assets/nyungwe.jpg');

  return (
    <View style={styles.container}>
      {currentStep > 1 && (
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.8}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      )}

      {/* Dark Background */}
      <View style={styles.background}>
        {/* IMAGE GOES HERE */}
        <Image
          source={backgroundImage}
          style={styles.vectorImage}
          resizeMode="cover"
        />
      </View>

      {/* Bottom White Card */}
      <View style={styles.bottomCard}>
        <Text style={styles.title}>Explore Local Attractions</Text>
        <Text style={styles.description}>
          Discover the beauty of local places you may never have visited. Experience local life and enjoy authentic experiences in each destination.
        </Text>

        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>

        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    position: 'relative',
  },

  backButton: {
    position: 'absolute',
    top: 52,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  backButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 24,
  },

  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },

  vectorImage: {
    width: '100%',
    height: '100%',
  },

  bottomCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 30,
    minHeight: 240,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },

  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 24,
  },

  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },

  dotActive: {
    backgroundColor: '#1E88E5',
  },
});

export default Onboarding3;