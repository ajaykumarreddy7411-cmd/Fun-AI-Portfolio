"use client";

import React, { useState, useEffect } from 'react';
import { Output, OutputLine } from './Output';
import { Input } from './Input';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { processCommand } from './CommandProcessor';

const INITIAL_BOOT_SEQUENCE = [
  "INITIALIZING SYSTEM...",
  "[████████████████████] 100%",
  "AJAY KUMAR PORTFOLIO SYSTEM v2.0",
  "Booting AI Core...",
  "Loading Neural Networks...",
  "Establishing Secure Connection...",
  "SYSTEM READY.",
  "Type 'help' to begin."
];

export const Terminal: React.FC = () => {
  const [lines, setLines] = useState<OutputLine[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const isBooting = usePortfolioStore((state) => state.isBooting);
  const completeBoot = usePortfolioStore((state) => state.completeBoot);
  const { 
    addCommandToHistory, 
    theme, 
    setTheme, 
    activeChallenge, 
    setActiveChallenge, 
    unlockProjects, 
    unlockContact, 
    achievements, 
    addAchievement 
  } = usePortfolioStore();

  const pushLines = (newLines: OutputLine[]) => {
    setLines((prev) => [...prev, ...newLines]);
  };

  const clearLines = () => {
    setLines([]);
  };

  // Boot sequence
  useEffect(() => {
    if (!isBooting) {
      setLines([
        {
          id: 'welcome',
          content: (
            <div className="mb-4">
              <div className="text-fuchsia-400">
                ╔═══════════════════════════════════════╗<br/>
                ║   WELCOME TO AJAY KUMAR'S SYSTEM     ║<br/>
                ║   AI-POWERED DEVELOPER PORTFOLIO     ║<br/>
                ╚═══════════════════════════════════════╝
              </div>
              <div className="text-yellow-400 mt-2">WARNING: This system is protected.</div>
              <div>You must prove your skills to access restricted areas.</div>
              <div className="mt-2 text-cyan-300">Available Commands: help, about, skills, projects, contact</div>
            </div>
          )
        }
      ]);
      return;
    }

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < INITIAL_BOOT_SEQUENCE.length) {
        setLines((prev) => {
          // Check if this step was already added to prevent duplicate keys in StrictMode
          if (prev.some(line => line.id === `boot-${currentStep}`)) return prev;
          
          return [
            ...prev,
            { id: `boot-${currentStep}`, content: INITIAL_BOOT_SEQUENCE[currentStep] }
          ];
        });
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
           clearLines();
           completeBoot();
        }, 800);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isBooting, completeBoot]);

  const handleCommand = async (command: string) => {
    setIsProcessing(true);
    processCommand(
      command, 
      addCommandToHistory, 
      pushLines, 
      clearLines, 
      theme, 
      setTheme,
      activeChallenge,
      setActiveChallenge,
      unlockProjects,
      unlockContact,
      achievements,
      addAchievement
    );
    if (!achievements.includes('first_command')) {
       addAchievement('first_command');
    }
    setIsProcessing(false);
  };

  return (
    <div className="w-full h-full p-4 md:p-8 overflow-y-auto no-scrollbar relative z-10">
      <div className="max-w-4xl mx-auto mt-12 md:mt-20">
         <Output lines={lines} />
         {!isBooting && <Input onCommand={handleCommand} disabled={isProcessing} />}
      </div>
    </div>
  );
};
