export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  createdAt: Date;
  lastActive: Date;
  onboardingCompleted: boolean;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  notificationTiming: string;
  workingStyle: 'structured' | 'flexible' | 'accountability' | 'independent';
  energyPatterns: string[];
  successPersonality: string;
  preferredActionTypes: string[];
}

export interface GoalHierarchy {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  someday: Goal;
  fiveYear: Goal;
  oneYear: Goal;
  monthly: Goal;
  weekly: Goal;
  daily: Goal;
  rightNow: Goal;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  reasoning: string;
  successMetrics: string[];
  obstacles: string[];
  resources: string[];
  dueDate?: Date;
  completed: boolean;
  progress: number;
  timeframe: 'someday' | 'five-year' | 'one-year' | 'monthly' | 'weekly' | 'daily' | 'right-now';
}

export interface OnboardingData {
  step: number;
  detailedPrompt: string;
  contextSelectors: {
    primaryFocus: string[];
    lifeStage: string;
    timeCommitment: string;
    workingStyle: string;
    resources: string;
  };
  generatedPlan?: GoalHierarchy;
  refinementFeedback?: string;
  personalityAssessment?: string;
  completed: boolean;
}

export interface DailyAction {
  id: string;
  goalId: string;
  title: string;
  description: string;
  estimatedTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  energyRequired: 'low' | 'medium' | 'high';
  steps: string[];
  completed: boolean;
  completedAt?: Date;
  feedback?: string;
  successProbability: number;
}

export interface UserProgress {
  streak: number;
  totalActions: number;
  completedActions: number;
  lastActionDate?: Date;
  weeklyStats: {
    week: string;
    completed: number;
    planned: number;
  }[];
  monthlyMilestones: {
    month: string;
    achieved: boolean;
    progress: number;
  }[];
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  currentFlow: 'landing' | 'onboarding' | 'dashboard';
  onboardingData: OnboardingData;
  goalHierarchy: GoalHierarchy | null;
  dailyActions: DailyAction[];
  userProgress: UserProgress;
  isLoading: boolean;
  error: string | null;
}