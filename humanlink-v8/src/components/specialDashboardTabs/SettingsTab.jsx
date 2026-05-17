import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Calendar, MapPin, Edit3, Save, X, 
  BadgeCheck, ShieldCheck, Briefcase, Info 
} from 'lucide-react';

// الخيارات الثابتة
const GOVERNORATES = ['Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Mafraq', 'Jarash', 'Madaba', 'Ajloun', 'Karak', 'Tafilah', 'Ma\'an', 'Balqa'];
const ALL_SKILLS = ['Teaching', 'Design', 'Translation', 'Coding', 'React', 'Python', 'Photography', 'Writing', 'Marketing', 'Counseling', 'Medical', 'Arabic', 'English', 'French', 'Logistics', 'Research', 'Excel', 'Figma', 'Coaching', 'Sports', 'Cooking', 'Driving', 'Carpentry', 'Gardening'];

export default function SettingsTab({ isDark, cardBg, subText }) {
  // حالة التعديل (View vs Edit)
  const [isEditing, setIsEditing] = useState(false);

  // البيانات الأساسية المحفوظة (المصدر)
  const [profileData, setProfileData] = useState({
    fullName: 'Sara Al-Hassan',
    email: 'osama.budair04@gmail.com',
    birthdate: '1998-05-15',
    governorate: 'Amman',
    bio: 'Passionate about education and youth empowerment.',
    skills: ['Teaching', 'Design', 'Translation'],
    memberId: '#61082'
  });

  // البيانات المؤقتة (أثناء الكتابة وقبل الحفظ)
  const [tempData, setTempData] = useState({ ...profileData });

  // دالة تشغيل التعديل
  const startEditing = () => {
    setTempData({ ...profileData }); // نسخ البيانات الحالية للمسودة
    setIsEditing(true);
  };

  // دالة الإلغاء
  const handleCancel = () => {
    setTempData({ ...profileData }); // إعادة المسودة كما كانت
    setIsEditing(false);
  };

  // دالة الحفظ
  const handleSave = () => {
    setProfileData({ ...tempData }); // اعتماد المسودة كبيانات أساسية
    setIsEditing(false);
    // هنا يمكن إضافة تنبيه نجاح
  };

  // دالة تعديل المهارات (Toggle)
  const toggleSkill = (skill) => {
    if (!isEditing) return;
    const currentSkills = tempData.skills.includes(skill)
      ? tempData.skills.filter(s => s !== skill)
      : [...tempData.skills, skill];
    setTempData({ ...tempData, skills: currentSkills });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-6xl mx-auto">
      
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* ── 1. Left Sidebar (User Card) ── */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`p-8 rounded-3xl border flex flex-col items-center text-center shadow-sm ${cardBg}`}>
            {/* Avatar */}
            <div className="w-32 h-32 rounded-3xl bg-[#153147] flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg">
              SA
            </div>
            
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#153147]'}`}>{profileData.fullName}</h3>
            <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${subText}`}>VOLUNTEER</p>

            <div className="w-full space-y-4 pt-6 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between text-sm">
                <span className={`flex items-center gap-2 ${subText}`}><User size={14}/> Member ID</span>
                <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{profileData.memberId}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={`flex items-center gap-2 ${subText}`}><MapPin size={14}/> Governorate</span>
                <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{profileData.governorate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={`flex items-center gap-2 ${subText}`}><Calendar size={14}/> Age</span>
                <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>26</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {profileData.skills.slice(0, 3).map(skill => (
                <span key={skill} className="px-3 py-1 rounded-full border border-slate-200 text-[10px] font-bold text-slate-500">{skill}</span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-1 text-emerald-500 text-[11px] font-bold">
              <BadgeCheck size={14} /> Verified Member
            </div>
          </div>
        </div>

        {/* ── 2. Right Content (Form Area) ── */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-8 rounded-3xl border shadow-sm ${cardBg}`}>
            
            {/* Header with Edit/Save Buttons */}
            <div className="flex items-center justify-between mb-8">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#153147]'}`}>Profile Information</h2>
              
              {!isEditing ? (
                <button 
                  onClick={startEditing}
                  className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold border border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
                >
                  <Edit3 size={16} /> Edit
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-md"
                  >
                    <Save size={16} /> Save
                  </button>
                </div>
              )}
            </div>

            {/* Inputs Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${subText}`}>Full Name</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={isEditing ? tempData.fullName : profileData.fullName}
                  onChange={(e) => setTempData({ ...tempData, fullName: e.target.value })}
                  className={`w-full p-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500 disabled:opacity-50' : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-blue-500 disabled:bg-transparent disabled:border-transparent'}`}
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${subText}`}>Email</label>
                <input 
                  type="email" 
                  disabled={!isEditing}
                  value={isEditing ? tempData.email : profileData.email}
                  onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
                  className={`w-full p-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-blue-500 disabled:bg-transparent disabled:border-transparent'}`}
                />
              </div>

              {/* Birthdate */}
              <div className="space-y-1.5">
                <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${subText}`}>Date of Birth</label>
                <input 
                  type="date" 
                  disabled={!isEditing}
                  value={isEditing ? tempData.birthdate : profileData.birthdate}
                  onChange={(e) => setTempData({ ...tempData, birthdate: e.target.value })}
                  className={`w-full p-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-blue-500 disabled:bg-transparent disabled:border-transparent'}`}
                />
              </div>

              {/* Governorate */}
              <div className="space-y-1.5">
                <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${subText}`}>Governorate</label>
                <select 
                  disabled={!isEditing}
                  value={isEditing ? tempData.governorate : profileData.governorate}
                  onChange={(e) => setTempData({ ...tempData, governorate: e.target.value })}
                  className={`w-full p-3 rounded-xl border outline-none transition-all appearance-none ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-blue-500 disabled:bg-transparent disabled:border-transparent'}`}
                >
                  {GOVERNORATES.map(gov => <option key={gov} value={gov}>{gov}</option>)}
                </select>
              </div>
            </div>

            {/* Bio Area */}
            <div className="space-y-1.5 mb-8">
              <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${subText}`}>Bio</label>
              <textarea 
                disabled={!isEditing}
                rows="3"
                value={isEditing ? tempData.bio : profileData.bio}
                onChange={(e) => setTempData({ ...tempData, bio: e.target.value })}
                className={`w-full p-4 rounded-xl border outline-none transition-all resize-none ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-blue-500 disabled:bg-transparent disabled:border-transparent'}`}
              ></textarea>
            </div>

            {/* Skills Tags Area */}
            <div className="space-y-3">
              <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${subText}`}>Skills</label>
              <div className="flex flex-wrap gap-2">
                {ALL_SKILLS.map(skill => {
                  const isSelected = isEditing 
                    ? tempData.skills.includes(skill) 
                    : profileData.skills.includes(skill);
                  
                  return (
                    <button
                      key={skill}
                      disabled={!isEditing}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isSelected 
                        ? 'bg-blue-100 text-blue-600 border border-blue-200 shadow-sm scale-105' 
                        : 'bg-slate-50 text-slate-500 border border-slate-100 dark:bg-slate-800 dark:border-slate-700'
                      } ${isEditing ? 'hover:shadow-md cursor-pointer' : 'cursor-default'}`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}