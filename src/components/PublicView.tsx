import { useState } from 'react';
import { ClubData } from '../types';
import { Calendar, Info, MessageCircle, Star, Search } from 'lucide-react';
import { motion } from 'motion/react';

export default function PublicView({ data }: { data: ClubData }) {
  const [searchName, setSearchName] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchName.trim()) {
      setSearched(true);
    }
  };

  const foundMember = data.members.find(m => m.name.trim() === searchName.trim());
  const memberPlan = foundMember ? data.pricing.find(p => p.id === foundMember.planId) : null;
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="text-center space-y-6 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 p-10 rounded-[3rem] shadow-[8px_8px_0px_0px_rgba(168,85,247,0.3)] border-4 border-purple-400 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 text-9xl opacity-20">🎈</div>
        <div className="absolute -bottom-10 -left-10 text-9xl opacity-20">🎨</div>
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">⭐</div>
        
        {data.heroImage && (
          <motion.img
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 3 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            src={data.heroImage}
            alt="תמונת המועדון"
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-[3rem] mx-auto border-8 border-white shadow-[8px_8px_0px_0px_rgba(168,85,247,0.4)] mb-8 transform hover:rotate-0 transition-transform duration-300"
          />
        )}

        <h1 className="text-5xl md:text-6xl font-black text-purple-800 tracking-tight drop-shadow-sm">
          {data.welcomeTitle}
        </h1>
        <p className="text-2xl text-purple-900 font-medium max-w-2xl mx-auto leading-relaxed">
          {data.welcomeDescription}
          <br/>
          <span className="inline-block mt-4 bg-purple-600 text-white px-6 py-2 rounded-full text-lg font-black shadow-md transform -rotate-2">
            מיועד לגילאי 4-9 🚀
          </span>
        </p>

        {data.announcement && (
          <motion.div 
            initial={{ rotate: -5 }}
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="mt-8 bg-amber-300 border-4 border-amber-500 text-amber-900 p-4 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(217,119,6,0.5)] max-w-xl mx-auto"
          >
            <Star className="text-amber-600 fill-amber-600 w-8 h-8" />
            {data.announcement}
            <Star className="text-amber-600 fill-amber-600 w-8 h-8" />
          </motion.div>
        )}
      </motion.section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Schedule */}
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-cyan-100 p-8 rounded-[2.5rem] shadow-[6px_6px_0px_0px_rgba(34,211,238,0.5)] border-4 border-cyan-400"
        >
          <h2 className="text-3xl font-black text-cyan-800 mb-6 flex items-center gap-3">
            <Calendar className="text-cyan-600 w-8 h-8" />
            מתי פתוח? ⏰
          </h2>
          <div className="space-y-4">
            {data.schedule.filter(item => item.isOpen).map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded-2xl border-2 border-cyan-200 shadow-sm">
                <span className="font-black text-cyan-900 text-xl">יום {item.dayName}</span>
                <span className="text-cyan-700 font-bold bg-cyan-50 px-4 py-2 rounded-xl border-2 border-cyan-100">{item.hours}</span>
              </div>
            ))}
            {data.schedule.filter(item => item.isOpen).length === 0 && (
              <p className="text-cyan-700 text-center py-4 font-bold text-lg">אין שעות פתיחה כרגע 😴</p>
            )}
          </div>
        </motion.section>

        {/* Pricing */}
        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-lime-100 p-8 rounded-[2.5rem] shadow-[6px_6px_0px_0px_rgba(163,230,53,0.5)] border-4 border-lime-400"
        >
          <h2 className="text-3xl font-black text-lime-800 mb-6 flex items-center gap-3">
            <Info className="text-lime-600 w-8 h-8" />
            כמה זה עולה? 💰
          </h2>
          <div className="space-y-4">
            {data.pricing.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded-2xl border-2 border-lime-200 shadow-sm">
                <div className="flex flex-col">
                  <span className="font-black text-lime-900 text-xl">{item.title}</span>
                  <span className="text-sm font-bold text-lime-600">{item.entries > 100 ? 'ללא הגבלה' : `${item.entries} כניסות`}</span>
                </div>
                <span className="text-lime-800 font-black text-2xl bg-lime-50 px-4 py-2 rounded-xl border-2 border-lime-100">{item.price}</span>
              </div>
            ))}
            {data.pricing.length === 0 && (
              <p className="text-lime-700 text-center py-4 font-bold text-lg">אין מחירון כרגע 🤷‍♂️</p>
            )}
          </div>
        </motion.section>
      </div>

      {/* Member Status Search */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-orange-100 p-8 rounded-[3rem] shadow-[8px_8px_0px_0px_rgba(251,146,60,0.5)] border-4 border-orange-400"
      >
        <h2 className="text-3xl font-black text-orange-800 mb-6 text-center flex items-center justify-center gap-3">
          <Search className="text-orange-600 w-8 h-8" />
          כמה כניסות נשארו לי? 🎟️
        </h2>
        <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-3">
          <input
            type="text"
            value={searchName}
            onChange={(e) => { setSearchName(e.target.value); setSearched(false); }}
            placeholder="הקלידו את השם שלכם כאן..."
            className="flex-1 p-4 rounded-2xl border-4 border-orange-200 focus:border-orange-500 focus:outline-none text-xl font-bold text-orange-900 placeholder-orange-300"
          />
          <button type="submit" className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-xl hover:bg-orange-600 transition-colors shadow-[4px_4px_0px_0px_rgba(194,65,12,0.5)] active:translate-y-1 active:shadow-none">
            בדוק!
          </button>
        </form>

        {searched && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-8 max-w-lg mx-auto bg-white p-8 rounded-[2rem] shadow-sm border-4 border-orange-200 text-center"
          >
            {foundMember ? (
              <div className="space-y-4">
                <h3 className="text-4xl font-black text-orange-600">היי {foundMember.name}! 👋</h3>
                <div className="inline-block bg-orange-100 text-orange-800 px-6 py-2 rounded-full text-lg font-bold mb-2 border-2 border-orange-200">
                  מסלול: {memberPlan ? memberPlan.title : 'לא ידוע'}
                </div>
                {foundMember.entriesLeft > 100 ? (
                  <p className="text-2xl font-black text-emerald-500 mt-6 animate-pulse">יש לך מנוי חופשי (VIP)! 🎉</p>
                ) : (
                  <div className="mt-6 bg-orange-50 p-6 rounded-3xl border-2 border-orange-100">
                    <p className="text-orange-800 font-bold text-xl">נשארו לך:</p>
                    <p className="text-7xl font-black text-orange-500 my-4 drop-shadow-md">{foundMember.entriesLeft}</p>
                    <p className="text-orange-800 font-bold text-xl">כניסות בכרטיסייה</p>
                  </div>
                )}
                {!foundMember.paid && (
                  <p className="text-lg text-red-500 mt-6 font-black bg-red-50 p-3 rounded-xl border-2 border-red-200">
                    * שים לב: המנוי עדיין לא שולם 💳
                  </p>
                )}
              </div>
            ) : (
              <p className="text-orange-800 font-bold text-xl bg-orange-50 p-6 rounded-3xl border-2 border-orange-100">
                לא מצאנו חבר בשם הזה 🕵️‍♂️<br/>נסו לבדוק שהשם כתוב נכון או בקשו מההורים לבדוק מול המנהל.
              </p>
            )}
          </motion.div>
        )}
      </motion.section>

      {/* Rules */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-rose-100 p-10 rounded-[3rem] shadow-[8px_8px_0px_0px_rgba(251,113,133,0.5)] border-4 border-rose-400"
      >
        <h2 className="text-4xl font-black text-rose-800 mb-8 text-center">חוקי המועדון שלנו 📜</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border-4 border-rose-200 text-center space-y-3 transform hover:-translate-y-2 transition-transform">
            <div className="text-6xl mb-4">🧹</div>
            <h3 className="font-black text-2xl text-rose-900">מסדרים ביחד</h3>
            <p className="text-lg text-rose-700 font-medium">בסוף כל משחק, מחזירים הכל למקום.</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border-4 border-rose-200 text-center space-y-3 transform hover:-translate-y-2 transition-transform">
            <div className="text-6xl mb-4">🗣️</div>
            <h3 className="font-black text-2xl text-rose-900">מדברים יפה</h3>
            <p className="text-lg text-rose-700 font-medium">מכבדים אחד את השני ומשתמשים במילים טובות.</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border-4 border-rose-200 text-center space-y-3 transform hover:-translate-y-2 transition-transform">
            <div className="text-6xl mb-4">🤝</div>
            <h3 className="font-black text-2xl text-rose-900">משתפים</h3>
            <p className="text-lg text-rose-700 font-medium">במועדון שלנו כולם חברים ומשחקים ביחד.</p>
          </div>
        </div>
      </motion.section>

      {/* Parents Area */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800 text-white p-10 rounded-[3rem] text-center space-y-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,0.5)] border-4 border-slate-700"
      >
        <h2 className="text-3xl font-black text-emerald-400">אזור להורים 👨‍👩‍👧‍👦</h2>
        <p className="text-xl text-slate-300 max-w-lg mx-auto font-medium">
          רוצים לרשום את הילד? יש לכם שאלות? אנחנו זמינים בוואטסאפ לכל דבר!
        </p>
        <a 
          href="https://wa.me/972500000000" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xl py-4 px-10 rounded-full transition-colors shadow-[4px_4px_0px_0px_rgba(16,185,129,0.5)] active:translate-y-1 active:shadow-none"
        >
          <MessageCircle className="w-8 h-8" />
          שלחו לנו הודעה
        </a>
      </motion.section>
    </div>
  );
}
