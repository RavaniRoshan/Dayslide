import { useEffect, useRef } from 'react';

interface LottieLoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function LottieLoader({ 
  message = "Loading...", 
  size = 'md',
  className = ""
}: LottieLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  useEffect(() => {
    if (containerRef.current) {
      // Clear any existing content
      containerRef.current.innerHTML = '';
      
      // Create iframe for Lottie animation
      const iframe = document.createElement('iframe');
      iframe.src = 'https://lottie.host/embed/d1022bae-e478-410c-b83e-d5bb76e8bcb1/dmGa0SOfHD.lottie';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style.background = 'transparent';
      iframe.allow = 'autoplay';
      
      containerRef.current.appendChild(iframe);
    }
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        ref={containerRef}
        className={`${sizeClasses[size]} relative overflow-hidden rounded-lg`}
        style={{
          filter: 'brightness(1.2) contrast(1.1)'
        }}
      />
      {message && (
        <p 
          className="mt-4 text-center animate-pulse"
          style={{
            color: 'rgba(235, 235, 245, 0.8)',
            fontSize: '1rem',
            fontWeight: 500,
            fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

// Full page loader variant
export function FullPageLottieLoader({ message = "Preparing your journey..." }: { message?: string }) {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ 
        background: 'linear-gradient(135deg, #000000 0%, #1d1d1f 50%, #2c2c2e 100%)' 
      }}
    >
      <div className="text-center">
        <LottieLoader message={message} size="xl" />
        
        {/* Optional logo/branding */}
        <div 
          className="mt-8"
          style={{
            color: '#ffffff',
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            opacity: 0.8
          }}
        >
          dayslide
        </div>
      </div>
    </div>
  );
}