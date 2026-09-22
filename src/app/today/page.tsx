'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import { TaskPriority } from '@/types';
import {
  CalendarCheck,
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
  X,
  Moon
} from 'lucide-react';

export default function TodayPage() {
  const { todayTasks, toggleTask, addTask, deleteTask, simulateMidnightCycle } = useRPG();
  const [filterMode, setFilterMode] = useState<'pending' | 'all'>('pending');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Important');
  const [category, setCategory] = useState('Work');

  const todayDateStr = new Date().toISOString().split('T')[0];

  const filteredTasks = todayTasks.filter((t) => {
    if (filterMode === 'pending') return !t.completed;
    return true;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    addTask({ task: taskName.trim(), priority, category, dueDate: todayDateStr });
    setTaskName('');
    setIsAddModalOpen(false);
  };

  const completedCount = todayTasks.filter((t) => t.completed).length;
  const totalCount = todayTasks.length;

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-10">

      {/* ══ HEADER ══ */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="section-label mb-2 flex items-center gap-2">
            <CalendarCheck className="w-3.5 h-3.5" />
            مهام اليوم الإلزامية
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            تركيز اليوم
          </h1>
          <p className="text-sm text-[#475569] mt-1">
            {completedCount} من {totalCount} مكتملة
            {totalCount > 0 && (
              <span className="text-[#334155]"> — {Math.round((completedCount / totalCount) * 100)}%</span>
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-lg shadow-violet-900/30 transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          إضافة
        </button>
      </div>

      {/* ══ PROGRESS BAR ══ */}
      {totalCount > 0 && (
        <div className="xp-bar-track">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-700"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      )}

      {/* ══ FILTER + MIDNIGHT ══ */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center bg-[#0f1420] border border-white/[0.05] p-0.5 rounded-xl">
          <button
            onClick={() => setFilterMode('pending')}
            className={`px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all ${
              filterMode === 'pending'
                ? 'bg-violet-600 text-white'
                : 'text-[#64748b] hover:text-white'
            }`}
          >
            قيد الإنجاز
          </button>
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all ${
              filterMode === 'all'
                ? 'bg-violet-600 text-white'
                : 'text-[#64748b] hover:text-white'
            }`}
          >
            جميع المهام
          </button>
        </div>

        <button
          onClick={simulateMidnightCycle}
          type="button"
          title="محاكاة مرور منتصف الليل"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0f1420] border border-white/[0.05] hover:border-red-900/50 text-[#64748b] hover:text-red-400 text-xs font-mono font-bold transition-all"
        >
          <Moon className="w-3.5 h-3.5" />
          محاكاة الليل
        </button>
      </div>

      {/* ══ MIDNIGHT RULE — compact ══ */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-950/10 border border-red-900/30">
        <Moon className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
        <p className="text-xs text-[#94a3b8] leading-relaxed">
          هذه المهام إلزامية يومياً. إذا لم تُنجز قبل منتصف الليل، 
          <strong className="text-red-400"> تختفي ويُخصم منك XP وتتصفر السلسلة</strong>، ثم تتجدد لليوم الجديد.
        </p>
      </div>

      {/* ══ TASK LIST ══ */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="rounded-2xl bg-[#0f1420] border border-white/[0.06] p-12 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">
              {filterMode === 'pending' ? 'أتممت جميع مهام اليوم!' : 'لا توجد مهام مسجلة'}
            </h3>
            <p className="text-sm text-[#475569] mt-1">
              {filterMode === 'pending'
                ? 'إنجاز استثنائي — غيّر إلى "جميع المهام" للمراجعة.'
                : 'أضف مهمة لبدء بناء الزخم.'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                task.completed
                  ? 'border-transparent opacity-50'
                  : 'bg-[#0f1420] border-white/[0.06] hover:border-violet-900/40 hover:bg-violet-950/10'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                className="shrink-0 transition-transform active:scale-90"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                ) : (
                  <Circle className="w-6 h-6 text-[#334155] hover:text-violet-400 transition-colors" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <span className={`text-sm font-semibold block truncate ${
                  task.completed ? 'line-through text-[#475569]' : 'text-[#e2e8f0]'
                }`}>
                  {task.task}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-[#334155] font-mono">{task.category}</span>
                  {!task.completed && task.penaltyXP && (
                    <span className="text-[10px] text-red-500/70 font-mono">−{task.penaltyXP} عند الفوات</span>
                  )}
                  {task.completed && task.completedAt && (
                    <span className="text-[10px] text-emerald-600 font-mono">أُنجزت {task.completedAt}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-bold font-mono ${
                  task.completed ? 'text-emerald-600' : 'text-[#475569]'
                }`}>
                  +{task.xpReward}
                </span>
                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="p-1.5 text-[#334155] hover:text-rose-500 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ══ ADD TASK MODAL ══ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0f1420] border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/50">
            
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black text-white">إضافة مهمة يومية</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/[0.05] text-[#64748b] hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">
                  وصف المهمة
                </label>
                <input
                  type="text"
                  placeholder="مثال: جلسة عمل عميق، تمرين رياضي..."
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#334155] focus:outline-none focus:border-violet-500/50 transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">
                    الأولوية
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50 font-mono"
                  >
                    <option value="Important">رئيسية (+15 XP)</option>
                    <option value="Normal">عادية (+10 XP)</option>
                    <option value="Easy">بسيطة (+5 XP)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">
                    المجال
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50"
                  >
                    <option value="عمل">عمل</option>
                    <option value="صحة">صحة</option>
                    <option value="إيمان">إيمان</option>
                    <option value="تعلّم">تعلّم</option>
                    <option value="مال">مال</option>
                    <option value="عقل">عقل</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all active:scale-95"
              >
                إضافة إلى تركيز اليوم
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
