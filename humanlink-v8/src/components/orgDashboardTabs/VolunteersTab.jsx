import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ShieldCheck, ShieldAlert, Star, Eye, Briefcase } from 'lucide-react';
import { initials } from '../../utils'; // تأكد من صحة مسار الاستيراد حسب مجلداتك

const NAVY = '#153147';

const VOLUNTEERS_DATA = [
  { id: 'VOL-01', name: 'Rami Ahmad', status: 'Active', assignedCases: 3, rating: 4.8 },
  { id: 'VOL-02', name: 'Sara Nabil', status: 'Active', assignedCases: 1, rating: 4.9 },
  { id: 'VOL-03', name: 'Khaled Hassan', status: 'Inactive', assignedCases: 0, rating: 4.2 },
  { id: 'VOL-04', name: 'Laila Omar', status: 'Active', assignedCases: 2, rating: 4.7 },
];

export default function VolunteersTab({ isDark, cardBg, subText }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>Volunteers Roster</h2>
          <p className={`text-xs mt-1 ${subText}`}>Manage active volunteers and assign cases.</p>
        </div>
        <button className="py-2 px-4 rounded-xl text-xs font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center gap-2">
          <UserPlus size={14} /> Invite
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {VOLUNTEERS_DATA.map(vol => (
          <motion.div 
            key={vol.id} 
            whileHover={{ y: -4 }}
            className={`p-5 rounded-2xl border flex flex-col gap-4 transition-all ${cardBg}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm" style={{ background: NAVY }}>
                  {initials(vol.name)}
                </div>
                <div>
                  <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{vol.name}</h4>
                  <p className={`text-[10px] font-bold mt-0.5 ${subText}`}>{vol.id}</p>
                </div>
              </div>
            </div>

            <div className={`p-3 rounded-xl grid grid-cols-3 gap-2 divide-x ${isDark ? 'bg-slate-800/50 divide-slate-700' : 'bg-slate-50 divide-slate-200'}`}>
              <div className="flex flex-col items-center text-center">
                <span className={`text-[10px] font-semibold uppercase ${subText}`}>Status</span>
                <span className={`text-xs font-bold mt-1 flex items-center gap-1 ${vol.status === 'Active' ? 'text-emerald-500' : 'text-slate-400'}`}>
                  {vol.status === 'Active' ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                  {vol.status}
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className={`text-[10px] font-semibold uppercase ${subText}`}>Cases</span>
                <span className={`text-sm font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-800'}`}>{vol.assignedCases}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className={`text-[10px] font-semibold uppercase ${subText}`}>Rating</span>
                <span className="text-xs font-bold mt-1 flex items-center gap-0.5 text-amber-500">
                  {vol.rating} <Star size={10} fill="currentColor" />
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-100 dark:border-slate-700/50">
              <button className="flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center justify-center gap-1.5 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 border-slate-200 text-slate-600 hover:bg-slate-50">
                <Eye size={14} /> Profile
              </button>
              <button 
                disabled={vol.status !== 'Active'}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  vol.status === 'Active' 
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500'
                }`}
              >
                <Briefcase size={14} /> Assign
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}