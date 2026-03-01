"use client";

import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const AI_MESSAGES = [
  "Analyzing user interaction patterns...",
  "Running heuristics on terminal input...",
  "Scanning GitHub repositories...",
  "Optimizing component render trees...",
  "Monitoring network latency...",
  "Calculating algorithmic complexity...",
  "Updating neural weights...",
  "Verifying cache integrity...",
  "Simulating potential system faults...",
  "Observing cursor movements...",
];

export const AILogger: React.FC = () => {
  const [logs, setLogs] = useState<{ id: number, text: string, type: string, time: string }[]>([]);
  const isBooting = usePortfolioStore((state) => state.isBooting);

  useEffect(() => {
    if (isBooting) return;

    let id = 0;
    const addLog = () => {
      const msg = AI_MESSAGES[Math.floor(Math.random() * AI_MESSAGES.length)];
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      setLogs((prev) => {
        const next = [...prev, { id: id++, text: msg, type: Math.random() > 0.8 ? 'SYSTEM' : 'AI   ', time }];
        if (next.length > 5) return next.slice(next.length - 5);
        return next;
      });
    };

    const interval = setInterval(addLog, 4000);
    addLog();

    return () => clearInterval(interval);
  }, [isBooting]);

  if (isBooting) return null;

  return (
    <div className="absolute bottom-4 left-4 text-xs font-mono text-zinc-500 hidden md:block z-20 pointer-events-none max-w-sm">
      {logs.map((log) => (
        <div key={log.id} className="flex gap-2">
          <span>[{log.time}]</span>
          <span className={log.type.trim() === 'SYSTEM' ? "text-cyan-700" : "text-fuchsia-700"}>[{log.type}]</span>
          <span>{log.text}</span>
        </div>
      ))}
    </div>
  );
};
