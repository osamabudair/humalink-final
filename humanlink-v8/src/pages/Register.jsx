import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, Accessibility, ArrowLeft, ArrowRight, User, Mail, Lock,
  Eye, EyeOff, Sparkles, CheckCircle2,
  HeartHandshake, Zap, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLang }  from '../context/LangContext';
import { useAuth }  from '../context/AuthContext';
import GovernorateSelect      from '../components/ui/GovernorateSelect';
import PasswordStrengthMeter  from '../components/ui/PasswordStrengthMeter';
import SkillPicker            from '../components/ui/SkillPicker';

/* ── Validation ─────────────────────────────── */
function validate(basic) {
  const e = {};
  if (!basic.name?.trim())    e.name     = 'Name is required';
  if (!basic.email?.trim())   e.email    = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(basic.email)) e.email = 'Invalid email';
  if (!basic.password)        e.password = 'Required';
  else if (basic.password.length < 8) e.password = 'Min 8 characters';
  if (basic.password !== basic.confirm) e.confirm = "Passwords don't match";
  return e;
}

/* ── Field component ────────────────────────── */
function Field({ label, type='text', placeholder, value, onChange, icon:Icon, error, required }) {
  const { isDark } = useTheme();
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  const isPwd = type === 'password';
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {label}{required && <span style={{color:'#153147'}}> *</span>}
        </label>
      )}
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
        focused
          ? 'border-[#153147]/50 ring-2 ring-[#153147]/10'
          : error
          ? 'border-red-400'
          : isDark ? 'border-slate-600 bg-slate-800/60' : 'border-[#EDEAE4] bg-white'
      }`}>
        {Icon && <Icon size={15} className={focused ? 'text-[#153147]' : isDark ? 'text-slate-500' : 'text-slate-400'} />}
        <input
          type={isPwd ? (show ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`flex-1 bg-transparent text-sm outline-none ${isDark ? 'text-white placeholder-slate-600' : 'text-[#232A2F] placeholder-slate-400'}`}
        />
        {isPwd && (
          <button type="button" onClick={() => setShow(!show)}
            className={`transition-colors ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}>
            {show ? <EyeOff size={14}/> : <Eye size={14}/>}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* ── Chips ──────────────────────────────────── */
function Chips({ label, options, value, onChange, multi=false }) {
  const { isDark } = useTheme();
  const isActive = o => multi ? (value||[]).includes(o) : value === o;
  const toggle   = o => {
    if (multi) { const arr=value||[]; onChange(arr.includes(o) ? arr.filter(x=>x!==o) : [...arr,o]); }
    else onChange(o);
  };
  return (
    <div className="flex flex-col gap-2">
      {label && <label className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</label>}
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button key={o} type="button" onClick={() => toggle(o)}
            className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
              isActive(o)
                ? 'text-white border-transparent'
                : isDark
                ? 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                : 'border-[#EDEAE4] text-slate-500 hover:border-[#ADB8BB] hover:text-slate-800'
            }`}
            style={isActive(o) ? { background: '#153147' } : {}}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── DarkTextarea ───────────────────────────── */
function DarkTextarea({ value, onChange, placeholder }) {
  const { isDark } = useTheme();
  return (
    <textarea
      className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none min-h-[80px] border ${
        isDark
          ? 'bg-slate-800/60 border-slate-600 text-white placeholder-slate-600 focus:border-slate-500'
          : 'bg-white border-[#EDEAE4] text-[#232A2F] placeholder-slate-400 focus:border-[#ADB8BB]'
      }`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

/* ── Roles ──────────────────────────────────── */
const ROLES = [
  { id:'volunteer', icon:HeartHandshake, label:'Volunteer',    sub:'Find & help'          },
  { id:'org',       icon:Building2,      label:'Organization', sub:'Post & manage'        },
  { id:'special',   icon:Accessibility,  label:'Special Needs',sub:'Accessible support'  },
];

/* ── Step components ────────────────────────── */
function StepRole({ role, onSelect }) {
  const { isDark } = useTheme();
  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Join HumaLink</h2>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Choose how you'll use the platform</p>
      </div>
      <div className="space-y-3">
        {ROLES.map((r,i) => {
          const Icon = r.icon;
          const sel  = role === r.id;
          return (
            <motion.button key={r.id} type="button" initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}
              whileHover={{ x: 4 }}
              onClick={() => onSelect(r.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                sel
                  ? 'border-2'
                  : isDark
                  ? 'border-slate-700 hover:border-slate-500'
                  : 'border-[#EDEAE4] hover:border-[#ADB8BB]'
              }`}
              style={sel ? { borderColor: '#153147', background: '#15314708' } : {}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: '#15314712', border:'1px solid #15314725' }}>
                <Icon size={22} style={{ color: '#153147' }}/>
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>{r.label}</p>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{r.sub}</p>
              </div>
              {sel && <CheckCircle2 size={20} style={{ color: '#153147' }} className="flex-shrink-0"/>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function StepBasic({ data, errors, onChange, role }) {
  const { isDark } = useTheme();
  const u = f => e => onChange({ ...data, [f]: e.target.value });
  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
        <p className="text-slate-500 text-sm">Tell us a bit about yourself</p>
      </div>
      <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${isDark ? 'border-slate-700 bg-slate-800/40 text-slate-300' : 'border-[#ADB8BB]/40 bg-[#EDEAE4]/60 text-[#153147]'}`}>
        <Sparkles size={12}/> This information helps our AI match you with the best opportunities
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Field label={role==='org' ? 'Organization Name' : 'Full Name'} placeholder="Enter name" value={data.name||''} onChange={u('name')} icon={User} error={errors.name} required/>
        </div>
        <Field label="Email" type="email" placeholder="you@example.com" value={data.email||''} onChange={u('email')} icon={Mail} error={errors.email} required/>
        <GovernorateSelect label="Governorate" value={data.governorate||''} onChange={v => onChange({...data, governorate:v})}/>
        <Field label="Password" type="password" placeholder="Min 8 characters" value={data.password||''} onChange={u('password')} icon={Lock} error={errors.password} required/>
        <Field label="Confirm Password" type="password" placeholder="Repeat password" value={data.confirm||''} onChange={u('confirm')} icon={Lock} error={errors.confirm} required/>
      </div>
      {data.password && <PasswordStrengthMeter password={data.password}/>}
      <Field label="Date of Birth" type="date" value={data.dob||''} onChange={u('dob')} icon={User}/>
    </div>
  );
}

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const ORG_TYPES = ['Charity / NGO','Educational','Environmental','Healthcare','Community','Government','Other'];
const ORG_SIZES = ['1–10','11–50','51–200','201–500','500+'];
const ACCESS_OPTS = ['Large Text','Screen Reader','Remote Only','Sign Language','Simplified UI'];

function StepRoleProfile({ role, data, onChange }) {
  const { isDark } = useTheme();
  const u = (f,v) => onChange({...data, [f]:v});

  if (role === 'volunteer') return (
    <div className="space-y-5">
      <div className="text-center mb-6"><h2 className="text-2xl font-bold mb-2">Your Profile</h2><p className="text-slate-500 text-sm">Customize your volunteer experience</p></div>
      <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${isDark ? 'border-slate-700 bg-slate-800/40 text-slate-300' : 'border-[#ADB8BB]/40 bg-[#EDEAE4]/60 text-[#153147]'}`}>
        <Zap size={12}/> Smart matching: skills &amp; interests power our AI recommendations
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">Skills</label>
        <SkillPicker selected={data.skills||[]} onChange={v => u('skills',v)}/>
      </div>
      <Chips label="Available Days" options={DAYS} value={data.days||[]} onChange={v => u('days',v)} multi/>
      <Chips label="Time Preference" options={['Morning','Afternoon','Evening','Flexible']} value={data.time} onChange={v => u('time',v)}/>
      <Chips label="Volunteering Type" options={['Online','On-site','Both']} value={data.volType} onChange={v => u('volType',v)}/>
      <Chips label="Prior Experience?" options={['Yes','No']} value={data.hasExp} onChange={v => u('hasExp',v)}/>
      {data.hasExp==='Yes' && <DarkTextarea value={data.expDesc||''} onChange={e => u('expDesc',e.target.value)} placeholder="Describe your experience (optional)..."/>}
    </div>
  );

  if (role === 'org') return (
    <div className="space-y-5">
      <div className="text-center mb-6"><h2 className="text-2xl font-bold mb-2">Organization Details</h2><p className="text-slate-500 text-sm">Help volunteers learn about your mission</p></div>
      <Chips label="Organization Type" options={ORG_TYPES} value={data.orgType} onChange={v => u('orgType',v)}/>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Mission / Description</label>
        <textarea className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none min-h-[80px] border ${isDark ? 'bg-slate-800/60 border-slate-600 text-white placeholder-slate-600 focus:border-slate-500' : 'bg-white border-[#EDEAE4] text-[#232A2F] placeholder-slate-400 focus:border-[#ADB8BB]'}`} placeholder="Describe your organization's mission..." value={data.mission||''} onChange={e => u('mission',e.target.value)}/>
      </div>
      <Chips label="Organization Size" options={ORG_SIZES} value={data.orgSize} onChange={v => u('orgSize',v)}/>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="text-center mb-6"><h2 className="text-2xl font-bold mb-2">Your Needs</h2><p className="text-slate-500 text-sm">Help us personalize your experience</p></div>
      <Chips label="Accessibility Needs" options={ACCESS_OPTS} value={data.accessNeeds||[]} onChange={v => u('accessNeeds',v)} multi/>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">Skills (optional)</label>
        <SkillPicker selected={data.skills||[]} onChange={v => u('skills',v)}/>
      </div>
      <Chips label="Availability" options={['Weekdays','Weekends','Flexible','Occasional']} value={data.availability} onChange={v => u('availability',v)}/>
    </div>
  );
}

function StepReview({ basic, roleData, role, onEdit, onSubmit, submitting }) {
  const { isDark } = useTheme();
  const roleMeta = { volunteer:{label:'Volunteer'}, org:{label:'Organization'}, special:{label:'Special Needs'} };
  const meta = roleMeta[role];
  const Row = ({ label, value }) => {
    if (!value || (Array.isArray(value) && !value.length)) return null;
    return (
      <div className="flex gap-3 py-1">
        <span className={`text-xs w-28 flex-shrink-0 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{label}</span>
        <span className={`text-xs font-medium ${isDark ? 'text-slate-200' : 'text-[#232A2F]'}`}>{Array.isArray(value) ? value.join(', ') : value}</span>
      </div>
    );
  };
  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3 text-white" style={{ background: '#153147' }}>{meta.label}</span>
        <h2 className="text-2xl font-bold mb-2">Review Your Profile</h2>
        <p className="text-slate-500 text-sm">Make sure everything looks correct</p>
      </div>
      <div className="space-y-3">
        {[
          { title:'Basic Information', editStep:2, rows:[['Name',basic.name],['Email',basic.email],['Governorate',basic.governorate]] },
          { title:'Profile Details', editStep:3, rows: role==='volunteer'
              ? [['Skills',roleData.skills],['Days',roleData.days],['Type',roleData.volType]]
              : role==='org'
              ? [['Org Type',roleData.orgType],['Mission',roleData.mission],['Size',roleData.orgSize]]
              : [['Accessibility',roleData.accessNeeds],['Skills',roleData.skills]]
          },
        ].map(section => (
          <div key={section.title} className={`p-4 rounded-2xl border ${isDark ? 'border-slate-700 bg-slate-800/40' : 'border-[#EDEAE4] bg-[#F9F8F7]'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{section.title}</span>
              <button onClick={() => onEdit(section.editStep)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all hover:opacity-80 ${isDark ? 'border-slate-600 text-slate-400 hover:text-white' : 'border-[#ADB8BB]/60 text-[#153147]'}`}>Edit</button>
            </div>
            {section.rows.map(([l,v]) => <Row key={l} label={l} value={v}/>)}
          </div>
        ))}
      </div>
      <motion.button onClick={onSubmit} disabled={submitting} whileHover={{ scale: submitting ? 1 : 1.01 }} whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-60 text-white font-semibold rounded-xl transition-all hover:opacity-90"
        style={{ background: '#153147' }}>
        {submitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <><CheckCircle2 size={16}/> Complete Registration</>}
      </motion.button>
    </div>
  );
}

function StepSuccess({ role, navigate }) {
  const { isDark } = useTheme();
  const paths = { volunteer:'/dashboard', org:'/org-dashboard', special:'/opportunities' };
  return (
    <div className="text-center space-y-5 py-6">
      <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', bounce:0.5, delay:0.1 }}
        className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto"
        style={{ background: '#153147' }}>
        <CheckCircle2 size={40} className="text-white"/>
      </motion.div>
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}>
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4 border ${
          isDark ? 'border-slate-600 text-slate-300 bg-slate-800/40' : 'border-[#EDEAE4] text-[#153147] bg-[#F9F8F7]'
        }`}>
          <Sparkles size={11}/> Registration Complete
        </div>
        <h2 className="text-3xl font-bold mb-2">Welcome aboard!</h2>
        <p className={`text-sm mb-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Your profile is live. Let's find opportunities that match your skills.</p>
        <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
          onClick={() => navigate(paths[role] || '/dashboard')}
          className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl transition-all hover:opacity-90"
          style={{ background: '#153147' }}>
          Go to Dashboard <ArrowRight size={16}/>
        </motion.button>
      </motion.div>
    </div>
  );
}

/* ══ MAIN COMPONENT ══════════════════════════ */
const STEPS = ['Role','Basics','Profile','Review'];

export default function Register() {
  const navigate = useNavigate();
  const { toggle, isDark } = useTheme();
  const { t, isRtl }  = useLang();
  const { login }     = useAuth();
  const [step, setStep]   = useState(1);
  const [dir, setDir]     = useState(1);
  const [role, setRole]   = useState(null);
  const [basic, setBasic] = useState({ name:'', email:'', password:'', confirm:'', governorate:'', dob:'' });
  const [roleData, setRoleData] = useState({});
  const [errors, setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]             = useState(false);

  const go = (target) => { setDir(target > step ? 1 : -1); setStep(target); };

  const next = () => {
    if (step === 1) { if (!role) return; go(2); }
    else if (step === 2) {
      const e = validate(basic);
      if (Object.keys(e).length) { setErrors(e); return; }
      setErrors({}); go(3);
    } else if (step === 3) { go(4); }
  };

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => {
      login({ name:basic.name, email:basic.email, role, governorate:basic.governorate, dob:basic.dob, skills:roleData.skills||[] });
      setSubmitting(false); setDone(true);
    }, 1500);
  };

  const variants = {
    enter: d => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: d => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden ${isDark ? 'bg-[#0f172a] text-white' : 'bg-[#F9F8F7] text-[#232A2F]'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Static subtle bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: isDark
          ? 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(21,49,71,0.3) 0%, transparent 70%)'
          : 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(173,184,187,0.15) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 w-full max-w-lg">
        {/* Top */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#153147' }}><Zap size={16} className="text-white" strokeWidth={2.5}/></div>
            <span className="font-bold" style={{color: isDark ? "#fff" : "#232A2F"}}>HumaLink</span>
          </button>
          <div className="flex items-center gap-2">
            <button onClick={toggle} className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${isDark ? 'border-slate-700 text-slate-400 hover:text-white bg-slate-800' : 'border-[#EDEAE4] text-slate-500 hover:text-slate-900 bg-white'}`}>
              {isDark ? <Sun size={15}/> : <Moon size={15}/>}
            </button>
            {!done && <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Have an account? <button onClick={() => navigate('/login')} className="font-medium hover:underline" style={{ color: '#153147' }}>Sign in</button></span>}
          </div>
        </div>

        <div className={`p-7 rounded-3xl border shadow-sm ${isDark ? 'bg-[#1e293b] border-slate-700/60' : 'bg-white border-[#EDEAE4]'}`}>
          {/* Progress */}
          {!done && (
            <>
              <div className={`h-1 rounded-full mb-5 overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-[#EDEAE4]'}`}>
                <motion.div className="h-full rounded-full" style={{background:"#153147"}}
                  animate={{ width:`${((step-1)/(STEPS.length-1))*100}%` }} transition={{ ease:'easeInOut', duration:0.4 }}/>
              </div>
              <div className="flex justify-center gap-2 mb-6">
                {STEPS.map((label,i) => {
                  const n = i+1;
                  return (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all
                        ${n < step ? 'text-white' : n === step ? 'text-white ring-2 ring-offset-2' : `${isDark ? 'bg-slate-700 text-slate-500' : 'bg-[#EDEAE4] text-slate-400'}`}`}
                        style={n <= step ? { background: n < step ? '#059669' : '#153147', ...(n === step ? { ringColor: '#15314740' } : {}) } : {}}>
                        {n < step ? '✓' : n}
                      </div>
                      <span className={`text-xs font-medium hidden sm:block ${n === step ? 'font-semibold' : 'text-gray-400'}`}>{label}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Step content */}
          <div className="overflow-hidden">
            {done ? (
              <StepSuccess role={role} navigate={navigate}/>
            ) : (
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration:0.22, ease:'easeInOut' }}>
                  {step === 1 && <StepRole role={role} onSelect={r => { setRole(r); setTimeout(() => go(2), 200); }}/>}
                  {step === 2 && <StepBasic data={basic} errors={errors} onChange={setBasic} role={role}/>}
                  {step === 3 && <StepRoleProfile role={role} data={roleData} onChange={setRoleData}/>}
                  {step === 4 && <StepReview basic={basic} roleData={roleData} role={role} onEdit={go} onSubmit={submit} submitting={submitting}/>}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Nav buttons */}
          {!done && step > 1 && step < 4 && (
            <div className="flex gap-3 mt-6">
              <button onClick={() => go(step-1)} className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl border transition-all ${isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-700' : 'border-[#EDEAE4] text-slate-600 hover:bg-[#F9F8F7]'}`}>
                <ArrowLeft size={14}/> Back
              </button>
              <motion.button onClick={next} whileHover={{ scale:1.01 }} whileTap={{ scale:0.97 }}
                className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-white rounded-xl transition-all py-2.5 hover:opacity-90"
                style={{ background: '#153147' }}>
                {step === 3 ? 'Review Profile' : 'Continue'} <ArrowRight size={14}/>
              </motion.button>
            </div>
          )}
        </div>

        {!done && <p className={`text-center text-xs mt-4 flex items-center justify-center gap-1.5 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}><Lock size={11}/> Your data is encrypted and never sold.</p>}
      </div>
    </div>
  );
}
