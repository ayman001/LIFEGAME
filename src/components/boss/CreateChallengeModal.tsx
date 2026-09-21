'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import { Swords, X, Sparkles } from 'lucide-react';
import { QuestDifficulty } from '@/types';

interface CreateChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateChallengeModal({ isOpen, onClose }: CreateChallengeModalProps) {
  const { addBossChallenge, playerProfile } = useRPG();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [xpReward, setXpReward] = useState(50);
  const [deadline, setDeadline] = useState('2026-09-25');
  const [difficulty, setDifficulty] = useState<QuestDifficulty>('hard');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addBossChallenge({
      title: title.trim(),
      description: description.trim(),
      xpReward,
      deadline,
      difficulty
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e121d] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-950/40 text-right">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                توجيه وتحدي المشرف
              </span>
              <h3 className="text-lg font-black text-white">إصدار تحدي جديد للاعب</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold">اللاعب المكلف:</span>
            <span className="text-xs font-bold text-white font-mono">{playerProfile.name} (المستوى {playerProfile.level})</span>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              عنوان التحدي
            </label>
            <input
              type="text"
              placeholder="مثال: إكمال 3 ساعات عمل مركز على مشروع ELITDIGI..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 text-right"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              الوصف والهدف المطلوب
            </label>
            <textarea
              rows={3}
              placeholder="مثال: صفر مشتتات هاتفية، إتمام نظام المصادقة الأساسي ودفع الإصدار للاختبار..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 resize-none text-right"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                مكافأة النقاط XP
              </label>
              <select
                value={xpReward}
                onChange={(e) => setXpReward(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono text-right"
              >
                <option value={20}>+20 XP (متوسط)</option>
                <option value={50}>+50 XP (صعب)</option>
                <option value={100}>+100 XP (إنجاز استثنائي)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                الموعد النهائي
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              مستوى الصعوبة
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'medium', label: 'متوسط' },
                { id: 'hard', label: 'صعب' },
                { id: 'major', label: 'إنجاز كبير' }
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDifficulty(d.id as QuestDifficulty)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    difficulty === d.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:brightness-110 text-slate-950 font-black text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>إرسال التحدي إلى قائمة مهام اللاعب</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
