import React, { useState } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { OutputLine } from './Output';

// Dummy imports for sections until they are created
import { About } from '../Sections/About';
import { Skills } from '../Sections/Skills';
import { startDSAChallenge, validateDSAChallenge, startSystemDesignChallenge, validateSystemDesignChallenge } from '@/lib/challenges';
import { Projects } from '../Sections/Projects';
import { Contact } from '../Sections/Contact';

export const processCommand = (
  input: string,
  addCommandToHistory: (c: string) => void,
  pushLines: (lines: OutputLine[]) => void,
  clearLines: () => void,
  theme: string,
  setTheme: (t: any) => void,
  activeChallenge: string,
  setActiveChallenge: (c: any) => void,
  unlockProjects: () => void,
  unlockContact: () => void,
  achievements: string[],
  addAchievement: (id: string) => void
) => {
  const [cmd, ...args] = input.trim().split(' ');
  const command = cmd.toLowerCase();

  addCommandToHistory(input);

  // Echo the command back to screen
  const echoId = Date.now().toString();
  pushLines([{ id: echoId, content: input, isCommand: true }]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  let output: React.ReactNode | string = '';

  // Intercept challenge inputs
  if (activeChallenge === 'dsa') {
    output = validateDSAChallenge(input, unlockProjects, setActiveChallenge, addAchievement);
    pushLines([{ id: generateId(), content: output }]);
    return;
  }

  if (activeChallenge === 'system_design') {
    output = validateSystemDesignChallenge(input, unlockContact, setActiveChallenge, addAchievement);
    pushLines([{ id: generateId(), content: output }]);
    return;
  }

  switch (command) {
    case 'help':
      output = (
        <div className="text-cyan-300">
          <div>AVAILABLE COMMANDS:</div>
          <div>-------------------</div>
          <div className="grid grid-cols-2 gap-2 max-w-md mt-2">
            <div><span className="text-fuchsia-400">help</span> - Show this message</div>
            <div><span className="text-fuchsia-400">about</span> - About Ajay Kumar</div>
            <div><span className="text-fuchsia-400">skills</span> - View tech stack</div>
            <div><span className="text-fuchsia-400">projects</span> - View projects (Locked)</div>
            <div><span className="text-fuchsia-400">contact</span> - Contact info</div>
            <div><span className="text-fuchsia-400">clear</span> - Clear terminal</div>
            <div><span className="text-fuchsia-400">theme</span> - Toggle theme (matrix/hacker)</div>
          </div>
          <div className="mt-4">FUN & HIDDEN COMMANDS:</div>
          <div>-------------------</div>
          <div className="grid grid-cols-2 gap-2 max-w-md mt-2">
            <div><span className="text-yellow-400">whoami</span></div>
            <div><span className="text-yellow-400">hack</span></div>
            <div><span className="text-yellow-400">exit</span></div>
            <div><span className="text-yellow-400">sudo</span></div>
          </div>
        </div>
      );
      break;

    case 'clear':
      clearLines();
      return; // Do not push new lines

    case 'about':
      output = <About />;
      break;

    case 'skills':
      if (args[0] === '--detail') {
        const category = args[1] ? args[1].toUpperCase() : '';
        if (category) {
          output = (
            <div className="text-cyan-300">
              <span className="text-yellow-400">Analyzing {category} proficiency...</span>
              <br />
              <div className="mt-2 text-fuchsia-400">
                ERROR 404: "Enough knowledge" not found.
              </div>
              <div className="mt-1 text-gray-300">
                Current status: Perpetually Googling things I "learned" 3 years ago. 
                <br />
                Estimated time until mastery: ∞ years.
              </div>
            </div>
          );
        } else {
          output = <div className="text-red-500">Usage: skills --detail [category]</div>;
        }
      } else {
        output = <Skills />;
      }
      break;

    case 'projects':
      const isProjectsUnlocked = usePortfolioStore.getState().unlockedProjects;
      if (!isProjectsUnlocked) {
         output = <div className="text-red-500">ACCESS DENIED. Type 'unlock projects' to solve the challenge.</div>;
      } else {
         output = <Projects />;
      }
      break;

    case 'contact':
      output = <Contact />;
      break;

    case 'unlock':
    case 'test': // Added so you can re-test challenges anytime!
      if (args[0] === 'projects') {
        output = startDSAChallenge();
        setActiveChallenge('dsa');
      } else if (args[0] === 'contact') {
        output = "Contact section is already unlocked! But if you want to test your system design skills, type 'test system_design'.";
      } else if (args[0] === 'system_design') {
        output = startSystemDesignChallenge();
        setActiveChallenge('system_design');
      } else {
        output = `Usage: ${command} [projects|system_design]`;
      }
      break;

    case 'sudo':
      output = "Nice try! But you'll need more than sudo here 😏";
      addAchievement('easter_egg');
      break;
      
    case 'whoami':
      output = "You are: Curious Visitor | Access Level: Guest | Skills: Impressive";
      addAchievement('easter_egg');
      break;
      
    case 'exit':
      output = "You cannot escape. There is no exit. Try 'help' instead.";
      addAchievement('easter_egg');
      break;

    case 'hack':
      output = "Initiating cyber attack... Just kidding! This is a portfolio, not Mr. Robot 🤖\nTry unlocking sections using: 'unlock projects' or 'test system_design'";
      addAchievement('easter_egg');
      break;

    case 'neofetch':
      const neo = `
        ajay@portfolio
        ----------------
        OS: AI System v2.0
        Host: Portfoli-O-Tron
        Kernel: 5.15.0-generic
        Uptime: ${Math.floor(Date.now()/1000) % 1000} mins
        Packages: OVER 9000
        Shell: Next/React zsh
        Theme: ${theme}
        Terminal: xterm-react
      `;
      output = <div className="whitespace-pre">{neo}</div>;
      break;

    case 'achievements':
       output = (
         <div className="text-cyan-300">
           <div>UNLOCKED ACHIEVEMENTS:</div>
           {achievements.length === 0 && <div className="text-gray-500">None yet. Start hacking!</div>}
           {achievements.map((a) => (
              <div key={a} className="text-yellow-300">- {a.replace('_', ' ').toUpperCase()}</div>
           ))}
         </div>
       );
       break;

    case 'theme':
         if (['matrix', 'cyberpunk', 'hacker'].includes(args[0])) {
            setTheme(args[0] as any);
            output = `Theme updated to ${args[0]}`;
         } else {
            output = `Usage: theme [matrix|cyberpunk|hacker]. Current: ${theme}`;
         }
         break;

    default:
      output = <div className="text-red-500">Command not found: {command}. Type 'help' to see available commands.</div>;
  }

  pushLines([{ id: generateId(), content: output }]);
};
