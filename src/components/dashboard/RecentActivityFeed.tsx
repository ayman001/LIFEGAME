'use client';

import React from 'react';
import { useRPG } from '@/context/RPGContext';
import Link from 'next/link';
import { History, Sparkles, Flame, ArrowLeft, Shield } from 'lucide-react';

export default function RecentActivityFeed() {
  const { activityLogs } = useRPG();

  return (
    <div className="rounded-3xl bg-[#0d131f] border border-slate-800/80 p-5 sm:p-6 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <History className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">الأفعال والأنشطة الأخيرة</h3>
        </div>
        <Link
          href="/activity"
          className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 transition-colors"
        >
          <span>عرض السجل كاملاً</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="mt-4 space-y-2.5">
        {activityLogs.slice(0, 5).map((act) => {
          const isCraving = act.source === 'craving_resisted';
          const isBoss = act.source === 'boss_award';

          return (
            <div
              key={act.id}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                isBoss
                  ? 'bg-amber-950/20 border-amber-500/30'
                  : isCraving
                  ? 'bg-rose-950/20 border-rose-500/30'
                  : 'bg-slate-900/40 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isBoss
                    ? 'bg-amber-500/20 text-amber-400'
                    : isCraving
                    ? 'bg-rose-500/20 text-rose-400'
                    : 'bg-indigo-500/20 text-indigo-400'
                }`}>
                  {isBoss ? (
                    <Shield className="w-4 h-4" />
                  ) : isCraving ? (
                    <Flame className="w-4 h-4" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                </div>

                <div className="truncate">
                  <span className="text-xs sm:text-sm font-bold text-white block truncate">
                    {act.name}
                  </span>
                  <span className="text-[11px] text-slate-400 block truncate">
                    {act.notes}
                  </span>
                </div>
              </div>

              {/* Left (In RTL): XP / DH tags and time */}
              <div className="text-left shrink-0">
                <div className="flex items-center justify-start gap-1.5">
                  {act.xpEarned > 0 && (
                    <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/30">
                      +{act.xpEarned} XP
                    </span>
                  )}
                  {act.moneySaved > 0 && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      +{act.moneySaved} درهم
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                  {act.dateTime}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
