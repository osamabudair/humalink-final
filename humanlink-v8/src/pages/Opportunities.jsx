import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Globe2, MapPin, Clock,
  CheckCircle2, X, Briefcase, Lock,
} from 'lucide-react';
import Navbar  from '../components/Navbar';
import Footer  from '../components/Footer';
import { useAuth }  from '../context/AuthContext';
import { useLang }  from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

const NAVY = '#153147';

const OPPS = [
  { id:1,  title:'English Tutoring for Refugees',    org:'Hope Bridge Foundation', gov:'Amman',  cat:'Education',   time:'4 hrs/wk',   remote:false, match:97, tags:['Teaching','English']   },
  { id:2,  title:'Web Developer for NGO Website',    org:'TechForGood JO',         gov:'',       cat:'Technology',  time:'6 hrs/wk',   remote:true,  match:95, tags:['React','CSS']           },
  { id:3,  title:'Food Bank Weekend Helper',         org:'Community Hands Zarqa',  gov:'Zarqa',  cat:'Community',   time:'Weekends',   remote:false, match:88, tags:['Logistics']             },
  { id:4,  title:'Mental Health Peer Support',       org:'Minds Matter Jordan',    gov:'',       cat:'Health',      time:'3 hrs/wk',   remote:true,  match:82, tags:['Counseling']            },
  { id:5,  title:'Tree Planting Campaign',           org:'Green Karak Initiative', gov:'Karak',  cat:'Environment', time:'Monthly',    remote:false, match:79, tags:['Environment']           },
  { id:6,  title:'Graphic Designer for Social Media',org:'Art for Change JO',      gov:'',       cat:'Arts',        time:'5 hrs/wk',   remote:true,  match:91, tags:['Design','Figma']        },
  { id:7,  title:'Elderly Companion & Care',         org:'Silver Hearts Irbid',    gov:'Irbid',  cat:'Health',      time:'3 hrs/wk',   remote:false, match:86, tags:['Care','Empathy']        },
  { id:8,  title:'Data Entry & Research Assistant',  org:'Open Data Initiative',   gov:'',       cat:'Technology',  time:'Flexible',   remote:true,  match:74, tags:['Research','Excel']      },
  { id:9,  title:'Youth Football Coach',             org:'Sports for All Aqaba',   gov:'Aqaba',  cat:'Sports',      time:'4 hrs/wk',   remote:false, match:70, tags:['Coaching','Sports']     },
  { id:10, title:'Arabic Literacy Tutor',            org:'Read Jordan Foundation', gov:'Madaba', cat:'Education',   time:'3 hrs/wk',   remote:false, match:93, tags:['Arabic','Teaching']     },
  { id:11, title:'Community Event Photographer',     org:'Jerash Heritage Society',gov:'Jerash', cat:'Arts',        time:'Occasional', remote:false, match:77, tags:['Photography']           },
  { id:12, title:'Online Translation Volunteer',     org:'UNHCR Jordan Partner',   gov:'',       cat:'Technology',  time:'Flexible',   remote:true,  match:88, tags:['Translation','Arabic']  },
];

const CATS = ['All','Education','Technology','Community','Health','Environment','Arts','Sports'];
const GOVERNORATES = ['Amman','Zarqa','Irbid','Aqaba','Karak','Madaba','Jerash','Ajloun','Mafraq','Tafilah',"Ma'an",'Balqa'];

// ── Apply Modal ─────────────────────────────────────────────────────────────
function ApplyModal({ opp, onClose, onConfirm, t, isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className={`w-full max-w-md rounded-3xl p-6 border shadow-xl ${isDark ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-[#EDEAE4]'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{t('opp_apply')}</h3>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
          >
            <X size={16} />
          </button>
        </div>
        <div className={`p-4 rounded-2xl border mb-5 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-[#F9F8F7] border-[#EDEAE4]'}`}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${NAVY}12` }}>
            <Briefcase size={18} style={{ color: NAVY }} />
          </div>
          <p className={`font-semibold ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{opp.title}</p>
          <p className="text-sm mt-0.5 font-medium" style={{ color: NAVY }}>{opp.org}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-all"
            style={{ background: NAVY }}
          >
            <CheckCircle2 size={15} /> Confirm Application
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────
export default function Opportunities() {
  const { user, requireAuth, applyToOpportunity } = useAuth();
  const { t, isRtl } = useLang();
  const { isDark }   = useTheme();

  const [search, setSearch]     = useState('');
  const [cat, setCat]           = useState('All');
  const [typeFilter, setType]   = useState('All');
  const [gov, setGov]           = useState('');
  const [applied, setApplied]   = useState(new Set());
  const [applyModal, setModal]  = useState(null);

  const filtered = OPPS
    .filter(o => {
      const q = search.toLowerCase();
      return (
        (o.title.toLowerCase().includes(q) || o.org.toLowerCase().includes(q)) &&
        (cat === 'All' || o.cat === cat) &&
        (typeFilter === 'All' || (typeFilter === 'Remote' ? o.remote : !o.remote)) &&
        (!gov || o.remote || o.gov === gov)
      );
    })
    .sort((a, b) => b.match - a.match);

  const handleApply = (opp) => {
    requireAuth(() => {
      if (!applied.has(opp.id)) setModal(opp);
    });
  };

  const confirmApply = (opp) => {
    setApplied(prev => new Set([...prev, opp.id]));
    applyToOpportunity({ id: opp.id, title: opp.title, org: opp.org });
  };

  const clearFilters = () => { setSearch(''); setCat('All'); setType('All'); setGov(''); };

  // Theme classes
  const bg        = isDark ? 'bg-[#0f172a] text-white'          : 'bg-[#F9F8F7] text-gray-900';
  const headerBg  = isDark ? 'bg-[#0f172a] border-slate-700/60' : 'bg-white border-[#EDEAE4]';
  const searchBox = isDark ? 'bg-[#1e293b] border-slate-700'    : 'bg-white border-[#EDEAE4] shadow-sm';
  const cardBg    = isDark ? 'bg-[#1e293b] border-slate-700/60 hover:border-slate-600' : 'bg-white border-[#EDEAE4] hover:border-[#ADB8BB] hover:shadow-md';
  const subText   = isDark ? 'text-slate-400'                   : 'text-slate-500';
  const filterBtnClass = (active) => active
    ? 'text-white border-transparent'
    : isDark
      ? 'bg-[#1e293b] border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
      : 'bg-white border-[#EDEAE4] text-slate-500 hover:text-slate-800 hover:border-[#ADB8BB]';

  const matchBadgeClass = (match) => match >= 90
    ? (isDark ? 'bg-emerald-400/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700')
    : match >= 80
      ? (isDark ? 'bg-amber-400/10 text-amber-400' : 'bg-amber-50 text-amber-700')
      : (isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bg}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar />

      {/* Header */}
      <div className={`pt-24 pb-12 px-6 border-b ${headerBg}`}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4 ${isDark ? 'bg-slate-800 border border-slate-700 text-slate-300' : 'bg-[#EDEAE4] border border-[#ADB8BB]/40 text-[#153147]'}`}
          >
            <Filter size={11} /> {filtered.length} {t('opp_found')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
            className={`text-4xl sm:text-5xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#232A2F]'}`}
          >
            {t('opp_title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
            className={`mb-8 ${subText}`}
          >
            {t('opp_sub')}
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            className={`flex items-center gap-3 max-w-2xl mx-auto border rounded-2xl px-4 py-3 transition-all ${searchBox}`}
          >
            <Search size={18} className={subText} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('opp_search')}
              className={`flex-1 bg-transparent text-sm outline-none ${isDark ? 'text-white placeholder-slate-600' : 'text-[#232A2F] placeholder-slate-400'}`}
            />
            <div className="flex gap-1">
              {['All', 'Remote', 'On-site'].map(tp => (
                <button
                  key={tp}
                  onClick={() => setType(tp)}
                  className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all text-white"
                  style={typeFilter === tp ? { background: NAVY } : { color: isDark ? '#94a3b8' : '#64748b' }}
                >
                  {tp === 'Remote' ? t('opp_remote') : tp === 'On-site' ? t('opp_onsite') : t('opp_all')}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-2">
            {CATS.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`text-xs px-3.5 py-2 rounded-xl font-medium border transition-all ${filterBtnClass(cat === c)}`}
                style={cat === c ? { background: NAVY } : {}}
              >
                {c}
              </button>
            ))}
          </div>

          <select
            value={gov}
            onChange={e => setGov(e.target.value)}
            className={`text-xs px-3 py-2 rounded-xl border outline-none cursor-pointer transition-all ${isDark ? 'bg-[#1e293b] border-slate-700 text-slate-400' : 'bg-white border-[#EDEAE4] text-slate-600'}`}
          >
            <option value="">{t('opp_allgov')}</option>
            {GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>

          {(gov || cat !== 'All' || typeFilter !== 'All' || search) && (
            <button
              onClick={clearFilters}
              className={`text-xs px-3 py-2 rounded-xl border transition-all ${isDark ? 'border-slate-600 text-slate-400 hover:border-slate-500' : 'border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100'}`}
            >
              {t('opp_clear')}
            </button>
          )}
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((opp, i) => {
            const isApplied = applied.has(opp.id);
            return (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -4 }}
                className={`p-5 rounded-2xl border flex flex-col gap-3 group transition-all ${cardBg}`}
              >
                {/* Top: icon + match */}
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${NAVY}10` }}>
                    <Briefcase size={18} style={{ color: NAVY }} />
                  </div>
                  {user ? (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${matchBadgeClass(opp.match)}`}>
                      {opp.match}%
                    </span>
                  ) : (
                    <span className={`text-xs px-2 py-0.5 rounded-lg flex items-center gap-1 ${isDark ? 'text-slate-500 bg-slate-800' : 'text-slate-400 bg-slate-100'}`}>
                      <Lock size={9} /> {t('opp_login_match')}
                    </span>
                  )}
                </div>

                {/* Title + org */}
                <div>
                  <h3 className={`text-sm font-semibold leading-snug transition-colors ${isDark ? 'text-white group-hover:text-slate-300' : 'text-[#232A2F] group-hover:text-[#153147]'}`}>
                    {opp.title}
                  </h3>
                  <p className="text-xs mt-1 font-medium" style={{ color: NAVY }}>{opp.org}</p>
                </div>

                {/* Location + time */}
                <div className="flex items-center gap-2 flex-wrap">
                  {opp.remote
                    ? <span className="flex items-center gap-1 text-xs text-emerald-600"><Globe2 size={10} />{t('opp_remote')}</span>
                    : <span className={`flex items-center gap-1 text-xs ${subText}`}><MapPin size={10} />{opp.gov}</span>
                  }
                  <span className={`flex items-center gap-1 text-xs ${subText}`}><Clock size={10} />{opp.time}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  <span className={`text-xs px-2 py-0.5 rounded-lg ${isDark ? 'bg-slate-700/60 text-slate-400' : 'bg-[#F9F8F7] text-slate-500'}`}>
                    {opp.cat}
                  </span>
                  {opp.tags.slice(0, 2).map(tag => (
                    <span key={tag} className={`text-xs px-2 py-0.5 rounded-lg ${isDark ? 'bg-slate-700/40 text-slate-400' : 'bg-[#EDEAE4] text-slate-600'}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Apply button */}
                <button
                  onClick={() => handleApply(opp)}
                  disabled={isApplied}
                  className={`mt-auto w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isApplied
                      ? `cursor-not-allowed ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`
                      : 'text-white hover:opacity-90'
                  }`}
                  style={!isApplied ? { background: NAVY } : {}}
                >
                  {isApplied ? <><CheckCircle2 size={13} /> Applied</> : t('opp_apply')}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `${NAVY}10` }}>
              <Search size={28} style={{ color: NAVY }} />
            </div>
            <p className={`mb-3 ${subText}`}>{t('opp_empty')}</p>
            <button onClick={clearFilters} className="text-sm font-medium hover:underline" style={{ color: NAVY }}>
              {t('opp_clear')}
            </button>
          </div>
        )}
      </div>

      <Footer />

      <AnimatePresence>
        {applyModal && (
          <ApplyModal
            opp={applyModal}
            onClose={() => setModal(null)}
            onConfirm={() => confirmApply(applyModal)}
            t={t}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
