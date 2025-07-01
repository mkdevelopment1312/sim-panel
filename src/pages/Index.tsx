
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import AuthModal from '@/components/AuthModal';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  Users, 
  ShoppingCart, 
  MessageSquare, 
  Database, 
  Shield, 
  CreditCard, 
  Settings,
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  HelpCircle,
  Lock,
  Wallet,
  MessageCircle
} from 'lucide-react';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' as 'login' | 'register' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const products = [
    {
      title: 'FORWARD',
      description: 'Advanced message forwarding with anti-detection protocols',
      price: '$299',
      features: [
        { text: 'Multi-account forwarding', included: true },
        { text: 'Anti-spam protection', included: true },
        { text: 'Custom delay settings', included: true },
        { text: 'Message filtering', included: true },
        { text: 'Analytics dashboard', included: true }
      ],
      popular: true
    },
    {
      title: 'JOINING',
      description: 'Automated group joining and member management',
      price: '$199',
      features: [
        { text: 'Auto group joining', included: true },
        { text: 'Member verification', included: true },
        { text: 'Bulk operations', included: true },
        { text: 'Activity monitoring', included: true },
        { text: 'API access', included: false }
      ]
    },
    {
      title: 'FACEBOOK PANEL',
      description: 'Professional Facebook automation suite',
      price: '$399',
      features: [
        { text: 'Multi-account management', included: true },
        { text: 'Post scheduling', included: true },
        { text: 'Friend management', included: true },
        { text: 'Analytics & insights', included: true },
        { text: 'Advanced targeting', included: true }
      ]
    },
    {
      title: 'DISCORD BOT',
      description: 'Advanced Discord automation and management',
      price: '$249',
      features: [
        { text: 'Multi-server management', included: true },
        { text: 'Member automation', included: true },
        { text: 'Message scheduling', included: true },
        { text: 'Role management', included: true },
        { text: 'Raid protection', included: true }
      ]
    },
    {
      title: 'ANONYMOUS GATEWAY',
      description: 'Complete anonymity and privacy protection',
      price: '$599',
      features: [
        { text: 'Military-grade encryption', included: true },
        { text: 'VPN integration', included: true },
        { text: 'Identity masking', included: true },
        { text: 'Zero-log policy', included: true },
        { text: 'Tor network support', included: true }
      ],
      popular: true
    },
    {
      title: 'TELEGRAM ACCOUNTS',
      description: 'Premium aged Telegram accounts ready to use',
      price: '$49',
      features: [
        { text: 'Aged accounts (6+ months)', included: true },
        { text: 'Phone verified', included: true },
        { text: 'No restrictions', included: true },
        { text: 'Instant delivery', included: true },
        { text: 'Replacement warranty', included: true }
      ]
    },
    {
      title: 'INSTAGRAM PANEL',
      description: 'Complete Instagram automation solution',
      price: '$349',
      features: [
        { text: 'Multi-account support', included: true },
        { text: 'Auto posting & stories', included: true },
        { text: 'Follower management', included: true },
        { text: 'Analytics tracking', included: true },
        { text: 'DM automation', included: true }
      ],
      comingSoon: true
    },
    {
      title: 'TWITTER AUTOMATION',
      description: 'Professional Twitter/X automation tools',
      price: '$279',
      features: [
        { text: 'Tweet scheduling', included: true },
        { text: 'Follower automation', included: true },
        { text: 'Engagement tracking', included: true },
        { text: 'Mass operations', included: true },
        { text: 'Trend analysis', included: true }
      ],
      comingSoon: true
    },
    {
      title: 'SOCIAL MEDIA BUNDLE',
      description: 'Complete automation suite for all platforms',
      price: '$999',
      features: [
        { text: 'All XAXA tools included', included: true },
        { text: 'Priority support', included: true },
        { text: 'Free updates', included: true },
        { text: 'Custom configurations', included: true },
        { text: 'Enterprise features', included: true }
      ],
      popular: true
    }
  ];

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const renderContent = () => {
    if (!isLoggedIn && activeSection === 'dashboard') {
      return <HeroSection onAuthModal={() => openAuthModal('register')} />;
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400">Welcome back to XAXA SOFTWARE platform</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="cyber-card px-4 py-2">
                  <span className="text-neon-green text-sm font-medium">Status: ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Active Bots', value: '12', icon: Bot, change: '+2' },
                { label: 'Messages Today', value: '1,337', icon: MessageSquare, change: '+24%' },
                { label: 'Total Accounts', value: '48', icon: Users, change: '+5' },
                { label: 'Uptime', value: '99.9%', icon: Zap, change: '0%' }
              ].map((stat, index) => (
                <div key={index} className="cyber-card">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-6 h-6 text-neon-green" />
                    <span className="text-xs text-green-400">{stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="cyber-card">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {[
                  'Bot #7 forwarded 142 messages successfully',
                  'New account verified: @user_8849',
                  'Payment received: $299 BTC',
                  'System backup completed'
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-cyber-dark/50 rounded">
                    <CheckCircle className="w-4 h-4 text-neon-green" />
                    <span className="text-gray-300 text-sm">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'shop':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4 font-orbitron">XAXA SOFTWARE STORE</h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-rajdhani">
                Professional automation tools for Telegram and social media platforms. 
                All payments in cryptocurrency for maximum anonymity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>

            {/* Enterprise Section */}
            <div className="cyber-card text-center">
              <Star className="w-12 h-12 text-neon-green mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4 font-orbitron">Enterprise Solutions</h2>
              <p className="text-gray-300 mb-6 font-rajdhani">
                Need custom solutions? We provide enterprise-grade automation with dedicated support.
              </p>
              <Button className="neon-button">
                Contact Enterprise Sales
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-dark">
            <div className="absolute inset-0">
              <div className="absolute inset-0 opacity-5" 
                   style={{
                     backgroundImage: `
                       linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
                     `,
                     backgroundSize: '100px 100px'
                   }}
              />
            </div>

            <div className="relative z-10 text-center max-w-7xl mx-auto px-6">
              <div className="mb-16 animate-fade-in-up">
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <h1 className="text-6xl md:text-8xl font-bold modern-brand font-orbitron tracking-wider">
                      PAYMENTS
                    </h1>
                    <div className="absolute -inset-4 bg-neon-green/5 rounded-2xl blur-3xl"></div>
                  </div>
                </div>
                
                <div className="glass-panel rounded-2xl p-8 max-w-4xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-rajdhani">
                    CRYPTOCURRENCY PAYMENTS ONLY
                  </h2>
                  <p className="text-lg text-gray-300 font-rajdhani font-light leading-relaxed">
                    Complete anonymity • Instant transactions • Global accessibility
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {[
                  { icon: CreditCard, label: 'Bitcoin', value: 'BTC' },
                  { icon: Wallet, label: 'Ethereum', value: 'ETH' },
                  { icon: CreditCard, label: 'Litecoin', value: 'LTC' },
                  { icon: Wallet, label: 'Monero', value: 'XMR' }
                ].map((crypto, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-4">
                      <crypto.icon className="w-8 h-8 text-neon-green mx-auto group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-2 font-orbitron">{crypto.value}</div>
                    <div className="text-sm text-gray-400 font-rajdhani">{crypto.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Button 
                  onClick={() => setActiveSection('shop')}
                  className="neon-button text-xl px-16 py-6 group relative"
                >
                  <span className="relative z-10 flex items-center">
                    <Wallet className="w-6 h-6 mr-3" />
                    VIEW PRICING
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-dark">
            <div className="absolute inset-0">
              <div className="absolute inset-0 opacity-5" 
                   style={{
                     backgroundImage: `
                       linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
                     `,
                     backgroundSize: '100px 100px'
                   }}
              />
            </div>

            <div className="relative z-10 text-center max-w-7xl mx-auto px-6">
              <div className="mb-16 animate-fade-in-up">
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <h1 className="text-6xl md:text-8xl font-bold modern-brand font-orbitron tracking-wider">
                      SECURITY
                    </h1>
                    <div className="absolute -inset-4 bg-neon-green/5 rounded-2xl blur-3xl"></div>
                  </div>
                </div>
                
                <div className="glass-panel rounded-2xl p-8 max-w-4xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-rajdhani">
                    MILITARY-GRADE ENCRYPTION
                  </h2>
                  <p className="text-lg text-gray-300 font-rajdhani font-light leading-relaxed">
                    End-to-end encryption • Zero-log policy • Anonymous operation
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {[
                  { icon: Shield, label: 'Encryption', value: 'AES-256' },
                  { icon: Lock, label: 'Privacy', value: '100%' },
                  { icon: Shield, label: 'Uptime', value: '99.9%' },
                  { icon: Lock, label: 'Anonymous', value: 'TOTAL' }
                ].map((security, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-4">
                      <security.icon className="w-8 h-8 text-neon-green mx-auto group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-2 font-orbitron">{security.value}</div>
                    <div className="text-sm text-gray-400 font-rajdhani">{security.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-400 font-rajdhani">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-neon-green" />
                    <span>ZERO LOGS</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-neon-green" />
                    <span>ENCRYPTED</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-neon-green" />
                    <span>ANONYMOUS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-dark">
            <div className="absolute inset-0">
              <div className="absolute inset-0 opacity-5" 
                   style={{
                     backgroundImage: `
                       linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
                     `,
                     backgroundSize: '100px 100px'
                   }}
              />
            </div>

            <div className="relative z-10 text-center max-w-7xl mx-auto px-6">
              <div className="mb-16 animate-fade-in-up">
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <h1 className="text-6xl md:text-8xl font-bold modern-brand font-orbitron tracking-wider">
                      SUPPORT
                    </h1>
                    <div className="absolute -inset-4 bg-neon-green/5 rounded-2xl blur-3xl"></div>
                  </div>
                </div>
                
                <div className="glass-panel rounded-2xl p-8 max-w-4xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-rajdhani">
                    24/7 TECHNICAL SUPPORT
                  </h2>
                  <p className="text-lg text-gray-300 font-rajdhani font-light leading-relaxed">
                    Expert assistance • Quick response • Professional service
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {[
                  { icon: MessageCircle, label: 'Live Chat', desc: 'Instant support chat' },
                  { icon: HelpCircle, label: 'Help Center', desc: 'Comprehensive guides' },
                  { icon: MessageSquare, label: 'Ticket System', desc: 'Priority support tickets' }
                ].map((support, index) => (
                  <div key={index} className="glass-panel rounded-2xl p-6 text-center group hover:border-neon-green/50 transition-all duration-300">
                    <support.icon className="w-12 h-12 text-neon-green mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold text-white mb-2 font-rajdhani">{support.label}</h3>
                    <p className="text-gray-400 font-rajdhani">{support.desc}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Button 
                  onClick={() => window.open('mailto:mkdevelopment999@gmail.com', '_blank')}
                  className="neon-button text-xl px-16 py-6 group relative"
                >
                  <span className="relative z-10 flex items-center">
                    <MessageCircle className="w-6 h-6 mr-3" />
                    CONTACT SUPPORT
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Button>

                <div className="text-gray-400 font-rajdhani">
                  <p>Email: mkdevelopment999@gmail.com</p>
                  <p>Response time: &lt; 2 hours</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'forward':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">XAXA SOFTWARE FORWARD</h1>
              <p className="text-gray-300">Advanced Telegram message forwarding system</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="cyber-card">
                <h2 className="text-xl font-bold text-neon-green mb-4">Key Features</h2>
                <div className="space-y-3">
                  {[
                    'Multi-account message forwarding',
                    'SpamBot monitoring and ban management', 
                    'Custom delay and timing controls',
                    'Message filtering and processing',
                    'Real-time analytics dashboard',
                    'Discord notifications integration',
                    'Advanced error handling',
                    'Performance optimization with caching'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-neon-green" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cyber-card">
                <h2 className="text-xl font-bold text-neon-green mb-4">Configuration</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm">Forward Delay (seconds)</label>
                    <input 
                      type="number" 
                      className="w-full mt-1 bg-cyber-dark border border-neon-green/30 rounded px-3 py-2 text-white"
                      defaultValue="5"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm">Max Accounts</label>
                    <input 
                      type="number" 
                      className="w-full mt-1 bg-cyber-dark border border-neon-green/30 rounded px-3 py-2 text-white"
                      defaultValue="10"
                    />
                  </div>
                  <Button className="w-full neon-button">
                    Update Configuration
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="cyber-card text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Section: {activeSection}</h2>
            <p className="text-gray-300 mb-6">This section is under development</p>
            <Button className="neon-button">
              Request Access
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="ml-16 lg:ml-64 transition-all duration-300">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 glass-panel border-b border-neon-green/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
              <span className="text-neon-green text-sm matrix-text">SYSTEM ONLINE</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <Button 
                    variant="outline"
                    className="border-neon-green/30 text-neon-green hover:bg-neon-green/10"
                    onClick={() => openAuthModal('login')}
                  >
                    LOGIN
                  </Button>
                  <Button 
                    className="neon-button"
                    onClick={() => openAuthModal('register')}
                  >
                    REGISTER
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline"
                  className="border-neon-green/30 text-neon-green hover:bg-neon-green/10"
                  onClick={() => setIsLoggedIn(false)}
                >
                  LOGOUT
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal(prev => ({ ...prev, isOpen: false }))}
        mode={authModal.mode}
        onModeChange={(mode) => setAuthModal(prev => ({ ...prev, mode }))}
      />
    </div>
  );
};

export default Index;
