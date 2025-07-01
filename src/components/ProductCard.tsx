
import { useState } from 'react';
import { ShoppingCart, Zap, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Feature {
  text: string;
  included: boolean;
}

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  features: Feature[];
  popular?: boolean;
  comingSoon?: boolean;
}

export default function ProductCard({ 
  title, 
  description, 
  price, 
  features, 
  popular = false,
  comingSoon = false 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const handlePurchase = () => {
    if (comingSoon) {
      toast({
        title: "Coming Soon!",
        description: "This product will be available soon. Contact us for early access.",
        className: "bg-cyber-dark-card border-neon-green/50 text-neon-green"
      });
    } else {
      toast({
        title: "Redirecting to Crypto Payment",
        description: "Opening secure cryptocurrency payment gateway...",
        className: "bg-cyber-dark-card border-neon-green/50 text-neon-green"
      });
    }
  };

  const handleBulkDiscount = () => {
    toast({
      title: "Bulk Discount Options",
      description: "Contact us for enterprise pricing and lifetime licenses!",
      className: "bg-cyber-dark-card border-neon-green/50 text-neon-green"
    });
  };

  return (
    <div 
      className={`relative cyber-card transition-all duration-300 transform ${
        isHovered ? 'scale-105 shadow-[0_0_30px_rgba(0,255,65,0.3)]' : ''
      } ${popular ? 'ring-2 ring-neon-green/50' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-neon-gradient text-black px-4 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>MOST POPULAR</span>
          </div>
        </div>
      )}

      {comingSoon && (
        <div className="absolute top-4 right-4">
          <div className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 px-2 py-1 rounded text-xs">
            COMING SOON
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-neon-green matrix-text mb-2">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white">{price}</span>
            <span className="text-gray-400 text-sm">/ lifetime</span>
          </div>
          <p className="text-xs text-neon-green mt-1">Cryptocurrency payments only</p>
        </div>

        {/* Features */}
        <div className="mb-6 space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className={`w-4 h-4 ${
                feature.included ? 'text-neon-green' : 'text-gray-500'
              }`} />
              <span className={`text-sm ${
                feature.included ? 'text-gray-200' : 'text-gray-500 line-through'
              }`}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            onClick={handlePurchase}
            className="w-full neon-button group"
            disabled={comingSoon}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {comingSoon ? 'NOTIFY ME' : 'PURCHASE NOW'}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            onClick={handleBulkDiscount}
            variant="outline" 
            className="w-full border-neon-green/30 text-neon-green hover:bg-neon-green/10"
          >
            <Shield className="w-4 h-4 mr-2" />
            VIEW BULK DISCOUNTS
          </Button>
        </div>

        {/* Security Badge */}
        <div className="mt-4 p-2 bg-neon-green/5 border border-neon-green/20 rounded text-center">
          <p className="text-xs text-gray-400">
            🔒 Anonymous • Encrypted • No logs
          </p>
        </div>
      </div>
    </div>
  );
}
