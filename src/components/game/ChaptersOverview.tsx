'use client';

import React from 'react';
import { BookOpen, Lock, CheckCircle2 } from 'lucide-react';

import { Chapter } from '@/types';

interface Props {
  userLevel: number;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    number: '01',
    title: 'بناء الانضباط الأساسي',
    subtitle: 'Building Discipline',
    status: 'active',
    progress: 0,
    requiredLevel: 0,
    description: 'إيقاظ العادات اليومية الثابتة: الاستيقاظ المنظم، الصلاة في وقتها، وكسر الخمول.'
  },
  {
    id: 2,
    number: '02',
    title: 'ترسيخ الاستمرارية والالتزام',
    subtitle: 'Building Consistency',
    status: 'locked',
    progress: 0,
    requiredLevel: 5,
    description: 'الحفاظ على سلسلة الأيام المتتالية، مقاومة الإغراءات، وحماية صندوق الحرية المالية.'
  },

  {
    id: 3,
    number: '03',
    title: 'قوة التركيز والعمل العميق',
    subtitle: 'Building Focus',
    status: 'locked',
    progress: 0,
    requiredLevel: 10,
    description: 'إنجاز جلسات عمل مكثفة بدون هواتف أو مشتتات، وتحقيق قفزات نوعية في المشاريع الشخصية.'
  },
  {
    id: 4,
    number: '04',
    title: 'القوة البدنية والصلابة الذهنية',
    subtitle: 'Building Strength',
    status: 'locked',
    progress: 0,
    requiredLevel: 20,
    description: 'تطوير القوة الجسدية بالتمارين المستمرة والصحة الغذائية الفائقة لرفع طاقة الحياة.'
  },
  {
    id: 5,
    number: '05',
    title: 'السيادة على الوقت والحرية التامة',
    subtitle: 'Mastering Time & Freedom',
    status: 'locked',
    progress: 0,
    requiredLevel: 30,
    description: 'الوصول إلى قمة التحكم في الذات والإنتاجية، واكتمال صناديق الحرية والنجاح.'
  }
];

export default function ChaptersOverview({ userLevel }: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-[#0d131f] p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-black text-white">فصول القصة والارتقاء — CHAPTERS</h3>
          <p className="text-xs text-slate-400">رحلتك كبطل يتقدم عبر مراحل حقيقية في الحياة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CHAPTERS.map((chapter) => {
          const isUnlocked = userLevel >= chapter.requiredLevel;
          const isCompleted = chapter.progress === 100;
          const isActive = isUnlocked && !isCompleted;

          return (
            <div
              key={chapter.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isCompleted
                  ? 'border-emerald-500/30 bg-emerald-950/15'
                  : isActive
                  ? 'border-purple-500/40 bg-purple-950/20 shadow-lg shadow-purple-950/30'
                  : 'border-slate-800 bg-slate-900/40 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-slate-400 font-mono tracking-wider">
                    CHAPTER {chapter.number}
                  </span>
                  {isCompleted ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      مكتمل
                    </span>
                  ) : isActive ? (
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black">
                      قيد الإنجاز
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 text-[10px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      المستوى {chapter.requiredLevel}
                    </span>
                  )}
                </div>

                <h4 className="text-base font-black text-white mb-0.5">{chapter.title}</h4>
                <p className="text-[11px] text-purple-300/70 font-semibold mb-2">{chapter.subtitle}</p>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{chapter.description}</p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-bold">
                  <span>التقدم</span>
                  <span>{isUnlocked ? chapter.progress : 0}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                    }`}
                    style={{ width: `${isUnlocked ? chapter.progress : 0}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
