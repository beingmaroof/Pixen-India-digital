import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'elevated' | 'bordered';
}

export default function Card({
  children,
  className = '',
  hover = true,
  variant = 'default',
}: CardProps) {
  const variantStyles = {
    default: 'bg-white shadow-md',
    elevated: 'bg-white shadow-xl',
    bordered: 'bg-white border-2 border-gray-200',
  };
  
  const hoverStyles = hover 
    ? 'cursor-pointer hover-lift shadow-glow-hover' 
    : '';
  
  return (
    <div className={`${variantStyles[variant]} rounded-xl p-6 ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
