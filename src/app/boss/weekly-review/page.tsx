'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import {
  BarChart3,
  Crown,
  Star,
  CheckCircle2,
  Sparkles,
  Send,
  Calendar,
  Briefcase,
  BookOpen,
  Dumbbell,
  Flame,
  Coins
} from 'lucide-react';

export default function BossWeeklyReviewPage() {
  const { weeklyScore, playerProfile, submitBossWeeklyReview } = useRPG();
  const [whatWentWell, setWhatWentWell] = useState(weeklyScore.bossReview?.whatWentWell || '');
  const [needsImprovement, setNeedsImprovement] = useState(weeklyScore.bossReview?.needsImprovement || '');
  const [nextPriority, setNextPriority] = useState(weeklyScore.bossReview?.nextPriority || '');
  const [rating, setRating] = useState<number>(weeklyScore.bossReview?.rating || 5);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatWentWell.trim() || !nextPriority.trim()) return;

    submitBossWeeklyReview({
      whatWentWell: whatWentWell.trim(),
      needsImprovement: needsImprovement.trim() || 'Keep maintaining high baseline standards.',
      nextPriority: nextPriority.trim(),
      rating
    });

    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <Crown className="w-5 h-5 text-amber-400" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            تقييم المشرف لنهاية الأسبوع
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          التقييم الأسبوعي: {playerProfile.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          راجع بطاقة الأداء الأسبوعية للاعب وأرسل توجيهاتك المعتمدة مباشرة إلى بطاقته الأسبوعية.
        </p>
      </div>

      {/* Player Weekly Performance Matrix */}
      <div className="rounded-3xl bg-[#0d131f] border border-amber-500/30 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-mono uppercase tracking-wider text-amber-400 font-bold">
            مؤشرات أداء اللاعب (أسبوع {weeklyScore.weekId})
          </h3>
          <span className="text-xs font-mono text-slate-400">
            الرتبة: <strong className="text-white">{weeklyScore.weeklyRank}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">إجمالي XP</span>
            <span className="text-lg font-black text-purple-400 font-mono mt-1 block">
              {weeklyScore.xpEarned} XP
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">نقاط المشرف</span>
            <span className="text-lg font-black text-amber-400 font-mono mt-1 block">
              +{weeklyScore.bossXPEarned} XP
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">المهام المنجزة</span>
            <span className="text-lg font-black text-white font-mono mt-1 block">
              {weeklyScore.completedQuests}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">العمل العميق</span>
            <span className="text-lg font-black text-indigo-400 font-mono mt-1 block">
              {playerProfile.workHours} س
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">أموال مدخرة</span>
            <span className="text-lg font-black text-emerald-400 font-mono mt-1 block">
              +{weeklyScore.moneySavedDH} درهم
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">أيام نقية</span>
            <span className="text-lg font-black text-rose-400 font-mono mt-1 block">
              {playerProfile.weedFreeDays}/7 أيام
            </span>
          </div>
        </div>
      </div>

      {/* Formal Review Form */}
      <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">نموذج تقييم المشرف الأسبوعي</h3>
          </div>

          {/* Rating Stars */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-slate-400 ml-2">تقييم الانضباط:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Star
                  className={`w-5 h-5 ${
                    star <= rating
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-700'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-2">
              ما هي نقاط القوة والانتصارات هذا الأسبوع؟
            </label>
            <textarea
              rows={3}
              placeholder="مثال: أظهر أيمن ثباتاً ممتازاً في مقاومة الرغبات المسائية وأنجز المهام البرمجية في وقت قياسي..."
              value={whatWentWell}
              onChange={(e) => setWhatWentWell(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-2">
              ما هي النقاط التي تحتاج تحسيناً وتطويراً؟
            </label>
            <textarea
              rows={3}
              placeholder="مثال: لوحظ تراجع طفيف في ساعات التركيز يوم الخميس؛ يُوصى بجدولة أولويات اليوم مبكراً..."
              value={needsImprovement}
              onChange={(e) => setNeedsImprovement(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2">
              التوجيه والأولوية القصوى للأسبوع القادم
            </label>
            <textarea
              rows={3}
              placeholder="مثال: إطلاق النسخة الأولى من المشروع والوصول إلى حاجز 300 درهم في صندوق الحرية..."
              value={nextPriority}
              onChange={(e) => setNextPriority(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="text-xs text-emerald-400 font-bold font-mono">
              {isSubmitted ? '✓ تم إرسال التقييم الأسبوعي المعتمد للاعب بنجاح' : ''}
            </span>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:brightness-110 text-slate-950 font-black text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95"
            >
              <Send className="w-4 h-4 rotate-180" />
              <span>إرسال التقييم المعتمد</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
