'use client';

import React from 'react';
import { Check, Sparkles, Flag } from 'lucide-react';
import { ProgressNode } from '@/types';

interface Props {
  nodes?: ProgressNode[];
  streakDays: number;
}

export default function ProgressRoadmap({ nodes, streakDays }: Props) {
  // Generate 7-day progression roadmap reflecting actual player streak
  const roadmapNodes: ProgressNode[] =
    nodes && nodes.length > 0
      ? nodes
      : Array.from({ length: 7 }, (_, i) => {
          const dayNum = i + 1;
          const isCompleted = streakDays >= dayNum;
          const isCurrent = streakDays === dayNum - 1;
          return {
            day: dayNum,
            label: `اليوم ${dayNum}`,
            status: isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming',
            xpEarned: isCompleted ? 50 : 0,
            dateStr: dayNum === 1 ? 'البداية' : isCurrent ? 'اليوم' : `محطة ${dayNum}`
          };
        });


  return (
    <div className="rounded-3xl border border-slate-800 bg-[#0d131f] p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div>
          <span className="text-xs font-black text-purple-400 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
            JOURNEY ROADMAP — خريطة التقدم
          </span>
          <h3 className="text-xl font-black text-white mt-2">
            مسار رحلتك في بناء الانضباط
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            كل يوم تجتازه هو محطة جديدة في رحلتك الشخصية نحو القمة.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold text-xs flex items-center gap-1.5 self-end sm:self-auto">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>سلسلة حالية: {streakDays} أيام</span>
        </div>
      </div>

      {/* Visual Path Grid */}
      <div className="relative py-6 overflow-x-auto">
        <div className="min-w-[640px] flex items-center justify-between relative px-4">
          {/* Background Connecting Line */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-slate-800 -z-0" />

          {roadmapNodes.map((node, idx) => {
            const isCompleted = node.status === 'completed';
            const isCurrent = node.status === 'current';

            return (

              <div key={idx} className="relative z-10 flex flex-col items-center group">
                {/* Day Label Top */}
                <span className="text-[11px] font-bold text-slate-400 mb-2">
                  {node.label}
                </span>

                {/* Node Circle */}
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/30 scale-100'
                      : isCurrent
                      ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black shadow-xl shadow-purple-500/40 ring-4 ring-purple-500/20 scale-110 animate-pulse'
                      : 'bg-slate-900 border border-slate-700 text-slate-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[3]" />
                  ) : isCurrent ? (
                    <span className="text-xs font-black">اليوم</span>
                  ) : (
                    <Flag className="w-4 h-4 text-slate-600" />
                  )}
                </div>

                {/* Tagline / XP bottom */}
                <div className="mt-2 text-center">
                  <span
                    className={`text-[10px] font-bold block ${
                      isCompleted
                        ? 'text-emerald-400'
                        : isCurrent
                        ? 'text-purple-300'
                        : 'text-slate-600'
                    }`}
                  >
                    {node.dateStr}
                  </span>
                  {isCompleted && (
                    <span className="text-[9px] text-slate-400">+{node.xpEarned} XP</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
