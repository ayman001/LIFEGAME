'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import { Quest, QuestCategory, QuestDifficulty } from '@/types';
import {
  Scroll,
  Plus,
  CheckCircle2,
  Circle,
  Coins,
  Sparkles,
  Search,
  X,
  MessageSquare,
  Undo2,
  Trash2
} from 'lucide-react';

export default function QuestsPage() {
  const { quests, completeQuest, uncompleteQuest, addCustomQuest, deleteQuest, editQuest } = useRPG();
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [selectedStatus, setSelectedStatus] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeNoteQuestId, setActiveNoteQuestId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState('');

  const handleToggleObjective = (questId: string, objectiveId: string) => {
    const quest = quests.find((q) => q.id === questId);
    if (!quest || !quest.objectives) return;

    const updatedObjectives = quest.objectives.map((obj) =>
      obj.id === objectiveId ? { ...obj, completed: !obj.completed } : obj
    );

    const allDone = updatedObjectives.every((obj) => obj.completed);
    editQuest(questId, {
      objectives: updatedObjectives,
      status: allDone ? 'completed' : 'in_progress'
    });

    if (allDone && quest.status !== 'completed') {
      completeQuest(questId);
    }
  };


  // Add quest form state
  const [newQuestName, setNewQuestName] = useState('');
  const [newQuestCategory, setNewQuestCategory] = useState<QuestCategory>('صحة');
  const [newQuestDifficulty, setNewQuestDifficulty] = useState<QuestDifficulty>('medium');
  const [newQuestNotes, setNewQuestNotes] = useState('');
  const [newQuestMoney, setNewQuestMoney] = useState('');

  const categories = [
    'الكل',
    'إيمان',
    'عقل',
    'صحة',
    'عمل',
    'تعلّم',
    'مال',
    'علاقات',
    'حياة وتجارب'
  ];

  const statuses = [
    { label: 'الكل', value: 'الكل' },
    { label: 'لم تبدأ', value: 'not_started' },
    { label: 'قيد التنفيذ', value: 'in_progress' },
    { label: 'مكتملة', value: 'completed' }
  ];

  const filteredQuests = quests.filter((q) => {
    const matchesCategory = selectedCategory === 'الكل' || q.category === selectedCategory;
    const matchesStatus = selectedStatus === 'الكل' || q.status === selectedStatus;
    const matchesSearch = q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.notes && q.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleToggle = (quest: Quest) => {
    if (quest.status === 'completed') {
      if (window.confirm(`هل تريد التراجع عن إكمال "${quest.name}"؟ سيتم خصم نقاط XP المكتسبة بدقة.`)) {
        uncompleteQuest(quest.id);
      }
    } else {
      completeQuest(quest.id);
    }
  };

  const handleSaveNote = (questId: string) => {
    completeQuest(questId, noteInput);
    setActiveNoteQuestId(null);
    setNoteInput('');
  };

  const handleCreateQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestName.trim()) return;

    addCustomQuest({
      name: newQuestName.trim(),
      category: newQuestCategory,
      difficulty: newQuestDifficulty,
      notes: newQuestNotes.trim() || undefined,
      moneySaved: newQuestMoney ? parseFloat(newQuestMoney) : 0
    });

    setNewQuestName('');
    setNewQuestNotes('');
    setNewQuestMoney('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scroll className="w-5 h-5 text-purple-400" />
            <span className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">
              توجيهات العمل اليومي
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            محرك المهام اليومية
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            حوّل أفعالك اليومية الحقيقية إلى ارتقاء دائم في مستواك وشخصيتك.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مهمة مخصصة</span>
        </button>
      </div>

      {/* Filters & Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث عن المهام بالعنوان أو الملاحظات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d131f] border border-slate-800 rounded-xl pr-10 pl-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500 text-right"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-[#0d131f] border border-slate-800 p-1 rounded-xl shrink-0 overflow-x-auto">
            {statuses.map((s) => (
              <button
                key={s.value}
                onClick={() => setSelectedStatus(s.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedStatus === s.value
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-purple-300 border border-purple-500/40'
                  : 'bg-[#0d131f] text-slate-400 hover:text-white border border-slate-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Quests List */}
      <div className="space-y-3">
        {filteredQuests.length === 0 ? (
          <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-12 text-center">
            <Scroll className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-200">لا توجد مهام مطابقة للبحث</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {searchQuery || selectedCategory !== 'الكل'
                ? 'جرب تغيير خيارات التصفية أو مسح عبارة البحث.'
                : 'مهمتك التالية تبدأ من هنا. أضف مهمة مخصصة لبناء يومك.'}
            </p>
          </div>
        ) : (
          filteredQuests.map((quest) => {
            const isCompleted = quest.status === 'completed';

            return (
              <div
                key={quest.id}
                className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                  isCompleted
                    ? 'bg-[#0b1319]/50 border-emerald-500/30 opacity-80'
                    : 'bg-[#0d131f] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start sm:items-center justify-between gap-3">
                  
                  {/* Toggle Checkbox */}
                  <button
                    type="button"
                    onClick={() => handleToggle(quest)}
                    className="mt-0.5 sm:mt-0 text-slate-400 hover:text-emerald-400 transition-transform active:scale-90 shrink-0"
                    title={isCompleted ? 'انقر للتراجع' : 'تحديد كمكتمل'}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-500 hover:text-purple-400" />
                    )}
                  </button>

                  {/* Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {quest.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        • {quest.difficulty}
                      </span>
                      {quest.isBossChallenge && (
                        <span className="text-[10px] text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                          تحدي المشرف
                        </span>
                      )}
                      {isCompleted && quest.completedAt && (
                        <span className="text-[10px] text-emerald-400 font-bold">
                          • أُنجزت في {quest.completedAt}
                        </span>
                      )}
                    </div>

                    <h3 className={`text-sm sm:text-base font-bold ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                      {quest.name}
                    </h3>

                    {/* Notes */}
                    {quest.notes && (
                      <p className="text-xs text-slate-400 mt-1 italic">
                        «{quest.notes}»
                      </p>
                    )}

                    {/* Multi-Objective Checklist */}
                    {quest.objectives && quest.objectives.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5">
                        <div className="text-[11px] font-bold text-slate-400 mb-1 flex items-center justify-between">
                          <span>الأهداف الفرعية للمهمة:</span>
                          <span className="text-purple-400 font-mono">
                            {quest.objectives.filter((o) => o.completed).length}/{quest.objectives.length} مكتملة
                          </span>
                        </div>
                        {quest.objectives.map((obj) => (
                          <div
                            key={obj.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleObjective(quest.id, obj.id);
                            }}
                            className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer select-none py-1 px-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                          >
                            {obj.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-500 shrink-0 hover:text-purple-400" />
                            )}
                            <span className={obj.completed ? 'line-through text-slate-500' : ''}>
                              {obj.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>


                  {/* Actions & Rewards */}
                  <div className="flex items-center gap-2 shrink-0">
                    {quest.moneySaved > 0 && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 px-2 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                        <Coins className="w-3.5 h-3.5" />
                        +{quest.moneySaved} درهم
                      </span>
                    )}

                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xl border ${
                      isCompleted
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-800 text-purple-300 border-slate-700'
                    }`}>
                      +{quest.xpReward} XP
                    </span>

                    {!isCompleted && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveNoteQuestId(activeNoteQuestId === quest.id ? null : quest.id);
                          setNoteInput(quest.notes || '');
                        }}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                        title="إضافة ملاحظة ماذا أنجزت"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    )}

                    {isCompleted && (
                      <button
                        type="button"
                        onClick={() => handleToggle(quest)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                        title="التراجع عن الإكمال"
                      >
                        <Undo2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => deleteQuest(quest.id)}
                      className="p-1.5 text-slate-600 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                      title="حذف المهمة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* Inline Notes Field when toggled */}
                {activeNoteQuestId === quest.id && !isCompleted && (
                  <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="ماذا أنجزت بالتفصيل؟ (مثال: مشيت 30 دقيقة، أكملت قراءة 15 صفحة)..."
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 text-right"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveNote(quest.id)}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all"
                    >
                      إكمال مع الملاحظة
                    </button>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* Add Custom Quest Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0e121d] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/40 text-right">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Scroll className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">
                    إنشاء توجيه جديد
                  </span>
                  <h3 className="text-lg font-black text-white">إضافة مهمة مخصصة</h3>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuest} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                  اسم المهمة
                </label>
                <input
                  type="text"
                  placeholder="مثال: المشي 30 دقيقة في الهواء النقي..."
                  value={newQuestName}
                  onChange={(e) => setNewQuestName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 text-right"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                    التصنيف
                  </label>
                  <select
                    value={newQuestCategory}
                    onChange={(e) => setNewQuestCategory(e.target.value as QuestCategory)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 text-right"
                  >
                    {categories.filter((c) => c !== 'الكل').map((c) => (
                      <option key={c} value={c} className="bg-slate-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                    الصعوبة ومكافأة XP
                  </label>
                  <select
                    value={newQuestDifficulty}
                    onChange={(e) => setNewQuestDifficulty(e.target.value as QuestDifficulty)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono text-right"
                  >
                    <option value="easy">سهل (5 XP)</option>
                    <option value="medium">متوسط (10 XP)</option>
                    <option value="hard">صعب (20 XP)</option>
                    <option value="major">إنجاز كبير (50 XP)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                  مبلغ تم ادخاره بالدرهم (اختياري)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="مثال: 15 (يودع تلقائياً في صندوق الحرية)"
                  value={newQuestMoney}
                  onChange={(e) => setNewQuestMoney(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500 text-right"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                  ماذا فعلت؟ (ملاحظات وتفاصيل)
                </label>
                <textarea
                  rows={2}
                  placeholder="مثال: مشيت خارج المنزل واستمعت لكتاب صوتي..."
                  value={newQuestNotes}
                  onChange={(e) => setNewQuestNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none text-right"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>تأكيد وإضافة المهمة</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
