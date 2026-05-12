import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Home, Briefcase, Building2, Info, LogIn, UserPlus, LogOut, ChevronDown, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLang }  from '../context/LangContext';
import { useAuth }  from '../context/AuthContext';
import { initials } from '../utils';

export default function Navbar() {
  const { theme, toggle, isDark } = useTheme();
  const { t, isRtl, lang, setLang } = useLang();
  const { user, logout }          = useAuth();
  const navigate = useNavigate();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [langMenu, setLangMenu] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (!e.target.closest('[data-menu]')) { setUserMenu(false); setLangMenu(false); }
    };
    document.addEventListener('click', fn);
    return () => document.removeEventListener('click', fn);
  }, []);

  const links = [
    { to: '/',              label: t('nav_home'),          icon: Home      },
    { to: '/opportunities', label: t('nav_opportunities'), icon: Briefcase },
    { to: '/organizations', label: t('nav_organizations'), icon: Building2 },
    { to: '/about',         label: t('nav_about'),         icon: Info      },
  ];

  const navBg = scrolled
    ? (isDark
        ? 'bg-[var(--navbar-bg)] border-[var(--navbar-border)]'
        : 'bg-[var(--navbar-bg)] border-[var(--navbar-border)] shadow-sm')
    : 'bg-transparent border-transparent';

  const logoText  = isDark ? 'text-white' : 'text-slate-800';
  const linkBase  = isDark
    ? 'text-gray-400 hover:text-white hover:bg-slate-800/40'
    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100';
  const linkActive = isDark
    ? 'text-white'
    : 'text-[#153147] bg-[#15314710]';
  const iconColor = isDark ? 'text-gray-400 hover:text-white hover:bg-slate-800/60' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100';
  const dropBg    = isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-xl';
  const dropText  = isDark ? 'text-gray-400 hover:bg-slate-800/40 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b  ${navBg}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
        {/* Logo */}
        <button onClick={() => navigate('/')} className="flex items-center gap-2.5 mr-auto group">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all" style={{ background: '#153147' }}>
            <Zap size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className={`font-bold text-lg tracking-tight ${logoText}`}>HumaLink</span>
        </button>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-1">
        {links.map(l => {
          const Icon = l.icon;
          return (
            <NavLink 
              key={l.to} 
              to={l.to} 
              end 
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? linkActive : linkBase}`
              }
              style={({ isActive }) => (isActive ? { background: '#153147' } : {})}
            >
              {({ isActive }) => (
                <>
                  <Icon size={14} className={isActive ? 'text-white' : ''} />
                  {l.label}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <div className="relative" data-menu="lang">
            <button
              onClick={() => setLangMenu(!langMenu)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${iconColor}`}
            >
              {lang === 'en' ? 'ع' : 'EN'}
            </button>
            <AnimatePresence>
              {langMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute top-full mt-2 right-0 w-36 border rounded-2xl p-1 shadow-premium overflow-hidden ${dropBg}`}
                >
                  {[{ code: 'en', label: 'English' }, { code: 'ar', label: 'العربية' }].map(l => (
                    <button key={l.code} onClick={() => { setLang(l.code); setLangMenu(false); }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${lang === l.code ? `font-semibold ${isDark ? 'text-white bg-slate-700' : 'text-[#153147] bg-[#15314710]'}` : dropText}`}>
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${iconColor}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* User area */}
          {user ? (
            <div className="relative" data-menu="user">
              <button onClick={() => setUserMenu(!userMenu)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all ${isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100'}`}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white overflow-hidden" style={{ background: '#153147' }}>
                  {user.avatar
                    ? <img src={user.avatar} className="w-full h-full rounded-lg object-cover" alt="" />
                    : initials(user.name)}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  {user.name?.split(' ')[0]}
                </span>
                <ChevronDown size={13} className={`transition-transform ${userMenu ? 'rotate-180' : ''} ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
              </button>

              <AnimatePresence>
                {userMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute top-full mt-2 right-0 w-56 border rounded-2xl p-2 shadow-premium ${dropBg}`}
                  >
                    <div className="px-3 py-2 mb-1">
                      <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{user.name}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{user.email}</p>
                    </div>
                    <div className={`h-px mb-1 ${isDark ? 'bg-slate-800/40' : 'bg-slate-100'}`} />
                    {[
                      { label: t('nav_dashboard'), path: '/dashboard' },
                      { label: t('nav_profile'), path: '/profile' },
                    ].map(item => (
                      <button key={item.path} onClick={() => { navigate(item.path); setUserMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${dropText}`}>
                        {item.label}
                      </button>
                    ))}
                    <div className={`h-px my-1 ${isDark ? 'bg-slate-800/40' : 'bg-slate-100'}`} />
                    <button onClick={() => { logout(); setUserMenu(false); navigate('/'); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all flex items-center gap-2">
                      <LogOut size={14} /> {t('nav_signout')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={() => navigate('/login')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                {t('nav_signin')}
              </button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/register')}
                className="px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90" style={{ background: '#153147' }}>
                {t('nav_getstarted')}
              </motion.button>
            </div>
          )}

          <button className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-all"
            onClick={() => setOpen(!open)}>
            {open ? <X size={18} className={isDark ? 'text-gray-400' : 'text-slate-600'} /> : <Menu size={18} className={isDark ? 'text-gray-400' : 'text-slate-600'} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t  overflow-hidden ${isDark ? 'border-slate-700/60 bg-[#1e293b]' : 'border-slate-200 bg-white'}`}
          >
            <div className="p-4 flex flex-col gap-1">
              {links.map(l => {
                const Icon = l.icon;
                return (
                  <NavLink key={l.to} to={l.to} end onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? linkActive : linkBase}`
                    }>
                    <Icon size={16} /> {l.label}
                  </NavLink>
                );
              })}
              <div className={`h-px my-1 ${isDark ? 'bg-slate-800/40' : 'bg-slate-200'}`} />
              {user ? (
                <button onClick={() => { logout(); setOpen(false); navigate('/'); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                  <LogOut size={16} /> {t('nav_signout')}
                </button>
              ) : (
                <>
                  <button onClick={() => { navigate('/login'); setOpen(false); }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${linkBase}`}>
                    <LogIn size={16} /> {t('nav_signin')}
                  </button>
                  <button onClick={() => { navigate('/register'); setOpen(false); }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90" style={{ background: '#153147' }}>
                    <UserPlus size={16} /> {t('nav_getstarted')}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
