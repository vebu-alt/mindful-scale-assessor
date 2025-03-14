// Assessment types
export type AssessmentType = 'phq9' | 'gad7' | 'pcl5' | 'bdi' | 'stai' | 'moca' | 'bfi' | 'mmpi' | 'edi';

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
  },
  bdi: {
    title: 'Beck Depression Inventory (BDI-II)',
    description: 'Measures the severity of depression in adolescents and adults.',
    questions: [
      {
        id: 'bdi_1',
        text: 'Sadness',
        options: [
          { value: 0, label: 'I do not feel sad' },
          { value: 1, label: 'I feel sad much of the time' },
          { value: 2, label: 'I am sad all the time' },
          { value: 3, label: 'I am so sad or unhappy that I can\'t stand it' }
        ]
      },
      {
        id: 'bdi_2',
        text: 'Pessimism',
        options: [
          { value: 0, label: 'I am not discouraged about my future' },
          { value: 1, label: 'I feel more discouraged about my future than I used to be' },
          { value: 2, label: 'I do not expect things to work out for me' },
          { value: 3, label: 'I feel my future is hopeless and will only get worse' }
        ]
      },
      {
        id: 'bdi_3',
        text: 'Past Failure',
        options: [
          { value: 0, label: 'I do not feel like a failure' },
          { value: 1, label: 'I have failed more than I should have' },
          { value: 2, label: 'As I look back, I see a lot of failures' },
          { value: 3, label: 'I feel I am a total failure as a person' }
        ]
      },
      {
        id: 'bdi_4',
        text: 'Loss of Pleasure',
        options: [
          { value: 0, label: 'I get as much pleasure as I ever did from the things I enjoy' },
          { value: 1, label: 'I don\'t enjoy things as much as I used to' },
          { value: 2, label: 'I get very little pleasure from the things I used to enjoy' },
          { value: 3, label: 'I can\'t get any pleasure from the things I used to enjoy' }
        ]
      },
      {
        id: 'bdi_5',
        text: 'Guilty Feelings',
        options: [
          { value: 0, label: 'I don\'t feel particularly guilty' },
          { value: 1, label: 'I feel guilty over many things I have done or should have done' },
          { value: 2, label: 'I feel quite guilty most of the time' },
          { value: 3, label: 'I feel guilty all of the time' }
        ]
      }
    ],
    maxScore: 63, // Full BDI-II has 21 items (max 3 points each), using 5 items for demo
    severityLevels: [
      {
        range: [0, 13],
        label: 'Minimal depression',
        description: 'Minimal or no depression symptoms detected',
        color: '#4ade80', // Green
        recommendations: [
          'Monitor for any changes in mood',
          'Continue regular check-ins',
          'Provide psychoeducation on depression prevention',
          'Encourage maintenance of healthy lifestyle habits'
        ]
      },
      {
        range: [14, 19],
        label: 'Mild depression',
        description: 'Mild symptoms of depression present',
        color: '#facc15', // Yellow
        recommendations: [
          'Consider brief supportive counseling',
          'Teach basic cognitive-behavioral techniques',
          'Recommend lifestyle modifications (exercise, sleep hygiene)',
          'Schedule follow-up assessment in 2-3 weeks'
        ]
      },
      {
        range: [20, 28],
        label: 'Moderate depression',
        description: 'Moderate symptoms requiring treatment attention',
        color: '#fb923c', // Orange
        recommendations: [
          'Structured psychotherapy (CBT, IPT)',
          'Consider psychiatric consultation for medication evaluation',
          'Weekly therapy sessions recommended',
          'Sleep hygiene and behavioral activation techniques',
          'Consider support groups'
        ]
      },
      {
        range: [29, 63],
        label: 'Severe depression',
        description: 'Severe symptoms requiring intensive intervention',
        color: '#ef4444', // Red
        recommendations: [
          'Immediate psychiatric evaluation',
          'Consider medication (antidepressants)',
          'Intensive outpatient or inpatient treatment if needed',
          'Safety planning and regular risk assessment',
          'Family involvement in treatment',
          'Frequent sessions with structured therapy approach'
        ]
      }
    ]
  },
  stai: {
    title: 'State-Trait Anxiety Inventory (STAI)',
    description: 'Measures both state anxiety (current) and trait anxiety (general tendency).',
    questions: [
      {
        id: 'stai_s1',
        text: 'I feel calm',
        options: [
          { value: 4, label: 'Not at all' },
          { value: 3, label: 'Somewhat' },
          { value: 2, label: 'Moderately so' },
          { value: 1, label: 'Very much so' }
        ]
      },
      {
        id: 'stai_s2',
        text: 'I feel secure',
        options: [
          { value: 4, label: 'Not at all' },
          { value: 3, label: 'Somewhat' },
          { value: 2, label: 'Moderately so' },
          { value: 1, label: 'Very much so' }
        ]
      },
      {
        id: 'stai_s3',
        text: 'I am tense',
        options: [
          { value: 1, label: 'Not at all' },
          { value: 2, label: 'Somewhat' },
          { value: 3, label: 'Moderately so' },
          { value: 4, label: 'Very much so' }
        ]
      },
      {
        id: 'stai_s4',
        text: 'I feel strained',
        options: [
          { value: 1, label: 'Not at all' },
          { value: 2, label: 'Somewhat' },
          { value: 3, label: 'Moderately so' },
          { value: 4, label: 'Very much so' }
        ]
      },
      {
        id: 'stai_s5',
        text: 'I feel at ease',
        options: [
          { value: 4, label: 'Not at all' },
          { value: 3, label: 'Somewhat' },
          { value: 2, label: 'Moderately so' },
          { value: 1, label: 'Very much so' }
        ]
      }
    ],
    maxScore: 80, // Full STAI has 40 items (20 state, 20 trait), using 5 for demo
    severityLevels: [
      {
        range: [0, 39],
        label: 'Low anxiety',
        description: 'No significant anxiety symptoms present',
        color: '#4ade80', // Green
        recommendations: [
          'Continue to monitor for any changes',
          'Provide education on stress management',
          'Encourage maintenance of healthy coping strategies'
        ]
      },
      {
        range: [40, 59],
        label: 'Moderate anxiety',
        description: 'Moderate anxiety that may benefit from intervention',
        color: '#facc15', // Yellow
        recommendations: [
          'Progressive muscle relaxation training',
          'Diaphragmatic breathing exercises',
          'Cognitive restructuring techniques',
          'Regular mindfulness practice',
          'Consider follow-up assessment in 2-3 weeks'
        ]
      },
      {
        range: [60, 80],
        label: 'High anxiety',
        description: 'Significant anxiety requiring intervention',
        color: '#ef4444', // Red
        recommendations: [
          'Cognitive Behavioral Therapy (CBT)',
          'Consider psychiatric evaluation for medication',
          'Exposure therapy techniques if applicable',
          'Regular therapy sessions',
          'Stress management training',
          'Safety planning if avoidance behaviors are present'
        ]
      }
    ]
  },
  moca: {
    title: 'Montreal Cognitive Assessment (MoCA)',
    description: 'A rapid screening instrument for mild cognitive dysfunction.',
    questions: [
      {
        id: 'moca_1',
        text: 'Visuospatial/Executive: Trail Making Test',
        options: [
          { value: 0, label: 'Unable to complete or multiple errors' },
          { value: 1, label: 'Completed with minimal errors' }
        ]
      },
      {
        id: 'moca_2',
        text: 'Visuospatial Skills: Copy the cube',
        options: [
          { value: 0, label: 'Unable to copy accurately' },
          { value: 1, label: 'Completed accurately' }
        ]
      },
      {
        id: 'moca_3',
        text: 'Visuospatial Skills: Draw a clock (Ten past eleven)',
        options: [
          { value: 0, label: 'Unable to complete or significant errors' },
          { value: 1, label: 'Minor errors in time or number placement' },
          { value: 2, label: 'Complete and accurate' }
        ]
      },
      {
        id: 'moca_4',
        text: 'Naming: Identify three animals',
        options: [
          { value: 0, label: 'None correct' },
          { value: 1, label: '1 correct' },
          { value: 2, label: '2 correct' },
          { value: 3, label: 'All 3 correct' }
        ]
      },
      {
        id: 'moca_5',
        text: 'Memory: Recall 5 words after a delay',
        options: [
          { value: 0, label: 'None recalled' },
          { value: 1, label: '1 word recalled' },
          { value: 2, label: '2 words recalled' },
          { value: 3, label: '3 words recalled' },
          { value: 4, label: '4 words recalled' },
          { value: 5, label: 'All 5 words recalled' }
        ]
      }
    ],
    maxScore: 30, // Full MoCA has items totaling 30 points, using subset for demo
    severityLevels: [
      {
        range: [26, 30],
        label: 'Normal cognitive function',
        description: 'No significant cognitive impairment detected',
        color: '#4ade80', // Green
        recommendations: [
          'Regular cognitive check-ups',
          'Maintain cognitive activities',
          'Continue healthy lifestyle (exercise, diet, sleep)'
        ]
      },
      {
        range: [18, 25],
        label: 'Mild cognitive impairment',
        description: 'Some cognitive difficulties present',
        color: '#facc15', // Yellow
        recommendations: [
          'More comprehensive neurocognitive assessment',
          'Cognitive training exercises',
          'Memory strategies and compensatory techniques',
          'Rule out reversible causes (medication, depression)',
          'Follow-up in 3-6 months'
        ]
      },
      {
        range: [10, 17],
        label: 'Moderate cognitive impairment',
        description: 'Significant cognitive difficulties affecting function',
        color: '#fb923c', // Orange
        recommendations: [
          'Referral to neurologist or geriatric specialist',
          'Caregiver education and support',
          'Medication review',
          'Safety assessment',
          'Structured daily routine',
          'Consider driving assessment'
        ]
      },
      {
        range: [0, 9],
        label: 'Severe cognitive impairment',
        description: 'Severe impairment indicating possible dementia',
        color: '#ef4444', // Red
        recommendations: [
          'Immediate specialist referral',
          'Safety planning and supervision',
          'Caregiver support and education',
          'Evaluation for appropriate level of care',
          'Palliative approach to care planning'
        ]
      }
    ]
  },
  bfi: {
    title: 'Big Five Inventory (BFI)',
    description: 'Measures the five major dimensions of personality: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
    questions: [
      {
        id: 'bfi_e1',
        text: 'I see myself as someone who is talkative',
        options: [
          { value: 1, label: 'Disagree strongly' },
          { value: 2, label: 'Disagree a little' },
          { value: 3, label: 'Neither agree nor disagree' },
          { value: 4, label: 'Agree a little' },
          { value: 5, label: 'Agree strongly' }
        ]
      },
      {
        id: 'bfi_a1',
        text: 'I see myself as someone who is helpful and unselfish with others',
        options: [
          { value: 1, label: 'Disagree strongly' },
          { value: 2, label: 'Disagree a little' },
          { value: 3, label: 'Neither agree nor disagree' },
          { value: 4, label: 'Agree a little' },
          { value: 5, label: 'Agree strongly' }
        ]
      },
      {
        id: 'bfi_c1',
        text: 'I see myself as someone who does a thorough job',
        options: [
          { value: 1, label: 'Disagree strongly' },
          { value: 2, label: 'Disagree a little' },
          { value: 3, label: 'Neither agree nor disagree' },
          { value: 4, label: 'Agree a little' },
          { value: 5, label: 'Agree strongly' }
        ]
      },
      {
        id: 'bfi_n1',
        text: 'I see myself as someone who is depressed, blue',
        options: [
          { value: 1, label: 'Disagree strongly' },
          { value: 2, label: 'Disagree a little' },
          { value: 3, label: 'Neither agree nor disagree' },
          { value: 4, label: 'Agree a little' },
          { value: 5, label: 'Agree strongly' }
        ]
      },
      {
        id: 'bfi_o1',
        text: 'I see myself as someone who is original, comes up with new ideas',
        options: [
          { value: 1, label: 'Disagree strongly' },
          { value: 2, label: 'Disagree a little' },
          { value: 3, label: 'Neither agree nor disagree' },
          { value: 4, label: 'Agree a little' },
          { value: 5, label: 'Agree strongly' }
        ]
      }
    ],
    maxScore: 50, // This is simplified - real BFI has multiple questions per trait
    severityLevels: [
      {
        range: [0, 50],
        label: 'Personality Profile',
        description: 'This assessment provides a profile rather than severity levels',
        color: '#3b82f6', // Blue
        recommendations: [
          'Use results to understand client\'s general personality tendencies',
          'Consider how personality traits may interact with presenting problems',
          'Adapt therapeutic approach to match personality style',
          'Discuss results with client to increase self-awareness',
          'Consider strengths-based approaches based on personality profile'
        ]
      }
    ]
  },
  mmpi: {
    title: 'Minnesota Multiphasic Personality Inventory (MMPI-2)',
    description: 'Comprehensive assessment of adult psychopathology and personality structure.',
    questions: [
      {
        id: 'mmpi_1',
        text: 'I like mechanics magazines',
        options: [
          { value: 0, label: 'False' },
          { value: 1, label: 'True' }
        ]
      },
      {
        id: 'mmpi_2',
        text: 'I have a good appetite',
        options: [
          { value: 0, label: 'False' },
          { value: 1, label: 'True' }
        ]
      },
      {
        id: 'mmpi_3',
        text: 'I wake up fresh and rested most mornings',
        options: [
          { value: 0, label: 'False' },
          { value: 1, label: 'True' }
        ]
      },
      {
        id: 'mmpi_4',
        text: 'I think I would like the work of a librarian',
        options: [
          { value: 0, label: 'False' },
          { value: 1, label: 'True' }
        ]
      },
      {
        id: 'mmpi_5',
        text: 'I am easily awakened by noise',
        options: [
          { value: 0, label: 'False' },
          { value: 1, label: 'True' }
        ]
      }
    ],
    maxScore: 567, // Full MMPI-2 has 567 true/false items, using 5 for demo
    severityLevels: [
      {
        range: [0, 567],
        label: 'Clinical Profile',
        description: 'This assessment provides a clinical profile rather than severity levels',
        color: '#8b5cf6', // Purple
        recommendations: [
          'Full MMPI-2 requires specialized interpretation by trained clinician',
          'Consider formal MMPI-2 testing with proper administration and scoring',
          'Review validity scales before interpreting clinical scales',
          'Integrate findings with clinical interview and history',
          'Consider specialized referral for complex presentations'
        ]
      }
    ]
  },
  edi: {
    title: 'Eating Disorder Inventory (EDI-3)',
    description: 'Assesses symptoms and psychological traits associated with eating disorders.',
    questions: [
      {
        id: 'edi_1',
        text: 'I eat when I am upset',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Usually' },
          { value: 5, label: 'Always' }
        ]
      },
      {
        id: 'edi_2',
        text: 'I stuff myself with food',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Usually' },
          { value: 5, label: 'Always' }
        ]
      },
      {
        id: 'edi_3',
        text: 'I think about dieting',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Usually' },
          { value: 5, label: 'Always' }
        ]
      },
      {
        id: 'edi_4',
        text: 'I feel extremely guilty after overeating',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Usually' },
          { value: 5, label: 'Always' }
        ]
      },
      {
        id: 'edi_5',
        text: 'I am terrified of gaining weight',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Usually' },
          { value: 5, label: 'Always' }
        ]
      }
    ],
    maxScore: 192, // Full EDI-3 has many more items, using 5 for demo
    severityLevels: [
      {
        range: [0, 30],
        label: 'Low risk',
        description: 'Minimal concerns about eating or body image',
        color: '#4ade80', // Green
        recommendations: [
          'Provide education on healthy eating habits',
          'Promote positive body image',
          'Regular monitoring during routine visits'
        ]
      },
      {
        range: [31, 70],
        label: 'Moderate risk',
        description: 'Some disordered eating attitudes present',
        color: '#facc15', // Yellow
        recommendations: [
          'Further assessment of eating patterns',
          'Cognitive-behavioral techniques for body image concerns',
          'Nutritional counseling',
          'Follow-up assessment in 2-4 weeks',
          'Consider using additional specific eating disorder measures'
        ]
      },
      {
        range: [71, 192],
        label: 'High risk',
        description: 'Significant concerns suggesting possible eating disorder',
        color: '#ef4444', // Red
        recommendations: [
          'Immediate comprehensive eating disorder evaluation',
          'Referral to eating disorder specialist',
          'Medical assessment including vital signs and lab work',
          'Nutritional rehabilitation planning',
          'Consider higher level of care if medically compromised',
          'Family involvement in treatment'
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
