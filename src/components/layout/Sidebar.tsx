'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRPG } from '@/context/RPGContext';
import {
  LayoutDashboard,
  CalendarCheck,
  Scroll,
  Target,
  Trophy,
  Coins,
  BarChart3,
  TrendingUp,
  Gift,
  History,
  Settings,
  Crown,
  Award,
  Swords,
  ClipboardList,
  Briefcase
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useRPG();

  const playerNavItems = [
    { label: 'لوحة التحكم',      href: '/',              icon: LayoutDashboard },
    { label: 'تركيز اليوم',      href: '/today',         icon: CalendarCheck },
    { label: 'خطة الحياة',       href: '/life-plan',     icon: Briefcase },
    { label: 'المهام اليومية',   href: '/quests',        icon: Scroll },
    { label: 'أهداف الحياة',     href: '/goals',         icon: Target },
    { label: 'سجل الإنجازات',    href: '/achievements',  icon: Trophy },
    { label: 'صندوق الحرية',     href: '/freedom-fund',  icon: Coins },
    { label: 'التقرير الأسبوعي', href: '/weekly',        icon: BarChart3 },
    { label: 'مؤشرات التقدم',    href: '/progress',      icon: TrendingUp },
    { label: 'المكافآت',         href: '/rewards',       icon: Gift },
    { label: 'سجل الأفعال',      href: '/activity',      icon: History },
    { label: 'الإعدادات',        href: '/settings',      icon: Settings },
  ];

  const bossNavItems = [
    { label: 'نظرة عامة',     href: '/boss',                 icon: Crown },
    { label: 'تدقيق اللاعب',  href: '/boss/player',          icon: ClipboardList },
    { label: 'منح XP',        href: '/boss/awards',          icon: Award },
    { label: 'التحديات',       href: '/boss/challenges',      icon: Swords },
    { label: 'التقييم',       href: '/boss/weekly-review',   icon: BarChart3 },
  ];

  const items = role === 'boss' ? bossNavItems : playerNavItems;

  return (
    <aside className="hidden lg:flex flex-col w-56 border-l border-white/[0.04] bg-[#06090f] pt-6 pb-8 px-3 shrink-0 min-h-[calc(100vh-3.5rem)]">
      
      {/* Role pill */}
      <div className={`mb-5 px-3 py-2 rounded-2xl ${
        role === 'boss' ? 'bg-amber-950/20 border border-amber-900/40' : 'bg-violet-950/20 border border-violet-900/30'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
            role === 'boss' ? 'text-amber-400' : 'text-violet-400'
          }`}>
            {role === 'boss' ? 'وضع المشرف' : 'وضع اللاعب'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Nav */}
      <nav className="space-y-0.5 flex-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${
                isActive
                  ? role === 'boss'
                    ? 'bg-amber-500/15 text-amber-300 font-semibold'
                    : 'bg-violet-600/15 text-violet-300 font-semibold'
                  : 'text-[#64748b] hover:text-[#cbd5e1] hover:bg-white/[0.04]'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${
                isActive
                  ? role === 'boss' ? 'text-amber-400' : 'text-violet-400'
                  : 'text-[#475569]'
              }`} />
              <span>{item.label}</span>
              {isActive && (
                <div className={`mr-auto w-1 h-1 rounded-full ${role === 'boss' ? 'bg-amber-400' : 'bg-violet-400'}`} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom quote */}
      <div className="mt-auto pt-4 border-t border-white/[0.04]">
        <p className="text-[11px] text-[#334155] italic leading-relaxed px-1">
          {role === 'boss'
            ? 'كافئ الاستمرارية، تحقق من المخرجات.'
            : '«لا تَبِع مستقبلك من أجل لحظة عابرة.»'}
        </p>
      </div>
    </aside>
  );
}
