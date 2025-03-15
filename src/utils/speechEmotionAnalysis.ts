
// Speech emotion detection utility

type EmotionResult = {
  primary: 'neutral' | 'happy' | 'sad' | 'angry' | 'anxious' | 'fearful' | 'surprised';
  confidence: number;
  secondary?: 'neutral' | 'happy' | 'sad' | 'angry' | 'anxious' | 'fearful' | 'surprised';
  indicators: string[];
};

type CounselorGuidance = {
  suggestedQuestions: string[];
  potentialDiagnoses?: string[];
  recommendedApproach?: string;
};

// Audio features that correlate with emotions (simplified version)
const emotionAudioPatterns = {
  angry: { pitch: 'high', speed: 'fast', volume: 'high', variability: 'high' },
  sad: { pitch: 'low', speed: 'slow', volume: 'low', variability: 'low' },
  anxious: { pitch: 'high', speed: 'fast', volume: 'variable', variability: 'high' },
  happy: { pitch: 'high', speed: 'moderate', volume: 'moderate', variability: 'moderate' },
  fearful: { pitch: 'high', speed: 'variable', volume: 'low', variability: 'high' },
  surprised: { pitch: 'very high', speed: 'fast', volume: 'high', variability: 'high' },
  neutral: { pitch: 'moderate', speed: 'moderate', volume: 'moderate', variability: 'low' },
};

// In a real app, this would use a trained ML model like TensorFlow.js with a pre-trained model
export const analyzeAudioEmotion = async (audioData: Float32Array): Promise<EmotionResult> => {
  // This is a simplified mock implementation
  // In production, you would:
  // 1. Extract audio features (pitch, volume, spectral features)
  // 2. Feed these features into a trained model
  // 3. Get probability distribution of emotions

  // For this demo, we're returning a mock result
  // We simulate different emotions based on audio characteristics (volume variance as a simple proxy)
  
  // Calculate a simple audio feature (e.g., volume variance)
  const volumeValues = Array.from(audioData).map(Math.abs);
  const avgVolume = volumeValues.reduce((sum, val) => sum + val, 0) / volumeValues.length;
  const volumeVariance = volumeValues.reduce((sum, val) => sum + Math.pow(val - avgVolume, 2), 0) / volumeValues.length;
  
  // Simulate different features
  const mockPitch = avgVolume > 0.5 ? 'high' : 'low';
  const mockSpeed = volumeVariance > 0.2 ? 'fast' : 'slow';
  const mockVariability = volumeVariance > 0.15 ? 'high' : 'low';
  
  // Simplified emotion detection logic
  let primaryEmotion: EmotionResult['primary'] = 'neutral';
  let confidence = 0.6; // Base confidence
  let secondaryEmotion: EmotionResult['secondary'] = undefined;
  const indicators: string[] = [];
  
  if (avgVolume > 0.7 && volumeVariance > 0.3) {
    primaryEmotion = 'angry';
    confidence = 0.8;
    indicators.push('Elevated volume', 'High variability');
  } else if (avgVolume < 0.3 && volumeVariance < 0.1) {
    primaryEmotion = 'sad';
    confidence = 0.75;
    indicators.push('Low volume', 'Monotone delivery');
  } else if (avgVolume > 0.5 && volumeVariance > 0.2) {
    primaryEmotion = 'anxious';
    confidence = 0.7;
    secondaryEmotion = 'fearful';
    indicators.push('Variable pitch', 'Rapid speech pattern');
  } else if (avgVolume > 0.4 && volumeVariance < 0.2) {
    primaryEmotion = 'happy';
    confidence = 0.65;
    indicators.push('Moderate pitch variance', 'Positive tone');
  } else {
    // Default to neutral with some confidence adjustments
    confidence = 0.6;
    indicators.push('Regular speech pattern', 'Moderate tone');
  }
  
  return {
    primary: primaryEmotion,
    confidence,
    secondary: secondaryEmotion,
    indicators
  };
};

// Generate counselor guidance based on detected emotion
export const generateCounselorGuidance = (emotion: EmotionResult): CounselorGuidance => {
  const guidance: CounselorGuidance = {
    suggestedQuestions: [],
    potentialDiagnoses: [],
    recommendedApproach: ''
  };
  
  // Base questions on primary emotion
  switch (emotion.primary) {
    case 'sad':
      guidance.suggestedQuestions = [
        "When did you first notice feeling this way?",
        "How has your sleep been lately?",
        "Have you lost interest in activities you used to enjoy?",
        "How would you rate your energy levels day to day?"
      ];
      guidance.potentialDiagnoses = ['Depression', 'Adjustment Disorder', 'Grief'];
      guidance.recommendedApproach = 'Behavioral Activation and Supportive Listening';
      break;
      
    case 'anxious':
      guidance.suggestedQuestions = [
        "What specific things are making you feel worried right now?",
        "How often do you experience physical symptoms like racing heart or shortness of breath?",
        "Do these feelings come suddenly or build gradually?",
        "How are these feelings affecting your daily activities?"
      ];
      guidance.potentialDiagnoses = ['Generalized Anxiety Disorder', 'Panic Disorder', 'Social Anxiety'];
      guidance.recommendedApproach = 'CBT focusing on cognitive restructuring and relaxation techniques';
      break;
      
    case 'angry':
      guidance.suggestedQuestions = [
        "What situations tend to trigger these strong feelings?",
        "How do you typically express your anger?",
        "Have these feelings caused problems in your relationships?",
        "What strategies have you tried to manage these emotions?"
      ];
      guidance.potentialDiagnoses = ['Intermittent Explosive Disorder', 'PTSD', 'Adjustment Disorder'];
      guidance.recommendedApproach = 'Anger management techniques and identifying triggers';
      break;
      
    case 'fearful':
      guidance.suggestedQuestions = [
        "Can you identify what specifically you're afraid of?",
        "How do you respond when you encounter this fear?",
        "Has anything happened in the past that might be related to this fear?",
        "How much does this fear interfere with your normal activities?"
      ];
      guidance.potentialDiagnoses = ['Specific Phobia', 'PTSD', 'Panic Disorder'];
      guidance.recommendedApproach = 'Gradual exposure therapy and anxiety management';
      break;
      
    case 'happy':
      guidance.suggestedQuestions = [
        "Have there been any significant positive changes in your life recently?",
        "How stable would you say your mood has been lately?",
        "Are there times when you feel your energy or mood is unusually high?",
        "How is your sleep pattern when you're feeling this good?"
      ];
      guidance.potentialDiagnoses = ['Positive Adjustment', 'Consider ruling out Hypomania'];
      guidance.recommendedApproach = 'Supportive therapy and maintaining wellness strategies';
      break;
      
    default: // neutral
      guidance.suggestedQuestions = [
        "How would you describe your mood over the past few weeks?",
        "What brings you in today?",
        "Are there specific concerns you'd like to address?",
        "How have things been going in your major life areas - work, relationships, health?"
      ];
      guidance.recommendedApproach = 'General assessment and client-centered approach';
  }
  
  // Add secondary emotion questions if applicable
  if (emotion.secondary) {
    switch(emotion.secondary) {
      case 'fearful':
        guidance.suggestedQuestions.push("I notice some signs of fear - is there something specific you're worried about?");
        break;
      case 'sad':
        guidance.suggestedQuestions.push("I'm also picking up on some sadness in your voice. Could you tell me more about that?");
        break;
      case 'angry':
        guidance.suggestedQuestions.push("There seems to be some frustration beneath your words. Is that something you're experiencing?");
        break;
    }
  }
  
  return guidance;
};
