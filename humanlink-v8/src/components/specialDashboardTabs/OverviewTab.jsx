import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList, Clock, CheckCircle2, XCircle, 
  FolderOpen, ChevronRight, Activity, Building,
  BellRing, Plus, HeartHandshake, User, CalendarDays
} from 'lucide-react';

// ── Mock Data ──
const DASHBOARD_STATS = [
  { id: 'total', label: 'Total Requests', value: '12', icon: ClipboardList, color: '#3b82f6' },
  { id: 'pending', label: 'Pending Requests', value: '2', icon: Clock, color: '#f59e0b' },
  { id: 'approved', label: 'Approved Requests', value: '9', icon: CheckCircle2, color: '#10b981' },
  { id: 'rejected', label: 'Rejected Requests', value: '1', icon: XCircle, color: '#ef4444' },
  { id: 'active', label: 'Active Cases', value: '1', icon: FolderOpen, color: '#8b5cf6' },
];

const CURRENT_CASE = {
  id: 'CASE-305',
  title: 'Weekly Physical Therapy Sessions',
  org: 'Hope Bridge Foundation',
  progress: 45,
  status: 'In Progress',
};

// بيانات شريط النشاطات
const RECENT_ACTIVITY = [
  { id: 1, type: 'status', title: 'Request Approved', desc: 'Your financial support request (REQ-092) was approved.', time: '2 hours ago', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-500/20' },
  { id: 2, type: 'case', title: 'Volunteer Assigned', desc: 'Rami Ahmad has been assigned to CASE-305.', time: 'Yesterday', icon: User, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/20' },
  { id: 3, type: 'system', title: 'Profile Updated', desc: 'You successfully updated your governorate to Amman.', time: '3 days ago', icon: CalendarDays, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-500/20' },
];

export default function OverviewTab({ setTab, isDark, cardBg, subText }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
      
      {/* ── 1. إعلان / تنبيه (Announcement Banner) ── */}
      <div className={`p-4 rounded-2xl flex items-start gap-3 border ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
        <BellRing className={`shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} size={20} />
        <div>
          <h4 className={`text-sm font-bold ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>System Announcement</h4>
          <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-blue-200/70' : 'text-blue-600/80'}`}>
            Winter Relief applications are now open! Please ensure your profile and contact information are up to date before submitting a new request.
          </p>
        </div>
      </div>

      {/* ── 2. الإحصائيات (Stats Cards) ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {DASHBOARD_STATS.map((st, i) => {
          const Icon = st.icon;
          return (
            <motion.div 
              key={st.id} 
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} 
              whileHover={{ y: -3 }}
              className={`p-4 rounded-2xl border transition-all ${cardBg}`}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${st.color}15` }}>
                <Icon size={18} style={{ color: st.color }} />
              </div>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{st.value}</p>
              <p className={`text-xs mt-1 ${subText}`}>{st.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* ── 3. اختصارات سريعة (Quick Actions) ── */}
      <div>
        <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button 
            onClick={() => setTab('requests')}
            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all hover:-translate-y-1 ${cardBg} ${isDark ? 'hover:border-blue-500/50' : 'hover:border-blue-200 hover:shadow-md'}`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Plus size={18} />
            </div>
            <div className="text-left">
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Submit Request</h4>
              <p className={`text-[10px] mt-0.5 ${subText}`}>Apply for assistance</p>
            </div>
          </button>

          <button 
            onClick={() => setTab('support')}
            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all hover:-translate-y-1 ${cardBg} ${isDark ? 'hover:border-emerald-500/50' : 'hover:border-emerald-200 hover:shadow-md'}`}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <HeartHandshake size={18} />
            </div>
            <div className="text-left">
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Contact Support</h4>
              <p className={`text-[10px] mt-0.5 ${subText}`}>Get help & answers</p>
            </div>
          </button>

          <button 
            onClick={() => setTab('settings')}
            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all hover:-translate-y-1 ${cardBg} ${isDark ? 'hover:border-purple-500/50' : 'hover:border-purple-200 hover:shadow-md'}`}
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 flex items-center justify-center shrink-0">
              <User size={18} />
            </div>
            <div className="text-left">
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Update Profile</h4>
              <p className={`text-[10px] mt-0.5 ${subText}`}>Manage your details</p>
            </div>
          </button>
        </div>
      </div>

      {/* ── 4. القسم السفلي: الحالة النشطة + شريط النشاطات ── */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* الحالة النشطة الحالية (Current Active Case) */}
        <div className={`p-6 rounded-2xl border flex flex-col ${cardBg}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>
              <FolderOpen size={18} className="text-emerald-500" /> Current Active Case
            </h3>
            <button onClick={() => setTab('cases')} className="text-xs font-semibold text-emerald-500 hover:text-emerald-600 flex items-center gap-0.5">
              Go to Cases <ChevronRight size={14} />
            </button>
          </div>

          <div className={`p-5 rounded-xl border flex-1 flex flex-col justify-between ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-bold text-sm leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>{CURRENT_CASE.title}</h4>
                <span className={`text-[10px] font-bold uppercase flex items-center gap-1 text-emerald-500 bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 rounded-md`}>
                  <Activity size={10} /> {CURRENT_CASE.status}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 mt-3">
                <Building size={14} className={subText} />
                <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {CURRENT_CASE.org}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 mt-6">
              <div className="flex justify-between text-xs">
                <span className={subText}>Assistance Progress</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-700'}`}>{CURRENT_CASE.progress}%</span>
              </div>
              <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${CURRENT_CASE.progress}%` }} 
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full rounded-full bg-emerald-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* أحدث النشاطات (Recent Activity Timeline) */}
        <div className={`p-6 rounded-2xl border flex flex-col ${cardBg}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>
              <Clock size={18} className="text-blue-500" /> Recent Activity
            </h3>
          </div>
          
          <div className="flex-1 px-2">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent dark:before:from-slate-700 dark:before:via-slate-700">
              {RECENT_ACTIVITY.map((activity) => (
                <div key={activity.id} className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-4 ${isDark ? 'border-[#1e293b]' : 'border-white'} ${activity.bg} ${activity.color}`}>
                    <activity.icon size={12} strokeWidth={3} />
                  </div>
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{activity.title}</h4>
                      <span className={`text-[10px] font-semibold flex-shrink-0 ${subText}`}>{activity.time}</span>
                    </div>
                    <p className={`text-xs mt-1 leading-relaxed ${subText}`}>{activity.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}