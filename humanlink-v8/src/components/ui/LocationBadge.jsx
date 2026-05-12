import { MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function LocationBadge({ governorate, size='sm' }) {
  const { isDark } = useTheme();
  if (!governorate) return null;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-lg border ${
      isDark
        ? 'text-blue-400 bg-blue-500/10 border-blue-500/20'
        : 'text-blue-600 bg-blue-50 border-blue-200'
    }`}>
      <MapPin size={10} />{governorate}
    </span>
  );
}
