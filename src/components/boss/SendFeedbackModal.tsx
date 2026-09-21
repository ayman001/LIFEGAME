'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import { MessageSquare, X, Send } from 'lucide-react';

interface SendFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SendFeedbackModal({ isOpen, onClose }: SendFeedbackModalProps) {
  const { addBossFeedback, playerProfile } = useRPG();
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const quickTemplates = [
    'عمل رائع اليوم. حافظ على وتيرة الاستمرارية والانضباط.',
    'أكملت المهمة المطلوبة، لكن ساعات تركيزك كانت أقل مما خططنا له.',
    'لاحظ كيف يتحسن صفاء ذهنك عندما تحمي روتين الصباح بنقاء.',
    'اضغط على نفسك اليوم أكثر؛ محطتك القادمة باتت قريبة جداً.',
    'فخور بصلابتك في مقاومة الرغبات والمحفزات الاندفاعية.'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    addBossFeedback(message.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e121d] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-950/40 text-right">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                توجيهات المشرف والمساءلة
              </span>
              <h3 className="text-lg font-black text-white">إرسال توجيه مباشر للاعب</h3>
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
            <span className="text-xs text-slate-400 font-bold">اللاعب المستلم:</span>
            <span className="text-xs font-bold text-white font-mono">{playerProfile.name} (المستوى {playerProfile.level})</span>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              نماذج توجيه سريعة
            </label>
            <div className="space-y-1.5">
              {quickTemplates.map((tpl) => (
                <button
                  key={tpl}
                  type="button"
                  onClick={() => setMessage(tpl)}
                  className="w-full text-right p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-xs text-slate-300 transition-all hover:border-amber-500/30 font-medium"
                >
                  «{tpl}»
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              نص التوجيه المخصص
            </label>
            <textarea
              rows={3}
              placeholder="اكتب توجيهاً مباشراً، دقيقاً، ومحفزاً..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 resize-none text-right"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:brightness-110 text-slate-950 font-black text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>إرسال توجيه المشرف</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
