import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthModal    from './components/ui/AuthModal';
import Toast        from './components/ui/Toast';
import Chatbot      from './components/ui/Chatbot';
import Home          from './pages/Home';
import Opportunities from './pages/Opportunities';
import Organizations from './pages/Organizations';
import About         from './pages/About';
import Login         from './pages/Login';
import Register      from './pages/Register';
import Dashboard     from './pages/Dashboard';
import Profile       from './pages/Profile';
import OrgDashboard  from './pages/OrgDashboard';
import OrgSettings   from './pages/OrgSettings';


export default function App() {
  return (
    <BrowserRouter>
      <AuthModal />
      <Toast />
      <Chatbot />
      <Routes>
        <Route path="/"              element={<Home />}          />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/about"         element={<About />}         />
        <Route path="/login"         element={<Login />}         />
        <Route path="/register"      element={<Register />}      />
        <Route path="/dashboard"     element={<Dashboard />}     />
        <Route path="/profile"       element={<Profile />}       />
        <Route path="/org-dashboard" element={<OrgDashboard />}  />
        <Route path="*"              element={<Navigate to="/" replace />} />
        <Route path="/settings"       element={<OrgSettings />}     />
        
      </Routes>
    </BrowserRouter>
  );
}
