import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { User } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export function SettingsModal({ 
  isOpen, 
  onClose, 
  user, 
  onUpdateUser, 
  onLogout, 
  onDeleteAccount 
}: SettingsModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    notifications: true,
    copyFeedback: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate save delay
    setTimeout(() => {
      const updatedUser: User = {
        ...user,
        name: formData.name,
        email: formData.email,
        lastActive: new Date()
      };
      
      onUpdateUser(updatedUser);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText.toLowerCase() === 'delete my account') {
      onDeleteAccount();
    }
  };

  const hasChanges = formData.name !== user.name || formData.email !== user.email;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-[#1a1b1e] border border-[#3b82f6]/30 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#3b82f6]/20">
            <div>
              <h2 className="text-[#f8fafc] text-[24px] font-medium">Settings</h2>
              <p className="text-[#cbd5e1] text-[14px]">Manage your account and preferences</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#cbd5e1] hover:text-[#f8fafc] hover:bg-[#3b82f6]/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="p-6 space-y-8">
              {/* Profile Settings */}
              <Card className="bg-[#2c2d30]/50 border-[#3b82f6]/20">
                <CardHeader>
                  <CardTitle className="text-[#f8fafc] flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-[#f8fafc] text-[14px] font-medium mb-2 block">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-[#1a1b1e] border-[#3b82f6]/30 text-[#f8fafc] placeholder-[#64748b]"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-[#f8fafc] text-[14px] font-medium mb-2 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-[#1a1b1e] border-[#3b82f6]/30 text-[#f8fafc] placeholder-[#64748b]"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-lg p-3">
                    <p className="text-[#3b82f6] text-[12px] font-medium mb-1">Account Created</p>
                    <p className="text-[#cbd5e1] text-[12px]">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card className="bg-[#2c2d30]/50 border-[#3b82f6]/20">
                <CardHeader>
                  <CardTitle className="text-[#f8fafc] flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#f8fafc] text-[14px] font-medium">Push Notifications</p>
                      <p className="text-[#cbd5e1] text-[12px]">Receive daily reminders and progress updates</p>
                    </div>
                    <Switch
                      checked={formData.notifications}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, notifications: checked }))}
                    />
                  </div>

                  <Separator className="bg-[#3b82f6]/20" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#f8fafc] text-[14px] font-medium">Copy Feedback</p>
                      <p className="text-[#cbd5e1] text-[12px]">Show confirmation when content is copied</p>
                    </div>
                    <Switch
                      checked={formData.copyFeedback}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, copyFeedback: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="bg-[#2c2d30]/50 border-[#3b82f6]/20">
                <CardHeader>
                  <CardTitle className="text-[#f8fafc] flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Account Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={onLogout}
                    variant="outline"
                    className="w-full justify-start text-[#cbd5e1] border-[#64748b]/40 hover:border-[#3b82f6]/40 hover:text-[#3b82f6]"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </Button>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="bg-[#ef4444]/5 border-[#ef4444]/20">
                <CardHeader>
                  <CardTitle className="text-[#ef4444] flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!showDeleteConfirm ? (
                    <div>
                      <p className="text-[#cbd5e1] text-[14px] mb-4">
                        This will permanently delete your account and all associated data including goals, 
                        progress, and generated content. This action cannot be undone.
                      </p>
                      <Button
                        onClick={() => setShowDeleteConfirm(true)}
                        variant="outline"
                        className="text-[#ef4444] border-[#ef4444]/40 hover:border-[#ef4444] hover:bg-[#ef4444]/10"
                      >
                        Delete Account
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-[#ef4444] text-[14px] font-medium">
                        Are you absolutely sure?
                      </p>
                      <p className="text-[#cbd5e1] text-[12px]">
                        Type <strong>"delete my account"</strong> to confirm deletion:
                      </p>
                      <Input
                        value={deleteConfirmText}
                        onChange={(e) => setDeleteConfirmText(e.target.value)}
                        placeholder="delete my account"
                        className="bg-[#1a1b1e] border-[#ef4444]/30 text-[#f8fafc] placeholder-[#64748b]"
                      />
                      <div className="flex gap-3">
                        <Button
                          onClick={handleDeleteAccount}
                          disabled={deleteConfirmText.toLowerCase() !== 'delete my account'}
                          className="bg-[#ef4444] hover:bg-[#dc2626] text-white flex-1"
                        >
                          Delete Account
                        </Button>
                        <Button
                          onClick={() => {
                            setShowDeleteConfirm(false);
                            setDeleteConfirmText('');
                          }}
                          variant="outline"
                          className="border-[#64748b] text-[#cbd5e1] hover:bg-[#64748b] hover:text-white flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center p-6 border-t border-[#3b82f6]/20">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-[#64748b] text-[#cbd5e1] hover:bg-[#64748b] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isLoading}
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}