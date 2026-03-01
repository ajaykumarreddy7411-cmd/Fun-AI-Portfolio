"use client";

import React, { useState, useEffect } from 'react';

export const SystemMonitor: React.FC = () => {
  const [cpu, setCpu] = useState(45);
  const [ram, setRam] = useState(62);
  const [ai, setAi] = useState(89);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    // Randomly fluctuate stats
    const interval = setInterval(() => {
      setCpu((prev) => Math.min(100, Math.max(10, prev + (Math.random() * 20 - 10))));
      setRam((prev) => Math.min(100, Math.max(30, prev + (Math.random() * 10 - 5))));
      setAi((prev) => Math.min(100, Math.max(70, prev + (Math.random() * 5 - 2))));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setUptime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const drawBar = (percent: number) => {
    const filled = Math.round(percent / 10);
    return '█'.repeat(filled) + '░'.repeat(10 - filled);
  };

  return (
    <div className="absolute top-4 right-4 text-xs font-mono text-cyan-500 border border-cyan-500/30 p-2 hidden md:block bg-black/50 z-20 pointer-events-none w-48 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
      <div className="border-b border-cyan-500/30 mb-2 pb-1 font-bold">SYSTEM STATUS</div>
      <div className="flex justify-between">
        <span>CPU:</span>
        <span>{drawBar(cpu)} {Math.round(cpu)}%</span>
      </div>
      <div className="flex justify-between">
        <span>RAM:</span>
        <span>{drawBar(ram)} {Math.round(ram)}%</span>
      </div>
      <div className="flex justify-between">
        <span>AI :</span>
        <span className="text-fuchsia-500">{drawBar(ai)} {Math.round(ai)}%</span>
      </div>
      <div className="flex justify-between mt-2 pt-1 border-t border-cyan-500/30">
        <span>Uptime:</span>
        <span>{formatUptime(uptime)}</span>
      </div>
    </div>
  );
};
