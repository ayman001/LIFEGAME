'use client';

import React from 'react';
import { useRPG } from '@/context/RPGContext';
import {
  TrendingUp,
  Flame,
  Coins,
  Shield,
  Target,
  Trophy,
  Briefcase,
  BookOpen,
  Dumbbell,
  CheckCircle2,
  PieChart as PieIcon,
  BarChart3
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import ProgressRoadmap from '@/components/game/ProgressRoadmap';
import ChaptersOverview from '@/components/game/ChaptersOverview';

export default function ProgressPage() {

  const { playerProfile, goals, achievements, quests } = useRPG();

  // Historical data points
  const xpOverTimeData = [
    { date: 'Sep 15', xp: 120 },
    { date: 'Sep 16', xp: 210 },
    { date: 'Sep 17', xp: 320 },
    { date: 'Sep 18', xp: 430 },
    { date: 'Sep 19', xp: 510 },
    { date: 'Sep 20', xp: 620 },
    { date: 'Today', xp: playerProfile.totalXP }
  ];

  const weeklyXPData = [
    { week: 'W35', xp: 110 },
    { week: 'W36', xp: 180 },
    { week: 'W37', xp: 250 },
    { week: 'W38 (Current)', xp: 145 }
  ];

  const moneySavedOverTime = [
    { date: 'Sep 15', dh: 30 },
    { date: 'Sep 16', dh: 55 },
    { date: 'Sep 17', dh: 80 },
    { date: 'Sep 18', dh: 120 },
    { date: 'Sep 19', dh: 160 },
    { date: 'Sep 20', dh: 205 },
    { date: 'Today', dh: playerProfile.totalSavedDH }
  ];

  // Category counts
  const categoryCounts = quests.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const donutColors = ['#8b5cf6', '#38bdf8', '#10b981', '#f59e0b', '#ec4899', '#6366f1'];
  const categoryChartData = Object.entries(categoryCounts).map(([name, value], idx) => ({
    name,
    value,
    color: donutColors[idx % donutColors.length]
  }));

  const unlockedAchievementsCount = achievements.filter((a) => a.status === 'unlocked').length;
  const achievementPercent = Math.round((unlockedAchievementsCount / achievements.length) * 100);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
            تحليلات الأداء التاريخي
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          مؤشرات التقدم والتحليلات
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          بيانات ورسوم بيانية توثق انضباطك المتراكم وتطور شخصيتك بمرور الأيام.
        </p>
      </div>

      {/* Top Comprehensive Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-[#0d131f] border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">مجموع النقاط</span>
          <span className="text-xl font-black text-purple-400 font-mono mt-1 block">
            {playerProfile.totalXP} XP
          </span>
          <span className="text-[10px] text-slate-500">المستوى {playerProfile.level}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d131f] border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">أيام الالتزام</span>
          <span className="text-xl font-black text-amber-400 font-mono mt-1 block">
            {playerProfile.streak} أيام
          </span>
          <span className="text-[10px] text-slate-500">سلسلة متواصلة</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d131f] border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">صندوق الحرية</span>
          <span className="text-xl font-black text-emerald-400 font-mono mt-1 block">
            {playerProfile.totalSavedDH} درهم
          </span>
          <span className="text-[10px] text-slate-500">{playerProfile.lifePoints} نقطة حياة</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d131f] border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">أيام الصفاء</span>
          <span className="text-xl font-black text-rose-400 font-mono mt-1 block">
            {playerProfile.weedFreeDays} أيام
          </span>
          <span className="text-[10px] text-slate-500">لا تدخين ولا رضوخ</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d131f] border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">العمل والتعلّم</span>
          <span className="text-xl font-black text-indigo-400 font-mono mt-1 block">
            {playerProfile.workHours + playerProfile.learningHours} س
          </span>
          <span className="text-[10px] text-slate-500">{playerProfile.workHours} س عمل / {playerProfile.learningHours} س تعلّم</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d131f] border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 block">الإنجازات المفتوحة</span>
          <span className="text-xl font-black text-amber-300 font-mono mt-1 block">
            {unlockedAchievementsCount}/{achievements.length}
          </span>
          <span className="text-[10px] text-slate-500">{achievementPercent}% تم الفتح</span>
        </div>
      </div>

      {/* Visual Progression Journey Roadmap */}
      <ProgressRoadmap streakDays={playerProfile.streak} />

      {/* Progression Story Chapters */}
      <ChaptersOverview userLevel={playerProfile.level} />

      {/* Row 1 Charts: XP Over Time & Money Saved Over Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        
        {/* Total XP Over Time */}
        <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                منحنى النمو التراكمي
              </span>
              <h3 className="text-base font-bold text-white">تطور مجموع XP عبر الزمن</h3>
            </div>
            <span className="text-xs font-mono text-purple-400 font-bold">
              المستوى {playerProfile.level} ({playerProfile.totalXP} XP)
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={xpOverTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="xp" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Money Saved Over Time */}
        <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                الثروة المحمية
              </span>
              <h3 className="text-base font-bold text-white">نمو صندوق الحرية (درهم)</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              +{playerProfile.totalSavedDH} درهم محمي
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moneySavedOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
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

      {/* Row 2: Bar Chart for Weekly XP & Donut for Quests by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bar Chart Weekly XP */}
        <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                الوتيرة الأسبوعية
              </span>
              <h3 className="text-base font-bold text-white">النقاط المحققة أسبوعياً</h3>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">تتبع 4 أسابيع</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyXPData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="week" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="xp" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart: Quests by Category */}
        <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-pink-400 font-bold block">
                مصفوفة توازن جوانب الحياة
              </span>
              <h3 className="text-base font-bold text-white">المهام حسب المجال</h3>
            </div>
            <span className="text-xs font-mono text-pink-400 font-bold">{quests.length} مهمة إجمالاً</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 h-64">
            <div className="h-full w-full sm:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full sm:w-1/2 space-y-2">
              {categoryChartData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300">{item.name}</span>
                  </div>
                  <span className="font-mono font-bold text-white">{item.value} مهام</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Row 3: Goals Progress Bars */}
      <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <Target className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">مؤشرات إنجاز الأهداف الاستراتيجية</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">حملات قيد التنفيذ</span>
        </div>

        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-white">{goal.name}</span>
                <span className="font-mono font-bold text-purple-400">{goal.progress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 rounded-full transition-all duration-700"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                <span>المجال: {goal.category}</span>
                <span>الموعد النهائي: {goal.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
