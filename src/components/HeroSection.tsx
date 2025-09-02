import { useState } from 'react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { PromptInterface } from './PromptInterface';

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

interface HeroSectionProps {
  onStartJourney: () => void;
  isAuthenticated: boolean;
  user: User | null;
}

export function HeroSection({ onStartJourney, isAuthenticated, user }: HeroSectionProps) {
  const [showPromptInterface, setShowPromptInterface] = useState(false);

  const handleStartJourney = () => {
    if (isAuthenticated) {
      // User is authenticated, show the prompt interface
      setShowPromptInterface(true);
    } else {
      // User needs to authenticate first
      onStartJourney();
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center px-8 pt-20">
      <div className="max-w-6xl mx-auto">
        {!showPromptInterface ? (
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-[48px] md:text-[64px] font-bold text-[#f8fafc] leading-tight mb-6">
                {isAuthenticated && user ? (
                  <>
                    Welcome back, {user.name.split(' ')[0]}! <br />
                    <span className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">
                      Continue Your Journey
                    </span>
                  </>
                ) : (
                  <>
                    Transform Your Dreams Into{' '}
                    <span className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">
                      Daily Actions
                    </span>
                  </>
                )}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-[20px] text-[#cbd5e1] mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {isAuthenticated ? (
                "Ready to continue your purpose discovery? Let's build on your goal pathway and identify your next actions."
              ) : (
                "Based on \"The ONE Thing\" methodology, Dayslide helps you break down life ambitions into clear, actionable steps from Someday Goals to Right Now actions."
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button 
                size="lg"
                onClick={handleStartJourney}
                className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed] text-white px-8 py-3 text-[16px] font-medium"
              >
                {isAuthenticated ? 'Continue Journey' : 'Start Your Journey'}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white px-8 py-3 text-[16px] font-medium"
              >
                Learn More
              </Button>
            </motion.div>

            {!isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
              >
                <div className="p-6 rounded-lg bg-[#1e293b]/50 backdrop-blur-sm border border-[#3b82f6]/20">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-[20px] font-bold">1</span>
                  </div>
                  <h3 className="text-[#f8fafc] font-medium mb-2">Guided Purpose Discovery</h3>
                  <p className="text-[#cbd5e1] text-[14px]">Define what you truly want through smart questioning</p>
                </div>

                <div className="p-6 rounded-lg bg-[#1e293b]/50 backdrop-blur-sm border border-[#3b82f6]/20">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-[20px] font-bold">2</span>
                  </div>
                  <h3 className="text-[#f8fafc] font-medium mb-2">Actionable Goal Setting</h3>
                  <p className="text-[#cbd5e1] text-[14px]">Transform big dreams into step-by-step actions</p>
                </div>

                <div className="p-6 rounded-lg bg-[#1e293b]/50 backdrop-blur-sm border border-[#3b82f6]/20">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-[20px] font-bold">3</span>
                  </div>
                  <h3 className="text-[#f8fafc] font-medium mb-2">Continuous Focus</h3>
                  <p className="text-[#cbd5e1] text-[14px]">Maintain momentum with progress tracking and reminders</p>
                </div>
              </motion.div>
            )}

            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="bg-gradient-to-r from-[#3b82f6]/20 to-[#8b5cf6]/20 border border-[#3b82f6]/40 rounded-lg p-6 max-w-2xl mx-auto"
              >
                <h3 className="text-[#f8fafc] text-[20px] font-medium mb-2">
                  Ready to continue where you left off?
                </h3>
                <p className="text-[#cbd5e1] text-[14px] mb-4">
                  Jump back into your purpose discovery or review your existing goals and daily actions.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="text-[#8a85ff] hover:text-[#7c75ff] text-[14px] font-medium transition-colors">
                    View Dashboard
                  </button>
                  <span className="hidden sm:block text-[#64748b]">•</span>
                  <button className="text-[#8a85ff] hover:text-[#7c75ff] text-[14px] font-medium transition-colors">
                    Review Goals
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center"
          >
            {/* Header */}
            <div className="mb-12">
              <h2 className="text-[40px] md:text-[48px] font-bold text-[#f8fafc] mb-4">
                {user ? `Let's Continue, ${user.name.split(' ')[0]}` : "Let's Discover Your Purpose"}
              </h2>
              <p className="text-[18px] text-[#cbd5e1] max-w-2xl mx-auto mb-8">
                Answer these thoughtful questions to uncover what truly matters to you. 
                This is the foundation of your journey from dreams to daily actions.
              </p>
              
              {/* Back button */}
              <button
                onClick={() => setShowPromptInterface(false)}
                className="text-[#8a85ff] hover:text-[#7c75ff] text-[14px] font-medium transition-colors mb-8"
              >
                ← Back to Overview
              </button>
            </div>

            {/* Prompt Interface */}
            <PromptInterface />

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16"
            >
              <p className="text-[#b0b0b0] text-[14px]">
                Discover daily inspiration through meaningful conversations
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}