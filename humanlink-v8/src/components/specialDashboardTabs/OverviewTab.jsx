import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList, Clock, CheckCircle2, XCircle, 
  FolderOpen, ChevronRight, Activity, Building 
} from 'lucide-react';

// ── Mock Data ──
const DASHBOARD_STATS = [
  { id: 'total', label: 'Total Requests', value: '12', icon: ClipboardList, color: '#3b82f6' },
  { id: 'pending', label: 'Pending Requests', value: '2', icon: Clock, color: '#f59e0b' },
  { id: 'approved', label: 'Approved Requests', value: '9', icon: CheckCircle2, color: '#10b981' },
  { id: 'rejected', label: 'Rejected Requests', value: '1', icon: XCircle, color: '#ef4444' },
  { id: 'active', label: 'Active Cases', value: '1', icon: FolderOpen, color: '#8b5cf6' },
];

const LAST_REQUEST = {
  id: 'REQ-108',
  title: 'Wheelchair Maintenance & Repair',
  status: 'Pending',
  date: '10 May 2024',
};

const CURRENT_CASE = {
  id: 'CASE-305',
  title: 'Weekly Physical Therapy Sessions',
  org: 'Hope Bridge Foundation',
  progress: 45,
  status: 'In Progress',
};

export default function OverviewTab({ setTab, isDark, cardBg, subText }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
      
      {/* ── 1. Stats Cards Grid ── */}
      {/* استخدمنا grid-cols-2 للموبايل و grid-cols-5 للشاشات الكبيرة ليناسب الـ 5 بطاقات */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {DASHBOARD_STATS.map((st, i) => {
          const Icon = st.icon;
          return (
            <motion.div 
              key={st.id} 
              initial={{ opacity: 0, y: 14 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.05 }} 
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

      {/* ── 2. Current Status Section ── */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* أحدث طلب (Last Submitted Request) */}
        <div className={`p-6 rounded-2xl border flex flex-col ${cardBg}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>
              <ClipboardList size={18} className="text-blue-500" /> Latest Request
            </h3>
            <button onClick={() => setTab('requests')} className="text-xs font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-0.5">
              View All <ChevronRight size={14} />
            </button>
          </div>
          
          <div className={`p-4 rounded-xl border flex-1 flex flex-col justify-center ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>{LAST_REQUEST.title}</h4>
                <p className={`text-xs mt-1 ${subText}`}>{LAST_REQUEST.id} • {LAST_REQUEST.date}</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-100 text-amber-600 uppercase">
                {LAST_REQUEST.status}
              </span>
            </div>
            <p className={`text-xs ${subText} flex items-center gap-1.5 mt-2`}>
              <Clock size={12} /> Your request is currently under review.
            </p>
          </div>
        </div>

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

          <div className={`p-4 rounded-xl border flex-1 flex flex-col justify-between ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>{CURRENT_CASE.title}</h4>
                <span className={`text-[10px] font-bold uppercase flex items-center gap-1 text-emerald-500`}>
                  <Activity size={12} /> {CURRENT_CASE.status}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 mt-2">
                <Building size={12} className={subText} />
                <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {CURRENT_CASE.org}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 mt-5">
              <div className="flex justify-between text-xs">
                <span className={subText}>Assistance Progress</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-700'}`}>{CURRENT_CASE.progress}%</span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${CURRENT_CASE.progress}%` }} 
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full rounded-full bg-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}