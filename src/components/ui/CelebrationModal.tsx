'use client';

import React from 'react';
import { useRPG } from '@/context/RPGContext';
import { Trophy, Sparkles, X, Crown, ArrowLeft } from 'lucide-react';

export default function CelebrationModal() {
  const { celebration, closeCelebration } = useRPG();

  if (!celebration || !celebration.isOpen) return null;

  const isLevelUp = celebration.type === 'level_up';
  const isBossAward = celebration.type === 'boss_award';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-md p-6 sm:p-8 rounded-3xl border text-center shadow-2xl transition-all ${
          isBossAward
            ? 'bg-[#100d07] border-amber-500/50 shadow-amber-500/20'
            : isLevelUp
            ? 'bg-[#0e0a1a] border-purple-500/50 shadow-purple-500/20'
            : 'bg-[#07130f] border-emerald-500/50 shadow-emerald-500/20'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={closeCelebration}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Center Icon Crest */}
        <div className="mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-5 relative">
          <div 
            className={`absolute inset-0 rounded-2xl blur-xl opacity-60 ${
              isBossAward
                ? 'bg-amber-500'
                : isLevelUp
                ? 'bg-purple-600'
                : 'bg-emerald-500'
            }`} 
          />
          <div 
            className={`relative w-full h-full rounded-2xl border flex items-center justify-center ${
              isBossAward
                ? 'bg-amber-950/80 border-amber-400/50 text-amber-300'
                : isLevelUp
                ? 'bg-purple-950/80 border-purple-400/50 text-purple-300'
                : 'bg-emerald-950/80 border-emerald-400/50 text-emerald-300'
            }`}
          >
            {isBossAward ? (
              <Crown className="w-10 h-10 animate-bounce" />
            ) : isLevelUp ? (
              <Sparkles className="w-10 h-10 animate-pulse" />
            ) : (
              <Trophy className="w-10 h-10 animate-bounce" />
            )}
          </div>
        </div>

        {/* System Tag */}
        <span 
          className={`inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 ${
            isBossAward
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : isLevelUp
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
          }`}
        >
          {isBossAward ? 'مكافأة معتمدة من المشرف' : isLevelUp ? 'ترقية المستوى في نظام الحياة' : 'تم فتح إنجاز جديد بنجاح'}
        </span>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 mb-3">
          {celebration.title}
        </h3>

        {/* Message */}
        <p className="text-sm text-slate-300 leading-relaxed max-w-sm mx-auto mb-6">
          {celebration.message}
        </p>

        {/* Action Button */}
        <button
          onClick={closeCelebration}
          className={`w-full py-3 px-6 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95 ${
            isBossAward
              ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 hover:brightness-110 shadow-amber-500/20'
              : isLevelUp
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:brightness-110 shadow-purple-500/20'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:brightness-110 shadow-emerald-500/20'
          }`}
        >
          <span>متابعة رحلة الارتقاء</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
