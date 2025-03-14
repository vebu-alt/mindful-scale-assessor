
import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, ArrowRight } from 'lucide-react';
import { assessments, AssessmentType } from '@/utils/assessmentScoring';

const AssessmentList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(Object.keys(assessments) as AssessmentType[]).map((type) => {
        const assessment = assessments[type];
        
        return (
          <div 
            key={type}
            className="glass-panel overflow-hidden card-hover"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ClipboardCheck size={20} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {assessment.questions.length} Questions
                </span>
              </div>
              
              <h3 className="text-xl font-medium mt-4">{assessment.title}</h3>
              <p className="text-gray-600 mt-2">{assessment.description}</p>
              
              <div className="mt-6 flex items-center">
                <Link
                  to={`/assessments/${type}`}
                  className="inline-flex items-center space-x-2 text-primary font-medium hover:underline"
                >
                  <span>Start Assessment</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            
            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex items-center space-x-3">
              <div className="flex flex-1 space-x-1">
                {assessment.severityLevels.map((level, index) => (
                  <div 
                    key={index}
                    className="h-1.5 rounded-full flex-1"
                    style={{ backgroundColor: level.color }}
                    title={level.label}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                Score range: 0-{assessment.maxScore}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssessmentList;
