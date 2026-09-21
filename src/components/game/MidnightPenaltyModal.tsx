'use client';

import React from 'react';
import { MidnightPenaltyReview } from '@/types';
import { Moon, Flame, ArrowRight, ShieldAlert, X } from 'lucide-react';

interface MidnightPenaltyModalProps {
  review: MidnightPenaltyReview | null;
  onClose: () => void;
}

export default function MidnightPenaltyModal({ review, onClose }: MidnightPenaltyModalProps) {
  if (!review) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0d1017] border border-red-500/40 p-6 sm:p-8 shadow-2xl shadow-red-950/50 overflow-hidden">
        
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-slate-400 hover:text-white p-1 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
            <Moon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-red-400 bg-red-500/15 border border-red-500/30 px-2 py-0.5 rounded-md">
                MIDNIGHT RECKONING
              </span>
              <span className="text-xs text-slate-400 font-mono">{review.date}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
              حلّ منتصف الليل: جزاء الإخفاق
            </h2>
          </div>
        </div>

        {/* Core Penalty Summary Cards */}
        <div className="grid grid-cols-2 gap-3 my-5">
          <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-bold text-slate-400">غرامة الـ XP</span>
            <span className="text-2xl sm:text-3xl font-black text-red-400 font-mono mt-1">
              -{review.penalizedXP} XP
            </span>
            <span className="text-[10px] text-red-300/80 mt-0.5">خُصمت من رصيدك</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-bold text-slate-400">سلسلة الالتزام (Streak)</span>
            <div className="flex items-center gap-1 mt-1 text-amber-400">
              <Flame className="w-5 h-5 fill-amber-500/40 text-amber-500" />
              <span className="text-2xl sm:text-3xl font-black font-mono">0</span>
              <span className="text-xs font-bold text-slate-400">أيام</span>
            </div>
            <span className="text-[10px] text-amber-300/80 mt-0.5">تصفير السلسلة</span>
          </div>
        </div>

        {/* Missed Tasks List */}
        <div className="mb-5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>المهام اليومية الإلزامية التي لم تُنجز ({review.missedCount}):</span>
          </div>
          <div className="max-h-40 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {review.missedTaskTitles.map((title, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  <span className="truncate">{title}</span>
                </div>
                <span className="text-red-400 font-mono font-bold shrink-0 text-[11px]">
                  تلاشت
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mindset message */}
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed mb-6">
          <p className="font-semibold text-white mb-1">💡 قانون اللعبة الحقيقية:</p>
          <p className="text-slate-400 text-[11px]">
            تلاشت مهام الأمس مع خصم النقاط. وتجددت مهامك اليومية نظيفة لليوم الحالي.
            الانضباط لا يعني المثالية، بل يعني العودة الفورية بعد السقوط. ابدأ أول مهمة الآن!
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          type="button"
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:brightness-110 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 transition-all active:scale-95"
        >
          <span>فهمت الجزاء — أبدأ اليوم الجديد بتركيز</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
