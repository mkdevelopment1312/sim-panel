
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'px-6 py-3 font-mono font-bold uppercase tracking-wider transition-all duration-300 border-2';
  const variantClasses = variant === 'primary' 
    ? 'bg-neon-green text-black border-neon-green hover:bg-transparent hover:text-neon-green hover:shadow-lg hover:shadow-neon-green/50'
    : 'bg-transparent text-neon-green border-neon-green hover:bg-neon-green hover:text-black hover:shadow-lg hover:shadow-neon-green/50';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
