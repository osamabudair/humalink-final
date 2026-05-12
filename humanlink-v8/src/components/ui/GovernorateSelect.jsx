import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { GOVERNORATES } from '../../data/governorates';
import { useTheme } from '../../context/ThemeContext';

export default function GovernorateSelect({ value = '', onChange, label = 'Governorate', placeholder = 'Select governorate', error, required = false }) {
  const [focused, setFocused] = useState(false);
  const { isDark } = useTheme();

  const wrapCls = isDark
    ? `bg-slate-800/60 border ${focused ? 'border-[#153147]/60' : error ? 'border-red-500/50' : 'border-slate-600'}`
    : `bg-white border ${focused ? 'border-blue-400' : error ? 'border-red-400' : 'border-slate-200'} shadow-sm`;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
          {label}{required && <span className="text-blue-500"> *</span>}
        </label>
      )}
      <div className={`relative flex items-center rounded-xl transition-all ${wrapCls}`}>
        <MapPin size={15} className={`absolute left-3 pointer-events-none ${focused ? 'text-blue-500' : isDark ? 'text-gray-600' : 'text-slate-400'}`} />
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent text-sm outline-none pl-9 pr-8 py-2.5 appearance-none cursor-pointer ${isDark ? 'text-white' : 'text-slate-800'}`}
        >
          <option value="" className={isDark ? 'bg-slate-900' : 'bg-white'}>{placeholder}</option>
          {GOVERNORATES.map(g => (
            <option key={g} value={g} className={isDark ? 'bg-slate-900' : 'bg-white'}>{g}</option>
          ))}
        </select>
        <ChevronDown size={14} className={`absolute right-3 pointer-events-none ${isDark ? 'text-gray-600' : 'text-slate-400'}`} />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
