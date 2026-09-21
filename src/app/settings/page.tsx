'use client';

import React, { useState } from 'react';
import { useRPG } from '@/context/RPGContext';
import {
  Settings,
  Bell,
  Clock,
  Globe,
  MessageSquare,
  Shield,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Database,
  Volume2
} from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export default function SettingsPage() {
  const {
    playerProfile,
    notificationSettings,
    updateNotificationSettings,
    resetAllData
  } = useRPG();

  const [testSent, setTestSent] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'unsupported'
  );

  const handleRequestPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        setNotificationPermission(perm);
        if (perm === 'granted') {
          new Notification('LIFE RPG — LEVEL UP', {
            body: notificationSettings.reminderMessage,
            icon: '/icon.svg'
          });
          setTestSent(true);
          setTimeout(() => setTestSent(false), 3000);
        }
      } catch (err) {
        console.error('Error requesting notification permission', err);
      }
    }
  };

  const handleTestNotification = () => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('LIFE RPG — DIRECTIVE', {
        body: notificationSettings.reminderMessage,
        icon: '/icon.svg'
      });
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    } else {
      handleRequestPermission();
    }
  };

  const handleExportData = () => {
    const raw = localStorage.getItem('LIFE_RPG_STATE_V1');
    if (!raw) return;
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LIFE_RPG_BACKUP_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleReset = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في استعادة البيانات الافتراضية للمستوى 7؟')) {
      resetAllData();
      alert('تمت استعادة البيانات الافتراضية بنجاح.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-5 h-5 text-purple-400" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
            تفضيلات النظام
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          الإعدادات والإشعارات
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          إعداد إشعارات التذكير، تنبيهات المسؤولية، مزامنة قاعدة البيانات، والنسخ الاحتياطي للبيانات.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Browser Notifications Card */}
        <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <Bell className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold text-white">إشعارات المتصفح التلقائية</h3>
            </div>

            {/* Toggle switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.enabled}
                onChange={(e) => updateNotificationSettings({ enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
            </label>
          </div>

          {/* Permission Status */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-300 font-semibold block">حالة إذن المتصفح</span>
              <span className="text-[11px] font-mono text-slate-400 uppercase">
                {notificationPermission === 'granted' ? 'مفعل وممنوح' : notificationPermission === 'denied' ? 'مرفوض' : 'في انتظار الطلب'}
              </span>
            </div>

            {notificationPermission !== 'granted' ? (
              <button
                type="button"
                onClick={handleRequestPermission}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-sm"
              >
                طلب الإذن
              </button>
            ) : (
              <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                نشط
              </span>
            )}
          </div>

          {/* Schedule Settings */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                  وقت البدء اليومي
                </label>
                <input
                  type="time"
                  value={notificationSettings.startTime}
                  onChange={(e) => updateNotificationSettings({ startTime: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                  وقت الانتهاء
                </label>
                <input
                  type="time"
                  value={notificationSettings.endTime}
                  onChange={(e) => updateNotificationSettings({ endTime: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                  تكرار الإشعار
                </label>
                <select
                  value={notificationSettings.intervalMinutes}
                  onChange={(e) => updateNotificationSettings({ intervalMinutes: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                >
                  <option value={15}>كل 15 دقيقة</option>
                  <option value={30}>كل 30 دقيقة (افتراضي)</option>
                  <option value={60}>كل ساعة</option>
                  <option value={120}>كل ساعتين</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                  المنطقة الزمنية
                </label>
                <input
                  type="text"
                  value={notificationSettings.timezone}
                  disabled
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                نص رسالة التذكير
              </label>
              <input
                type="text"
                value={notificationSettings.reminderMessage}
                onChange={(e) => updateNotificationSettings({ reminderMessage: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="button"
              onClick={handleTestNotification}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <Bell className="w-3.5 h-3.5 text-purple-400" />
              <span>{testSent ? '✓ تم إرسال الإشعار التجريبي بنجاح' : 'إرسال إشعار تجريبي الآن'}</span>
            </button>
          </div>
        </div>

        {/* Database & Cloud Architecture */}
        <div className="rounded-3xl bg-[#0d131f] border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <Database className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">قاعدة البيانات السحابية والتخزين</h3>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">مزامنة سحابة Supabase</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                isSupabaseConfigured
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }`}>
                {isSupabaseConfigured ? 'متصل بالسحابة' : 'تخزين محلي سريع (نشط)'}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isSupabaseConfigured
                ? 'حسابك متصل بقاعدة بيانات Supabase PostgreSQL ومحمي بسياسات RLS على مستوى الصفوف.'
                : 'يعمل التطبيق حالياً بوضع التخزين المحلي فائق السرعة مع الحفظ الفوري في المتصفح. لربط قاعدة بيانات Supabase كاملة، قم بتعيين المفاتيح في ملف .env.local.'}
            </p>
          </div>

          {/* Backup & Data Management */}
          <div className="pt-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              تصدير البيانات والنسخ الاحتياطي
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleExportData}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>تصدير نسخة JSON</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-rose-950/40 border border-rose-900/40 text-rose-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <RotateCcw className="w-4 h-4 text-rose-400" />
                <span>استعادة الافتراضي</span>
              </button>
            </div>
          </div>

          {/* Profile Quick Summary */}
          <div className="pt-3 border-t border-slate-800">
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 font-mono text-[10px] uppercase block">الحساب النشط</span>
                <span className="text-white font-bold">{playerProfile.name} ({playerProfile.email})</span>
              </div>
              <span className="text-purple-400 font-mono font-bold">المستوى {playerProfile.level}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
