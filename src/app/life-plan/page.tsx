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
    if (overdueMinutes < 60) return { label: `فات منذ ${overdueMinutes} دق`, isUrgent: true, isOverdue: true };
    const overdueHours = Math.floor(overdueMinutes / 60);
    if (overdueHours < 24) return { label: `فات منذ ${overdueHours} س`, isUrgent: true, isOverdue: true };
    const overdueDays = Math.floor(overdueHours / 24);
    return { label: `فات منذ ${overdueDays} يوم`, isUrgent: true, isOverdue: true };
  }
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return { label: `${days} يوم و ${hours % 24} ساعة`, isUrgent: false, isOverdue: false };
  }
  if (hours > 0) {
    return { label: `${hours} ساعة و ${minutes % 60} دق`, isUrgent: hours < 4, isOverdue: false };
  }
  return { label: `${minutes} دقيقة فقط!`, isUrgent: true, isOverdue: false };
}

export default function LifePlanPage() {
  const { lifePlanTasks, addLifePlanTask, completeLifePlanTask, deleteLifePlanTask } = useRPG();
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'completed' | 'overdue'>('pending');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(timer);
  }, []);

  const [title, setTitle] = useState('');
  const [project, setProject] = useState('ELITDIGI');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<LifePlanPriority>('high');
  const [xpReward, setXpReward] = useState(35);
  const [penaltyXP, setPenaltyXP] = useState(25);
  const [notes, setNotes] = useState('');

  const handlePriorityChange = (p: LifePlanPriority) => {
    setPriority(p);
    if (p === 'critical') { setXpReward(50); setPenaltyXP(35); }
    else if (p === 'high') { setXpReward(35); setPenaltyXP(25); }
    else { setXpReward(20); setPenaltyXP(15); }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    let targetDeadline = deadline;
    if (!targetDeadline) {
      const tomorrow = new Date(Date.now() + 24 * 3600 * 1000);
      tomorrow.setHours(18, 0, 0, 0);
      targetDeadline = tomorrow.toISOString().slice(0, 16);
    }
    addLifePlanTask({ title: title.trim(), project: project.trim() || 'عام', deadline: targetDeadline, priority, xpReward, penaltyXP, notes: notes.trim() });
    setTitle(''); setNotes(''); setDeadline(''); setIsAddModalOpen(false);
  };

  const pendingCount = lifePlanTasks.filter((t) => t.status === 'pending').length;
  const completedCount = lifePlanTasks.filter((t) => t.status === 'completed').length;
  const overdueCount = lifePlanTasks.filter((t) => t.status === 'overdue').length;

  const filteredTasks = lifePlanTasks.filter((t) => {
    if (selectedTab === 'all') return true;
    return t.status === selectedTab;
  });

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-10">

      {/* ══ HEADER ══ */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="section-label mb-2 flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5" />
            مشاريع العمل والمواعيد النهائية
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">خطة الحياة</h1>
          <p className="text-sm text-[#475569] mt-1">
            الإنجاز قبل الموعد = +XP · الفوات = −XP فوراً
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          type="button"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-lg shadow-violet-900/30 transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          إضافة
        </button>
      </div>

      {/* ══ STATS ROW ══ */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'جارية', count: pendingCount, color: 'text-violet-400', icon: Clock },
          { label: 'مكتملة', count: completedCount, color: 'text-emerald-400', icon: CheckCircle2 },
          { label: 'فائتة', count: overdueCount, color: 'text-red-400', icon: AlertTriangle },
        ].map(({ label, count, color, icon: Icon }) => (
          <div key={label} className="p-4 rounded-xl bg-[#0f1420] border border-white/[0.05] flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#475569] font-medium">{label}</span>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <span className={`text-2xl font-black font-mono ${color}`}>{count}</span>
          </div>
        ))}
      </div>

      {/* ══ FILTER TABS ══ */}
      <div className="flex items-center gap-2">
        {[
          { id: 'pending',   label: `جارية (${pendingCount})` },
          { id: 'all',       label: `الكل (${lifePlanTasks.length})` },
          { id: 'completed', label: `مكتملة (${completedCount})` },
          { id: 'overdue',   label: `فائتة (${overdueCount})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedTab === tab.id
                ? 'bg-violet-600 text-white'
                : 'bg-[#0f1420] text-[#64748b] hover:text-white border border-white/[0.05]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ══ TASK LIST ══ */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0f1420] border border-white/[0.06]">
            <Briefcase className="w-10 h-10 text-[#334155] mx-auto mb-3" />
            <h3 className="text-sm font-bold text-white">لا توجد مهام في هذا التصنيف</h3>
            <p className="text-xs text-[#475569] mt-1 max-w-sm mx-auto">
              أضف مهام عملك بمواعيد نهائية لتفعيل نظام المكافأة والردع.
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
                className={`p-5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-950/5 border-emerald-900/20 opacity-70'
                    : isOverdue
                    ? 'bg-red-950/10 border-red-900/30'
                    : timeInfo.isUrgent
                    ? 'bg-amber-950/10 border-amber-900/30'
                    : 'bg-[#0f1420] border-white/[0.06] hover:border-white/[0.1]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Left: info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#475569] bg-white/[0.04] px-2 py-0.5 rounded-lg">
                        {task.project}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                        task.priority === 'critical' ? 'text-red-400 bg-red-950/20' :
                        task.priority === 'high'     ? 'text-amber-400 bg-amber-950/20' :
                                                       'text-blue-400 bg-blue-950/20'
                      }`}>
                        {task.priority === 'critical' ? 'حرج' : task.priority === 'high' ? 'عالي' : 'متوسط'}
                      </span>
                      {!isCompleted && (
                        <span className={`flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg ${
                          isOverdue        ? 'text-red-400 bg-red-950/20' :
                          timeInfo.isUrgent ? 'text-amber-400 bg-amber-950/20 animate-pulse' :
                                             'text-[#475569] bg-white/[0.04]'
                        }`}>
                          <Timer className="w-3 h-3" />
                          {timeInfo.label}
                        </span>
                      )}
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                          <CheckCircle2 className="w-3 h-3" /> أُنجزت
                        </span>
                      )}
                    </div>

                    <h3 className={`text-base font-bold ${
                      isCompleted ? 'line-through text-[#475569]' : isOverdue ? 'text-red-200' : 'text-white'
                    }`}>
                      {task.title}
                    </h3>

                    {task.notes && (
                      <p className="text-xs text-[#475569] leading-relaxed">{task.notes}</p>
                    )}

                    <div className="flex items-center gap-1.5 text-[11px] text-[#334155] font-mono">
                      <Calendar className="w-3 h-3" />
                      {new Date(task.deadline).toLocaleString('ar-MA', { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                  </div>

                  {/* Right: stakes + action */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex gap-2 font-mono text-center">
                      <div className="px-2.5 py-1.5 rounded-xl bg-emerald-950/20 border border-emerald-900/20">
                        <div className="text-[9px] text-emerald-500 font-bold">مكافأة</div>
                        <div className="text-xs font-black text-emerald-400">+{task.xpReward}</div>
                      </div>
                      <div className="px-2.5 py-1.5 rounded-xl bg-red-950/20 border border-red-900/20">
                        <div className="text-[9px] text-red-500 font-bold">غرامة</div>
                        <div className="text-xs font-black text-red-400">−{task.penaltyXP}</div>
                      </div>
                    </div>

                    {!isCompleted && !isOverdue && (
                      <button
                        onClick={() => completeLifePlanTask(task.id)}
                        type="button"
                        className="py-2 px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        إتمام
                      </button>
                    )}

                    {isOverdue && (
                      <div className="px-3 py-2 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-xs font-bold font-mono">
                        −{task.penaltyXP} XP
                      </div>
                    )}

                    <button
                      onClick={() => deleteLifePlanTask(task.id)}
                      type="button"
                      className="p-2 text-[#334155] hover:text-red-400 rounded-xl transition-colors"
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

      {/* ══ ADD MODAL ══ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-[#0f1420] border border-white/[0.08] p-6 shadow-2xl shadow-black/60">
            
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black text-white">مهمة بموعد نهائي</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/[0.05] text-[#64748b] hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">عنوان المهمة</label>
                <input
                  type="text" required
                  placeholder="تسليم مراجعة الكود، إطلاق الحملة..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#334155] focus:outline-none focus:border-violet-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">المشروع</label>
                <input
                  type="text"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="ELITDIGI، برمجة..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#334155] focus:outline-none focus:border-violet-500/50"
                />
                <div className="flex gap-1.5 mt-2">
                  {['ELITDIGI', 'برمجة', 'عمل حر', 'دراسة'].map((p) => (
                    <button key={p} type="button" onClick={() => setProject(p)}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-[10px] text-[#64748b] hover:text-white font-mono transition-colors">
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">الموعد النهائي</label>
                <input
                  type="datetime-local" required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-violet-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">مستوى الأهمية</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'medium', label: 'متوسطة', xp: '+20', pen: '−15' },
                    { id: 'high',   label: 'عالية',  xp: '+35', pen: '−25' },
                    { id: 'critical', label: 'حرجة', xp: '+50', pen: '−35' },
                  ].map((lvl) => (
                    <button
                      key={lvl.id} type="button"
                      onClick={() => handlePriorityChange(lvl.id as LifePlanPriority)}
                      className={`p-2.5 rounded-xl text-center border transition-all ${
                        priority === lvl.id
                          ? 'bg-violet-600/20 border-violet-500/50 text-white'
                          : 'bg-white/[0.04] border-white/[0.06] text-[#64748b]'
                      }`}
                    >
                      <div className="text-xs font-bold">{lvl.label}</div>
                      <div className="text-[10px] text-emerald-400 font-mono mt-0.5">{lvl.xp} XP</div>
                      <div className="text-[10px] text-red-400 font-mono">{lvl.pen} XP</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">ملاحظات (اختياري)</label>
                <textarea rows={2}
                  placeholder="معايير نجاح المهمة..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#334155] focus:outline-none focus:border-violet-500/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all active:scale-95"
              >
                تثبيت في خطة الحياة (+{xpReward} / −{penaltyXP} XP)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
