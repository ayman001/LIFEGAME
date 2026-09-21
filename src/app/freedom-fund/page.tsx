'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import { FreedomReason } from '@/types';
import { FREEDOM_FUND_MILESTONES, getNextMilestone } from '@/lib/rpg-engine';
import {
  Coins,
  Shield,
  Plus,
  Flame,
  CheckCircle2,
  Lock,
  Sparkles,
  TrendingUp,
  History,
  Heart
} from 'lucide-react';

export default function FreedomFundPage() {
  const { playerProfile, freedomEntries, addFreedomEntry } = useRPG();
  const [amountInput, setAmountInput] = useState<number>(15);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [reason, setReason] = useState<FreedomReason>('instead_of_weed');
  const [notes, setNotes] = useState('');

  const nextMilestoneInfo = getNextMilestone(playerProfile.totalSavedDH);

  const quickAmounts = [5, 10, 15, 20, 50];

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = isCustom ? parseFloat(customAmount) || 5 : amountInput;
    if (finalAmount <= 0) return;

    addFreedomEntry({
      amountDH: finalAmount,
      reason,
      notes: notes.trim() || 'Daily freedom allocation.'
    });

    setNotes('');
    setCustomAmount('');
    setIsCustom(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Coins className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              خزينة الحرية والتعافي المالي
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            صندوق الحرية ونقاط الحياة
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            أموال حقيقية تُدخر برفض العادات السيئة والاستهلاك الاندفاعي. كل 5 دراهم = 1 نقطة حياة.
          </p>
        </div>

        {/* Live Balances */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center">
            <span className="text-[10px] font-mono text-emerald-400 uppercase block font-semibold">إجمالي المدخرات</span>
            <span className="text-xl font-black text-emerald-300 font-mono">
              {playerProfile.totalSavedDH} درهم
            </span>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-blue-950/20 border border-blue-500/30 text-center">
            <span className="text-[10px] font-mono text-blue-400 uppercase block font-semibold">نقاط الحياة</span>
            <span className="text-xl font-black text-blue-300 font-mono flex items-center justify-center gap-1">
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
              {playerProfile.lifePoints} LP
            </span>
          </div>
        </div>
      </div>

      {/* Hero Milestone Tracker Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0a1411] via-[#091017] to-[#070a10] border border-emerald-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              المحطة القادمة: {nextMilestoneInfo.next} درهم
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              {playerProfile.totalSavedDH} درهم / {nextMilestoneInfo.next} درهم
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {nextMilestoneInfo.next - playerProfile.totalSavedDH > 0
                ? `متبقي ${nextMilestoneInfo.next - playerProfile.totalSavedDH} درهم لفتح المحطة التالية والوسام الجديد.`
                : 'تم فتح أعلى محطة بنجاح! سيطرة تامة على الذات.'}
            </p>

            {/* Gauge */}
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs font-mono font-semibold">
                <span className="text-slate-400">نسبة التقدم للمحطة</span>
                <span className="text-emerald-400">{nextMilestoneInfo.progressPercent}%</span>
              </div>
              <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                  style={{ width: `${Math.max(5, nextMilestoneInfo.progressPercent)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2 shrink-0 md:max-w-xs">
            <div className="flex items-center gap-2 font-mono text-emerald-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>قواعد صندوق الحرية</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              • هدف يومي مرن ومستمر: بين <strong>5 و 20 درهم</strong>.
              <br />• كل 5 دراهم تمنحك <strong>1 نقطة حياة دائمة</strong>.
              <br />• الانقطاع يوماً <strong>لا يمسح مدخراتك أو إنجازاتك أبداً</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Two Columns: Deposit Form & Milestones Ladder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Deposit Form */}
        <div className="lg:col-span-1 rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800 mb-4">
            <Plus className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">تسجيل مبلغ مدخر</h3>
          </div>

          <form onSubmit={handleDeposit} className="space-y-4">
            {/* Quick Amount Chips */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                المبلغ اليومي (5–20 درهم)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setAmountInput(amt);
                      setIsCustom(false);
                    }}
                    className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                      !isCustom && amountInput === amt
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    +{amt} د.م
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setIsCustom(true)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                    isCustom
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  مخصص
                </button>
              </div>

              {isCustom && (
                <input
                  type="number"
                  min="1"
                  placeholder="أدخل المبلغ المخصص بالدرهم..."
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="mt-2 w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                  required
                />
              )}
            </div>

            {/* Reason */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                سبب التوفير
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as FreedomReason)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="instead_of_weed">بدل الحشيش (انتصار مباشر على الرغبة)</option>
                <option value="avoided_unnecessary_spending">تجنب إنفاق استهلاكي غير ضروري</option>
                <option value="extra_saving">ادخار إضافي / فائض عمل حر</option>
                <option value="other">سبب آخر</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                سياق وملاحظة الفعل
              </label>
              <textarea
                rows={2}
                placeholder="ما هي الرغبة التي قاومتها أو القرار الحكيم الذي اتخذته؟..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-slate-950 font-black text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Coins className="w-4 h-4" />
              <span>تأكيد الإيداع في الخزينة (+10 XP)</span>
            </button>
          </form>
        </div>

        {/* Milestone Ladder */}
        <div className="lg:col-span-2 rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">سلم المحطات المالية</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">9 محطات رئيسية</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {FREEDOM_FUND_MILESTONES.map((m) => {
              const isReached = playerProfile.totalSavedDH >= m;

              return (
                <div
                  key={m}
                  className={`p-4 rounded-2xl border transition-all ${
                    isReached
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-base font-black">
                      {m} درهم
                    </span>
                    {isReached ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </div>
                  <span className="text-[10px] font-mono block">
                    {isReached ? 'تم التحقيق' : `متبقي ${m - playerProfile.totalSavedDH} درهم`}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    تمنح {m / 5} نقطة حياة
                  </span>
                </div>
              );
            })}
          </div>

          {/* Ledger History */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
              <History className="w-3.5 h-3.5" />
              سجل تدقيق الإيداعات
            </h4>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {freedomEntries.map((item) => {
                const reasonArabic: Record<string, string> = {
                  instead_of_weed: 'بدل الحشيش',
                  avoided_unnecessary_spending: 'تجنب إنفاق غير ضروري',
                  extra_saving: 'ادخار إضافي',
                  other: 'آخر'
                };

                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-400">+{item.amountDH} درهم</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          • {reasonArabic[item.reason] || item.reason}
                        </span>
                      </div>
                      {item.notes && (
                        <p className="text-[11px] text-slate-400 mt-0.5 italic line-clamp-1">
                          &quot;{item.notes}&quot;
                        </p>
                      )}
                    </div>

                    <div className="text-left shrink-0">
                      <span className="text-[10px] font-mono text-blue-300 block">+{item.lifePointsEarned} LP</span>
                      <span className="text-[10px] font-mono text-slate-500">{item.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
