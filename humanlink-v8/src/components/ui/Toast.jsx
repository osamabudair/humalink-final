import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useAuth }  from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const ICONS = {
  success: CheckCircle2,
  info:    Info,
  error:   AlertCircle,
};

const COLORS = {
  success: { bg: 'bg-emerald-500', text: 'text-emerald-700', lightBg: 'bg-emerald-50 border-emerald-200' },
  info:    { bg: 'bg-blue-500',    text: 'text-blue-700',    lightBg: 'bg-blue-50 border-blue-200'       },
  error:   { bg: 'bg-red-500',     text: 'text-red-700',     lightBg: 'bg-red-50 border-red-200'         },
};

export default function Toast() {
  const { toast } = useAuth();
  const { isDark } = useTheme();

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-premium text-sm font-medium pointer-events-auto min-w-[240px]
              ${isDark
                ? 'bg-[#1e293b] border-slate-700 text-white'
                : `${COLORS[toast.type]?.lightBg || 'bg-white border-slate-200'} ${COLORS[toast.type]?.text || 'text-slate-700'}`
              }`}>
            {(() => {
              const Icon = ICONS[toast.type] || CheckCircle2;
              const color = COLORS[toast.type];
              return (
                <>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? color.bg : 'bg-current/20'} text-white`}>
                    <Icon size={13} className={isDark ? 'text-white' : ''} />
                  </div>
                  <span className="flex-1">{toast.msg}</span>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
