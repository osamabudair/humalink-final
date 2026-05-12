import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Zap, Users, Building2, Globe2, ShieldCheck,
  Star, ChevronRight, HeartHandshake, Brain, Sparkles, Play,
  BookOpen, Accessibility
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang }  from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

function useTypingEffect(words, speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const delay = deleting ? speed / 2 : charIdx === word.length ? pause : speed;
    const timer = setTimeout(() => {
      if (!deleting && charIdx < word.length) {
        setDisplayed(word.slice(0, charIdx + 1)); setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === word.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplayed(word.slice(0, charIdx - 1)); setCharIdx(c => c - 1);
      } else {
        setDeleting(false); setWordIdx(i => (i + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return displayed;
}

export default function Home() {
  const navigate = useNavigate();
  const { t, isRtl, lang } = useLang();
  const { isDark }         = useTheme();

  const TYPING_WORDS = lang === 'ar'
    ? ['حقيقي.', 'دائم.', 'إنساني.', 'ملهم.']
    : ['Volunteers.', 'Impact.', 'Communities.', 'Purpose.'];
  const typed = useTypingEffect(TYPING_WORDS);

  // Color palette based on provided palette: Ivory/Almond/Mist/Navy/Noir
  const bg      = isDark ? 'bg-[#0f172a] text-white' : 'bg-[#F9F8F7] text-gray-900';
  const subText = isDark ? 'text-slate-400' : 'text-slate-500';
  const cardBg  = isDark
    ? 'bg-[#1e293b] border-slate-700/60 hover:border-slate-600'
    : 'bg-white border-[#EDEAE4] hover:border-[#ADB8BB] shadow-sm hover:shadow-md';
  const statCard = isDark ? 'bg-[#1e293b] border-slate-700/60' : 'bg-white border-[#EDEAE4] shadow-sm';

  const STATS = [
    { value: '120K+', labelKey: 'stat_volunteers',   icon: Users,       color: '#153147' },
    { value: '8.4K+', labelKey: 'stat_orgs',         icon: Building2,   color: '#153147' },
    { value: '12',    labelKey: 'stat_governorates', icon: Globe2,      color: '#153147' },
    { value: '94%',   labelKey: 'stat_accuracy',     icon: ShieldCheck, color: '#153147' },
  ];

  const FEATURES = [
    { icon: Brain,          color: '#153147', titleKey: 'feat_ai_title',       descKey: 'feat_ai_desc'       },
    { icon: HeartHandshake, color: '#153147', titleKey: 'feat_human_title',    descKey: 'feat_human_desc'    },
    { icon: Globe2,         color: '#153147', titleKey: 'feat_jordan_title',   descKey: 'feat_jordan_desc'   },
    { icon: ShieldCheck,    color: '#153147', titleKey: 'feat_verified_title', descKey: 'feat_verified_desc' },
    { icon: Zap,            color: '#153147', titleKey: 'feat_insights_title', descKey: 'feat_insights_desc' },
    { icon: Sparkles,       color: '#153147', titleKey: 'feat_smart_title',    descKey: 'feat_smart_desc'    },
  ];

  const TESTIMONIALS = [
    { name: 'Layla Al-Rashid', role: 'Volunteer, Amman',     text: 'Within 3 days I found an opportunity that matched every skill I have. The AI matching is genuinely impressive.', stars: 5, avatar: 'LA' },
    { name: 'Green Earth JO',   role: 'NGO, Zarqa',           text: 'Doubled our volunteer team in one month. The verification system built instant trust with applicants.',             stars: 5, avatar: 'GE' },
    { name: 'Ahmad Karimi',     role: 'Special Needs, Irbid', text: 'First platform that actually thought about accessibility from the start.',                                          stars: 5, avatar: 'AK' },
  ];

  // ROLE CARDS — icons instead of emojis
  const ROLE_CARDS = [
    {
      icon: Users,
      iconBg: '#153147',
      border: isDark ? 'border-slate-700' : 'border-[#EDEAE4]',
      bg: isDark ? 'bg-[#1e293b]' : 'bg-white',
      btn: 'bg-[#153147] hover:bg-[#1a3d5c]',
      labelKey: 'role_volunteer_label', titleKey: 'role_volunteer_title', descKey: 'role_volunteer_desc',
    },
    {
      icon: Building2,
      iconBg: '#153147',
      border: isDark ? 'border-slate-700' : 'border-[#EDEAE4]',
      bg: isDark ? 'bg-[#1e293b]' : 'bg-white',
      btn: 'bg-[#153147] hover:bg-[#1a3d5c]',
      labelKey: 'role_org_label',       titleKey: 'role_org_title',       descKey: 'role_org_desc',
    },
    {
      icon: Accessibility,
      iconBg: '#153147',
      border: isDark ? 'border-slate-700' : 'border-[#EDEAE4]',
      bg: isDark ? 'bg-[#1e293b]' : 'bg-white',
      btn: 'bg-[#153147] hover:bg-[#1a3d5c]',
      labelKey: 'role_special_label',   titleKey: 'role_special_title',   descKey: 'role_special_desc',
    },
  ];

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${bg}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Static subtle background — NO animation */}
        <div className={`absolute inset-0 pointer-events-none ${isDark ? 'bg-[#0f172a]' : 'bg-[#F9F8F7]'}`} />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: isDark
            ? 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(21,49,71,0.4) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(173,184,187,0.2) 0%, transparent 70%)',
        }} />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8 ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-[#EDEAE4] border-[#ADB8BB]/40 text-[#153147]'
            }`}>
            <Zap size={13} /> {t('hero_badge')}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>
            {t('hero_title1')}<br />
            <span style={{ color: '#153147' }}>{t('hero_title2')}</span>
            <span style={{ color: '#153147' }}>{typed}</span>
            <span className="animate-blink" style={{ color: '#153147' }}>|</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className={`text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 ${subText}`}>
            {t('hero_sub')}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="flex items-center gap-2 px-7 py-3.5 font-semibold rounded-2xl text-white transition-all hover:opacity-90"
              style={{ background: '#153147' }}>
              {t('hero_cta')} <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/opportunities')}
              className={`flex items-center gap-2 px-7 py-3.5 border font-medium rounded-2xl transition-all ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-[#EDEAE4] text-slate-700 hover:bg-[#F9F8F7] shadow-sm'
              }`}>
              <Play size={15} /> {t('hero_browse')}
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {STATS.map((st) => {
              const Icon = st.icon;
              return (
                <div key={st.labelKey} className={`rounded-2xl p-4 text-center border ${statCard}`}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: `${st.color}15` }}>
                    <Icon size={17} style={{ color: st.color }} />
                  </div>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{st.value}</p>
                  <p className={`text-xs mt-0.5 ${subText}`}>{t(st.labelKey)}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Role Cards ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>
              {t('roles_title')}
            </h2>
            <p className={subText}>{t('roles_sub')}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {ROLE_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.labelKey}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className={`relative p-7 rounded-2xl border cursor-pointer transition-all ${card.bg} ${card.border} hover:shadow-md`}
                  onClick={() => navigate('/register')}>
                  {/* Icon — properly centered */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${card.iconBg}12` }}>
                    <Icon size={22} style={{ color: card.iconBg }} />
                  </div>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                    {t(card.labelKey)}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{t(card.titleKey)}</h3>
                  <p className={`text-sm leading-relaxed mb-6 ${subText}`}>{t(card.descKey)}</p>
                  <button className={`flex items-center gap-2 text-sm font-semibold text-white px-4 py-2.5 rounded-xl transition-all ${card.btn}`}>
                    {t('role_get_started')} <ChevronRight size={14} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className={`py-24 px-6 ${isDark ? 'bg-[#1e293b]/50' : 'bg-[#EDEAE4]/40'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{t('feat_title')}</h2>
            <p className={subText}>{t('feat_sub')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.titleKey}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                  className={`p-6 rounded-2xl border transition-all ${cardBg}`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}12` }}>
                    <Icon size={20} style={{ color: f.color }} />
                  </div>
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{t(f.titleKey)}</h4>
                  <p className={`text-sm leading-relaxed ${subText}`}>{t(f.descKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{t('test_title')}</h2>
            <p className={subText}>{t('test_sub')}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((tm, i) => (
              <motion.div key={tm.name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl border flex flex-col gap-4 ${cardBg}`}>
                <div className="flex gap-1">{Array.from({ length: tm.stars }).map((_, j) => <Star key={j} size={14} className="text-amber-400" fill="currentColor" />)}</div>
                <p className={`text-sm leading-relaxed italic flex-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>"{tm.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: '#153147' }}>
                    {tm.avatar}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{tm.name}</p>
                    <p className={`text-xs ${subText}`}>{tm.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={`p-12 rounded-3xl border ${isDark ? 'bg-[#1e293b] border-slate-700' : 'bg-[#EDEAE4]/60 border-[#ADB8BB]/30'}`}>
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{t('cta_title')}</h2>
            <p className={`mb-8 ${subText}`}>{t('cta_sub')}</p>
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-2xl transition-all hover:opacity-90"
              style={{ background: '#153147' }}>
              {t('cta_btn')} <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
