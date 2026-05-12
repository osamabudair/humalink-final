import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, User, RefreshCw, Plus, History, 
  MessageSquare, FolderOpen, Activity 
} from 'lucide-react';

const CASES_DATA = [
  { 
    id: 'CASE-301', title: 'Emergency Medical Support - Ali Family', 
    status: 'In Progress', volunteer: 'Rami Ahmad', progress: 65, 
    priority: 'High', time: '10 min ago',
    description: 'Ongoing medical support requiring bi-weekly checkups and medication delivery.',
    timeline: [
      { id: 1, date: 'Apr 28, 10:00 AM', note: 'First batch of medication delivered successfully.', author: 'Rami Ahmad' }
    ]
  },
  { 
    id: 'CASE-302', title: 'Shelter Relief for Displaced Family', 
    status: 'Open', volunteer: 'Unassigned', progress: 10, 
    priority: 'High', time: '1 hour ago',
    description: 'Requires a team of 3 volunteers to repair the roof before winter.',
    timeline: [
      { id: 1, date: 'Apr 27, 02:00 PM', note: 'Materials budget approved.', author: 'System Admin' }
    ]
  },
  { 
    id: 'CASE-303', title: 'Educational Sponsorship - Grade 10', 
    status: 'Closed', volunteer: 'Sara Nabil', progress: 100, 
    priority: 'Normal', time: '2 days ago',
    description: 'Full year tuition and books sponsorship.',
    timeline: [
      { id: 1, date: 'Apr 20, 11:00 AM', note: 'Case closed successfully.', author: 'Sara Nabil' }
    ]
  },
  { 
    id: 'CASE-304', title: 'Urgent Winter Supply Distribution', 
    status: 'Open', volunteer: 'Unassigned', progress: 0, 
    priority: 'High', time: '2 hours ago',
    description: 'Blankets and heaters needed urgently for the Al-Zaatari camp before the storm.',
    timeline: []
  },
];

export default function CasesTab({ isDark, cardBg, subText }) {
  // حالة (State) اختيار الحالة، تم نقلها هنا لتخفيف الكود الرئيسي
  const [selectedCase, setSelectedCase] = useState(null);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
      
      {/* هل هناك حالة محددة لعرض تفاصيلها؟ */}
      {selectedCase ? (
        
        /* ── CASE DETAILS VIEW ── */
        <div className={`p-6 rounded-2xl border flex flex-col lg:flex-row gap-6 ${cardBg}`}>
          
          {/* العمود الأيمن/الأول: المعلومات الأساسية */}
          <div className="flex-1 space-y-6">
            <button 
              onClick={() => setSelectedCase(null)}
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <ArrowLeft size={16} /> Back to Cases
            </button>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                  selectedCase.status === 'Closed' ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' : 
                  selectedCase.status === 'Open' ? 'bg-emerald-100 text-emerald-600' : 
                  'bg-blue-100 text-blue-600'
                }`}>
                  {selectedCase.status}
                </span>
                <span className={`text-sm font-medium ${subText}`}>{selectedCase.id}</span>
              </div>
              <h2 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{selectedCase.title}</h2>
              <p className={`text-sm leading-relaxed ${subText}`}>{selectedCase.description}</p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'border-slate-700/50 bg-slate-800/30' : 'border-slate-200 bg-slate-50'}`}>
              <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>Assigned Volunteer</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                  <User size={18} />
                </div>
                <div>
                  <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedCase.volunteer}</p>
                  <p className={`text-xs ${subText}`}>Primary Handler</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 transition-all">
                <RefreshCw size={16} /> Change Status
              </button>
              <button className={`flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border transition-all ${isDark ? 'border-slate-600 text-white hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
                <Plus size={16} /> Add Update
              </button>
            </div>
          </div>

          {/* العمود الأيسر/الثاني: الجدول الزمني (Timeline) */}
          <div className={`flex-1 lg:max-w-md p-5 rounded-xl border ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white'}`}>
            <h3 className={`font-semibold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              <History size={18} className="text-blue-500" /> Timeline & Updates
            </h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-600 before:to-transparent">
              {selectedCase.timeline.length > 0 ? selectedCase.timeline.map((item, index) => (
                <div key={item.id} className="relative flex items-start gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 ${isDark ? 'bg-slate-800 border-blue-500' : 'bg-white border-blue-500'}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  </div>
                  <div className="flex-1 pb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider text-blue-500`}>{item.date}</span>
                    <p className={`text-sm mt-1 mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.note}</p>
                    <span className={`text-xs flex items-center gap-1 ${subText}`}>
                      <MessageSquare size={12} /> {item.author}
                    </span>
                  </div>
                </div>
              )) : (
                <p className={`text-sm text-center py-4 ${subText}`}>No updates available yet.</p>
              )}
            </div>
          </div>

        </div>

      ) : (

        /* ── CASES LIST VIEW ── */
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>Active Cases Directory</h2>
            <button className="text-sm text-blue-500 font-medium hover:underline">+ New Case</button>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {CASES_DATA.map(c => (
              <motion.div 
                key={c.id} 
                whileHover={{ y: -4 }}
                className={`p-5 rounded-2xl border flex flex-col gap-4 transition-all ${cardBg}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                      <FolderOpen size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className={`font-semibold text-sm line-clamp-1 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{c.title}</h4>
                      <p className={`text-xs mt-0.5 ${subText}`}>{c.id}</p>
                    </div>
                  </div>
                </div>

                {/* Status & Volunteer */}
                <div className="flex items-center justify-between pt-2">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 w-fit ${
                    c.status === 'Closed' ? 'bg-slate-100 text-slate-600' : 
                    c.status === 'Open' ? 'bg-emerald-100 text-emerald-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <Activity size={10} /> {c.status}
                  </span>
                  <span className={`text-xs flex items-center gap-1 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <User size={12} className={subText} /> {c.volunteer}
                  </span>
                </div>

                {/* Linear Progress Bar */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-700/50">
                  <div className="flex justify-between text-xs">
                    <span className={subText}>Progress</span>
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-700'}`}>{c.progress}%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${c.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                      style={{ width: `${c.progress}%` }} 
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-2">
                  <button 
                    onClick={() => setSelectedCase(c)}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-colors"
                  >
                    View Details
                  </button>
                  {c.status !== 'Closed' && (
                    <button className="flex-1 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      Update
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}