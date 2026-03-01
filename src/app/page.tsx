"use client";

import { Terminal } from '@/components/Terminal/Terminal';
import { MatrixRain } from '@/components/Effects/MatrixRain';
import { SystemMonitor } from '@/components/AI/SystemMonitor';
import { AILogger } from '@/components/AI/AILogger';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-[#00ff00]">
      {/* Background Effects */}
      <MatrixRain />
      
      {/* Autonomous AI Overlays */}
      <SystemMonitor />
      <AILogger />
      
      {/* Main Terminal Interface */}
      <Terminal />
    </main>
  );
}
