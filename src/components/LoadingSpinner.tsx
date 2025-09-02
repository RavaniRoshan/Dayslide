import { motion } from 'motion/react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

export function LoadingSpinner({ size = 'md', message, className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        className={`border-2 border-[#3b82f6]/20 border-t-[#3b82f6] rounded-full ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[#cbd5e1] text-[14px] mt-4 text-center"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

export function FullPageLoader({ message }: { message?: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
      <div className="text-center">
        <div className="text-[#f8fafc] text-[24px] font-bold tracking-[-0.75px] mb-8">
          dayslide
        </div>
        <LoadingSpinner size="lg" message={message || "Loading your success journey..."} />
      </div>
    </div>
  );
}