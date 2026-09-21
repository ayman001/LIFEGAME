'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import {
  Crown,
  Award,
  Swords,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Briefcase,
  BookOpen,
  Dumbbell,
  Flame
} from 'lucide-react';
import AwardBossXPModal from './AwardBossXPModal';
import CreateChallengeModal from './CreateChallengeModal';
import SendFeedbackModal from './SendFeedbackModal';

export default function BossOverview() {
  const { playerProfile, quests, goals, todayTasks, weeklyScore } = useRPG();
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  // Compute Needs Attention items neutrally
  const pendingImportantTasks = todayTasks.filter((t) => t.priority === 'Important' && !t.completed);
  const overdueGoals = goals.filter((g) => g.status === 'in_progress' && new Date(g.deadline) < new Date());
  const incompleteQuests = quests.filter((q) => q.isDailyMission && q.status !== 'completed');

  const needsAttentionList = [];

  if (pendingImportantTasks.length > 0) {
    needsAttentionList.push({
      id: 'na_tasks',
      title: `${pendingImportantTasks.length} مهام يومية هامة لا تزال معلقة قيد التنفيذ.`,
      severity: 'medium',
      detail: pendingImportantTasks.map((t) => t.task).join('، ')
    });
  }

  if (overdueGoals.length > 0) {
    needsAttentionList.push({
      id: 'na_goals',
      title: `حان الموعد النهائي المحدد لـ ${overdueGoals.length} أهداف.`,
      severity: 'medium',
      detail: overdueGoals.map((g) => g.name).join('، ')
    });
  }

  if (incompleteQuests.length > 2) {
    needsAttentionList.push({
      id: 'na_quests',
      title: `${incompleteQuests.length} من المهام اليومية لم تكتمل بعد اليوم.`,
      severity: 'low',
      detail: 'يُوصى بمراجعة وتيرة العمل قبل نهاية اليوم.'
    });
  }

  return (
    <div className="space-y-6">
      
      {/* Top Banner: BOSS CONTROL CENTER */}
      <div className="rounded-3xl bg-gradient-to-r from-[#17120a] via-[#120e06] to-[#090b10] border border-amber-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mt-20" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                مركز تحكم المشرف والمساءلة
              </span>
              <span className="text-xs text-slate-400 font-mono">
                نظام المراقبة والتقييم
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              اللاعب الخاضع للإشراف: {playerProfile.name}
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-1 font-bold">
              «تقييم الانضباط اليومي، جودة المخرجات، والاستمرارية الواقعية.»
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <button
                type="button"
                onClick={() => setIsAwardModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:brightness-110 text-slate-950 font-black text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95"
              >
                <Award className="w-4 h-4" />
                <span>منح نقاط مكافأة XP</span>
              </button>

              <button
                type="button"
                onClick={() => setIsChallengeModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all"
              >
                <Swords className="w-4 h-4" />
                <span>إصدار تحدي</span>
              </button>

              <button
                type="button"
                onClick={() => setIsFeedbackModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>إرسال توجيه</span>
              </button>
            </div>
          </div>

          {/* Player Snapshot HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase text-slate-400 block font-bold">المستوى</span>
              <span className="text-xl font-black text-purple-400 font-mono">مستوى {playerProfile.level}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase text-slate-400 block font-bold">السلسلة</span>
              <span className="text-xl font-black text-amber-400 font-mono">{playerProfile.streak} أيام</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase text-slate-400 block font-bold">المدخرات</span>
              <span className="text-xl font-black text-emerald-400 font-mono">{playerProfile.totalSavedDH} درهم</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase text-slate-400 block font-bold">نقاط الأسبوع</span>
              <span className="text-xl font-black text-blue-400 font-mono">{weeklyScore.xpEarned} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Needs Attention Panel */}
      <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white uppercase tracking-wide">
              ملاحظات تتطلب الانتباه
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {needsAttentionList.length} ملاحظة
          </span>
        </div>

        <div className="mt-4 space-y-2.5">
          {needsAttentionList.length === 0 ? (
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
              <p className="text-xs text-emerald-200 font-bold">
                لا توجد تنبيهات حرجة. اللاعب يحافظ على وتيرة أداء مستقرة وجدول منضبط.
              </p>
            </div>
          ) : (
            needsAttentionList.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-200">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Performance Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Work Hours */}
        <div className="p-5 rounded-3xl bg-[#0d131f] border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">ساعات العمل العميق</span>
            <Briefcase className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{playerProfile.workHours} ساعة</div>
          <p className="text-[11px] text-slate-400 mt-1">عمل مركز مسجل هذا الأسبوع</p>
        </div>

        {/* Learning Hours */}
        <div className="p-5 rounded-3xl bg-[#0d131f] border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">ساعات التعلّم</span>
            <BookOpen className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{playerProfile.learningHours} ساعة</div>
          <p className="text-[11px] text-slate-400 mt-1">قراءة وبحوث برمجية متخصصة</p>
        </div>

        {/* Workouts */}
        <div className="p-5 rounded-3xl bg-[#0d131f] border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">التمارين البدنية</span>
            <Dumbbell className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{playerProfile.workoutsCount} جلسات</div>
          <p className="text-[11px] text-slate-400 mt-1">4 من أصل 5 جلسات مستهدفة</p>
        </div>

        {/* Weed-Free Days */}
        <div className="p-5 rounded-3xl bg-[#0d131f] border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">أيام نظيفة بلا تدخين</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400 font-mono">{playerProfile.weedFreeDays} أيام</div>
          <p className="text-[11px] text-slate-400 mt-1">انضباط 100% بدون أي تراجع</p>
        </div>

      </div>

      {/* Modals */}
      <AwardBossXPModal isOpen={isAwardModalOpen} onClose={() => setIsAwardModalOpen(false)} />
      <CreateChallengeModal isOpen={isChallengeModalOpen} onClose={() => setIsChallengeModalOpen(false)} />
      <SendFeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} />

    </div>
  );
}
