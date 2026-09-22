'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRPG } from '@/context/RPGContext';
import { 
  Shield, 
  Flame, 
  Sparkles, 
  UserCheck, 
  Crown,
  Volume2,
  VolumeX,
  AlertTriangle
} from 'lucide-react';
import CravingModal from '@/components/emergency/CravingModal';

export default function Navbar() {
  const { role, setRole, playerProfile, bossProfile, soundEnabled, toggleSound } = useRPG();
  const [isCravingOpen, setIsCravingOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.05] bg-[#06090f]/95 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 h-14 flex items-center justify-between gap-4">
          
          {/* Brand */}
          <Link href={role === 'boss' ? '/boss' : '/'} className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-900/40 group-hover:bg-violet-500 transition-colors">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-sm tracking-tight text-white">لعبة الحياة</span>
            </div>
          </Link>

          {/* Center HUD (Player) */}
          {role === 'player' && (
            <div className="hidden md:flex items-center gap-5">
              {/* Level */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#64748b] font-medium">المستوى</span>
                <span className="text-white font-black font-mono text-base">{String(playerProfile.level).padStart(2, '0')}</span>
              </div>

              <div className="w-px h-4 bg-white/[0.08]" />

              {/* XP */}
              <div className="flex items-center gap-1.5 text-sm">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-violet-300 font-bold font-mono">{playerProfile.totalXP}</span>
                <span className="text-[#64748b] text-xs">XP</span>
              </div>

              <div className="w-px h-4 bg-white/[0.08]" />

              {/* Streak */}
              <div className="flex items-center gap-1.5 text-sm">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-amber-300 font-bold font-mono">{playerProfile.streak}</span>
                <span className="text-[#64748b] text-xs">يوم</span>
              </div>
            </div>
          )}

          {/* Center HUD (Boss) */}
          {role === 'boss' && (
            <div className="hidden md:flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-amber-300">{bossProfile.name}</span>
              <span className="text-xs text-[#64748b]">— متابعة {playerProfile.name}</span>
            </div>
          )}

          {/* Right Controls */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Emergency — compact icon only on mobile */}
            <button
              onClick={() => setIsCravingOpen(true)}
              type="button"
              title="أريد أن أدخن — طوارئ"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-400 hover:text-red-300 text-xs font-bold border border-red-900/60 hover:border-red-700/60 transition-all active:scale-95"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">طوارئ</span>
            </button>

            {/* Role Switcher */}
            <div className="flex items-center bg-white/[0.04] border border-white/[0.06] p-0.5 rounded-xl">
              <button
                onClick={() => setRole('player')}
                type="button"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-[10px] text-xs font-semibold transition-all ${
                  role === 'player'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-[#64748b] hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">اللاعب</span>
              </button>
              <button
                onClick={() => setRole('boss')}
                type="button"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-[10px] text-xs font-semibold transition-all ${
                  role === 'boss'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-[#64748b] hover:text-amber-300'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">المشرف</span>
              </button>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              type="button"
              title={soundEnabled ? 'كتم الصوت' : 'تفعيل الصوت'}
              className="w-8 h-8 rounded-xl border border-white/[0.06] flex items-center justify-center text-[#64748b] hover:text-white hover:bg-white/[0.05] transition-all"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <CravingModal isOpen={isCravingOpen} onClose={() => setIsCravingOpen(false)} />
    </>
  );
}
