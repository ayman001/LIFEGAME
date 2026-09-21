'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import { TaskPriority } from '@/types';
import {
  CalendarCheck,
  Plus,
  CheckCircle2,
  Circle,
  Sparkles,
  Trash2,
  X,
  Moon
} from 'lucide-react';

export default function TodayPage() {
  const { todayTasks, toggleTask, addTask, deleteTask, simulateMidnightCycle } = useRPG();
  const [filterMode, setFilterMode] = useState<'pending' | 'all'>('pending');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New task form state
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Important');
  const [category, setCategory] = useState('Work');

  const todayDateStr = new Date().toISOString().split('T')[0];

  const filteredTasks = todayTasks.filter((t) => {
    if (filterMode === 'pending') {
      return !t.completed;
    }
    return true;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    addTask({
      task: taskName.trim(),
      priority,
      category,
      dueDate: todayDateStr
    });

    setTaskName('');
    setIsAddModalOpen(false);
  };

  const getPriorityBadge = (p: TaskPriority) => {
    switch (p) {
      case 'Important':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'Normal':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Easy':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CalendarCheck className="w-5 h-5 text-purple-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
              مصفوفة التنفيذ اليومي
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            مهام وتركيز اليوم
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            قائمة تركيز يومية فائقة الدقة. فقط المهام ذات الأولوية لليوم التي تصنع الفارق الحقيقي.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Mode Toggle */}
          <div className="flex items-center bg-[#0d131f] border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setFilterMode('pending')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                filterMode === 'pending'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              قيد الإنجاز
            </button>
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                filterMode === 'all'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              جميع المهام
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مهمة</span>
          </button>
        </div>
      </div>

      {/* Midnight Reckoning Rule Alert & Simulator */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-red-950/25 via-[#0d121c] to-amber-950/20 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                قانون انتصاف الليل والمهام المتكررة
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 font-bold border border-red-500/30">
                تتلاشى عند 00:00
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              هذه المهام إلزامية وتتكرر يومياً. إذا حل منتصف الليل ولم تُنجز، <strong className="text-red-400">تختفي ويُخصم منك XP (-XP) وتتصفر السلسلة</strong>، ثم تتجدد نظيفة لليوم الجديد!
            </p>
          </div>
        </div>

        <button
          onClick={simulateMidnightCycle}
          type="button"
          className="self-start sm:self-center px-3.5 py-2 rounded-xl bg-slate-900 border border-red-500/40 hover:bg-red-950/50 text-red-300 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shrink-0 active:scale-95"
          title="محاكاة فورية لمرور منتصف الليل واختبار خصم النقاط وتجدد المهام"
        >
          <Moon className="w-3.5 h-3.5 text-red-400" />
          <span>محاكاة انتصاف الليل</span>
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-12 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-200">
              {filterMode === 'pending' ? 'أتممت جميع مهام اليوم بنجاح!' : 'لا توجد مهام مسجلة حتى الآن'}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {filterMode === 'pending'
                ? 'تنفيذ استثنائي وانضباط عالٍ. بدّل إلى "جميع المهام" للمراجعة أو أضف أولوية جديدة.'
                : 'أضف مهمة ذات أولوية لليوم لبدء بناء الزخم الفوري.'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const priorityArabic = task.priority === 'Important' ? 'مهم' : task.priority === 'Normal' ? 'عادي' : 'بسيط';

            return (
              <div
                key={task.id}
                className={`rounded-2xl border p-4 transition-all flex items-center justify-between gap-3 ${
                  task.completed
                    ? 'bg-emerald-950/10 border-emerald-500/30 opacity-75'
                    : 'bg-[#0d131f] border-slate-800/80 hover:border-purple-500/30 shadow-md'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <button
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className="text-slate-500 hover:text-emerald-400 transition-transform active:scale-90 shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-600 hover:text-purple-400" />
                    )}
                  </button>

                  <div className="truncate">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${getPriorityBadge(task.priority)}`}>
                        {priorityArabic}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {task.category}
                      </span>
                      {!task.completed && (
                        <span className="text-[9px] font-mono px-2 py-0.2 rounded bg-red-500/10 text-red-300 border border-red-500/20">
                          -{task.penaltyXP || 10} XP عند الفوات
                        </span>
                      )}
                      {task.completed && task.completedAt && (
                        <span className="text-[10px] font-mono text-emerald-400">
                          • أُنجزت في {task.completedAt}
                        </span>
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm font-semibold tracking-tight block truncate ${task.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                      {task.task}
                    </span>
                  </div>
                </div>

                {/* Right: XP Reward & Delete */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xl border ${
                    task.completed
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-purple-300 border-slate-700'
                  }`}>
                    +{task.xpReward} XP
                  </span>

                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 text-slate-600 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="حذف المهمة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#0e121d] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/40">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                    مهمة يومية
                  </span>
                  <h3 className="text-lg font-black text-white">إضافة مهمة تركيز</h3>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  وصف المهمة
                </label>
                <input
                  type="text"
                  placeholder="مثال: إنهاء واجهة المشروع، جلسة عمل عميق..."
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    الأولوية ومكافأة XP
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  >
                    <option value="Important">مهمة رئيسية (+15 XP)</option>
                    <option value="Normal">مهمة عادية (+10 XP)</option>
                    <option value="Easy">مهمة بسيطة (+5 XP)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    المجال
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
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

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>إدراج في تركيز اليوم</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
