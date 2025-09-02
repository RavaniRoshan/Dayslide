import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  referralSource: string;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    referralSource: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    
    // Mock Google OAuth flow - in real implementation, this would integrate with Google OAuth
    // Example: window.google.accounts.oauth2.initTokenClient({...})
    // For now, we'll simulate the OAuth process
    
    try {
      // Simulate OAuth popup and user consent
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful authentication
      // In real implementation, this would return user data from Google
      const mockGoogleUser = {
        id: 'google_' + Math.random().toString(36).substr(2, 9),
        name: 'John Doe', // This would come from Google profile
        email: 'john.doe@gmail.com', // This would come from Google profile
        profilePicture: undefined // This would be the Google profile picture URL
      };
      
      // Store user data and show success state
      localStorage.setItem('dayslide_user', JSON.stringify(mockGoogleUser));
      
      setIsLoading(false);
      setAuthSuccess(true);
      
      // Proceed to main app after brief success display
      setTimeout(() => {
        onAuthSuccess();
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      console.error('Google OAuth error:', error);
      // In real implementation, show error message to user
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Mock API call - in real implementation, this would call your authentication API
    setTimeout(() => {
      const userData = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email
      };
      
      localStorage.setItem('dayslide_user', JSON.stringify(userData));
      
      setIsLoading(false);
      setAuthSuccess(true);
      
      // Proceed to main app after brief success display
      setTimeout(() => {
        onAuthSuccess();
      }, 1500);
    }, 1000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const referralSources = [
    'Google Search',
    'Social Media',
    'Friend Recommendation',
    'Blog Article',
    'Podcast',
    'YouTube',
    'Other'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-[#1a1b1e] border border-[#8a85ff]/30 rounded-lg p-8 w-full max-w-md relative"
        >
          {authSuccess ? (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-[#f8fafc] text-[24px] font-medium mb-2">
                Welcome to Dayslide!
              </h2>
              <p className="text-[#b0b0b0] text-[14px] mb-6">
                Account created successfully. Let's start your journey...
              </p>
              <div className="w-8 h-8 border-2 border-[#8a85ff] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
            <div className="text-[#e0e0e0] text-[30px] font-bold tracking-[-0.75px] mb-4">
              dayslide
            </div>
            <h2 className="text-[#f8fafc] text-[24px] font-medium mb-2">
              {isLogin ? 'Welcome Back' : 'Start Your Journey'}
            </h2>
            <p className="text-[#b0b0b0] text-[14px]">
              {isLogin 
                ? 'Sign in to continue your goal journey' 
                : 'Create your account to transform dreams into daily actions'
              }
            </p>
          </div>

          {/* Google OAuth Button */}
          <Button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full mb-6 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium py-3 flex items-center justify-center gap-3 transition-all duration-200"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
                <span>Connecting to Google...</span>
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#334155]" />
            </div>
            <div className="relative flex justify-center text-[14px]">
              <span className="bg-[#1a1b1e] px-4 text-[#64748b]">or</span>
            </div>
          </div>

          {/* Manual Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-[#f8fafc] text-[14px] font-medium mb-2 block">
                  What should we call you?
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your name"
                  className="bg-[#2c2d30] border-[#8a85ff]/30 text-[#f8fafc] placeholder-[#b0b0b0] focus:border-[#8a85ff] transition-colors"
                />
                {errors.name && (
                  <p className="text-[#ef4444] text-[12px] mt-1">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-[#f8fafc] text-[14px] font-medium mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                className="bg-[#2c2d30] border-[#8a85ff]/30 text-[#f8fafc] placeholder-[#b0b0b0] focus:border-[#8a85ff] transition-colors"
              />
              {errors.email && (
                <p className="text-[#ef4444] text-[12px] mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-[#f8fafc] text-[14px] font-medium mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Create a password"
                className="bg-[#2c2d30] border-[#8a85ff]/30 text-[#f8fafc] placeholder-[#b0b0b0] focus:border-[#8a85ff] transition-colors"
              />
              {errors.password && (
                <p className="text-[#ef4444] text-[12px] mt-1">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="referral" className="text-[#f8fafc] text-[14px] font-medium mb-2 block">
                  How did you hear about us? <span className="text-[#64748b]">(Optional)</span>
                </Label>
                <Select onValueChange={(value) => handleInputChange('referralSource', value)}>
                  <SelectTrigger className="bg-[#2c2d30] border-[#8a85ff]/30 text-[#f8fafc] focus:border-[#8a85ff]">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2c2d30] border-[#8a85ff]/30">
                    {referralSources.map((source) => (
                      <SelectItem key={source} value={source} className="text-[#f8fafc] focus:bg-[#8a85ff]/20">
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8a85ff] hover:bg-[#7c75ff] text-[#1a1b1e] font-medium py-3 mt-6"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#1a1b1e]/30 border-t-[#1a1b1e] rounded-full animate-spin" />
              ) : (
                isLogin ? 'Sign In' : 'Create My Account'
              )}
            </Button>
          </form>

          {/* Toggle Login/Register */}
          <div className="text-center mt-6">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setFormData({ name: '', email: '', password: '', referralSource: '' });
              }}
              className="text-[#8a85ff] hover:text-[#7c75ff] text-[14px] font-medium transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#64748b] hover:text-[#f8fafc] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}