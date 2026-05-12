import { useNavigate } from 'react-router-dom';
import { Zap, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { useLang }  from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const navigate = useNavigate();
  const { t, isRtl } = useLang();
  const { isDark }   = useTheme();
  const year = new Date().getFullYear();

  const cols = [
    { title: t('footer_platform'), links: [[t('footer_home'),'/'], [t('footer_opps'),'/opportunities'], [t('footer_orgs'),'/organizations'], [t('footer_register'),'/register']] },
    { title: t('footer_company'),  links: [[t('footer_about'),'/about'], [t('footer_blog'),'#'], [t('footer_careers'),'#'], [t('footer_contact'),'#']] },
    { title: t('footer_legal'),    links: [[t('footer_privacy'),'#'], [t('footer_terms'),'#'], [t('footer_access'),'#']] },
  ];

  const bg       = isDark ? 'border-slate-700/60 bg-slate-900/50' : 'border-slate-200 bg-slate-50';
  const heading  = isDark ? 'text-gray-500' : 'text-slate-400';
  const linkCls  = isDark ? 'text-gray-500 hover:text-white' : 'text-slate-500 hover:text-slate-900';
  const iconCls  = isDark ? 'bg-slate-800/40 hover:bg-slate-700/60 border-slate-700 text-gray-500 hover:text-white' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700';
  const copy     = isDark ? 'text-slate-500' : 'text-slate-400';
  const logoText = isDark ? 'text-white' : 'text-slate-800';
  const desc     = isDark ? 'text-gray-500' : 'text-slate-500';

  return (
    <footer className={`border-t ${bg}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-wrap gap-10 justify-between mb-10">
          <div className="max-w-xs">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg " style={{background:'#153147'}} className="flex items-center justify-center">
                <Zap size={14} className="text-white" strokeWidth={2.5} />
              </div>
              <span className={`font-bold ${logoText}`}>HumaLink</span>
            </button>
            <p className={`text-sm leading-relaxed ${desc}`}>
              Connecting volunteers, organizations, and communities across Jordan.
            </p>
            <div className="flex gap-2 mt-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${iconCls}`}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-10">
            {cols.map(col => (
              <div key={col.title}>
                <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${heading}`}>{col.title}</p>
                <div className="flex flex-col gap-2">
                  {col.links.map(([label, path]) => (
                    <button key={label} onClick={() => navigate(path)} className={`text-sm transition-colors text-left ${linkCls}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`border-t pt-6 flex flex-wrap justify-between items-center gap-4 ${isDark ? 'border-slate-700/60' : 'border-slate-200'}`}>
          <p className={`text-xs ${copy}`}>© {year} HumaLink. {t('footer_copy')}</p>
          <p className={`text-xs flex items-center gap-1 ${copy}`}>
            {t('footer_made')} <Heart size={10} className="text-red-400" fill="currentColor" /> {t('footer_for')}
          </p>
        </div>
      </div>
    </footer>
  );
}
