
// Therapy types
export type TherapyType = 
  | 'cbt' 
  | 'dbt' 
  | 'act' 
  | 'ipt' 
  | 'psychodynamic'
  | 'exposure'
  | 'mindfulness'
  | 'behavioral-activation';

// Therapy session structure
export interface TherapySession {
  title: string;
  description: string;
  duration: string;
  goals: string[];
  activities: {
    title: string;
    description: string;
    steps: string[];
    materials?: string[];
    tips?: string[];
  }[];
  homework?: {
    title: string;
    description: string;
    instructions: string[];
  };
}

// Therapy guide structure
export interface TherapyGuide {
  name: string;
  description: string;
  keyPrinciples: string[];
  indications: string[];
  contraindications?: string[];
  structure: {
    format: string;
    typicalDuration: string;
    sessionFrequency: string;
  };
  sessions: TherapySession[];
  resources: {
    title: string;
    url: string;
    description: string;
  }[];
}

// Define guides for each therapy type
export const therapyGuides: Record<TherapyType, TherapyGuide> = {
  cbt: {
    name: "Cognitive Behavioral Therapy (CBT)",
    description: "A structured, time-limited approach that focuses on the relationship between thoughts, emotions, and behaviors.",
    keyPrinciples: [
      "Thoughts influence emotions and behaviors",
      "Cognitive distortions contribute to psychological distress",
      "Cognitive restructuring can modify unhelpful thought patterns",
      "Behavioral experiments test and challenge maladaptive beliefs"
    ],
    indications: [
      "Depression",
      "Anxiety disorders",
      "Panic disorder",
      "Social phobia",
      "PTSD",
      "OCD",
      "Insomnia",
      "Chronic pain"
    ],
    contraindications: [
      "Acute psychosis (unless adapted specifically)",
      "Severe cognitive impairment",
      "Unwillingness to engage in homework"
    ],
    structure: {
      format: "Individual or group",
      typicalDuration: "12-20 sessions",
      sessionFrequency: "Weekly, 45-60 minutes"
    },
    sessions: [
      {
        title: "Session 1: Introduction to CBT",
        description: "Introduce the CBT model and establish therapeutic rapport",
        duration: "50-60 minutes",
        goals: [
          "Establish rapport and therapeutic alliance",
          "Introduce the cognitive model",
          "Set treatment goals",
          "Provide psychoeducation about the client's condition"
        ],
        activities: [
          {
            title: "Introducing the CBT Model",
            description: "Explain the connection between thoughts, feelings, and behaviors using a diagram",
            steps: [
              "Draw the CBT triangle showing thoughts, feelings, and behaviors",
              "Provide a simple example (e.g., receiving a text that's not replied to)",
              "Ask client to identify their own example from recent experience",
              "Help identify thoughts, feelings, and behaviors in their example"
            ],
            materials: [
              "CBT model handout",
              "Whiteboard or paper for drawing the model"
            ]
          },
          {
            title: "Goal Setting",
            description: "Collaboratively establish specific, measurable treatment goals",
            steps: [
              "Ask client what they hope to gain from therapy",
              "Help transform vague goals into specific, measurable ones",
              "Discuss realistic timeframes",
              "Document goals for future reference"
            ]
          }
        ],
        homework: {
          title: "Thought Recording",
          description: "Begin noticing the connection between situations, thoughts, and feelings",
          instructions: [
            "Provide a thought record sheet",
            "Ask client to record 2-3 distressing situations before next session",
            "For each situation, note: what happened, thoughts, emotions, and behaviors",
            "Rate intensity of emotion (0-100%)"
          ]
        }
      },
      {
        title: "Session 2: Identifying Cognitive Distortions",
        description: "Learn to recognize common patterns of cognitive distortions",
        duration: "50-60 minutes",
        goals: [
          "Review homework and address any difficulties",
          "Teach common cognitive distortions",
          "Practice identifying distortions in client's thought records",
          "Introduce cognitive restructuring"
        ],
        activities: [
          {
            title: "Cognitive Distortions Education",
            description: "Teach client to recognize common thinking errors",
            steps: [
              "Introduce common cognitive distortions (catastrophizing, all-or-nothing thinking, etc.)",
              "Provide examples of each distortion",
              "Ask client to identify which distortions resonate with their experience",
              "Practice identifying distortions in sample thoughts"
            ],
            materials: [
              "Cognitive distortions handout",
              "Examples worksheet"
            ]
          },
          {
            title: "Thought Record Review",
            description: "Analyze completed thought records for cognitive distortions",
            steps: [
              "Review client's completed thought records",
              "Help identify cognitive distortions present",
              "Discuss patterns or themes",
              "Validate the client's experience while gently questioning distorted thinking"
            ]
          }
        ],
        homework: {
          title: "Advanced Thought Record",
          description: "Add column for identifying cognitive distortions",
          instructions: [
            "Continue recording situations, thoughts, emotions",
            "Add column to identify cognitive distortions",
            "Try to notice distortions in real-time when possible",
            "Bring completed thought records to next session"
          ]
        }
      },
      {
        title: "Session 3: Cognitive Restructuring",
        description: "Learn to challenge and modify unhelpful thoughts",
        duration: "50-60 minutes",
        goals: [
          "Review distortion identification homework",
          "Introduce cognitive restructuring techniques",
          "Practice developing balanced alternative thoughts",
          "Prepare for behavioral experiments"
        ],
        activities: [
          {
            title: "Socratic Questioning",
            description: "Use guided questioning to challenge distorted thoughts",
            steps: [
              "Select a significant distorted thought from homework",
              "Apply Socratic questions: What evidence supports this thought? What evidence contradicts it?",
              "Explore: Is there another way to look at this situation? What would I tell a friend who had this thought?",
              "Discuss: What's the worst that could happen? The best? The most likely?",
              "Develop a more balanced alternative thought"
            ],
            tips: [
              "Maintain a curious, non-judgmental stance",
              "Ask questions rather than telling",
              "Validate emotions while questioning thoughts",
              "Guide gently - client should reach insights themselves"
            ]
          },
          {
            title: "Developing Alternative Thoughts",
            description: "Create balanced, realistic alternative perspectives",
            steps: [
              "Explain characteristics of helpful thoughts (realistic, balanced, evidence-based)",
              "Model creating an alternative thought",
              "Have client practice with their own examples",
              "Discuss how the alternative thought affects emotion (rate 0-100%)"
            ]
          }
        ],
        homework: {
          title: "Complete Thought Records with Alternative Thoughts",
          description: "Practice cognitive restructuring independently",
          instructions: [
            "Continue thought records including distortions",
            "Add column for alternative thoughts",
            "Rate how believable the alternative thought is (0-100%)",
            "Note how emotions change with alternative thought"
          ]
        }
      }
    ],
    resources: [
      {
        title: "Feeling Good: The New Mood Therapy",
        url: "https://feelinggood.com/books/feeling-good-the-new-mood-therapy/",
        description: "Classic CBT self-help book by David Burns"
      },
      {
        title: "Center for Clinical Interventions - CBT Workbooks",
        url: "https://www.cci.health.wa.gov.au/Resources/Looking-After-Yourself",
        description: "Free CBT workbooks and worksheets"
      },
      {
        title: "Beck Institute for Cognitive Behavior Therapy",
        url: "https://beckinstitute.org/",
        description: "Training and resources from Aaron Beck's institute"
      }
    ]
  },
  dbt: {
    name: "Dialectical Behavior Therapy (DBT)",
    description: "A cognitive-behavioral approach that emphasizes emotional regulation, distress tolerance, interpersonal effectiveness, and mindfulness.",
    keyPrinciples: [
      "Dialectical thinking: balancing acceptance and change",
      "Biosocial theory of emotional dysregulation",
      "Mindfulness as core skill",
      "Building a life worth living"
    ],
    indications: [
      "Borderline personality disorder",
      "Chronic suicidality and self-harm",
      "Emotion dysregulation disorders",
      "Substance use disorders",
      "Eating disorders",
      "PTSD with emotional dysregulation"
    ],
    structure: {
      format: "Individual therapy, skills group, phone coaching, consultation team",
      typicalDuration: "6-12 months (standard)",
      sessionFrequency: "Weekly individual (50-60 min) and group (2-2.5 hours)"
    },
    sessions: [
      {
        title: "Session 1: Introduction to DBT and Mindfulness",
        description: "Orient to DBT and introduce core mindfulness skills",
        duration: "50-60 minutes",
        goals: [
          "Orient client to DBT framework",
          "Introduce dialectical thinking",
          "Begin teaching mindfulness skills",
          "Establish diary card monitoring"
        ],
        activities: [
          {
            title: "DBT Framework Orientation",
            description: "Explain the four modules and treatment structure",
            steps: [
              "Explain the biosocial theory of emotion dysregulation",
              "Introduce the four skill modules: mindfulness, distress tolerance, emotion regulation, interpersonal effectiveness",
              "Discuss dialectics: balancing acceptance and change",
              "Explain treatment components (individual therapy, skills group, phone coaching, therapist consultation team)"
            ],
            materials: [
              "DBT overview handout",
              "Treatment agreement forms"
            ]
          },
          {
            title: "Mindfulness Exercise: Observe and Describe",
            description: "Practice core mindfulness skills",
            steps: [
              "Introduce the concept of 'Wise Mind' (balance between emotion mind and reasonable mind)",
              "Guide brief mindfulness exercise focusing on observing breath",
              "Practice describing observations without judgment",
              "Discuss client's experience of the exercise"
            ],
            tips: [
              "Keep first mindfulness practice brief (2-3 minutes)",
              "Normalize wandering attention",
              "Model non-judgmental stance",
              "Focus on sensory experience over analysis"
            ]
          }
        ],
        homework: {
          title: "Diary Card and Mindfulness Practice",
          description: "Begin monitoring emotions and practicing mindfulness",
          instructions: [
            "Complete daily diary card tracking emotions, urges, and behaviors",
            "Practice 'Observe and Describe' mindfulness for 3-5 minutes daily",
            "Note obstacles to practice",
            "Consider one situation where they noticed 'emotion mind' taking over"
          ]
        }
      }
    ],
    resources: [
      {
        title: "DBT Skills Training Manual",
        url: "https://behavioraltech.org/resources/books/dbt-skills-training-manual/",
        description: "Comprehensive guide by Marsha Linehan"
      },
      {
        title: "Behavioral Tech",
        url: "https://behavioraltech.org/",
        description: "Training organization founded by Marsha Linehan"
      },
      {
        title: "DBT Self-Help",
        url: "https://www.dbtselfhelp.com/",
        description: "Free online DBT skills resources"
      }
    ]
  },
  act: {
    name: "Acceptance and Commitment Therapy (ACT)",
    description: "A form of behavioral therapy that uses acceptance and mindfulness strategies, together with commitment and behavior change strategies, to increase psychological flexibility.",
    keyPrinciples: [
      "Psychological flexibility",
      "Experiential acceptance vs. avoidance",
      "Cognitive defusion",
      "Self-as-context",
      "Values clarification",
      "Committed action"
    ],
    indications: [
      "Anxiety disorders",
      "Depression",
      "Chronic pain",
      "OCD",
      "Stress",
      "Substance use disorders"
    ],
    structure: {
      format: "Individual or group",
      typicalDuration: "8-12 sessions",
      sessionFrequency: "Weekly, 50-60 minutes"
    },
    sessions: [
      {
        title: "Session 1: Creative Hopelessness and Introduction to ACT",
        description: "Explore the workability of current strategies and introduce ACT model",
        duration: "50-60 minutes",
        goals: [
          "Build therapeutic relationship",
          "Explore client's experience with previous coping strategies",
          "Introduce concept of 'creative hopelessness'",
          "Present basic ACT framework"
        ],
        activities: [
          {
            title: "Exploring Control Strategies",
            description: "Examine effectiveness of control and avoidance strategies",
            steps: [
              "Ask client to list strategies they've used to control difficult thoughts/feelings",
              "Explore short-term vs. long-term effectiveness of these strategies",
              "Introduce metaphor: 'Person in a Hole' (digging to escape only deepens the hole)",
              "Guide discussion on workability rather than rightness/wrongness of strategies"
            ],
            materials: [
              "Worksheet listing common control strategies",
              "Workability assessment chart"
            ],
            tips: [
              "Focus on personal experience, not theoretical effectiveness",
              "Validate that control strategies often make sense",
              "Emphasize short-term vs. long-term effects",
              "Approach with genuine curiosity, not as a 'gotcha'"
            ]
          },
          {
            title: "Introducing the ACT Model",
            description: "Present overview of psychological flexibility model",
            steps: [
              "Introduce the six core ACT processes (hexaflex)",
              "Explain psychological flexibility as goal of therapy",
              "Discuss willingness as alternative to control",
              "Use 'Passengers on the Bus' metaphor to illustrate relationship with difficult experiences"
            ]
          }
        ],
        homework: {
          title: "Workability Diary",
          description: "Track control strategies and their workability",
          instructions: [
            "Notice difficult thoughts/feelings that arise",
            "Record strategies used to control or avoid them",
            "Note immediate and longer-term effects of these strategies",
            "Rate workability of each strategy (0-10)",
            "Practice 'Dropping the Rope' metaphor when noticing struggles"
          ]
        }
      }
    ],
    resources: [
      {
        title: "Get Out of Your Mind and Into Your Life",
        url: "https://www.newharbinger.com/9781572244252/get-out-of-your-mind-and-into-your-life/",
        description: "Self-help ACT workbook by Steven Hayes"
      },
      {
        title: "Association for Contextual Behavioral Science",
        url: "https://contextualscience.org/",
        description: "Professional organization for ACT practitioners"
      },
      {
        title: "Happiness Trap",
        url: "https://thehappinesstrap.com/",
        description: "Resources from Russ Harris"
      }
    ]
  },
  ipt: {
    name: "Interpersonal Therapy (IPT)",
    description: "A time-limited approach focusing on interpersonal issues as a way to improve depressive symptoms.",
    keyPrinciples: [
      "Depression occurs in interpersonal context",
      "Focus on one of four interpersonal problem areas",
      "Here-and-now focus rather than childhood experiences",
      "Communication analysis and development of social skills"
    ],
    indications: [
      "Major depression",
      "Bipolar disorder",
      "Eating disorders",
      "Perinatal depression",
      "Interpersonal difficulties"
    ],
    structure: {
      format: "Individual",
      typicalDuration: "12-16 sessions",
      sessionFrequency: "Weekly, 50-60 minutes"
    },
    sessions: [
      {
        title: "Session 1-3: Initial Phase - Assessment and Focus Area Selection",
        description: "Assess symptoms, provide diagnosis, and identify primary interpersonal problem area",
        duration: "50-60 minutes per session",
        goals: [
          "Conduct interpersonal inventory",
          "Provide diagnosis and sick role",
          "Select primary problem area",
          "Set treatment goals"
        ],
        activities: [
          {
            title: "Interpersonal Inventory",
            description: "Comprehensive assessment of significant relationships",
            steps: [
              "Create relationship map of important people in client's life",
              "Explore nature and quality of each relationship",
              "Identify patterns across relationships",
              "Connect relationship patterns to depressive symptoms",
              "Discuss expectations, disappointments, and changes in relationships"
            ],
            materials: [
              "Relationship mapping worksheet",
              "IPT problem area assessment form"
            ]
          },
          {
            title: "Problem Area Selection",
            description: "Identify primary IPT focus area",
            steps: [
              "Explain the four IPT problem areas: grief, role disputes, role transitions, interpersonal deficits",
              "Review evidence for each area from interpersonal inventory",
              "Collaboratively select primary area for focus",
              "Establish clear connection between problem area and depressive symptoms",
              "Formulate initial treatment goals specific to chosen area"
            ],
            tips: [
              "Focus on only one or two problem areas",
              "Choose most relevant to current depression",
              "Frame problems interpersonally, not intrapsychically",
              "Be concrete and specific about goals"
            ]
          }
        ],
        homework: {
          title: "Relationship and Mood Monitoring",
          description: "Track interpersonal interactions and mood correlations",
          instructions: [
            "Complete daily mood rating (0-10)",
            "Record significant interpersonal interactions",
            "Note emotions before, during, and after interactions",
            "Identify patterns between interactions and mood shifts",
            "Note communication patterns that seem helpful or unhelpful"
          ]
        }
      }
    ],
    resources: [
      {
        title: "Comprehensive Guide to Interpersonal Psychotherapy",
        url: "https://www.guilford.com/books/Comprehensive-Guide-to-Interpersonal-Psychotherapy/Weissman-Markowitz-Klerman/9781462538584",
        description: "Detailed manual by Weissman, Markowitz & Klerman"
      },
      {
        title: "International Society for Interpersonal Psychotherapy",
        url: "https://interpersonalpsychotherapy.org/",
        description: "Professional organization for IPT"
      },
      {
        title: "IPT Institute",
        url: "https://iptinstitute.com/",
        description: "Training and certification in IPT"
      }
    ]
  },
  psychodynamic: {
    name: "Psychodynamic Therapy",
    description: "An approach that focuses on unconscious processes and how they influence current behavior, especially through the therapeutic relationship.",
    keyPrinciples: [
      "Unconscious motivation and conflict",
      "Importance of early development and attachment",
      "Transference and countertransference",
      "Defense mechanisms",
      "Gaining insight"
    ],
    indications: [
      "Depression",
      "Anxiety",
      "Personality disorders",
      "Relationship difficulties",
      "Identity issues",
      "Complex trauma"
    ],
    structure: {
      format: "Individual",
      typicalDuration: "6 months to several years",
      sessionFrequency: "1-2 times weekly, 45-50 minutes"
    },
    sessions: [
      {
        title: "Early Sessions: Building Alliance and Assessment",
        description: "Establish therapeutic relationship and begin exploring patterns",
        duration: "50 minutes",
        goals: [
          "Create safe, containing environment",
          "Begin to identify recurring patterns",
          "Observe defenses and resistance",
          "Establish therapeutic frame"
        ],
        activities: [
          {
            title: "Free Association and Active Listening",
            description: "Facilitate open exploration of client's thoughts and feelings",
            steps: [
              "Explain free association process",
              "Use open-ended questions and reflective silence",
              "Note themes, repetitions, and emotional tone",
              "Pay attention to what is avoided or difficult to discuss",
              "Begin noticing potential defense mechanisms"
            ],
            tips: [
              "Follow client's lead rather than directing",
              "Notice your own emotional reactions",
              "Pay attention to gaps, inconsistencies, and avoidances",
              "Hold therapeutic frame consistently"
            ]
          },
          {
            title: "Early Pattern Recognition",
            description: "Begin identifying recurring relational patterns",
            steps: [
              "Listen for repetitive relationship dynamics",
              "Note similarities between past and present relationships",
              "Observe how childhood relationships might be replicated",
              "Pay attention to ways client relates to therapist",
              "Make gentle, tentative observations about patterns"
            ]
          }
        ],
        homework: {
          title: "Dream and Pattern Journaling",
          description: "Record dreams and notice relationship patterns",
          instructions: [
            "Keep dream journal - write down dreams immediately upon waking",
            "Note recurring relationship patterns in daily life",
            "Record strong emotional reactions and what preceded them",
            "Notice situations that feel familiar or evoke strong responses",
            "Bring material to next session, but without analyzing it extensively beforehand"
          ]
        }
      }
    ],
    resources: [
      {
        title: "Psychodynamic Diagnostic Manual (PDM-2)",
        url: "https://www.guilford.com/books/Psychodynamic-Diagnostic-Manual/Lingiardi-McWilliams/9781462538010",
        description: "Comprehensive diagnostic reference"
      },
      {
        title: "American Psychoanalytic Association",
        url: "https://apsa.org/",
        description: "Professional organization for psychodynamic therapy"
      },
      {
        title: "Psychotherapy.net",
        url: "https://www.psychotherapy.net/",
        description: "Training videos and resources"
      }
    ]
  },
  exposure: {
    name: "Exposure Therapy",
    description: "A behavioral therapy approach that involves exposing clients to feared stimuli in a safe, controlled manner to reduce anxiety and avoidance.",
    keyPrinciples: [
      "Emotional processing theory",
      "Habituation to feared stimuli",
      "Inhibitory learning",
      "Fear extinction",
      "Eliminating safety behaviors and avoidance"
    ],
    indications: [
      "Specific phobias",
      "Social anxiety disorder",
      "Panic disorder",
      "OCD",
      "PTSD",
      "Health anxiety"
    ],
    structure: {
      format: "Individual primarily",
      typicalDuration: "8-15 sessions",
      sessionFrequency: "Weekly, 60-90 minutes"
    },
    sessions: [
      {
        title: "Session 1: Psychoeducation and Treatment Planning",
        description: "Educate client about anxiety and exposure therapy principles",
        duration: "60 minutes",
        goals: [
          "Provide psychoeducation about anxiety mechanisms",
          "Introduce exposure therapy rationale",
          "Create fear hierarchy",
          "Set expectations and address concerns about treatment"
        ],
        activities: [
          {
            title: "Anxiety Psychoeducation",
            description: "Explain how anxiety works and is maintained",
            steps: [
              "Explain fight-flight-freeze response and its evolutionary purpose",
              "Describe anxiety cycle: trigger → thoughts → physical sensations → avoidance → reinforcement",
              "Discuss how avoidance maintains anxiety",
              "Normalize anxiety as natural but potentially problematic when excessive",
              "Use simple diagrams to illustrate concepts"
            ],
            materials: [
              "Anxiety cycle handout",
              "Physical symptoms checklist",
              "Avoidance patterns worksheet"
            ]
          },
          {
            title: "Creating a Fear Hierarchy",
            description: "Construct graduated hierarchy of feared situations",
            steps: [
              "Brainstorm anxiety-provoking situations related to client's concern",
              "Rate each situation on SUDs scale (Subjective Units of Distress, 0-100)",
              "Organize into hierarchy from least to most distressing",
              "Include approximately 10-15 items with good gradation",
              "Discuss potential in-session and between-session exposures"
            ],
            tips: [
              "Ensure adequate spacing between hierarchy items",
              "Be specific and concrete about each situation",
              "Include variety of relevant stimuli or situations",
              "Focus on clinically relevant fears, not general anxieties"
            ]
          }
        ],
        homework: {
          title: "Anxiety Monitoring and Hierarchy Refinement",
          description: "Track anxiety triggers and refine exposure hierarchy",
          instructions: [
            "Complete daily anxiety monitoring log",
            "Record situations, thoughts, physical sensations, behaviors",
            "Rate anxiety level (0-100) for each episode",
            "Note any avoided situations or safety behaviors used",
            "Think of additional items for fear hierarchy"
          ]
        }
      },
      {
        title: "Session 2: First Exposure Practice",
        description: "Conduct initial exposure exercise and process experience",
        duration: "60-90 minutes",
        goals: [
          "Review anxiety monitoring homework",
          "Reinforce exposure rationale and process",
          "Conduct first exposure exercise",
          "Process experience and learning",
          "Plan between-session exposure practice"
        ],
        activities: [
          {
            title: "First Exposure Exercise",
            description: "Guide client through exposure to lower-hierarchy item",
            steps: [
              "Select appropriate item from lower third of hierarchy",
              "Discuss expectations and predictions before exposure",
              "Eliminate safety behaviors and avoidance tactics",
              "Guide client through exposure, remaining in situation until anxiety decreases",
              "Take SUDs ratings every 5 minutes during exposure",
              "Continue until anxiety reduces by at least 50% from peak"
            ],
            tips: [
              "Model calm, matter-of-fact approach",
              "Provide encouragement without excessive reassurance",
              "Focus client on present-moment experience rather than distraction",
              "Praise courage and engagement regardless of outcome"
            ]
          },
          {
            title: "Post-Exposure Processing",
            description: "Review and consolidate learning from exposure",
            steps: [
              "Discuss client's experience during exposure",
              "Compare actual outcome with predicted outcome",
              "Identify unhelpful thoughts that arose during exposure",
              "Discuss what client learned from the exercise",
              "Explore implications for client's beliefs about anxiety and coping"
            ]
          }
        ],
        homework: {
          title: "Between-Session Exposure Practice",
          description: "Independent exposure to similar-level hierarchy items",
          instructions: [
            "Practice similar-level exposures 3-4 times before next session",
            "Complete exposure record for each practice (situation, SUDs before/during/after, key thoughts, what learned)",
            "Stay in each situation until anxiety decreases by at least 30-50%",
            "Note any safety behaviors and try to eliminate them",
            "Record new insights or questions that arise during practice"
          ]
        }
      }
    ],
    resources: [
      {
        title: "Exposure Therapy for Anxiety: Principles and Practice",
        url: "https://www.guilford.com/books/Exposure-Therapy-for-Anxiety/Abramowitz-Deacon-Whiteside/9781462530298",
        description: "Comprehensive guide by Abramowitz, Deacon & Whiteside"
      },
      {
        title: "Center for the Treatment and Study of Anxiety",
        url: "https://www.med.upenn.edu/ctsa/",
        description: "Research center with exposure therapy protocols"
      },
      {
        title: "Anxiety and Depression Association of America",
        url: "https://adaa.org/",
        description: "Resources for professionals and patients"
      }
    ]
  },
  mindfulness: {
    name: "Mindfulness-Based Interventions",
    description: "Approaches that incorporate mindfulness meditation and present-moment awareness to improve psychological well-being.",
    keyPrinciples: [
      "Present-moment awareness",
      "Non-judgmental observation",
      "Acceptance of experience",
      "Decentering from thoughts",
      "Self-compassion"
    ],
    indications: [
      "Stress",
      "Anxiety",
      "Depression relapse prevention",
      "Chronic pain",
      "Emotion dysregulation",
      "Addictive behaviors"
    ],
    structure: {
      format: "Individual or group",
      typicalDuration: "8 weeks (MBSR/MBCT format)",
      sessionFrequency: "Weekly, 90-120 minutes for groups; 50-60 minutes individual"
    },
    sessions: [
      {
        title: "Session 1: Introduction to Mindfulness",
        description: "Introduce mindfulness concepts and practices",
        duration: "50-60 minutes (individual)",
        goals: [
          "Define mindfulness and its benefits",
          "Introduce key mindfulness attitudes",
          "Practice initial mindfulness exercises",
          "Establish daily practice commitment"
        ],
        activities: [
          {
            title: "Mindfulness Psychoeducation",
            description: "Introduce core concepts and attitudes of mindfulness",
            steps: [
              "Define mindfulness as present-moment, non-judgmental awareness",
              "Discuss autopilot mode vs. mindful awareness",
              "Introduce key attitudes: non-judging, patience, beginner's mind, trust, non-striving, acceptance, letting go",
              "Explain difference between reacting and responding",
              "Discuss research on benefits of mindfulness practice"
            ],
            materials: [
              "Mindfulness attitudes handout",
              "Mindfulness vs. autopilot examples chart"
            ]
          },
          {
            title: "Raisin Exercise",
            description: "Classic introductory mindfulness practice using a raisin",
            steps: [
              "Provide participant with a raisin",
              "Guide through mindful observation (looking at it as if never seen before)",
              "Direct attention to texture, weight, color, etc.",
              "Guide through smelling the raisin mindfully",
              "Continue with mindful placement in mouth, taste, chewing, swallowing",
              "Discuss experience and contrast with usual automatic eating"
            ],
            tips: [
              "Use slow, gentle voice during guidance",
              "Allow adequate silence between instructions",
              "Participate in exercise yourself",
              "Focus discussion on direct experience rather than concepts"
            ]
          },
          {
            title: "Brief Breathing Space Practice",
            description: "Short formal meditation focusing on breath",
            steps: [
              "Guide into comfortable but alert posture",
              "Direct attention to sensations of breathing",
              "Instruct to notice when mind wanders and gently return focus",
              "Start with just 3-5 minutes for beginners",
              "Process experience, normalizing mind-wandering",
              "Emphasize that noticing wandering and returning is the practice"
            ]
          }
        ],
        homework: {
          title: "Daily Mindfulness Practice",
          description: "Begin establishing regular mindfulness habit",
          instructions: [
            "Practice 5-minute breathing meditation daily",
            "Complete one routine activity mindfully each day (e.g., showering, washing dishes)",
            "Use provided audio guidance if helpful",
            "Record observations in mindfulness journal",
            "Note obstacles to practice and experiences during practice"
          ]
        }
      }
    ],
    resources: [
      {
        title: "Mindfulness-Based Cognitive Therapy for Depression",
        url: "https://www.guilford.com/books/Mindfulness-Based-Cognitive-Therapy-for-Depression/Segal-Williams-Teasdale/9781462537037",
        description: "Definitive MBCT guide by Segal, Williams & Teasdale"
      },
      {
        title: "Center for Mindfulness",
        url: "https://www.umassmed.edu/cfm/",
        description: "Birthplace of MBSR with Jon Kabat-Zinn"
      },
      {
        title: "Insight Timer",
        url: "https://insighttimer.com/",
        description: "Free meditation app with guided practices"
      }
    ]
  },
  "behavioral-activation": {
    name: "Behavioral Activation",
    description: "A structured approach that helps clients increase engagement in rewarding activities and reduce avoidance behaviors.",
    keyPrinciples: [
      "Activity affects mood (not vice versa)",
      "Gradual re-engagement with rewarding activities",
      "Breaking avoidance cycles",
      "External focus rather than internal rumination",
      "Schedule-based rather than mood-based activity"
    ],
    indications: [
      "Depression",
      "Low motivation",
      "Behavioral avoidance",
      "Social withdrawal",
      "Anhedonia"
    ],
    structure: {
      format: "Individual or group",
      typicalDuration: "8-12 sessions",
      sessionFrequency: "Weekly, 50-60 minutes"
    },
    sessions: [
      {
        title: "Session 1: BA Rationale and Assessment",
        description: "Introduce behavioral model of depression and assess current activity",
        duration: "50-60 minutes",
        goals: [
          "Provide behavioral activation rationale",
          "Assess current activity patterns",
          "Identify values and life domains",
          "Begin activity monitoring"
        ],
        activities: [
          {
            title: "Depression Cycle Education",
            description: "Explain behavioral understanding of depression maintenance",
            steps: [
              "Explain depression cycle: low mood → inactivity → fewer rewards → lower mood",
              "Describe how avoidance provides short-term relief but worsens depression long-term",
              "Discuss 'outside-in' vs. 'inside-out' approaches to feeling better",
              "Use metaphors: 'Waiting for the train' vs. 'Walking along the tracks'",
              "Emphasize acting according to plan/goals rather than current feelings"
            ],
            materials: [
              "Depression cycle diagram",
              "BA treatment overview handout"
            ],
            tips: [
              "Personalize with examples from client's experience",
              "Address 'why can't I just snap out of it?' misconception",
              "Validate that inactivity/withdrawal makes sense as response to low mood",
              "Present as experiment rather than guaranteed cure"
            ]
          },
          {
            title: "Values and Life Areas Assessment",
            description: "Identify client's values across life domains",
            steps: [
              "Introduce concept of values as directions rather than destinations",
              "Review major life domains: relationships, work/education, leisure, health, spirituality, etc.",
              "For each domain, explore what would make life meaningful/satisfying",
              "Differentiate between values and goals",
              "Rate importance of each domain and current satisfaction/consistency with values"
            ],
            materials: [
              "Values assessment worksheet",
              "Life domains pie chart"
            ]
          }
        ],
        homework: {
          title: "Activity and Mood Monitoring",
          description: "Track daily activities and corresponding mood",
          instructions: [
            "Complete activity diary hourly or for significant time blocks",
            "Rate mood (0-10) and sense of achievement/pleasure for each activity",
            "Include all activities, even 'doing nothing' or 'lying in bed'",
            "Note avoided activities or things you would have done pre-depression",
            "Don't try to change anything yet - just observe patterns"
          ]
        }
      },
      {
        title: "Session 2: Activity Scheduling",
        description: "Begin scheduling value-based activities",
        duration: "50-60 minutes",
        goals: [
          "Review activity monitoring",
          "Identify activity patterns and their impact on mood",
          "Generate potential activities aligned with values",
          "Begin activity scheduling with SMART goals"
        ],
        activities: [
          {
            title: "Activity Monitoring Review",
            description: "Analyze patterns in activity and mood",
            steps: [
              "Review completed activity diary",
              "Identify patterns: What activities improve mood? Worsen mood?",
              "Look for avoidance patterns and their consequences",
              "Notice activities with high achievement/pleasure ratings",
              "Connect observations to depression cycle discussed previously"
            ]
          },
          {
            title: "Activity Generation and Scheduling",
            description: "Create initial activity plan focused on values",
            steps: [
              "Generate list of potential activities in different life domains",
              "Rate activities for difficulty (1-10) and expected pleasure/achievement",
              "Start with easier activities that offer good reward potential",
              "Schedule 3-5 specific activities for coming week using SMART criteria",
              "Troubleshoot potential obstacles to completion",
              "Emphasize importance of following schedule regardless of mood"
            ],
            materials: [
              "Activity menu worksheet",
              "Weekly schedule form"
            ],
            tips: [
              "Start small - success builds momentum",
              "Include mix of pleasure and mastery activities",
              "Be very specific about what, when, where, how long",
              "Consider starting with activities previously enjoyed but dropped",
              "Focus on activities, not outcomes (e.g., 'go for walk' not 'feel better')"
            ]
          }
        ],
        homework: {
          title: "Scheduled Activity Completion",
          description: "Follow through on planned activities and track results",
          instructions: [
            "Complete all scheduled activities regardless of mood",
            "Record mood before and after each activity",
            "Note any difficulties encountered and how handled",
            "Continue monitoring all activities and mood throughout week",
            "Prepare to discuss experience at next session"
          ]
        }
      }
    ],
    resources: [
      {
        title: "Behavioral Activation for Depression: A Clinician's Guide",
        url: "https://www.guilford.com/books/Behavioral-Activation-for-Depression/Martell-Dimidjian-Herman-Dunn/9781462510177",
        description: "Comprehensive clinical guide by Martell et al."
      },
      {
        title: "The Depression Workbook",
        url: "https://www.newharbinger.com/9781684035861/the-depression-workbook/",
        description: "Self-help workbook with behavioral activation components"
      },
      {
        title: "BATD Treatment Manual",
        url: "https://www.div12.org/wp-content/uploads/2016/10/BATD-Protocol-Modified-for-Veterans.pdf",
        description: "Brief Behavioral Activation Treatment for Depression protocol"
      }
    ]
  }
};
