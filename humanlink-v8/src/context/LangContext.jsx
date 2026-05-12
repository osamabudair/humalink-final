import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Navbar
    nav_home:          'Home',
    nav_opportunities: 'Opportunities',
    nav_organizations: 'Organizations',
    nav_about:         'About',
    nav_signin:        'Sign In',
    nav_getstarted:    'Get Started',
    nav_dashboard:     'Dashboard',
    nav_profile:       'My Profile',
    nav_signout:       'Sign Out',

    // Home Hero
    hero_badge:         "AI-Powered Matching · Jordan's #1 Volunteer Platform",
    hero_title1:        'Connect Humans.',
    hero_title2:        'Amplify ',
    hero_sub:           'HumaLink connects volunteers, organizations, and communities across Jordan using intelligent AI matching. Find your purpose or grow your mission.',
    hero_browse:        'Browse Opportunities',
    hero_cta:           'Get Started Free',
    hero_scroll:        'Scroll to explore',

    // Stats
    stat_volunteers:    'Active Volunteers',
    stat_orgs:          'Organizations',
    stat_governorates:  'Governorates',
    stat_accuracy:      'Match Accuracy',

    // Roles section
    role_volunteer_label: 'Volunteers',
    role_volunteer_title: 'Find Your Cause',
    role_volunteer_desc:  'Browse opportunities matched to your skills and availability.',
    role_org_label:       'Organizations',
    role_org_title:       'Grow Your Mission',
    role_org_desc:        'Post opportunities, build volunteer teams and manage everything.',
    role_special_label:   'Special Needs',
    role_special_title:   'Access Made Equal',
    role_special_desc:    'Full accessibility support, remote-first, personalized assistance.',
    role_get_started:     'Get Started',

    // Features section
    feat_title:           'Everything You Need',
    feat_sub:             'A complete platform for meaningful connections.',
    feat_ai_title:        'AI-Powered Matching',
    feat_ai_desc:         'Our engine matches your skills, location, and availability to the perfect opportunity.',
    feat_human_title:     'For Every Human',
    feat_human_desc:      'Whether a volunteer, nonprofit, or person with special needs — HumaLink is built for you.',
    feat_jordan_title:    'Across All Jordan',
    feat_jordan_desc:     'Find in-person and remote opportunities across all 12 governorates.',
    feat_verified_title:  'Verified Organizations',
    feat_verified_desc:   'Every organization is vetted and badge-verified.',
    feat_insights_title:  'Instant Insights',
    feat_insights_desc:   'Know your impact score and profile strength in real-time.',
    feat_smart_title:     'Smart Recommendations',
    feat_smart_desc:      'Fresh personalized matches appear in your dashboard every day.',

    // Testimonials
    test_title:     'Real Stories, Real Impact',
    test_sub:       'Join 120,000+ humans making a difference',

    // CTA
    cta_title:      'Ready to Make an Impact?',
    cta_sub:        'Join 120,000+ volunteers and 8,400+ organizations on HumaLink.',
    cta_btn:        'Create Free Account',

    // Roles (Built for Every Role)
    roles_title:    'Built for Every Role',
    roles_sub:      'One platform. Three powerful experiences.',

    // About
    about_story:         'Our Story',
    about_title:         'We Believe Every Human Has Something to Give',
    about_sub:           'HumaLink was born from a simple observation: people who want to help cannot find organizations that need help. We built the bridge.',
    about_founded:       'Founded',
    about_volunteers:    'Volunteers',
    about_governorates:  'Governorates',
    about_organizations: 'Organizations',
    about_mission:       'Our Mission',
    about_mission_text:  'To eliminate friction between human goodwill and meaningful action.',
    about_values:        'What We Stand For',
    about_values_sub:    'The principles guiding every decision we make',
    about_team:          'Meet the Team',
    about_team_sub:      'The humans behind HumaLink',
    about_cta:           'Join Our Mission',
    about_cta_sub:       'Be part of a movement connecting humans with purpose.',
    about_cta_btn:       'Get Started',

    // Values
    val_human_title:     'Human First',
    val_human_desc:      'Every feature built around the humans who use it.',
    val_inclusive_title: 'Inclusive by Design',
    val_inclusive_desc:  "Accessibility isn't an afterthought — it's foundational.",
    val_impact_title:    'Impact Driven',
    val_impact_desc:     'We measure success by real-world change.',
    val_ai_title:        'AI for Good',
    val_ai_desc:         'Our AI creates better human connections, never replaces them.',

    // Team roles
    role_founder:   'Founder & Idea Owner · Front-End Developer',
    role_backend:   'Back-End Developer',
    role_frontend:  'Front-End Developer',
    role_ai:        'AI Engineer',

    // Opportunities
    opp_title:         'Find Opportunities',
    opp_sub:           'Discover volunteer opportunities across Jordan',
    opp_search:        'Search by title or organization...',
    opp_all:           'All',
    opp_remote:        'Remote',
    opp_onsite:        'On-site',
    opp_apply:         'Apply Now',
    opp_save:          'Save',
    opp_saved:         'Saved',
    opp_found:         'opportunities found',
    opp_empty:         'No opportunities match your filters.',
    opp_clear:         'Clear All Filters',
    opp_allgov:        'All Governorates',
    opp_login_match:   'Login to see your match score',

    // Organizations
    org_title:    'Find Organizations',
    org_sub:      'Connect with verified organizations across Jordan',
    org_verified: 'Verified',
    org_remote:   'Remote / National',
    org_view:     'View Organization',
    org_empty:    'No organizations found.',
    org_reset:    'Reset Filters',

    // Auth Modal
    auth_title:  'Join HumaLink First',
    auth_sub:    'You need to sign in or create an account before continuing.',
    auth_signin: 'Sign In',
    auth_join:   'Join Now',

    // Login
    login_title:         'Welcome Back',
    login_sub:           'Sign in to continue making an impact',
    login_email:         'Email Address',
    login_password:      'Password',
    login_forgot:        'Forgot password?',
    login_submit:        'Sign In',
    login_noacc:         "Don't have an account?",
    login_create:        'Create one free',
    login_google:        'Continue with Google',
    login_linkedin:      'Continue with LinkedIn',
    login_or:            'or sign in with email',

    // Register
    reg_join:       'Join HumaLink',
    reg_role_pick:  "Choose how you'll use the platform",
    reg_basics:     'Basic Information',
    reg_basics_sub: 'Tell us a bit about yourself',
    reg_profile:    'Your Profile',
    reg_profile_sub:'Customize your experience',
    reg_review:     'Review Your Profile',
    reg_review_sub: 'Make sure everything looks correct',
    reg_complete:   'Complete Registration',
    reg_back:       'Back',
    reg_continue:   'Continue',
    reg_review_btn: 'Review Profile',

    // Dashboard
    dash_morning:   'Good morning',
    dash_overview:  'Overview',
    dash_opps:      'Opportunities',
    dash_saved:     'Saved',
    dash_calendar:  'Calendar',
    dash_achieve:   'Achievements',
    dash_applied:   'Applied',
    dash_signout:   'Sign Out',
    dash_ai_title:  'AI Match Score',
    dash_ai_sub:    'We found new opportunities that match your skills this week.',
    dash_ai_cta:    'View Matches',
    dash_rec:       'AI Recommended',
    dash_upcoming:  'Upcoming Events',
    dash_activity:  'Recent Activity',
    dash_apply:     'Apply Now',
    dash_hours:     'Hours Volunteered',
    dash_apps_sent: 'Applications Sent',
    dash_orgs:      'Orgs Helped',
    dash_impact:    'Impact Score',

    // Profile
    prof_info:        'Profile Information',
    prof_edit:        'Edit',
    prof_save:        'Save',
    prof_cancel:      'Cancel',
    prof_name:        'Full Name',
    prof_email:       'Email',
    prof_dob:         'Date of Birth',
    prof_gov:         'Governorate',
    prof_bio:         'Bio',
    prof_skills:      'Skills',
    prof_no_skills:   'No skills added yet.',
    prof_verified:    'Verified Member',
    prof_back:        'Back to Dashboard',
    prof_userid:      'Member ID',
    prof_age:         'Age',
    prof_years:       'years',
    prof_applied:     'Applied Opportunities',
    prof_no_applied:  'No applications yet. Start applying to opportunities!',
    prof_status_pending:  'Pending',
    prof_status_accepted: 'Accepted',
    prof_status_rejected: 'Rejected',
    prof_applied_on:  'Applied on',
    prof_signin_req:  'Sign in to view your profile',
    prof_signin_btn:  'Sign In',

    // Chatbot
    chat_placeholder: 'Ask anything...',
    chat_suggested:   'Suggested questions',
    chat_online:      'Always online · Instant replies',

    // Footer
    footer_platform:    'Platform',
    footer_company:     'Company',
    footer_legal:       'Legal',
    footer_home:        'Home',
    footer_opps:        'Opportunities',
    footer_orgs:        'Organizations',
    footer_register:    'Register',
    footer_about:       'About',
    footer_blog:        'Blog',
    footer_careers:     'Careers',
    footer_contact:     'Contact',
    footer_privacy:     'Privacy',
    footer_terms:       'Terms',
    footer_access:      'Accessibility',
    footer_copy:        'All rights reserved.',
    footer_made:        'Made with',
    footer_for:         'for Jordan',
  },

  ar: {
    // Navbar
    nav_home:          'الرئيسية',
    nav_opportunities: 'الفرص',
    nav_organizations: 'المنظمات',
    nav_about:         'من نحن',
    nav_signin:        'تسجيل الدخول',
    nav_getstarted:    'ابدأ الآن',
    nav_dashboard:     'لوحة التحكم',
    nav_profile:       'ملفي الشخصي',
    nav_signout:       'تسجيل الخروج',

    // Home Hero
    hero_badge:         'منصة التطوع الأذكى في الأردن · مدعومة بالذكاء الاصطناعي',
    hero_title1:        'تواصل إنساني.',
    hero_title2:        'أثرٌ ',
    hero_sub:           'هيومالينك تربط المتطوعين والمنظمات والمجتمعات عبر الأردن باستخدام تقنية الذكاء الاصطناعي. اكتشف هدفك أو نمِّ مهمتك.',
    hero_browse:        'تصفح الفرص',
    hero_cta:           'ابدأ مجاناً',
    hero_scroll:        'مرر للاستكشاف',

    // Stats
    stat_volunteers:    'متطوع نشط',
    stat_orgs:          'منظمة',
    stat_governorates:  'محافظة',
    stat_accuracy:      'دقة التطابق',

    // Roles section
    role_volunteer_label: 'متطوعون',
    role_volunteer_title: 'اعثر على قضيتك',
    role_volunteer_desc:  'تصفح الفرص المتوافقة مع مهاراتك وتوفرك.',
    role_org_label:       'منظمات',
    role_org_title:       'نمِّ مهمتك',
    role_org_desc:        'انشر الفرص وابنِ فريقك وأدِر كل شيء من مكان واحد.',
    role_special_label:   'احتياجات خاصة',
    role_special_title:   'وصول متساوٍ للجميع',
    role_special_desc:    'دعم شامل للوصول، خيارات عن بُعد، ومساعدة مخصصة.',
    role_get_started:     'ابدأ الآن',

    // Features section
    feat_title:           'كل ما تحتاجه',
    feat_sub:             'منصة متكاملة للتواصل الإنساني الهادف.',
    feat_ai_title:        'توافق بالذكاء الاصطناعي',
    feat_ai_desc:         'يطابق نظامنا مهاراتك وموقعك وجدولك مع الفرصة المثالية.',
    feat_human_title:     'لكل إنسان',
    feat_human_desc:      'سواء كنت متطوعاً أو منظمة أو شخصاً ذا احتياج خاص، هيومالينك صُمِّمت لك.',
    feat_jordan_title:    'عبر الأردن كله',
    feat_jordan_desc:     'جد فرصاً حضورية وعن بُعد في كل محافظات الأردن الاثنتي عشرة.',
    feat_verified_title:  'منظمات موثقة',
    feat_verified_desc:   'كل منظمة موثقة ومعتمدة حتى يتبرع المتطوعون بثقة.',
    feat_insights_title:  'رؤى فورية',
    feat_insights_desc:   'اعرف نقاط أثرك وقوة ملفك الشخصي في الوقت الفعلي.',
    feat_smart_title:     'توصيات ذكية',
    feat_smart_desc:      'تظهر تطابقات مخصصة جديدة في لوحة تحكمك كل يوم.',

    // Testimonials
    test_title:     'قصص حقيقية، أثر حقيقي',
    test_sub:       'انضم لأكثر من 120,000 إنسان يُحدثون فارقاً',

    // CTA
    cta_title:      'مستعد لإحداث أثر؟',
    cta_sub:        'انضم لأكثر من 120,000 متطوع و8,400 منظمة على هيومالينك.',
    cta_btn:        'أنشئ حساباً مجاناً',

    // Roles
    roles_title:    'مبني لكل دور',
    roles_sub:      'منصة واحدة. ثلاث تجارب قوية.',

    // About
    about_story:         'قصتنا',
    about_title:         'نؤمن بأن لكل إنسان شيئاً يعطيه',
    about_sub:           'وُلدت هيومالينك من ملاحظة بسيطة: ملايين يريدون المساعدة وملايين يحتاجون إليها لكنهم لا يجدون بعضهم. بنينا الجسر.',
    about_founded:       'التأسيس',
    about_volunteers:    'متطوع',
    about_governorates:  'محافظة',
    about_organizations: 'منظمة',
    about_mission:       'مهمتنا',
    about_mission_text:  'إزالة الاحتكاك بين النية الإنسانية الطيبة والتغيير الحقيقي.',
    about_values:        'ما نؤمن به',
    about_values_sub:    'المبادئ التي توجه كل قرار نتخذه',
    about_team:          'تعرف على الفريق',
    about_team_sub:      'البشر الذين يقفون خلف هيومالينك',
    about_cta:           'انضم إلى مهمتنا',
    about_cta_sub:       'كن جزءاً من حركة تربط البشر بالهدف.',
    about_cta_btn:       'ابدأ الآن',

    // Values
    val_human_title:     'الإنسان أولاً',
    val_human_desc:      'كل ميزة مبنية حول الإنسان الذي يستخدمها.',
    val_inclusive_title: 'شامل بالتصميم',
    val_inclusive_desc:  'إمكانية الوصول ليست فكرة لاحقة — بل هي أساسية.',
    val_impact_title:    'مدفوع بالأثر',
    val_impact_desc:     'نقيس النجاح بالتغيير في العالم الحقيقي.',
    val_ai_title:        'الذكاء الاصطناعي للخير',
    val_ai_desc:         'ذكاؤنا الاصطناعي يُنشئ روابط إنسانية أفضل، لا يستبدلها.',

    // Team roles
    role_founder:   'مؤسسة وصاحبة الفكرة · مطورة واجهات',
    role_backend:   'مطورة خلفية',
    role_frontend:  'مطور واجهات',
    role_ai:        'مهندس ذكاء اصطناعي',

    // Opportunities
    opp_title:         'ابحث عن فرص',
    opp_sub:           'اكتشف فرص التطوع عبر الأردن',
    opp_search:        'ابحث بالعنوان أو المنظمة...',
    opp_all:           'الكل',
    opp_remote:        'عن بُعد',
    opp_onsite:        'حضوري',
    opp_apply:         'قدّم الآن',
    opp_save:          'حفظ',
    opp_saved:         'محفوظ',
    opp_found:         'فرصة متاحة',
    opp_empty:         'لا توجد فرص تطابق الفلاتر المختارة.',
    opp_clear:         'مسح الفلاتر',
    opp_allgov:        'كل المحافظات',
    opp_login_match:   'سجّل دخولك لترى نسبة التوافق',

    // Organizations
    org_title:    'ابحث عن منظمات',
    org_sub:      'تواصل مع منظمات موثقة في الأردن',
    org_verified: 'موثقة',
    org_remote:   'عن بُعد / وطنية',
    org_view:     'عرض المنظمة',
    org_empty:    'لا توجد منظمات.',
    org_reset:    'إعادة الضبط',

    // Auth Modal
    auth_title:  'انضم إلى هيومالينك أولاً',
    auth_sub:    'تحتاج إلى تسجيل الدخول أو إنشاء حساب للمتابعة.',
    auth_signin: 'تسجيل الدخول',
    auth_join:   'انضم الآن',

    // Login
    login_title:         'أهلاً بعودتك',
    login_sub:           'سجّل دخولك للمتابعة في إحداث أثر',
    login_email:         'البريد الإلكتروني',
    login_password:      'كلمة المرور',
    login_forgot:        'نسيت كلمة المرور؟',
    login_submit:        'تسجيل الدخول',
    login_noacc:         'ليس لديك حساب؟',
    login_create:        'أنشئ حساباً مجاناً',
    login_google:        'المتابعة مع Google',
    login_linkedin:      'المتابعة مع LinkedIn',
    login_or:            'أو سجّل بالبريد الإلكتروني',

    // Register
    reg_join:       'انضم إلى هيومالينك',
    reg_role_pick:  'اختر كيف ستستخدم المنصة',
    reg_basics:     'المعلومات الأساسية',
    reg_basics_sub: 'أخبرنا قليلاً عن نفسك',
    reg_profile:    'ملفك الشخصي',
    reg_profile_sub:'خصّص تجربتك',
    reg_review:     'مراجعة ملفك',
    reg_review_sub: 'تأكد من صحة المعلومات قبل التسجيل',
    reg_complete:   'إكمال التسجيل',
    reg_back:       'رجوع',
    reg_continue:   'متابعة',
    reg_review_btn: 'مراجعة الملف',

    // Dashboard
    dash_morning:   'صباح الخير',
    dash_overview:  'نظرة عامة',
    dash_opps:      'الفرص',
    dash_saved:     'المحفوظات',
    dash_calendar:  'التقويم',
    dash_achieve:   'الإنجازات',
    dash_applied:   'الطلبات',
    dash_signout:   'تسجيل الخروج',
    dash_ai_title:  'نقاط التوافق',
    dash_ai_sub:    'وجدنا فرصاً جديدة تتوافق مع مهاراتك هذا الأسبوع.',
    dash_ai_cta:    'عرض التوافقات',
    dash_rec:       'موصى به بالذكاء الاصطناعي',
    dash_upcoming:  'الأحداث القادمة',
    dash_activity:  'النشاط الأخير',
    dash_apply:     'قدّم الآن',
    dash_hours:     'ساعات التطوع',
    dash_apps_sent: 'الطلبات المرسلة',
    dash_orgs:      'منظمات ساعدتها',
    dash_impact:    'نقاط الأثر',

    // Profile
    prof_info:        'معلومات الملف الشخصي',
    prof_edit:        'تعديل',
    prof_save:        'حفظ',
    prof_cancel:      'إلغاء',
    prof_name:        'الاسم الكامل',
    prof_email:       'البريد الإلكتروني',
    prof_dob:         'تاريخ الميلاد',
    prof_gov:         'المحافظة',
    prof_bio:         'نبذة',
    prof_skills:      'المهارات',
    prof_no_skills:   'لم تُضف مهارات بعد.',
    prof_verified:    'عضو موثق',
    prof_back:        'العودة للوحة التحكم',
    prof_userid:      'رقم العضوية',
    prof_age:         'العمر',
    prof_years:       'سنة',
    prof_applied:     'الفرص المتقدَّم إليها',
    prof_no_applied:  'لا توجد طلبات بعد. ابدأ التقديم على الفرص!',
    prof_status_pending:  'قيد المراجعة',
    prof_status_accepted: 'مقبول',
    prof_status_rejected: 'مرفوض',
    prof_applied_on:  'تقدّمت في',
    prof_signin_req:  'سجّل دخولك لعرض ملفك',
    prof_signin_btn:  'تسجيل الدخول',

    // Chatbot
    chat_placeholder: 'اسأل أي شيء...',
    chat_suggested:   'أسئلة مقترحة',
    chat_online:      'متاح دائماً · ردود فورية',

    // Footer
    footer_platform:    'المنصة',
    footer_company:     'الشركة',
    footer_legal:       'القانونية',
    footer_home:        'الرئيسية',
    footer_opps:        'الفرص',
    footer_orgs:        'المنظمات',
    footer_register:    'التسجيل',
    footer_about:       'من نحن',
    footer_blog:        'المدونة',
    footer_careers:     'الوظائف',
    footer_contact:     'اتصل بنا',
    footer_privacy:     'الخصوصية',
    footer_terms:       'الشروط',
    footer_access:      'إمكانية الوصول',
    footer_copy:        'جميع الحقوق محفوظة.',
    footer_made:        'صُنع بـ',
    footer_for:         'للأردن',
  },
};

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('hl-lang') || 'en');

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('hl-lang', lang);
  }, [lang]);

  const toggle = () => setLang(l => l === 'en' ? 'ar' : 'en');
  const t = (key) => translations[lang]?.[key] ?? translations['en']?.[key] ?? key;
  const isRtl = lang === 'ar';

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t, isRtl }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
