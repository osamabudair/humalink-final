import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// 1. استيراد الأيقونات الأساسية فقط (لا نحتاج لأيقونات التبويبات هنا)
import {
  LayoutDashboard, ClipboardList, FolderOpen, Users, BarChart3,
  Settings, Sun, Moon, LogOut, Bell, CheckCheck
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LangContext';
import { initials } from '../utils';

// 2. استيراد التبويبات المستقلة التي أنشأناها
import OverviewTab from '../components/orgDashboardTabs/OverviewTab';
import RequestsTab from '../components/orgDashboardTabs/RequestsTab';
import CasesTab from '../components/orgDashboardTabs/CasesTab';
import VolunteersTab from '../components/orgDashboardTabs/VolunteersTab';
import AnalyticsTab from '../components/orgDashboardTabs/AnalyticsTab';

const NAVY = '#153147';
const MATCH_SCORE = 94;

export default function OrgDashboard() {
  const navigate = useNavigate();
  const { user, logout }   = useAuth();
  const { toggle, isDark } = useTheme();
  const { t, isRtl }       = useLang();

  // الحالات الأساسية للهيكل (Layout States)
  const [activeTab, setTab]         = useState('overview');
  const [sidebarOpen, setSidebar]   = useState(false);
  const [notifOpen, setNotif]       = useState(false);

  const userName = user?.name || 'Guest';

  const NAV = [
    { id: 'overview',  label: 'Overview',   icon: LayoutDashboard },
    { id: 'requests',  label: 'Requests',   icon: ClipboardList },
    { id: 'cases',     label: 'Cases',      icon: FolderOpen },
    { id: 'volunteer', label: 'Volunteers', icon: Users },
    { id: 'analytics', label: 'Analytics',  icon: BarChart3 },
    { id: 'settings',  label: 'Settings',   icon: Settings },
  ];

  // ألوان وتنسيقات الـ Theme
  const bg        = isDark ? 'bg-[#0f172a] text-white' : 'bg-[#F9F8F7] text-gray-900';
  const sidebarBg = isDark ? 'bg-[#1e293b] border-slate-700/60' : 'bg-white border-[#EDEAE4]';
  const topbarBg  = isDark ? 'bg-[#1e293b] border-slate-700/60' : 'bg-white border-[#EDEAE4]';
  const cardBg    = isDark ? 'bg-[#1e293b] border-slate-700/60' : 'bg-white border-[#EDEAE4] shadow-sm';
  const subText   = isDark ? 'text-slate-400' : 'text-slate-500';
  const hoverBg   = isDark ? 'hover:bg-slate-700/30' : 'hover:bg-[#F9F8F7]';
  const iconBtn   = isDark 
    ? 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white' 
    : 'bg-[#F9F8F7] text-slate-500 hover:bg-[#EDEAE4]';

  const navBtnClass = (active) => active
    ? 'text-white'
    : isDark
      ? 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
      : 'text-slate-500 hover:bg-[#F9F8F7] hover:text-slate-900';

  const tabTitles = {
    overview:  'Overview',
    requests:  'Manage Requests',
    cases:     'Cases Directory',
    volunteer: 'Volunteers List',
    analytics: 'Data Analytics',
    settings:  'System Settings',
  };

  // نظام الإشعارات المشترك
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New Request: REQ-106 submitted', type: 'New Request', isRead: false },
    { id: 2, text: 'Case CASE-301 updated by Rami', type: 'Case Update', isRead: false },
    { id: 3, text: 'New Volunteer: Laila joined the platform', type: 'New Volunteer', isRead: true },
  ]);
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, isRead: true })));

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${bg}`} dir={isRtl ? 'rtl' : 'ltr'}>

      {/* ── Sidebar ── */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 h-full w-60 flex flex-col transition-transform duration-300 border-r ${sidebarBg}`}>
        
        {/* Logo */}
        <div className={`p-5 border-b ${isDark ? 'border-slate-700/40' : 'border-[#EDEAE4]'}`}>
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <img src="/logo-icon.jpeg" alt="HumaLink" className="w-8 h-8 rounded-xl object-contain" onError={e => { e.target.style.display = 'none'; }} />
            <span className={`font-bold ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>HumaLink</span>
          </button>
        </div>

        {/* User info */}
        <div className={`p-4 border-b ${isDark ? 'border-slate-700/40' : 'border-[#EDEAE4]'}`}>
          <div className={`flex items-center gap-3 p-3 rounded-2xl ${isDark ? 'bg-slate-700/30' : 'bg-[#F9F8F7]'}`}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0 overflow-hidden" style={{ background: NAVY }}>
              {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt="" /> : initials(userName)}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{userName}</p>
              <p className={`text-xs truncate ${subText}`}>{user?.role || 'Organization'}</p>
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
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'settings' || item.id === 'profile') { 
                      navigate('/settings'); 
                    } else { 
                      setTab(item.id); 
                      setSidebar(false); 
                    }
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
          <button onClick={toggle} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${isDark ? 'text-slate-400 hover:bg-slate-700/30 hover:text-white' : 'text-slate-500 hover:bg-[#F9F8F7] hover:text-slate-900'}`}>
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
            <LogOut size={17} /> {t('dash_signout') || 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* Overlay للموبايل */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebar(false)} />}

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className={`h-16 flex-shrink-0 flex items-center justify-between px-6 border-b ${topbarBg}`}>
          <div className="flex items-center gap-4">
            <button className={`lg:hidden transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-800'}`} onClick={() => setSidebar(!sidebarOpen)}>
              <LayoutDashboard size={20} />
            </button>
            <h1 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>
              {tabTitles[activeTab] || ''}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setNotif(!notifOpen)} className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all ${iconBtn}`}>
                <Bell size={17} />
                {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#1e293b] flex items-center justify-center" style={{ background: '#ef4444' }}></span>}
              </button>
              
              <AnimatePresence>
                {notifOpen && (
                  <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} className={`absolute top-full mt-2 right-0 w-80 border rounded-2xl p-3 shadow-xl z-50 ${isDark ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-[#EDEAE4]'}`}>
                    <div className="flex items-center justify-between mb-3 px-1">
                      <p className={`text-xs font-semibold uppercase ${subText}`}>Notifications</p>
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-[11px] font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1">
                          <CheckCheck size={14} /> Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                      {notifications.map((n) => (
                        <div key={n.id} className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${n.isRead ? '' : isDark ? 'bg-blue-500/10' : 'bg-blue-50'} ${hoverBg}`}>
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.isRead ? 'bg-slate-300 dark:bg-slate-600' : 'bg-blue-500'}`} />
                          <div>
                            <p className={`text-sm leading-tight ${isDark ? 'text-slate-200' : 'text-slate-800'} ${n.isRead ? '' : 'font-semibold'}`}>{n.text}</p>
                            <span className={`text-[10px] font-bold uppercase mt-1 block ${subText}`}>{n.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <button onClick={() => navigate('/settings')} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${iconBtn}`} title="Settings">
              <Settings size={17} />
            </button>

            {/* Avatar */}
            <button onClick={() => navigate('/settings')} className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white overflow-hidden ml-1" style={{ background: NAVY }}>
              {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt="" /> : initials(userName)}
            </button>
          </div>
        </header>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {/* يتم استدعاء المكونات بكل نظافة هنا وتمرير الخصائص (Props) لها */}
            {activeTab === 'overview' && <OverviewTab key="overview" setTab={setTab} isDark={isDark} cardBg={cardBg} subText={subText} />}
            {activeTab === 'requests' && <RequestsTab key="requests" isDark={isDark} cardBg={cardBg} subText={subText} />}
            {activeTab === 'cases' && <CasesTab key="cases" isDark={isDark} cardBg={cardBg} subText={subText} />}
            {activeTab === 'volunteer' && <VolunteersTab key="volunteer" isDark={isDark} cardBg={cardBg} subText={subText} />}
            {activeTab === 'analytics' && <AnalyticsTab key="analytics" isDark={isDark} cardBg={cardBg} subText={subText} />}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}