import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { RPGProvider } from '@/context/RPGContext';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import CelebrationModal from '@/components/ui/CelebrationModal';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'لعبة الحياة — ارتقِ بمستواك | LIFE RPG',
  description: 'نظام تشغيل شخصي ولعبة RPG لتحويل حياتك الحقيقية إلى رحلة ارتقاء مستمرة في الإيمان، الصحة، العمل، المال، والحرية.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#080b11',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${geistSans.variable} ${geistMono.variable} dark h-full`}>
      <body className="bg-[#080b11] text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-purple-500 selection:text-white text-right">
        <RPGProvider>
          <Navbar />
          <div className="flex flex-1 max-w-7xl w-full mx-auto">
            <Sidebar />
            <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
              {children}
            </main>
          </div>
          <MobileBottomNav />
          <CelebrationModal />
        </RPGProvider>
      </body>
    </html>
  );
}
