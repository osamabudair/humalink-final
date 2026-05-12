import { createContext, useContext, useState, useCallback } from 'react';

const usedIds = new Set();
function generateUserId() {
  let id;
  do { id = Math.floor(10000 + Math.random() * 90000); } while (usedIds.has(id));
  usedIds.add(id);
  return id;
}

export const defaultProfile = {
  name: '', email: '', userId: null, dob: '',
  governorate: '', bio: '', skills: [], avatar: null,
  role: 'volunteer', orgName: '', orgType: '',
  appliedOpportunities: [],
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]               = useState(null);
  const [authModalOpen, setModalOpen] = useState(false);
  const [authModalCb, setCb]          = useState(null);
  const [toast, setToast]             = useState(null);

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const login = useCallback((userData) => {
    const profile = {
      ...defaultProfile,
      userId: generateUserId(),
      name: 'Sara Al-Hassan',
      email: 'sara@example.com',
      role: 'volunteer',
      governorate: 'Amman',
      bio: 'Passionate about education and youth empowerment.',
      skills: ['Teaching', 'Design', 'Translation'],
      appliedOpportunities: [
        { id: 101, title: 'English Tutoring for Refugees', org: 'Hope Bridge Foundation', status: 'accepted', appliedDate: '2024-03-15' },
        { id: 102, title: 'Graphic Designer for Social Media', org: 'Art for Change JO', status: 'pending', appliedDate: '2024-04-02' },
        { id: 103, title: 'Mental Health Peer Support', org: 'Minds Matter Jordan', status: 'rejected', appliedDate: '2024-02-20' },
      ],
      ...userData,
    };
    setUser(profile);
    showToast('Welcome back, ' + profile.name.split(' ')[0] + '!');
  }, [showToast]);

  const logout = useCallback(() => {
    setUser(null);
    showToast('Signed out successfully.', 'info');
  }, [showToast]);

  const updateProfile = useCallback((updates) => {
    setUser(prev => ({ ...prev, ...updates }));
    showToast('Profile updated successfully!');
  }, [showToast]);

  const applyToOpportunity = useCallback((opp) => {
    setUser(prev => {
      if (!prev) return prev;
      const already = prev.appliedOpportunities?.some(a => a.id === opp.id);
      if (already) return prev;
      return {
        ...prev,
        appliedOpportunities: [
          ...(prev.appliedOpportunities || []),
          { ...opp, status: 'pending', appliedDate: new Date().toISOString().split('T')[0] },
        ],
      };
    });
    showToast('Application submitted successfully!');
  }, [showToast]);

  const requireAuth = useCallback((action) => {
    if (user) { action?.(); }
    else { setCb(() => action); setModalOpen(true); }
  }, [user]);

  const closeModal = useCallback(() => { setModalOpen(false); setCb(null); }, []);

  return (
    <AuthContext.Provider value={{
      user, login, logout, updateProfile, applyToOpportunity,
      requireAuth, authModalOpen, closeModal,
      toast, showToast,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
