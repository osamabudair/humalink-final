import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Zap, LogIn, UserPlus } from 'lucide-react';
import { useAuth }  from '../../context/AuthContext';
import { useLang }  from '../../context/LangContext';
import { useTheme } from '../../context/ThemeContext';

export default function AuthModal() {
  const { authModalOpen, closeModal } = useAuth();
  const { t, isRtl }                 = useLang();
  const { isDark }                   = useTheme();
  const navigate = useNavigate();

  const go = (path) => { closeModal(); navigate(path); };

  return (
    <AnimatePresence>
      {authModalOpen && (
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale:0.9, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.9, y:20 }}
            transition={{ type:'spring', bounce:0.25, duration:0.4 }}
            className={`w-full max-w-sm rounded-3xl border p-8 shadow-premium ${isDark ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}
            dir={isRtl ? 'rtl' : 'ltr'}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl  flex items-center justify-center">
                <Zap size={22} className="text-white" />
              </div>
              <button onClick={closeModal} className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isDark ? 'text-gray-500 hover:text-white hover:bg-slate-700/60' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'}`}>
                <X size={16}/>
              </button>
            </div>

            <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>{t('auth_title')}</h2>
            <p className={`text-sm mb-7 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t('auth_sub')}</p>

            <div className="flex flex-col gap-3">
              <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                onClick={() => go('/login')}
                className="flex items-center justify-center gap-2 py-3 bg-[#153147] hover:opacity-90 text-white font-semibold rounded-xl transition-all ">
                <LogIn size={16}/> {t('auth_signin')}
              </motion.button>
              <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                onClick={() => go('/register')}
                className={`flex items-center justify-center gap-2 py-3 border font-semibold rounded-xl transition-all ${isDark ? 'bg-slate-800/40 border-slate-700 text-white hover:bg-slate-700/60' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}>
                <UserPlus size={16}/> {t('auth_join')}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
