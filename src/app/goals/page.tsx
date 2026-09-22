'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import { Goal, GoalType, GoalCategory } from '@/types';
import {
  Target,
  Plus,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  X,
  Trash2,
} from 'lucide-react';

export default function GoalsPage() {
  const { goals, updateGoalProgress, completeGoal, addGoal, deleteGoal } = useRPG();
  const [selectedTab, setSelectedTab] = useState<'All' | 'short-term' | 'mid-term' | 'long-term' | 'active' | 'completed'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null);

  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalType, setNewGoalType] = useState<GoalType>('short-term');
  const [newGoalCategory, setNewGoalCategory] = useState<GoalCategory>('ELITDIGI');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');
  const [newGoalXp, setNewGoalXp] = useState(150);
  const [newGoalWhy, setNewGoalWhy] = useState('');
  const [newGoalNext, setNewGoalNext] = useState('');

  const categories: GoalCategory[] = [
    'Health', 'Faith', 'Money', 'Career', 'ELITDIGI',
    'Learning', 'Relationships', 'Personal Growth', 'Experiences'
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
      whyItMatters: newGoalWhy.trim() || 'ضروري لتطوري الشخصي.',
      nextAction: newGoalNext.trim() || 'جدولة أول جلسة عمل.'
    });
    setNewGoalName(''); setNewGoalWhy(''); setNewGoalNext('');
    setIsAddModalOpen(false);
  };

  const typeLabel = (t: GoalType) =>
    t === 'short-term' ? 'قصير' : t === 'mid-term' ? 'متوسط' : 'بعيد';

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-10">

      {/* ══ HEADER ══ */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="section-label mb-2 flex items-center gap-2">
            <Target className="w-3.5 h-3.5" />
            حملات استراتيجية
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">أهداف الحياة</h1>
          <p className="text-sm text-[#475569] mt-1">
            {goals.filter((g) => g.status !== 'completed').length} هدف قيد التنفيذ ·{' '}
            {goals.filter((g) => g.status === 'completed').length} مكتملة
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-lg shadow-violet-900/30 transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          هدف جديد
        </button>
      </div>

      {/* ══ FILTER TABS ══ */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { label: 'الكل',          value: 'All' },
          { label: 'قصير المدى',   value: 'short-term' },
          { label: 'متوسط المدى',  value: 'mid-term' },
          { label: 'بعيد المدى',   value: 'long-term' },
          { label: 'قيد التنفيذ',  value: 'active' },
          { label: 'مكتمل',        value: 'completed' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value as typeof selectedTab)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedTab === tab.value
                ? 'bg-violet-600 text-white'
                : 'bg-[#0f1420] text-[#64748b] hover:text-white border border-white/[0.05]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ══ GOALS GRID ══ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGoals.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-2xl bg-[#0f1420] border border-white/[0.06]">
            <Target className="w-10 h-10 text-[#334155] mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">لا توجد أهداف في هذا التصنيف</h3>
            <p className="text-sm text-[#475569] mt-1">حدد حملتك الاستراتيجية القادمة.</p>
          </div>
        ) : (
          filteredGoals.map((goal) => {
            const isCompleted = goal.status === 'completed';
            const isExpanded = expandedGoalId === goal.id;

            return (
              <div
                key={goal.id}
                className={`rounded-2xl border p-5 flex flex-col transition-all ${
                  isCompleted
                    ? 'bg-emerald-950/5 border-emerald-900/20 opacity-80'
                    : 'bg-[#0f1420] border-white/[0.06] hover:border-violet-900/30'
                }`}
              >
                {/* Top row: category + XP */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#475569] bg-white/[0.04] px-2 py-0.5 rounded-lg">
                      {goal.category}
                    </span>
                    <span className="text-[10px] text-[#334155] font-mono">{typeLabel(goal.type)}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-violet-400">+{goal.xpReward} XP</span>
                </div>

                {/* Title */}
                <h3 className={`text-base font-bold mb-1 ${isCompleted ? 'line-through text-[#475569]' : 'text-white'}`}>
                  {goal.name}
                </h3>

                {/* Deadline */}
                <div className="flex items-center gap-1.5 text-[11px] text-[#334155] font-mono mb-3">
                  <Calendar className="w-3 h-3" />
                  {goal.deadline}
                  <span className="mr-auto text-[#475569]">
                    {goal.status === 'completed' ? 'مكتمل'
                      : goal.status === 'in_progress' ? 'جارٍ'
                      : goal.status === 'paused' ? 'متوقف'
                      : 'لم يبدأ'}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="xp-bar-track mb-1">
                  <div
                    className="h-full rounded-full bg-violet-600 transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#334155] font-mono mb-3">{goal.progress}%</div>

                {/* Expand toggle */}
                <button
                  type="button"
                  onClick={() => setExpandedGoalId(isExpanded ? null : goal.id)}
                  className="text-[11px] text-[#475569] hover:text-violet-400 font-mono mb-3 text-right transition-colors"
                >
                  {isExpanded ? '▲ إخفاء التفاصيل' : '▼ التفاصيل والخطوة القادمة'}
                </button>

                {isExpanded && (
                  <div className="space-y-2.5 mb-3">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <span className="text-[10px] font-mono uppercase text-[#475569] font-bold block mb-1">لماذا هذا الهدف؟</span>
                      <p className="text-xs text-[#94a3b8] italic leading-relaxed">«{goal.whyItMatters}»</p>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <ArrowLeft className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[#475569] block font-semibold">الخطوة القادمة</span>
                        <span className="text-[#cbd5e1]">{goal.nextAction}</span>
                      </div>
                    </div>
                    {!isCompleted && (
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#475569] mb-1">تحديث التقدم</label>
                        <input
                          type="range" min="0" max="100"
                          value={goal.progress}
                          onChange={(e) => updateGoalProgress(goal.id, Number(e.target.value))}
                          className="w-full accent-violet-500"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-white/[0.05]">
                  {!isCompleted ? (
                    <button
                      type="button"
                      onClick={() => completeGoal(goal.id)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-all active:scale-95"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      تحديد كمكتمل
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-500 font-bold flex items-center gap-1.5 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {goal.completedAt}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteGoal(goal.id)}
                    className="p-1.5 text-[#334155] hover:text-rose-500 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ══ ADD MODAL ══ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0f1420] border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/60 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black text-white">هدف جديد</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/[0.05] text-[#64748b] hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">اسم الهدف</label>
                <input type="text" required
                  placeholder="إطلاق مشروع رقمي، تعلم مهارة..."
                  value={newGoalName}
                  onChange={(e) => setNewGoalName(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#334155] focus:outline-none focus:border-violet-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">المدى الزمني</label>
                  <select value={newGoalType} onChange={(e) => setNewGoalType(e.target.value as GoalType)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50">
                    <option value="short-term">قصير (أيام / أسابيع)</option>
                    <option value="mid-term">متوسط (1–3 أشهر)</option>
                    <option value="long-term">بعيد (6–12+ شهر)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">التصنيف</label>
                  <select value={newGoalCategory} onChange={(e) => setNewGoalCategory(e.target.value as GoalCategory)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50">
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">الموعد المستهدف</label>
                  <input type="date" value={newGoalDeadline} onChange={(e) => setNewGoalDeadline(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50 font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">مكافأة XP</label>
                  <select value={newGoalXp} onChange={(e) => setNewGoalXp(Number(e.target.value))}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50 font-mono">
                    <option value={100}>100 XP</option>
                    <option value={200}>200 XP</option>
                    <option value={300}>300 XP</option>
                    <option value={500}>500 XP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">لماذا هذا الهدف مهم؟</label>
                <textarea rows={2} required
                  placeholder="كيف يرتبط هذا بهويتك ومستقبلك؟"
                  value={newGoalWhy}
                  onChange={(e) => setNewGoalWhy(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#334155] focus:outline-none focus:border-violet-500/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">أول خطوة عملية</label>
                <input type="text" required
                  placeholder="ما هي الخطوة الأولى الملموسة؟"
                  value={newGoalNext}
                  onChange={(e) => setNewGoalNext(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#334155] focus:outline-none focus:border-violet-500/50"
                />
              </div>

              <button type="submit"
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95">
                <Sparkles className="w-4 h-4" />
                تفعيل الهدف
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
