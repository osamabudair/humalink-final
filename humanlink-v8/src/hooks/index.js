// src/hooks/index.js — custom hooks barrel
export { useAuth }    from '../context/AuthContext';
export { useLang }    from '../context/LangContext';
export { useTheme }   from '../context/ThemeContext';

// Re-export hooks for clean imports across the app
// Usage: import { useAuth, useLang } from '../hooks';
