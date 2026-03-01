import React, { useState, useEffect, useRef } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

interface InputProps {
  onCommand: (command: string) => void;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({ onCommand, disabled = false }) => {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const commandHistory = usePortfolioStore((state) => state.commandHistory);

  // Auto focus
  useEffect(() => {
    const focusInput = () => {
      if (!disabled && inputRef.current) {
        inputRef.current.focus();
      }
    };
    focusInput();
    document.addEventListener('click', focusInput);
    return () => document.removeEventListener('click', focusInput);
  }, [disabled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        onCommand(input.trim());
        setInput('');
        setHistoryIndex(-1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'c' && e.ctrlKey) {
       setInput('');
    }
  };

  return (
    <div className="flex items-center text-[#00ff00] font-mono">
      <span className="mr-2 text-fuchsia-500 font-bold whitespace-nowrap">user@ajay-system:~$</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-1 bg-transparent outline-none border-none text-current"
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
      />
    </div>
  );
};
