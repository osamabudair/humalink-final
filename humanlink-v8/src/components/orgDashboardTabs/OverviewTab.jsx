import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Clock, CheckCircle2, XCircle, FolderOpen, Users, AlertTriangle, ChevronRight } from 'lucide-react';

const DASHBOARD_STATS = [
  { id: 'total', label: 'Total Requests', value: '1,284', icon: ClipboardList, color: '#3b82f6' },
  { id: 'pending', label: 'Pending Requests', value: '342', icon: Clock, color: '#f59e0b' },
  { id: 'approved', label: 'Approved Requests', value: '890', icon: CheckCircle2, color: '#10b981' },
  { id: 'rejected', label: 'Rejected Requests', value: '52', icon: XCircle, color: '#ef4444' },
  { id: 'active', label: 'Active Cases', value: '156', icon: FolderOpen, color: '#8b5cf6' },
  { id: 'volunteers', label: 'Total Volunteers', value: '428', icon: Users, color: '#0ea5e9' },
];

const urgentCasesList = [
  { id: 'CASE-301', title: 'Emergency Medical Support', priority: 'High', time: '10 min ago' },
  { id: 'CASE-302', title: 'Shelter Relief for Displaced', priority: 'High', time: '1 hour ago' },
  { id: 'CASE-304', title: 'Urgent Winter Supply', priority: 'High', time: '2 hours ago' },
];

const MONTHLY_TRENDS = [{ month: 'Jan', received: 120 }, { month: 'Feb', received: 150 }, { month: 'Mar', received: 180 }, { month: 'Apr', received: 220 }];
const REQUEST_TYPES_DATA = [
  { type: 'Medical Support', percentage: 40, color: 'bg-blue-500' },
  { type: 'Shelter & Housing', percentage: 28, color: 'bg-emerald-500' },
  { type: 'Food Distribution', percentage: 19, color: 'bg-amber-500' },
];

export default function OverviewTab({ setTab, isDark, cardBg, subText }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {DASHBOARD_STATS.map((st, i) => {
          const Icon = st.icon;
          return (
            <motion.div key={st.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`p-4 rounded-2xl border transition-all ${cardBg}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${st.color}15` }}>
                <Icon size={18} style={{ color: st.color }} />
              </div>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{st.value}</p>
              <p className={`text-xs mt-1 ${subText}`}>{st.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className={`p-5 rounded-2xl border flex flex-col ${cardBg}`}>
          <h3 className={`font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>
            <AlertTriangle size={18} className="text-red-500" /> Urgent Cases
          </h3>
          <div className="space-y-3 flex-1">
            {urgentCasesList.map((uc, i) => (
              <motion.div key={uc.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className={`p-3 rounded-xl border flex flex-col gap-2 ${isDark ? 'border-slate-700/50 bg-slate-800/30' : 'border-red-100 bg-red-50/40'}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-medium leading-tight ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{uc.title}</p>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-100 text-red-600 flex-shrink-0">{uc.priority}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-[11px] ${subText}`}>{uc.time}</span>
                  <button onClick={() => setTab('cases')} className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5">
                    Go to Cases <ChevronRight size={12} /> 
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={`p-5 rounded-2xl border flex flex-col ${cardBg}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>Quick Analytics</h3>
            <button onClick={() => setTab('analytics')} className="text-xs font-semibold text-blue-500 hover:text-blue-600">View All</button>
          </div>
          <div className="space-y-8 flex-1 flex flex-col">
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-wider mb-3 ${subText}`}>Top Categories</p>
              <div className="space-y-3.5">
                {REQUEST_TYPES_DATA.map((item, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.type}</span>
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.percentage}%</span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${item.percentage}%` }} transition={{ duration: 1, delay: 0.5 + (i * 0.1) }} className={`h-full rounded-full ${item.color}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}