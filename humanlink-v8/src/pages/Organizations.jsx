import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, CheckCircle2, ArrowRight, Building2, MapPin, Globe2 } from 'lucide-react';
import Navbar  from '../components/Navbar';
import Footer  from '../components/Footer';
import { useAuth }  from '../context/AuthContext';
import { useLang }  from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import GovernorateSelect from '../components/ui/GovernorateSelect';

const ORGS = [
  { id:1, name:'Hope Bridge Foundation',   type:'Charity / NGO',  gov:'Amman',  vols:340, verified:true,  focus:['Refugees','Education'],    desc:'Bridging communities through education and vocational training.',              emoji:'🌉' },
  { id:2, name:'GreenTech Jordan',          type:'Environmental',  gov:'Zarqa',  vols:215, verified:true,  focus:['Environment','Technology'], desc:"Using technology to tackle Jordan's environmental challenges.",                emoji:'🌿' },
  { id:3, name:'Minds Matter Jordan',       type:'Healthcare',     gov:'',       vols:128, verified:true,  focus:['Mental Health','Wellbeing'],desc:'Providing accessible mental health support through trained volunteers.',       emoji:'🧠' },
  { id:4, name:'Community Hands Zarqa',     type:'Community',      gov:'Zarqa',  vols:482, verified:false, focus:['Food Security'],            desc:'Fighting food insecurity through community kitchens and food banks.',         emoji:'🤝' },
  { id:5, name:'Green Karak Initiative',    type:'Environmental',  gov:'Karak',  vols:670, verified:true,  focus:['Reforestation','Climate'],  desc:'Planting trees and building sustainable agriculture across southern Jordan.', emoji:'🌳' },
  { id:6, name:'Silver Hearts Irbid',       type:'Elderly Care',   gov:'Irbid',  vols:95,  verified:true,  focus:['Elderly','Health'],         desc:'Connecting compassionate volunteers with elderly individuals.',              emoji:'💙' },
  { id:7, name:'Jerash Heritage Society',   type:'Cultural',       gov:'Jerash', vols:160, verified:true,  focus:['Heritage','Tourism'],       desc:'Preserving ancient heritage through volunteer guide programs.',              emoji:'🏛️' },
  { id:8, name:'Aqaba Marine Volunteers',   type:'Environmental',  gov:'Aqaba',  vols:210, verified:true,  focus:['Marine','Environment'],     desc:"Protecting the Gulf of Aqaba's coral reef through diver programs.",          emoji:'🐠' },
  { id:9, name:'Read Jordan Foundation',    type:'Educational',    gov:'Madaba', vols:88,  verified:false, focus:['Literacy','Education'],     desc:'Promoting Arabic literacy and reading culture in Madaba.',                  emoji:'📚' },
];
const TYPES = ['All','Charity / NGO','Environmental','Healthcare','Community','Elderly Care','Cultural','Educational'];

export default function Organizations() {
  const { requireAuth } = useAuth();
  const { t, isRtl }    = useLang();
  const { isDark }      = useTheme();
  const [search, setSearch] = useState('');
  const [type, setType]     = useState('All');
  const [gov, setGov]       = useState('');

  const filtered = ORGS.filter(o => {
    const mS = o.name.toLowerCase().includes(search.toLowerCase());
    const mT = type === 'All' || o.type === type;
    const mG = !gov || !o.gov || o.gov === gov;
    return mS && mT && mG;
  });

  const bg       = isDark ? 'bg-[#0f172a] text-white' : 'bg-[#F9F8F7] text-gray-900';
  const hdrBg    = isDark ? 'bg-[#0f172a] border-slate-700/60' : 'bg-white border-[#EDEAE4]';
  const srchBox  = isDark ? 'bg-[#1e293b] border-slate-700 focus-within:border-slate-500' : 'bg-white border-[#EDEAE4] shadow-sm';
  const cardBg   = isDark ? 'bg-[#1e293b] border-slate-700/60 hover:border-slate-500' : 'bg-white border-[#EDEAE4] hover:border-[#ADB8BB] hover:shadow-md';
  const sub      = isDark ? 'text-gray-400' : 'text-slate-500';
  const fBtn = (a) => a
    ? (isDark ? 'text-white border-transparent' : 'text-white border-transparent')
    : (isDark ? 'bg-[#1e293b] border-slate-700 text-slate-400 hover:text-white hover:border-slate-500' : 'bg-white border-[#EDEAE4] text-slate-500 hover:text-slate-800 hover:border-[#ADB8BB]');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bg}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar />
      <div className={`pt-24 pb-12 px-6 border-b ${hdrBg}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-4 ${isDark?'bg-blue-500/10 border-blue-500/20 text-blue-400':'bg-blue-50 border-blue-200 text-blue-600'}`}>
            <Building2 size={11}/> {t('org_verified')}
          </motion.div>
          <motion.h1 initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.06}}
            className={`text-4xl sm:text-5xl font-bold mb-3 ${isDark?'text-white':'text-slate-900'}`}>{t('org_title')}</motion.h1>
          <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.12}}
            className={`mb-8 ${sub}`}>{t('org_sub')}</motion.p>
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.18}}
            className={`flex items-center gap-3 max-w-xl mx-auto border rounded-2xl px-4 py-3 transition-all ${srchBox}`}>
            <Search size={17} className={sub}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search organizations..."
              className={`flex-1 bg-transparent text-sm outline-none ${isDark?'text-white placeholder-gray-600':'text-slate-800 placeholder-slate-400'}`}/>
          </motion.div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-2">
            {TYPES.map(tp=>(
              <button key={tp} onClick={()=>setType(tp)}
                className={`text-xs px-3.5 py-2 rounded-xl font-medium border transition-all ${fBtn(type===tp)}`}>{tp}</button>
            ))}
          </div>
          <div className="w-48">
            <GovernorateSelect label="" value={gov} onChange={setGov} placeholder={t('opp_allgov')}/>
          </div>
          {gov && <button onClick={()=>setGov('')} className="text-xs text-rose-500 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 px-3 py-2 rounded-xl transition-all">× Clear</button>}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((org,i)=>(
            <motion.div key={org.id} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
              whileHover={{y:-4}} className={`p-5 rounded-2xl border flex flex-col gap-4 transition-all ${cardBg}`}>
              <div className="flex justify-between items-start">
                <span className="text-3xl"></span>
                {org.verified&&<span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg border ${isDark?'text-emerald-400 bg-emerald-500/10 border-emerald-500/20':'text-emerald-700 bg-emerald-50 border-emerald-200'}`}><CheckCircle2 size={10}/>{t('org_verified')}</span>}
              </div>
              <div>
                <h3 className={`font-bold ${isDark?'text-white':'text-slate-800'}`}>{org.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-500 mt-0.5">{org.type}</p>
              </div>
              <p className={`text-xs leading-relaxed flex-1 ${sub}`}>{org.desc}</p>
              <div className="flex items-center gap-2 flex-wrap">
                {org.gov
                  ? <span className={`text-xs flex items-center gap-1 ${isDark?'text-blue-400':'text-blue-600'}`}><MapPin size={10}/>{org.gov}</span>
                  : <span className="text-xs text-emerald-500 flex items-center gap-1"><Globe2 size={10}/>{t('org_remote')}</span>}
                <span className={`text-xs flex items-center gap-1 ${sub}`}><Users size={10}/>{org.vols}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {org.focus.map(f=><span key={f} className={`text-xs px-2 py-0.5 rounded-lg border ${isDark?'bg-slate-700/40 border-slate-700/60 text-slate-400' : 'bg-[#F9F8F7] border-[#EDEAE4] text-slate-500'}`}>{f}</span>)}
              </div>
              <motion.button whileTap={{scale:0.97}} onClick={()=>requireAuth(()=>{})}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold border rounded-xl transition-all text-white hover:opacity-90" style={{background:'#153147',borderColor:'#153147'}}>
                {t('org_view')} <ArrowRight size={13}/>
              </motion.button>
            </motion.div>
          ))}
        </div>
        {filtered.length===0&&(
          <div className={`text-center py-20 ${sub}`}>
            <Building2 size={40} className="mx-auto mb-3 opacity-30"/>
            <p>{t('org_empty')}</p>
            <button onClick={()=>{setSearch('');setType('All');setGov('');}} className="mt-4 text-blue-500 text-sm hover:underline">{t('org_reset')}</button>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}
