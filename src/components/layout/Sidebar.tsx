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
    { label: 'لوحة التحكم', href: '/', icon: LayoutDashboard },
    { label: 'تركيز اليوم', href: '/today', icon: CalendarCheck },
    { label: 'خطة الحياة (Deadlines)', href: '/life-plan', icon: Briefcase },
    { label: 'المهام اليومية', href: '/quests', icon: Scroll },
    { label: 'أهداف الحياة', href: '/goals', icon: Target },
    { label: 'سجل الإنجازات', href: '/achievements', icon: Trophy },
    { label: 'صندوق الحرية', href: '/freedom-fund', icon: Coins },
    { label: 'التقرير الأسبوعي', href: '/weekly', icon: BarChart3 },
    { label: 'مؤشرات التقدم', href: '/progress', icon: TrendingUp },
    { label: 'خزانة المكافآت', href: '/rewards', icon: Gift },
    { label: 'سجل الأفعال', href: '/activity', icon: History },
    { label: 'الإعدادات والتنبيهات', href: '/settings', icon: Settings },
  ];

  const bossNavItems = [
    { label: 'نظرة عامة للمشرف', href: '/boss', icon: Crown },
    { label: 'تدقيق أفعال اللاعب', href: '/boss/player', icon: ClipboardList },
    { label: 'منح نقاط المشرف XP', href: '/boss/awards', icon: Award },
    { label: 'إصدار التحديات', href: '/boss/challenges', icon: Swords },
    { label: 'التقييم الأسبوعي', href: '/boss/weekly-review', icon: BarChart3 },
  ];

  const items = role === 'boss' ? bossNavItems : playerNavItems;

  return (
    <aside className="hidden lg:flex flex-col w-64 border-l border-slate-800/80 bg-[#080b11] p-4 shrink-0 min-h-[calc(100vh-4rem)]">
      
      {/* Role Banner */}
      <div className={`mb-6 p-3 rounded-2xl border ${
        role === 'boss' 
          ? 'bg-amber-950/20 border-amber-500/30' 
          : 'bg-purple-950/20 border-purple-500/30'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
            role === 'boss' ? 'text-amber-400' : 'text-purple-400'
          }`}>
            {role === 'boss' ? 'وضع المشرف والمساءلة' : 'نظام اللاعب اليومي'}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <p className="text-xs text-slate-300 font-bold mt-1">
          {role === 'boss' ? 'مركز قيادة المساءلة والتوجيه' : 'أيمن • مسار الانضباط الذاتي'}
        </p>
      </div>

      {/* Nav List */}
      <nav className="space-y-1.5 flex-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? role === 'boss'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? (role === 'boss' ? 'text-slate-950' : 'text-white') : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Motivation / Boss Pin */}
      <div className="mt-auto pt-4 border-t border-slate-800/80">
        <div className="p-3 rounded-2xl bg-slate-900/40 border border-slate-800">
          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wide font-bold">
            {role === 'boss' ? 'توجيه المشرف' : 'مبدأ اليوم'}
          </p>
          <p className="text-xs text-slate-300 italic mt-1 leading-relaxed">
            {role === 'boss'
              ? 'كافئ الاستمرارية، تحقق من المخرجات الواقعية، وشجع المعايير العالية دائماً.'
              : '«لا تَبِع مستقبلك من أجل لحظة عابرة.»'}
          </p>
        </div>
      </div>
    </aside>
  );
}
