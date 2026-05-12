import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderOpen, ArrowLeft, Activity, Building, User, 
  Phone, Mail, MessageSquare, History, CheckCircle2 
} from 'lucide-react';

// ── بيانات وهمية لحالات المستفيد ──
const MY_CASES_DATA = [
  { 
    id: 'CASE-305', 
    title: 'Weekly Physical Therapy Sessions', 
    org: 'Hope Bridge Foundation',
    status: 'In Progress', 
    volunteer: 'Rami Ahmad', 
    allowContact: true,
    contactInfo: '+962 79 123 4567',
    progress: 45, 
    description: 'Bi-weekly transportation and assistance to the physical therapy rehabilitation center.',
    timeline: [
      { id: 1, date: '12 May, 09:00 AM', note: 'Completed second session for this month.', author: 'Rami Ahmad' },
      { id: 2, date: '05 May, 10:30 AM', note: 'Case assigned and first meeting conducted.', author: 'System Admin' }
    ]
  },
  { 
    id: 'CASE-280', 
    title: 'Home Accessibility Assessment', 
    org: 'Accessibility First NGO',
    status: 'Open', 
    volunteer: 'Unassigned', 
    allowContact: false,
    contactInfo: '',
    progress: 10, 
    description: 'Awaiting an engineering team to assess the house for wheelchair ramp installation.',
    timeline: [
      { id: 1, date: '08 May, 02:00 PM', note: 'Initial request approved. Awaiting volunteer assignment.', author: 'System Admin' }
    ]
  },
  { 
    id: 'CASE-150', 
    title: 'Winter Supplies Package', 
    org: 'Relief Jordan',
    status: 'Closed', 
    volunteer: 'Sara Nabil', 
    allowContact: false,
    contactInfo: '',
    progress: 100, 
    description: 'Distribution of heavy blankets and a gas heater for the winter season.',
    timeline: [
      { id: 1, date: '15 Dec 2023, 11:00 AM', note: 'Items delivered successfully. Case closed.', author: 'Sara Nabil' },
      { id: 2, date: '10 Dec 2023, 09:00 AM', note: 'Items packed and ready for dispatch.', author: 'System Admin' }
    ]
  },
];

export default function CasesTab({ isDark, cardBg, subText }) {
  // حالة (State) لاختيار الحالة وفتح تفاصيلها
  const [selectedCase, setSelectedCase] = useState(null);

  return (
    <AnimatePresence mode="wait">
      
      {/* ── 1. تفاصيل الحالة (Case Details View) ── */}
      {selectedCase ? (
        <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={`p-6 rounded-2xl border flex flex-col lg:flex-row gap-6 ${cardBg}`}>
          
          {/* العمود الأيمن/الأول: المعلومات والتواصل */}
          <div className="flex-1 space-y-6">
            <button 
              onClick={() => setSelectedCase(null)}
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <ArrowLeft size={16} /> Back to My Cases
            </button>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 ${
                  selectedCase.status === 'Closed' ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' : 
                  selectedCase.status === 'Open' ? 'bg-emerald-100 text-emerald-600' : 
                  'bg-blue-100 text-blue-600'
                }`}>
                  <Activity size={12} /> {selectedCase.status}
                </span>
                <span className={`text-sm font-medium ${subText}`}>{selectedCase.id}</span>
              </div>
              <h2 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{selectedCase.title}</h2>
              <div className={`flex items-center gap-2 text-sm font-semibold mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <Building size={16} className="text-blue-500" /> {selectedCase.org}
              </div>
              <p className={`text-sm leading-relaxed ${subText} bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl`}>
                {selectedCase.description}
              </p>
            </div>

            {/* بطاقة معلومات المتطوع */}
            <div className={`p-5 rounded-xl border ${isDark ? 'border-slate-700/50 bg-slate-800/30' : 'border-slate-200 bg-white shadow-sm'}`}>
              <h4 className={`text-sm font-bold mb-4 uppercase tracking-wider ${subText}`}>Assigned Volunteer</h4>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                    {selectedCase.volunteer === 'Unassigned' ? <User size={20} /> : selectedCase.volunteer.charAt(0)}
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedCase.volunteer}</p>
                    <p className={`text-xs mt-0.5 ${subText}`}>
                      {selectedCase.volunteer === 'Unassigned' ? 'Waiting for assignment' : 'Primary Handler'}
                    </p>
                  </div>
                </div>

                {/* زر التواصل يظهر فقط إذا كان مسموحاً */}
                {selectedCase.allowContact && selectedCase.volunteer !== 'Unassigned' && (
                  <a href={`tel:${selectedCase.contactInfo}`} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 transition-colors">
                    <Phone size={14} /> Call
                  </a>
                )}
              </div>
              
              {/* رسالة توضيحية إذا كان التواصل غير مسموح */}
              {!selectedCase.allowContact && selectedCase.volunteer !== 'Unassigned' && (
                <p className={`text-xs mt-4 flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <MessageSquare size={12} /> Contact is managed directly through the organization.
                </p>
              )}
            </div>
          </div>

          {/* العمود الأيسر/الثاني: الجدول الزمني (Timeline) */}
          <div className={`flex-1 lg:max-w-md p-6 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-50'}`}>
            <h3 className={`font-semibold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              <History size={18} className="text-blue-500" /> Updates & Timeline
            </h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-600 before:to-transparent">
              {selectedCase.timeline.length > 0 ? selectedCase.timeline.map((item, index) => (
                <div key={item.id} className="relative flex items-start gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 ${isDark ? 'bg-slate-800 border-blue-500' : 'bg-white border-blue-500'}`}>
                    {index === 0 ? <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> : null}
                  </div>
                  <div className="flex-1 pb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider text-blue-500`}>{item.date}</span>
                    <p className={`text-sm mt-1 mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.note}</p>
                    <span className={`text-xs font-medium flex items-center gap-1.5 ${subText}`}>
                      <User size={12} /> {item.author}
                    </span>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <p className={`text-sm ${subText}`}>No updates available yet.</p>
                </div>
              )}
            </div>
          </div>

        </motion.div>

      ) : (

        /* ── 2. قائمة الحالات (Cases List View) ── */
        <motion.div key="list" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>My Active & Past Cases</h2>
              <p className={`text-xs mt-1 ${subText}`}>Track the progress of your assigned cases and volunteers.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {MY_CASES_DATA.map(c => (
              <motion.div 
                key={c.id} 
                whileHover={{ y: -4 }}
                className={`p-5 rounded-2xl border flex flex-col gap-4 transition-all cursor-pointer ${cardBg} ${isDark ? 'hover:border-slate-500' : 'hover:border-slate-300 hover:shadow-md'}`}
                onClick={() => setSelectedCase(c)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                      <FolderOpen size={18} />
                    </div>
                    <div>
                      <h4 className={`font-bold text-sm line-clamp-1 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{c.title}</h4>
                      <p className={`text-xs mt-0.5 font-medium ${subText} flex items-center gap-1`}><Building size={10}/> {c.org}</p>
                    </div>
                  </div>
                </div>

                {/* Status & Volunteer */}
                <div className="flex items-center justify-between pt-2">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 w-fit ${
                    c.status === 'Closed' ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' : 
                    c.status === 'Open' ? 'bg-emerald-100 text-emerald-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <Activity size={10} /> {c.status}
                  </span>
                  <span className={`text-xs flex items-center gap-1.5 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <User size={12} className={subText} /> {c.volunteer}
                  </span>
                </div>

                {/* Linear Progress Bar */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-700/50">
                  <div className="flex justify-between text-xs">
                    <span className={subText}>Assistance Progress</span>
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-700'}`}>{c.progress}%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${c.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                      style={{ width: `${c.progress}%` }} 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

    </AnimatePresence>
  );
}