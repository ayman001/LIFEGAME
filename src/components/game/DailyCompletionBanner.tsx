'use client';

import React from 'react';
import { CheckCircle2, Sparkles, Flame } from 'lucide-react';

interface Props {
  completedCount: number;
  totalCount: number;
  bonusClaimed: boolean;
  onClaimBonus?: () => void;
}

export default function DailyCompletionBanner({ completedCount, totalCount, bonusClaimed, onClaimBonus }: Props) {
  if (totalCount === 0 || completedCount < totalCount) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/60 via-slate-900/90 to-emerald-950/60 p-5 shadow-xl shadow-emerald-950/40">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-right">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                DAY COMPLETE — 100%
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                السلسلة مستمرة
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              اكتملت مهام اليوم — يوم آخر تم احتلاله بنجاح!
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              حققت الانضباط الكامل لليوم. كل مهمة قمت بها رفعت من مستواك الحقيقي.
            </p>
          </div>
        </div>

        <div className="shrink-0">
          {!bonusClaimed ? (
            <button
              onClick={onClaimBonus}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs tracking-wider shadow-lg shadow-emerald-500/30 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              استلام مكافأة اليوم (+25 XP)
            </button>
          ) : (
            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              تمت إضافة +25 XP مكافأة
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
