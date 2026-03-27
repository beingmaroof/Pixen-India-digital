import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: 'white' | 'gray' | 'primary' | 'accent' | 'dark';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
  container?: boolean;
}

export default function Section({
  children,
  className = '',
  bgColor = 'white',
  padding = 'lg',
  id,
  container = true,
}: SectionProps) {
  const bgStyles = {
    white: 'bg-white',
    gray: 'bg-gradient-to-b from-gray-50 to-white',
    // Use a dark background so `text-white` content looks correct on "primary" sections.
    primary: 'bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white',
    accent: 'bg-gradient-to-br from-accent-50 via-accent-50/50 to-white',
    dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white',
  };
  
  const paddingStyles = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-20 md:py-32',
  };
  
  return (
    <section
      id={id}
      className={`${bgStyles[bgColor]} ${paddingStyles[padding]} ${className}`}
    >
      {container ? <div className="container-custom">{children}</div> : children}
    </section>
  );
}
