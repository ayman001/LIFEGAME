'use client';

import React from 'react';
import { useRPG } from '@/context/RPGContext';
import { 
  calculateLevelProgress, 
  calculateXPToNextLevel, 
  getMotivationalMessage 
} from '@/lib/rpg-engine';
import { Flame, Coins, Sparkles, Shield } from 'lucide-react';

export default function HeroLevelCard() {
  const { playerProfile } = useRPG();

  const progress = calculateLevelProgress(playerProfile.totalXP);
  const xpNeeded = calculateXPToNextLevel(playerProfile.totalXP);
  const motivation = getMotivationalMessage(playerProfile.totalXP, playerProfile.level, playerProfile.streak);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121828] via-[#0e1322] to-[#0a0d16] border border-purple-500/30 p-6 sm:p-8 shadow-2xl shadow-purple-950/20">
      
      {/* Background Subtle HUD Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mt-20" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mb-20" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        {/* Right (In RTL): Level Title & Progress */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-extrabold uppercase tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/30">
              رتبة اللاعب الحالية
            </span>
            <span className="text-xs font-bold text-slate-400">
              {playerProfile.title}
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              المستوى {playerProfile.level.toString().padStart(2, '0')}
            </h1>
            <span className="text-xl sm:text-2xl font-mono font-bold text-purple-400">
              — {playerProfile.totalXP} XP
            </span>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-400 flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                التقدم نحو المستوى {playerProfile.level + 1}
              </span>
              <span className="text-purple-300 font-bold font-mono">
                {progress}% (متبقي {xpNeeded} XP)
              </span>
            </div>

            <div className="h-4 w-full bg-slate-900/90 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-l from-purple-600 via-indigo-500 to-cyan-400 transition-all duration-700 relative"
                style={{ width: `${Math.max(5, progress)}%` }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-white/60 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Dynamic Motivational Quote */}
          <p className="mt-4 text-xs sm:text-sm font-bold text-slate-300 italic tracking-wide">
            {motivation}
          </p>
        </div>

        {/* Left (In RTL): Pillars HUD Cards */}
        <div className="grid grid-cols-3 gap-3 shrink-0">
          
          {/* Streak Card */}
          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-amber-500/30 flex flex-col items-center justify-center text-center shadow-lg">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-1">
              <Flame className="w-5 h-5 fill-amber-500" />
            </div>
            <span className="text-lg sm:text-xl font-black text-white font-mono">
              {playerProfile.streak}
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider">
              أيام متتالية
            </span>
          </div>

          {/* Freedom Fund Card */}
          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-emerald-500/30 flex flex-col items-center justify-center text-center shadow-lg">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-1">
              <Coins className="w-5 h-5" />
            </div>
            <span className="text-lg sm:text-xl font-black text-emerald-400 font-mono">
              {playerProfile.totalSavedDH}
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider">
              درهم مدخر
            </span>
          </div>

          {/* Life Points Card */}
          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-blue-500/30 flex flex-col items-center justify-center text-center shadow-lg">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-1">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-lg sm:text-xl font-black text-blue-300 font-mono">
              {playerProfile.lifePoints}
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider">
              نقاط الحياة
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
