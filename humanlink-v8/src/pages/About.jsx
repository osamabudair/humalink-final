import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HeartHandshake, Target, Globe2, Brain, Zap, Code2, Sparkles, ArrowRight } from 'lucide-react';
import Navbar  from '../components/Navbar';
import Footer  from '../components/Footer';
import { useLang }  from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

export default function About() {
  const navigate = useNavigate();
  const { t, isRtl, lang } = useLang();
  const { isDark }          = useTheme();

  // FIX: Show name in selected language ONLY — not both at once
  const TEAM = [
    { name_en:'Noor Jehad',       name_ar:'نور جهاد',      roleKey:'role_founder',  icon:Zap,      color:'#f43f5e', bg:'from-rose-500',    initials:'NJ' },
    { name_en:'Nour Alsaht',      name_ar:'نور السحت',     roleKey:'role_backend',  icon:Code2,    color:'#3b82f6', bg:'from-blue-500',    initials:'NA' },
    { name_en:'Osama Budair',     name_ar:'أسامة بدير',    roleKey:'role_frontend', icon:Sparkles, color:'#8b5cf6', bg:'from-purple-500',  initials:'OB' },
    { name_en:'Muhannad Aburouq', name_ar:'مهند أبو روق',  roleKey:'role_backend',  icon:Code2,    color:'#10b981', bg:'from-emerald-500', initials:'MA' },
    { name_en:'Laith Alnajjar',   name_ar:'ليث النجار',    roleKey:'role_ai',       icon:Brain,    color:'#f59e0b', bg:'from-amber-500',   initials:'LA' },
  ];

  const VALUES = [
    { icon:HeartHandshake, color:'#f43f5e', titleKey:'val_human_title',    descKey:'val_human_desc'    },
    { icon:Globe2,         color:'#3b82f6', titleKey:'val_inclusive_title', descKey:'val_inclusive_desc' },
    { icon:Target,         color:'#10b981', titleKey:'val_impact_title',    descKey:'val_impact_desc'   },
    { icon:Brain,          color:'#f59e0b', titleKey:'val_ai_title',        descKey:'val_ai_desc'       },
  ];

  const bg      = isDark ? 'bg-[#0f172a] text-white' : 'bg-[#F9F8F7] text-gray-900';
  const subText = isDark ? 'text-slate-400' : 'text-slate-500';
  const cardBg  = isDark ? 'bg-[#1e293b] border-slate-700/60 hover:border-slate-600' : 'bg-white border-[#EDEAE4] hover:border-[#ADB8BB] shadow-sm hover:shadow-md';
  const statCard = isDark ? 'bg-[#1e293b] border-slate-700/60' : 'bg-white border-[#EDEAE4] shadow-sm';

  const STATS = [
    { value:'2024', labelKey:'about_founded' },
    { value:'120K+', labelKey:'about_volunteers' },
    { value:'12', labelKey:'about_governorates' },
    { value:'8.4K+', labelKey:'about_organizations' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bg}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 text-center relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-5 ${isDark ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
            <HeartHandshake size={11}/> {t('about_story')}
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08 }}
            className={`text-4xl sm:text-5xl font-bold mb-5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('about_title').split('\n')[0]}<br />
            <span className="gradient-text">{t('about_title').split('\n')[1] || ''}</span>
          </motion.h1>
          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.16 }}
            className={`text-lg leading-relaxed ${subText}`}>
            {t('about_sub')}
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((st, i) => (
            <motion.div key={st.labelKey}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
              className={`p-5 rounded-2xl border text-center ${statCard}`}>
              <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{st.value}</p>
              <p className={`text-sm mt-1 ${subText}`}>{t(st.labelKey)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className={`p-8 rounded-3xl border ${isDark ? 'bg-gradient-to-br from-blue-600/10 to-purple-600/5 border-blue-500/15' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'}`}>
            <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{t('about_mission')}</p>
            <p className={`text-2xl font-bold italic ${isDark ? 'text-white' : 'text-slate-800'}`}>
              "{t('about_mission_text')}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('about_values')}</h2>
            <p className={subText}>{t('about_values_sub')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.titleKey}
                  initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                  whileHover={{ y:-4 }}
                  className={`p-5 rounded-2xl border transition-all ${cardBg}`}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background:`${v.color}20` }}>
                    <Icon size={18} style={{ color:v.color }} />
                  </div>
                  <h4 className={`font-semibold mb-1.5 ${isDark ? 'text-white' : 'text-slate-800'}`}>{t(v.titleKey)}</h4>
                  <p className={`text-xs leading-relaxed ${subText}`}>{t(v.descKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team — FIX: show only selected language name */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('about_team')}</h2>
            <p className={subText}>{t('about_team_sub')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TEAM.map((m, i) => {
              const Icon = m.icon;
              const displayName = lang === 'ar' ? m.name_ar : m.name_en;
              return (
                <motion.div key={m.name_en}
                  initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.07 }}
                  whileHover={{ y:-4 }}
                  className={`p-6 rounded-2xl border flex flex-col items-center text-center transition-all ${cardBg}`}>
                  {/* Icon container — perfectly centered */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#15314712' }}>
                    <Icon size={22} style={{ color: '#153147' }} />
                  </div>
                  <p className={`font-semibold text-sm leading-tight ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{displayName}</p>
                  <p className="text-xs font-medium mt-1.5 text-[#153147]">{t(m.roleKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className={`p-10 rounded-3xl border ${isDark ? 'bg-[#1e293b] border-slate-700' : 'bg-[#EDEAE4]/60 border-[#ADB8BB]/30'}`}>
            <h2 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{t('about_cta')}</h2>
            <p className={`mb-6 ${subText}`}>{t('about_cta_sub')}</p>
            <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
              onClick={() => navigate('/register')}
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all hover:opacity-90"
              style={{ background: '#153147' }}>
              {t('about_cta_btn')} <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
