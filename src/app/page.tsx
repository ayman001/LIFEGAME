'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import BossOverview from '@/components/boss/BossOverview';
import CurrentMissionCard from '@/components/game/CurrentMissionCard';
import DailyCompletionBanner from '@/components/game/DailyCompletionBanner';
import DisciplineRulesCard from '@/components/game/DisciplineRulesCard';
import RandomMissionModal from '@/components/game/RandomMissionModal';
import { calculateLevelProgress, calculateXPToNextLevel } from '@/lib/rpg-engine';
import { 
  Flame, 
  CheckCircle2, 
  Circle, 
  ShieldAlert, 
  Clock,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';


export default function HomePage() {
  const {
    role,
    playerProfile,
    todayTasks,
    quests,
    bossChallenges,
    toggleTask,
    completeQuest,
    dailyBonusClaimed,
    claimDailyBonus,
    disciplineRules,
    resistRule,
    breakRule,
    acceptRandomMission
  } = useRPG();

  const [isBoredModalOpen, setIsBoredModalOpen] = useState(false);

  if (role === 'boss') {
    return <BossOverview />;
  }

  const progressPercent = calculateLevelProgress(playerProfile.totalXP);
  const xpNeeded = calculateXPToNextLevel(playerProfile.totalXP);
  const currentXPInLevel = playerProfile.totalXP % 100;

  const pendingTasks = todayTasks.filter((t) => !t.completed);
  const completedTasks = todayTasks.filter((t) => t.completed);
  const totalTasksCount = todayTasks.length;
  const completedTasksCount = completedTasks.length;

  const uncompletedQuests = quests.filter((q) => q.status !== 'completed' && q.isDailyMission);
  const activeMissionQueue = [...pendingTasks, ...uncompletedQuests];

  const currentMission = activeMissionQueue.length > 0 ? activeMissionQueue[0] : null;
  const nextMission = activeMissionQueue.length > 1 ? activeMissionQueue[1] : null;

  const handleCompleteCurrent = (missionId: string, isTask: boolean) => {
    if (isTask) {
      toggleTask(missionId);
    } else {
      completeQuest(missionId);
    }
  };

  const activeBossChallenge = bossChallenges.find((c) => c.status === 'active');

  return (
    <div className="space-y-5 max-w-3xl mx-auto pb-10">

      {/* ══ HERO: LEVEL + XP ══ */}
      <div className="rounded-2xl bg-[#0f1420] border border-white/[0.06] p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          
          {/* Level + XP left */}
          <div className="flex-1">
            <div className="text-[11px] font-mono font-bold tracking-widest text-[#64748b] uppercase mb-1">
              مستواك الحالي
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black text-white font-mono leading-none">
                {String(playerProfile.level).padStart(2, '0')}
              </span>
              <div>
                <div className="text-sm font-bold text-violet-400">{currentXPInLevel} / 100 XP</div>
                <div className="text-[11px] text-[#475569]">متبقي {xpNeeded} XP للمستوى {playerProfile.level + 1}</div>
              </div>
            </div>

            {/* XP Bar */}
            <div className="mt-4 xp-bar-track">
              <div className="xp-bar-fill" style={{ width: `${Math.max(4, progressPercent)}%` }} />
            </div>
            <div className="mt-1.5 text-[11px] text-[#334155] font-mono">
              {playerProfile.totalXP} XP إجمالي
            </div>
          </div>

          {/* Streak right */}
          <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
            <Flame className="w-8 h-8 text-amber-400 fill-amber-400" />
            <span className="text-2xl font-black text-white font-mono">{playerProfile.streak}</span>
            <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-wider">يوم</span>
          </div>
        </div>
      </div>

      {/* ══ CURRENT MISSION ══ */}
      <CurrentMissionCard
        currentMission={currentMission}
        nextMission={nextMission}
        onComplete={handleCompleteCurrent}
        onOpenBoredModal={() => setIsBoredModalOpen(true)}
      />

      {/* ══ DAILY COMPLETION BANNER ══ */}
      <DailyCompletionBanner
        completedCount={completedTasksCount}
        totalCount={totalTasksCount}
        bonusClaimed={dailyBonusClaimed}
        onClaimBonus={claimDailyBonus}
      />

      {/* ══ BOSS CHALLENGE ══ */}
      {activeBossChallenge && (
        <div className="rounded-2xl border border-amber-900/40 bg-amber-950/10 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">تحدي المشرف</span>
                  <span className="text-[10px] text-[#64748b] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {activeBossChallenge.deadline}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{activeBossChallenge.title}</h3>
                <p className="text-xs text-[#64748b] mt-1 leading-relaxed">{activeBossChallenge.description}</p>
              </div>
            </div>
            <span className="text-xs font-black text-amber-400 bg-amber-950/40 border border-amber-900/40 px-2.5 py-1 rounded-xl shrink-0 font-mono">
              +{activeBossChallenge.xpReward} XP
            </span>
          </div>
        </div>
      )}

      {/* ══ TODAY'S TASKS — compact ══ */}
      <div className="rounded-2xl bg-[#0f1420] border border-white/[0.06] p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">مهام اليوم</h3>
            <p className="text-[11px] text-[#475569] mt-0.5">
              {completedTasksCount} من {totalTasksCount} مكتملة
            </p>
          </div>
          <Link
            href="/today"
            className="flex items-center gap-1 text-xs text-[#475569] hover:text-violet-400 font-semibold transition-colors"
          >
            <span>عرض الكل</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Progress track */}
        <div className="xp-bar-track mb-4">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-500"
            style={{ width: `${(completedTasksCount / Math.max(1, totalTasksCount)) * 100}%` }}
          />
        </div>

        {/* Task list — show first 5 */}
        <div className="space-y-2">
          {todayTasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-150 ${
                task.completed
                  ? 'border-transparent opacity-50'
                  : 'border-white/[0.05] hover:border-violet-900/40 hover:bg-violet-950/10'
              }`}
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-[#334155] shrink-0 hover:text-violet-400 transition-colors" />
              )}
              <span className={`flex-1 text-sm font-medium ${task.completed ? 'line-through text-[#475569]' : 'text-[#e2e8f0]'}`}>
                {task.task}
              </span>
              <span className={`text-[11px] font-mono font-bold shrink-0 ${task.completed ? 'text-emerald-600' : 'text-[#475569]'}`}>
                +{task.xpReward} XP
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ DISCIPLINE RULES ══ */}
      <DisciplineRulesCard
        rules={disciplineRules}
        onResist={resistRule}
        onBreak={breakRule}
      />

      {/* ══ RANDOM MISSION MODAL ══ */}
      <RandomMissionModal
        isOpen={isBoredModalOpen}
        onClose={() => setIsBoredModalOpen(false)}
        onAcceptMission={acceptRandomMission}
      />
    </div>
  );
}
