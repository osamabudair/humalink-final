import { usePasswordStrength } from '../../hooks/usePasswordStrength';

export default function PasswordStrengthMeter({ password }) {
  const { score, label, barColor, tips } = usePasswordStrength(password);
  if (!password) return null;
  return (
    <div className="flex flex-col gap-2 mt-1">
      <div className="flex gap-1">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: i <= score ? barColor : 'rgba(255,255,255,0.1)' }} />
        ))}
      </div>
      {label && (
        <div className="flex justify-between items-center">
          <p className="text-xs" style={{ color: barColor }}>{label}</p>
          {tips[0] && <p className="text-xs text-gray-500">{tips[0]}</p>}
        </div>
      )}
    </div>
  );
}
