import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { CopyButton } from './CopyButton';
import { RecentIdea } from '../types';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  recentIdeas: RecentIdea[];
  onOpenSettings: () => void;
  onClearIdeas: () => void;
}

export function SidePanel({ 
  isOpen, 
  onClose, 
  recentIdeas, 
  onOpenSettings, 
  onClearIdeas 
}: SidePanelProps) {
  const [activeTab, setActiveTab] = useState('recent');

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getIdeaIcon = (type: RecentIdea['type']) => {
    switch (type) {
      case 'goal-hierarchy': return '🎯';
      case 'daily-action': return '⚡';
      case 'motivation': return '💡';
      case 'refinement': return '🔄';
      default: return '📝';
    }
  };

  const getIdeaColor = (type: RecentIdea['type']) => {
    switch (type) {
      case 'goal-hierarchy': return 'text-[#8b5cf6]';
      case 'daily-action': return 'text-[#3b82f6]';
      case 'motivation': return 'text-[#10b981]';
      case 'refinement': return 'text-[#f59e0b]';
      default: return 'text-[#cbd5e1]';
    }
  };

  const sortedIdeas = [...recentIdeas].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-[400px] border-l z-50 flex flex-col glass-dark"
            style={{
              background: 'rgba(28, 28, 30, 0.8)',
              backdropFilter: 'blur(20px) saturate(180%)',
              borderColor: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-6 border-b"
              style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div>
                <h2 
                  style={{
                    color: '#ffffff',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                  }}
                >
                  Recent Ideas
                </h2>
                <p 
                  style={{
                    color: 'rgba(235, 235, 245, 0.6)',
                    fontSize: '0.75rem',
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                  }}
                >
                  {recentIdeas.length} saved ideas
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 ease-apple"
                style={{
                  color: 'rgba(235, 235, 245, 0.8)',
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.background = 'rgba(0, 122, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(235, 235, 245, 0.8)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <div className="px-6 pt-4">
                <TabsList className="grid w-full grid-cols-2 bg-[#2c2d30]">
                  <TabsTrigger 
                    value="recent" 
                    className="data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white"
                  >
                    Recent
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings"
                    className="data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white"
                  >
                    Settings
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Recent Ideas Tab */}
              <TabsContent value="recent" className="flex-1 flex flex-col m-0">
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[#cbd5e1] text-[14px]">
                      Your AI-generated content
                    </p>
                    {recentIdeas.length > 0 && (
                      <Button
                        onClick={onClearIdeas}
                        variant="ghost"
                        size="sm"
                        className="text-[#ef4444] hover:text-[#ef4444] hover:bg-[#ef4444]/10"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>
                </div>

                <ScrollArea className="flex-1 px-6">
                  {sortedIdeas.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-[#3b82f6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-[#3b82f6] text-[24px]">💡</span>
                      </div>
                      <p className="text-[#cbd5e1] text-[14px] mb-2">No ideas yet</p>
                      <p className="text-[#64748b] text-[12px]">
                        Complete onboarding or generate daily actions to see your ideas here
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 pb-6">
                      {sortedIdeas.map((idea) => (
                        <Card key={idea.id} className="bg-[#2c2d30]/50 border-[#3b82f6]/20 relative group">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-[16px]">{getIdeaIcon(idea.type)}</span>
                                <div>
                                  <CardTitle className="text-[#f8fafc] text-[14px] font-medium">
                                    {idea.title}
                                  </CardTitle>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge 
                                      variant="outline" 
                                      className={`${getIdeaColor(idea.type)} border-current text-[10px] px-1.5 py-0.5`}
                                    >
                                      {idea.type.replace('-', ' ')}
                                    </Badge>
                                    <span className="text-[#64748b] text-[10px]">
                                      {formatDate(new Date(idea.timestamp))}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <CopyButton 
                                text={idea.content} 
                                variant="ghost" 
                                size="sm" 
                                showLabel={false}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              />
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-[#cbd5e1] text-[12px] line-clamp-3">
                              {idea.content}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="flex-1 flex flex-col m-0">
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-[#f8fafc] text-[16px] font-medium mb-4">Account Settings</h3>
                      
                      <Card className="bg-[#2c2d30]/50 border-[#3b82f6]/20">
                        <CardContent className="p-4 space-y-4">
                          <Button
                            onClick={onOpenSettings}
                            variant="outline"
                            className="w-full justify-start text-[#cbd5e1] border-[#64748b]/40 hover:border-[#3b82f6]/40 hover:text-[#3b82f6]"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Edit Profile
                          </Button>

                          <Separator className="bg-[#3b82f6]/20" />

                          <Button
                            onClick={onClearIdeas}
                            variant="outline"
                            className="w-full justify-start text-[#f59e0b] border-[#f59e0b]/40 hover:border-[#f59e0b] hover:bg-[#f59e0b]/10"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Clear All Ideas
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-[#f8fafc] text-[16px] font-medium mb-4">Danger Zone</h3>
                      
                      <Card className="bg-[#ef4444]/5 border-[#ef4444]/20">
                        <CardContent className="p-4">
                          <Button
                            onClick={onOpenSettings}
                            variant="outline"
                            className="w-full justify-start text-[#ef4444] border-[#ef4444]/40 hover:border-[#ef4444] hover:bg-[#ef4444]/10"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            Delete All Data
                          </Button>
                          <p className="text-[#ef4444]/70 text-[11px] mt-2">
                            This will permanently delete your account and all generated content
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}