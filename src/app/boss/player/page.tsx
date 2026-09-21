'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import {
  ClipboardList,
  Crown,
  CheckCircle2,
  Award,
  MessageSquare,
  Swords,
  Clock,
  Sparkles,
  Filter
} from 'lucide-react';
import AwardBossXPModal from '@/components/boss/AwardBossXPModal';
import CreateChallengeModal from '@/components/boss/CreateChallengeModal';
import SendFeedbackModal from '@/components/boss/SendFeedbackModal';

export default function BossPlayerAuditPage() {
  const { playerProfile, quests, activityLogs } = useRPG();
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [approvedIds, setApprovedIds] = useState<string[]>([]);

  const handleApprove = (id: string) => {
    setApprovedIds((prev) => [...prev, id]);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ClipboardList className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
              مسار تدقيق المشرف
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            مراجعة اللاعب: {playerProfile.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            فحص المهام المنفذة، ملاحظات اللاعب وسياق الأفعال، ومنح نقاط ومكافآت معتمدة.
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAwardModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black text-xs tracking-wider uppercase shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all"
          >
            <Award className="w-4 h-4" />
            <span>منح XP</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFeedbackModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>توجيه</span>
          </button>
        </div>
      </div>

      {/* Completed Deeds Audit Table */}
      <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>سجل الأنشطة والأفعال المدققة</span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {activityLogs.length} إجمالي الأفعال المسجلة
          </span>
        </div>

        <div className="space-y-3">
          {activityLogs.map((log) => {
            const isApproved = approvedIds.includes(log.id);

            return (
              <div
                key={log.id}
                className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {log.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {log.dateTime}
                    </span>
                    <span className="text-[10px] font-mono text-purple-400 font-bold">
                      +{log.xpEarned} XP
                    </span>
                    {log.moneySaved > 0 && (
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        +{log.moneySaved} درهم مدخر
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white">
                    {log.name}
                  </h4>

                  {log.notes && (
                    <p className="text-xs text-slate-300 mt-1 italic">
                      ملاحظة اللاعب: &quot;{log.notes}&quot;
                    </p>
                  )}
                </div>

                {/* Boss Action Bar for this item */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleApprove(log.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                      isApproved
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isApproved ? 'معتمد' : 'اعتماد'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAwardModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold flex items-center gap-1 transition-all"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>منح XP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFeedbackModalOpen(true)}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    title="إضافة ملاحظة توجيهية"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <AwardBossXPModal isOpen={isAwardModalOpen} onClose={() => setIsAwardModalOpen(false)} />
      <CreateChallengeModal isOpen={isChallengeModalOpen} onClose={() => setIsChallengeModalOpen(false)} />
      <SendFeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} />

    </div>
  );
}
