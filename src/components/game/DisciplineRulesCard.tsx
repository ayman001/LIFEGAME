'use client';

import React from 'react';
import { Shield, Check, X, Flame } from 'lucide-react';
import { DisciplineRule } from '@/types';
import { sound } from '@/lib/sound';

interface Props {
  rules: DisciplineRule[];
  onResist: (ruleId: string) => void;
  onBreak: (ruleId: string) => void;
}

export default function DisciplineRulesCard({ rules, onResist, onBreak }: Props) {
  const handleResist = (id: string) => {
    sound.playXpGain();
    onResist(id);
  };

  const handleBreak = (id: string) => {
    sound.playMissedTask();
    onBreak(id);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#0d121c] p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-white">قواعد الانضباط — NOT DO</h3>
            <p className="text-xs text-slate-400">تحديات سلبية لحماية تركيزك وطاقتك</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {rules.map((rule) => {
          const isResisted = rule.statusToday === 'resisted';
          const isBroken = rule.statusToday === 'broken';

          return (
            <div
              key={rule.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                isResisted
                  ? 'border-emerald-500/40 bg-emerald-950/20'
                  : isBroken
                  ? 'border-rose-500/40 bg-rose-950/20'
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{rule.title}</span>
                  {rule.streakDays > 0 && (
                    <span className="text-xs text-amber-400 font-black flex items-center gap-0.5 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      <Flame className="w-3 h-3" />
                      {rule.streakDays} أيام
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  المكافأة: <span className="text-emerald-400 font-bold">+{rule.rewardXP} XP</span> عند الثبات
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {rule.statusToday === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleResist(rule.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      قاومت (+5 XP)
                    </button>
                    <button
                      onClick={() => handleBreak(rule.id)}
                      className="px-3 py-1.5 rounded-xl bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/30 text-rose-400 text-xs font-bold transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      انكسرت
                    </button>
                  </>
                ) : isResisted ? (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    تمت المقاومة بنجاح
                  </span>
                ) : (
                  <span className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 text-xs font-bold flex items-center gap-1">
                    <X className="w-3.5 h-3.5" />
                    انكسرت — ابدأ من جديد
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
