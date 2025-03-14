
import { TherapyType } from './therapyGuides';

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

interface Recommendation {
  text: string;
  therapyType?: TherapyType;
}

export const getPersonalizedRecommendations = async (messages: Message[]): Promise<Recommendation[]> => {
  // In a production app, this would use more sophisticated ML techniques
  // For this demo, we'll use rule-based recommendations
  
  const userMessages = messages.filter(msg => msg.sender === 'user');
  const allText = userMessages.map(msg => msg.text.toLowerCase()).join(' ');
  const recommendations: Recommendation[] = [];
  
  // Check for anxiety indicators
  if (/anxious|anxiety|worry|worried|panic|stress|stressed|overwhelm/i.test(allText)) {
    recommendations.push({
      text: "Practice deep breathing exercises: Try 4-7-8 breathing (inhale for 4 seconds, hold for 7, exhale for 8) to activate your parasympathetic nervous system.",
      therapyType: undefined
    });
    
    recommendations.push({
      text: "Consider Cognitive Behavioral Therapy (CBT) techniques to identify and challenge anxious thoughts.",
      therapyType: "cbt"
    });
  }
  
  // Check for depression indicators
  if (/sad|depress|hopeless|unmotivated|tired|exhausted|no energy|can't enjoy/i.test(allText)) {
    recommendations.push({
      text: "Try scheduling one small pleasurable activity each day, even when you don't feel like it.",
      therapyType: undefined
    });
    
    recommendations.push({
      text: "Behavioral Activation can help break the cycle of low mood and inactivity.",
      therapyType: "behavioral-activation"
    });
  }
  
  // Check for sleep issues
  if (/sleep|insomnia|tired|exhausted|can't sleep|nightmares|wake up/i.test(allText)) {
    recommendations.push({
      text: "Establish a consistent sleep schedule and bedtime routine. Avoid screens for at least 30 minutes before bed.",
      therapyType: undefined
    });
    
    recommendations.push({
      text: "Mindfulness meditation before bed may help calm racing thoughts.",
      therapyType: "mindfulness"
    });
  }
  
  // Check for relationship issues
  if (/relationship|partner|spouse|marriage|boyfriend|girlfriend|family|parent|child/i.test(allText)) {
    recommendations.push({
      text: "Practice active listening techniques in conversations with your loved ones.",
      therapyType: undefined
    });
    
    recommendations.push({
      text: "Interpersonal Therapy (IPT) focuses on improving communication and relationships.",
      therapyType: "ipt"
    });
  }
  
  // Check for trauma indicators
  if (/trauma|ptsd|flashback|nightmare|abuse|assault|accident|hypervigilant/i.test(allText)) {
    recommendations.push({
      text: "Ground yourself when distressed with the 5-4-3-2-1 technique: Notice 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste.",
      therapyType: undefined
    });
    
    recommendations.push({
      text: "Exposure therapy can help process traumatic memories in a safe environment.",
      therapyType: "exposure"
    });
  }
  
  // General recommendations if nothing specific detected or few recommendations
  if (recommendations.length < 2) {
    recommendations.push({
      text: "Regular physical activity, even just a 10-minute walk, can significantly improve mood and reduce stress.",
      therapyType: undefined
    });
    
    recommendations.push({
      text: "Practice mindfulness to stay present and reduce rumination on past or future concerns.",
      therapyType: "mindfulness"
    });
  }
  
  return recommendations.slice(0, 3); // Limit to 3 recommendations
};
