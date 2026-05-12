import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Eye, Check, X, FileText, ArrowLeft, Download } from 'lucide-react';

const REQUESTS_DATA = [
  { id: 'REQ-101', applicant: 'Ahmad Mahmoud', type: 'Medical', status: 'Pending', date: '2024-04-28', description: 'Urgent need for asthma medication and monthly checkup coverage.', docs: 2 },
  { id: 'REQ-102', applicant: 'Fatima Ali', type: 'Shelter', status: 'Approved', date: '2024-04-27', description: 'Request for tent repair materials and waterproof covers after the storm.', docs: 0 },
  { id: 'REQ-103', applicant: 'Omar Khaled', type: 'Education', status: 'Rejected', date: '2024-04-26', description: 'University tuition assistance for the fall semester.', docs: 3 },
  { id: 'REQ-104', applicant: 'Sara Nabil', type: 'Food', status: 'Pending', date: '2024-04-28', description: 'Monthly food parcel for a family of 5 members.', docs: 1 },
  { id: 'REQ-105', applicant: 'Khaled Hassan', type: 'Medical', status: 'Pending', date: '2024-04-25', description: 'Wheelchair replacement due to damage.', docs: 2 },
];

export default function RequestsTab({ isDark, cardBg, subText }) {
  const [selectedReq, setSelectedReq] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // فلترة الطلبات بناءً على الاختيارات
  const filteredRequests = REQUESTS_DATA.filter(req => {
    const matchStatus = statusFilter === 'All' || req.status === statusFilter;
    const matchType = typeFilter === 'All' || req.type === typeFilter;
    return matchStatus && matchType;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
      
      {/* هل هناك طلب محدد لعرض تفاصيله؟ */}
      {selectedReq ? (
        /* ── REQUEST DETAILS VIEW ── */
        <div className={`p-6 rounded-2xl border ${cardBg}`}>
          <button 
            onClick={() => setSelectedReq(null)}
            className={`flex items-center gap-2 mb-6 text-sm font-semibold transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <ArrowLeft size={16} /> Back to Requests
          </button>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{selectedReq.applicant}</h2>
              <div className="flex items-center gap-3">
                <span className={`text-sm ${subText}`}>{selectedReq.id}</span>
                <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                <span className={`text-sm font-medium ${subText}`}>{selectedReq.type}</span>
                <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                <span className={`text-sm ${subText}`}>{selectedReq.date}</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
              selectedReq.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 
              selectedReq.status === 'Rejected' ? 'bg-red-100 text-red-600' : 
              'bg-amber-100 text-amber-600'
            }`}>
              {selectedReq.status}
            </span>
          </div>

          <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
            <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>Description</h4>
            <p className={`text-sm leading-relaxed ${subText}`}>{selectedReq.description}</p>
          </div>

          <div className="mb-8">
            <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>Attached Documents ({selectedReq.docs})</h4>
            {selectedReq.docs > 0 ? (
              <div className="flex gap-3">
                {[...Array(selectedReq.docs)].map((_, i) => (
                  <div key={i} className={`flex items-center gap-2 p-2 px-3 rounded-lg border cursor-pointer transition-all ${isDark ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-100'}`}>
                    <FileText size={16} className="text-blue-500" />
                    <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Doc_{i+1}.pdf</span>
                    <Download size={14} className={subText} />
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-sm ${subText}`}>No documents attached.</p>
            )}
          </div>

          {/* Action Buttons */}
          {selectedReq.status === 'Pending' && (
            <div className="flex items-center gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
              <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-emerald-500 text-white hover:bg-emerald-600 transition-all">
                <Check size={16} /> Approve Request
              </button>
              <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 transition-all">
                <X size={16} /> Reject Request
              </button>
            </div>
          )}
        </div>

      ) : (

        /* ── REQUESTS TABLE VIEW ── */
        <div className={`rounded-2xl border flex flex-col ${cardBg}`}>
          
          {/* Filters Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>Manage Requests</h2>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter size={16} className={subText} />
                <select 
                  value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                  className={`text-sm rounded-lg p-1.5 border outline-none ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-700'}`}
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <select 
                value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
                className={`text-sm rounded-lg p-1.5 border outline-none ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-700'}`}
              >
                <option value="All">All Types</option>
                <option value="Medical">Medical</option>
                <option value="Shelter">Shelter</option>
                <option value="Education">Education</option>
                <option value="Food">Food</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`text-xs uppercase tracking-wider ${isDark ? 'bg-slate-800/50 text-slate-400' : 'bg-slate-50 text-slate-500'}`}>
                  <th className="p-4 font-semibold">Request ID</th>
                  <th className="p-4 font-semibold">Applicant</th>
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-700/50' : 'divide-slate-100'}`}>
                {filteredRequests.map(req => (
                  <motion.tr 
                    key={req.id} 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className={`transition-colors ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50/50'}`}
                  >
                    <td className={`p-4 text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{req.id}</td>
                    <td className={`p-4 text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{req.applicant}</td>
                    <td className={`p-4 text-sm ${subText}`}>{req.type}</td>
                    <td className={`p-4 text-sm ${subText}`}>{req.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold flex w-fit ${
                        req.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 
                        req.status === 'Rejected' ? 'bg-red-100 text-red-600' : 
                        'bg-amber-100 text-amber-600'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-center gap-2">
                      <button onClick={() => setSelectedReq(req)} className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                      {req.status === 'Pending' && (
                        <>
                          <button className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors" title="Approve">
                            <Check size={16} />
                          </button>
                          <button className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" title="Reject">
                            <X size={16} />
                          </button>
                        </>
                      )}
                    </td>
                  </motion.tr>
                ))}
                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan="6" className={`p-8 text-center text-sm ${subText}`}>No requests found matching your filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}