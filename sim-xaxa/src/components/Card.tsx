
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`bg-cyber-lighter border-2 border-gray-700 p-6 animate-fade-in ${className}`}>
      {title && (
        <h2 className="text-neon-green font-mono text-xl mb-6 uppercase tracking-wider">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Card;
