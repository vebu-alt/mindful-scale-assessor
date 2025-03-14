
// This is a simplified sentiment analysis implementation
// In a production app, you would use a more sophisticated model or API

type SentimentResult = {
  score: number;
  label: 'positive' | 'negative' | 'neutral';
};

// Simple keyword-based sentiment analysis
const positiveWords = [
  'happy', 'glad', 'joyful', 'excellent', 'amazing', 'good', 'great', 
  'wonderful', 'better', 'positive', 'optimistic', 'hopeful', 'pleased',
  'excited', 'thankful', 'grateful', 'motivated', 'peaceful', 'relaxed'
];

const negativeWords = [
  'sad', 'unhappy', 'depressed', 'anxious', 'worried', 'stressed', 'angry', 
  'upset', 'frustrated', 'afraid', 'scared', 'lonely', 'exhausted', 'tired',
  'hopeless', 'worthless', 'guilty', 'irritated', 'disappointed', 'miserable',
  'hurt', 'pain', 'suffering', 'overwhelmed', 'suicidal', 'kill', 'die'
];

export const analyzeMessageSentiment = async (text: string): Promise<SentimentResult> => {
  // In a real application, you would:
  // 1. Call an NLP API like Google's Natural Language API
  // 2. Or use a TensorFlow.js model loaded in the browser
  // 3. Or use a more sophisticated algorithm

  // For demo purposes, we'll use a simple keyword matching approach
  const lowerText = text.toLowerCase();
  const words = lowerText.match(/\b(\w+)\b/g) || [];
  
  let score = 0;
  let positiveMatches = 0;
  let negativeMatches = 0;
  
  // Count positive and negative word matches
  words.forEach(word => {
    if (positiveWords.includes(word)) {
      positiveMatches++;
      score += 0.5;
    } else if (negativeWords.includes(word)) {
      negativeMatches++;
      score -= 0.5;
      
      // Extra weight for severe negative indicators
      if (['suicidal', 'kill', 'die'].includes(word)) {
        score -= 1.0;
      }
    }
  });
  
  // Determine sentiment label based on score
  let label: 'positive' | 'negative' | 'neutral' = 'neutral';
  
  if (score > 0.5) {
    label = 'positive';
  } else if (score < -0.2) {
    label = 'negative';
  }
  
  // Log potential severe issues (in a real app, this would trigger alerts)
  if (score < -1.5 || words.some(word => ['suicidal', 'kill', 'die'].includes(word))) {
    console.warn('Potential severe negative sentiment detected');
    // In a real app, you might want to flag this for human review
  }
  
  return {
    score,
    label
  };
};
