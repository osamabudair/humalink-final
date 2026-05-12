import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, Zap, MessageCircle } from 'lucide-react';
import { useLang }  from '../../context/LangContext';
import { useTheme } from '../../context/ThemeContext';

const BOT_RESPONSES_EN = {
  opportunities: "🎯 Head to the **Opportunities** page and use the smart filters — search by governorate, category, or remote/on-site. Your Dashboard also shows AI-matched opportunities scored 0–100% based on your profile!",
  ai: "🤖 Our AI engine analyzes your **skills, location, availability, and interests** then scores every opportunity. The higher the score, the better the fit. Complete your profile to boost your match rate!",
  profile: "✨ Go to **My Profile** (click your avatar in the navbar). You can edit your name, bio, governorate, date of birth, and add your skills. Save any changes to update your match score!",
  skills: "💡 HumaLink supports **60+ skills** across categories: Technical, Medical, Education, Soft Skills, and Communication. Open the Skills section in your Profile to select them.",
  organizations: "🏢 We host verified **NGOs, charities, educational institutions, and environmental groups** — all across Jordan's 12 governorates. Each org has a verification badge.",
  register: "🎉 Registration takes about **2 minutes**! Choose your role (Volunteer, Organization, or Special Needs), fill in your details, pick your skills, and you're in!",
  default: "👋 Hi! I'm your HumaLink AI assistant. I can help you find opportunities, understand AI matching, or navigate the platform. What would you like to know?",
};

const BOT_RESPONSES_AR = {
  opportunities: "🎯 توجّه إلى صفحة **الفرص** واستخدم الفلاتر الذكية — ابحث حسب المحافظة أو الفئة أو نوع العمل. تجد أيضاً في لوحة التحكم فرصاً مطابقة بنسبة 0-100%!",
  ai: "🤖 يحلل محركنا الذكي **مهاراتك وموقعك وتوفرك واهتماماتك** ثم يُقيّم كل فرصة. كلما ارتفعت النسبة، كان التوافق أفضل. أكمل ملفك لزيادة نسبة التطابق!",
  profile: "✨ اذهب إلى **ملفي الشخصي** (انقر على صورتك في الشريط العلوي). يمكنك تعديل اسمك وسيرتك الذاتية ومحافظتك وتاريخ ميلادك ومهاراتك.",
  skills: "💡 تدعم هيومالينك أكثر من **60 مهارة** تشمل: التقني، الطبي، التعليمي، المهارات الشخصية والتواصل. افتح قسم المهارات في ملفك لاختيارها.",
  organizations: "🏢 نستضيف **منظمات غير ربحية، جمعيات خيرية، مؤسسات تعليمية وبيئية** موثقة في جميع محافظات الأردن الاثنتي عشرة.",
  register: "🎉 يستغرق التسجيل **دقيقتين فقط**! اختر دورك (متطوع أو منظمة أو احتياجات خاصة) ثم أدخل بياناتك واختر مهاراتك وانطلق!",
  default: "👋 أهلاً! أنا مساعد هيومالينك الذكي. أستطيع مساعدتك في إيجاد الفرص وفهم نظام التوافق. كيف أساعدك؟",
};

const SUGGESTED_EN = [
  "How do I find opportunities?",
  "How does AI matching work?",
  "How do I update my profile?",
  "What skills can I add?",
  "How do I register?",
];

const SUGGESTED_AR = [
  "كيف أجد فرصاً مناسبة؟",
  "كيف يعمل التوافق الذكي؟",
  "كيف أحدّث ملفي الشخصي؟",
  "ما المهارات التي يمكنني إضافتها؟",
  "كيف أسجّل في المنصة؟",
];

function getResponse(msg, lang) {
  const m = msg.toLowerCase();
  const R = lang === 'ar' ? BOT_RESPONSES_AR : BOT_RESPONSES_EN;
  if (m.includes('opportunit') || m.includes('فرص') || m.includes('find') || m.includes('ابحث')) return R.opportunities;
  if (m.includes('ai') || m.includes('match') || m.includes('توافق') || m.includes('ذكاء')) return R.ai;
  if (m.includes('profile') || m.includes('ملف') || m.includes('update') || m.includes('تحديث')) return R.profile;
  if (m.includes('skill') || m.includes('مهار')) return R.skills;
  if (m.includes('organizat') || m.includes('ngo') || m.includes('منظم')) return R.organizations;
  if (m.includes('register') || m.includes('تسجيل') || m.includes('join') || m.includes('انضم')) return R.register;
  return R.default;
}

function renderMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

export default function Chatbot() {
  const { lang, t, isRtl } = useLang();
  const { isDark }         = useTheme();
  const [open, setOpen]    = useState(false);
  const [messages, setMessages] = useState([{
    id: 1, from: 'bot', text: lang === 'ar' ? BOT_RESPONSES_AR.default : BOT_RESPONSES_EN.default
  }]);
  const [input, setInput]  = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef();
  const inputRef  = useRef();

  const SUGGESTED = lang === 'ar' ? SUGGESTED_AR : SUGGESTED_EN;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 300); }
  }, [open]);

  const send = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), from: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: getResponse(text, lang) }]);
    }, 800 + Math.random() * 500);
  };

  const botBg   = isDark ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200';
  const headerBg = isDark ? 'bg-slate-800/60 border-slate-600' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-slate-200';
  const msgBotBg = isDark ? 'bg-white/8 text-gray-200' : 'bg-slate-100 text-slate-700';
  const sugBg    = isDark ? 'bg-slate-800/40 border-slate-600 text-slate-400 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/30' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300';
  const inputBox = isDark ? 'bg-slate-800/60 border-slate-600 focus-within:border-slate-500' : 'bg-slate-50 border-slate-200 focus-within:border-blue-400';

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-glow hover:shadow-glow transition-all"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? 'x' : 'bot'}
            initial={{ rotate:-90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:90, opacity:0 }}
            transition={{ duration:0.2 }}>
            {open ? <X size={22}/> : <MessageCircle size={22}/>}
          </motion.span>
        </AnimatePresence>
        {!open && unread > 0 && (
          <motion.span
            initial={{ scale:0 }} animate={{ scale:1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full text-xs font-bold flex items-center justify-center">
            {unread}
          </motion.span>
        )}
      </motion.button>

      {/* Chat modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 sm:hidden"
              onClick={() => setOpen(false)} />

            <motion.div
              initial={{ opacity:0, scale:0.9, y:20 }}
              animate={{ opacity:1, scale:1, y:0 }}
              exit={{ opacity:0, scale:0.9, y:20 }}
              transition={{ type:'spring', bounce:0.25, duration:0.5 }}
              className={`fixed bottom-24 right-6 z-50 w-[min(400px,calc(100vw-24px))] border rounded-3xl shadow-premium overflow-hidden flex flex-col ${botBg}`}
              style={{ height: 'min(560px, calc(100vh - 120px))' }}
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {/* Header */}
              <div className={`flex items-center gap-3 p-4 border-b flex-shrink-0 ${headerBg}`}>
                <motion.div
                  animate={{ rotate:[0,5,-5,0] }} transition={{ repeat:Infinity, duration:3 }}
                  className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={20} className="text-white"/>
                </motion.div>
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>HumaLink AI</p>
                  <div className="flex items-center gap-1.5">
                    <motion.div animate={{ scale:[1,1.3,1] }} transition={{ repeat:Infinity, duration:2 }}
                      className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t('chat_online')}</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className={`transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-slate-400 hover:text-slate-700'}`}>
                  <X size={18}/>
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map(msg => (
                  <motion.div key={msg.id}
                    initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                    className={`flex items-end gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
                    {msg.from === 'bot' && (
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot size={13} className="text-white"/>
                      </div>
                    )}
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                      ${msg.from === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : `${msgBotBg} rounded-bl-sm`
                      }`}
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                    />
                    {msg.from === 'user' && (
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                        <User size={13} className={isDark ? 'text-gray-300' : 'text-slate-600'}/>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} className="flex items-end gap-2">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot size={13} className="text-white"/>
                    </div>
                    <div className={`px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center ${msgBotBg}`}>
                      {[0,0.2,0.4].map((delay,i) => (
                        <motion.div key={i} animate={{ y:[0,-5,0] }} transition={{ repeat:Infinity, duration:0.8, delay }}
                          className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-gray-400' : 'bg-slate-400'}`} />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Suggested prompts */}
              <div className={`px-4 py-2 border-t flex-shrink-0 ${isDark ? 'border-slate-700/60' : 'border-slate-100'}`}>
                <p className={`text-xs mb-2 ${isDark ? 'text-gray-600' : 'text-slate-400'}`}>{t('chat_suggested')}</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED.map(q => (
                    <button key={q} onClick={() => send(q)}
                      className={`text-xs px-2.5 py-1.5 border rounded-xl transition-all ${sugBg}`}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-3 flex-shrink-0">
                <div className={`flex items-center gap-2 border rounded-2xl px-3 py-2 transition-all ${inputBox}`}>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
                    placeholder={t('chat_placeholder')}
                    className={`flex-1 bg-transparent text-sm outline-none ${isDark ? 'text-white placeholder-gray-600' : 'text-slate-800 placeholder-slate-400'}`}
                  />
                  <motion.button whileTap={{ scale:0.9 }} onClick={() => send(input)} disabled={!input.trim()}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all flex-shrink-0
                      ${input.trim() ? 'text-white hover:opacity-90' : `cursor-not-allowed ${isDark ? 'bg-slate-800/40 text-slate-600' : 'bg-slate-200 text-slate-400'}`}`}
                    style={input.trim() ? { background: '#153147' } : {}}>
                    <Send size={14}/>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
