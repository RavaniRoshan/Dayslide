import { useState } from 'react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

export function CopyButton({ 
  text, 
  label = "Copy", 
  variant = "outline", 
  size = "sm",
  className = "",
  showLabel = true 
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sizeClasses = {
    sm: 'h-8 px-2 text-[12px]',
    md: 'h-9 px-3 text-[14px]',
    lg: 'h-10 px-4 text-[16px]'
  };

  return (
    <Button
      onClick={handleCopy}
      variant={variant}
      className={`${sizeClasses[size]} ${className} relative overflow-hidden transition-all duration-200 ${
        copied 
          ? 'bg-[#10b981]/20 border-[#10b981]/40 text-[#10b981]' 
          : 'border-[#64748b]/40 text-[#cbd5e1] hover:border-[#3b82f6]/40 hover:text-[#3b82f6]'
      }`}
      disabled={copied}
    >
      <div className="flex items-center gap-1.5">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.svg
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </motion.svg>
          ) : (
            <motion.svg
              key="copy"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
        {showLabel && (
          <AnimatePresence mode="wait">
            <motion.span
              key={copied ? 'copied' : 'copy'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap"
            >
              {copied ? 'Copied!' : label}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
    </Button>
  );
}

// Floating copy button for larger content areas
export function FloatingCopyButton({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`absolute top-2 right-2 ${className}`}>
      <CopyButton 
        text={text} 
        variant="ghost" 
        size="sm" 
        showLabel={false}
        className="bg-[#1a1b1e]/80 backdrop-blur-sm hover:bg-[#1a1b1e] border-[#64748b]/20"
      />
    </div>
  );
}