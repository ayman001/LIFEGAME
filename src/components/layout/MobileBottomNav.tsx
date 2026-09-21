'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRPG } from '@/context/RPGContext';
import {
  LayoutDashboard,
  CalendarCheck,
  Scroll,
  Coins,
  Crown,
  BarChart3,
  Award,
  MoreHorizontal,
  Briefcase
} from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { role } = useRPG();

  if (role === 'boss') {
    const bossItems = [
      { label: 'الرئيسة', href: '/boss', icon: Crown },
      { label: 'اللاعب', href: '/boss/player', icon: CalendarCheck },
      { label: 'الجوائز', href: '/boss/awards', icon: Award },
      { label: 'التقييم', href: '/boss/weekly-review', icon: BarChart3 }
    ];

    return (
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080b11]/95 backdrop-blur-lg border-t border-amber-500/20 px-2 py-2 flex items-center justify-around">
        {bossItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  const playerItems = [
    { label: 'الرئيسة', href: '/', icon: LayoutDashboard },
    { label: 'اليوم', href: '/today', icon: CalendarCheck },
    { label: 'الخطة', href: '/life-plan', icon: Briefcase },
    { label: 'المهام', href: '/quests', icon: Scroll },
    { label: 'الحرية', href: '/freedom-fund', icon: Coins },
    { label: 'المزيد', href: '/progress', icon: MoreHorizontal }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080b11]/95 backdrop-blur-lg border-t border-slate-800 px-1 py-1.5 flex items-center justify-around">
      {playerItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
              isActive
                ? 'text-purple-400 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
