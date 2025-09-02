import { GoalHierarchy, Goal, OnboardingData, DailyAction, UserProgress } from '../types';

// Simulate AI delay and processing
const simulateAIDelay = (min: number = 1000, max: number = 3000): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Generate unique IDs
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Simulate comprehensive goal hierarchy generation
export const generatePersonalizedPlan = async (onboardingData: OnboardingData): Promise<GoalHierarchy> => {
  await simulateAIDelay(2000, 4000);

  const userId = 'current-user'; // In real app, this would come from auth
  const baseId = generateId();

  // Simulate AI analysis of user input to generate personalized goals
  const focusArea = onboardingData.contextSelectors.primaryFocus[0] || 'personal-growth';
  const timeCommitment = onboardingData.contextSelectors.timeCommitment;
  
  // Mock personalized goal generation based on user input
  const someday: Goal = {
    id: `${baseId}-someday`,
    title: getPersonalizedSomedayGoal(onboardingData.detailedPrompt, focusArea),
    description: `AI-refined vision: ${onboardingData.detailedPrompt.slice(0, 200)}...`,
    reasoning: "This refined someday goal captures your core ambition while adding specificity and measurable outcomes.",
    successMetrics: getSuccessMetrics(focusArea),
    obstacles: getObstacles(focusArea),
    resources: getResources(focusArea),
    completed: false,
    progress: 0,
    timeframe: 'someday'
  };

  const fiveYear: Goal = {
    id: `${baseId}-five-year`,
    title: getFiveYearGoal(someday.title, focusArea),
    description: "Major milestone that must be achieved to realize your someday goal",
    reasoning: "This 5-year milestone represents the critical breakthrough point in your journey.",
    successMetrics: getFiveYearMetrics(focusArea),
    obstacles: ["Market changes", "Skill gaps", "Resource constraints"],
    resources: ["Industry connections", "Skill development programs", "Financial planning"],
    completed: false,
    progress: 0,
    timeframe: 'five-year'
  };

  const oneYear: Goal = {
    id: `${baseId}-one-year`,
    title: getOneYearGoal(fiveYear.title, focusArea),
    description: "This year's target that keeps you on track for your 5-year milestone",
    reasoning: "This annual goal creates momentum and builds the foundation for your 5-year success.",
    successMetrics: getOneYearMetrics(focusArea),
    obstacles: ["Time management", "Consistency", "Motivation"],
    resources: ["Time blocking", "Accountability partner", "Progress tracking"],
    completed: false,
    progress: 0,
    timeframe: 'one-year'
  };

  const monthly: Goal = {
    id: `${baseId}-monthly`,
    title: getMonthlyGoal(oneYear.title, focusArea),
    description: "This month's focus that supports your annual target",
    reasoning: "This monthly focus breaks down your yearly goal into manageable chunks.",
    successMetrics: getMonthlyMetrics(focusArea),
    obstacles: ["Daily distractions", "Competing priorities"],
    resources: ["Daily routine", "Weekly reviews", "Support network"],
    completed: false,
    progress: 0,
    timeframe: 'monthly'
  };

  const weekly: Goal = {
    id: `${baseId}-weekly`,
    title: getWeeklyGoal(monthly.title, focusArea),
    description: "This week's actions supporting your monthly focus",
    reasoning: "These weekly actions create consistent progress toward your monthly goal.",
    successMetrics: getWeeklyMetrics(focusArea),
    obstacles: ["Schedule conflicts", "Energy management"],
    resources: ["Calendar blocking", "Energy tracking"],
    completed: false,
    progress: 0,
    timeframe: 'weekly'
  };

  const daily: Goal = {
    id: `${baseId}-daily`,
    title: getDailyGoal(weekly.title, focusArea),
    description: "Today's priority action supporting this week's focus",
    reasoning: "This daily action creates immediate momentum toward your weekly goal.",
    successMetrics: getDailyMetrics(focusArea),
    obstacles: ["Procrastination", "Interruptions"],
    resources: ["Focus timer", "Distraction blocker"],
    completed: false,
    progress: 0,
    timeframe: 'daily'
  };

  const rightNow: Goal = {
    id: `${baseId}-right-now`,
    title: getRightNowAction(daily.title, focusArea, timeCommitment),
    description: "Immediate 15-30 minute action you can take right now",
    reasoning: "This immediate action builds momentum and starts your journey today.",
    successMetrics: ["Action completed", "Next steps identified"],
    obstacles: ["Getting started", "Perfectionism"],
    resources: ["Timer set for 25 minutes", "Notebook for notes"],
    completed: false,
    progress: 0,
    timeframe: 'right-now'
  };

  return {
    id: baseId,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
    someday,
    fiveYear,
    oneYear,
    monthly,
    weekly,
    daily,
    rightNow
  };
};

// Helper functions for personalized goal generation
const getPersonalizedSomedayGoal = (prompt: string, focus: string): string => {
  const goals = {
    'career': 'Become a recognized leader in your field with significant impact',
    'health': 'Achieve optimal health and vitality throughout your life',
    'relationships': 'Build deep, meaningful relationships and a strong support network',
    'finances': 'Achieve financial freedom and security for your family',
    'personal-growth': 'Become the best version of yourself through continuous growth',
    'creative': 'Express your creativity and share your unique gifts with the world'
  };
  return goals[focus as keyof typeof goals] || 'Achieve your ultimate life vision';
};

const getFiveYearGoal = (somedayGoal: string, focus: string): string => {
  const goals = {
    'career': 'Lead a high-impact team or start your own successful venture',
    'health': 'Maintain peak physical condition with sustainable habits',
    'relationships': 'Have a thriving family and strong professional network',
    'finances': 'Build substantial assets and multiple income streams',
    'personal-growth': 'Master key skills and develop emotional intelligence',
    'creative': 'Establish yourself as a creative professional with recognition'
  };
  return goals[focus as keyof typeof goals] || 'Achieve major milestone toward ultimate vision';
};

const getOneYearGoal = (fiveYearGoal: string, focus: string): string => {
  const goals = {
    'career': 'Secure promotion or launch initial business phase',
    'health': 'Establish consistent fitness routine and nutrition habits',
    'relationships': 'Strengthen existing relationships and expand network',
    'finances': 'Increase income by 25% and establish investment portfolio',
    'personal-growth': 'Complete major skill development program',
    'creative': 'Complete and launch first major creative project'
  };
  return goals[focus as keyof typeof goals] || 'Complete foundational work for 5-year milestone';
};

const getMonthlyGoal = (yearGoal: string, focus: string): string => {
  const goals = {
    'career': 'Complete key project or skill certification',
    'health': 'Establish workout routine and meal prep system',
    'relationships': 'Deepen connection with 3 important people',
    'finances': 'Increase monthly savings and research investments',
    'personal-growth': 'Complete one course or read 4 development books',
    'creative': 'Finish one significant creative piece or project phase'
  };
  return goals[focus as keyof typeof goals] || 'Make significant progress on annual goal';
};

const getWeeklyGoal = (monthlyGoal: string, focus: string): string => {
  const goals = {
    'career': 'Complete project milestone and network with 2 professionals',
    'health': 'Exercise 5 times and prep healthy meals for the week',
    'relationships': 'Have meaningful conversation with family/friends',
    'finances': 'Track expenses and research one investment option',
    'personal-growth': 'Complete course module and practice new skill',
    'creative': 'Work on project 5 times and get feedback from peers'
  };
  return goals[focus as keyof typeof goals] || 'Complete weekly actions supporting monthly focus';
};

const getDailyGoal = (weeklyGoal: string, focus: string): string => {
  const goals = {
    'career': 'Work on key project for 1 hour',
    'health': 'Exercise for 30 minutes and eat nutritious meals',
    'relationships': 'Reach out to connect with someone important',
    'finances': 'Review budget and track daily expenses',
    'personal-growth': 'Study or practice skill for 45 minutes',
    'creative': 'Spend 1 hour on creative work'
  };
  return goals[focus as keyof typeof goals] || 'Take focused action on weekly goal';
};

const getRightNowAction = (dailyGoal: string, focus: string, timeCommitment: string): string => {
  const isLowTime = timeCommitment === '15min/day';
  
  const actions = {
    'career': isLowTime ? 'Review and prioritize your current project tasks' : 'Start working on your most important project task',
    'health': isLowTime ? 'Do 10 minutes of stretching or movement' : 'Go for a 20-minute walk or do a quick workout',
    'relationships': isLowTime ? 'Send a thoughtful message to someone important' : 'Call someone you care about for a meaningful conversation',
    'finances': isLowTime ? 'Check your account balance and review yesterday\'s spending' : 'Review your monthly budget and identify savings opportunities',
    'personal-growth': isLowTime ? 'Read one article related to your growth area' : 'Start studying or practicing your target skill',
    'creative': isLowTime ? 'Sketch an idea or write down creative thoughts' : 'Begin working on your current creative project'
  };
  
  return actions[focus as keyof typeof actions] || 'Take the first small step toward your daily goal';
};

// Helper functions for generating success metrics and obstacles
const getSuccessMetrics = (focus: string): string[] => {
  const metrics = {
    'career': ['Leadership role achieved', 'Team impact measured', 'Industry recognition received'],
    'health': ['Fitness goals met', 'Energy levels sustained', 'Health markers optimal'],
    'relationships': ['Relationship satisfaction high', 'Support network strong', 'Social connections meaningful'],
    'finances': ['Financial goals achieved', 'Security established', 'Wealth building on track'],
    'personal-growth': ['Skills mastered', 'Confidence increased', 'Self-awareness developed'],
    'creative': ['Creative work completed', 'Audience engaged', 'Artistic vision realized']
  };
  return metrics[focus as keyof typeof metrics] || ['Progress measurable', 'Goals achieved', 'Vision realized'];
};

const getObstacles = (focus: string): string[] => {
  const obstacles = {
    'career': ['Market competition', 'Skill requirements', 'Time constraints'],
    'health': ['Consistency challenges', 'Motivation fluctuations', 'Lifestyle factors'],
    'relationships': ['Time availability', 'Communication barriers', 'Geographic constraints'],
    'finances': ['Economic uncertainty', 'Knowledge gaps', 'Spending habits'],
    'personal-growth': ['Self-doubt', 'Time management', 'Information overload'],
    'creative': ['Creative blocks', 'Technical limitations', 'Market demands']
  };
  return obstacles[focus as keyof typeof obstacles] || ['Time constraints', 'Motivation challenges', 'External factors'];
};

const getResources = (focus: string): string[] => {
  const resources = {
    'career': ['Professional network', 'Skill development programs', 'Industry mentors'],
    'health': ['Fitness apps', 'Nutrition guidance', 'Health professionals'],
    'relationships': ['Communication tools', 'Social events', 'Relationship books'],
    'finances': ['Financial advisors', 'Investment platforms', 'Education resources'],
    'personal-growth': ['Online courses', 'Books and podcasts', 'Coaching programs'],
    'creative': ['Creative tools', 'Online communities', 'Skill tutorials']
  };
  return resources[focus as keyof typeof resources] || ['Online resources', 'Community support', 'Professional guidance'];
};

const getFiveYearMetrics = (focus: string): string[] => {
  return [`${focus} milestone achieved`, 'Major breakthrough accomplished', 'Foundation established for someday goal'];
};

const getOneYearMetrics = (focus: string): string[] => {
  return [`Annual ${focus} target met`, 'Quarterly milestones achieved', 'On track for 5-year goal'];
};

const getMonthlyMetrics = (focus: string): string[] => {
  return [`Monthly ${focus} objective completed`, 'Weekly targets consistently met', 'Progress momentum maintained'];
};

const getWeeklyMetrics = (focus: string): string[] => {
  return [`Weekly ${focus} actions completed`, 'Daily habits established', 'Progress visible'];
};

const getDailyMetrics = (focus: string): string[] => {
  return [`Daily ${focus} action completed`, 'Time commitment met', 'Forward progress made'];
};

// Simulate plan refinement based on user feedback
export const refinePlan = async (
  originalPlan: GoalHierarchy, 
  feedback: string, 
  adjustmentType: string[]
): Promise<GoalHierarchy> => {
  await simulateAIDelay(1500, 2500);

  // Simulate AI refinement based on feedback
  const refinedPlan = { ...originalPlan };
  
  if (adjustmentType.includes('timeline-aggressive')) {
    // Adjust timelines to be less aggressive
    refinedPlan.rightNow.title = refinedPlan.rightNow.title.replace(/1 hour|45 minutes/, '20 minutes');
    refinedPlan.daily.title = refinedPlan.daily.title.replace(/1 hour/, '30 minutes');
  }
  
  if (adjustmentType.includes('resources')) {
    // Adjust resource requirements
    refinedPlan.rightNow.resources = ['Simple tools only', 'No special equipment needed'];
    refinedPlan.daily.resources = ['Basic resources', 'Existing tools'];
  }

  refinedPlan.updatedAt = new Date();
  
  return refinedPlan;
};

// Generate optimized daily action based on user context
export const generateDailyAction = async (
  goalHierarchy: GoalHierarchy,
  userContext: {
    timeAvailable: string;
    energyLevel: string;
    preferences: string[];
    historicalSuccess: string[];
  }
): Promise<DailyAction> => {
  await simulateAIDelay(800, 1500);

  const baseAction = goalHierarchy.rightNow;
  const isLowEnergy = userContext.energyLevel === 'low';
  const isLimitedTime = userContext.timeAvailable === '15min';

  return {
    id: generateId(),
    goalId: baseAction.id,
    title: isLimitedTime 
      ? `Quick Start: ${baseAction.title.split(':')[1] || baseAction.title}` 
      : baseAction.title,
    description: baseAction.description,
    estimatedTime: isLimitedTime ? 15 : 30,
    difficulty: isLowEnergy ? 'easy' : 'medium',
    energyRequired: isLowEnergy ? 'low' : 'medium',
    steps: generateActionSteps(baseAction.title, isLimitedTime),
    completed: false,
    successProbability: calculateSuccessProbability(userContext)
  };
};

const generateActionSteps = (actionTitle: string, isQuick: boolean): string[] => {
  if (isQuick) {
    return [
      'Set a 15-minute timer',
      'Clear your workspace of distractions',
      'Start with the easiest part of the task',
      'Make note of what to continue tomorrow'
    ];
  }
  
  return [
    'Set up your workspace for focus',
    'Review what you want to accomplish',
    'Start with the most important element',
    'Work steadily without distractions',
    'Take a 5-minute break if needed',
    'Complete the action and note your progress'
  ];
};

const calculateSuccessProbability = (context: any): number => {
  let probability = 0.7; // Base probability
  
  if (context.energyLevel === 'high') probability += 0.2;
  if (context.timeAvailable !== '15min') probability += 0.1;
  if (context.historicalSuccess.length > 0) probability += 0.1;
  
  return Math.min(probability, 0.95);
};

// Generate personalized motivation message
export const generateMotivation = async (
  user: any,
  progress: UserProgress,
  goalHierarchy: GoalHierarchy
): Promise<{
  dailyMessage: string;
  insight: string;
  encouragement: string;
}> => {
  await simulateAIDelay(500, 1000);

  const streakLevel = progress.streak > 7 ? 'strong' : progress.streak > 3 ? 'building' : 'starting';
  const timeOfDay = new Date().getHours();
  const greeting = timeOfDay < 12 ? 'Good morning' : timeOfDay < 17 ? 'Good afternoon' : 'Good evening';

  return {
    dailyMessage: `${greeting}, ${user.name.split(' ')[0]}! You're ${streakLevel === 'strong' ? 'crushing it with' : 'building momentum with'} your ${progress.streak}-day streak. Ready to make today count toward your ${goalHierarchy.someday.title.toLowerCase()}?`,
    insight: getPersonalizedInsight(progress, streakLevel),
    encouragement: getEncouragement(streakLevel, goalHierarchy)
  };
};

const getPersonalizedInsight = (progress: UserProgress, streakLevel: string): string => {
  const insights = {
    'strong': "You're in the zone! Your consistency is building unstoppable momentum toward your goals.",
    'building': "Great progress! You're developing the habit that will transform your dreams into reality.",
    'starting': "Every expert was once a beginner. Your journey starts with today's single action."
  };
  return insights[streakLevel as keyof typeof insights];
};

const getEncouragement = (streakLevel: string, goalHierarchy: GoalHierarchy): string => {
  const encouragements = {
    'strong': `Your ${goalHierarchy.someday.title.toLowerCase()} is getting closer with each action you take.`,
    'building': `Each day of progress moves you significantly closer to your ${goalHierarchy.fiveYear.title.toLowerCase()}.`,
    'starting': `Today's action is the foundation for everything you want to achieve.`
  };
  return encouragements[streakLevel as keyof typeof encouragements];
};