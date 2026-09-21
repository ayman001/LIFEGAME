'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import { 
  X, 
  Flame, 
  CheckCircle2, 
  ArrowLeft, 
  Footprints
} from 'lucide-react';

interface CravingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CravingModal({ isOpen, onClose }: CravingModalProps) {
  const { resistCraving } = useRPG();
  const [selectedDuration, setSelectedDuration] = useState<'5m' | '20m' | '1h' | '2-3h'>('5m');
  const [customNote, setCustomNote] = useState('');

  if (!isOpen) return null;

  const actionsByDuration = {
    '5m': {
      title: 'تدخلات مصغرة (5 دقائق)',
      subtitle: 'اكسر الحلقة الذهنية فوراً وغيّر حالتك البدنية الآن.',
      xp: '+15 XP',
      actions: [
        '25 تمرين ضغط سريع (Push-ups)',
        'أخذ حمام منعش (بارد أو دافئ)',
        'إعداد كوب شاي أعشاب أو شاي أخضر طازج',
        'تنظيف وترتيب مساحة المكتب تماماً',
        'صلاة ركعتين وتأمل وتفكر هادئ',
        'غسل الوجه وتنظيف الأسنان',
        'الخروج فوراً لاستنشاق الهواء النقي',
        'الاتصال بشخص مقرب والتحدث معه لدقائق',
        'الاستماع لتلاوة أو مقطع ملهم'
      ]
    },
    '20m': {
      title: 'إعادة ضبط التركيز (20 دقيقة)',
      subtitle: 'حرك جسدك ويديك، ودع الدوبامين يستقر طبيعياً.',
      xp: '+20 XP',
      actions: [
        'مشي سريع في الهواء الطلق',
        'جلسة تمرين بدني لوزن الجسم',
        'العزف على الغيتار أو آلة موسيقية',
        'لعب مباراتين شطرنج عبر الإنترنت',
        'تنظيف وترتيب الغرفة بعمق',
        'طهي وجبة صحية طازجة من الصفر',
        'فتح برنامج التصميم وبناء شاشة',
        'قراءة فصل مميز من كتاب ورقي',
        'التقاط صور بهاتفك في الحي والشارع'
      ]
    },
    '1h': {
      title: 'انغماس عميق (ساعة واحدة)',
      subtitle: 'إعادة توجيه الطاقة كلياً نحو البناء أو الرياضة والنشاط.',
      xp: '+35 XP',
      actions: [
        'الذهاب إلى النادي الرياضي (أوزان أو كارديو)',
        'مشي طويل وممتد في الحديقة أو على الكورنيش',
        'مشاهدة حلقة وثائقية ملهمة ومفيدة',
        'تركيز عميق على مشروع ELITDIGI',
        'كتابة وبرمجة ميزات تطبيقك',
        'تصميم أصول إبداعية على فوتوشوب',
        'لعب مباراة كرة قدم أو رياضة مع الأصدقاء',
        'زيارة صديق أو صلة رحم مع العائلة',
        'استكشاف حي أو شارع غير مألوف في المدينة'
      ]
    },
    '2-3h': {
      title: 'طاقة تركيز كاملة (2–3 ساعات)',
      subtitle: 'قمة السيادة على النفس. حوّل الرغبة لانتصار حقيقي متراكم.',
      xp: '+50 XP',
      actions: [
        'جلسة عمل عميق بدون هاتف نهائياً',
        'تدريب مكثف في النادي متبوعاً بساونا واستحمام',
        'جولة استكشاف وتصوير طويلة خارج المنزل',
        'بناء ميزة برمجية كاملة في مشروع ويب',
        'إتمام تسليم كامل لمشروع عميل',
        'تعلّم وإتقان مهارة تقنية جديدة',
        'زيارة وجهة أو معلم جديد كلياً'
      ]
    }
  };

  const current = actionsByDuration[selectedDuration];

  const handleExecuteAction = (actionName: string) => {
    resistCraving(actionName, `نشاط ${selectedDuration}`, customNote);
    setCustomNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0b0f19] border border-rose-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-rose-950/40 max-h-[92vh] flex flex-col overflow-hidden text-right">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                  تدخل تكتيكي فوري
                </span>
                <span className="text-xs text-emerald-400 font-bold font-mono">+20 درهم يتم توفيرها وحمايتها</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                غيّر بيئتك فوراً — ارفض التفاوض مع الرغبة
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Motivational Philosophy Box */}
        <div className="my-4 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
          <Footprints className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">القاعدة الذهبية:</strong> إياك والتفاوض مع الرغبة داخل رأسك. 
            الحركة الجسدية وتغيير البيئة فوراً يبددان الدافع في أقل من 10 دقائق. اختر فعلاً من القائمة ونفذه الآن.
          </p>
        </div>

        {/* Duration Selectors */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {([
            { id: '5m', label: '5 دقائق' },
            { id: '20m', label: '20 دقيقة' },
            { id: '1h', label: 'ساعة' },
            { id: '2-3h', label: '2-3 ساعات' }
          ] as const).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedDuration(item.id)}
              className={`py-2 px-2 rounded-xl text-xs font-bold text-center border transition-all ${
                selectedDuration === item.id
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Subtitle & Reward */}
        <div className="flex items-center justify-between px-1 mb-3">
          <div>
            <span className="text-xs font-bold text-white block">{current.title}</span>
            <span className="text-[11px] text-slate-400">{current.subtitle}</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            {current.xp}
          </span>
        </div>

        {/* Action Items List */}
        <div className="flex-1 overflow-y-auto space-y-2 pl-1 custom-scrollbar">
          {current.actions.map((act) => (
            <div
              key={act}
              className="p-3 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/80 hover:border-purple-500/40 flex items-center justify-between gap-3 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white">
                  {act}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleExecuteAction(act)}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              >
                <span>نفذت هذا البديل</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Quick-Log Custom action */}
        <div className="pt-4 border-t border-slate-800 mt-3 flex items-center gap-2">
          <input
            type="text"
            placeholder="أو اكتب نصراً بديلاً مخصصاً (مثال: خرجت لشراء فواكه طازجة)..."
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
          />
          <button
            type="button"
            disabled={!customNote.trim()}
            onClick={() => handleExecuteAction(customNote.trim())}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white text-xs font-bold shrink-0 transition-all"
          >
            تسجيل النصر
          </button>
        </div>

      </div>
    </div>
  );
}
