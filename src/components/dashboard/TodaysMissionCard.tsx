'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import { Quest } from '@/types';
import {
  CheckCircle2,
  Circle,
  Sparkles,
  Coins,
  HeartPulse,
  Briefcase,
  Moon,
  MessageSquare,
  Undo2,
  Swords
} from 'lucide-react';

export default function TodaysMissionCard() {
  const { quests, completeQuest, uncompleteQuest, activityLogs } = useRPG();
  const [activeNotesQuestId, setActiveNotesQuestId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  // Find mission items
  const mainQuest = quests.find((q) => q.missionSlot === 'main') || quests[0];
  const daily1 = quests.find((q) => q.missionSlot === 'daily_1') || quests[1];
  const daily2 = quests.find((q) => q.missionSlot === 'daily_2') || quests[2];
  const daily3 = quests.find((q) => q.missionSlot === 'daily_3') || quests[3];
  const healthAction = quests.find((q) => q.missionSlot === 'health') || quests.find((q) => q.category === 'صحة' || q.category === 'Health') || quests[4];
  const workAction = quests.find((q) => q.missionSlot === 'work_learn') || quests.find((q) => q.category === 'عمل' || q.category === 'تعلّم' || q.category === 'Work' || q.category === 'Learning') || quests[5];
  const faithAction = quests.find((q) => q.missionSlot === 'faith_personal') || quests.find((q) => q.category === 'إيمان' || q.category === 'علاقات' || q.category === 'Faith' || q.category === 'Relationships') || quests[6];

  // Calculate today's totals
  const todayDateStr = new Date().toISOString().split('T')[0];
  const todayCompletedQuests = quests.filter((q) => q.status === 'completed' && q.date === todayDateStr);
  const moneySavedToday = todayCompletedQuests.reduce((acc, q) => acc + (q.moneySaved || 0), 0) +
    activityLogs
      .filter((a) => a.dateTime.includes('اليوم') || a.dateTime.includes('Today'))
      .reduce((acc, a) => acc + (a.moneySaved || 0), 0);

  const xpEarnedToday = todayCompletedQuests.reduce((acc, q) => acc + (q.xpEarned || 0), 0) +
    activityLogs
      .filter((a) => a.dateTime.includes('اليوم') || a.dateTime.includes('Today'))
      .reduce((acc, a) => acc + (a.xpEarned || 0), 0);

  const missionList = [
    { slotLabel: 'المهمة الأكثر أهمية', quest: mainQuest, icon: Swords, badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
    { slotLabel: 'المهمة اليومية 1', quest: daily1, icon: Sparkles, badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
    { slotLabel: 'المهمة اليومية 2', quest: daily2, icon: Sparkles, badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
    { slotLabel: 'المهمة اليومية 3', quest: daily3, icon: Sparkles, badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
    { slotLabel: 'مهمة الصحة والبدن', quest: healthAction, icon: HeartPulse, badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    { slotLabel: 'مهمة العمل أو التعلّم', quest: workAction, icon: Briefcase, badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' },
    { slotLabel: 'مهمة الإيمان والروح', quest: faithAction, icon: Moon, badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  ];

  const handleToggle = (quest?: Quest) => {
    if (!quest) return;
    if (quest.status === 'completed') {
      if (window.confirm(`هل تريد التراجع عن إكمال "${quest.name}"؟ سيتم خصم نقاط XP المكتسبة بدقة.`)) {
        uncompleteQuest(quest.id);
      }
    } else {
      completeQuest(quest.id);
    }
  };

  const handleSaveNotes = (questId: string) => {
    completeQuest(questId, noteText);
    setActiveNotesQuestId(null);
    setNoteText('');
  };

  return (
    <div className="rounded-3xl bg-[#0d131f] border border-slate-800/80 p-5 sm:p-7 shadow-xl">
      
      {/* Header with Title & Today's Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              التوجيه والمهام الرئيسية
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            مهمة اليوم
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            أكمل أهدافك اليومية مباشرة من لوحة التحكم بنقرة واحدة.
          </p>
        </div>

        {/* Live Counters: Money & XP Earned Today */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-2">
            <Coins className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] text-emerald-300/80 font-bold uppercase">المدخرات اليوم</div>
              <div className="text-sm font-black text-emerald-400 font-mono">+{moneySavedToday} درهم</div>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-[10px] text-purple-300/80 font-bold uppercase">XP المكتسب اليوم</div>
              <div className="text-sm font-black text-purple-400 font-mono">+{xpEarnedToday} XP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Items List */}
      <div className="mt-5 space-y-3">
        {missionList.map((slot, index) => {
          if (!slot.quest) return null;
          const isCompleted = slot.quest.status === 'completed';
          const isMain = index === 0;

          return (
            <div
              key={slot.slotLabel}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                isCompleted
                  ? 'bg-emerald-950/10 border-emerald-500/30 opacity-80'
                  : isMain
                  ? 'bg-gradient-to-l from-purple-950/30 via-slate-900 to-slate-900 border-purple-500/40 shadow-md shadow-purple-950/20'
                  : 'bg-slate-900/40 hover:bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start sm:items-center justify-between gap-3">
                
                {/* Checkbox Trigger */}
                <button
                  type="button"
                  onClick={() => handleToggle(slot.quest)}
                  className="mt-0.5 sm:mt-0 text-slate-400 hover:text-emerald-400 transition-transform active:scale-90"
                  title={isCompleted ? 'انقر للتراجع' : 'تحديد كمكتمل'}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-500/20" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-500 hover:text-purple-400" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${slot.badgeColor}`}>
                      {slot.slotLabel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {slot.quest.category}
                    </span>
                    {slot.quest.difficulty && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        • {slot.quest.difficulty}
                      </span>
                    )}
                    {isCompleted && slot.quest.completedAt && (
                      <span className="text-[10px] text-emerald-400 font-bold">
                        • أُنجزت في {slot.quest.completedAt}
                      </span>
                    )}
                  </div>

                  <p className={`text-sm font-bold tracking-tight ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                    {slot.quest.name}
                  </p>

                  {/* Note / details if exists */}
                  {slot.quest.notes && (
                    <p className="text-xs text-slate-400 mt-1 italic line-clamp-1">
                      «{slot.quest.notes}»
                    </p>
                  )}
                </div>

                {/* Left (In RTL): XP Reward & Note toggle */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xl border ${
                    isCompleted
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-purple-300 border-slate-700'
                  }`}>
                    +{slot.quest.xpReward} XP
                  </span>

                  {!isCompleted && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveNotesQuestId(activeNotesQuestId === slot.quest?.id ? null : slot.quest?.id || null);
                        setNoteText(slot.quest?.notes || '');
                      }}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                      title="إضافة تفاصيل ماذا فعلت"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  )}

                  {isCompleted && (
                    <button
                      type="button"
                      onClick={() => handleToggle(slot.quest)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                      title="التراجع عن الإكمال"
                    >
                      <Undo2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>

              {/* Inline Notes Field when toggled */}
              {activeNotesQuestId === slot.quest.id && !isCompleted && (
                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="ماذا أنجزت بالتفصيل؟ (مثال: مشيت 30 دقيقة في الحديقة، أتممت الوحدة البرمجية)..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveNotes(slot.quest!.id)}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all"
                  >
                    إتمام مع الملاحظة
                  </button>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
