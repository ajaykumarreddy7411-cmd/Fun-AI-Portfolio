import React from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  isError?: boolean;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className, isError }) => {
  return (
    <span
      className={cn(
        "glitch-text font-bold",
        isError ? "text-red-500" : "text-cyan-400",
        className
      )}
      data-text={text}
    >
      {text}
    </span>
  );
};
