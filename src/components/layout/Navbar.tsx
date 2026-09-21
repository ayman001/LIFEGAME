'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRPG } from '@/context/RPGContext';
import { 
  Shield, 
  Flame, 
  Coins, 
  Sparkles, 
  AlertTriangle, 
  UserCheck, 
  Crown,
  Bell,
  Volume2,
  VolumeX
} from 'lucide-react';
import CravingModal from '@/components/emergency/CravingModal';

export default function Navbar() {
  const { role, setRole, playerProfile, bossProfile, soundEnabled, toggleSound } = useRPG();
  const [isCravingOpen, setIsCravingOpen] = useState(false);


  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080b11]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          
          {/* Brand Logo & Tag */}
          <div className="flex items-center gap-3">
            <Link href={role === 'boss' ? '/boss' : '/'} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
                <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-[10px] font-mono font-bold tracking-widest text-purple-400 uppercase block">نظام تشغيل الحياة</span>
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
                  لعبة الحياة <span className="text-[11px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">ارتقِ بمستواك</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Center Tactical HUD (Player Mode) */}
          {role === 'player' && (
            <div className="hidden md:flex items-center gap-4 bg-slate-900/60 border border-slate-800 rounded-full px-4 py-1.5">
              {/* Level Badge */}
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400 font-bold">المستوى</span>
                <span className="text-white font-mono font-bold text-sm">{playerProfile.level}</span>
              </div>

              <div className="h-3 w-px bg-slate-800" />

              {/* Total XP */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span className="font-mono font-bold">{playerProfile.totalXP}</span>
                <span className="text-slate-500 text-[10px]">XP</span>
              </div>

              <div className="h-3 w-px bg-slate-800" />

              {/* Streak */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="font-mono font-bold">{playerProfile.streak}</span>
                <span className="text-slate-500 text-[10px]">أيام</span>
              </div>

              <div className="h-3 w-px bg-slate-800" />

              {/* Freedom Fund Total */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <Coins className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono font-bold">{playerProfile.totalSavedDH}</span>
                <span className="text-slate-500 text-[10px]">درهم</span>
              </div>
            </div>
          )}

          {/* Center Tactical HUD (Boss Mode) */}
          {role === 'boss' && (
            <div className="hidden md:flex items-center gap-3 bg-amber-950/20 border border-amber-500/30 rounded-full px-4 py-1.5">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-300 tracking-wide">
                المشرف: {bossProfile.name}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30 font-bold">
                متابعة اللاعب {playerProfile.name} (المستوى {playerProfile.level})
              </span>
            </div>
          )}

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Craving Emergency Trigger */}
            <button
              onClick={() => setIsCravingOpen(true)}
              type="button"
              className="relative group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600/90 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold shadow-lg shadow-red-900/30 border border-red-500/40 transition-all transform active:scale-95"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-yellow-200 animate-pulse" />
              <span className="hidden xs:inline">أريد أن أدخن</span>
              <span className="xs:hidden">طوارئ</span>
            </button>

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setRole('player')}
                type="button"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  role === 'player'
                    ? 'bg-purple-600 text-white font-bold shadow-sm shadow-purple-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="التحويل إلى وضع اللاعب"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">اللاعب</span>
              </button>

              <button
                onClick={() => setRole('boss')}
                type="button"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  role === 'boss'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/30'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
                title="التحويل إلى وضع المشرف"
              >
                <Crown className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">المشرف</span>
              </button>
            </div>

            {/* Sound Toggle Button */}
            <button
              onClick={toggleSound}
              type="button"
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-purple-950/40 border-purple-500/40 text-purple-300 hover:text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
              title={soundEnabled ? 'كتم المؤثرات الصوتية' : 'تفعيل المؤثرات الصوتية'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Notification / Settings Quick Link */}
            <Link
              href="/settings"
              className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              title="الإعدادات والتذكيرات"
            >
              <Bell className="w-4 h-4" />
            </Link>
          </div>


        </div>
      </header>

      {/* Craving Emergency Modal */}
      <CravingModal isOpen={isCravingOpen} onClose={() => setIsCravingOpen(false)} />
    </>
  );
}
