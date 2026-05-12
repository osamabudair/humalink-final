import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap, LogIn } from 'lucide-react';
import { useLang }  from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth }  from '../context/AuthContext';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
      <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
      <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18z"/>
      <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

const NAVY = '#153147';

export default function Login() {
  const navigate = useNavigate();
  const { t, isRtl }  = useLang();
  const { isDark }    = useTheme();
  const { login }     = useAuth();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPass, setShow]   = useState(false);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const [socialLoading, setSocialLoading] = useState('');

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      login({ name: 'Sara Al-Hassan', email: form.email, role: 'volunteer' });
      setLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  const handleSocial = (provider) => {
    setSocialLoading(provider);
    setTimeout(() => {
      login({ name: 'Sara Al-Hassan', email: `sara@example.com`, role: 'volunteer' });
      setSocialLoading('');
      navigate('/dashboard');
    }, 1500);
  };

  const update = f => e => setForm(prev => ({ ...prev, [f]: e.target.value }));

  const inputClass = (field) => [
    'flex items-center gap-3 px-4 py-3 rounded-xl border transition-all',
    focused === field
      ? (isDark ? 'bg-slate-800 border-[#153147]/60 ring-2 ring-[#153147]/10' : 'bg-white border-[#153147]/40 ring-2 ring-[#153147]/10')
      : errors[field]
        ? (isDark ? 'bg-slate-800/60 border-red-500/50' : 'bg-white border-red-400/50')
        : (isDark ? 'bg-slate-800/60 border-slate-600' : 'bg-white border-[#EDEAE4]'),
  ].join(' ');

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden ${isDark ? 'bg-[#0f172a]' : 'bg-[#F9F8F7]'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Static subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(21,49,71,0.3) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(173,184,187,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: NAVY }}
            >
              <Zap size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>
              HumaLink
            </span>
          </button>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-3xl border shadow-xl ${isDark ? 'bg-[#1e293b] border-slate-700/60' : 'bg-white border-[#EDEAE4]'}`}
        >
          <div className="text-center mb-8">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>
              {t('login_title')}
            </h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {t('login_sub')}
            </p>
          </div>

          {/* Social auth */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { provider: 'Google', Icon: GoogleIcon },
              { provider: 'LinkedIn', Icon: LinkedInIcon },
            ].map(({ provider, Icon }) => (
              <motion.button
                key={provider}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSocial(provider)}
                disabled={!!socialLoading}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  isDark
                    ? 'bg-slate-800/40 border-slate-700 text-white hover:bg-slate-700'
                    : 'bg-white border-[#EDEAE4] text-slate-700 hover:bg-[#F9F8F7] shadow-sm'
                }`}
              >
                {socialLoading === provider
                  ? <div className="w-4 h-4 border-2 border-slate-400/30 border-t-slate-400 rounded-full animate-spin" />
                  : <Icon />
                }
                {provider}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className={`flex-1 h-px ${isDark ? 'bg-slate-700' : 'bg-[#EDEAE4]'}`} />
            <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {t('login_or')}
            </span>
            <div className={`flex-1 h-px ${isDark ? 'bg-slate-700' : 'bg-[#EDEAE4]'}`} />
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className={`text-xs font-semibold uppercase tracking-wider block mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {t('login_email')}
              </label>
              <div className={inputClass('email')}>
                <Mail
                  size={16}
                  style={{ color: focused === 'email' ? NAVY : undefined }}
                  className={focused === 'email' ? '' : isDark ? 'text-slate-500' : 'text-slate-400'}
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  onKeyDown={e => e.key === 'Enter' && submit()}
                  placeholder="you@example.com"
                  className={`flex-1 bg-transparent text-sm outline-none ${isDark ? 'text-white placeholder-slate-600' : 'text-[#232A2F] placeholder-slate-400'}`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {t('login_password')}
                </label>
                <button
                  type="button"
                  className="text-xs font-medium hover:underline"
                  style={{ color: NAVY }}
                >
                  {t('login_forgot')}
                </button>
              </div>
              <div className={inputClass('password')}>
                <Lock
                  size={16}
                  style={{ color: focused === 'password' ? NAVY : undefined }}
                  className={focused === 'password' ? '' : isDark ? 'text-slate-500' : 'text-slate-400'}
                />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={update('password')}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused('')}
                  onKeyDown={e => e.key === 'Enter' && submit()}
                  placeholder="••••••••"
                  className={`flex-1 bg-transparent text-sm outline-none ${isDark ? 'text-white placeholder-slate-600' : 'text-[#232A2F] placeholder-slate-400'}`}
                />
                <button
                  type="button"
                  onClick={() => setShow(!showPass)}
                  className={`transition-colors ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={submit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-60 text-white font-semibold rounded-xl transition-all mt-2 hover:opacity-90"
              style={{ background: NAVY }}
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><LogIn size={16} /> {t('login_submit')}</>
              }
            </motion.button>
          </div>

          <p className={`text-center text-sm mt-6 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            {t('login_noacc')}{' '}
            <button
              onClick={() => navigate('/register')}
              className="font-semibold hover:underline"
              style={{ color: NAVY }}
            >
              {t('login_create')}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
