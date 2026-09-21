'use client';

import React, { useState } from 'react';
import { Dices, X, Sparkles, Clock, Check, RefreshCw } from 'lucide-react';
import { sound } from '@/lib/sound';
import { RandomMission } from '@/types';

const BORED_MISSIONS_POOL: RandomMission[] = [
  {
    id: 'bored-1',
    title: 'تنظيف وترتيب المكتب',
    description: 'خصّص 5 دقائق لتنظيم مساحة عملك وإزالة أي أوراق أو فوضى.',
    durationMinutes: 5,
    xpReward: 5,
    category: 'بيئة العمل'
  },
  {
    id: 'bored-2',
    title: 'كوب ماء + 15 تمرين ضغط',
    description: 'اشرب كأساً كاملاً من الماء ثم أنجز 15 تمرين ضغط لتنشيط الدورة الدموية.',
    durationMinutes: 3,
    xpReward: 5,
    category: 'صحة ولياقة'
  },
  {
    id: 'bored-3',
    title: 'قراءة 3 صفحات من كتاب',
    description: 'افتح أي كتاب غير روائي واقرأ 3 صفحات بتركيز عميق دون تشتت.',
    durationMinutes: 6,
    xpReward: 5,
    category: 'تعلّم'
  },
  {
    id: 'bored-4',
    title: 'تمارين إطالة للجسم والرقبة',
    description: 'قف وقم بتمارين إطالة للأكتاف، الرقبة، والظهر لإزالة التوتر العضلي.',
    durationMinutes: 5,
    xpReward: 5,
    category: 'صحة'
  },
  {
    id: 'bored-5',
    title: 'ترتيب السرير وتنظيم الغرفة',
    description: 'قم بترتيب سريرك فوراً واجعل غرفتك في أفضل حالاتها.',
    durationMinutes: 5,
    xpReward: 5,
    category: 'انضباط'
  },
  {
    id: 'bored-6',
    title: 'تنظيف صندوق البريد وحذف 10 رسائل',
    description: 'تخلص من الرسائل الترويجية غير المفيدة ونظف بريدك.',
    durationMinutes: 7,
    xpReward: 10,
    category: 'تنظيم'
  },
  {
    id: 'bored-7',
    title: 'كتابة 3 نعم أنت ممتن لها',
    description: 'سجّل في مذكرة سريعة 3 نعم حقيقية تحمد الله عليها في يومك.',
    durationMinutes: 4,
    xpReward: 5,
    category: 'إيمان وتطوير'
  },
  {
    id: 'bored-8',
    title: 'تحديد أهم أولويات الغد',
    description: 'دوّن أهم 3 مهام ترغب في حسمها غداً بوضوح تام.',
    durationMinutes: 5,
    xpReward: 10,
    category: 'تخطيط'
  }
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAcceptMission: (mission: RandomMission) => void;
}

export default function RandomMissionModal({ isOpen, onClose, onAcceptMission }: Props) {
  const [currentMission, setCurrentMission] = useState<RandomMission>(BORED_MISSIONS_POOL[0]);
  const [isRolling, setIsRolling] = useState(false);

  if (!isOpen) return null;

  const handleRoll = () => {
    setIsRolling(true);
    sound.playTaskComplete();

    setTimeout(() => {
      const remaining = BORED_MISSIONS_POOL.filter((m) => m.id !== currentMission.id);
      const randomPicked = remaining[Math.floor(Math.random() * remaining.length)];
      setCurrentMission(randomPicked);
      setIsRolling(false);
    }, 300);
  };

  const handleAccept = () => {
    sound.playXpGain();
    onAcceptMission(currentMission);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#151928] to-[#0a0d16] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-right overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-wider mb-4">
          <Dices className="w-4 h-4 text-purple-400" />
          <span>DO WHEN BORED — مهام الفراغ</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
          تشعر بالفراغ أو الرغبة في التشتت؟
        </h2>
        <p className="text-xs text-slate-300 mb-6">
          استبدل الدوبامين الرخيص بمهمة سريعة حقيقية تمنحك إنجازاً ملموساً ونقاط XP.
        </p>

        {/* Mission Card */}
        <div
          className={`p-5 rounded-2xl border border-slate-700/80 bg-slate-900/90 shadow-inner mb-6 transition-all duration-300 ${
            isRolling ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
              {currentMission.category}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {currentMission.durationMinutes} دقائق
              </span>
              <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                +{currentMission.xpReward} XP
              </span>
            </div>
          </div>

          <h3 className="text-lg font-black text-white mb-1.5">
            {currentMission.title}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentMission.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRoll}
            disabled={isRolling}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 active:scale-95 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-700"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRolling ? 'animate-spin' : ''}`} />
            مهمة أخرى
          </button>

          <button
            onClick={handleAccept}
            className="flex-[2] py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 text-white font-black text-xs tracking-wider shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            قبول المهمة فوراً
          </button>
        </div>
      </div>
    </div>
  );
}
