import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, MapPin, Calendar, Camera, Save, Edit3, ArrowLeft,
  BadgeCheck, Shield, CheckCircle2, Clock, XCircle, Briefcase
} from 'lucide-react';
import { useAuth }  from '../context/AuthContext';
import { useLang }  from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import { initials, calcAge, formatDate } from '../utils';
import Navbar from '../components/Navbar';

const GOVERNORATES = [
  'Amman','Zarqa','Irbid','Aqaba','Karak','Madaba','Jerash','Ajloun','Mafraq','Tafilah','Ma\'an','Balqa'
];

const ALL_SKILLS = [
  'Teaching','Design','Translation','Coding','React','Python','Photography','Writing',
  'Marketing','Counseling','Medical','Arabic','English','French','Logistics','Research',
  'Excel','Figma','Coaching','Sports','Cooking','Driving','Carpentry','Gardening',
];

function StatusBadge({ status, t }) {
  const config = {
    accepted: { icon: CheckCircle2, label: t('prof_status_accepted'), cls: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' },
    pending:  { icon: Clock,        label: t('prof_status_pending'),  cls: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20' },
    rejected: { icon: XCircle,      label: t('prof_status_rejected'), cls: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' },
  };
  const { icon: Icon, label, cls } = config[status] || config.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${cls}`}>
      <Icon size={11} /> {label}
    </span>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const { t, isRtl }            = useLang();
  const { isDark }              = useTheme();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name:        user?.name        ?? '',
    email:       user?.email       ?? '',
    dob:         user?.dob         ?? '',
    governorate: user?.governorate ?? '',
    bio:         user?.bio         ?? '',
    skills:      user?.skills      ?? [],
  });
  const [avatarPreview, setAvatar] = useState(user?.avatar ?? null);
  const [skillInput, setSkillInput] = useState('');
  const fileRef = useRef();

  const bg       = isDark ? 'bg-[#0f172a] text-white' : 'bg-slate-50 text-slate-900';
  const cardBg   = isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200 shadow-sm';
  const inputCls = `w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all ${isDark ? 'bg-slate-800/40 border-slate-700 text-white placeholder-gray-600 focus:border-blue-500/50' : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-400 shadow-sm'}`;
  const labelCls = `text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-slate-400'}`;
  const subText  = isDark ? 'text-gray-400' : 'text-slate-500';

  if (!user) return (
    <div className={`min-h-screen flex items-center justify-center ${bg}`}>
      <Navbar />
      <div className="text-center mt-20">
        <Shield size={48} className={`mx-auto mb-4 ${isDark ? 'text-slate-400' : 'text-slate-300'}`} />
        <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>{t('prof_signin_req')}</h2>
        <button 
          onClick={() => navigate('/login')}
          className="px-6 py-3 hover:opacity-90 text-white rounded-xl font-medium transition-all" 
          style={{ background: '#153147' }}
        >
          {t('prof_signin_btn')}
        </button>
      </div>
    </div>
  );

  const u = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target?.value ?? e }));
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };
  const save = () => { updateProfile({ ...form, avatar: avatarPreview }); setEditing(false); };
  const today = new Date().toISOString().split('T')[0];
  const age = calcAge(form.dob);

  const toggleSkill = (skill) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const appliedList = user.appliedOpportunities || [];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bg}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <button onClick={() => navigate('/dashboard')}
          className={`flex items-center gap-2 text-sm mb-8 transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-slate-400 hover:text-slate-800'}`}>
          <ArrowLeft size={16} /> {t('prof_back')}
        </button>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">

          {/* Sidebar */}
          <motion.aside initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
            className={`p-6 rounded-3xl border flex flex-col items-center gap-5 self-start sticky top-28 ${cardBg}`}>

            {/* Avatar */}
            <div className="relative">
              <div 
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-2xl font-bold text-white overflow-hidden border-2 border-[#153147]/20" 
                style={{background:'#153147'}} >
                {avatarPreview
                  ? <img src={avatarPreview} className="w-full h-full object-cover" alt="Avatar" />
                  : initials(user.name)}
              </div>
              {editing && (
                <button onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-8 h-8 hover:opacity-90 rounded-xl flex items-center justify-center text-white transition-all "
                  style={{background:'#153147'}} 
                >
                  <Camera size={14} />
                </button>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </div>

            <div className="text-center">
              <h2 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{user.name}</h2>
              <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-lg ${isDark ? 'text-[#153147] dark:text-slate-300 bg-blue-500/10' : 'text-[#153147] bg-blue-50'}`}>
                {user.role}
              </span>
            </div>

            {/* Info card */}
            <div className={`w-full rounded-2xl p-4 space-y-2.5 ${isDark ? 'bg-slate-800/40' : 'bg-slate-50'}`}>
              {[
                { icon:User,     label:t('prof_userid'), value:`#${user.userId}` },
                { icon:MapPin,   label:t('prof_gov'),    value:user.governorate || '—' },
                { icon:Calendar, label:t('prof_age'),    value:age ? `${age} ${t('prof_years')}` : '—' },
              ].map(row => {
                const Icon = row.icon;
                return (
                  <div key={row.label} className="flex items-center gap-2.5">
                    <Icon size={13} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                    <span className={`text-xs flex-1 ${subText}`}>{row.label}</span>
                    <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-700'}`}>{row.value}</span>
                  </div>
                );
              })}
            </div>

            {/* Skills preview */}
            {user.skills?.length > 0 && (
              <div className="w-full flex flex-wrap gap-1.5 justify-center">
                {user.skills.slice(0,5).map(sk => (
                  <span key={sk} className={`text-xs px-2.5 py-1 rounded-lg border ${isDark ? 'bg-blue-500/10 border-[#153147]/20 text-[#153147] dark:text-slate-300' : 'bg-blue-50 border-blue-200 text-[#153147]'}`}>{sk}</span>
                ))}
                {user.skills.length > 5 && (
                  <span className={`text-xs px-2.5 py-1 rounded-lg border ${isDark ? 'bg-slate-800/40 border-slate-700 text-gray-500' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                    +{user.skills.length - 5}
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center gap-1.5 text-xs text-emerald-500">
              <BadgeCheck size={14} /> {t('prof_verified')}
            </div>
          </motion.aside>

          {/* Right column */}
          <div className="space-y-6">
            {/* Profile info card */}
            <motion.main initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
              className={`p-7 rounded-3xl border ${cardBg}`}>

              <div className="flex items-center justify-between mb-7">
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{t('prof_info')}</h3>
                <div className="flex gap-2">
                  {editing ? (
                    <>
                      <button onClick={() => setEditing(false)}
                        className={`px-4 py-2 text-sm rounded-xl border transition-all ${isDark ? 'text-gray-400 bg-slate-800/40 border-slate-700 hover:text-white' : 'text-slate-500 bg-slate-100 border-slate-200 hover:bg-slate-200'}`}>
                        {t('prof_cancel')}
                      </button>
                      <button onClick={save}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all">
                        <Save size={14} /> {t('prof_save')}
                      </button>
                    </>
                  ) : (
                    <button onClick={() => setEditing(true)}
                      className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl border transition-all ${isDark ? 'text-[#153147] dark:text-slate-300 bg-blue-500/10 border-[#153147]/20 hover:bg-blue-500/20' : 'text-[#153147] bg-blue-50 border-blue-200 hover:bg-blue-100'}`}>
                      <Edit3 size={14} /> {t('prof_edit')}
                    </button>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>{t('prof_name')}</label>
                  {editing
                    ? <input value={form.name} onChange={u('name')} placeholder="Full name" className={inputCls} />
                    : <p className={`text-sm py-1 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>{user.name || '—'}</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>{t('prof_email')}</label>
                  {editing
                    ? <input type="email" value={form.email} onChange={u('email')} placeholder="email@example.com" className={inputCls} />
                    : <p className={`text-sm py-1 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>{user.email || '—'}</p>}
                </div>

                {/* DOB */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>{t('prof_dob')}</label>
                  {editing
                    ? <input type="date" value={form.dob} onChange={u('dob')} max={today} min="1920-01-01" className={inputCls} />
                    : <p className={`text-sm py-1 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>{user.dob || '—'}</p>}
                </div>

                {/* Governorate */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>{t('prof_gov')}</label>
                  {editing
                    ? (
                      <select value={form.governorate} onChange={u('governorate')} className={inputCls}>
                        <option value="">-</option>
                        {GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    )
                    : <p className={`text-sm py-1 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>{user.governorate || '-'}</p>}
                </div>

                {/* Bio */}
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className={labelCls}>{t('prof_bio')}</label>
                  {editing
                  ? <textarea value={form.bio} onChange={u('bio')} rows={3} placeholder="Tell others about yourself..." className={`${inputCls} resize-none`} />
                  : <p className={`text-sm py-1 leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>{user.bio || '-'}</p>}
                </div>

                {/* Skills */}
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className={labelCls}>{t('prof_skills')}</label>
                  {editing ? (
                    <div>
                      <div className="flex flex-wrap gap-1.5">
                        {ALL_SKILLS.map(sk => (
                          <button key={sk} onClick={() => toggleSkill(sk)}
                            className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all ${form.skills.includes(sk)
                              ? (isDark ? 'bg-blue-500/20 border-blue-500/30 text-[#153147] dark:text-slate-300' : 'bg-blue-100 border-blue-300 text-blue-700')
                              : (isDark ? 'bg-slate-800/40 border-slate-700 text-gray-500 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800')
                            }`}>
                            {sk}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5 py-1">
                      {user.skills?.length > 0
                        ? user.skills.map(sk => (
                          <span key={sk} className={`text-xs px-2.5 py-1 rounded-lg border ${isDark ? 'bg-blue-500/10 border-[#153147]/20 text-[#153147] dark:text-slate-300' : 'bg-blue-50 border-blue-200 text-[#153147]'}`}>
                            {sk}
                          </span>
                        ))
                        : <p className={`text-sm italic ${subText}`}>{t('prof_no_skills')}</p>
                      }
                    </div>
                  )}
                </div>
              </div>
            </motion.main>

            {/* Applied Opportunities section */}
            <motion.section initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
              className={`p-7 rounded-3xl border ${cardBg}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-500/15' : 'bg-blue-50'}`}>
                  <Briefcase size={18} className="text-[#153147]" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{t('prof_applied')}</h3>
                  <p className={`text-xs ${subText}`}>{appliedList.length} applications</p>
                </div>
              </div>

              {appliedList.length === 0 ? (
                <div className={`text-center py-10 rounded-2xl border border-dashed ${isDark ? 'border-slate-700' : 'border-slate-300'}`}>
                  <Briefcase size={32} className={`mx-auto mb-3 ${isDark ? 'text-slate-400' : 'text-slate-300'}`} />
                  <p className={`text-sm ${subText}`}>{t('prof_no_applied')}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {appliedList.map((app, i) => (
                    <motion.div key={app.id}
                      initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.05 }}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${isDark ? 'bg-slate-800/30 border-slate-700/60 hover:border-slate-500' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-slate-800/60' : 'bg-white border border-slate-200'}`}>
                        <Briefcase size={18} className="text-[#153147]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{app.title}</p>
                        <p className="text-xs text-[#153147] mt-0.5">{app.org}</p>
                        {app.appliedDate && (
                          <p className={`text-xs mt-0.5 ${subText}`}>{t('prof_applied_on')} {formatDate(app.appliedDate)}</p>
                        )}
                      </div>
                      <StatusBadge status={app.status} t={t} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
