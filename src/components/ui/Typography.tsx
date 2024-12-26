import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export function Heading1({ children, className = '' }: TextProps) {
  return (
    <h1 className={`text-2xl md:text-3xl font-bold text-gray-900 dark:text-white ${className}`}>
      {children}
    </h1>
  );
}

export function Heading2({ children, className = '' }: TextProps) {
  return (
    <h2 className={`text-xl md:text-2xl font-semibold text-gray-900 dark:text-white ${className}`}>
      {children}
    </h2>
  );
}

export function Label({ children, className = '' }: TextProps) {
  return (
    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}>
      {children}
    </label>
  );
}

export function Text({ children, className = '' }: TextProps) {
  return (
    <p className={`text-sm text-gray-600 dark:text-gray-400 ${className}`}>
      {children}
    </p>
  );
}