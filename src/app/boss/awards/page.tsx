'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import {
  Award,
  Crown,
  Plus,
  Sparkles,
  Clock,
  ShieldCheck
} from 'lucide-react';
import AwardBossXPModal from '@/components/boss/AwardBossXPModal';

export default function BossAwardsPage() {
  const { bossAwards, playerProfile } = useRPG();
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);

  const totalBossXPAwarded = bossAwards.reduce((acc, a) => acc + a.amount, 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
              نظام النقاط المعتمدة
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            سجل نقاط المشرف المعتمدة
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            نقاط موثقة تمنح حصراً بتصديق المشرف، ولا يمكن للاعب توليدها بنفسه مطلقاً.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-center">
            <span className="text-[10px] font-mono text-amber-400 uppercase block font-semibold">إجمالي نقاط المشرف</span>
            <span className="text-xl font-black text-amber-300 font-mono">
              +{totalBossXPAwarded} XP
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsAwardModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:brightness-110 text-slate-950 font-black text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>منح نقاط مشرف</span>
          </button>
        </div>
      </div>

      {/* Target Player Card */}
      <div className="p-4 rounded-3xl bg-[#0d131f] border border-amber-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold font-mono">
            P1
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              اللاعب المعين: {playerProfile.name}
            </h3>
            <p className="text-xs text-slate-400">
              {playerProfile.email} • المستوى الحالي: {playerProfile.level} ({playerProfile.totalXP} XP)
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/30">
          المسؤولية نشطة
        </span>
      </div>

      {/* Audit History Timeline */}
      <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>سجل المكافآت المعتمدة غير القابلة للتعديل</span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {bossAwards.length} منحة معتمدة
          </span>
        </div>

        <div className="space-y-3">
          {bossAwards.map((award) => (
            <div
              key={award.id}
              className="p-4 rounded-2xl bg-[#140f08]/80 border border-amber-500/30 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="text-base sm:text-lg font-mono font-black text-amber-400 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/40 shrink-0">
                  +{award.amount} XP
                </span>

                <div className="truncate">
                  <span className="text-sm font-bold text-white block">
                    {award.reason}
                  </span>
                  {award.note && (
                    <p className="text-xs text-amber-200/80 mt-0.5 italic truncate">
                      &quot;{award.note}&quot;
                    </p>
                  )}
                </div>
              </div>

              <div className="text-left shrink-0">
                <span className="text-xs font-mono text-slate-400 block">
                  {award.createdAt}
                </span>
                <span className="text-[10px] font-mono text-amber-400 font-semibold">
                  بواسطة المشرف {award.bossName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Award Modal */}
      <AwardBossXPModal isOpen={isAwardModalOpen} onClose={() => setIsAwardModalOpen(false)} />

    </div>
  );
}
