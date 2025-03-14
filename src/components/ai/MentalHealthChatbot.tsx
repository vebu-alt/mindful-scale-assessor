
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeMessageSentiment } from '@/utils/sentimentAnalysis';
import { generateSummary } from '@/utils/summaryGenerator';
import { getPersonalizedRecommendations } from '@/utils/recommendationEngine';
import TherapyGuideDialog from '../therapy/TherapyGuideDialog';

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

const MentalHealthChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to support you with your mental health journey. How are you feeling today?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionSummary, setSessionSummary] = useState('');
  const [recommendations, setRecommendations] = useState<{
    text: string;
    therapyType?: string;
  }[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    try {
      // Analyze sentiment
      const sentiment = await analyzeMessageSentiment(input.trim());
      
      // Update user message with sentiment
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, sentiment } : msg
        )
      );
      
      // Generate bot response based on sentiment and message content
      let botResponse = '';
      
      if (sentiment.label === 'negative' && sentiment.score < -0.5) {
        botResponse = "I can see you're going through a difficult time. Remember that it's okay to feel this way, and sharing your feelings is an important step. Would you like to explore some coping strategies that might help?";
      } else if (sentiment.label === 'negative') {
        botResponse = "Thank you for sharing that with me. It sounds like you're facing some challenges. Would you like to talk more about what's troubling you, or would you prefer some suggestions for managing these feelings?";
      } else if (sentiment.label === 'positive') {
        botResponse = "I'm glad to hear you're feeling positive! It's great to acknowledge and celebrate these moments. Is there anything specific that contributed to this feeling that you'd like to discuss?";
      } else {
        botResponse = "Thank you for sharing. Would you like to tell me more about what's on your mind today?";
      }
      
      // Small delay to make conversation feel more natural
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsProcessing(false);
        
        // Update session summary and recommendations after a few exchanges
        if (messages.length > 4) {
          updateSessionInsights();
        }
      }, 1000);
      
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: "Error",
        description: "There was a problem processing your message. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };
  
  const updateSessionInsights = async () => {
    try {
      // Generate session summary
      const summary = await generateSummary(messages);
      setSessionSummary(summary);
      
      // Get personalized recommendations
      const recs = await getPersonalizedRecommendations(messages);
      setRecommendations(recs);
      
    } catch (error) {
      console.error('Error generating insights:', error);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const generateNewSessionSummary = async () => {
    setIsProcessing(true);
    try {
      const summary = await generateSummary(messages);
      setSessionSummary(summary);
      toast({
        title: "Summary Updated",
        description: "Your session summary has been refreshed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not generate summary. Please try again.",
        variant: "destructive",
      });
    }
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-12rem)]">
      <Card className="flex-1 flex flex-col max-h-full">
        <CardHeader>
          <CardTitle>Mental Health Support</CardTitle>
          <CardDescription>Chat with our AI assistant for support and guidance</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto pb-2">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  <p>{message.text}</p>
                  {message.sentiment && (
                    <div className="mt-1 text-xs opacity-70">
                      Sentiment: {message.sentiment.label}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-4">
          <div className="flex w-full items-center space-x-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="flex-1 min-h-[60px]"
              disabled={isProcessing}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isProcessing || !input.trim()}
              className="h-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <div className="w-full md:w-[350px] flex flex-col gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Session Summary</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={generateNewSessionSummary}
                disabled={isProcessing || messages.length < 3}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {sessionSummary ? (
              <p className="text-sm">{sessionSummary}</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                A summary of your conversation will appear here after a few exchanges.
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            {recommendations.length > 0 ? (
              <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                  <li key={index} className="text-sm">
                    {rec.text}
                    {rec.therapyType && (
                      <div className="mt-1">
                        <TherapyGuideDialog 
                          therapyType={rec.therapyType as any}
                          triggerElement={
                            <Button variant="link" size="sm" className="p-0 h-auto">
                              View therapy guide
                            </Button>
                          }
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                Personalized recommendations will appear here based on your conversation.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentalHealthChatbot;
