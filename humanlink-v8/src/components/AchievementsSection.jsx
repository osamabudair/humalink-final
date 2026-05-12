import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, CheckCircle2, Clock, Download, Eye, X,
  Calendar, Building2, Award, Zap, TrendingUp
} from 'lucide-react';
import { VOLUNTEER_ACHIEVEMENTS } from '../data/mockData';
import Certificate from './Certificate';

async function downloadCertificatePDF(volunteerName, achievement) {
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ]);

  const certEl = document.getElementById(`cert-render-${achievement.id}`);
  if (!certEl) throw new Error('Certificate element not found');

  const canvas = await html2canvas(certEl, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    width: 900,
    height: certEl.offsetHeight,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [900, certEl.offsetHeight] });
  pdf.addImage(imgData, 'PNG', 0, 0, 900, certEl.offsetHeight);
  pdf.save(`HumaLink_Certificate_${achievement.title.replace(/\s+/g, '_')}.pdf`);
}

// ── Reusable Badge ─────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const isComplete = status === 'Completed';
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
      isComplete
        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        : 'bg-amber-50 text-amber-700 border border-amber-200'
    }`}>
      {isComplete ? <CheckCircle2 size={11} /> : <Clock size={11} />}
      {status}
    </span>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, value, label, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm"
    >
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

// ── Achievement Card ───────────────────────────────────────────────────────
function AchievementCard({ ach, onPreview, onDownload, isDownloading, delay }) {
  const isComplete = ach.status === 'Completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col ${
        isComplete ? 'border-gray-200' : 'border-gray-200 opacity-85'
      }`}
    >
      {/* Top accent strip */}
      <div className={`h-1 w-full ${isComplete ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-amber-400 to-orange-400'}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <StatusBadge status={ach.status} />
          <Award size={20} className={isComplete ? 'text-amber-400' : 'text-gray-300'} />
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-gray-900 mb-1 leading-tight">{ach.title}</h3>

        {/* Org + Date */}
        <div className="flex items-center gap-4 flex-wrap mb-3">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <Building2 size={11} className="text-gray-400" /> {ach.organization}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <Calendar size={11} className="text-gray-400" />
            {new Date(ach.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{ach.description}</p>

        {/* Hours + Impact row */}
        <div className="flex items-center gap-3 flex-wrap mb-5">
          {ach.hours && (
            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
              <Clock size={12} className="text-[#153147]" /> {ach.hours} hrs
            </span>
          )}
          {ach.impact && (
            <span className="flex items-center gap-1.5 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg">
              <TrendingUp size={12} /> {ach.impact}
            </span>
          )}
        </div>

        {/* Actions */}
        {isComplete ? (
          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => onPreview(ach.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-slate-400 transition-colors"
            >
              <Eye size={13} /> Preview
            </button>
            <button
              onClick={() => onDownload(ach)}
              disabled={isDownloading}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed" style={{background:'#153147'}}
            >
              {isDownloading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                  <Download size={13} />
                </motion.div>
              ) : <Download size={13} />}
              {isDownloading ? 'Generating…' : 'Download PDF'}
            </button>
          </div>
        ) : (
          <div className="mt-auto py-2.5 rounded-xl text-center text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
            Certificate available upon completion
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function AchievementsSection({ volunteerName }) {
  const [previewId, setPreviewId] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const completed  = VOLUNTEER_ACHIEVEMENTS.filter(a => a.status === 'Completed');
  const inProgress = VOLUNTEER_ACHIEVEMENTS.filter(a => a.status === 'In Progress');
  const totalHours = VOLUNTEER_ACHIEVEMENTS.reduce((s, a) => s + (a.hours || 0), 0);

  const previewAchievement = VOLUNTEER_ACHIEVEMENTS.find(a => a.id === previewId);

  const handleDownload = async (ach) => {
    setDownloadingId(ach.id);
    try {
      await downloadCertificatePDF(volunteerName, ach);
    } catch (err) {
      console.error('PDF error:', err);
      alert('PDF generation failed. Make sure jspdf and html2canvas are installed.');
    } finally {
      setTimeout(() => setDownloadingId(null), 1500);
    }
  };

  const stats = [
    { icon: CheckCircle2, value: completed.length,  label: 'Completed',   color: 'from-emerald-500 to-teal-400',  delay: 0 },
    { icon: Clock,        value: totalHours,         label: 'Total Hours', color: 'from-blue-500 to-cyan-400',     delay: 0.05 },
    { icon: Zap,          value: inProgress.length,  label: 'In Progress', color: 'from-amber-500 to-orange-400',  delay: 0.1 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center shadow-sm">
          <Trophy size={22} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Achievements</h2>
          <p className="text-sm text-gray-500">
            {completed.length} completed · {inProgress.length} in progress
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Achievement Cards Grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {VOLUNTEER_ACHIEVEMENTS.map((ach, i) => (
          <AchievementCard
            key={ach.id}
            ach={ach}
            onPreview={setPreviewId}
            onDownload={handleDownload}
            isDownloading={downloadingId === ach.id}
            delay={i * 0.06}
          />
        ))}
      </div>

      {/* Hidden certificate renders for PDF */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1, pointerEvents: 'none' }}>
        {completed.map(ach => (
          <div key={ach.id} id={`cert-render-${ach.id}`}>
            <Certificate volunteerName={volunteerName} achievement={ach} />
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewId && previewAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50"
            onClick={() => setPreviewId(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-4xl"
            >
              {/* Close button */}
              <button
                onClick={() => setPreviewId(null)}
                className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors border border-gray-200"
              >
                <X size={16} />
              </button>

              {/* Certificate preview */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200" style={{ transform: 'scale(1)', transformOrigin: 'top center' }}>
                <Certificate volunteerName={volunteerName} achievement={previewAchievement} />
              </div>

              {/* Download CTA */}
              <button
                onClick={() => { handleDownload(previewAchievement); setPreviewId(null); }}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition-colors hover:opacity-90" style={{background:'#153147'}}
              >
                <Download size={16} /> Download Certificate as PDF
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
