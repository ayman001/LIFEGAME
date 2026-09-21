'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import {
  History,
  Plus,
  Sparkles,
  Coins,
  Flame,
  Shield,
  Search,
  Filter,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function ActivityPage() {
  const { activityLogs, logActivity } = useRPG();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<'All' | 'player' | 'boss_award' | 'craving_resisted'>('All');

  // Quick log input state
  const [actionName, setActionName] = useState('');
  const [actionCategory, setActionCategory] = useState('Health');
  const [actionNotes, setActionNotes] = useState('');
  const [actionXP, setActionXP] = useState(10);
  const [actionSavedDH, setActionSavedDH] = useState('');

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSource = selectedSource === 'All' || log.source === selectedSource;
    const matchesSearch = log.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.notes && log.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSource && matchesSearch;
  });

  const handleQuickLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionName.trim()) return;

    logActivity(
      actionName.trim(),
      actionCategory,
      actionNotes.trim() || 'Logged direct real-world action.',
      actionXP,
      actionSavedDH ? parseFloat(actionSavedDH) : 0
    );

    setActionName('');
    setActionNotes('');
    setActionSavedDH('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <History className="w-5 h-5 text-purple-400" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
            سجل التدقيق التاريخي
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          سجل الأفعال والأنشطة
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          سجل موثق وصادق لكل ما أنجزته وقاومته وحققته في حياتك الواقعية دون تزييف.
        </p>
      </div>

      {/* Quick Action Logger Card */}
      <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4">
          <Plus className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            توثيق فعل واقعي فوري
          </h3>
        </div>

        <form onSubmit={handleQuickLog} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="ماذا أنجزت؟ (مثال: 'مشيت 30 دقيقة'، 'جلسة برمجة مركزة'، 'صليت في وقتها')..."
                value={actionName}
                onChange={(e) => setActionName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div>
              <select
                value={actionCategory}
                onChange={(e) => setActionCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="صحة">صحة</option>
                <option value="عمل">عمل</option>
                <option value="تعلّم">تعلّم</option>
                <option value="إيمان">إيمان</option>
                <option value="مال">مال</option>
                <option value="عقل">عقل</option>
                <option value="علاقات">علاقات</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="ملاحظات وسياق الفعل..."
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <input
                type="number"
                min="0"
                placeholder="مبلغ وفرته بالدرهم (إن وجد)..."
                value={actionSavedDH}
                onChange={(e) => setActionSavedDH(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md shadow-purple-500/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>توثيق في السجل</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="بحث في سجل الأفعال..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d131f] border border-slate-800 rounded-xl pr-10 pl-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-1 bg-[#0d131f] border border-slate-800 p-1 rounded-xl shrink-0 overflow-x-auto">
          {[
            { label: 'جميع الأفعال', value: 'All' },
            { label: 'أفعال اللاعب', value: 'player' },
            { label: 'مكافآت المشرف', value: 'boss_award' },
            { label: 'رغبات قاومتها', value: 'craving_resisted' }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedSource(tab.value as 'All' | 'player' | 'boss_award' | 'craving_resisted')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedSource === tab.value
                  ? 'bg-purple-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-2.5">
        {filteredLogs.map((log) => {
          const isBoss = log.source === 'boss_award';
          const isCraving = log.source === 'craving_resisted';

          return (
            <div
              key={log.id}
              className={`rounded-2xl border p-4 transition-all flex items-center justify-between gap-4 ${
                isBoss
                  ? 'bg-[#140e06]/60 border-amber-500/40'
                  : isCraving
                  ? 'bg-[#14090b]/60 border-rose-500/40'
                  : 'bg-[#0d131f] border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    isBoss
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : isCraving
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  }`}
                >
                  {isBoss ? (
                    <Shield className="w-5 h-5" />
                  ) : isCraving ? (
                    <Flame className="w-5 h-5" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5" />
                  )}
                </div>

                <div className="truncate">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                      {log.category}
                    </span>
                    {isBoss && (
                      <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20 font-bold">
                        مكافأة مشرف معتمدة
                      </span>
                    )}
                    {isCraving && (
                      <span className="text-[9px] font-mono text-rose-400 bg-rose-500/10 px-1.5 py-0.2 rounded border border-rose-500/20 font-bold">
                        مقاومة رغبة قهرية
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                    {log.name}
                  </h3>

                  {log.notes && (
                    <p className="text-[11px] text-slate-400 mt-0.5 italic truncate">
                      &quot;{log.notes}&quot;
                    </p>
                  )}
                </div>
              </div>

              <div className="text-left shrink-0">
                <div className="flex items-center justify-end gap-1.5">
                  {log.xpEarned > 0 && (
                    <span className="text-[11px] font-mono font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
                      +{log.xpEarned} XP
                    </span>
                  )}
                  {log.moneySaved > 0 && (
                    <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      +{log.moneySaved} درهم
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                  {log.dateTime}
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
