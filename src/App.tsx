/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import PublicView from './components/PublicView';
import AdminView from './components/AdminView';
import { ClubData } from './types';
import { Lock, Home } from 'lucide-react';

const defaultData: ClubData = {
  clubName: 'מועדון הכיף של ארי ויהונתן',
  welcomeTitle: 'ברוכים הבאים למועדון הכיף של ארי ויהונתן!',
  welcomeDescription: 'המקום הכי כיף בשכונה! אנחנו משחקים, יוצרים, רואים סרטים ועושים חיים.',
  announcement: 'ברוכים הבאים למועדון שלנו! ביום שלישי יש מסיבת פיצה!',
  heroImage: '',
  schedule: [
    { id: '0', dayName: 'ראשון', isOpen: true, hours: '16:00 - 18:00' },
    { id: '1', dayName: 'שני', isOpen: false, hours: '' },
    { id: '2', dayName: 'שלישי', isOpen: true, hours: '16:30 - 18:30' },
    { id: '3', dayName: 'רביעי', isOpen: false, hours: '' },
    { id: '4', dayName: 'חמישי', isOpen: true, hours: '16:00 - 19:00' },
    { id: '5', dayName: 'שישי', isOpen: false, hours: '' },
    { id: '6', dayName: 'שבת', isOpen: false, hours: '' },
  ],
  pricing: [
    { id: 'p1', title: 'כניסה חד-פעמית', price: '10 ₪', entries: 1 },
    { id: 'p2', title: 'כרטיסיית 5 כניסות', price: '40 ₪', entries: 5 },
    { id: 'p3', title: 'מנוי VIP חודשי', price: '100 ₪', entries: 999 },
  ],
  members: [
    { id: 'm1', name: 'נועם', planId: 'p2', paid: true, entriesLeft: 4 },
    { id: 'm2', name: 'מאיה', planId: 'p3', paid: false, entriesLeft: 999 },
  ]
};

export default function App() {
  const [view, setView] = useState<'public' | 'admin'>('public');
  const [data, setData] = useState<ClubData>(() => {
    const saved = localStorage.getItem('clubData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.clubName || parsed.clubName === 'מועדון החברים') parsed.clubName = 'מועדון הכיף של ארי ויהונתן';
        if (!parsed.welcomeTitle || parsed.welcomeTitle === 'ברוכים הבאים למועדון החברים!') parsed.welcomeTitle = 'ברוכים הבאים למועדון הכיף של ארי ויהונתן!';
        if (!parsed.welcomeDescription) parsed.welcomeDescription = defaultData.welcomeDescription;
        if (parsed.heroImage === undefined) parsed.heroImage = '';
        if (!parsed.schedule || parsed.schedule.length !== 7 || parsed.schedule[0].isOpen === undefined) {
          parsed.schedule = defaultData.schedule;
        }
        if (parsed.pricing && parsed.pricing.length > 0 && parsed.pricing[0].entries === undefined) {
          parsed.pricing = defaultData.pricing;
          parsed.members = defaultData.members;
        }
        return parsed;
      } catch (e) {
        return defaultData;
      }
    }
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('clubData', JSON.stringify(data));
  }, [data]);

  return (
    <div className="min-h-screen font-sans text-slate-800 pb-20">
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2 text-xl font-bold text-emerald-600">
          <span className="text-3xl">🎪</span>
          {data.clubName}
        </div>
        <button
          onClick={() => setView(view === 'public' ? 'admin' : 'public')}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium"
        >
          {view === 'public' ? (
            <>
              <Lock size={16} />
              אזור סודי (מנהל)
            </>
          ) : (
            <>
              <Home size={16} />
              חזרה למועדון
            </>
          )}
        </button>
      </nav>

      <main className="max-w-4xl mx-auto p-4 mt-6">
        {view === 'public' ? (
          <PublicView data={data} />
        ) : (
          <AdminView data={data} setData={setData} />
        )}
      </main>
    </div>
  );
}
