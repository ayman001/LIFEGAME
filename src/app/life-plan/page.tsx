'use client';

import React, { useState, useEffect } from 'react';
import { useRPG } from '@/context/RPGContext';
import { LifePlanPriority } from '@/types';
import {
  Briefcase,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Calendar,
  X,
  Timer
} from 'lucide-react';

function formatRemainingTime(deadlinestr: string): { label: string; isUrgent: boolean; isOverdue: boolean } {
  const diff = new Date(deadlinestr).getTime() - Date.now();
  if (diff <= 0) {
    const overdueMinutes = Math.floor(Math.abs(diff) / 60000);
    if (overdueMinutes < 60) return { label: `فات الموعد منذ ${overdueMinutes} دقيقة`, isUrgent: true, isOverdue: true };
    const overdueHours = Math.floor(overdueMinutes / 60);
    if (overdueHours < 24) return { label: `فات الموعد منذ ${overdueHours} ساعة`, isUrgent: true, isOverdue: true };
    const overdueDays = Math.floor(overdueHours / 24);
    return { label: `فات الموعد منذ ${overdueDays} يوم`, isUrgent: true, isOverdue: true };
  }

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    const remHours = hours % 24;
    return { label: `متبقي ${days} يوم و ${remHours} ساعة`, isUrgent: false, isOverdue: false };
  }
  if (hours > 0) {
    const remMins = minutes % 60;
    return { label: `متبقي ${hours} ساعة و ${remMins} دقيقة`, isUrgent: hours < 4, isOverdue: false };
  }
  return { label: `متبقي ${minutes} دقيقة فقط!`, isUrgent: true, isOverdue: false };
}

export default function LifePlanPage() {
  const { lifePlanTasks, addLifePlanTask, completeLifePlanTask, deleteLifePlanTask } = useRPG();
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'completed' | 'overdue'>('pending');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Live timer tick every 30s to re-render countdowns accurately
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(timer);
  }, []);

  // Form State
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('ELITDIGI');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<LifePlanPriority>('high');
  const [xpReward, setXpReward] = useState(35);
  const [penaltyXP, setPenaltyXP] = useState(25);
  const [notes, setNotes] = useState('');

  const handlePriorityChange = (p: LifePlanPriority) => {
    setPriority(p);
    if (p === 'critical') {
      setXpReward(50);
      setPenaltyXP(35);
    } else if (p === 'high') {
      setXpReward(35);
      setPenaltyXP(25);
    } else {
      setXpReward(20);
      setPenaltyXP(15);
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Default deadline: tomorrow at 18:00 if not chosen
    let targetDeadline = deadline;
    if (!targetDeadline) {
      const tomorrow = new Date(Date.now() + 24 * 3600 * 1000);
      tomorrow.setHours(18, 0, 0, 0);
      targetDeadline = tomorrow.toISOString().slice(0, 16);
    }

    addLifePlanTask({
      title: title.trim(),
      project: project.trim() || 'عام',
      deadline: targetDeadline,
      priority,
      xpReward,
      penaltyXP,
      notes: notes.trim()
    });

    setTitle('');
    setNotes('');
    setDeadline('');
    setIsAddModalOpen(false);
  };

  // Stats calculation
  const pendingCount = lifePlanTasks.filter((t) => t.status === 'pending').length;
  const completedCount = lifePlanTasks.filter((t) => t.status === 'completed').length;
  const overdueCount = lifePlanTasks.filter((t) => t.status === 'overdue').length;

  const filteredTasks = lifePlanTasks.filter((t) => {
    if (selectedTab === 'all') return true;
    return t.status === selectedTab;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="w-5 h-5 text-purple-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
              مشاريع العمل والمواعيد النهائية الصارمة
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            خطة الحياة — LIFE PLAN
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            ضع هنا مهام عملك ومشاريعك ذات المواعيد المحددة. الإنجاز قبل الموعد يمنحك XP، وفوات الموعد يخصم منك XP فوراً!
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          type="button"
          className="self-start sm:self-auto px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مهمة عمل بموعد نهائي</span>
        </button>
      </div>

      {/* 2. Tactical Metrics Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-3xl bg-[#0e1320] border border-purple-500/20 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">قيد التنفيذ</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-white font-mono">
            {pendingCount}
          </div>
          <span className="text-[10px] text-purple-300/80 font-medium">سارية ومربوطة بموعد</span>
        </div>

        <div className="p-4 rounded-3xl bg-[#0e1320] border border-emerald-500/20 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">أُنجزت بنجاح</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
            {completedCount}
          </div>
          <span className="text-[10px] text-emerald-300/80 font-medium">حصدت مكافآت الـ XP</span>
        </div>

        <div className="p-4 rounded-3xl bg-[#0e1320] border border-red-500/20 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">فات موعدها</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-red-400 font-mono">
            {overdueCount}
          </div>
          <span className="text-[10px] text-red-300/80 font-medium">خُصم منها XP (-XP)</span>
        </div>
      </div>

      {/* 3. Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'pending', label: `قيد التنفيذ (${pendingCount})` },
          { id: 'all', label: `الكل (${lifePlanTasks.length})` },
          { id: 'completed', label: `المنجزة (${completedCount})` },
          { id: 'overdue', label: `الفائتة (${overdueCount})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 ${
              selectedTab === tab.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-[#0d121c] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Task List */}
      <div className="space-y-3.5">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#0d121c] border border-slate-800/80">
            <Briefcase className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-white">لا توجد مهام في هذا التصنيف</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              أضف مهام عملك ومشاريعك ذات المواعيد النهائية لتفعيل نظام الحافز والردع الصارم.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const timeInfo = formatRemainingTime(task.deadline);
            const isCompleted = task.status === 'completed';
            const isOverdue = task.status === 'overdue';

            return (
              <div
                key={task.id}
                className={`p-5 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
                  isCompleted
                    ? 'bg-emerald-950/10 border-emerald-500/30'
                    : isOverdue
                    ? 'bg-red-950/15 border-red-500/40'
                    : timeInfo.isUrgent
                    ? 'bg-amber-950/15 border-amber-500/40 shadow-lg shadow-amber-950/20'
                    : 'bg-[#0e1320] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Left Task Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Project Tag */}
                      <span className="px-2.5 py-0.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-[10px] font-mono font-bold">
                        {task.project}
                      </span>

                      {/* Priority Tag */}
                      <span
                        className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${
                          task.priority === 'critical'
                            ? 'bg-red-500/15 text-red-300 border-red-500/30'
                            : task.priority === 'high'
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                        }`}
                      >
                        {task.priority === 'critical' ? 'حرج للغاية' : task.priority === 'high' ? 'أولوية عالية' : 'أولوية متوسطة'}
                      </span>

                      {/* Countdown Badge */}
                      {!isCompleted && (
                        <span
                          className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold border ${
                            isOverdue
                              ? 'bg-red-500/20 text-red-300 border-red-500/40'
                              : timeInfo.isUrgent
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          <Timer className="w-3 h-3" />
                          <span>{timeInfo.label}</span>
                        </span>
                      )}

                      {/* Completed Badge */}
                      {isCompleted && (
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>أُنجزت بنجاح في موعدها</span>
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-base font-bold ${
                        isCompleted
                          ? 'line-through text-slate-400'
                          : isOverdue
                          ? 'text-red-200'
                          : 'text-white'
                      }`}
                    >
                      {task.title}
                    </h3>

                    {/* Notes if present */}
                    {task.notes && (
                      <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                        {task.notes}
                      </p>
                    )}

                    {/* Deadline text */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>الموعد النهائي: {new Date(task.deadline).toLocaleString('ar-MA', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                    </div>
                  </div>

                  {/* Right Stakes & Action */}
                  <div className="flex items-center gap-4 shrink-0 self-end md:self-center">
                    {/* Stakes Box */}
                    <div className="flex items-center gap-2 text-center font-mono">
                      <div className="px-3 py-1.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                        <span className="text-[9px] text-emerald-400 block font-bold">المكافأة</span>
                        <span className="text-xs font-black text-emerald-300">+{task.xpReward} XP</span>
                      </div>

                      <div className="px-3 py-1.5 rounded-xl bg-red-950/20 border border-red-500/30">
                        <span className="text-[9px] text-red-400 block font-bold">الغرامة</span>
                        <span className="text-xs font-black text-red-400">-{task.penaltyXP} XP</span>
                      </div>
                    </div>

                    {/* Completion / Status Button */}
                    {!isCompleted && !isOverdue && (
                      <button
                        onClick={() => completeLifePlanTask(task.id)}
                        type="button"
                        className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-900/30 transition-all active:scale-95"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>إتمام بنجاح</span>
                      </button>
                    )}

                    {isOverdue && (
                      <div className="px-3 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold font-mono">
                        تم خصم -{task.penaltyXP} XP
                      </div>
                    )}

                    {/* Delete button */}
                    <button
                      onClick={() => deleteLifePlanTask(task.id)}
                      type="button"
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-colors"
                      title="حذف المهمة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 5. Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0e1320] border border-slate-700 p-6 sm:p-7 shadow-2xl">
            
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 left-5 text-slate-400 hover:text-white p-1 rounded-xl bg-slate-800/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">إضافة مهمة لخطة الحياة</h3>
                <p className="text-xs text-slate-400">اربط عملك بموعد نهائي وعقوبة تسويف حقيقية.</p>
              </div>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              {/* Task Title */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  عنوان المهمة أو المخرج المطلوب
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: تسليم مراجعة الكود، إطلاق الحملة..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Project Name & Suggestions */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  المشروع / المجال
                </label>
                <input
                  type="text"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="ELITDIGI، برمجة، عمل حر..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
                <div className="flex items-center gap-1.5 mt-2">
                  {['ELITDIGI', 'برمجة', 'عمل حر', 'دراسة'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setProject(p)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-[10px] text-slate-300 hover:text-white font-mono"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deadline Date & Time */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  الموعد النهائي الصارم (Deadline)
                </label>
                <input
                  type="datetime-local"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Priority Select */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  مستوى الأهمية والرهان (Stakes)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'medium', label: 'متوسطة', xp: '+20 XP', pen: '-15 XP' },
                    { id: 'high', label: 'عالية', xp: '+35 XP', pen: '-25 XP' },
                    { id: 'critical', label: 'حرجة', xp: '+50 XP', pen: '-35 XP' }
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => handlePriorityChange(lvl.id as LifePlanPriority)}
                      className={`p-2 rounded-xl text-center border transition-all ${
                        priority === lvl.id
                          ? 'bg-purple-600/30 border-purple-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="text-xs font-bold">{lvl.label}</div>
                      <div className="text-[10px] text-emerald-400 font-mono mt-0.5">{lvl.xp}</div>
                      <div className="text-[10px] text-red-400 font-mono">{lvl.pen}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  ملاحظات أو تعريف الإنجاز (اختياري)
                </label>
                <textarea
                  rows={2}
                  placeholder="معايير نجاح المهمة..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs shadow-lg shadow-purple-500/25 transition-all mt-2"
              >
                تثبيت المهمة في خطة الحياة (+{xpReward} / -{penaltyXP} XP)
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
