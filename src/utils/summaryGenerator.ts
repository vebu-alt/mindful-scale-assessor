
import { analyzeMessageSentiment } from './sentimentAnalysis';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sentiment?: {
    score: number;
    label: 'positive' | 'negative' | 'neutral';
  };
}

export const generateSummary = async (messages: Message[]): Promise<string> => {
  // In a production app, you'd use a more sophisticated NLP model or API
  // For this demo, we'll use a template-based approach
  
  // Filter only user messages (to analyze user content)
  const userMessages = messages.filter(msg => msg.sender === 'user');
  
  if (userMessages.length === 0) {
    return "No user messages to summarize yet.";
  }
  
  // Analyze overall sentiment trends
  let sentimentScores: number[] = [];
  
  // Analyze each message that doesn't already have sentiment
  for (const message of userMessages) {
    if (!message.sentiment) {
      message.sentiment = await analyzeMessageSentiment(message.text);
    }
    sentimentScores.push(message.sentiment.score);
  }
  
  // Calculate average sentiment
  const avgSentiment = sentimentScores.reduce((sum, score) => sum + score, 0) / sentimentScores.length;
  
  // Identify key themes (simplified)
  const allText = userMessages.map(msg => msg.text.toLowerCase()).join(' ');
  const possibleThemes = [
    { keywords: ['anxious', 'anxiety', 'worry', 'worried', 'stress', 'stressed'], theme: 'anxiety' },
    { keywords: ['sad', 'depress', 'unhappy', 'low', 'down', 'blue'], theme: 'low mood' },
    { keywords: ['family', 'parent', 'child', 'spouse', 'partner', 'relationship'], theme: 'relationships' },
    { keywords: ['work', 'job', 'career', 'coworker', 'boss', 'workplace'], theme: 'work-related stress' },
    { keywords: ['sleep', 'tired', 'exhausted', 'insomnia', 'rest', 'fatigue'], theme: 'sleep issues' },
    { keywords: ['eat', 'food', 'weight', 'diet', 'appetite'], theme: 'eating patterns' },
  ];
  
  const detectedThemes = possibleThemes
    .filter(theme => theme.keywords.some(keyword => allText.includes(keyword)))
    .map(theme => theme.theme);
  
  // Generate summary based on sentiment and themes
  let summary = `Session Summary: This conversation `;
  
  // Add sentiment description
  if (avgSentiment > 0.3) {
    summary += `had a generally positive tone. `;
  } else if (avgSentiment < -0.3) {
    summary += `expressed significant distress or negative emotions. `;
  } else {
    summary += `contained mixed or neutral emotions. `;
  }
  
  // Add themes
  if (detectedThemes.length > 0) {
    summary += `The main themes discussed were: ${detectedThemes.join(', ')}. `;
  } else {
    summary += `No specific themes were strongly identified. `;
  }
  
  // Add conversation progression
  if (sentimentScores.length >= 3) {
    const firstHalf = sentimentScores.slice(0, Math.floor(sentimentScores.length / 2));
    const secondHalf = sentimentScores.slice(Math.floor(sentimentScores.length / 2));
    
    const firstHalfAvg = firstHalf.reduce((sum, score) => sum + score, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, score) => sum + score, 0) / secondHalf.length;
    
    if (secondHalfAvg > firstHalfAvg + 0.3) {
      summary += `The emotional tone appeared to improve as the conversation progressed.`;
    } else if (firstHalfAvg > secondHalfAvg + 0.3) {
      summary += `The emotional tone seemed to decline during the conversation.`;
    } else {
      summary += `The emotional tone remained relatively consistent throughout the conversation.`;
    }
  }
  
  return summary;
};
