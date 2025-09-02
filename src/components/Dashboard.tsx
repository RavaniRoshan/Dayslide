import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar } from './ui/calendar';
import { GoalHierarchy, User, DailyAction, UserProgress } from '../types';
import { generateDailyAction, generateMotivation } from '../utils/aiSimulation';

interface DashboardProps {
  user: User;
  goalHierarchy: GoalHierarchy;
  onLogout: () => void;
  onBackToLanding: () => void;
}

export function Dashboard({ user, goalHierarchy, onLogout, onBackToLanding }: DashboardProps) {
  const [currentAction, setCurrentAction] = useState<DailyAction | null>(null);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    streak: 3,
    totalActions: 12,
    completedActions: 10,
    lastActionDate: new Date(Date.now() - 86400000), // Yesterday
    weeklyStats: [
      { week: 'This Week', completed: 5, planned: 7 },
      { week: 'Last Week', completed: 6, planned: 7 },
      { week: '2 Weeks Ago', completed: 4, planned: 7 }
    ],
    monthlyMilestones: [
      { month: 'January', achieved: true, progress: 100 },
      { month: 'February', achieved: false, progress: 75 }
    ]
  });
  const [motivation, setMotivation] = useState<{
    dailyMessage: string;
    insight: string;
    encouragement: string;
  } | null>(null);
  const [actionTimer, setActionTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<'dashboard' | 'goals' | 'progress' | 'calendar'>('dashboard');

  // Load initial data
  useEffect(() => {
    loadDailyAction();
    loadMotivation();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && actionTimer > 0) {
      interval = setInterval(() => {
        setActionTimer((prev) => prev - 1);
      }, 1000);
    } else if (actionTimer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Timer finished - show encouragement
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, actionTimer]);

  const loadDailyAction = async () => {
    setIsLoadingAction(true);
    try {
      const action = await generateDailyAction(goalHierarchy, {
        timeAvailable: '30min',
        energyLevel: 'medium',
        preferences: ['focused-work'],
        historicalSuccess: ['morning-sessions']
      });
      setCurrentAction(action);
    } catch (error) {
      console.error('Error loading daily action:', error);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const loadMotivation = async () => {
    try {
      const motivationData = await generateMotivation(user, userProgress, goalHierarchy);
      setMotivation(motivationData);
    } catch (error) {
      console.error('Error loading motivation:', error);
    }
  };

  const handleCompleteAction = () => {
    if (currentAction) {
      setCurrentAction({ ...currentAction, completed: true, completedAt: new Date() });
      setUserProgress(prev => ({
        ...prev,
        streak: prev.streak + 1,
        completedActions: prev.completedActions + 1,
        lastActionDate: new Date()
      }));
      setShowCompletionModal(true);
      setIsTimerRunning(false);
    }
  };

  const startTimer = (minutes: number) => {
    setActionTimer(minutes * 60);
    setIsTimerRunning(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const renderDashboardHome = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Personalized Welcome */}
      {motivation && (
        <Card className="bg-gradient-to-r from-[#3b82f6]/20 to-[#8b5cf6]/20 border-[#3b82f6]/40">
          <CardContent className="p-6">
            <h2 className="text-[#f8fafc] text-[20px] font-medium mb-2">
              {motivation.dailyMessage}
            </h2>
            <p className="text-[#cbd5e1] text-[14px] mb-3">{motivation.insight}</p>
            <p className="text-[#8b5cf6] text-[14px] font-medium">{motivation.encouragement}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Action */}
        <div className="lg:col-span-2">
          <Card className="bg-[#1e293b]/50 border-[#3b82f6]/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#f8fafc] flex items-center gap-2">
                  <span className="text-[24px]">⚡</span>
                  Today's Focus
                </CardTitle>
                {currentAction && (
                  <Badge className={`${
                    currentAction.completed 
                      ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]/40' 
                      : 'bg-[#8b5cf6]/20 text-[#8b5cf6] border-[#8b5cf6]/40'
                  }`}>
                    {currentAction.completed ? 'Completed ✓' : 'In Progress'}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingAction ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-[#3b82f6]/20 border-t-[#3b82f6] rounded-full animate-spin" />
                </div>
              ) : currentAction ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[#f8fafc] text-[18px] font-medium mb-2">
                      {currentAction.title}
                    </h3>
                    <p className="text-[#cbd5e1] text-[14px] mb-4">
                      {currentAction.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-[#cbd5e1] text-[12px] mb-4">
                      <div className="flex items-center gap-1">
                        <span>⏱️</span>
                        <span>{currentAction.estimatedTime} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>🎯</span>
                        <span>{Math.round(currentAction.successProbability * 100)}% success rate</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>💪</span>
                        <span className="capitalize">{currentAction.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Steps */}
                  <div>
                    <p className="text-[#8b5cf6] text-[12px] font-medium mb-3">ACTION STEPS</p>
                    <ol className="space-y-2">
                      {currentAction.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3 text-[#cbd5e1] text-[14px]">
                          <div className="w-5 h-5 bg-[#3b82f6]/20 rounded-full flex items-center justify-center text-[#3b82f6] text-[12px] font-medium mt-0.5">
                            {index + 1}
                          </div>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Timer and Actions */}
                  <div className="space-y-4">
                    {isTimerRunning && (
                      <div className="text-center p-4 bg-[#3b82f6]/10 rounded-lg border border-[#3b82f6]/20">
                        <div className="text-[#3b82f6] text-[24px] font-bold mb-2">
                          {formatTime(actionTimer)}
                        </div>
                        <p className="text-[#cbd5e1] text-[14px]">Stay focused! You've got this.</p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      {!currentAction.completed && (
                        <>
                          {!isTimerRunning ? (
                            <Button
                              onClick={() => startTimer(currentAction.estimatedTime)}
                              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white flex-1"
                            >
                              <span className="mr-2">⏰</span>
                              Start Focus Timer
                            </Button>
                          ) : (
                            <Button
                              onClick={() => setIsTimerRunning(false)}
                              variant="outline"
                              className="border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444] hover:text-white flex-1"
                            >
                              Stop Timer
                            </Button>
                          )}
                          
                          <Button
                            onClick={handleCompleteAction}
                            className="bg-[#10b981] hover:bg-[#059669] text-white flex-1"
                          >
                            <span className="mr-2">✅</span>
                            Mark Complete
                          </Button>
                        </>
                      )}

                      {currentAction.completed && (
                        <Button
                          onClick={loadDailyAction}
                          className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed] text-white w-full"
                        >
                          <span className="mr-2">🎯</span>
                          Get Next Action
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[#cbd5e1] mb-4">Ready to start your day?</p>
                  <Button onClick={loadDailyAction} className="bg-[#3b82f6] hover:bg-[#2563eb] text-white">
                    Generate Today's Action
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Progress Summary */}
        <div className="space-y-6">
          {/* Streak Card */}
          <Card className="bg-[#1e293b]/50 border-[#10b981]/20">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-[#10b981] text-[32px] font-bold mb-2">
                  {userProgress.streak}
                </div>
                <p className="text-[#f8fafc] font-medium mb-1">Day Streak</p>
                <p className="text-[#cbd5e1] text-[12px]">Keep the momentum going!</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-[#1e293b]/50 border-[#3b82f6]/20">
            <CardHeader>
              <CardTitle className="text-[#f8fafc] text-[16px]">Progress Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[#cbd5e1] text-[14px]">Actions Completed</span>
                <span className="text-[#f8fafc] font-medium">
                  {userProgress.completedActions}/{userProgress.totalActions}
                </span>
              </div>
              <Progress 
                value={(userProgress.completedActions / userProgress.totalActions) * 100} 
                className="h-2"
              />
              
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#cbd5e1] text-[14px]">This Week</span>
                  <span className="text-[#f8fafc] text-[12px]">
                    {userProgress.weeklyStats[0].completed}/{userProgress.weeklyStats[0].planned}
                  </span>
                </div>
                <Progress 
                  value={(userProgress.weeklyStats[0].completed / userProgress.weeklyStats[0].planned) * 100}
                  className="h-1.5"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Goal Access */}
          <Card className="bg-[#1e293b]/50 border-[#8b5cf6]/20">
            <CardHeader>
              <CardTitle className="text-[#f8fafc] text-[16px]">Current Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-[#8b5cf6] text-[12px] font-medium">THIS MONTH</p>
                  <p className="text-[#f8fafc] text-[14px]">{goalHierarchy.monthly.title}</p>
                </div>
                <Separator className="bg-[#8b5cf6]/20" />
                <div>
                  <p className="text-[#3b82f6] text-[12px] font-medium">THIS YEAR</p>
                  <p className="text-[#f8fafc] text-[14px]">{goalHierarchy.oneYear.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );

  const renderGoalsView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-[#f8fafc] text-[28px] font-bold mb-2">Your Goal Hierarchy</h2>
        <p className="text-[#cbd5e1] text-[16px]">The complete pathway from dreams to daily actions</p>
      </div>

      <div className="space-y-4">
        <GoalCard goal={goalHierarchy.someday} timeframe="Someday Goal" icon="🎯" />
        <GoalCard goal={goalHierarchy.fiveYear} timeframe="5-Year Milestone" icon="🚀" />
        <GoalCard goal={goalHierarchy.oneYear} timeframe="This Year's Target" icon="📅" />
        <GoalCard goal={goalHierarchy.monthly} timeframe="This Month's Focus" icon="📊" />
        <GoalCard goal={goalHierarchy.weekly} timeframe="This Week's Actions" icon="📋" />
        <GoalCard goal={goalHierarchy.daily} timeframe="Today's Priority" icon="✅" />
        <GoalCard goal={goalHierarchy.rightNow} timeframe="Right Now Action" icon="⚡" isHighlighted />
      </div>
    </motion.div>
  );

  const renderProgressView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-[#f8fafc] text-[28px] font-bold mb-2">Progress Analytics</h2>
        <p className="text-[#cbd5e1] text-[16px]">Track your journey and celebrate your wins</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#1e293b]/50 border-[#10b981]/20">
          <CardContent className="p-6 text-center">
            <div className="text-[#10b981] text-[36px] font-bold mb-2">{userProgress.streak}</div>
            <p className="text-[#f8fafc] font-medium">Current Streak</p>
            <p className="text-[#cbd5e1] text-[12px]">Days in a row</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b]/50 border-[#3b82f6]/20">
          <CardContent className="p-6 text-center">
            <div className="text-[#3b82f6] text-[36px] font-bold mb-2">
              {Math.round((userProgress.completedActions / userProgress.totalActions) * 100)}%
            </div>
            <p className="text-[#f8fafc] font-medium">Success Rate</p>
            <p className="text-[#cbd5e1] text-[12px]">Actions completed</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b]/50 border-[#8b5cf6]/20">
          <CardContent className="p-6 text-center">
            <div className="text-[#8b5cf6] text-[36px] font-bold mb-2">
              {userProgress.completedActions}
            </div>
            <p className="text-[#f8fafc] font-medium">Total Actions</p>
            <p className="text-[#cbd5e1] text-[12px]">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card className="bg-[#1e293b]/50 border-[#3b82f6]/20">
        <CardHeader>
          <CardTitle className="text-[#f8fafc]">Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userProgress.weeklyStats.map((week, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#cbd5e1] text-[14px]">{week.week}</span>
                  <span className="text-[#f8fafc] text-[14px]">{week.completed}/{week.planned}</span>
                </div>
                <Progress value={(week.completed / week.planned) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      {/* Header */}
      <header className="border-b border-[#3b82f6]/20 bg-[#1a1a2e]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="text-[#f8fafc] text-[24px] font-bold tracking-[-0.75px]">
                dayslide
              </div>
              
              <nav className="hidden md:flex gap-6">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
                  { id: 'goals', label: 'Goals', icon: '🎯' },
                  { id: 'progress', label: 'Progress', icon: '📈' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id as any)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[14px] font-medium transition-all ${
                      currentView === item.id
                        ? 'bg-[#3b82f6]/20 text-[#3b82f6]'
                        : 'text-[#cbd5e1] hover:text-[#f8fafc] hover:bg-[#1e293b]/50'
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-[#f8fafc] text-[14px] font-medium">{user.name}</p>
                <p className="text-[#cbd5e1] text-[12px]">{getTimeOfDayGreeting()}!</p>
              </div>
              
              <button className="w-10 h-10 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full flex items-center justify-center">
                <span className="text-white text-[14px] font-medium">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </button>

              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="border-[#64748b] text-[#cbd5e1] hover:bg-[#64748b] hover:text-white"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && renderDashboardHome()}
          {currentView === 'goals' && renderGoalsView()}
          {currentView === 'progress' && renderProgressView()}
        </AnimatePresence>
      </main>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1b1e] border border-[#10b981]/30 rounded-lg p-8 max-w-md w-full text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-[24px]">🎉</span>
              </div>
              
              <h3 className="text-[#f8fafc] text-[20px] font-medium mb-2">
                Fantastic Work!
              </h3>
              <p className="text-[#cbd5e1] text-[14px] mb-6">
                You've completed today's action and moved closer to your {goalHierarchy.someday.title.toLowerCase()}. 
                Your {userProgress.streak}-day streak is building unstoppable momentum!
              </p>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowCompletionModal(false)}
                  className="bg-[#10b981] hover:bg-[#059669] text-white flex-1"
                >
                  Continue
                </Button>
                <Button
                  onClick={() => {
                    setShowCompletionModal(false);
                    loadDailyAction();
                  }}
                  variant="outline"
                  className="border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white flex-1"
                >
                  Next Action
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reuse GoalCard from OnboardingWizard
function GoalCard({ 
  goal, 
  timeframe, 
  icon, 
  isHighlighted = false 
}: { 
  goal: any; 
  timeframe: string; 
  icon: string; 
  isHighlighted?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={`transition-all ${
      isHighlighted 
        ? 'bg-gradient-to-r from-[#8b5cf6]/20 to-[#3b82f6]/20 border-[#8b5cf6]/40' 
        : 'bg-[#1e293b]/50 border-[#3b82f6]/20 hover:border-[#3b82f6]/40'
    }`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[20px]">{icon}</span>
            <div>
              <h3 className="text-[#f8fafc] font-medium text-[16px]">{timeframe}</h3>
              {isHighlighted && (
                <Badge className="bg-[#8b5cf6]/20 text-[#8b5cf6] border-[#8b5cf6]/40 mt-1">
                  Focus Now ⚡
                </Badge>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#cbd5e1] hover:text-[#f8fafc] transition-colors"
          >
            <svg 
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <h4 className="text-[#f8fafc] text-[16px] font-medium mb-2">{goal.title}</h4>
        <p className="text-[#cbd5e1] text-[14px]">{goal.description}</p>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-[#3b82f6]/20"
            >
              <p className="text-[#8b5cf6] text-[12px] font-medium mb-2">WHY THIS MATTERS</p>
              <p className="text-[#cbd5e1] text-[14px]">{goal.reasoning}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}