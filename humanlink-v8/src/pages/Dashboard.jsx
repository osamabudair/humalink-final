import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Search, CalendarDays, Trophy, User,
  Bell, Settings, LogOut, ChevronRight, Clock,
  HeartHandshake, Zap, Globe2, MapPin,
  CheckCircle2, ArrowRight, Sun, Moon, Briefcase, Map,
} from 'lucide-react';
import { useAuth }  from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLang }  from '../context/LangContext';
import { initials } from '../utils';
import AchievementsSection from '../components/AchievementsSection';
import JordanMapSection    from '../components/JordanMapSection';

const NAVY = '#153147';

// ── Activity icon registry ──────────────────────────────────────────────────
const ACTIVITY_ICONS = { HeartHandshake, Zap, Trophy };

// ── CircleProgress ──────────────────────────────────────────────────────────
function CircleProgress({ value, size = 52, stroke = 5, color = NAVY }) {
  const r      = (size - stroke) / 2;
  const circ   = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(128,128,128,0.15)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold" style={{ color }}>{value}%</span>
      </div>
    </div>
  );
}

// ── MatchCard ───────────────────────────────────────────────────────────────
function MatchCard({ opp, isDark, subText, cardBg }) {
  const color = opp.match >= 90 ? '#059669' : opp.match >= 80 ? '#d97706' : NAVY;
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`p-4 rounded-2xl border flex items-center gap-4 cursor-pointer group transition-all ${cardBg}`}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${NAVY}12` }}>
        <Briefcase size={16} style={{ color: NAVY }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate transition-colors ${isDark ? 'text-white group-hover:text-slate-300' : 'text-[#232A2F] group-hover:text-[#153147]'}`}>
          {opp.title}
        </p>
        <p className={`text-xs mt-0.5 ${subText}`}>{opp.org}</p>
        <div className="flex items-center gap-2 mt-1.5">
          {opp.gov
            ? <span className="text-xs flex items-center gap-1" style={{ color: NAVY }}><MapPin size={10} />{opp.gov}</span>
            : <span className="text-xs flex items-center gap-1 text-emerald-600"><Globe2 size={10} />Remote</span>
          }
          <span className={`text-xs ${subText}`}>{opp.time}</span>
        </div>
      </div>
      <CircleProgress value={opp.match} size={48} stroke={4} color={color} />
    </motion.div>
  );
}

// ── Static data ─────────────────────────────────────────────────────────────
const RECS = [
  { id: 1, title: 'English Tutoring for Refugees', org: 'Hope Bridge Foundation', gov: 'Amman', match: 97, time: '4 hrs/wk' },
  { id: 2, title: 'UI/UX Designer for NGO App',    org: 'Tech4Good JO',           gov: '',     match: 95, time: '6 hrs/wk' },
  { id: 3, title: 'Arabic-English Translator',     org: 'Refugees Welcome',       gov: '',     match: 92, time: 'Flexible' },
  { id: 4, title: 'Youth Workshop Facilitator',    org: 'NextGen Jordan',         gov: 'Amman',match: 88, time: 'Weekends' },
];

const UPCOMING = [
  { id: 1, title: 'Volunteer Orientation - Hope Bridge', date: 'Apr 8',  time: '10:00 AM', status: 'confirmed' },
  { id: 2, title: 'Remote Design Session - Tech4Good',   date: 'Apr 11', time: '2:00 PM',  status: 'pending'   },
  { id: 3, title: 'Community Clean-up Drive',            date: 'Apr 15', time: '9:00 AM',  status: 'confirmed' },
];

const ACTIVITY = [
  { text: 'Applied to "English Tutoring for Refugees"', time: '2h ago',     iconName: 'HeartHandshake', color: '#059669' },
  { text: 'Profile match updated to 94%',               time: 'Yesterday',  iconName: 'Zap',            color: NAVY      },
  { text: 'Completed 128 volunteer hours milestone!',   time: '1 week ago', iconName: 'Trophy',         color: '#d97706' },
];

const MATCH_SCORE = 94;

// ── Dashboard ───────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout }   = useAuth();
  const { toggle, isDark } = useTheme();
  const { t, isRtl }       = useLang();

  const [activeTab, setTab]         = useState('overview');
  const [sidebarOpen, setSidebar]   = useState(false);
  const [notifOpen, setNotif]       = useState(false);
  const [settingsOpen, setSettings] = useState(false);

  const userName = user?.name || 'Guest';

  const NAV = [
    { id: 'overview',      label: t('dash_overview'), icon: LayoutDashboard },
    { id: 'opportunities', label: t('dash_opps'),     icon: Search          },
    { id: 'map',           label: 'Opportunities Map',icon: Map             },
    { id: 'calendar',      label: t('dash_calendar'), icon: CalendarDays    },
    { id: 'achievements',  label: t('dash_achieve'),  icon: Trophy          },
    { id: 'profile',       label: t('nav_profile'),   icon: User            },
  ];

  const STATS = [
    { labelKey: 'dash_hours',     value: '128', icon: Clock,          color: NAVY,      change: '+12 this month' },
    { labelKey: 'dash_apps_sent', value: '24',  icon: HeartHandshake, color: '#059669', change: '+3 this week'   },
    { labelKey: 'dash_orgs',      value: '8',   icon: Briefcase,      color: NAVY,      change: 'All time'       },
    { labelKey: 'dash_impact',    value: '94%', icon: Trophy,         color: '#d97706', change: 'Top 10%'        },
  ];

  // Theme-derived class strings
  const bg        = isDark ? 'bg-[#0f172a] text-white'         : 'bg-[#F9F8F7] text-gray-900';
  const sidebarBg = isDark ? 'bg-[#1e293b] border-slate-700/60' : 'bg-white border-[#EDEAE4]';
  const topbarBg  = isDark ? 'bg-[#1e293b] border-slate-700/60' : 'bg-white border-[#EDEAE4]';
  const cardBg    = isDark ? 'bg-[#1e293b] border-slate-700/60' : 'bg-white border-[#EDEAE4] shadow-sm';
  const subText   = isDark ? 'text-slate-400'                  : 'text-slate-500';
  const hoverBg   = isDark ? 'hover:bg-slate-700/30'           : 'hover:bg-[#F9F8F7]';
  const iconBtn   = isDark
    ? 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white'
    : 'bg-[#F9F8F7] text-slate-500 hover:bg-[#EDEAE4]';

  const navBtnClass = (active) => active
    ? 'text-white'
    : isDark
      ? 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
      : 'text-slate-500 hover:bg-[#F9F8F7] hover:text-slate-900';

  const tabTitles = {
    overview:      `${t('dash_morning')}, ${userName.split(' ')[0]}`,
    opportunities: t('dash_opps'),
    map:           'Opportunities Map',
    calendar:      t('dash_calendar'),
    achievements:  t('dash_achieve'),
  };

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${bg}`} dir={isRtl ? 'rtl' : 'ltr'}>

      {/* ── Sidebar ── */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 h-full w-60 flex flex-col transition-transform duration-300 border-r ${sidebarBg}`}>

        {/* Logo */}
        <div className={`p-5 border-b ${isDark ? 'border-slate-700/40' : 'border-[#EDEAE4]'}`}>
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <img
              src="/logo-icon.jpeg"
              alt="HumaLink"
              className="w-8 h-8 rounded-xl object-contain"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <span className={`font-bold ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>HumaLink</span>
          </button>
        </div>

        {/* User info */}
        <div className={`p-4 border-b ${isDark ? 'border-slate-700/40' : 'border-[#EDEAE4]'}`}>
          <div className={`flex items-center gap-3 p-3 rounded-2xl ${isDark ? 'bg-slate-700/30' : 'bg-[#F9F8F7]'}`}>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0 overflow-hidden"
              style={{ background: NAVY }}
            >
              {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt="" /> : initials(userName)}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{userName}</p>
              <p className={`text-xs truncate ${subText}`}>{user?.role || 'Volunteer'}</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-lg text-white flex-shrink-0" style={{ background: NAVY }}>
              {MATCH_SCORE}%
            </span>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            {NAV.map(item => {
              const Icon     = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'profile') { navigate('/profile'); }
                    else { setTab(item.id); setSidebar(false); }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${navBtnClass(isActive)}`}
                  style={isActive ? { background: NAVY } : {}}
                >
                  <Icon size={17} className="transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Bottom actions */}
        <div className={`p-3 border-t space-y-1 ${isDark ? 'border-slate-700/40' : 'border-[#EDEAE4]'}`}>
          <button
            onClick={toggle}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${isDark ? 'text-slate-400 hover:bg-slate-700/30 hover:text-white' : 'text-slate-500 hover:bg-[#F9F8F7] hover:text-slate-900'}`}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
          >
            <LogOut size={17} /> {t('dash_signout')}
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebar(false)} />
      )}

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className={`h-16 flex-shrink-0 flex items-center gap-4 px-6 border-b ${topbarBg}`}>
          <button
            className={`lg:hidden transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-800'}`}
            onClick={() => setSidebar(!sidebarOpen)}
          >
            <LayoutDashboard size={20} />
          </button>

          <div className="flex-1">
            <h1 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>
              {tabTitles[activeTab] || ''}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setNotif(!notifOpen); setSettings(false); }}
                className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all ${iconBtn}`}
              >
                <Bell size={17} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: NAVY }} />
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`absolute top-full mt-2 right-0 w-72 border rounded-2xl p-3 shadow-xl z-50 ${isDark ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-[#EDEAE4]'}`}
                  >
                    <p className={`text-xs font-semibold uppercase px-2 mb-2 ${subText}`}>Notifications</p>
                    {[
                      'New match: 97% — Hope Bridge',
                      'Application viewed by Tech4Good',
                      'Event reminder: Apr 8, 10AM',
                    ].map((n, i) => (
                      <div key={i} className={`flex items-start gap-3 p-2 rounded-xl cursor-pointer ${hoverBg}`}>
                        <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: NAVY }} />
                        <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{n}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <div className="relative">
              <button
                onClick={() => { setSettings(!settingsOpen); setNotif(false); }}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${iconBtn}`}
              >
                <Settings size={17} />
              </button>
              <AnimatePresence>
                {settingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`absolute top-full mt-2 right-0 w-52 border rounded-2xl p-2 shadow-xl z-50 ${isDark ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-[#EDEAE4]'}`}
                  >
                    {['Edit Profile', 'Help'].map(item => (
                      <button
                        key={item}
                        onClick={() => { if (item === 'Edit Profile') navigate('/profile'); setSettings(false); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${isDark ? 'text-slate-400 hover:bg-slate-700/30 hover:text-white' : 'text-slate-600 hover:bg-[#F9F8F7]'}`}
                      >
                        {item}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Avatar */}
            <button
              onClick={() => navigate('/profile')}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white overflow-hidden"
              style={{ background: NAVY }}
            >
              {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt="" /> : initials(userName)}
            </button>
          </div>
        </header>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">

            {/* ── OVERVIEW ── */}
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">

                {/* AI match banner */}
                <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#1e293b] border-slate-700/60' : 'bg-[#EDEAE4]/50 border-[#ADB8BB]/30'}`}>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${NAVY}15` }}>
                        <Zap size={20} style={{ color: NAVY }} />
                      </div>
                      <div>
                        <p className={`font-semibold ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>
                          {t('dash_ai_title')}: <span style={{ color: NAVY }}>{MATCH_SCORE}%</span>
                        </p>
                        <p className={`text-sm ${subText}`}>{t('dash_ai_sub')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setTab('opportunities')}
                      className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl text-white hover:opacity-90 transition-all"
                      style={{ background: NAVY }}
                    >
                      {t('dash_ai_cta')} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                  {STATS.map((st, i) => {
                    const Icon = st.icon;
                    return (
                      <motion.div
                        key={st.labelKey}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        whileHover={{ y: -3 }}
                        className={`p-4 rounded-2xl border transition-all ${cardBg}`}
                      >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${st.color}15` }}>
                          <Icon size={17} style={{ color: st.color }} />
                        </div>
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{st.value}</p>
                        <p className={`text-xs mt-0.5 ${subText}`}>{t(st.labelKey)}</p>
                        <p className="text-xs text-emerald-500 mt-1">{st.change}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Recommendations + sidebar widgets */}
                <div className="grid lg:grid-cols-5 gap-6">
                  <div className="lg:col-span-3">
                    <div className={`rounded-2xl border p-5 ${cardBg}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{t('dash_rec')}</h3>
                        <button
                          onClick={() => setTab('opportunities')}
                          className="text-xs flex items-center gap-1 font-medium hover:opacity-70 transition-all"
                          style={{ color: NAVY }}
                        >
                          View all <ChevronRight size={12} />
                        </button>
                      </div>
                      <div className="space-y-3">
                        {RECS.map(opp => (
                          <MatchCard key={opp.id} opp={opp} isDark={isDark} subText={subText} cardBg={cardBg} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-5">
                    {/* Profile strength */}
                    <div className={`rounded-2xl border p-5 ${cardBg}`}>
                      <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>Profile Strength</h3>
                      <div className="flex items-center gap-4 mb-4">
                        <CircleProgress value={MATCH_SCORE} size={64} stroke={6} color="#10b981" />
                        <div>
                          <p className={`text-sm ${subText}`}>
                            Your profile is <span className="text-emerald-500 font-semibold">Strong</span>
                          </p>
                          <p className={`text-xs mt-1 ${subText}`}>Add a bio to reach 100%</p>
                        </div>
                      </div>
                      {['Add profile photo', 'Complete skills section', 'Write a bio'].map((tip, i) => (
                        <div
                          key={tip}
                          className={`flex items-center gap-2 text-xs py-1 ${i < 2 ? `${subText} line-through` : subText}`}
                        >
                          <CheckCircle2 size={12} className={i < 2 ? 'text-emerald-500' : isDark ? 'text-slate-500' : 'text-slate-400'} />
                          {tip}
                        </div>
                      ))}
                    </div>

                    {/* Quick access */}
                    <div className={`rounded-2xl border p-5 ${cardBg}`}>
                      <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>Quick Access</h3>
                      <div className="space-y-2">
                        {[
                          { tab: 'map', label: 'Opportunities Map', sub: 'Explore by location', gradient: 'from-emerald-500 to-teal-400', Icon: Map },
                          { tab: 'achievements', label: 'My Achievements', sub: 'Download certificates', gradient: 'from-amber-500 to-orange-400', Icon: Trophy },
                        ].map(item => (
                          <motion.button
                            key={item.tab}
                            whileHover={{ x: 4 }}
                            onClick={() => setTab(item.tab)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${hoverBg}`}
                          >
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                              <item.Icon size={14} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{item.label}</p>
                              <p className={`text-xs ${subText}`}>{item.sub}</p>
                            </div>
                            <ChevronRight size={14} className={subText} />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Upcoming */}
                    <div className={`rounded-2xl border p-5 ${cardBg}`}>
                      <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{t('dash_upcoming')}</h3>
                      <div className="space-y-3">
                        {UPCOMING.map(ev => (
                          <div key={ev.id} className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${ev.status === 'confirmed' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            <div>
                              <p className={`text-xs font-medium leading-tight ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{ev.title}</p>
                              <p className={`text-xs mt-0.5 ${subText}`}>{ev.date} · {ev.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity feed */}
                <div className={`rounded-2xl border p-5 ${cardBg}`}>
                  <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{t('dash_activity')}</h3>
                  <div className="space-y-3">
                    {ACTIVITY.map((act, i) => {
                      const Icon = ACTIVITY_ICONS[act.iconName];
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className={`flex items-center gap-3 p-2 rounded-xl ${hoverBg}`}
                        >
                          {Icon && (
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${act.color}15` }}>
                              <Icon size={14} style={{ color: act.color }} />
                            </div>
                          )}
                          <p className={`text-sm flex-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{act.text}</p>
                          <span className={`text-xs ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>{act.time}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── OPPORTUNITIES ── */}
            {activeTab === 'opportunities' && (
              <motion.div key="opps" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  {RECS.map(opp => (
                    <motion.div key={opp.id} whileHover={{ y: -4 }} className={`p-5 rounded-2xl border cursor-pointer transition-all ${cardBg}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${NAVY}12` }}>
                          <Briefcase size={18} style={{ color: NAVY }} />
                        </div>
                        <CircleProgress value={opp.match} size={44} stroke={4} color={opp.match > 90 ? '#059669' : '#d97706'} />
                      </div>
                      <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{opp.title}</h4>
                      <p className="text-xs mt-1" style={{ color: NAVY }}>{opp.org}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {opp.gov
                          ? <span className={`text-xs flex items-center gap-1 ${subText}`}><MapPin size={10} />{opp.gov}</span>
                          : <span className="text-xs flex items-center gap-1 text-emerald-600"><Globe2 size={10} />Remote</span>
                        }
                        <span className={`text-xs ${subText}`}>{opp.time}</span>
                      </div>
                      <button
                        className="mt-3 w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 text-white hover:opacity-90 transition-all"
                        style={{ background: NAVY }}
                      >
                        <HeartHandshake size={12} /> {t('dash_apply')}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── MAP ── */}
            {activeTab === 'map' && <JordanMapSection />}

            {/* ── CALENDAR ── */}
            {activeTab === 'calendar' && (
              <motion.div key="cal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 max-w-xl">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{t('dash_upcoming')}</h2>
                {UPCOMING.map(ev => (
                  <div key={ev.id} className={`flex items-center gap-4 p-4 rounded-2xl border ${cardBg}`}>
                    <div className={`w-1.5 self-stretch rounded-full ${ev.status === 'confirmed' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <CalendarDays size={18} className={ev.status === 'confirmed' ? 'text-emerald-500' : 'text-amber-500'} />
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{ev.title}</p>
                      <p className={`text-xs mt-0.5 ${subText}`}>{ev.date} · {ev.time}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${ev.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {ev.status}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* ── ACHIEVEMENTS ── */}
            {activeTab === 'achievements' && (
              <AchievementsSection volunteerName={userName} />
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
