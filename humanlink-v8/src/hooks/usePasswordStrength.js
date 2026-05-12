import { useMemo } from 'react';

/**
 * usePasswordStrength — real-time password strength analysis.
 * Returns { score (0-5), label, color, tips[], barWidth }
 */
export function usePasswordStrength(password = '') {
  return useMemo(() => {
    const checks = {
      length:    password.length >= 8,
      upper:     /[A-Z]/.test(password),
      lower:     /[a-z]/.test(password),
      number:    /[0-9]/.test(password),
      symbol:    /[^A-Za-z0-9]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;

    const tips = [];
    if (!checks.length)  tips.push('Use at least 8 characters');
    if (!checks.upper)   tips.push('Add uppercase letters');
    if (!checks.lower)   tips.push('Add lowercase letters');
    if (!checks.number)  tips.push('Include a number');
    if (!checks.symbol)  tips.push('Add a symbol (e.g. ! @ #)');

    const levels = [
      { label: '',         color: 'transparent', barColor: 'transparent'    },
      { label: 'Weak',     color: '#ef4444',     barColor: '#ef4444'        },
      { label: 'Fair',     color: '#f97316',     barColor: '#f97316'        },
      { label: 'Good',     color: '#eab308',     barColor: '#eab308'        },
      { label: 'Strong',   color: '#22c55e',     barColor: '#22c55e'        },
      { label: 'Very Strong', color: '#10b981',  barColor: '#10b981'        },
    ];

    return {
      score,
      checks,
      tips,
      barWidth: `${(score / 5) * 100}%`,
      ...levels[score],
    };
  }, [password]);
}
