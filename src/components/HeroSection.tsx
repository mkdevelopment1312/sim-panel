
import { useState, useEffect } from 'react';
import { Zap, Shield, Users, Bot, ArrowRight, Play, Terminal, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onAuthModal: () => void;
}

export default function HeroSection({ onAuthModal }: HeroSectionProps) {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const text = "XAXA.WIN";
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 200);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-dark">
      {/* Clean minimal background */}
      <div className="absolute inset-0">
        {/* Subtle grid overlay */}
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

      {/* Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-6">
        {/* Modern XAXA Brand */}
        <div className="mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <h1 className="text-8xl md:text-[12rem] font-bold modern-brand font-orbitron tracking-wider">
                {typedText}<span className="animate-pulse text-neon-green">|</span>
              </h1>
              <div className="absolute -inset-4 bg-neon-green/5 rounded-2xl blur-3xl"></div>
            </div>
          </div>
          
          <div className="glass-panel rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-rajdhani">
              PROFESSIONAL TELEGRAM AUTOMATION
            </h2>
            <p className="text-lg text-gray-300 font-rajdhani font-light leading-relaxed">
              Advanced multi-account management • Automated forwarding • Enterprise security
            </p>
          </div>
        </div>

        {/* Clean Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {[
            { icon: Bot, label: 'Active Bots', value: '10K+' },
            { icon: Users, label: 'Users', value: '5K+' },
            { icon: Shield, label: 'Uptime', value: '99.9%' },
            { icon: Code, label: 'Messages/sec', value: '1K+' }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4">
                <stat.icon className="w-8 h-8 text-neon-green mx-auto group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-3xl font-bold text-white mb-2 font-orbitron">{stat.value}</div>
              <div className="text-sm text-gray-400 font-rajdhani">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Modern CTA */}
        <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button 
            onClick={onAuthModal}
            className="neon-button text-xl px-16 py-6 group relative"
          >
            <span className="relative z-10 flex items-center">
              <Play className="w-6 h-6 mr-3" />
              START NOW
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </Button>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400 font-rajdhani">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-neon-green" />
              <span>ENCRYPTED</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-neon-green" />
              <span>ANONYMOUS</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bot className="w-4 h-4 text-neon-green" />
              <span>SECURE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
