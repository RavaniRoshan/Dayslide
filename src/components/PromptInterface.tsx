import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';

const prompts = [
  {
    id: 1,
    text: "What's your biggest dream or life ambition?",
    placeholder: "Share your biggest life dream or ambition...",
    category: "someday"
  },
  {
    id: 2,
    text: "What would make you feel most fulfilled in life?",
    placeholder: "Describe what would bring you the most fulfillment...",
    category: "purpose"
  },
  {
    id: 3,
    text: "What's one thing you want to accomplish in the next 5 years?",
    placeholder: "Share your 5-year vision...",
    category: "five-year"
  },
  {
    id: 4,
    text: "What's holding you back from pursuing your dreams?",
    placeholder: "What obstacles or fears are in your way...",
    category: "obstacles"
  },
  {
    id: 5,
    text: "What impact do you want to have on the world?",
    placeholder: "Describe the legacy you want to leave...",
    category: "impact"
  }
];

export function PromptInterface() {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responses, setResponses] = useState<Record<number, string>>({});

  // Auto-rotate prompts every 8 seconds if no input
  useEffect(() => {
    if (userInput.length === 0) {
      const interval = setInterval(() => {
        setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [userInput]);

  const currentPrompt = prompts[currentPromptIndex];
  const characterCount = userInput.length;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleShareThought = () => {
    if (userInput.trim()) {
      // Save the response
      setResponses(prev => ({
        ...prev,
        [currentPrompt.id]: userInput.trim()
      }));

      // Move to next prompt
      const nextIndex = (currentPromptIndex + 1) % prompts.length;
      setCurrentPromptIndex(nextIndex);
      setUserInput('');
      setIsTyping(false);

      // Show feedback animation or proceed to next step
      console.log('Response saved:', userInput.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleShareThought();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="flex gap-2 mb-8 justify-center">
        {prompts.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-8 rounded-full transition-all duration-300 ${
              index === currentPromptIndex
                ? 'bg-[#8a85ff]'
                : index < currentPromptIndex
                ? 'bg-[#10b981]'
                : 'bg-[#334155]'
            }`}
          />
        ))}
      </div>

      {/* Prompt Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPrompt.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h3 className="text-[24px] font-medium text-[#f8fafc] mb-4 leading-relaxed">
            {currentPrompt.text}
          </h3>
        </motion.div>
      </AnimatePresence>

      {/* Input Interface */}
      <div className="bg-[#2c2d30] rounded-[12px] border-2 border-[rgba(138,133,255,0.3)] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] relative">
        <div className="flex flex-col justify-center h-[127px] p-4">
          <div className="flex-1 mb-4">
            <textarea
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={currentPrompt.placeholder}
              className="w-full h-[60px] bg-transparent text-[#f8fafc] text-[16px] placeholder-[#b0b0b0] border-none outline-none resize-none font-light leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-[#b0b0b0] rounded-full" />
              <span className="text-[#b0b0b0] text-[12px]">
                {characterCount} characters
              </span>
            </div>
            
            <Button
              onClick={handleShareThought}
              disabled={userInput.trim().length === 0}
              className={`px-6 py-2 rounded-[8px] text-[16px] font-medium transition-all duration-300 ${
                userInput.trim().length > 0
                  ? 'bg-[#8a85ff] hover:bg-[#7c75ff] text-[#1a1b1e]'
                  : 'bg-[#8a85ff] opacity-50 text-[#1a1b1e] cursor-not-allowed'
              }`}
            >
              Share Thought
            </Button>
          </div>
        </div>
      </div>

      {/* Response Counter */}
      {Object.keys(responses).length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-6"
        >
          <div className="inline-flex items-center gap-2 bg-[#10b981]/20 border border-[#10b981]/40 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-[#10b981] rounded-full" />
            <span className="text-[#10b981] text-[14px] font-medium">
              {Object.keys(responses).length} of {prompts.length} reflections shared
            </span>
          </div>
        </motion.div>
      )}

      {/* Call to Action after completion */}
      {Object.keys(responses).length === prompts.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <div className="bg-gradient-to-r from-[#3b82f6]/20 to-[#8b5cf6]/20 border border-[#3b82f6]/40 rounded-lg p-6">
            <h4 className="text-[#f8fafc] text-[20px] font-medium mb-4">
              Amazing! You've completed your purpose discovery
            </h4>
            <p className="text-[#cbd5e1] mb-6">
              Ready to transform these insights into your actionable goal pathway?
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed] text-white px-8 py-3"
            >
              Start Your Journey
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}