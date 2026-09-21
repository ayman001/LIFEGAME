'use client';

import React from 'react';
import { Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';

export interface XpNotification {
  id: string;
  text: string;
  type: 'xp' | 'bonus' | 'boss' | 'miss';
}

interface Props {
  notifications: XpNotification[];
}

export default function XpParticleEffect({ notifications }: Props) {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 pointer-events-none flex flex-col gap-2">
      {notifications.map((n) => {
        const isMiss = n.type === 'miss';
        const isBoss = n.type === 'boss';
        const isBonus = n.type === 'bonus';

        return (
          <div
            key={n.id}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border backdrop-blur-md shadow-2xl animate-float-fade font-bold tracking-wide transition-all ${
              isMiss
                ? 'bg-rose-950/80 border-rose-500/40 text-rose-400'
                : isBoss
                ? 'bg-amber-950/90 border-amber-500/50 text-amber-300 shadow-amber-500/20'
                : isBonus
                ? 'bg-purple-950/90 border-purple-500/50 text-purple-300 shadow-purple-500/20'
                : 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300 shadow-emerald-500/20'
            }`}
          >
            {isBoss ? (
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            ) : isMiss ? (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            ) : (
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            )}
            <span className="text-sm font-black">{n.text}</span>
          </div>
        );
      })}
    </div>
  );
}
