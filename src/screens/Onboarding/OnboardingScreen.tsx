import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Onboarding1 from './Onboarding1';
import Onboarding2 from './Onboarding2';
import Onboarding3 from './Onboarding3';

interface OnboardingScreenProps {
  navigation: {
    replace: (screen: string) => void;
  };
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Handle Next button
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.replace('SignUp');
    }
  };

  // Handle Back button
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Onboarding1 
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <Onboarding2 
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <Onboarding3 
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OnboardingScreen;