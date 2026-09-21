'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import { getRankArabicName } from '@/lib/rpg-engine';
import {
  BarChart3,
  Calendar,
  Sparkles,
  Coins,
  CheckCircle2,
  Briefcase,
  BookOpen,
  Dumbbell,
  Flame,
  Crown,
  Trophy,
  Star,
  Send
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

export default function WeeklyScorePage() {
  const { weeklyScore, playerProfile, quests } = useRPG();

  // Self-reflection form state
  const [wins, setWins] = useState(weeklyScore.playerReflection?.wins || '');
  const [challenges, setChallenges] = useState(weeklyScore.playerReflection?.challenges || '');
  const [priority, setPriority] = useState(weeklyScore.playerReflection?.nextWeekPriority || '');
  const [isSaved, setIsSaved] = useState(false);

  // Mock data for weekly charts
  const weeklyXPData = [
    { day: 'الإثنين', xp: 20 },
    { day: 'الثلاثاء', xp: 25 },
    { day: 'الأربعاء', xp: 15 },
    { day: 'الخميس', xp: 30 },
    { day: 'الجمعة', xp: 20 },
    { day: 'السبت', xp: 15 },
    { day: 'الأحد', xp: 20 }
  ];

  const savingsData = [
    { day: 'الإثنين', dh: 30 },
    { day: 'الثلاثاء', dh: 25 },
    { day: 'الأربعاء', dh: 25 },
    { day: 'الخميس', dh: 40 },
    { day: 'الجمعة', dh: 40 },
    { day: 'السبت', dh: 45 },
    { day: 'الأحد', dh: 35 }
  ];

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const getRankBadgeColor = (rank: string) => {
    switch (rank) {
      case 'Legendary':
        return 'from-amber-500 to-yellow-600 text-slate-950';
      case 'Elite':
        return 'from-purple-600 to-indigo-600 text-white';
      case 'Warrior':
        return 'from-blue-600 to-cyan-500 text-white';
      case 'Starter':
        return 'from-emerald-600 to-teal-500 text-white';
      default:
        return 'from-slate-700 to-slate-800 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
              بطاقة الأداء الأسبوعي
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            التقييم والمراجعة الأسبوعية
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            أسبوع {weeklyScore.weekStartDate} ({weeklyScore.weekId}) • مراجعة بناءة ومسؤولية تشاركية.
          </p>
        </div>

        {/* Weekly Rank Badge */}
        <div className="flex items-center gap-3">
          <div className="text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
              الرتبة الأسبوعية
            </span>
            <span className="text-xs text-slate-300 font-mono">
              الهدف: 200+ XP لرتبة النخبة
            </span>
          </div>

          <div className={`px-4 py-2 rounded-2xl bg-gradient-to-r ${getRankBadgeColor(weeklyScore.weeklyRank)} shadow-lg font-black font-mono text-sm tracking-wider uppercase flex items-center gap-2`}>
            <Trophy className="w-4 h-4" />
            <span>{getRankArabicName(weeklyScore.weeklyRank)}</span>
          </div>
        </div>
      </div>

      {/* Primary Scorecard Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-[#0d131f] border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">نقاط الأسبوع</span>
          <span className="text-xl font-black text-purple-400 font-mono mt-1 block">
            {weeklyScore.xpEarned} XP
          </span>
          <span className="text-[10px] text-slate-500">تشمل {weeklyScore.bossXPEarned} XP مشرف</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d131f] border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">المهام المنجزة</span>
          <span className="text-xl font-black text-white font-mono mt-1 block">
            {weeklyScore.completedQuests} مهمة
          </span>
          <span className="text-[10px] text-slate-500">على مدار 7 أيام</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d131f] border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">أموال مدخرة</span>
          <span className="text-xl font-black text-emerald-400 font-mono mt-1 block">
            +{weeklyScore.moneySavedDH} درهم
          </span>
          <span className="text-[10px] text-slate-500">صندوق الحرية</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d131f] border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">العمل العميق</span>
          <span className="text-xl font-black text-indigo-400 font-mono mt-1 block">
            {playerProfile.workHours} س تركيز
          </span>
          <span className="text-[10px] text-slate-500">مشاريع تقنية</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d131f] border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">التمارين</span>
          <span className="text-xl font-black text-teal-400 font-mono mt-1 block">
            {playerProfile.workoutsCount} حصص
          </span>
          <span className="text-[10px] text-slate-500">صحة ولياقة</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d131f] border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">أيام نقية</span>
          <span className="text-xl font-black text-rose-400 font-mono mt-1 block">
            {playerProfile.weedFreeDays}/7 أيام
          </span>
          <span className="text-[10px] text-slate-500">صفاء ذهني تام</span>
        </div>
      </div>

      {/* Interactive Charts: Weekly XP Trend & Money Saved Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Weekly XP Bar Chart */}
        <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                الإنتاج اليومي
              </span>
              <h3 className="text-base font-bold text-white">تراكم XP اليومي</h3>
            </div>
            <span className="text-xs font-mono text-purple-400 font-bold">145 XP الإجمالي</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyXPData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="xp" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Money Saved Chart */}
        <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                الحصن المالي
              </span>
              <h3 className="text-base font-bold text-white">نمو المدخرات اليومي (درهم)</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">240 درهم تراكمي</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={savingsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="dh" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Boss Weekly Review Section (Prominently displayed for Player) */}
      {weeklyScore.bossReview && (
        <div className="rounded-3xl bg-gradient-to-r from-[#17120a] via-[#100d07] to-[#090b10] border border-amber-500/40 p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  تقييم المشرف المعتمد
                </span>
                <h3 className="text-lg font-black text-white">
                  مراجعة المشرف: {weeklyScore.bossReview.bossName}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${
                    s <= weeklyScore.bossReview!.rating
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                نقاط القوة والانتصارات
              </span>
              <p className="text-slate-300 leading-relaxed italic">
                &quot;{weeklyScore.bossReview.whatWentWell}&quot;
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
                نقاط تحتاج تحسين
              </span>
              <p className="text-slate-300 leading-relaxed italic">
                &quot;{weeklyScore.bossReview.needsImprovement}&quot;
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block mb-1">
                أولوية الأسبوع القادم
              </span>
              <p className="text-slate-300 leading-relaxed italic">
                &quot;{weeklyScore.bossReview.nextPriority}&quot;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Self-Review Form */}
      <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800 mb-4">
          <Calendar className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">المراجعة الذاتية للأسبوع</h3>
        </div>

        <form onSubmit={handleSaveReflection} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                أبرز انتصارات الأسبوع
              </label>
              <textarea
                rows={3}
                value={wins}
                onChange={(e) => setWins(e.target.value)}
                placeholder="ما هي الأفعال التي جعلتك فخوراً بنفسك هذا الأسبوع؟..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                العقبات والتحديات
              </label>
              <textarea
                rows={3}
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                placeholder="أين تعثر الانضباط وكيف ستعالجه بطريقة عملية؟..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                الأولوية القصوى للأسبوع القادم
              </label>
              <textarea
                rows={3}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                placeholder="المحطة أو الإنجاز الواحد الذي سيجعل الأسبوع القادم فوزاً مؤكداً..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-emerald-400 font-semibold">
              {isSaved ? '✓ تم حفظ المراجعة في السجل الموثق' : ''}
            </span>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-purple-500/20"
            >
              <Send className="w-3.5 h-3.5 rotate-180" />
              <span>حفظ المراجعة الأسبوعية</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
