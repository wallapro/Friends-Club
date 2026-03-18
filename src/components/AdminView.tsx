import { useState } from 'react';
import { ClubData } from '../types';
import { motion } from 'motion/react';
import { Settings, Users, Megaphone, Plus, Trash2, Check, X, CalendarDays, Tag } from 'lucide-react';

export default function AdminView({ data, setData }: { data: ClubData, setData: (d: ClubData) => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState<{type: 'member'|'pricing', id: string} | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'שלומיזורבה') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('סיסמה שגויה.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-sm mx-auto mt-20 bg-white p-8 rounded-3xl shadow-sm border-2 border-slate-100 text-center">
        <div className="text-6xl mb-6">🕵️‍♂️</div>
        <h2 className="text-2xl font-bold mb-2">אזור סודי</h2>
        <p className="text-slate-500 mb-6">הכנס סיסמה כדי לנהל את המועדון</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="סיסמה..."
            className="w-full text-center text-2xl tracking-widest p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 transition-colors">
            כניסה
          </button>
        </form>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="bg-slate-800 text-white p-6 rounded-3xl flex items-center gap-4">
        <div className="p-3 bg-slate-700 rounded-2xl">
          <Settings size={32} className="text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">לוח בקרה למנהל</h1>
          <p className="text-slate-400">כאן מנהלים את כל העניינים של המועדון</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* CMS Section */}
        <div className="space-y-8">
          {/* Club Name & Welcome */}
          <section className="bg-white p-6 rounded-3xl shadow-sm border-2 border-slate-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Settings className="text-slate-500" />
              הגדרות עמוד הבית
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">שם המועדון (מופיע למעלה)</label>
                <input
                  type="text"
                  value={data.clubName}
                  onChange={(e) => setData({ ...data, clubName: e.target.value })}
                  className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none font-bold text-lg"
                  placeholder="איך קוראים למועדון?"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">כותרת ראשית</label>
                <input
                  type="text"
                  value={data.welcomeTitle}
                  onChange={(e) => setData({ ...data, welcomeTitle: e.target.value })}
                  className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none font-bold text-lg"
                  placeholder="למשל: ברוכים הבאים למועדון החברים!"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">תיאור המועדון</label>
                <textarea
                  value={data.welcomeDescription}
                  onChange={(e) => setData({ ...data, welcomeDescription: e.target.value })}
                  className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none h-24"
                  placeholder="למשל: המקום הכי כיף בשכונה! אנחנו משחקים, יוצרים..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">תמונה ראשית (תמונת המועדון)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setData({ ...data, heroImage: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
                {data.heroImage && (
                  <div className="mt-4 relative inline-block">
                    <img src={data.heroImage} alt="Preview" className="h-32 w-32 object-cover rounded-2xl border-4 border-slate-200 shadow-sm" />
                    <button 
                      onClick={() => setData({ ...data, heroImage: '' })}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-sm"
                      title="הסר תמונה"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Announcement */}
          <section className="bg-white p-6 rounded-3xl shadow-sm border-2 border-slate-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Megaphone className="text-amber-500" />
              הודעה חשובה
            </h2>
            <textarea
              value={data.announcement}
              onChange={(e) => setData({ ...data, announcement: e.target.value })}
              className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none h-24"
              placeholder="מה תרצה לספר לכולם?"
            />
          </section>

          {/* Schedule */}
          <section className="bg-white p-6 rounded-3xl shadow-sm border-2 border-slate-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CalendarDays className="text-blue-500" />
              ימי פתיחה ושעות
            </h2>
            <div className="space-y-3">
              {data.schedule.map((item, index) => (
                <div key={item.id} className={`flex gap-3 items-center p-3 rounded-xl border-2 transition-colors ${item.isOpen ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100'}`}>
                  <input
                    type="checkbox"
                    checked={item.isOpen}
                    onChange={(e) => {
                      const newSchedule = [...data.schedule];
                      newSchedule[index].isOpen = e.target.checked;
                      setData({ ...data, schedule: newSchedule });
                    }}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className={`w-16 font-bold ${item.isOpen ? 'text-blue-900' : 'text-slate-400'}`}>
                    {item.dayName}
                  </span>
                  <input
                    type="text"
                    value={item.hours}
                    disabled={!item.isOpen}
                    onChange={(e) => {
                      const newSchedule = [...data.schedule];
                      newSchedule[index].hours = e.target.value;
                      setData({ ...data, schedule: newSchedule });
                    }}
                    placeholder={item.isOpen ? "שעות (למשל 16:00-18:00)" : "סגור"}
                    className={`flex-1 p-2 rounded-lg border-2 focus:outline-none ${item.isOpen ? 'bg-white border-blue-200 focus:border-blue-500' : 'bg-slate-100 border-transparent text-slate-400'}`}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Pricing */}
          <section className="bg-white p-6 rounded-3xl shadow-sm border-2 border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Tag className="text-purple-500" />
                מחירון ומסלולים
              </h2>
              <button 
                onClick={() => setData({
                  ...data, 
                  pricing: [...data.pricing, { id: Date.now().toString(), title: 'מסלול חדש', price: '0 ₪', entries: 1 }]
                })}
                className="text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-sm font-bold"
              >
                <Plus size={16} /> הוסף מסלול
              </button>
            </div>
            <div className="space-y-3">
              {data.pricing.map((item, index) => (
                <div key={item.id} className="flex flex-wrap gap-2 items-center bg-slate-50 p-3 rounded-xl border-2 border-slate-100 relative group">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const newPricing = [...data.pricing];
                      newPricing[index].title = e.target.value;
                      setData({ ...data, pricing: newPricing });
                    }}
                    placeholder="שם המסלול..."
                    className="flex-1 min-w-[120px] p-2 bg-white border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.price}
                    onChange={(e) => {
                      const newPricing = [...data.pricing];
                      newPricing[index].price = e.target.value;
                      setData({ ...data, pricing: newPricing });
                    }}
                    placeholder="מחיר..."
                    className="w-24 p-2 bg-white border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                  <div className="flex items-center gap-2 bg-white border-2 border-slate-200 rounded-lg p-2 focus-within:border-purple-500">
                    <span className="text-xs text-slate-500 font-bold">כניסות:</span>
                    <input
                      type="number"
                      value={item.entries}
                      onChange={(e) => {
                        const newPricing = [...data.pricing];
                        newPricing[index].entries = parseInt(e.target.value) || 0;
                        setData({ ...data, pricing: newPricing });
                      }}
                      className="w-16 outline-none bg-transparent"
                      min="1"
                    />
                  </div>
                  <button 
                    onClick={() => setDeleteModal({ type: 'pricing', id: item.id })}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                    title="מחק מסלול"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {data.pricing.length === 0 && (
                <p className="text-slate-500 text-center py-4">לא הוגדרו מסלולים</p>
              )}
            </div>
          </section>
        </div>

        {/* Members Section */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border-2 border-slate-100 h-fit sticky top-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="text-blue-500" />
              ניהול חברים
            </h2>
            <button 
              onClick={() => {
                const defaultPlan = data.pricing[0];
                setData({
                  ...data, 
                  members: [...data.members, { 
                    id: Date.now().toString(), 
                    name: 'חבר חדש', 
                    planId: defaultPlan ? defaultPlan.id : '', 
                    paid: false, 
                    entriesLeft: defaultPlan ? defaultPlan.entries : 0 
                  }]
                })
              }}
              className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-1"
            >
              <Plus size={16} />
              הוסף ילד
            </button>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {data.members.map((member, index) => {
              const currentPlan = data.pricing.find(p => p.id === member.planId);
              const isUnlimited = member.entriesLeft > 100;

              return (
                <div key={member.id} className="p-4 border-2 border-slate-100 rounded-2xl space-y-3 bg-slate-50">
                  <div className="flex justify-between items-start">
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => {
                        const newMembers = [...data.members];
                        newMembers[index].name = e.target.value;
                        setData({ ...data, members: newMembers });
                      }}
                      className="font-bold text-lg bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none w-1/2"
                      placeholder="שם הילד..."
                    />
                    <button 
                      onClick={() => setDeleteModal({ type: 'member', id: member.id })}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 items-center text-sm">
                    <select
                      value={member.planId}
                      onChange={(e) => {
                        const newPlanId = e.target.value;
                        const selectedPlan = data.pricing.find(p => p.id === newPlanId);
                        const newMembers = [...data.members];
                        newMembers[index].planId = newPlanId;
                        if (selectedPlan) {
                          newMembers[index].entriesLeft = selectedPlan.entries;
                        }
                        setData({ ...data, members: newMembers });
                      }}
                      className="bg-white p-1.5 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none max-w-[160px] truncate font-medium"
                    >
                      <option value="" disabled>בחר מסלול...</option>
                      {data.pricing.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => {
                        const newMembers = [...data.members];
                        newMembers[index].paid = !member.paid;
                        setData({ ...data, members: newMembers });
                      }}
                      className={`flex items-center gap-1 px-2 py-1.5 rounded-lg font-bold transition-colors ${
                        member.paid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {member.paid ? <Check size={14} /> : <X size={14} />}
                      {member.paid ? 'שילם' : 'לא שילם'}
                    </button>
                  </div>

                  {currentPlan && !isUnlimited && (
                    <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border-2 border-slate-100 mt-2">
                      <span className="text-sm font-bold text-slate-600">
                        כניסות נותרו: <span className={`text-lg ${member.entriesLeft === 0 ? 'text-red-500' : 'text-blue-600'}`}>{member.entriesLeft}</span>
                      </span>
                      <button
                        onClick={() => {
                          const newMembers = [...data.members];
                          if (newMembers[index].entriesLeft > 0) {
                            newMembers[index].entriesLeft--;
                            setData({ ...data, members: newMembers });
                          }
                        }}
                        disabled={member.entriesLeft === 0}
                        className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors shadow-sm"
                      >
                        סמן כניסה
                      </button>
                    </div>
                  )}
                  {currentPlan && isUnlimited && (
                    <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border-2 border-slate-100 mt-2">
                      <span className="text-sm font-bold text-slate-600">
                        כניסות: <span className="text-purple-600">ללא הגבלה (VIP)</span>
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
            {data.members.length === 0 && (
              <p className="text-center text-slate-500 py-8">עדיין אין חברים רשומים</p>
            )}
          </div>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-xl">
            <h3 className="text-xl font-bold text-slate-800">האם אתה בטוח?</h3>
            <p className="text-slate-600">
              {deleteModal.type === 'member' 
                ? 'האם למחוק את החבר הזה מהרשימה?' 
                : 'האם למחוק מסלול זה? שים לב שזה עשוי להשפיע על חברים שרשומים אליו.'}
            </p>
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => {
                  if (deleteModal.type === 'member') {
                    setData({ ...data, members: data.members.filter(m => m.id !== deleteModal.id) });
                  } else {
                    setData({ ...data, pricing: data.pricing.filter(p => p.id !== deleteModal.id) });
                  }
                  setDeleteModal(null);
                }}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
              >
                כן, מחק
              </button>
              <button 
                onClick={() => setDeleteModal(null)}
                className="flex-1 bg-slate-100 text-slate-800 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
