'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import { Reward } from '@/types';
import {
  Gift,
  Plus,
  CheckCircle2,
  Sparkles,
  Lock,
  Heart,
  Smile,
  X,
  Coins
} from 'lucide-react';

export default function RewardsPage() {
  const { rewards, playerProfile, redeemReward, addCustomReward } = useRPG();
  const [selectedTab, setSelectedTab] = useState<'xp' | 'free'>('xp');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add custom reward form state
  const [rewardName, setRewardName] = useState('');
  const [costXP, setCostXP] = useState(100);
  const [description, setDescription] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [category, setCategory] = useState('Leisure');

  const xpRewards = rewards.filter((r) => !r.isFree);
  const freeRewards = rewards.filter((r) => r.isFree);

  const handleCreateReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewardName.trim()) return;

    addCustomReward({
      name: rewardName.trim(),
      costXP: isFree ? undefined : costXP,
      description: description.trim() || 'Custom personal reward.',
      isFree,
      category
    });

    setRewardName('');
    setDescription('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Gift className="w-5 h-5 text-purple-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
              مكتسبات مستحقة
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            خزانة المكافآت ومكتبة الدوبامين الصحي
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            احتفل بانضباطك دون أدنى شعور بالذنب مع مكافآت تُفتح برصيد XP وطقوس حياة صحية مجانية.
          </p>
        </div>

        {/* Available XP & Add Button */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-center">
            <span className="text-[10px] font-mono text-purple-400 uppercase block font-semibold">رصيد XP المتاح</span>
            <span className="text-xl font-black text-purple-300 font-mono">
              {playerProfile.totalXP} XP
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مكافأة</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSelectedTab('xp')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            selectedTab === 'xp'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'bg-[#0d131f] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          مكافآت محطات XP ({xpRewards.length})
        </button>

        <button
          onClick={() => setSelectedTab('free')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            selectedTab === 'free'
              ? 'bg-emerald-600 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-[#0d131f] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          طقوس مجانية صحية ({freeRewards.length})
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(selectedTab === 'xp' ? xpRewards : freeRewards).map((reward) => {
          const isEligible = (reward.costXP || 0) <= playerProfile.totalXP;
          const isRedeemed = reward.redeemed;

          return (
            <div
              key={reward.id}
              className={`rounded-3xl border p-5 sm:p-6 transition-all flex flex-col justify-between ${
                isRedeemed
                  ? 'bg-emerald-950/10 border-emerald-500/30 opacity-70'
                  : isEligible
                  ? 'bg-[#0d131f] border-purple-500/30 hover:border-purple-500/50 shadow-lg'
                  : 'bg-[#0a0d14] border-slate-800/80 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {reward.category}
                  </span>

                  {reward.isFree ? (
                    <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                      مجاني (0 درهم)
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-bold text-purple-300 px-2.5 py-0.5 rounded-lg bg-purple-500/10 border border-purple-500/30">
                      {reward.costXP} XP
                    </span>
                  )}
                </div>

                <h3 className="text-base font-black text-white tracking-tight">
                  {reward.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {reward.description}
                </p>
              </div>

              {/* Bottom Action */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                {isRedeemed ? (
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    تم الاستمتاع بها
                  </span>
                ) : isEligible ? (
                  <button
                    type="button"
                    onClick={() => redeemReward(reward.id)}
                    className="w-full py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-purple-500/20 active:scale-95"
                  >
                    استحقاق واستمتاع
                  </button>
                ) : (
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    تتطلب {reward.costXP} XP
                  </span>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Custom Reward Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#0e121d] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/40">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                    تصميم مكافأة
                  </span>
                  <h3 className="text-lg font-black text-white">إضافة مكافأة مخصصة</h3>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReward} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  عنوان المكافأة
                </label>
                <input
                  type="text"
                  placeholder="مثال: جولة تصوير في الطبيعة نهاية الأسبوع..."
                  value={rewardName}
                  onChange={(e) => setRewardName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  الوصف والتأثير النفسي
                </label>
                <textarea
                  rows={2}
                  placeholder="ما الذي يجعل هذه المكافأة مغذية لروحك ومحفزة لانضباطك؟..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="freeCheck"
                  checked={isFree}
                  onChange={(e) => setIsFree(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4 rounded"
                />
                <label htmlFor="freeCheck" className="text-xs text-slate-300 font-medium cursor-pointer">
                  هذه طقوس مجانية تماماً بلا تكلفة (غروب، مشي هادئ، قراءة ممتعة...)
                </label>
              </div>

              {!isFree && (
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    تكلفة XP المطلوبة
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="5000"
                    value={costXP}
                    onChange={(e) => setCostXP(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>إضافة إلى خزانة المكافآت</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
