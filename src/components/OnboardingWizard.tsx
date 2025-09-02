import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { OnboardingData, GoalHierarchy, User } from '../types';
import { generatePersonalizedPlan, refinePlan } from '../utils/aiSimulation';

interface OnboardingWizardProps {
  user: User;
  onComplete: (goalHierarchy: GoalHierarchy, onboardingData: OnboardingData) => void;
  onBack: () => void;
}

const TOTAL_STEPS = 6;

const focusAreas = [
  { id: 'career', label: 'Career', icon: '💼' },
  { id: 'health', label: 'Health & Fitness', icon: '💪' },
  { id: 'relationships', label: 'Relationships', icon: '❤️' },
  { id: 'finances', label: 'Finances', icon: '💰' },
  { id: 'personal-growth', label: 'Personal Growth', icon: '🌱' },
  { id: 'creative', label: 'Creative', icon: '🎨' },
  { id: 'spiritual', label: 'Spiritual', icon: '🧘' },
  { id: 'other', label: 'Other', icon: '⭐' }
];

const lifeStages = [
  { id: 'student', label: 'Student' },
  { id: 'early-career', label: 'Early Career' },
  { id: 'established-professional', label: 'Established Professional' },
  { id: 'parent', label: 'Parent' },
  { id: 'career-transition', label: 'Career Transition' },
  { id: 'retirement-planning', label: 'Retirement Planning' }
];

const timeCommitments = [
  { id: '15min/day', label: '15 minutes/day' },
  { id: '30min/day', label: '30 minutes/day' },
  { id: '1hr/day', label: '1 hour/day' },
  { id: '2+hrs/day', label: '2+ hours/day' },
  { id: 'flexible', label: 'Flexible' }
];

const workingStyles = [
  { id: 'structured', label: 'Structured Plan' },
  { id: 'flexible', label: 'Flexible Approach' },
  { id: 'accountability', label: 'Accountability-Focused' },
  { id: 'independent', label: 'Independent' }
];

const resources = [
  { id: 'limited', label: 'Limited Budget' },
  { id: 'moderate', label: 'Moderate Resources' },
  { id: 'well-resourced', label: 'Well-Resourced' },
  { id: 'need-guidance', label: 'Need Funding Guidance' }
];

export function OnboardingWizard({ user, onComplete, onBack }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    step: 1,
    detailedPrompt: '',
    contextSelectors: {
      primaryFocus: [],
      lifeStage: '',
      timeCommitment: '',
      workingStyle: '',
      resources: ''
    },
    completed: false
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<GoalHierarchy | null>(null);
  const [isRefining, setIsRefining] = useState(false);
  const [refinementFeedback, setRefinementFeedback] = useState('');
  const [refinementType, setRefinementType] = useState<string[]>([]);
  const [showRefinement, setShowRefinement] = useState(false);

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      setOnboardingData(prev => ({ ...prev, step: currentStep + 1 }));
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setOnboardingData(prev => ({ ...prev, step: currentStep - 1 }));
    }
  };

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    try {
      const plan = await generatePersonalizedPlan(onboardingData);
      setGeneratedPlan(plan);
      setOnboardingData(prev => ({ ...prev, generatedPlan: plan }));
      handleNext();
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefinePlan = async () => {
    if (!generatedPlan) return;
    
    setIsRefining(true);
    try {
      const refinedPlan = await refinePlan(generatedPlan, refinementFeedback, refinementType);
      setGeneratedPlan(refinedPlan);
      setOnboardingData(prev => ({ 
        ...prev, 
        generatedPlan: refinedPlan,
        refinementFeedback 
      }));
      setShowRefinement(false);
      setRefinementFeedback('');
      setRefinementType([]);
    } catch (error) {
      console.error('Error refining plan:', error);
    } finally {
      setIsRefining(false);
    }
  };

  const handleComplete = () => {
    if (generatedPlan) {
      const completedData = { ...onboardingData, completed: true };
      onComplete(generatedPlan, completedData);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return true; // Welcome step
      case 2: return onboardingData.detailedPrompt.length >= 50;
      case 3: return onboardingData.contextSelectors.primaryFocus.length > 0 &&
                     onboardingData.contextSelectors.lifeStage &&
                     onboardingData.contextSelectors.timeCommitment &&
                     onboardingData.contextSelectors.workingStyle &&
                     onboardingData.contextSelectors.resources;
      case 4: return generatedPlan !== null;
      case 5: return true; // Plan review step
      case 6: return true; // Final setup
      default: return false;
    }
  };

  const updateContextSelector = (key: keyof typeof onboardingData.contextSelectors, value: any) => {
    setOnboardingData(prev => ({
      ...prev,
      contextSelectors: {
        ...prev.contextSelectors,
        [key]: value
      }
    }));
  };

  const toggleFocusArea = (areaId: string) => {
    const current = onboardingData.contextSelectors.primaryFocus;
    const updated = current.includes(areaId)
      ? current.filter(id => id !== areaId)
      : [...current, areaId];
    updateContextSelector('primaryFocus', updated);
  };

  const toggleRefinementType = (type: string) => {
    setRefinementType(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-[32px]">🎯</span>
              </div>
              <h2 className="text-[32px] font-bold text-[#f8fafc] mb-4">
                Welcome to Your Journey, {user.name.split(' ')[0]}!
              </h2>
              <p className="text-[18px] text-[#cbd5e1] mb-6">
                In the next 5-10 minutes, we'll transform your biggest dreams into a clear, 
                actionable pathway using "The ONE Thing" methodology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-[#1e293b]/50 border-[#3b82f6]/20">
                <CardContent className="p-6 text-center">
                  <div className="text-[24px] mb-2">🧠</div>
                  <h3 className="text-[#f8fafc] font-medium mb-2">AI-Powered Analysis</h3>
                  <p className="text-[#cbd5e1] text-[14px]">
                    Our AI will analyze your vision and create a personalized plan
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#1e293b]/50 border-[#3b82f6]/20">
                <CardContent className="p-6 text-center">
                  <div className="text-[24px] mb-2">⚡</div>
                  <h3 className="text-[#f8fafc] font-medium mb-2">Immediate Action</h3>
                  <p className="text-[#cbd5e1] text-[14px]">
                    Get your first action to take today, right now
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#1e293b]/50 border-[#3b82f6]/20">
                <CardContent className="p-6 text-center">
                  <div className="text-[24px] mb-2">📈</div>
                  <h3 className="text-[#f8fafc] font-medium mb-2">Continuous Growth</h3>
                  <p className="text-[#cbd5e1] text-[14px]">
                    Daily actions that build toward your ultimate vision
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-[#3b82f6]/20 to-[#8b5cf6]/20 border border-[#3b82f6]/40 rounded-lg p-6">
              <p className="text-[#f8fafc] text-[16px] mb-4">
                "The way to get started is to quit talking and begin doing." — Walt Disney
              </p>
              <p className="text-[#cbd5e1] text-[14px]">
                Time commitment: 5-10 minutes now, then just 15-30 minutes daily
              </p>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-[28px] font-bold text-[#f8fafc] mb-4">
                Help Us Understand Your Vision Completely
              </h2>
              <p className="text-[16px] text-[#cbd5e1] max-w-2xl mx-auto">
                The more detail you provide, the more personalized and effective your plan will be. 
                Think of this as painting a complete picture of your dreams.
              </p>
            </div>

            <Card className="bg-[#1e293b]/50 border-[#3b82f6]/20">
              <CardHeader>
                <CardTitle className="text-[#f8fafc]">
                  Describe your biggest life ambition in as much detail as possible
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={onboardingData.detailedPrompt}
                  onChange={(e) => setOnboardingData(prev => ({ ...prev, detailedPrompt: e.target.value }))}
                  placeholder="Be specific about what you want to achieve, why it matters to you, what success looks like, your current situation, obstacles you face, resources you have, timeline preferences, and anything else that's important to your journey..."
                  className="min-h-[200px] bg-[#2c2d30] border-[#8a85ff]/30 text-[#f8fafc] placeholder-[#b0b0b0] resize-none"
                />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${onboardingData.detailedPrompt.length >= 50 ? 'bg-[#10b981]' : 'bg-[#64748b]'}`} />
                    <span className="text-[#cbd5e1] text-[12px]">
                      {onboardingData.detailedPrompt.length} characters
                      {onboardingData.detailedPrompt.length < 50 && ' (minimum 50 recommended)'}
                    </span>
                  </div>
                  {onboardingData.detailedPrompt.length >= 200 && (
                    <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/40">
                      Great detail! ✨
                    </Badge>
                  )}
                </div>
                <p className="text-[#64748b] text-[12px] mt-2">
                  💡 Pro tip: Include what you want to achieve, why it's important, your current situation, 
                  challenges you face, resources available, and your ideal timeline.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-[28px] font-bold text-[#f8fafc] mb-4">
                Quick Context Setup
              </h2>
              <p className="text-[16px] text-[#cbd5e1]">
                Help us tailor your plan to your specific situation and preferences
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-[#1e293b]/50 border-[#3b82f6]/20">
                <CardHeader>
                  <CardTitle className="text-[#f8fafc] text-[18px]">Primary Focus Areas</CardTitle>
                  <p className="text-[#cbd5e1] text-[14px]">Select all that apply to your goals</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {focusAreas.map((area) => (
                      <button
                        key={area.id}
                        onClick={() => toggleFocusArea(area.id)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          onboardingData.contextSelectors.primaryFocus.includes(area.id)
                            ? 'bg-[#3b82f6]/20 border-[#3b82f6] text-[#f8fafc]'
                            : 'bg-[#2c2d30] border-[#64748b]/30 text-[#cbd5e1] hover:border-[#64748b]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[18px]">{area.icon}</span>
                          <span className="text-[14px] font-medium">{area.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="bg-[#1e293b]/50 border-[#3b82f6]/20">
                  <CardHeader>
                    <CardTitle className="text-[#f8fafc] text-[16px]">Current Life Stage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-2">
                      {lifeStages.map((stage) => (
                        <button
                          key={stage.id}
                          onClick={() => updateContextSelector('lifeStage', stage.id)}
                          className={`p-2 rounded-lg border text-left transition-all ${
                            onboardingData.contextSelectors.lifeStage === stage.id
                              ? 'bg-[#3b82f6]/20 border-[#3b82f6] text-[#f8fafc]'
                              : 'bg-[#2c2d30] border-[#64748b]/30 text-[#cbd5e1] hover:border-[#64748b]'
                          }`}
                        >
                          <span className="text-[14px]">{stage.label}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1e293b]/50 border-[#3b82f6]/20">
                  <CardHeader>
                    <CardTitle className="text-[#f8fafc] text-[16px]">Time Commitment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-2">
                      {timeCommitments.map((time) => (
                        <button
                          key={time.id}
                          onClick={() => updateContextSelector('timeCommitment', time.id)}
                          className={`p-2 rounded-lg border text-left transition-all ${
                            onboardingData.contextSelectors.timeCommitment === time.id
                              ? 'bg-[#3b82f6]/20 border-[#3b82f6] text-[#f8fafc]'
                              : 'bg-[#2c2d30] border-[#64748b]/30 text-[#cbd5e1] hover:border-[#64748b]'
                          }`}
                        >
                          <span className="text-[14px]">{time.label}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-[#1e293b]/50 border-[#3b82f6]/20">
                <CardHeader>
                  <CardTitle className="text-[#f8fafc] text-[16px]">Working Style</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {workingStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => updateContextSelector('workingStyle', style.id)}
                        className={`p-2 rounded-lg border text-left transition-all ${
                          onboardingData.contextSelectors.workingStyle === style.id
                            ? 'bg-[#3b82f6]/20 border-[#3b82f6] text-[#f8fafc]'
                            : 'bg-[#2c2d30] border-[#64748b]/30 text-[#cbd5e1] hover:border-[#64748b]'
                        }`}
                      >
                        <span className="text-[14px]">{style.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1e293b]/50 border-[#3b82f6]/20">
                <CardHeader>
                  <CardTitle className="text-[#f8fafc] text-[16px]">Available Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {resources.map((resource) => (
                      <button
                        key={resource.id}
                        onClick={() => updateContextSelector('resources', resource.id)}
                        className={`p-2 rounded-lg border text-left transition-all ${
                          onboardingData.contextSelectors.resources === resource.id
                            ? 'bg-[#3b82f6]/20 border-[#3b82f6] text-[#f8fafc]'
                            : 'bg-[#2c2d30] border-[#64748b]/30 text-[#cbd5e1] hover:border-[#64748b]'
                        }`}
                      >
                        <span className="text-[14px]">{resource.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            {isGenerating ? (
              <div className="py-16">
                <div className="w-24 h-24 border-4 border-[#3b82f6]/20 border-t-[#3b82f6] rounded-full animate-spin mx-auto mb-8" />
                <h2 className="text-[32px] font-bold text-[#f8fafc] mb-6">
                  Creating Your Personalized Success Plan
                </h2>
                <div className="max-w-2xl mx-auto mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#1e293b]/50 rounded-lg">
                      <span className="text-[#f8fafc]">Analyzing your vision...</span>
                      <div className="w-6 h-6 border-2 border-[#10b981]/20 border-t-[#10b981] rounded-full animate-spin" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#1e293b]/50 rounded-lg opacity-75">
                      <span className="text-[#cbd5e1]">Crafting your personalized pathway...</span>
                      <div className="w-6 h-6 border-2 border-[#64748b]/20 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#1e293b]/50 rounded-lg opacity-50">
                      <span className="text-[#64748b]">Optimizing timeline and actions...</span>
                      <div className="w-6 h-6 border-2 border-[#64748b]/20 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#1e293b]/50 rounded-lg opacity-25">
                      <span className="text-[#64748b]">Finalizing your success plan...</span>
                      <div className="w-6 h-6 border-2 border-[#64748b]/20 rounded-full" />
                    </div>
                  </div>
                </div>
                <p className="text-[#cbd5e1]">This usually takes 30-45 seconds</p>
              </div>
            ) : (
              <div className="py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="text-white text-[32px]">🚀</span>
                </div>
                <h2 className="text-[32px] font-bold text-[#f8fafc] mb-6">
                  Ready to Generate Your AI-Powered Plan?
                </h2>
                <p className="text-[18px] text-[#cbd5e1] mb-8 max-w-2xl mx-auto">
                  Our AI will analyze your detailed vision and context to create a comprehensive 
                  goal hierarchy from your someday dreams to today's actionable steps.
                </p>
                <Button
                  onClick={handleGeneratePlan}
                  size="lg"
                  className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed] text-white px-12 py-4 text-[18px] font-medium"
                >
                  Generate My Personalized Plan
                </Button>
              </div>
            )}
          </motion.div>
        );

      case 5:
        return generatedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-[32px] font-bold text-[#f8fafc] mb-4">
                Your Personalized Success Pathway
              </h2>
              <p className="text-[16px] text-[#cbd5e1] max-w-2xl mx-auto">
                Based on your input, here's your AI-generated goal hierarchy following 
                "The ONE Thing" methodology
              </p>
            </div>

            {!showRefinement ? (
              <div className="space-y-6">
                <GoalCard goal={generatedPlan.someday} timeframe="Someday Goal" icon="🎯" />
                <GoalCard goal={generatedPlan.fiveYear} timeframe="5-Year Milestone" icon="🚀" />
                <GoalCard goal={generatedPlan.oneYear} timeframe="This Year's Target" icon="📅" />
                <GoalCard goal={generatedPlan.monthly} timeframe="This Month's Focus" icon="📊" />
                <GoalCard goal={generatedPlan.weekly} timeframe="This Week's Actions" icon="📋" />
                <GoalCard goal={generatedPlan.daily} timeframe="Today's Priority" icon="✅" />
                <GoalCard goal={generatedPlan.rightNow} timeframe="Right Now Action" icon="⚡" isHighlighted />

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#0f766e] hover:to-[#047857] text-white px-8 py-3"
                  >
                    This Looks Perfect! ✨
                  </Button>
                  <Button
                    onClick={() => setShowRefinement(true)}
                    variant="outline"
                    size="lg"
                    className="border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white px-8 py-3"
                  >
                    I'd Like Some Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <Card className="bg-[#1e293b]/50 border-[#8b5cf6]/20">
                  <CardHeader>
                    <CardTitle className="text-[#f8fafc]">Let's refine your plan together</CardTitle>
                    <p className="text-[#cbd5e1]">What would you like to adjust?</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-[#f8fafc] font-medium mb-3">What needs adjusting?</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { id: 'timeline-aggressive', label: 'Timeline feels too aggressive' },
                          { id: 'timeline-slow', label: 'Timeline feels too slow' },
                          { id: 'resources', label: 'Actions don\'t align with my resources' },
                          { id: 'missing-aspects', label: 'Missing important aspects' },
                          { id: 'focus-shift', label: 'Focus areas need shifting' },
                          { id: 'other', label: 'Other specific concerns' }
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => toggleRefinementType(option.id)}
                            className={`p-3 rounded-lg border text-left transition-all ${
                              refinementType.includes(option.id)
                                ? 'bg-[#8b5cf6]/20 border-[#8b5cf6] text-[#f8fafc]'
                                : 'bg-[#2c2d30] border-[#64748b]/30 text-[#cbd5e1] hover:border-[#64748b]'
                            }`}
                          >
                            <span className="text-[14px]">{option.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[#f8fafc] font-medium mb-3">Describe what you'd like to change</p>
                      <Textarea
                        value={refinementFeedback}
                        onChange={(e) => setRefinementFeedback(e.target.value)}
                        placeholder="Be specific about what you'd like to adjust and why..."
                        className="bg-[#2c2d30] border-[#8b5cf6]/30 text-[#f8fafc] placeholder-[#b0b0b0]"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={handleRefinePlan}
                        disabled={isRefining || (refinementType.length === 0 && !refinementFeedback.trim())}
                        className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white"
                      >
                        {isRefining ? 'Refining...' : 'Refine My Plan'}
                      </Button>
                      <Button
                        onClick={() => setShowRefinement(false)}
                        variant="outline"
                        className="border-[#64748b] text-[#cbd5e1] hover:bg-[#64748b] hover:text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-[32px]">🎉</span>
              </div>
              <h2 className="text-[32px] font-bold text-[#f8fafc] mb-4">
                Your Success Journey is Ready!
              </h2>
              <p className="text-[18px] text-[#cbd5e1] mb-8">
                You now have a complete pathway from your someday dreams to today's actions. 
                Let's launch your personalized dashboard.
              </p>
            </div>

            {generatedPlan && (
              <Card className="bg-gradient-to-r from-[#3b82f6]/20 to-[#8b5cf6]/20 border border-[#3b82f6]/40 mb-8">
                <CardContent className="p-8">
                  <h3 className="text-[#f8fafc] text-[20px] font-medium mb-4">
                    Your First Action Awaits
                  </h3>
                  <p className="text-[#8b5cf6] text-[18px] font-medium mb-2">
                    Right Now: {generatedPlan.rightNow.title}
                  </p>
                  <p className="text-[#cbd5e1] text-[14px] mb-6">
                    {generatedPlan.rightNow.description}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-[#cbd5e1] text-[14px]">
                    <div className="flex items-center gap-2">
                      <span>⏱️</span>
                      <span>15-30 minutes</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <span>💪</span>
                      <span>Easy to start</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <span>🎯</span>
                      <span>High impact</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              onClick={handleComplete}
              size="lg"
              className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed] text-white px-12 py-4 text-[18px] font-medium"
            >
              Launch My Success Dashboard
            </Button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] py-8">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#cbd5e1] hover:text-[#f8fafc] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
          
          <div className="text-center">
            <div className="text-[#f8fafc] text-[24px] font-bold tracking-[-0.75px]">
              dayslide
            </div>
            <p className="text-[#cbd5e1] text-[12px]">Step {currentStep} of {TOTAL_STEPS}</p>
          </div>

          <div className="w-[60px]"></div> {/* Spacer for centering */}
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <Progress value={progress} className="h-2 bg-[#1e293b]">
            <div 
              className="h-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <div key={currentStep}>
            {renderStep()}
          </div>
        </AnimatePresence>

        {/* Navigation */}
        {currentStep !== 4 && currentStep !== 6 && (
          <div className="flex justify-between items-center mt-12">
            <Button
              onClick={handlePrev}
              variant="outline"
              disabled={currentStep === 1}
              className="border-[#64748b] text-[#cbd5e1] hover:bg-[#64748b] hover:text-white"
            >
              Previous
            </Button>

            <Button
              onClick={currentStep === 5 ? handleNext : handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed] text-white px-8"
            >
              {currentStep === 3 ? 'Generate My Plan' : 
               currentStep === 5 ? 'Proceed to Setup' : 'Next'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Goal Card Component
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
            <span className="text-[24px]">{icon}</span>
            <div>
              <h3 className="text-[#f8fafc] font-medium">{timeframe}</h3>
              {isHighlighted && (
                <Badge className="bg-[#8b5cf6]/20 text-[#8b5cf6] border-[#8b5cf6]/40 mt-1">
                  Start Here ⚡
                </Badge>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#cbd5e1] hover:text-[#f8fafc] transition-colors"
          >
            <svg 
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="text-[#f8fafc] text-[18px] font-medium mb-2">{goal.title}</h4>
        <p className="text-[#cbd5e1] text-[14px] mb-4">{goal.description}</p>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <Separator className="bg-[#3b82f6]/20" />
              
              <div>
                <p className="text-[#8b5cf6] text-[12px] font-medium mb-2">WHY THIS MATTERS</p>
                <p className="text-[#cbd5e1] text-[14px]">{goal.reasoning}</p>
              </div>

              {goal.successMetrics && goal.successMetrics.length > 0 && (
                <div>
                  <p className="text-[#10b981] text-[12px] font-medium mb-2">SUCCESS METRICS</p>
                  <ul className="text-[#cbd5e1] text-[14px] space-y-1">
                    {goal.successMetrics.map((metric: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-[#10b981] rounded-full" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {goal.obstacles && goal.obstacles.length > 0 && (
                <div>
                  <p className="text-[#ef4444] text-[12px] font-medium mb-2">POTENTIAL OBSTACLES</p>
                  <ul className="text-[#cbd5e1] text-[14px] space-y-1">
                    {goal.obstacles.map((obstacle: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-[#ef4444] rounded-full" />
                        {obstacle}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}