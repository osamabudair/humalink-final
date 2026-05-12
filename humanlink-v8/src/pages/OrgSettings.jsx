import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Building, Mail, Phone, Shield, 
  Key, Trash2, Loader2, CheckCircle2, MapPin, User
} from 'lucide-react';

// استيراد أدوات السياق الخاصة بمشروعك (تأكد من صحة المسارات)
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import { initials } from '../utils';
import Navbar from '../components/Navbar';

export default function OrgSettings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, isRtl } = useLang();
  const { isDark } = useTheme();
  
  // ── States (الحالات) ──
  const [isSavingInfo, setIsSavingInfo] = useState(false);
  const [isSavingPass, setIsSavingPass] = useState(false);
  
  // جلب بيانات المنظمة من المستخدم الحالي (أو وضع بيانات افتراضية)
  const [orgInfo, setOrgInfo] = useState({
    name: user?.name || 'HumaLink NGO',
    email: user?.email || 'contact@humalink.org',
    phone: '+962 79 123 4567',
  });

  const [admins, setAdmins] = useState([
    { id: 1, name: 'Ahmad Mahmoud', email: 'ahmad@humalink.org', role: 'Super Admin' },
    { id: 2, name: 'Sara Nabil', email: 'sara@humalink.org', role: 'Editor' }
  ]);

  // ── Theme Variables (متغيرات التصميم الخاصة بمشروعك) ──
  const bg       = isDark ? 'bg-[#0f172a] text-white' : 'bg-slate-50 text-slate-900';
  const cardBg   = isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200 shadow-sm';
  const inputCls = `w-full border rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all ${isDark ? 'bg-slate-800/40 border-slate-700 text-white placeholder-gray-600 focus:border-blue-500/50' : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-400 shadow-sm'}`;
  const labelCls = `block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-slate-400'}`;
  const subText  = isDark ? 'text-gray-400' : 'text-slate-500';

  // ── Guest Check (حماية الصفحة) ──
  if (!user) return (
    <div className={`min-h-screen flex items-center justify-center ${bg}`}>
      <Navbar />
      <div className="text-center mt-20">
        <Shield size={48} className={`mx-auto mb-4 ${isDark ? 'text-slate-400' : 'text-slate-300'}`} />
        <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          {t('prof_signin_req') || 'Sign in required to view settings.'}
        </h2>
        <button 
          onClick={() => navigate('/login')}
          className="px-6 py-3 hover:opacity-90 text-white rounded-xl font-medium transition-all" 
          style={{ background: '#153147' }}
        >
          {t('prof_signin_btn') || 'Sign In Now'}
        </button>
      </div>
    </div>
  );

  // ── Handlers (دوال التحميل الوهمية) ──
  const handleSaveInfo = () => {
    setIsSavingInfo(true);
    setTimeout(() => setIsSavingInfo(false), 1500);
  };

  const handleSavePassword = () => {
    setIsSavingPass(true);
    setTimeout(() => setIsSavingPass(false), 1500);
  };

  const removeAdmin = (id) => {
    setAdmins(admins.filter(a => a.id !== id));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bg}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* ── Top Navbar الحقيقي الخاص بمشروعك ── */}
      <Navbar />

      {/* ── Main Content ── */}
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        
        {/* زر العودة للوحة التحكم */}
        <button 
          onClick={() => navigate('/org-dashboard')}
          className={`flex items-center gap-2 text-sm mb-8 transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-slate-400 hover:text-slate-800'}`}
        >
          <ArrowLeft size={16} /> {t('prof_back') || 'Back to Organization Dashboard'}
        </button>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          
          {/* ── العمود الأيسر: البطاقة التعريفية (Sidebar Profile Card) ── */}
          <motion.aside initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
            className={`p-6 rounded-3xl border flex flex-col items-center gap-5 self-start sticky top-28 ${cardBg}`}
          >
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-2xl font-bold text-white overflow-hidden border-2 border-[#153147]/20" style={{background:'#153147'}}>
              {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt="Org Avatar" /> : initials(orgInfo.name)}
            </div>
              
            <div className="text-center">
              <h2 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{orgInfo.name}</h2>
              <span className={`inline-block mt-2 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-lg ${isDark ? 'text-[#153147] dark:text-slate-300 bg-blue-500/10' : 'text-[#153147] bg-blue-50'}`}>
                {user?.role || 'Organization'}
              </span>
            </div>

            <div className={`w-full rounded-2xl p-4 space-y-3 ${isDark ? 'bg-slate-800/40' : 'bg-slate-50'}`}>
              <div className="flex items-center gap-2.5">
                <User size={14} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                <span className={`text-xs flex-1 ${subText}`}>Org ID</span>
                <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-700'}`}>#{user?.userId || '99502'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={14} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                <span className={`text-xs flex-1 ${subText}`}>Location</span>
                <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-700'}`}>{user?.governorate || 'Amman'}</span>
              </div>
            </div>

            <div className="w-full text-emerald-500 text-xs font-semibold flex items-center justify-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-700/50">
              <CheckCircle2 size={14} /> Verified Organization
            </div>
          </motion.aside>

          {/* ── العمود الأيمن: نماذج التعديل (Edit Forms) ── */}
          <div className="space-y-6">
            
            {/* 1. Profile Information */}
            <motion.main initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
              className={`p-7 rounded-3xl border ${cardBg}`}
            >
              <h3 className={`text-lg font-bold mb-7 ${isDark ? 'text-white' : 'text-slate-800'}`}>Organization Information</h3>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Organization Name</label>
                  <div className="relative">
                    <Building size={16} className={`absolute left-3 top-3.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input type="text" value={orgInfo.name} onChange={(e) => setOrgInfo({...orgInfo, name: e.target.value})} className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Official Email</label>
                  <div className="relative">
                    <Mail size={16} className={`absolute left-3 top-3.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input type="email" value={orgInfo.email} onChange={(e) => setOrgInfo({...orgInfo, email: e.target.value})} className={inputCls} />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className={labelCls}>Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className={`absolute left-3 top-3.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input type="text" value={orgInfo.phone} onChange={(e) => setOrgInfo({...orgInfo, phone: e.target.value})} className={inputCls} />
                  </div>
                </div>
              </div>

              <div className="mt-7 flex justify-end">
                <button 
                  onClick={handleSaveInfo} disabled={isSavingInfo} 
                  className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all disabled:opacity-70"
                >
                  {isSavingInfo ? <Loader2 size={14} className="animate-spin" /> : null} 
                  {isSavingInfo ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.main>

            {/* 2. Manage Admins */}
            <motion.section initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
              className={`p-7 rounded-3xl border ${cardBg}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Manage Admins</h3>
                <button className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${isDark ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
                  + Add Admin
                </button>
              </div>

              <div className="space-y-3">
                {admins.length > 0 ? (
                  admins.map(admin => (
                    <div key={admin.id} className={`p-4 rounded-2xl border flex items-center justify-between transition-colors ${isDark ? 'bg-slate-800/40 border-slate-700 hover:border-slate-600' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                          {initials(admin.name)}
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{admin.name}</p>
                          <p className={`text-xs mt-0.5 ${subText}`}>{admin.role} • {admin.email}</p>
                        </div>
                      </div>
                      <button onClick={() => removeAdmin(admin.id)} className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" title="Remove Admin">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  /* ── Empty State ── */
                  <div className={`text-center py-10 rounded-2xl border border-dashed ${isDark ? 'border-slate-700 bg-slate-800/20' : 'border-slate-300 bg-slate-50'}`}>
                    <Shield size={32} className={`mx-auto mb-3 ${isDark ? 'text-slate-500' : 'text-slate-300'}`} />
                    <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-600'}`}>No admins assigned</p>
                    <p className={`text-xs mt-1 ${subText}`}>Click "+ Add Admin" to grant access to your team.</p>
                  </div>
                )}
              </div>
            </motion.section>

            {/* 3. Change Password */}
            <motion.section initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
              className={`p-7 rounded-3xl border ${cardBg}`}
            >
              <h3 className={`text-lg font-bold mb-7 ${isDark ? 'text-white' : 'text-slate-800'}`}>Security & Password</h3>
              
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Current Password</label>
                  <div className="relative">
                    <Key size={16} className={`absolute left-3 top-3.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input type="password" placeholder="••••••••" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>New Password</label>
                  <div className="relative">
                    <Key size={16} className={`absolute left-3 top-3.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input type="password" placeholder="••••••••" className={inputCls} />
                  </div>
                </div>
              </div>

              <div className="mt-7 flex justify-end">
                <button 
                  onClick={handleSavePassword} disabled={isSavingPass} 
                  className={`flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold rounded-xl border transition-all disabled:opacity-70 ${isDark ? 'text-gray-400 bg-slate-800/40 border-slate-700 hover:text-white' : 'text-slate-600 bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
                >
                  {isSavingPass ? <Loader2 size={14} className="animate-spin" /> : null} 
                  {isSavingPass ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </motion.section>

          </div>
        </div>
      </div>
    </div>
  );
}