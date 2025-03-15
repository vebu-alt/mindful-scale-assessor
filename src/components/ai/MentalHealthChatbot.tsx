import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, RefreshCw, Mic, MicOff, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeMessageSentiment } from '@/utils/sentimentAnalysis';
import { generateSummary } from '@/utils/summaryGenerator';
import { getPersonalizedRecommendations } from '@/utils/recommendationEngine';
import { analyzeAudioEmotion, generateCounselorGuidance } from '@/utils/speechEmotionAnalysis';
import TherapyGuideDialog from '../therapy/TherapyGuideDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sentiment?: {
    score: number;
    label: 'positive' | 'negative' | 'neutral';
  };
  emotion?: {
    primary: 'neutral' | 'happy' | 'sad' | 'angry' | 'anxious' | 'fearful' | 'surprised';
    confidence: number;
    secondary?: 'neutral' | 'happy' | 'sad' | 'angry' | 'anxious' | 'fearful' | 'surprised';
    indicators: string[];
  };
}

interface CounselorGuidance {
  suggestedQuestions: string[];
  potentialDiagnoses?: string[];
  recommendedApproach?: string;
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
  const [isListening, setIsListening] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [emotionData, setEmotionData] = useState<Message['emotion'] | null>(null);
  const [counselorGuidance, setCounselorGuidance] = useState<CounselorGuidance | null>(null);
  const [activeTab, setActiveTab] = useState('chat');
  const { toast } = useToast();

  useEffect(() => {
    if (!audioContext) {
      setAudioContext(new (window.AudioContext || (window as any).webkitAudioContext)());
    }
    
    return () => {
      if (audioContext) {
        audioContext.close();
      }
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
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
      const sentiment = await analyzeMessageSentiment(input.trim());
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, sentiment } : msg
        )
      );
      
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
      
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsProcessing(false);
        
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
      const summary = await generateSummary(messages);
      setSessionSummary(summary);
      
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

  const toggleListening = async () => {
    if (isListening) {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
      setIsListening(false);
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        const audioData = audioBuffer.getChannelData(0);
        
        try {
          const emotion = await analyzeAudioEmotion(audioData);
          setEmotionData(emotion);
          
          const guidance = generateCounselorGuidance(emotion);
          setCounselorGuidance(guidance);
          
          if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
            setMessages(prev => 
              prev.map((msg, idx) => 
                idx === prev.length - 1 ? { ...msg, emotion } : msg
              )
            );
          } else {
            const systemMsg: Message = {
              id: Date.now().toString(),
              text: `Emotion detected: ${emotion.primary} (${Math.round(emotion.confidence * 100)}% confidence)`,
              sender: 'bot',
              timestamp: new Date(),
              emotion
            };
            setMessages(prev => [...prev, systemMsg]);
          }
          
          if (emotion.confidence > 0.75 && emotion.primary !== 'neutral') {
            setActiveTab('counselor');
          }
          
          toast({
            title: "Emotion Analysis Complete",
            description: `Detected ${emotion.primary} with ${Math.round(emotion.confidence * 100)}% confidence`,
          });
        } catch (error) {
          console.error('Error analyzing audio emotion:', error);
          toast({
            title: "Analysis Error",
            description: "There was a problem analyzing the audio. Please try again.",
            variant: "destructive",
          });
        }
        
        setAudioChunks([]);
        
        stream.getTracks().forEach(track => track.stop());
      };
      
      setMediaRecorder(recorder);
      recorder.start();
      setIsListening(true);
      
      toast({
        title: "Listening",
        description: "Speak clearly to analyze emotional tone.",
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const selectSuggestedQuestion = (question: string) => {
    setInput(question);
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
                  {message.emotion && (
                    <div className="mt-1 text-xs opacity-70">
                      Emotion: {message.emotion.primary} 
                      {message.emotion.secondary && ` / ${message.emotion.secondary}`}
                      {` (${Math.round(message.emotion.confidence * 100)}%)`}
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
            <Button
              onClick={toggleListening}
              variant={isListening ? "destructive" : "outline"}
              size="icon"
              className="h-full aspect-square"
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="chat" className="flex-1">Chat Analysis</TabsTrigger>
            <TabsTrigger value="counselor" className="flex-1">
              Counselor Guide
              {counselorGuidance && <Badge variant="destructive" className="ml-2 h-2 w-2 p-0 rounded-full" />}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4 mt-2">
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
          </TabsContent>
          
          <TabsContent value="counselor" className="space-y-4 mt-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center">
                    <Brain className="h-4 w-4 mr-2" />
                    Emotion Analysis
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleListening}
                    disabled={isProcessing}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {emotionData ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Primary Emotion:</span>
                      <Badge 
                        className={`capitalize ${
                          emotionData.primary === 'happy' ? 'bg-green-500' :
                          emotionData.primary === 'sad' ? 'bg-blue-500' :
                          emotionData.primary === 'angry' ? 'bg-red-500' :
                          emotionData.primary === 'anxious' ? 'bg-amber-500' :
                          emotionData.primary === 'fearful' ? 'bg-purple-500' :
                          'bg-gray-500'
                        }`}
                      >
                        {emotionData.primary} ({Math.round(emotionData.confidence * 100)}%)
                      </Badge>
                    </div>
                    
                    {emotionData.secondary && (
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Secondary Emotion:</span>
                        <Badge variant="outline" className="capitalize">
                          {emotionData.secondary}
                        </Badge>
                      </div>
                    )}
                    
                    <div>
                      <span className="font-medium">Indicators:</span>
                      <ul className="mt-1 text-sm text-muted-foreground list-disc list-inside">
                        {emotionData.indicators.map((indicator, i) => (
                          <li key={i}>{indicator}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Click the microphone to analyze client's emotional tone
                    </p>
                    <Button 
                      onClick={toggleListening} 
                      variant="outline" 
                      size="sm"
                      className="mx-auto"
                    >
                      <Mic className="h-4 w-4 mr-2" />
                      Start Listening
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Counselor Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                {counselorGuidance ? (
                  <div className="space-y-3">
                    {counselorGuidance.potentialDiagnoses && counselorGuidance.potentialDiagnoses.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Potential Considerations:</h4>
                        <div className="flex flex-wrap gap-1">
                          {counselorGuidance.potentialDiagnoses.map((diagnosis, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">{diagnosis}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {counselorGuidance.recommendedApproach && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Recommended Approach:</h4>
                        <p className="text-sm text-muted-foreground">{counselorGuidance.recommendedApproach}</p>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Suggested Questions:</h4>
                      <ul className="space-y-2">
                        {counselorGuidance.suggestedQuestions.map((question, idx) => (
                          <li key={idx} className="text-sm">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-auto py-1 px-2 w-full justify-start text-left font-normal hover:bg-gray-100"
                              onClick={() => selectSuggestedQuestion(question)}
                            >
                              {question}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Guidance for counselors will appear here after voice emotion analysis.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MentalHealthChatbot;
