'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import {
  Trophy,
  Lock,
  CheckCircle2,
  Flame,
  Zap,
  Coins,
  ShieldCheck,
  Brain,
  Dumbbell,
  BookOpen,
  Compass,
  Award,
  Target,
  ArrowRight,
  Layers
} from 'lucide-react';
import Link from 'next/link';

export default function AchievementsPage() {
  const { achievements, goals } = useRPG();
  const [mainTab, setMainTab] = useState<'all' | 'goals' | 'discipline'>('all');
  const [disciplineFilter, setDisciplineFilter] = useState<'All' | 'unlocked' | 'in_progress' | 'locked'>('All');

  // Finished life goals
  const finishedLifeGoals = goals.filter((g) => g.status === 'completed');
  const finishedGoalsXP = finishedLifeGoals.reduce((acc, g) => acc + g.xpReward, 0);

  // Discipline achievements
  const unlockedDisciplineCount = achievements.filter((a) => a.status === 'unlocked').length;
  const totalDisciplineXP = achievements
    .filter((a) => a.status === 'unlocked')
    .reduce((acc, a) => acc + a.xpReward, 0);

  const grandTotalXP = finishedGoalsXP + totalDisciplineXP;
  const grandTotalItems = finishedLifeGoals.length + unlockedDisciplineCount;

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Flag: Award,
    Flame: Flame,
    Zap: Zap,
    Coins: Coins,
    ShieldCheck: ShieldCheck,
    Brain: Brain,
    Dumbbell: Dumbbell,
    BookOpen: BookOpen,
    Compass: Compass,
    Award: Trophy
  };

  const filteredAchievements = achievements.filter((a) => {
    if (disciplineFilter === 'All') return true;
    return a.status === disciplineFilter;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
              قاعة البطولات وأهداف الحياة المحققة
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            سجل الإنجازات والبطولات
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            قاعة المجد الدائمة: هنا تُخلّد أهداف الحياة الكبرى التي أنجزتها، وأوسمة الانضباط التي اكتسبتها بعرقك.
          </p>
        </div>

        {/* Global Summary Stats */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-center">
            <span className="text-[10px] font-mono text-amber-400 uppercase block font-semibold">إجمالي البطولات</span>
            <span className="text-sm sm:text-base font-black text-amber-300 font-mono">
              {grandTotalItems} منجز
            </span>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-center">
            <span className="text-[10px] font-mono text-purple-400 uppercase block font-semibold">مجموع XP البطولات</span>
            <span className="text-sm sm:text-base font-black text-purple-300 font-mono">
              +{grandTotalXP} XP
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setMainTab('all')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all shrink-0 ${
            mainTab === 'all'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-[#0d121c] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>الكل ({finishedLifeGoals.length + achievements.length})</span>
        </button>

        <button
          onClick={() => setMainTab('goals')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all shrink-0 ${
            mainTab === 'goals'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-[#0d121c] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Target className="w-4 h-4 text-amber-400" />
          <span>أهداف الحياة المحققة ({finishedLifeGoals.length})</span>
        </button>

        <button
          onClick={() => setMainTab('discipline')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all shrink-0 ${
            mainTab === 'discipline'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'bg-[#0d121c] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4 text-purple-400" />
          <span>أوسمة الانضباط ({unlockedDisciplineCount}/{achievements.length})</span>
        </button>
      </div>

      {/* SECTION 1: FINISHED LIFE GOALS TROPHY WALL */}
      {(mainTab === 'all' || mainTab === 'goals') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-white">
                  أهداف الحياة الكبرى المنجزة (FINISHED LIFE GOALS)
                </h2>
                <p className="text-xs text-slate-400">
                  محطات استراتيجية تم قهرها وتحويلها إلى إنجازات أبدية في شخصيتك.
                </p>
              </div>
            </div>

            <Link
              href="/goals"
              className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
            >
              <span>خريطة الأهداف</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>

          {finishedLifeGoals.length === 0 ? (
            <div className="p-8 sm:p-12 text-center rounded-3xl bg-[#0d121c] border border-slate-800/80">
              <Target className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">لا توجد أهداف حياة مكتملة حتى الآن</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                عندما ترفع تقدم أي هدف من خريطة أهداف الحياة إلى 100%، سيُخلّد تلقائياً هنا في قاعة المجد حاملاً وسامه الذهبي ونقاطه!
              </p>
              <Link
                href="/goals"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-colors"
              >
                <span>الانتقال لأهداف الحياة</span>
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {finishedLifeGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-950/20 via-[#0d1017] to-[#090d14] p-5 sm:p-6 shadow-xl relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                      <Trophy className="w-5 h-5" />
                    </div>

                    <div className="text-left font-mono">
                      <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                        +{goal.xpReward} XP
                      </span>
                      <span className="text-[10px] text-amber-400/80 block mt-1">
                        {goal.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-black text-white tracking-tight">
                    {goal.name}
                  </h3>

                  {goal.whyItMatters && (
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-900/60 border border-slate-800/80 p-3 rounded-2xl">
                      <span className="text-amber-400/90 font-bold block text-[11px] mb-0.5">لماذا كان هذا الهدف مصيرياً:</span>
                      {goal.whyItMatters}
                    </p>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تم التحقيق بنجاح</span>
                    </span>
                    {goal.completedAt && (
                      <span className="font-mono text-[11px] text-slate-500">
                        {goal.completedAt}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: DISCIPLINE SYSTEM BADGES */}
      {(mainTab === 'all' || mainTab === 'discipline') && (
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-white">
                  أوسمة الانضباط والتمكن الدائمة (DISCIPLINE SYSTEM TROPHIES)
                </h2>
                <p className="text-xs text-slate-400">
                  أوسمة تُفتح تلقائياً بحسب عاداتك، واستمراريتك، ومقاومتك للمشتتات.
                </p>
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 bg-[#0d121c] p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
              {[
                { label: 'الكل', value: 'All' },
                { label: 'المفتوح', value: 'unlocked' },
                { label: 'قيد التقدم', value: 'in_progress' },
                { label: 'المقفل', value: 'locked' }
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setDisciplineFilter(tab.value as typeof disciplineFilter)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    disciplineFilter === tab.value
                      ? 'bg-purple-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((ach) => {
              const Icon = iconMap[ach.iconName] || Trophy;
              const isUnlocked = ach.status === 'unlocked';
              const isInProgress = ach.status === 'in_progress';

              return (
                <div
                  key={ach.id}
                  className={`rounded-3xl border p-5 sm:p-6 transition-all relative overflow-hidden flex flex-col justify-between ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-[#14120b] via-[#0d1017] to-[#0a0d14] border-amber-500/40 shadow-xl shadow-amber-950/20'
                      : isInProgress
                      ? 'bg-[#0d131f] border-slate-700/80 shadow-md'
                      : 'bg-[#090c14]/60 border-slate-800/60 opacity-60'
                  }`}
                >
                  <div>
                    {/* Top Badge and Icon */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                          isUnlocked
                            ? 'bg-amber-500/10 border-amber-400/50 text-amber-300 shadow-lg shadow-amber-500/20'
                            : isInProgress
                            ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                            : 'bg-slate-900 border-slate-800 text-slate-600'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="text-left font-mono">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${
                            isUnlocked
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          +{ach.xpReward} XP
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-1 uppercase">
                          {ach.category}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base font-black text-white tracking-tight">
                      {ach.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {ach.description}
                    </p>

                    {/* Unlock condition hint */}
                    <div className="mt-3 p-2 rounded-xl bg-slate-950/50 border border-slate-800/80 text-[11px] text-slate-400">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 block">
                        شرط الفتح:
                      </span>
                      {ach.unlockCondition}
                    </div>
                  </div>

                  {/* Bottom Progress or Unlock Badge */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    {isUnlocked ? (
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>تم الفتح بنجاح</span>
                        </span>
                        <span>مكتمل 100%</span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                          <span className="flex items-center gap-1 text-slate-500">
                            <Lock className="w-3 h-3" />
                            <span>مغلق</span>
                          </span>
                          <span>
                            {ach.progress} / {ach.maxProgress}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 transition-all duration-300 rounded-full"
                            style={{ width: `${Math.min(100, Math.round((ach.progress / ach.maxProgress) * 100))}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
