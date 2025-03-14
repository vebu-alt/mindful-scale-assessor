
import React, { useState } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TherapyType, therapyGuides } from '@/utils/therapyGuides';
import { ExternalLink, CheckCircle } from 'lucide-react';

interface TherapyGuideProps {
  therapyType: TherapyType;
  onClose?: () => void;
}

const TherapyGuide: React.FC<TherapyGuideProps> = ({ 
  therapyType,
  onClose
}) => {
  const guide = therapyGuides[therapyType];
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  
  if (!guide) {
    return (
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Guide Not Available</h3>
        <p className="text-gray-600">
          The requested therapy guide is currently not available.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
        <h2 className="text-2xl font-bold">{guide.name}</h2>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        )}
      </div>
      
      <div className="p-6">
        <p className="text-gray-700 mb-6">{guide.description}</p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Key Principles</h3>
            <ul className="space-y-2">
              {guide.keyPrinciples.map((principle, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Treatment Structure</h3>
            <dl className="space-y-2">
              <div className="flex items-start gap-2">
                <dt className="font-medium min-w-28">Format:</dt>
                <dd>{guide.structure.format}</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="font-medium min-w-28">Duration:</dt>
                <dd>{guide.structure.typicalDuration}</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="font-medium min-w-28">Frequency:</dt>
                <dd>{guide.structure.sessionFrequency}</dd>
              </div>
            </dl>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Indications</h3>
          <div className="flex flex-wrap gap-2">
            {guide.indications.map((indication, i) => (
              <Badge key={i} variant="outline" className="bg-primary/10">
                {indication}
              </Badge>
            ))}
          </div>
        </div>
        
        {guide.contraindications && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Contraindications</h3>
            <ul className="space-y-1 text-amber-700">
              {guide.contraindications.map((contraindication, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span>•</span>
                  <span>{contraindication}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Session Guides</h3>
          <Accordion 
            type="single" 
            collapsible 
            value={expandedSession}
            onValueChange={setExpandedSession}
            className="bg-gray-50 rounded-lg border"
          >
            {guide.sessions.map((session, index) => (
              <AccordionItem 
                key={index} 
                value={`session-${index}`}
                className="border-b last:border-0"
              >
                <AccordionTrigger className="px-4 hover:no-underline hover:bg-gray-100">
                  <div className="text-left">
                    <div className="font-medium">{session.title}</div>
                    <div className="text-sm text-gray-600">{session.description}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-white px-4 pb-4 pt-2">
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium text-gray-700">Duration</div>
                      <div>{session.duration}</div>
                    </div>
                    
                    <div>
                      <div className="font-medium text-gray-700">Session Goals</div>
                      <ul className="list-disc pl-5 space-y-1">
                        {session.goals.map((goal, i) => (
                          <li key={i}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <div className="font-medium text-gray-700 mb-2">Activities</div>
                      <div className="space-y-4">
                        {session.activities.map((activity, i) => (
                          <Card key={i} className="p-4">
                            <h4 className="font-medium mb-1">{activity.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                            
                            <div className="mb-3">
                              <div className="text-sm font-medium text-gray-700 mb-1">Steps:</div>
                              <ol className="list-decimal pl-5 space-y-1 text-sm">
                                {activity.steps.map((step, j) => (
                                  <li key={j}>{step}</li>
                                ))}
                              </ol>
                            </div>
                            
                            {activity.materials && (
                              <div className="mb-3">
                                <div className="text-sm font-medium text-gray-700 mb-1">Materials:</div>
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                  {activity.materials.map((material, j) => (
                                    <li key={j}>{material}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {activity.tips && (
                              <div>
                                <div className="text-sm font-medium text-gray-700 mb-1">Tips:</div>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                                  {activity.tips.map((tip, j) => (
                                    <li key={j}>{tip}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>
                    
                    {session.homework && (
                      <div>
                        <div className="font-medium text-gray-700 mb-2">Homework</div>
                        <Card className="p-4">
                          <h4 className="font-medium mb-1">{session.homework.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{session.homework.description}</p>
                          
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">Instructions:</div>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                              {session.homework.instructions.map((instruction, i) => (
                                <li key={i}>{instruction}</li>
                              ))}
                            </ul>
                          </div>
                        </Card>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {guide.resources.map((resource, i) => (
              <a 
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border rounded-lg flex hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium">{resource.title}</div>
                  <div className="text-sm text-gray-600">{resource.description}</div>
                </div>
                <ExternalLink size={16} className="text-gray-400 flex-shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapyGuide;
