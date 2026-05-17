import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, MessageSquare, Send, ChevronDown, 
  PhoneCall, Mail, CheckCircle2
} from 'lucide-react';

// ── الأسئلة الشائعة (بيانات وهمية) ──
const FAQS = [
  {
    id: 1,
    question: 'How long does it take to process a new request?',
    answer: 'Typically, it takes 3-5 business days to review your request. Urgent cases (like medical emergencies) are prioritized and reviewed within 24 hours.'
  },
  {
    id: 2,
    question: 'How can I update my uploaded documents?',
    answer: 'If your request is still in the "Pending" status, you can open it from the "My Requests" tab and click "Edit Request" to add or remove documents.'
  },
  {
    id: 3,
    question: 'How do I contact my assigned volunteer?',
    answer: 'Once a volunteer is assigned and the organization permits direct contact, a "Call" button will appear in the Case Details under the "My Cases" tab.'
  },
  {
    id: 4,
    question: 'Can I have more than one active case at a time?',
    answer: 'Yes, you can have multiple active cases as long as they are for different types of support (e.g., one for medical and one for winter supplies).'
  }
];

export default function SupportTab({ isDark, cardBg, subText }) {
  // حالة التحكم بالأسئلة الشائعة المفتوحة
  const [openFaq, setOpenFaq] = useState(1); // السؤال الأول مفتوح كافتراضي
  
  // حالات نموذج التواصل
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // دالة إرسال الرسالة
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setIsSubmitting(true);
    // محاكاة إرسال للبيانات (تأخير ثانية ونصف)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setMessage('');
      
      // إخفاء رسالة النجاح بعد 3 ثوانٍ
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
      
      <div className="mb-4">
        <h2 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#232A2F]'}`}>Support & Help Center</h2>
        <p className={`text-xs mt-1 ${subText}`}>Find answers to common questions or reach out to our team directly.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* ── 1. قسم الأسئلة الشائعة (FAQ) ── */}
        <div className="space-y-4">
          <h3 className={`font-semibold flex items-center gap-2 mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            <HelpCircle size={18} className="text-blue-500" /> Frequently Asked Questions
          </h3>
          
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <div 
                key={faq.id} 
                className={`rounded-2xl border transition-all overflow-hidden ${cardBg} ${openFaq === faq.id ? (isDark ? 'border-slate-500' : 'border-blue-200 shadow-sm') : ''}`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className={`text-sm font-semibold pr-4 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`flex-shrink-0 transition-transform duration-300 ${subText} ${openFaq === faq.id ? 'rotate-180 text-blue-500' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {openFaq === faq.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-4 pt-0 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2. قسم نموذج التواصل (Contact Form) ── */}
        <div className="space-y-4">
          <h3 className={`font-semibold flex items-center gap-2 mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            <MessageSquare size={18} className="text-emerald-500" /> Contact Support Team
          </h3>
          
          <div className={`p-6 rounded-2xl border ${cardBg}`}>
            <p className={`text-sm mb-6 ${subText}`}>
              Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="space-y-1.5">
                <label className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Your Message</label>
                <textarea 
                  required 
                  rows="5" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you today?"
                  className={`w-full p-4 rounded-xl border outline-none transition-colors text-sm resize-none ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-500 focus:bg-white'}`}
                ></textarea>
              </div>

              {isSent ? (
                <div className="w-full py-3 rounded-xl flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 size={18} /> Message Sent Successfully!
                </div>
              ) : (
                <button 
                  type="submit" 
                  disabled={isSubmitting || !message.trim()}
                  className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    !message.trim() 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500' 
                      : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">Sending...</span>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>
              )}
            </form>

            {/* معلومات التواصل المباشر */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700/50 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${subText}`}>Call Us</span>
                <a href="tel:+96261234567" className={`text-sm font-medium flex items-center gap-1.5 hover:text-blue-500 transition-colors ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <PhoneCall size={14} className="text-blue-500" /> +962 6 123 4567
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${subText}`}>Email Us</span>
                <a href="mailto:support@humalink.com" className={`text-sm font-medium flex items-center gap-1.5 hover:text-emerald-500 transition-colors ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Mail size={14} className="text-emerald-500" /> support@humalink.com
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}