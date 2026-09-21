'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRPG } from '@/context/RPGContext';
import { 
  Shield, 
  Crown, 
  UserCheck, 
  Lock, 
  Mail, 
  ArrowLeft
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useRPG();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'player' | 'boss'>('player');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setRole(selectedRole);
      setIsSubmitting(false);
      if (selectedRole === 'boss') {
        router.push('/boss');
      } else {
        router.push('/');
      }
    }, 400);
  };

  const handleDemoAccess = (roleToSet: 'player' | 'boss') => {
    setRole(roleToSet);
    if (roleToSet === 'boss') {
      router.push('/boss');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#06080d] flex flex-col justify-center items-center p-4 relative overflow-hidden text-right">
      
      {/* Background Ambience & Cyber Grid */}
      <div className="absolute inset-0 hud-grid opacity-30 pointer-events-none" />
      <div className="scanline" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Crest & Title */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-emerald-500 p-0.5 shadow-2xl shadow-purple-600/30 mb-4 animate-pulse-subtle">
            <div className="w-full h-full bg-[#0a0e1a] rounded-[14px] flex items-center justify-center">
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <span className="text-[11px] uppercase tracking-[0.2em] text-purple-400 font-extrabold block font-mono">
            نظام تشغيل الحياة الشخصي
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            لعبة الحياة
          </h1>
          <p className="text-xs sm:text-sm font-bold tracking-wider text-slate-400 uppercase mt-1">
            ارتقِ بمستواك في العالم الواقعي
          </p>
        </div>

        {/* Tactical Auth Box */}
        <div className="rounded-3xl bg-[#0b0f19]/90 border border-slate-800/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/80">
          
          {/* Role Selector Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800/80 mb-6">
            <button
              type="button"
              onClick={() => setSelectedRole('player')}
              className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                selectedRole === 'player'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>اللاعب (أنا)</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('boss')}
              className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                selectedRole === 'boss'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-amber-300'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>المشرف (الماستر)</span>
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={selectedRole === 'boss' ? 'boss@elitdigi.com' : 'ayman@elitdigi.com'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 transition-colors text-right"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                رمز المرور
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 transition-colors text-right"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 ${
                selectedRole === 'boss'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:brightness-110 text-slate-950 shadow-amber-500/20'
                  : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-500 hover:brightness-110 text-white shadow-purple-600/20'
              }`}
            >
              <span>{isSubmitting ? 'جاري تهيئة النظام...' : '[ الدخول إلى اللعبة ]'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>

          {/* Demo Mode Quick Access */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                الدخول التجريبي الفوري
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">نقرة واحدة</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoAccess('player')}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-500/30 text-purple-300 text-xs font-bold text-right transition-all"
              >
                <span className="block text-[10px] text-slate-500 font-mono">وضع اللاعب</span>
                أيمن (المستوى 7)
              </button>

              <button
                type="button"
                onClick={() => handleDemoAccess('boss')}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 text-xs font-bold text-right transition-all"
              >
                <span className="block text-[10px] text-slate-500 font-mono">وضع المشرف</span>
                إيلينا (الماستر)
              </button>
            </div>
          </div>

        </div>

        {/* Footer Principles */}
        <p className="text-center text-[11px] text-slate-400 mt-6 font-bold">
          نظام يكافئ الاستمرارية، لا المثالية. تفويت يوم لا يمسح نقاطك أو أهدافك أبداً.
        </p>

      </div>
    </div>
  );
}
