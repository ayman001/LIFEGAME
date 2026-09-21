'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import { Goal, GoalType, GoalCategory, GoalStatus } from '@/types';
import {
  Target,
  Plus,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  X,
  Trash2,
  Play,
  Pause
} from 'lucide-react';

export default function GoalsPage() {
  const { goals, updateGoalProgress, completeGoal, addGoal, deleteGoal } = useRPG();
  const [selectedTab, setSelectedTab] = useState<'All' | 'short-term' | 'mid-term' | 'long-term' | 'active' | 'completed'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New goal state
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalType, setNewGoalType] = useState<GoalType>('short-term');
  const [newGoalCategory, setNewGoalCategory] = useState<GoalCategory>('ELITDIGI');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');
  const [newGoalXp, setNewGoalXp] = useState(150);
  const [newGoalWhy, setNewGoalWhy] = useState('');
  const [newGoalNext, setNewGoalNext] = useState('');

  const categories: GoalCategory[] = [
    'Health',
    'Faith',
    'Money',
    'Career',
    'ELITDIGI',
    'Learning',
    'Relationships',
    'Personal Growth',
    'Experiences'
  ];

  const filteredGoals = goals.filter((g) => {
    if (selectedTab === 'All') return true;
    if (selectedTab === 'active') return g.status === 'in_progress' || g.status === 'not_started';
    if (selectedTab === 'completed') return g.status === 'completed';
    return g.type === selectedTab;
  });

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalName.trim()) return;

    addGoal({
      name: newGoalName.trim(),
      type: newGoalType,
      category: newGoalCategory,
      deadline: newGoalDeadline || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: 'in_progress',
      progress: 0,
      xpReward: newGoalXp,
      whyItMatters: newGoalWhy.trim() || 'Crucial for real-life level progression.',
      nextAction: newGoalNext.trim() || 'Schedule first focused session.'
    });

    setNewGoalName('');
    setNewGoalWhy('');
    setNewGoalNext('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-5 h-5 text-purple-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
              حملات استراتيجية
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            خريطة أهداف الحياة
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            محطات قصيرة ومتوسطة وبعيدة المدى تصقل شخصيتك الدائمة وتبني إنجازاتك الحقيقية.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة هدف جديد</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {[
          { label: 'جميع الأهداف', value: 'All' },
          { label: 'قصير المدى', value: 'short-term' },
          { label: 'متوسط المدى', value: 'mid-term' },
          { label: 'بعيد المدى', value: 'long-term' },
          { label: 'قيد التنفيذ', value: 'active' },
          { label: 'مكتمل', value: 'completed' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value as 'All' | 'short-term' | 'mid-term' | 'long-term' | 'active' | 'completed')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold shrink-0 transition-all ${
              selectedTab === tab.value
                ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-500/20'
                : 'bg-[#0d131f] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGoals.length === 0 ? (
          <div className="col-span-full rounded-3xl bg-[#0d131f] border border-slate-800 p-12 text-center">
            <Target className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-200">لا توجد أهداف في هذا التصنيف</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              حدد حملتك الاستراتيجية القادمة لتركز على ما يصنع فارقاً حقيقياً في حياتك.
            </p>
          </div>
        ) : (
          filteredGoals.map((goal) => {
            const isCompleted = goal.status === 'completed';

            return (
              <div
                key={goal.id}
                className={`rounded-3xl border p-5 sm:p-6 transition-all flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-950/10 border-emerald-500/30'
                    : 'bg-[#0d131f] border-slate-800/80 hover:border-purple-500/30 shadow-lg'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-purple-300 border border-slate-700">
                        {goal.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {goal.type === 'short-term' ? 'قصير المدى' : goal.type === 'mid-term' ? 'متوسط المدى' : 'بعيد المدى'}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-lg border border-purple-500/20">
                      +{goal.xpReward} XP
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-base sm:text-lg font-black tracking-tight ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                    {goal.name}
                  </h3>

                  {/* Why It Matters */}
                  <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                      لماذا هذا الهدف مهم:
                    </span>
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      &quot;{goal.whyItMatters}&quot;
                    </p>
                  </div>

                  {/* Next Action */}
                  <div className="mt-2.5 flex items-start gap-2 text-xs">
                    <ArrowRight className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0 rotate-180" />
                    <div>
                      <span className="font-mono text-[10px] uppercase text-slate-400 block font-semibold">
                        الخطوة القادمة
                      </span>
                      <span className="text-slate-200 font-medium">{goal.nextAction}</span>
                    </div>
                  </div>

                  {/* Deadline & Status */}
                  <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-slate-800/80">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      الموعد المستهدف: {goal.deadline}
                    </span>
                    <span>
                      {goal.status === 'completed'
                        ? 'مكتمل'
                        : goal.status === 'in_progress'
                        ? 'قيد التنفيذ'
                        : goal.status === 'paused'
                        ? 'متوقف مؤقتاً'
                        : 'لم يبدأ'}
                    </span>
                  </div>

                  {/* Progress Slider */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 font-semibold">نسبة التقدم</span>
                      <span className="font-bold text-white">{goal.progress}%</span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={goal.progress}
                      disabled={isCompleted}
                      onChange={(e) => updateGoalProgress(goal.id, Number(e.target.value))}
                      className="w-full accent-purple-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  {!isCompleted ? (
                    <button
                      type="button"
                      onClick={() => completeGoal(goal.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>تحديد كمكتمل</span>
                    </button>
                  ) : (
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      تم الإنجاز {goal.completedAt}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => deleteGoal(goal.id)}
                    className="p-1.5 text-slate-600 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="حذف الهدف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Create Goal Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0e121d] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/40 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                    تخطيط استراتيجي
                  </span>
                  <h3 className="text-lg font-black text-white">صياغة هدف جديد</h3>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  اسم الهدف
                </label>
                <input
                  type="text"
                  placeholder="مثال: إطلاق مشروع رقمي جديد أو تعلم مهارة قيادية..."
                  value={newGoalName}
                  onChange={(e) => setNewGoalName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    المدى الزمني
                  </label>
                  <select
                    value={newGoalType}
                    onChange={(e) => setNewGoalType(e.target.value as GoalType)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="short-term">قصير المدى (أيام / أسابيع)</option>
                    <option value="mid-term">متوسط المدى (1–3 أشهر)</option>
                    <option value="long-term">بعيد المدى (6–12+ شهر)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    التصنيف
                  </label>
                  <select
                    value={newGoalCategory}
                    onChange={(e) => setNewGoalCategory(e.target.value as GoalCategory)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-slate-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    الموعد النهائي المستهدف
                  </label>
                  <input
                    type="date"
                    value={newGoalDeadline}
                    onChange={(e) => setNewGoalDeadline(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    مكافأة XP
                  </label>
                  <select
                    value={newGoalXp}
                    onChange={(e) => setNewGoalXp(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  >
                    <option value={100}>100 XP (معياري)</option>
                    <option value={200}>200 XP (مهم)</option>
                    <option value={300}>300 XP (رئيسي)</option>
                    <option value={500}>500 XP (إنجاز استثنائي)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  لماذا هذا الهدف مهم؟
                </label>
                <textarea
                  rows={2}
                  placeholder="اشرح كيف يرتبط هذا الهدف بهويتك ومستقبلك الحقيقي..."
                  value={newGoalWhy}
                  onChange={(e) => setNewGoalWhy(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  أول خطوة عملية قادمة
                </label>
                <input
                  type="text"
                  placeholder="ما هي الخطوة الفعلية الملموسة التي ستنفذها أولاً؟"
                  value={newGoalNext}
                  onChange={(e) => setNewGoalNext(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>تفعيل الهدف الاستراتيجي</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
