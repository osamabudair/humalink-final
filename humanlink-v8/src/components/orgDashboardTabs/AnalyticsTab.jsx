import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Download, TrendingUp, Clock, Activity, ArrowUpRight } from 'lucide-react';

const MONTHLY_TRENDS = [
  { month: 'Jan', received: 120, resolved: 95 },
  { month: 'Feb', received: 150, resolved: 130 },
  { month: 'Mar', received: 180, resolved: 160 },
  { month: 'Apr', received: 220, resolved: 190 },
  { month: 'May', received: 170, resolved: 150 },
  { month: 'Jun', received: 260, resolved: 230 },
];

const REQUEST_TYPES_DATA = [
  { type: 'Medical Support', count: 450, percentage: 40, color: 'bg-blue-500' },
  { type: 'Shelter & Housing', count: 320, percentage: 28, color: 'bg-emerald-500' },
  { type: 'Food Distribution', count: 210, percentage: 19, color: 'bg-amber-500' },
  { type: 'Education & Youth', count: 145, percentage: 13, color: 'bg-purple-500' },
];

const maxMonthlyValue = Math.max(...MONTHLY_TRENDS.map(d => d.received));

export default function AnalyticsTab({ isDark, cardBg, subText }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>Data & Analytics</h2>
          <p className={`text-xs mt-1 ${subText}`}>Detailed breakdown of platform requests and performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
            <CalendarDays size={14} /> Last 6 Months
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Overall Resolution Rate', value: '88.5%', trend: '+2.4%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
          { label: 'Average Response Time', value: '4.2 hrs', trend: '-1.5 hrs', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
          { label: 'Total Impact Value', value: '1,125', trend: '+15%', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
        ].map((kpi, i) => (
          <div key={i} className={`p-5 rounded-2xl border flex items-center justify-between ${cardBg}`}>
            <div>
              <p className={`text-xs font-semibold uppercase mb-1 ${subText}`}>{kpi.label}</p>
              <div className="flex items-end gap-2">
                <h4 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{kpi.value}</h4>
                <span className={`text-xs font-bold mb-1 flex items-center ${kpi.color}`}>
                  <ArrowUpRight size={12} /> {kpi.trend}
                </span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${kpi.bg}`}>
              <kpi.icon size={20} className={kpi.color} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl border lg:col-span-2 flex flex-col ${cardBg}`}>
          <div className="flex items-center justify-between mb-8">
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Requests Overview</h3>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></span> Received</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Resolved</div>
            </div>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-2 mt-auto min-h-[200px] border-b border-slate-100 dark:border-slate-700/50 pb-2">
            {MONTHLY_TRENDS.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex justify-center items-end gap-1 h-48 relative">
                  <motion.div 
                    initial={{ height: 0 }} animate={{ height: `${(data.received / maxMonthlyValue) * 100}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-1/3 max-w-[24px] rounded-t-md relative bg-slate-200 dark:bg-slate-700 transition-colors group-hover:bg-slate-300 dark:group-hover:bg-slate-600"
                  >
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {data.received}
                    </span>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ height: 0 }} animate={{ height: `${(data.resolved / maxMonthlyValue) * 100}%` }} transition={{ duration: 1, delay: i * 0.1 + 0.2 }}
                    className="w-1/3 max-w-[24px] rounded-t-md relative bg-blue-500 transition-opacity group-hover:opacity-90"
                  >
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {data.resolved}
                    </span>
                  </motion.div>
                </div>
                <span className={`text-[10px] font-bold uppercase ${subText}`}>{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-2xl border flex flex-col ${cardBg}`}>
          <h3 className={`font-semibold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>Requests by Category</h3>
          
          <div className="flex-1 flex flex-col justify-center space-y-5">
            {REQUEST_TYPES_DATA.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{item.type}</span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.count} <span className={`text-[10px] font-medium ml-1 ${subText}`}>({item.percentage}%)</span></span>
                </div>
                <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: `${item.percentage}%` }} transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}