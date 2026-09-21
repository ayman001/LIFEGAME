'use client';

import React, { useState } from 'react';
import { Quest, TodayTask } from '@/types';
import { Check, Clock, Sparkles, Flame, ArrowLeft, Dices } from 'lucide-react';

import { sound } from '@/lib/sound';

interface CurrentMissionCardProps {
  currentMission: (Quest | TodayTask) | null;
  nextMission: (Quest | TodayTask) | null;
  onComplete: (missionId: string, isTask: boolean) => void;
  onOpenBoredModal?: () => void;
}

export default function CurrentMissionCard({
  currentMission,
  nextMission,
  onComplete,
  onOpenBoredModal
}: CurrentMissionCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = () => {
    if (!currentMission || isCompleting) return;

    setIsCompleting(true);
    sound.playTaskComplete();

    const isTask = 'task' in currentMission;
    const missionId = currentMission.id;

    setTimeout(() => {
      onComplete(missionId, isTask);
      setIsCompleting(false);
    }, 450);
  };

  if (!currentMission) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#0e171f] via-[#0b1218] to-[#080b11] p-8 sm:p-10 text-center shadow-2xl">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/20">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          ALL MISSIONS CONQUERED
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-2">
          لا توجد مهام معلّقة حالياً!
        </h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
          لقد أنجزت جميع المهام المجدولة لليوم. استمتع بوقتك أو احصل على مهمة سريعة وممتعة من قسم مهام الفراغ.
        </p>
        {onOpenBoredModal && (
          <button
            onClick={onOpenBoredModal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-200 font-bold text-sm transition-all active:scale-95 cursor-pointer shadow-lg shadow-purple-900/30"
          >
            <Dices className="w-4 h-4 text-purple-400" />
            أعطني مهمة عند الفراغ (+5 XP)
          </button>
        )}
      </div>
    );
  }

  const title = 'task' in currentMission ? currentMission.task : currentMission.name;
  const xpReward = currentMission.xpReward || 5;
  const category = currentMission.category || 'عام';
  const difficulty = 'difficulty' in currentMission ? currentMission.difficulty : 'easy';
  const timeSlot = 'timeSlot' in currentMission && currentMission.timeSlot ? currentMission.timeSlot : 'الآن';

  const nextTitle = nextMission
    ? 'task' in nextMission
      ? nextMission.task
      : nextMission.name
    : null;
  const nextXp = nextMission ? nextMission.xpReward || 5 : null;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border transition-all duration-300 ${
        isCompleting
          ? 'scale-[0.98] border-emerald-500/60 bg-[#0c1a17]'
          : 'border-purple-500/30 bg-gradient-to-b from-[#131929] via-[#0d131f] to-[#090d15] hover:border-purple-500/50 shadow-2xl shadow-purple-950/20'
      } p-6 sm:p-8`}
    >
      {/* Ambient background glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            CURRENT MISSION — المهمة الحالية
          </span>
          <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold">
            {category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-slate-400 text-xs font-medium bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{timeSlot}</span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-black flex items-center gap-1 shadow-sm shadow-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            +{xpReward} XP
          </div>
        </div>
      </div>

      {/* Hero Mission Title */}
      <div className="my-5">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
          {title}
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-slate-400">مستوى الصعوبة:</span>
          <span className="text-xs font-bold text-slate-300 capitalize">
            {difficulty === 'easy' ? 'سهل' : difficulty === 'medium' ? 'متوسط' : 'تحدي قوي'}
          </span>
        </div>
      </div>

      {/* Dominant 1-Tap Action Button */}
      <div className="mt-6 mb-4">
        <button
          onClick={handleComplete}
          disabled={isCompleting}
          className={`w-full py-4 sm:py-5 px-6 rounded-2xl font-black text-base sm:text-lg tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 shadow-xl ${
            isCompleting
              ? 'bg-emerald-500 text-slate-950 scale-95 shadow-emerald-500/40'
              : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.98] text-white shadow-purple-600/30'
          }`}
        >
          {isCompleting ? (
            <>
              <Check className="w-6 h-6 stroke-[3] animate-bounce" />
              <span>تم الإنجاز بنجاح! ✓</span>
            </>
          ) : (
            <>
              <Check className="w-6 h-6 stroke-[3]" />
              <span>إنجاز المهمة والحصول على +{xpReward} XP</span>
            </>
          )}
        </button>
      </div>

      {/* Continuous Next Mission Preview Transition */}
      {nextTitle && (
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-slate-500 uppercase">المهمة التالية:</span>
            <span className="text-slate-300 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {nextTitle}
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 font-bold shrink-0">
            <span>+{nextXp} XP</span>
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500 rtl:rotate-0" />
          </div>
        </div>
      )}
    </div>
  );
}
