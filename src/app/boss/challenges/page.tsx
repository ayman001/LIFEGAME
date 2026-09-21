'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import {
  Swords,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import CreateChallengeModal from '@/components/boss/CreateChallengeModal';

export default function BossChallengesPage() {
  const { bossChallenges, playerProfile } = useRPG();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Swords className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
              توجيهات المشرف
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            تحديات ومهام المشرف
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            تحديات ذات رهانات عالية تُطلق لاختبار وتوسيع حدود إمكانات {playerProfile.name}.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:brightness-110 text-slate-950 font-black text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء تحدٍ جديد</span>
        </button>
      </div>

      {/* Challenges List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bossChallenges.length === 0 ? (
          <div className="col-span-full rounded-3xl bg-[#0d131f] border border-slate-800 p-12 text-center">
            <Swords className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-200">لا توجد تحديات نشطة</h3>
            <p className="text-xs text-slate-400 mt-1">
              أطلق تحدياً استثنائياً بمكافآت XP ومواعيد نهائية صارمة لاختبار انضباط اللاعب.
            </p>
          </div>
        ) : (
          bossChallenges.map((challenge) => {
            const isCompleted = challenge.status === 'completed';
            const difficultyArabic: Record<string, string> = {
              easy: 'سهل',
              medium: 'متوسط',
              hard: 'صعب',
              major: 'مصيري'
            };

            return (
              <div
                key={challenge.id}
                className={`rounded-3xl border p-5 sm:p-6 transition-all flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-950/10 border-emerald-500/30'
                    : 'bg-[#0d131f] border-amber-500/30 shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        {difficultyArabic[challenge.difficulty] || challenge.difficulty}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        الهدف: {playerProfile.name}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/30">
                      +{challenge.xpReward} XP
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {challenge.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {challenge.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      الموعد النهائي: {challenge.deadline}
                    </span>
                    <span className={`font-bold ${isCompleted ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {isCompleted ? 'مكتمل' : 'نشط ومستمر'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    أُطلق في {challenge.createdAt} بواسطة {challenge.bossName}
                  </span>

                  {isCompleted && (
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      تم الإنجاز
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      <CreateChallengeModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

    </div>
  );
}
