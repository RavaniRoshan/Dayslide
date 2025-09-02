import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

export function Navigation({ currentPage, onNavigate, user, onLogin, onLogout }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#1a1a2e]/95 backdrop-blur-md border-b border-[#3b82f6]/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div 
            className="text-[#f8fafc] text-[30px] font-bold tracking-[-0.75px] cursor-pointer hover:text-[#3b82f6] transition-colors"
            onClick={() => onNavigate('home')}
          >
            dayslide
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-[14px] font-medium transition-all duration-300 relative ${
                  currentPage === item.id 
                    ? 'text-[#3b82f6]' 
                    : 'text-[#cbd5e1] hover:text-[#f8fafc]'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#3b82f6] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e293b]/50 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full flex items-center justify-center">
                  <span className="text-white text-[14px] font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-[#f8fafc] text-[14px] font-medium hidden sm:block">
                  {user.name.split(' ')[0]}
                </span>
                <svg 
                  className={`w-4 h-4 text-[#cbd5e1] transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-[#1e293b] border border-[#3b82f6]/20 rounded-lg shadow-lg py-2"
                >
                  <div className="px-4 py-2 border-b border-[#3b82f6]/20">
                    <p className="text-[#f8fafc] text-[14px] font-medium">{user.name}</p>
                    <p className="text-[#cbd5e1] text-[12px]">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      // Navigate to dashboard/goals
                    }}
                    className="w-full text-left px-4 py-2 text-[#cbd5e1] text-[14px] hover:bg-[#3b82f6]/10 hover:text-[#f8fafc] transition-colors"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      // Navigate to settings
                    }}
                    className="w-full text-left px-4 py-2 text-[#cbd5e1] text-[14px] hover:bg-[#3b82f6]/10 hover:text-[#f8fafc] transition-colors"
                  >
                    Settings
                  </button>
                  <hr className="border-[#3b82f6]/20 my-1" />
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-[#ef4444] text-[14px] hover:bg-[#ef4444]/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Button 
              onClick={onLogin}
              variant="outline" 
              className="border-[#8b5cf6] text-[#f8fafc] hover:bg-[#8b5cf6] hover:text-[#1a1a2e] transition-all duration-300"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}