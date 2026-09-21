'use client';

import React from 'react';
import { useRPG } from '@/context/RPGContext';
import { calculateXPToNextLevel, getRankArabicName } from '@/lib/rpg-engine';
import {
  Sparkles,
  ArrowUpRight,
  Calendar,
  Flame,
  Coins,
  Target,
  Percent,
  Heart
} from 'lucide-react';

export default function StatCardsGrid() {
  const { playerProfile, quests, weeklyScore } = useRPG();

  const xpNeeded = calculateXPToNextLevel(playerProfile.totalXP);
  
  // Calculate today's progress percentage
  const todayQuests = quests.filter((q) => q.isDailyMission || q.date === new Date().toISOString().split('T')[0]);
  const completedToday = todayQuests.filter((q) => q.status === 'completed').length;
  const todayPercentage = todayQuests.length > 0 
    ? Math.round((completedToday / todayQuests.length) * 100) 
    : 0;

  const stats = [
    {
      label: 'المستوى الحالي',
      value: `مستوى ${playerProfile.level}`,
      sub: `${playerProfile.totalXP} نقطة XP تراكمية`,
      icon: Sparkles,
      color: 'text-purple-400',
      border: 'border-purple-500/30'
    },
    {
      label: 'إجمالي النقاط',
      value: `${playerProfile.totalXP}`,
      sub: 'رصيدك الدائم في الحياة',
      icon: ArrowUpRight,
      color: 'text-indigo-400',
      border: 'border-indigo-500/30'
    },
    {
      label: 'للمستوى التالي',
      value: `${xpNeeded} XP`,
      sub: `${playerProfile.totalXP % 100}/100 التقدم`,
      icon: ArrowUpRight,
      color: 'text-cyan-400',
      border: 'border-cyan-500/30'
    },
    {
      label: 'نقاط الأسبوع',
      value: `${weeklyScore.xpEarned} XP`,
      sub: `الرتبة: ${getRankArabicName(weeklyScore.weeklyRank)}`,
      icon: Calendar,
      color: 'text-blue-400',
      border: 'border-blue-500/30'
    },
    {
      label: 'السلسلة الحالية',
      value: `${playerProfile.streak} أيام`,
      sub: 'انضباط متواصل بلا انقطاع',
      icon: Flame,
      color: 'text-amber-400',
      border: 'border-amber-500/30'
    },
    {
      label: 'الأموال المدخرة',
      value: `${playerProfile.totalSavedDH} درهم`,
      sub: 'أصول صندوق الحرية',
      icon: Coins,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30'
    },
    {
      label: 'الأهداف المنجزة',
      value: `${playerProfile.goalsCompletedCount}`,
      sub: 'محطات إنجاز كبرى',
      icon: Target,
      color: 'text-rose-400',
      border: 'border-rose-500/30'
    },
    {
      label: 'إنجاز اليوم',
      value: `${todayPercentage}%`,
      sub: `${completedToday} من ${todayQuests.length} مهام`,
      icon: Percent,
      color: 'text-teal-400',
      border: 'border-teal-500/30'
    },
    {
      label: 'نقاط الحياة',
      value: `${playerProfile.lifePoints} نقطة`,
      sub: 'نقطة لكل 5 دراهم تدخرها',
      icon: Heart,
      color: 'text-pink-400',
      border: 'border-pink-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-3">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={`p-3.5 rounded-2xl bg-[#0d131f]/80 border ${item.border} hover:bg-[#111827] transition-all flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 truncate">
                {item.label}
              </span>
              <Icon className={`w-3.5 h-3.5 ${item.color} shrink-0`} />
            </div>

            <div>
              <div className="text-base sm:text-lg font-black text-white font-mono tracking-tight">
                {item.value}
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">
                {item.sub}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
