
import { useState } from 'react';
import { 
  Home, 
  ShoppingCart, 
  Bot, 
  Users, 
  Database, 
  Shield, 
  CreditCard, 
  Settings, 
  MessageSquare,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'shop', label: 'Shop', icon: ShoppingCart },
    { id: 'forward', label: 'Forward', icon: Bot },
    { id: 'joining', label: 'Joining', icon: Users },
    { id: 'facebook', label: 'Facebook', icon: Database },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'support', label: 'Support', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-cyber-dark border-r border-neon-green/20 z-50 transition-all duration-300 glass-panel",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-neon-green/20">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold brand-text font-orbitron">XAXA</h1>
              <p className="text-xs text-gray-400 font-rajdhani">SOFTWARE</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-neon-green hover:bg-neon-green/10"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 font-rajdhani font-medium",
                activeSection === item.id
                  ? "bg-neon-green/20 text-neon-green border border-neon-green/30"
                  : "text-gray-400 hover:text-white hover:bg-cyber-dark-lighter",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="cyber-card p-3 text-center">
            <div className="w-3 h-3 bg-neon-green rounded-full mx-auto mb-2 animate-pulse"></div>
            <p className="text-xs text-neon-green font-rajdhani font-medium">SYSTEM ONLINE</p>
            <p className="text-xs text-gray-400 font-rajdhani">v2.0.1</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
