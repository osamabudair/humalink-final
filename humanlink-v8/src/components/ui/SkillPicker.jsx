import { useState, useMemo } from 'react';
import { Search, X, Plus } from 'lucide-react';
import { SKILLS_BY_CATEGORY } from '../../data/skills';
import { useTheme } from '../../context/ThemeContext';

export default function SkillPicker({ selected = [], onChange, max = 15 }) {
  const [activeCat, setCat] = useState('All');
  const [query, setQuery]   = useState('');
  const [custom, setCustom] = useState('');
  const { isDark } = useTheme();

  const cats = ['All', ...Object.keys(SKILLS_BY_CATEGORY)];

  const visible = useMemo(() => {
    const pool = activeCat === 'All'
      ? Object.values(SKILLS_BY_CATEGORY).flat()
      : SKILLS_BY_CATEGORY[activeCat] ?? [];
    return query ? pool.filter(s => s.toLowerCase().includes(query.toLowerCase())) : pool;
  }, [activeCat, query]);

  const toggle = (skill) => {
    if (selected.includes(skill)) onChange(selected.filter(s => s !== skill));
    else if (selected.length < max) onChange([...selected, skill]);
  };

  const addCustom = () => {
    const sk = custom.trim();
    if (sk && !selected.includes(sk) && selected.length < max) { onChange([...selected, sk]); setCustom(''); }
  };

  const catBtn = (active) => active
    ? (isDark ? 'bg-[#153147]/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-700 border border-blue-300')
    : (isDark ? 'bg-slate-800/40 text-slate-400 border border-slate-600 hover:text-white hover:border-white/15' : 'bg-slate-100 text-slate-500 border border-slate-200 hover:text-slate-800');

  const chipBtn = (on, disabled) => {
    if (disabled) return isDark ? 'opacity-30 cursor-not-allowed bg-slate-800/20 border-slate-700 text-slate-600' : 'opacity-30 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400';
    if (on) return isDark ? 'bg-[#153147]/15 text-[#153147] border-[#153147]/40' : 'bg-blue-100 text-blue-700 border-blue-300';
    return isDark ? 'bg-slate-800/40 text-slate-400 border-slate-600 hover:border-slate-500 hover:text-white' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-800';
  };

  const searchBox = isDark ? 'bg-slate-800/60 border-slate-600 focus-within:border-slate-500der-blue-500/40' : 'bg-white border-slate-200 focus-within:border-blue-400 shadow-sm';
  const inputCls  = isDark ? 'text-white placeholder-gray-600' : 'text-slate-800 placeholder-slate-400';
  const customBox = isDark ? 'bg-slate-800/60 border-slate-600 text-white placeholder-gray-600 focus:border-blue-500/40' : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-400';

  return (
    <div className="flex flex-col gap-3">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-1.5">
        {cats.map(c => (
          <button key={c} type="button" onClick={() => setCat(c)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${catBtn(activeCat === c)}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className={`flex items-center gap-2 border rounded-xl px-3 py-2 transition-all ${searchBox}`}>
        <Search size={14} className={isDark ? 'text-gray-600' : 'text-slate-400'} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search skills..."
          className={`flex-1 bg-transparent text-sm outline-none ${inputCls}`} />
        {query && (
          <button type="button" onClick={() => setQuery('')} className={isDark ? 'text-gray-600 hover:text-white' : 'text-slate-400 hover:text-slate-700'}>
            <X size={12} />
          </button>
        )}
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
        {visible.map(skill => {
          const on = selected.includes(skill);
          const disabled = !on && selected.length >= max;
          return (
            <button key={skill} type="button" disabled={disabled} onClick={() => toggle(skill)}
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${chipBtn(on, disabled)}`}>
              {on && <X size={10} />}{skill}
            </button>
          );
        })}
      </div>

      {/* Custom skill */}
      <div className="flex gap-2">
        <input value={custom} onChange={e => setCustom(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCustom())}
          placeholder="Add custom skill..."
          className={`flex-1 border rounded-xl px-3 py-2 text-sm outline-none transition-all ${customBox}`} />
        <button type="button" onClick={addCustom} disabled={!custom.trim()}
          className={`flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl border disabled:opacity-40 disabled:cursor-not-allowed transition-all ${isDark ? 'bg-[#153147]/20 hover:bg-[#153147]/30 text-blue-400 border-blue-500/20' : 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200'}`}>
          <Plus size={13} />Add
        </button>
      </div>

      <p className={`text-xs text-right ${isDark ? 'text-gray-600' : 'text-slate-400'}`}>
        {selected.length}/{max} selected
      </p>
    </div>
  );
}
