import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface OutputLine {
  id: string;
  content: React.ReactNode | string;
  isCommand?: boolean;
}

interface OutputProps {
  lines: OutputLine[];
}

export const Output: React.FC<OutputProps> = ({ lines }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div className="flex flex-col space-y-1 mb-2 font-mono whitespace-pre-wrap word-break">
      {lines.map((line) => (
        <div 
          key={line.id} 
          className={cn(
            "w-full",
            line.isCommand ? "text-cyan-400 font-bold" : "text-[#00ff00]"
          )}
        >
          {line.isCommand && <span className="mr-2 text-fuchsia-500">user@ajay-system:~$</span>}
          {line.content}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
