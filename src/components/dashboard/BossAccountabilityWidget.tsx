'use client';

import React from 'react';
import { useRPG } from '@/context/RPGContext';
import { 
  Crown, 
  Award, 
  Swords, 
  MessageSquare
} from 'lucide-react';

export default function BossAccountabilityWidget() {
  const { playerProfile, bossAwards, bossChallenges } = useRPG();

  const activeChallenges = bossChallenges.filter((c) => c.status === 'active');

  return (
    <div className="rounded-3xl bg-[#0f1422] border border-amber-500/30 p-5 sm:p-6 shadow-xl relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -ml-10 -mt-10" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                المساءلة والتوجيه الخارجي
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                المشرف يراقبك: نشط
              </span>
            </div>
            <h3 className="text-base font-extrabold text-white">
              المشرف المعتمد: {playerProfile.bossName}
            </h3>
          </div>
        </div>

        <div className="text-left hidden sm:block">
          <span className="text-[10px] text-slate-400 block font-bold">آخر تقييم</span>
          <span className="text-xs font-semibold text-slate-200">{playerProfile.lastReviewDate || 'اليوم'}</span>
        </div>
      </div>

      {/* Mentor's Latest Message */}
      <div className="mt-4 p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/20 relative z-10">
        <div className="flex items-center gap-2 mb-1 text-[11px] text-amber-400 font-bold">
          <MessageSquare className="w-3.5 h-3.5" />
          آخر توجيه من المشرف
        </div>
        <p className="text-xs sm:text-sm text-amber-100 font-bold italic">
          «{playerProfile.lastBossFeedback || 'حافظ على الزخم. الانضباط الحقيقي يظهر في النتائج الواقعية.'}»
        </p>
      </div>

      {/* Active Boss Challenges if any */}
      {activeChallenges.length > 0 && (
        <div className="mt-4 space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
            <Swords className="w-3.5 h-3.5 text-amber-400" />
            تحديات المشرف النشطة
          </div>

          {activeChallenges.map((c) => (
            <div
              key={c.id}
              className="p-3 rounded-xl bg-slate-900/60 border border-amber-500/30 flex items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{c.title}</span>
                  <span className="text-[10px] font-mono text-amber-400 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    +{c.xpReward} XP
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{c.description}</p>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                الموعد: {c.deadline}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Boss XP Awards Audit Feed */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            سجل نقاط مكافأة المشرف (ثابتة وغير قابلة للتعديل)
          </div>
          <span className="text-[10px] text-slate-500 font-mono">موثقة من المشرف</span>
        </div>

        <div className="space-y-2">
          {bossAwards.slice(0, 3).map((award) => (
            <div
              key={award.id}
              className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold border border-amber-500/30 shrink-0">
                  +{award.amount} XP
                </span>
                <div className="truncate">
                  <span className="font-bold text-slate-200">{award.reason}</span>
                  {award.note && (
                    <span className="text-slate-400 text-[11px] block truncate italic">
                      «{award.note}»
                    </span>
                  )}
                </div>
              </div>

              <div className="text-left shrink-0">
                <span className="text-[10px] font-mono text-slate-500 block">{award.createdAt}</span>
                <span className="text-[10px] text-amber-400/80 font-bold">{award.bossName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
