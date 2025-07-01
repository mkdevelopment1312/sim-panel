
import { useState } from 'react';
import { X, Mail, Lock, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onModeChange: (mode: 'login' | 'register') => void;
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive"
        });
        return;
      }
    }

    toast({
      title: mode === 'login' ? "Login Successful" : "Registration Successful",
      description: `Welcome to XAXA SOFTWARE platform!`,
      className: "bg-cyber-dark-card border-neon-green/50 text-neon-green"
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md mx-4 animate-fade-in-up">
        <div className="glass-panel rounded-xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-neon-green animate-glow-pulse" />
              <h2 className="text-2xl font-bold matrix-text">
                {mode === 'login' ? 'SECURE LOGIN' : 'JOIN XAXA'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neon-green/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Username</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="bg-cyber-dark border-neon-green/30 focus:border-neon-green text-white"
                  placeholder="Enter your username"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-cyber-dark border-neon-green/30 focus:border-neon-green text-white"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300 flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="bg-cyber-dark border-neon-green/30 focus:border-neon-green text-white"
                placeholder="Enter your password"
                required
              />
            </div>

            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300 flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Confirm Password</span>
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="bg-cyber-dark border-neon-green/30 focus:border-neon-green text-white"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            <Button type="submit" className="w-full neon-button mt-6">
              {mode === 'login' ? 'ACCESS SYSTEM' : 'CREATE ACCOUNT'}
            </Button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
              className="text-neon-green hover:text-neon-green-light transition-colors font-medium"
            >
              {mode === 'login' ? 'Register Now' : 'Login Here'}
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
            <p className="text-xs text-center text-gray-300">
              🔐 End-to-end encrypted • Anonymous payments accepted • No logs stored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
