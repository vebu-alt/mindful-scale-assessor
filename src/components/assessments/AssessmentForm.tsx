
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, AlertTriangle, BookOpen } from 'lucide-react';
import { 
  assessments, 
  AssessmentType, 
  AssessmentResponse, 
  calculateScore,
  interpretScore
} from '@/utils/assessmentScoring';
import { useToast } from '@/hooks/use-toast';
import TherapyGuideDialog from '@/components/therapy/TherapyGuideDialog';
import { Button } from '@/components/ui/button';
import { TherapyType } from '@/utils/therapyGuides';

// Map assessment recommendations to therapy types
const recommendationToTherapyMap: Record<string, TherapyType> = {
  "Cognitive Behavioral Therapy (CBT)": "cbt",
  "Cognitive-behavioral techniques": "cbt",
  "CBT": "cbt",
  "Dialectical Behavior Therapy": "dbt",
  "DBT": "dbt",
  "Acceptance and Commitment Therapy": "act",
  "ACT": "act",
  "Interpersonal Therapy": "ipt",
  "IPT": "ipt",
  "Psychodynamic therapy": "psychodynamic",
  "Exposure therapy": "exposure",
  "Mindfulness": "mindfulness",
  "Mindfulness-based interventions": "mindfulness",
  "Mindfulness and relaxation exercises": "mindfulness",
  "Behavioral activation": "behavioral-activation"
};

interface AssessmentResultProps {
  assessmentType: AssessmentType;
  score: number;
  responses: AssessmentResponse[];
  onSave: () => void;
  onRetake: () => void;
}

const AssessmentResult: React.FC<AssessmentResultProps> = ({ 
  assessmentType, 
  score,
  responses,
  onSave,
  onRetake
}) => {
  const assessment = assessments[assessmentType];
  const interpretation = interpretScore(assessmentType, score);
  const scorePercentage = (score / assessment.maxScore) * 100;
  
  // Function to find therapy type based on recommendation text
  const findTherapyType = (recommendation: string): TherapyType | null => {
    for (const [key, value] of Object.entries(recommendationToTherapyMap)) {
      if (recommendation.includes(key)) {
        return value;
      }
    }
    return null;
  };
  
  return (
    <div className="animate-fade-in">
      <div className="glass-panel p-8 mb-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2">{assessment.title} Results</h2>
          <p className="text-gray-600">{assessment.description}</p>
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 rounded-full bg-gray-100"></div>
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(${interpretation.color} ${scorePercentage}%, transparent 0)`,
                transform: 'rotate(-90deg)'
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-4xl font-bold">{score}</span>
              <span className="text-gray-500 text-sm">of {assessment.maxScore}</span>
            </div>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: interpretation.color }}
              ></div>
              <h3 className="text-xl font-medium">{interpretation.label}</h3>
            </div>
            <p className="text-gray-700">{interpretation.description}</p>
          </div>
          
          <div className="w-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Recommended Interventions</h3>
              <div className="text-sm text-gray-500">Click on a therapy name for detailed guide</div>
            </div>
            <ul className="space-y-2">
              {interpretation.recommendations.map((recommendation, index) => {
                const therapyType = findTherapyType(recommendation);
                
                return (
                  <li key={index} className="flex items-start space-x-2">
                    <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-gray-700">{recommendation}</span>
                      
                      {therapyType && (
                        <div className="mt-1">
                          <TherapyGuideDialog 
                            therapyType={therapyType}
                            triggerElement={
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 gap-1 text-primary"
                              >
                                <BookOpen size={14} />
                                <span>View detailed therapy guide</span>
                              </Button>
                            }
                          />
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {score >= assessment.maxScore * 0.7 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg w-full flex items-start space-x-3">
              <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800">High Score Alert</h4>
                <p className="text-amber-700 text-sm mt-1">
                  This score indicates a significant level of distress. Consider prioritizing this patient for immediate follow-up.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex space-x-4 justify-center">
        <button 
          onClick={onRetake}
          className="btn-secondary"
        >
          Retake Assessment
        </button>
        <button 
          onClick={onSave}
          className="btn-primary"
        >
          Save Results
        </button>
      </div>
    </div>
  );
};

const AssessmentForm: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const assessmentType = type as AssessmentType;
  const assessment = assessments[assessmentType];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [completed, setCompleted] = useState(false);
  
  // Check if assessment type is valid
  if (!assessment) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-semibold mb-4">Assessment Not Found</h2>
        <p className="text-gray-600 mb-6">
          The requested assessment could not be found.
        </p>
        <button 
          onClick={() => navigate('/assessments')}
          className="btn-primary"
        >
          View All Assessments
        </button>
      </div>
    );
  }
  
  const question = assessment.questions[currentQuestion];
  
  const handleResponse = (value: number) => {
    const updatedResponses = [...responses];
    const existingIndex = updatedResponses.findIndex(r => r.questionId === question.id);
    
    if (existingIndex >= 0) {
      updatedResponses[existingIndex].value = value;
    } else {
      updatedResponses.push({
        questionId: question.id,
        value: value
      });
    }
    
    setResponses(updatedResponses);
    
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleSaveResults = () => {
    // In a real app, this would save to Firebase/backend
    toast({
      title: "Results Saved",
      description: "Assessment results have been saved successfully.",
    });
    navigate('/dashboard');
  };
  
  const handleRetake = () => {
    setResponses([]);
    setCurrentQuestion(0);
    setCompleted(false);
  };
  
  // Calculate score when completed
  const score = calculateScore(assessmentType, responses);
  
  // If assessment is completed, show results
  if (completed) {
    return (
      <AssessmentResult 
        assessmentType={assessmentType} 
        score={score}
        responses={responses}
        onSave={handleSaveResults}
        onRetake={handleRetake}
      />
    );
  }
  
  // Show current question
  return (
    <div className="glass-panel p-8 max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">{assessment.title}</h2>
          <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
            Question {currentQuestion + 1} of {assessment.questions.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / assessment.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-6">{question.text}</h3>
        
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleResponse(option.value)}
              className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-colors flex items-center justify-between group"
            >
              <span>{option.label}</span>
              <span className="w-6 h-6 rounded-full border border-gray-300 group-hover:border-primary flex items-center justify-center">
                {responses.find(r => r.questionId === question.id)?.value === option.value && (
                  <Check size={14} className="text-primary" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`flex items-center space-x-2 ${
            currentQuestion === 0 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:text-primary'
          }`}
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>
        
        <div className="text-gray-500 text-sm">
          {responses.find(r => r.questionId === question.id) 
            ? 'Your response has been recorded' 
            : 'Select an option to continue'}
        </div>
        
        {/* Skip button for demo purposes */}
        {currentQuestion < assessment.questions.length - 1 && (
          <button
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            className="text-gray-700 hover:text-primary flex items-center space-x-2"
          >
            <span>Skip</span>
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AssessmentForm;
