'use client';

import React, { useEffect } from 'react';
import { Trophy, ChevronLeft, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
}

export default function LevelUpModal({ isOpen, onClose, newLevel }: Props) {
  useEffect(() => {
    if (isOpen) {
      sound.playLevelUp();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#38bdf8', '#10b981', '#f59e0b']
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const prevLevel = Math.max(0, newLevel - 1);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#16122b] via-[#0d101d] to-[#080b11] border border-purple-500/30 rounded-3xl p-8 text-center shadow-2xl shadow-purple-900/40 overflow-hidden">
        {/* Glow backdrop behind level */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Cinematic Ring Burst */}
        <div className="relative mx-auto w-28 h-28 my-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-purple-400/40 animate-ring-expand" />
          <div className="absolute inset-2 rounded-full border border-purple-500/30 animate-pulse" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/40">
            <Trophy className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Level Up Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-black tracking-wider uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LEVEL UP — ترقية المستوى</span>
        </div>

        <h2 className="text-2xl font-black text-white mt-2">
          مستوى جديد مفتوح!
        </h2>

        {/* Level numbers transition */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-400 text-lg font-bold">
            LEVEL {String(prevLevel).padStart(2, '0')}
          </div>
          <ChevronLeft className="w-6 h-6 text-purple-400 rtl:rotate-0" />
          <div className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-2xl font-black shadow-lg shadow-purple-500/30">
            LEVEL {String(newLevel).padStart(2, '0')}
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-8 leading-relaxed max-w-xs mx-auto">
          أحسنت! إصرارك وانضباطك في إنجاز المهام الحقيقية يرتقي بك خطوة جديدة نحو هدفك الأسمى.
        </p>

        {/* Action button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-black text-sm tracking-wide transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
        >
          متابعة التحدي والقوة
        </button>
      </div>
    </div>
  );
}
