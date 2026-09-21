'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import { Award, X, Sparkles } from 'lucide-react';

interface AwardBossXPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AwardBossXPModal({ isOpen, onClose }: AwardBossXPModalProps) {
  const { awardBossXP, playerProfile } = useRPG();
  const [amount, setAmount] = useState<number>(20);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('استمرارية وانضباط ممتاز');
  const [customReason, setCustomReason] = useState<string>('');
  const [note, setNote] = useState<string>('');

  if (!isOpen) return null;

  const presetAmounts = [5, 10, 20, 50, 100];
  const standardReasons = [
    'استمرارية وانضباط ممتاز',
    'إكمال هدف صعب ومعقد',
    'العمل بما يتجاوز الخطة المقررة',
    'إظهار صلابة في مقاومة المحفزات',
    'مساعدة وخدمة شخص آخر',
    'جهد نوعي استثنائي',
    'أخرى'
  ];

  const handleAward = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = isCustom ? parseInt(customAmount, 10) || 10 : amount;
    const finalReason = reason === 'أخرى' && customReason.trim() ? customReason.trim() : reason;

    if (finalAmount <= 0) return;

    awardBossXP(finalAmount, finalReason, note.trim() || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e121d] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-950/40 text-right">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                توثيق واعتماد المشرف
              </span>
              <h3 className="text-lg font-black text-white">منح نقاط مكافأة المشرف (XP)</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleAward} className="mt-5 space-y-4">
          {/* Target Player */}
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold">اللاعب المستهدف:</span>
            <span className="text-xs font-bold text-white font-mono">{playerProfile.name} (المستوى {playerProfile.level} • {playerProfile.totalXP} XP)</span>
          </div>

          {/* Amount Presets */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              اختر قيمة المكافأة
            </label>
            <div className="grid grid-cols-6 gap-2">
              {presetAmounts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setAmount(p);
                    setIsCustom(false);
                  }}
                  className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                    !isCustom && amount === p
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  +{p}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsCustom(true)}
                className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                  isCustom
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
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
                max="500"
                placeholder="أدخل قيمة XP المخصصة (مثال: 75)..."
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500 text-right"
                required
              />
            )}
          </div>

          {/* Reason Selection */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              سبب المنح
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 text-right"
            >
              {standardReasons.map((r) => (
                <option key={r} value={r} className="bg-slate-900 text-white">
                  {r}
                </option>
              ))}
            </select>

            {reason === 'أخرى' && (
              <input
                type="text"
                placeholder="حدد السبب بوضوح..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 text-right"
                required
              />
            )}
          </div>

          {/* Optional Mentor Note */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              ملاحظة التوثيق والمساءلة (اختياري)
            </label>
            <textarea
              rows={2}
              placeholder="مثال: أكملت تسليم العميل قبل يومين من الموعد بهندسة متقنة..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 resize-none text-right"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:brightness-110 text-slate-950 font-black text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>تأكيد واعتماد نقاط المشرف</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
