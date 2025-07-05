import React from 'react';

interface AnimatedProgressBarProps {
  value: number;
  maxValue?: number;
  color: string;
  className?: string;
}

export function AnimatedProgressBar({ value, maxValue = 100, color, className = '' }: AnimatedProgressBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  // Create a dynamic width class based on percentage ranges
  const getWidthClass = (percent: number) => {
    if (percent >= 90) return 'w-full';
    if (percent >= 80) return 'w-5/6';
    if (percent >= 70) return 'w-4/6';
    if (percent >= 60) return 'w-3/5';
    if (percent >= 50) return 'w-1/2';
    if (percent >= 40) return 'w-2/5';
    if (percent >= 30) return 'w-1/3';
    if (percent >= 20) return 'w-1/5';
    if (percent >= 10) return 'w-1/12';
    return 'w-0';
  };
  
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden ${className}`}>
      <div 
        className={`h-2 rounded-full transition-all duration-1000 ease-in-out ${color} ${getWidthClass(percentage)}`}
      />
    </div>
  );
}
