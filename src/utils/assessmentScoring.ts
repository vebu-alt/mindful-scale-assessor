
// Assessment types
export type AssessmentType = 'phq9' | 'gad7' | 'pcl5';

// Question type
export interface AssessmentQuestion {
  id: string;
  text: string;
  options: {
    value: number;
    label: string;
  }[];
}

// Response type
export interface AssessmentResponse {
  questionId: string;
  value: number;
}

// Assessment definitions
export const assessments: Record<AssessmentType, {
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  maxScore: number;
  severityLevels: {
    range: [number, number];
    label: string;
    description: string;
    color: string; // For visualization
    recommendations: string[];
  }[];
}> = {
  phq9: {
    title: 'PHQ-9 (Patient Health Questionnaire)',
    description: 'Screens for depression and measures severity.',
    questions: [
      {
        id: 'phq9_1',
        text: 'Little interest or pleasure in doing things',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'phq9_2',
        text: 'Feeling down, depressed, or hopeless',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'phq9_3',
        text: 'Trouble falling or staying asleep, or sleeping too much',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'phq9_4',
        text: 'Feeling tired or having little energy',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'phq9_5',
        text: 'Poor appetite or overeating',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'phq9_6',
        text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'phq9_7',
        text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'phq9_8',
        text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'phq9_9',
        text: 'Thoughts that you would be better off dead or of hurting yourself in some way',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      }
    ],
    maxScore: 27,
    severityLevels: [
      {
        range: [0, 4],
        label: 'Minimal or none',
        description: 'Patient may not require depression treatment',
        color: '#4ade80', // Green
        recommendations: [
          'Monitor and reassess if symptoms change',
          'Provide education on mental health maintenance',
          'Encourage regular exercise and healthy lifestyle'
        ]
      },
      {
        range: [5, 9],
        label: 'Mild',
        description: 'Watchful waiting; repeat PHQ-9 at follow-up',
        color: '#facc15', // Yellow
        recommendations: [
          'Supportive counseling',
          'Psychoeducation on depression',
          'Behavioral activation strategies',
          'Consider follow-up in 2-4 weeks'
        ]
      },
      {
        range: [10, 14],
        label: 'Moderate',
        description: 'Treatment plan, considering counseling and/or pharmacotherapy',
        color: '#fb923c', // Orange
        recommendations: [
          'Cognitive Behavioral Therapy (CBT)',
          'Consider antidepressant medication',
          'Regular monitoring and follow-up',
          'Sleep hygiene guidance',
          'Mindfulness-based interventions'
        ]
      },
      {
        range: [15, 19],
        label: 'Moderately Severe',
        description: 'Active treatment with pharmacotherapy and/or psychotherapy',
        color: '#f87171', // Red
        recommendations: [
          'Antidepressant medication highly recommended',
          'Intensive psychotherapy (CBT or IPT)',
          'Weekly monitoring initially',
          'Consider referral to mental health specialist',
          'Safety planning if needed'
        ]
      },
      {
        range: [20, 27],
        label: 'Severe',
        description: 'Immediate initiation of pharmacotherapy and expedited referral to mental health specialist',
        color: '#ef4444', // Darker red
        recommendations: [
          'Immediate psychiatric consultation',
          'Consider hospitalization if safety is a concern',
          'Combination therapy (medication + psychotherapy)',
          'Crisis intervention if needed',
          'Close monitoring and regular follow-up'
        ]
      }
    ]
  },
  gad7: {
    title: 'GAD-7 (Generalized Anxiety Disorder Scale)',
    description: 'Screens for anxiety disorders and measures severity.',
    questions: [
      {
        id: 'gad7_1',
        text: 'Feeling nervous, anxious, or on edge',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'gad7_2',
        text: 'Not being able to stop or control worrying',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'gad7_3',
        text: 'Worrying too much about different things',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'gad7_4',
        text: 'Trouble relaxing',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'gad7_5',
        text: 'Being so restless that it is hard to sit still',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'gad7_6',
        text: 'Becoming easily annoyed or irritable',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      },
      {
        id: 'gad7_7',
        text: 'Feeling afraid, as if something awful might happen',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' }
        ]
      }
    ],
    maxScore: 21,
    severityLevels: [
      {
        range: [0, 4],
        label: 'Minimal anxiety',
        description: 'Patient may not require anxiety treatment',
        color: '#4ade80', // Green
        recommendations: [
          'Monitor and reassess if symptoms change',
          'Provide education on stress management',
          'Teach basic relaxation techniques'
        ]
      },
      {
        range: [5, 9],
        label: 'Mild anxiety',
        description: 'Watchful waiting; repeat GAD-7 at follow-up',
        color: '#facc15', // Yellow
        recommendations: [
          'Supportive counseling',
          'Stress management techniques',
          'Mindfulness and relaxation exercises',
          'Consider follow-up in 2-4 weeks'
        ]
      },
      {
        range: [10, 14],
        label: 'Moderate anxiety',
        description: 'Treatment plan, considering counseling and/or pharmacotherapy',
        color: '#fb923c', // Orange
        recommendations: [
          'Cognitive Behavioral Therapy (CBT)',
          'Consider anti-anxiety medication',
          'Regular monitoring and follow-up',
          'Breathing exercises and progressive muscle relaxation',
          'Regular physical activity'
        ]
      },
      {
        range: [15, 21],
        label: 'Severe anxiety',
        description: 'Active treatment with pharmacotherapy and/or psychotherapy',
        color: '#ef4444', // Red
        recommendations: [
          'Immediate psychiatric consultation',
          'Anti-anxiety medication often indicated',
          'Intensive CBT or exposure therapy',
          'Weekly monitoring initially',
          'Consider specialist referral',
          'Crisis intervention if needed'
        ]
      }
    ]
  },
  pcl5: {
    title: 'PCL-5 (PTSD Checklist)',
    description: 'Screens for PTSD and measures symptom severity.',
    questions: [
      {
        id: 'pcl5_1',
        text: 'Repeated, disturbing, and unwanted memories of the stressful experience',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'A little bit' },
          { value: 2, label: 'Moderately' },
          { value: 3, label: 'Quite a bit' },
          { value: 4, label: 'Extremely' }
        ]
      },
      {
        id: 'pcl5_2',
        text: 'Repeated, disturbing dreams of the stressful experience',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'A little bit' },
          { value: 2, label: 'Moderately' },
          { value: 3, label: 'Quite a bit' },
          { value: 4, label: 'Extremely' }
        ]
      },
      {
        id: 'pcl5_3',
        text: 'Suddenly feeling or acting as if the stressful experience were actually happening again (as if you were actually back there reliving it)',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'A little bit' },
          { value: 2, label: 'Moderately' },
          { value: 3, label: 'Quite a bit' },
          { value: 4, label: 'Extremely' }
        ]
      },
      {
        id: 'pcl5_4',
        text: 'Feeling very upset when something reminded you of the stressful experience',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'A little bit' },
          { value: 2, label: 'Moderately' },
          { value: 3, label: 'Quite a bit' },
          { value: 4, label: 'Extremely' }
        ]
      },
      {
        id: 'pcl5_5',
        text: 'Having strong physical reactions when something reminded you of the stressful experience (for example, heart pounding, trouble breathing, sweating)',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'A little bit' },
          { value: 2, label: 'Moderately' },
          { value: 3, label: 'Quite a bit' },
          { value: 4, label: 'Extremely' }
        ]
      }
    ],
    maxScore: 80, // Full PCL-5 has 20 items, we're using a shortened version with 5 items
    severityLevels: [
      {
        range: [0, 32],
        label: 'Below threshold',
        description: 'Does not meet criteria for probable PTSD diagnosis',
        color: '#4ade80', // Green
        recommendations: [
          'Monitor and reassess if symptoms change',
          'Provide education on trauma responses',
          'Teach basic grounding techniques'
        ]
      },
      {
        range: [33, 80],
        label: 'Probable PTSD',
        description: 'Meets criteria for probable PTSD diagnosis',
        color: '#ef4444', // Red
        recommendations: [
          'Refer to trauma specialist',
          'Consider trauma-focused therapy (CPT, PE, EMDR)',
          'Assess for comorbid conditions',
          'Medication evaluation may be warranted',
          'Safety planning if needed'
        ]
      }
    ]
  }
};

// Function to calculate assessment score
export const calculateScore = (
  assessmentType: AssessmentType,
  responses: AssessmentResponse[]
): number => {
  return responses.reduce((total, response) => total + response.value, 0);
};

// Function to interpret score
export const interpretScore = (
  assessmentType: AssessmentType,
  score: number
) => {
  const assessment = assessments[assessmentType];
  const interpretation = assessment.severityLevels.find(
    level => score >= level.range[0] && score <= level.range[1]
  );
  
  return interpretation || {
    range: [0, 0],
    label: 'Unknown',
    description: 'Score could not be interpreted',
    color: '#d1d5db',
    recommendations: ['Reassess with a complete questionnaire']
  };
};

// Function to get recommended interventions based on score
export const getRecommendations = (
  assessmentType: AssessmentType,
  score: number
): string[] => {
  const interpretation = interpretScore(assessmentType, score);
  return interpretation.recommendations;
};
