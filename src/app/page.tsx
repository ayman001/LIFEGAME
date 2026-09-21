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
  Dices,
  PlusCircle
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

  // If role is Boss, display the Boss Control Center
  if (role === 'boss') {
    return <BossOverview />;
  }

  // Calculate Progress and XP
  const progressPercent = calculateLevelProgress(playerProfile.totalXP);
  const xpNeeded = calculateXPToNextLevel(playerProfile.totalXP);
  const currentXPInLevel = playerProfile.totalXP % 100;

  // Uncompleted Tasks for Today
  const pendingTasks = todayTasks.filter((t) => !t.completed);
  const completedTasks = todayTasks.filter((t) => t.completed);
  const totalTasksCount = todayTasks.length;
  const completedTasksCount = completedTasks.length;

  // Queue of Missions: Pending tasks first, then daily quests
  const uncompletedQuests = quests.filter((q) => q.status !== 'completed' && q.isDailyMission);
  const activeMissionQueue = [...pendingTasks, ...uncompletedQuests];

  const currentMission = activeMissionQueue.length > 0 ? activeMissionQueue[0] : null;
  const nextMission = activeMissionQueue.length > 1 ? activeMissionQueue[1] : null;

  // Handle completion from Current Mission Card
  const handleCompleteCurrent = (missionId: string, isTask: boolean) => {
    if (isTask) {
      toggleTask(missionId);
    } else {
      completeQuest(missionId);
    }
  };

  // Active Boss Challenge
  const activeBossChallenge = bossChallenges.find((c) => c.status === 'active');

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      
      {/* 1. TOP HEADER: LEVEL & STREAK (Duolingo style minimal game header) */}
      <div className="rounded-3xl bg-[#0e1422] border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Level & XP counter */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-xs font-mono font-black tracking-widest text-purple-400 uppercase bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                LEVEL {String(playerProfile.level).padStart(2, '0')}
              </span>
              <span className="text-xs font-bold text-slate-400 font-mono">
                {playerProfile.totalXP} XP إجمالي
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-white font-mono">
                {currentXPInLevel} / 100 XP
              </span>
              <span className="text-xs text-slate-400 font-medium">
                (متبقي {xpNeeded} XP للمستوى {playerProfile.level + 1})
              </span>
            </div>

            {/* Smooth Progress Bar */}
            <div className="mt-3 h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-500 relative"
                style={{ width: `${Math.max(4, progressPercent)}%` }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-white/50 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Streak Counter Hero */}
          <div className="flex items-center gap-3 sm:border-r sm:border-slate-800 sm:pr-6 shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
              <Flame className="w-7 h-7 fill-amber-500" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">السلسلة</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono flex items-center gap-1">
                <span>{playerProfile.streak}</span>
                <span className="text-xs text-amber-400 font-bold">أيام</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. THE HERO: CURRENT MISSION CARD (Visually Dominates the Screen) */}
      <CurrentMissionCard
        currentMission={currentMission}
        nextMission={nextMission}
        onComplete={handleCompleteCurrent}
        onOpenBoredModal={() => setIsBoredModalOpen(true)}
      />

      {/* 3. DAILY COMPLETION REWARD BANNER (When 100% conquered) */}
      <DailyCompletionBanner
        completedCount={completedTasksCount}
        totalCount={totalTasksCount}
        bonusClaimed={dailyBonusClaimed}
        onClaimBonus={claimDailyBonus}
      />

      {/* 4. ACTIVE BOSS CHALLENGE (Special tactical treatment) */}
      {activeBossChallenge && (
        <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-amber-950/30 p-5 sm:p-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
                    تحدي القائد — BOSS CHALLENGE
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    الموعد: {activeBossChallenge.deadline}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {activeBossChallenge.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-lg">
                  {activeBossChallenge.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 font-black text-xs">
                +{activeBossChallenge.xpReward} XP
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TODAY'S MISSIONS CHECKLIST (Calm & Clean Overview) */}
      <div className="rounded-3xl bg-[#0d121c] border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-black text-white">مهام اليوم — TODAY</h3>
            <p className="text-xs text-slate-400">
              {completedTasksCount} من أصل {totalTasksCount} مكتملة ({Math.round((completedTasksCount / Math.max(1, totalTasksCount)) * 100)}%)
            </p>
          </div>
          <Link
            href="/today"
            className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 transition-colors"
          >
            <span>عرض الكل</span>
            <PlusCircle className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
            style={{ width: `${(completedTasksCount / Math.max(1, totalTasksCount)) * 100}%` }}
          />
        </div>

        {/* Compact Task List */}
        <div className="space-y-2.5">
          {todayTasks.slice(0, 5).map((task) => {
            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer select-none ${
                  task.completed
                    ? 'bg-emerald-950/15 border-emerald-500/30 text-slate-400'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 shrink-0 hover:text-purple-400 transition-colors" />
                  )}
                  <span className={`text-sm font-semibold ${task.completed ? 'line-through text-slate-400' : ''}`}>
                    {task.task}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded-md">
                    {task.category}
                  </span>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                    task.completed ? 'text-emerald-400/70' : 'text-emerald-400 bg-emerald-500/10'
                  }`}>
                    +{task.xpReward} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. DISCIPLINE RULES (NOT DO — Passive Challenges) */}
      <DisciplineRulesCard
        rules={disciplineRules}
        onResist={resistRule}
        onBreak={breakRule}
      />

      {/* 7. QUICK ACTION: DO WHEN BORED GENERATOR TRIGGER */}
      <div className="p-5 rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-950/20 via-slate-900 to-indigo-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-right">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <Dices className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white">هل تشعر بالملل أو الفراغ الذهني؟</h4>
            <p className="text-xs text-slate-400">حوّل وقتك إلى إنجاز فوري وسريع بنقرة واحدة.</p>
          </div>
        </div>

        <button
          onClick={() => setIsBoredModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer shrink-0"
        >
          أعطني مهمة عشوائية (+5 XP)
        </button>
      </div>

      {/* 8. RANDOM MISSION MODAL */}
      <RandomMissionModal
        isOpen={isBoredModalOpen}
        onClose={() => setIsBoredModalOpen(false)}
        onAcceptMission={acceptRandomMission}
      />

    </div>
  );
}
