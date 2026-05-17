import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Eye, X, ArrowLeft, FileText, UploadCloud, 
  Edit3, MessageSquare 
} from 'lucide-react';

// بيانات وهمية ابتدائية للطلبات (تم تعديل التواريخ لأرقام)
const INITIAL_REQUESTS = [
  { 
    id: 'REQ-108', type: 'Medical Equipment', status: 'Pending', date: '2024-05-10',
    description: 'I need a replacement for my wheelchair battery as it is no longer holding a charge.',
    attachments: 1, orgNotes: '' 
  },
  { 
    id: 'REQ-092', type: 'Financial Support', status: 'Approved', date: '2024-04-15',
    description: 'Requesting monthly financial assistance for physical therapy transportation.',
    attachments: 2, orgNotes: 'Approved for 6 months. Please submit transportation receipts monthly.' 
  },
  { 
    id: 'REQ-045', type: 'Home Modification', status: 'Rejected', date: '2024-02-02',
    description: 'Need assistance to install a ramp at the front door.',
    attachments: 0, orgNotes: 'Unfortunately, your area is outside our current operational zone for construction modifications.' 
  },
];

export default function RequestsTab({ isDark, cardBg, subText }) {
  const [currentView, setCurrentView] = useState('list');
  const [selectedReq, setSelectedReq] = useState(null);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  const handleCancelRequest = (id) => {
    if (window.confirm('Are you sure you want to cancel this request?')) {
      setRequests(requests.map(req => req.id === id ? { ...req, status: 'Cancelled' } : req));
    }
  };

  const handleSubmitNewRequest = (e) => {
    e.preventDefault();
    alert('Request submitted successfully!');
    setCurrentView('list');
  };

  return (
    <AnimatePresence mode="wait">
      
      {/* ── 1. قائمة الطلبات (List View) ── */}
      {currentView === 'list' && (
        <motion.div key="list" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <div className={`rounded-2xl border flex flex-col ${cardBg}`}>
            
            <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>My Requests</h2>
                <p className={`text-xs mt-1 ${subText}`}>Track and manage all your submitted requests.</p>
              </div>
              <button 
                onClick={() => setCurrentView('create')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#153147] text-white hover:bg-opacity-90 transition-colors shadow-sm"
              >
                <Plus size={16} /> New Request
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`text-xs uppercase tracking-wider ${isDark ? 'bg-slate-800/50 text-slate-400' : 'bg-slate-50 text-slate-500'}`}>
                    <th className="p-4 font-semibold">Request ID</th>
                    <th className="p-4 font-semibold">Type</th>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-700/50' : 'divide-slate-100'}`}>
                  {requests.map(req => (
                    <tr key={req.id} className={`transition-colors ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50/50'}`}>
                      <td className={`p-4 text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{req.id}</td>
                      <td className={`p-4 text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{req.type}</td>
                      <td className={`p-4 text-sm ${subText}`}>{req.date}</td>
                      <td className="p-4">
                        {/* Status بدون أيقونات */}
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold inline-block ${
                          req.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 
                          req.status === 'Rejected' || req.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 
                          'bg-amber-100 text-amber-600'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="p-4 flex items-center justify-center gap-3">
                        {/* أزرار الأكشن معدلة لتطابق الصورة */}
                        <button 
                          onClick={() => { setSelectedReq(req); setCurrentView('details'); }} 
                          className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        
                        {req.status === 'Pending' && (
                          <button 
                            onClick={() => handleCancelRequest(req.id)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                            title="Cancel Request"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}


      {/* ── 2. تقديم طلب جديد (Create View) ── */}
      {currentView === 'create' && (
        <motion.div key="create" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={`p-6 rounded-2xl border ${cardBg}`}>
          <button onClick={() => setCurrentView('list')} className={`flex items-center gap-2 mb-6 text-sm font-semibold transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
            <ArrowLeft size={16} /> Back to Requests
          </button>

          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>Create New Request</h2>

          <form onSubmit={handleSubmitNewRequest} className="space-y-5 max-w-2xl">
            <div className="space-y-1.5">
              <label className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Request Type</label>
              <select required className={`w-full p-3 rounded-xl border outline-none transition-colors text-sm ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'}`}>
                <option value="">Select a category...</option>
                <option value="medical">Medical Equipment / Support</option>
                <option value="financial">Financial Assistance</option>
                <option value="education">Educational Support</option>
                <option value="housing">Home Modification / Shelter</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Description</label>
              <textarea 
                required rows="4" placeholder="Please describe your needs in detail..."
                className={`w-full p-3 rounded-xl border outline-none transition-colors text-sm resize-none ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'}`}
              ></textarea>
            </div>

            <div className="space-y-1.5">
              <label className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Upload Documents (Optional)</label>
              <div className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${isDark ? 'border-slate-700 bg-slate-800/50 hover:bg-slate-800' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isDark ? 'bg-slate-700 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <UploadCloud size={24} />
                </div>
                <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Click to upload or drag and drop</p>
                <p className={`text-xs mt-1 ${subText}`}>PDF, JPG, PNG (Max 5MB)</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#153147] text-white hover:bg-opacity-90 transition-colors shadow-sm">
                Submit Request
              </button>
              <button type="button" onClick={() => setCurrentView('list')} className={`px-6 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}


      {/* ── 3. تفاصيل الطلب (Details View) ── */}
      {currentView === 'details' && selectedReq && (
        <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={`p-6 rounded-2xl border ${cardBg}`}>
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setCurrentView('list')} className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
              <ArrowLeft size={16} /> Back to Requests
            </button>
            
            {selectedReq.status === 'Pending' && (
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-colors">
                <Edit3 size={14} /> Edit Request
              </button>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{selectedReq.type}</h2>
              <div className={`flex items-center gap-2 text-sm font-medium ${subText}`}>
                <span>{selectedReq.id}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span>Submitted on {selectedReq.date}</span>
              </div>
            </div>
            <span className={`px-4 py-1.5 rounded-xl text-sm font-bold flex gap-2 items-center shadow-sm ${
              selectedReq.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 
              selectedReq.status === 'Rejected' || selectedReq.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 
              'bg-amber-100 text-amber-600'
            }`}>
              {selectedReq.status}
            </span>
          </div>

          <div className="mb-6 space-y-2">
            <h4 className={`text-sm font-bold uppercase tracking-wider ${subText}`}>Description</h4>
            <div className={`p-4 rounded-xl leading-relaxed text-sm ${isDark ? 'bg-slate-800/50 text-slate-300' : 'bg-slate-50 text-slate-700'}`}>
              {selectedReq.description}
            </div>
          </div>

          <div className="mb-8 space-y-2">
            <h4 className={`text-sm font-bold uppercase tracking-wider ${subText}`}>Attachments ({selectedReq.attachments})</h4>
            {selectedReq.attachments > 0 ? (
              <div className="flex flex-wrap gap-3">
                {[...Array(selectedReq.attachments)].map((_, i) => (
                  <div key={i} className={`flex items-center gap-2 p-2 px-4 rounded-xl border cursor-pointer transition-all ${isDark ? 'border-slate-700 hover:bg-slate-700 bg-slate-800/30' : 'border-slate-200 hover:bg-slate-100 bg-white'}`}>
                    <FileText size={16} className="text-blue-500" />
                    <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Document_{i+1}.pdf</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-sm ${subText}`}>No documents were attached to this request.</p>
            )}
          </div>

          {selectedReq.orgNotes && (
            <div className={`p-5 rounded-2xl border-l-4 ${
              selectedReq.status === 'Approved' ? 'border-l-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500' : 
              'border-l-red-500 bg-red-50 dark:bg-red-500/10 dark:border-red-500'
            }`}>
              <h4 className={`flex items-center gap-2 font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <MessageSquare size={16} /> Notes from HumaLink Team
              </h4>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {selectedReq.orgNotes}
              </p>
            </div>
          )}

        </motion.div>
      )}

    </AnimatePresence>
  );
}