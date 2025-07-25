import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Translations {
  [key: string]: {
    en: string;
    he: string;
  };
}

const translations: Translations = {
  // Navbar
  'nav.home': { en: 'Home', he: 'בית' },
  'nav.services': { en: 'Services', he: 'שירותים' },
  'nav.about': { en: 'About', he: 'אודות' },
  'nav.blog': { en: 'Blog', he: 'בלוג' },
  'nav.contact': { en: 'Contact', he: 'צור קשר' },
  'nav.cta': { en: 'Get Started', he: 'התחל עכשיו' },

  // Hero Section
  'hero.badge': { en: 'AI-Powered Business Automation', he: 'אוטומציה עסקית מבוססת בינה מלאכותית' },
  'hero.title': { en: 'Automate Your Business', he: 'הפוך את העסק שלך לאוטומטי' },
  'hero.subtitle': { en: 'Transform your business with AI-powered chatbots, automated calls,\nand smart booking systems that work 24/7 to grow your revenue.', he: 'שנה את העסק שלך עם צ\'אטבוטים מבוססי בינה מלאכותית, שיחות אוטומטיות,\nומערכות הזמנה חכמות שעובדות 24/7 כדי להגדיל את ההכנסות שלך.' },
  'hero.cta.primary': { en: 'Call Now', he: 'התקשר עכשיו' },
  'hero.cta.secondary': { en: 'Explore Services', he: 'סיור בשירותים' },

  // Services Overview Section
  'services.badge': { en: 'Our Services', he: 'השירותים שלנו' },
  'services.title': { en: 'Our Automation Services', he: 'שירותי האוטומציה שלנו' },
  'services.description': { en: 'Transform your business with AI-powered automation solutions designed for modern SMBs', he: 'שנה את העסק שלך עם פתרונות אוטומציה מבוססי בינה מלאכותית המיועדים לחברות קטנות ובינוניות מודרניות' },
  
  // Services Items
  'services.whatsapp.title': { en: 'AI WhatsApp Receptionists', he: 'פקידי קבלה של בינה מלאכותית בוואטסאפ' },
  'services.whatsapp.description': { en: 'Intelligent virtual receptionists that handle customer inquiries on WhatsApp 24/7 with natural conversations', he: 'פקידי קבלה וירטואליים חכמים המטפלים בפניות לקוחות בוואטסאפ 24/7 עם שיחות טבעיות' },
  
  'services.calls.title': { en: 'AI Booking & Order Calls', he: 'שיחות הזמנה ובקשות של בינה מלאכותית' },
  'services.calls.description': { en: 'Automated calling systems that handle bookings, orders, and customer service calls with human-like interaction', he: 'מערכות שיחה אוטומטיות המטפלות בהזמנות, בקשות ושיחות שירות לקוחות עם אינטראקציה דמוית אדם' },
  
  'services.booking.title': { en: 'Smart Booking Systems', he: 'מערכות הזמנה חכמות' },
  'services.booking.description': { en: 'Seamless appointment scheduling with automated confirmations and intelligent calendar management', he: 'תיאום פגישות חלק עם אישורים אוטומטיים וניהול לוח שנה חכם' },
  
  'services.leads.title': { en: 'Lead Qualification Bots', he: 'בוטים לכישור לידים' },
  'services.leads.description': { en: 'Intelligent lead scoring and qualification through automated conversations and smart questionnaires', he: 'ניקוד וכישור לידים חכם באמצעות שיחות אוטומטיות ושאלונים חכמים' },
  
  'services.ads.title': { en: 'AI Ad Campaigns', he: 'קמפיינים פרסומיים של בינה מלאכותית' },
  'services.ads.description': { en: 'Create and optimize advertising campaigns using AI-driven targeting and performance optimization', he: 'יצירה ואופטימיזציה של קמפיינים פרסומיים באמצעות מיקוד מבוסס בינה מלאכותית ואופטימיזציית ביצועים' },
  
  'services.web.title': { en: 'Web Development', he: 'פיתוח אתרים' },
  'services.web.description': { en: 'Custom website development with integrated AI automation tools for enhanced user experience', he: 'פיתוח אתרים מותאמים אישית עם כלי אוטומציה של בינה מלאכותית לחוויית משתמש משופרת' },
  
  // Services Benefits
  'services.benefits.collaboration': { en: 'Expert Collaboration', he: 'שיתוף פעולה מומחים' },
  'services.benefits.integration': { en: 'Seamless Integration', he: 'שילוב חלק' },
  'services.benefits.scalable': { en: 'Scalable Solutions', he: 'פתרונות מדרגיים' },

  // How It Works Section
  'howitworks.badge': { en: 'Process', he: 'תהליך' },
  'howitworks.title': { en: 'How It Works', he: 'איך זה עובד' },
  'howitworks.description': { en: 'Getting started with automation is simple. Our proven process ensures successful implementation and maximum ROI.', he: 'התחלה עם אוטומציה היא פשוטה. התהליך המוכח שלנו מבטיח יישום מוצלח ותשואה מקסימלית על ההשקעה.' },
  
  'howitworks.step1.title': { en: 'Discover & Analyze', he: 'גילוי וניתוח' },
  'howitworks.step1.description': { en: 'We analyze your processes and identify automation opportunities.', he: 'אנחנו מנתחים את התהליכים שלכם ומזהים הזדמנויות אוטומציה.' },
  
  'howitworks.step2.title': { en: 'Design & Implement', he: 'עיצוב ויישום' },
  'howitworks.step2.description': { en: 'Custom automation workflows tailored to your business needs.', he: 'זרימות עבודה אוטומטיות מותאמות אישית לצרכי העסק שלכם.' },
  
  'howitworks.step3.title': { en: 'Launch & Optimize', he: 'השקה ואופטימיזציה' },
  'howitworks.step3.description': { en: 'Go live with continuous optimization and ongoing support.', he: 'יציאה לאוויר עם אופטימיזציה מתמשכת ותמיכה מתמשכת.' },

  // Comprehensive Insights Section
  'insights.badge': { en: 'Live Oversight', he: 'פיקוח חי' },
  'insights.title': { en: 'Comprehensive Insights', he: 'תובנות מקיפות' },
  'insights.description': { en: 'Track every campaign and customer interaction to refine engagement strategies', he: 'עקבו אחר כל קמפיין ואינטראקציה עם לקוחות כדי לחדד אסטרטגיות מעורבות' },
  
  'insights.realtime.title': { en: 'Real-Time Performance Analytics', he: 'אנליטיקת ביצועים בזמן אמת' },
  'insights.realtime.description': { en: 'Get instant access to detailed reports on every campaign, call, and customer interaction—empowering you to make smarter decisions, faster.', he: 'קבלו גישה מיידית לדוחות מפורטים על כל קמפיין, שיחה ואינטראקציה עם לקוחות—מה שמעצים אתכם לקבל החלטות חכמות יותר, מהר יותר.' },
  
  'insights.actionable.title': { en: 'Actionable Customer Engagement Data', he: 'נתוני מעורבות לקוחות ניתנים לפעולה' },
  'insights.actionable.description': { en: 'Unlock key insights into customer behaviors and preferences, so you can refine your strategies and boost retention with data-driven improvements.', he: 'פתחו תובנות מפתח על התנהגויות והעדפות לקוחות, כדי שתוכלו לחדד את האסטרטגיות שלכם ולשפר שימור עם שיפורים מבוססי נתונים.' },
  
  // Feature Tags
  'insights.tags.retention': { en: 'Customer Retention', he: 'שימור לקוחות' },
  'insights.tags.integrations': { en: 'Seamless Integrations', he: 'שילובים חלקים' },
  'insights.tags.reports': { en: 'Real-Time Reports', he: 'דוחות בזמן אמת' },
  'insights.tags.engagement': { en: 'Personalized Engagement', he: 'מעורבות מותאמת אישית' },
  'insights.tags.costeffective': { en: 'Cost-Effective', he: 'חסכוני' },
  'insights.tags.smartspending': { en: 'Smart Spending', he: 'הוצאה חכמה' },
  'insights.tags.datadriven': { en: 'Data-Driven Decisions', he: 'החלטות מבוססות נתונים' },
  'insights.tags.efficiency': { en: 'Increased Efficiency', he: 'יעילות מוגברת' },

  // Social Proof Section
  'social.badge': { en: 'Trusted by Innovators Worldwide', he: 'מהימן על ידי חדשנים ברחבי העולם' },
  'social.title': { en: 'What Our <span style="font-style: italic; font-weight: 400; font-family: \'IBM Plex Serif\', serif;">Users</span> Say', he: 'מה המשתמשים שלנו אומרים' },
  'social.description': { en: 'Hear from businesses who\'ve transformed their workflows with our solutions', he: 'שמעו מעסקים ששינו את זרימות העבודה שלהם עם הפתרונות שלנו' },
  
  'social.trusted': { en: 'Trusted by', he: 'מהימן על ידי' },
  'social.innovators': { en: 'innovators worldwide', he: 'חדשנים ברחבי העולם' },
  
  // Testimonials
  'testimonial.ron.text': { en: 'Working with HOLYLABS was a game-changer for my business. They delivered a beautiful website with a smart dashboard that makes managing my clients so much easier—and all at an adorable price. Highly recommended!', he: 'עבודה עם הולי לאבס הייתה שינוי מהותי לעסק שלי. הם סיפקו אתר יפהפה עם דשבורד חכם שהופך את ניהול הלקוחות שלי להרבה יותר קל - והכל במחיר מקסים. מומלץ בחום!' },
  'testimonial.tamar.text': { en: 'The automation system HOLYLABS built for us has streamlined our appointment scheduling and customer communication. Our response rate has improved dramatically, and our team can finally focus on growing the business.', he: 'מערכת האוטומציה שהולי לאבס בנתה עבורנו ייעלה את תיאום הפגישות ותקשורת הלקוחות שלנו. שיעור התגובה שלנו השתפר באופן דרמטי, והצוות שלנו יכול סוף סוף להתמקד בהגדלת העסק.' },
  'testimonial.erez.text': { en: 'I was amazed by how quickly HOLYLABS integrated their solutions into our existing workflow. The customer service was outstanding, and the results were visible within days—higher efficiency and happier clients.', he: 'הייתי נדהם מכמה מהר הולי לאבס שילבה את הפתרונות שלהם בזרימת העבודה הקיימת שלנו. שירות הלקוחות היה יוצא דופן, והתוצאות היו נראות תוך ימים - יעילות גבוהה יותר ולקוחות מרוצים יותר.' },

  // WhyAutomation Section (if it exists)
  'whyautomation.badge': { en: 'Benefits', he: 'יתרונות' },
  'whyautomation.title': { en: 'Why Automation for SMBs?', he: 'למה אוטומציה לעסקים קטנים ובינוניים?' },
  'whyautomation.description': { en: 'Small and medium businesses need smart solutions to compete with larger enterprises. Here\'s how automation levels the playing field.', he: 'עסקים קטנים ובינוניים זקוקים לפתרונות חכמים כדי להתחרות עם ארגונים גדולים יותר. כך אוטומציה מאזנת את המגרש.' },
  
  'whyautomation.savetime.title': { en: 'Save Time', he: 'חסוך זמן' },
  'whyautomation.savetime.description': { en: 'Automate repetitive tasks and focus on growing your business', he: 'הפוך משימות חוזרות לאוטומטיות והתמקד בצמיחת העסק שלך' },
  'whyautomation.savetime.stat': { en: '40+ hours/week saved', he: 'יותר מ-40 שעות בשבוע נחסכות' },
  
  'whyautomation.efficiency.title': { en: 'Increase Efficiency', he: 'הגבר יעילות' },
  'whyautomation.efficiency.description': { en: 'Streamline operations with intelligent workflow automation', he: 'ייעל פעולות עם אוטומציה חכמה של זרימות עבודה' },
  'whyautomation.efficiency.stat': { en: '85% faster processes', he: 'תהליכים מהירים יותר ב-85%' },
  
  'whyautomation.experience.title': { en: 'Better Customer Experience', he: 'חוויית לקוח משופרת' },
  'whyautomation.experience.description': { en: 'Provide 24/7 support with instant, personalized responses', he: 'ספק תמיכה 24/7 עם תגובות מיידיות ומותאמות אישית' },
  'whyautomation.experience.stat': { en: '4.8/5 satisfaction rate', he: 'דירוג שביעות רצון 4.8/5' },
  
  'whyautomation.costs.title': { en: 'Reduce Costs', he: 'הפחת עלויות' },
  'whyautomation.costs.description': { en: 'Lower operational costs while scaling your business', he: 'הפחת עלויות תפעוליות תוך הרחבת העסק שלך' },
  'whyautomation.costs.stat': { en: '60% cost reduction', he: 'הפחתת עלויות של 60%' },

  // CTA Section
  'cta.badge': { en: 'Get Started', he: 'התחל' },
  'cta.title': { en: 'Ready to Transform Your Business?', he: 'מוכן לשנות את העסק שלך?' },
  'cta.description': { en: 'Join hundreds of SMBs that have already automated their way to success. Start with a free consultation to discover your automation opportunities.', he: 'הצטרף למאות עסקים קטנים ובינוניים שכבר הפכו לאוטומטיים את הדרך שלהם להצלחה. התחל עם ייעוץ חינם כדי לגלות את הזדמנויות האוטומציה שלך.' },
  'cta.primary': { en: 'Schedule Free Discovery Call', he: 'קבע שיחת גילוי חינם' },
  'cta.secondary': { en: 'Learn More', he: 'למד עוד' },
  'cta.consultation': { en: 'Free Consultation', he: 'ייעוץ חינם' },
  'cta.discovery': { en: 'Discovery Call', he: 'שיחת גילוי' },
  'cta.commitment': { en: 'Commitment Required', he: 'נדרשת התחייבות' },

  // About Section
  'about.badge': { en: 'About HOLYLABS', he: 'אודות הולי לאבס' },
  'about.title': { en: 'Empowering Businesses with\nAI Automation', he: 'מעצימים עסקים עם\nאוטומציה של בינה מלאכותית' },
  'about.description': { en: 'We believe that every business deserves to grow without being limited by manual processes. Our AI-powered solutions automate customer interactions, streamline operations, and boost revenue while you focus on what matters most.', he: 'אנחנו מאמינים שכל עסק ראוי לצמוח מבלי להיות מוגבל על ידי תהליכים ידניים. הפתרונות שלנו מבוססי הבינה המלאכותית מבצעים אוטומציה של אינטראקציות עם לקוחות, מייעלים פעולות ומגדילים הכנסות בזמן שאתם מתמקדים במה שחשוב באמת.' },

  'about.feature1.title': { en: 'AI-Powered', he: 'מבוסס בינה מלאכותית' },
  'about.feature1.description': { en: 'Advanced AI technology that learns and adapts to your business needs, providing personalized customer experiences.', he: 'טכנולוגיית בינה מלאכותית מתקדמת שלומדת ומתאימה את עצמה לצרכי העסק שלך, ומספקת חוויות לקוחות מותאמות אישית.' },

  'about.feature2.title': { en: '24/7 Automation', he: 'אוטומציה 24/7' },
  'about.feature2.description': { en: 'Never miss a customer inquiry or booking opportunity with our round-the-clock automated systems.', he: 'לעולם אל תפספסו פנייה של לקוח או הזדמנות הזמנה עם המערכות האוטומטיות שלנו שעובדות מסביב לשעון.' },

  'about.feature3.title': { en: 'Revenue Growth', he: 'צמיחה בהכנסות' },
  'about.feature3.description': { en: 'Proven strategies and automation tools that directly impact your bottom line and accelerate business growth.', he: 'אסטרטגיות מוכחות וכלי אוטומציה שמשפיעים ישירות על הרווח שלכם ומאיצים את צמיחת העסק.' },

  'about.stats.clients': { en: 'Active Clients', he: 'לקוחות פעילים' },
  'about.stats.automation': { en: 'Processes Automated', he: 'תהליכים אוטומטיים' },
  'about.stats.satisfaction': { en: 'Client Satisfaction', he: 'שביעות רצון לקוחות' },
  'about.stats.support': { en: 'Support Available', he: 'תמיכה זמינה' },

  'about.mission.title': { en: 'Our Mission', he: 'המשימה שלנו' },
  'about.mission.description': { en: 'To democratize business automation by making advanced AI technology accessible and affordable for businesses of all sizes. We believe every entrepreneur deserves the tools to compete and thrive in the digital age.', he: 'להפוך את האוטומציה העסקית לנגישה על ידי הפיכת טכנולוגיית הבינה המלאכותית המתקדמת לזמינה ובמחיר סביר לעסקים מכל הגדלים. אנחנו מאמינים שכל יזם ראוי לכלים כדי להתחרות ולשגשג בעידן הדיגיטלי.' },
  
  // About Page Specific Translations
  'about.page.aboutus': { en: 'About Us', he: 'אודות' },
  'about.page.empowering': { en: 'Empowering businesses through <span style="font-style: italic; font-weight: 400; font-family: \'IBM Plex Serif\', serif;">intelligent</span> automation', he: 'מעצימים עסקים באמצעות אוטומציה חכמה' },
  'about.page.mission': { en: 'We\'re on a mission to make AI automation accessible to every business, helping companies streamline operations, reduce costs, and accelerate growth through intelligent solutions.', he: 'המשימה שלנו היא להפוך את האוטומציה של בינה מלאכותית לנגישה לכל עסק, לעזור לחברות לייעל פעולות, להפחית עלויות ולהאיץ צמיחה באמצעות פתרונות חכמים.' },
  'about.page.ourstory': { en: 'Our Story', he: 'הסיפור שלנו' },
  'about.page.story1': { en: 'Founded with a vision to democratize AI automation, HOLYLABS emerged from the recognition that small and medium businesses were being left behind in the digital transformation wave.', he: 'נוסד עם חזון להנגיש אוטומציה של בינה מלאכותית, הולי לאבס נוצרה מתוך ההכרה שעסקים קטנים ובינוניים נשארים מאחור בגל הטרנספורמציה הדיגיטלית.' },
  'about.page.story2': { en: 'Our founders, experienced in both technology and business operations, witnessed firsthand how manual processes were holding back incredible businesses from reaching their full potential.', he: 'המייסדים שלנו, בעלי ניסיון בטכנולוגיה ובתפעול עסקי, היו עדים מקרוב כיצד תהליכים ידניים מעכבים עסקים מדהימים מלהגיע למלוא הפוטנציאל שלהם.' },
  'about.page.story3': { en: 'Today, we\'re proud to be the bridge between cutting-edge AI technology and practical business solutions, making automation accessible, affordable, and effective for businesses of all sizes.', he: 'כיום, אנו גאים להיות הגשר בין טכנולוגיית בינה מלאכותית חדשנית לבין פתרונות עסקיים מעשיים, ולהפוך אוטומציה לנגישה, במחיר סביר ויעילה לעסקים מכל הגדלים.' },
  'about.page.ourmission': { en: 'Our Mission', he: 'המשימה שלנו' },
  'about.page.missiondesc': { en: 'To empower every business with intelligent automation solutions that eliminate repetitive tasks, enhance customer experiences, and drive sustainable growth.', he: 'להעצים כל עסק עם פתרונות אוטומציה חכמים שמבטלים משימות חוזרות, משפרים את חוויית הלקוח, ומניעים צמיחה בת-קיימא.' },
  'about.page.ourvalues': { en: 'Our Values', he: 'הערכים שלנו' },
  'about.page.innovation': { en: 'Innovation First', he: 'חדשנות תחילה' },
  'about.page.innovationdesc': { en: 'We constantly push the boundaries of what\'s possible with AI automation to deliver cutting-edge solutions.', he: 'אנו דוחפים ללא הרף את גבולות האפשרי עם אוטומציה של בינה מלאכותית כדי לספק פתרונות חדשניים.' },
  'about.page.customer': { en: 'Customer Success', he: 'הצלחת לקוחות' },
  'about.page.customerdesc': { en: 'Your success is our mission. We\'re committed to delivering measurable results that transform your business.', he: 'ההצלחה שלכם היא המשימה שלנו. אנו מחויבים לספק תוצאות מדידות שמשנות את העסק שלכם.' },
  'about.page.transparency': { en: 'Transparency', he: 'שקיפות' },
  'about.page.transparencydesc': { en: 'We believe in honest communication, clear processes, and building trust through every interaction.', he: 'אנו מאמינים בתקשורת כנה, תהליכים ברורים, ובניית אמון דרך כל אינטראקציה.' },
  'about.page.growth': { en: 'Growth Mindset', he: 'תפיסת צמיחה' },
  'about.page.growthdesc': { en: 'We\'re always learning, adapting, and evolving to stay ahead of the rapidly changing technology landscape.', he: 'אנחנו תמיד לומדים, מסתגלים ומתפתחים כדי להישאר מובילים בנוף הטכנולוגי המשתנה במהירות.' },
  'about.page.transform': { en: 'Ready to Transform Your Business?', he: 'מוכנים לשנות את העסק שלכם?' },
  'about.page.join': { en: 'Join hundreds of businesses that have already discovered the power of intelligent automation. Let\'s build something amazing together.', he: 'הצטרפו למאות עסקים שכבר גילו את העוצמה של אוטומציה חכמה. בואו נבנה משהו מדהים יחד.' },
  'about.page.startyourjourney': { en: 'Start Your Journey', he: 'התחילו את המסע שלכם' },
  'about.page.learnmore': { en: 'Learn More', he: 'למידע נוסף' },
  'about.page.businesses': { en: 'Businesses Automated', he: 'עסקים מאוטמטים' },
  'about.page.satisfaction': { en: 'Client Satisfaction', he: 'שביעות רצון לקוחות' },
  'about.page.tasks': { en: 'Tasks Automated Monthly', he: 'משימות מאוטמטות חודשיות' },
  'about.page.support': { en: 'Support Available', he: 'תמיכה זמינה' },

  // FAQ Section
  'faq.badge': { en: 'FAQ', he: 'שאלות נפוצות' },
  'faq.title': { en: 'Frequently Asked\nQuestions', he: 'שאלות\nנפוצות' },
  'faq.description': { en: 'Find answers to common questions about HOLYLABS. Can\'t find what you\'re looking for? Contact our support team.', he: 'מצאו תשובות לשאלות נפוצות על הולי גרוז. לא מוצאים את מה שאתם מחפשים? צרו קשר עם צוות התמיכה שלנו.' },

  'faq.q1': { en: 'What is HOLYLABS and how does it work?', he: 'מה זה הולי גרוז ואיך זה עובד?' },
  'faq.a1': { en: 'HOLYLABS is an AI automation platform that helps businesses automate customer interactions through chatbots, automated calls, and smart booking systems. Our AI learns your business processes and handles customer inquiries, appointments, and sales 24/7.', he: 'הולי גרוז היא פלטפורמת אוטומציה של בינה מלאכותית שעוזרת לעסקים להפוך לאוטומטיים את האינטראקציות עם לקוחות באמצעות צ\'אטבוטים, שיחות אוטומטיות ומערכות הזמנה חכמות. הבינה המלאכותית שלנו לומדת את התהליכים העסקיים שלכם ומטפלת בפניות לקוחות, פגישות ומכירות 24/7.' },

  'faq.q2': { en: 'How quickly can I set up automation for my business?', he: 'כמה מהר אני יכול להקים אוטומציה לעסק שלי?' },
  'faq.a2': { en: 'Most businesses can have their first automation running within 24-48 hours. Our team handles the setup process, and we provide comprehensive training to ensure you get the most out of your automated systems.', he: 'רוב העסקים יכולים להפעיל את האוטומציה הראשונה שלהם תוך 24-48 שעות. הצוות שלנו מטפל בתהליך ההתקנה, ואנחנו מספקים הכשרה מקיפה כדי להבטיח שתפיקו את המקסימום מהמערכות האוטומטיות שלכם.' },

  'faq.q3': { en: 'What types of businesses can benefit from HOLYLABS?', he: 'איזה סוגי עסקים יכולים להפיק תועלת מהולי גרוז?' },
  'faq.a3': { en: 'Any business that interacts with customers can benefit from our automation solutions. This includes restaurants, clinics, salons, retail stores, service providers, and more. Our AI adapts to your specific industry and business model.', he: 'כל עסק שמקיים אינטראקציה עם לקוחות יכול להפיק תועלת מפתרונות האוטומציה שלנו. זה כולל מסעדות, מרפאות, מכוני יופי, חנויות קמעונאיות, ספקי שירותים ועוד. הבינה המלאכותית שלנו מתאימה את עצמה לתחום הספציפי שלכם ולמודל העסקי שלכם.' },

  'faq.q4': { en: 'Is there a free trial available?', he: 'האם יש ניסיון חינם?' },
  'faq.a4': { en: 'Yes! We offer a 14-day free trial that includes full access to our platform. You can test all features including chatbots, automated calls, and booking systems without any commitment.', he: 'כן! אנחנו מציעים ניסיון חינם של 14 יום שכולל גישה מלאה לפלטפורמה שלנו. אתם יכולים לבדוק את כל התכונות כולל צ\'אטבוטים, שיחות אוטומטיות ומערכות הזמנה ללא כל התחייבות.' },

  'faq.q5': { en: 'How secure is my business data with HOLYLABS?', he: 'כמה מאובטח המידע העסקי שלי עם הולי גרוז?' },
  'faq.a5': { en: 'Security is our top priority. We use enterprise-grade encryption, comply with international data protection standards, and store all data in secure, redundant servers. Your data is never shared with third parties and you maintain full ownership and control.', he: 'אבטחה היא העדיפות העליונה שלנו. אנחנו משתמשים בהצפנה ברמה ארגונית, עומדים בתקני הגנת מידע בינלאומיים, ושומרים את כל הנתונים בשרתים מאובטחים ומיותרים. הנתונים שלכם לעולם לא משותפים עם צדדים שלישיים ואתם שומרים על בעלות ושליטה מלאה.' },

  'faq.q6': { en: 'Can I integrate HOLYLABS with my existing systems?', he: 'האם אני יכול לשלב את הולי גרוז עם המערכות הקיימות שלי?' },
  'faq.a6': { en: 'Absolutely! We offer integrations with popular CRM systems, calendar applications, payment processors, and more. Our API also allows for custom integrations to fit seamlessly into your existing workflow.', he: 'בהחלט! אנחנו מציעים שילובים עם מערכות CRM פופולריות, יישומי לוח שנה, מעבדי תשלומים ועוד. ה-API שלנו גם מאפשר שילובים מותאמים אישית כדי להשתלב בצורה חלקה בזרימת העבודה הקיימת שלכם.' },

  'faq.contact': { en: 'Still have questions?', he: 'עדיין יש שאלות?' },
  'faq.contact.cta': { en: 'Contact Support', he: 'צור קשר עם התמיכה' },

  // Footer
  'footer.tagline': { en: 'Automate your business growth with AI-powered solutions that work around the clock.', he: 'הפוך את צמיחת העסק שלך לאוטומטית עם פתרונות מבוססי בינה מלאכותית שעובדות מסביב לשעון.' },
  'footer.product': { en: 'Product', he: 'מוצר' },
  'footer.company': { en: 'Company', he: 'חברה' },
  'footer.resources': { en: 'Resources', he: 'משאבים' },
  'footer.legal': { en: 'Legal', he: 'משפטי' },
  'footer.newsletter.title': { en: 'Stay Updated', he: 'הישארו מעודכנים' },
  'footer.newsletter.description': { en: 'Get the latest automation insights and product updates delivered to your inbox.', he: 'קבלו את התובנות האחרונות על אוטומציה ועדכוני מוצר ישירות לתיבת הדואר שלכם.' },
  'footer.newsletter.placeholder': { en: 'Enter your email', he: 'הכניסו את האימייל שלכם' },
  'footer.newsletter.subscribe': { en: 'Subscribe', he: 'הירשמו' },
  'footer.copyright': { en: '© 2025 HOLYLABS Ltd All rights reserved.', he: '© 2025 HOLYLABS Ltd כל הזכויות שמורות.' },
  'footer.made': { en: 'Made with ❤️ for growing businesses', he: 'נוצר באהבה ❤️ לעסקים צומחים' },
  'footer.status': { en: 'All systems operational', he: 'כל המערכות פעילות' },

  // Dashboard Section
  'dashboard.greeting': { en: 'Hello, Business Owner', he: 'שלום, בעל עסק' },
  'dashboard.metrics.conversations': { en: 'AI Conversations', he: 'שיחות בינה מלאכותית' },
  'dashboard.metrics.bookings': { en: 'Auto Bookings', he: 'הזמנות אוטומטיות' },
  'dashboard.metrics.feature': { en: 'Top Automation', he: 'אוטומציה מובילה' },
  'dashboard.metrics.feature.value': { en: 'Smart Booking', he: 'הזמנה חכמה' },
  'dashboard.metrics.conversion': { en: 'Conversion Rate', he: 'שיעור המרה' },
  'dashboard.recent.title': { en: 'Recent Interactions', he: 'אינטראקציות אחרונות' },
  'dashboard.insights.title': { en: 'AI Insights', he: 'תובנות בינה מלאכותית' },
  'dashboard.insights.rating': { en: 'Avg. satisfaction', he: 'שביעות רצון ממוצעת' },
  'dashboard.insights.responses': { en: 'Auto responses', he: 'תגובות אוטומטיות' },
  'dashboard.insights.efficiency': { en: 'Efficiency gain', he: 'שיפור יעילות' },

  // Services Page
  'services.page.badge': { en: 'Services', he: 'שירותים' },
  'services.page.title': { en: 'Here\'s how we can improve your business', he: 'כך נוכל לשפר את העסק שלך' },
  'services.page.description': { en: 'We offer a range of services to help you automate your business and increase efficiency, reduce costs, and drive growth.', he: 'אנחנו מציעים מגוון שירותים כדי לעזור לך להפוך את העסק שלך לאוטומטי ולהגדיל יעילות, להפחית עלויות ולהניע צמיחה.' },
  
  // Services Details
  'services.whatsapp.subtitle': { en: '24/7 Intelligent Customer Support', he: 'תמיכת לקוחות חכמה 24/7' },
  'services.whatsapp.detailed': { en: 'Transform your customer service with AI-powered WhatsApp receptionists that handle inquiries, provide instant responses, and qualify leads around the clock.', he: 'שנה את שירות הלקוחות שלך עם פקידי קבלה מבוססי בינה מלאכותית בוואטסאפ שמטפלים בפניות, מספקים תגובות מיידיות ומכשירים לידים מסביב לשעון.' },
  
  'services.calls.subtitle': { en: 'Automated Voice Interactions', he: 'אינטראקציות קוליות אוטומטיות' },
  'services.calls.detailed': { en: 'Intelligent calling systems that handle bookings, orders, and customer service calls with human-like voice interaction and natural conversation flow.', he: 'מערכות שיחה חכמות המטפלות בהזמנות, בקשות ושיחות שירות לקוחות עם אינטראקציה קולית דמוית אדם וזרימת שיחה טבעיית.' },
  
  'services.leads.subtitle': { en: 'Intelligent Lead Processing', he: 'עיבוד לידים חכם' },
  'services.leads.detailed': { en: 'AI-powered lead qualification through smart questionnaires, behavioral analysis, and automated scoring to identify your best prospects.', he: 'כישור לידים מבוסס בינה מלאכותית באמצעות שאלונים חכמים, ניתוח התנהגותי וניקוד אוטומטי כדי לזהות את הפרוספקטים הטובים ביותר שלך.' },
  
  'services.ads.subtitle': { en: 'Smart Advertising Automation', he: 'אוטומציה פרסומית חכמה' },
  'services.ads.detailed': { en: 'Create, optimize, and manage advertising campaigns using AI-driven targeting, creative optimization, and performance analysis.', he: 'יצירה, אופטימיזציה וניהול קמפיינים פרסומיים באמצעות מיקוד מבוסס בינה מלאכותית, אופטימיזציה יצירתית וניתוח ביצועים.' },
  
  'services.web.subtitle': { en: 'AI-Integrated Websites', he: 'אתרים משולבי בינה מלאכותית' },
  'services.web.detailed': { en: 'Custom website development with integrated AI automation tools, chatbots, and enhanced user experience optimization.', he: 'פיתוח אתרים מותאמים אישית עם כלי אוטומציה של בינה מלאכותית משולבים, צ\'אטבוטים ואופטימיזציית חוויית משתמש משופרת.' },
  
  // Service Features
  'services.features.nlp': { en: 'Natural language processing', he: 'עיבוד שפה טבעית' },
  'services.features.multilang': { en: 'Multi-language support', he: 'תמיכה רב-לשונית' },
  'services.features.qualification': { en: 'Lead qualification', he: 'כישור לידים' },
  'services.features.booking': { en: 'Appointment booking', he: 'הזמנת פגישות' },
  'services.features.faq': { en: 'FAQ automation', he: 'אוטומציה של שאלות נפוצות' },
  'services.features.sentiment': { en: 'Sentiment analysis', he: 'ניתוח סנטימנט' },
  'services.features.voice': { en: 'Human-like voice synthesis', he: 'סינתזת קול דמוית אדם' },
  'services.features.realtime': { en: 'Real-time conversation', he: 'שיחה בזמן אמת' },
  'services.features.crm': { en: 'CRM integration', he: 'שילוב CRM' },
  'services.features.recording': { en: 'Call recording & analytics', he: 'הקלטת שיחות ואנליטיקה' },
  'services.features.scheduling': { en: 'Appointment scheduling', he: 'תיאום פגישות' },
  'services.features.questionnaires': { en: 'Smart questionnaires', he: 'שאלונים חכמים' },
  'services.features.scoring': { en: 'Lead scoring algorithms', he: 'אלגוריתמי ניקוד לידים' },
  'services.features.behavioral': { en: 'Behavioral tracking', he: 'מעקב התנהגותי' },
  'services.features.testing': { en: 'A/B testing', he: 'בדיקות A/B' },
  'services.features.analytics': { en: 'Performance analytics', he: 'אנליטיקת ביצועים' },
  'services.features.campaigns': { en: 'Automated campaign creation', he: 'יצירת קמפיינים אוטומטית' },
  'services.features.targeting': { en: 'Smart audience targeting', he: 'מיקוד קהל חכם' },
  'services.features.creative': { en: 'Creative optimization', he: 'אופטימיזציה יצירתית' },
  'services.features.bidding': { en: 'Bid management', he: 'ניהול הצעות מחיר' },
  'services.features.tracking': { en: 'Performance tracking', he: 'מעקב ביצועים' },
  'services.features.roi': { en: 'ROI optimization', he: 'אופטימיזציית ROI' },
  'services.features.development': { en: 'Custom web development', he: 'פיתוח אתרים מותאם אישית' },
  'services.features.chatbot': { en: 'AI chatbot integration', he: 'שילוב צ\'אטבוט בינה מלאכותית' },
  'services.features.performance': { en: 'Performance optimization', he: 'אופטימיזציית ביצועים' },
  'services.features.responsive': { en: 'Mobile responsiveness', he: 'תגובתיות מובייל' },
  'services.features.seo': { en: 'SEO optimization', he: 'אופטימיזציית SEO' },
  'services.features.integration': { en: 'Analytics integration', he: 'שילוב אנליטיקה' },
  
  // Use Cases
  'services.usecase.restaurants': { en: 'Restaurants', he: 'מסעדות' },
  'services.usecase.healthcare': { en: 'Healthcare', he: 'בריאות' },
  'services.usecase.ecommerce': { en: 'E-commerce', he: 'מסחר אלקטרוני' },
  'services.usecase.medical': { en: 'Medical Clinics', he: 'מרפאות' },
  'services.usecase.automotive': { en: 'Automotive', he: 'רכב' },
  'services.usecase.realestate': { en: 'Real Estate', he: 'נדלן' },
  'services.usecase.software': { en: 'Software Companies', he: 'חברות תוכנה' },
  'services.usecase.insurance': { en: 'Insurance', he: 'ביטוח' },
  'services.usecase.financial': { en: 'Financial Services', he: 'שירותים פיננסיים' },
  'services.usecase.local': { en: 'Local Business', he: 'עסק מקומי' },
  'services.usecase.saas': { en: 'SaaS', he: 'SaaS' },
  'services.usecase.professional': { en: 'Professional Services', he: 'שירותים מקצועיים' },
  'services.usecase.retail': { en: 'Retail', he: 'קמעונאות' },
  
  // Use Case Scenarios
  'services.scenario.reservations': { en: 'Handle table reservations, menu inquiries, and order status updates', he: 'טיפול בהזמנות שולחנות, פניות תפריט ועדכוני סטטוס הזמנות' },
  'services.scenario.appointments': { en: 'Appointment scheduling, prescription reminders', he: 'תיאום פגישות, תזכורות מרשמים' },
  'services.scenario.orders': { en: 'Order tracking, recommendations, and return processing', he: 'מעקב הזמנות, המלצות ועיבוד החזרות' },
  'services.scenario.confirmations': { en: 'Automated appointment confirmations and rescheduling', he: 'אישורי פגישות אוטומטיים ותיאום מחדש' },
  'services.scenario.service': { en: 'Service appointment booking and maintenance reminders', he: 'הזמנת פגישות שירות ותזכורות תחזוקה' },
  'services.scenario.property': { en: 'Property inquiry follow-ups and viewing appointments', he: 'מעקב פניות נכסים ופגישות צפייה' },
  'services.scenario.demos': { en: 'Qualify demo requests and trial sign-ups', he: 'כישור בקשות הדגמה ורישומים לניסיון' },
  'services.scenario.insurance': { en: 'Pre-qualify insurance applicants', he: 'כישור מוקדם של מבקשי ביטוח' },
  'services.scenario.loans': { en: 'Assess loan application readiness', he: 'הערכת מוכנות בקשות הלוואה' },
  'services.scenario.products': { en: 'Dynamic product ads with personalized targeting', he: 'מודעות מוצרים דינמיות עם מיקוד מותאם אישית' },
  'services.scenario.geo': { en: 'Geo-targeted campaigns with optimal timing', he: 'קמפיינים ממוקדי מיקום עם תזמון אופטימלי' },
  'services.scenario.multichannel': { en: 'Multi-channel campaigns with automated optimization', he: 'קמפיינים רב-ערוציים עם אופטימיזציה אוטומטית' },
  'services.scenario.leadgen': { en: 'Lead generation website with integrated AI chat', he: 'אתר יצירת לידים עם צ\'אט בינה מלאכותית משולב' },
  'services.scenario.recommendations': { en: 'E-commerce site with AI product recommendations', he: 'אתר מסחר אלקטרוני עם המלצות מוצרים של בינה מלאכותית' },
  'services.scenario.portal': { en: 'Patient portal with AI symptom checker', he: 'פורטל מטופלים עם בודק תסמינים של בינה מלאכותית' },
  
  // Results
  'services.result.reduction': { en: '85% reduction in manual customer service', he: '85% הפחתה בשירות לקוחות ידני' },
  'services.result.bookings': { en: '60% increase in bookings', he: '60% עלייה בהזמנות' },
  'services.result.satisfaction': { en: '40% improvement in customer satisfaction', he: '40% שיפור בשביעות רצון לקוחות' },
  'services.result.noshows': { en: '70% reduction in no-shows', he: '70% הפחתה באי-הגעות' },
  'services.result.service': { en: '45% increase in service bookings', he: '45% עלייה בהזמנות שירות' },
  'services.result.leads': { en: '50% more qualified leads', he: '50% יותר לידים מכושרים' },
  'services.result.qualified': { en: '120% increase in qualified leads', he: '120% עלייה בלידים מכושרים' },
  'services.result.conversion': { en: '85% improvement in conversion rates', he: '85% שיפור בשיעורי המרה' },
  'services.result.processing': { en: '60% faster processing time', he: '60% זמן עיבוד מהיר יותר' },
  'services.result.roas': { en: '180% improvement in ROAS', he: '180% שיפור ב-ROAS' },
  'services.result.traffic': { en: '90% increase in foot traffic', he: '90% עלייה בתנועת רגל' },
  'services.result.acquisition': { en: '75% reduction in cost per acquisition', he: '75% הפחתה בעלות לרכישה' },
  'services.result.inquiries': { en: '200% increase in qualified inquiries', he: '200% עלייה בפניות מכושרות' },
  'services.result.ordervalue': { en: '45% increase in average order value', he: '45% עלייה בערך הזמנה ממוצע' },
  'services.result.appointments': { en: '60% reduction in unnecessary appointments', he: '60% הפחתה בפגישות לא נחוצות' },
  
  // Service Stats
  'services.stats.response': { en: 'Response Time', he: 'זמן תגובה' },
  'services.stats.accuracy': { en: 'Accuracy Rate', he: 'שיעור דיוק' },
  'services.stats.satisfaction': { en: 'Customer Satisfaction', he: 'שביעות רצון לקוחות' },
  'services.stats.success': { en: 'Call Success Rate', he: 'שיעור הצלחת שיחות' },
  'services.stats.duration': { en: 'Average Call Duration', he: 'משך שיחה ממוצע' },
  'services.stats.conversion': { en: 'Conversion Rate', he: 'שיעור המרה' },
  'services.stats.quality': { en: 'Lead Quality Score', he: 'ניקוד איכות לידים' },
  'services.stats.speed': { en: 'Processing Speed', he: 'מהירות עיבוד' },
  'services.stats.improvement': { en: 'Conversion Improvement', he: 'שיפור המרה' },
  'services.stats.roas': { en: 'ROAS Improvement', he: 'שיפור ROAS' },
  'services.stats.ctr': { en: 'Click-Through Rate', he: 'שיעור קליקים' },
  'services.stats.cost': { en: 'Cost Reduction', he: 'הפחתת עלויות' },
  'services.stats.loadspeed': { en: 'Page Load Speed', he: 'מהירות טעינת עמוד' },
  'services.stats.mobile': { en: 'Mobile Score', he: 'ניקוד מובייל' },
  'services.stats.conversionrate': { en: 'Conversion Rate', he: 'שיעור המרה' },
  
  // Service Values
  'services.value.10sec': { en: '<10 sec', he: '<10 שניות' },
  'services.value.95percent': { en: '95%', he: '95%' },
  'services.value.48of5': { en: '4.8/5', he: '4.8/5' },
  'services.value.92percent': { en: '92%', he: '92%' },
  'services.value.32min': { en: '3.2 min', he: '3.2 דקות' },
  'services.value.68percent': { en: '68%', he: '68%' },
  'services.value.88percent': { en: '88%', he: '88%' },
  'services.value.5x': { en: '5x faster', he: '5x מהיר יותר' },
  'services.value.plus65': { en: '+65%', he: '+65%' },
  'services.value.plus150': { en: '+150%', he: '+150%' },
  'services.value.32percent': { en: '3.2%', he: '3.2%' },
  'services.value.40percent': { en: '40%', he: '40%' },
  'services.value.2sec': { en: '<2 seconds', he: '<2 שניות' },
  'services.value.95of100': { en: '95/100', he: '95/100' },
  'services.value.plus80': { en: '+80%', he: '+80%' },
  
  // Service Pricing
  'services.pricing.starter': { en: 'Starter', he: 'מתחילים' },
  'services.pricing.professional': { en: 'Professional', he: 'מקצועי' },
  'services.pricing.enterprise': { en: 'Enterprise', he: 'ארגוני' },
  'services.pricing.custom': { en: 'Custom', he: 'מותאם אישית' },
  'services.pricing.onetime': { en: 'one-time', he: 'חד פעמי' },
  
  // Service CTA
  'services.cta.schedule': { en: 'Schedule a Call', he: 'קבע שיחה' },
  'services.cta.ready': { en: 'Ready to Transform Your Business?', he: 'מוכן לשנות את העסק שלך?' },
  'services.cta.join': { en: 'Join thousands of businesses already using our AI automation solutions to increase efficiency, reduce costs, and accelerate growth.', he: 'הצטרף לאלפי עסקים שכבר משתמשים בפתרונות האוטומציה של הבינה המלאכותית שלנו כדי להגדיל יעילות, להפחית עלויות ולהאיץ צמיחה.' },
  'services.cta.learnmore': { en: 'Learn More', he: 'למד עוד' },
  
  // Contact Page
  'contact.badge': { en: 'Get In Touch', he: 'צור קשר' },
  'contact.title': { en: 'Let\'s discuss your automation needs', he: 'בואו נדבר על צרכי האוטומציה שלכם' },
  'contact.description': { en: 'Ready to transform your business with intelligent automation? We\'re here to help you get started. Choose the best way to connect with our team.', he: 'מוכנים לשנות את העסק שלכם עם אוטומציה חכמה? אנחנו כאן כדי לעזור לכם להתחיל. בחרו את הדרך הטובה ביותר להתחבר עם הצוות שלנו.' },
  
  // Contact Methods
  'contact.methods.title': { en: 'Get in Touch', he: 'צרו קשר' },
  'contact.methods.description': { en: 'Choose the best way to connect with our team', he: 'בחרו את הדרך הטובה ביותר להתחבר עם הצוות שלנו' },
  'contact.call.title': { en: 'Phone call', he: 'התקשרו אלינו' },
  'contact.call.description': { en: 'Speak directly with our automation system', he: 'דברו ישירות עם המערכת האוטומציה שלנו' },
  
  // Contact Form
  'contact.form.title': { en: 'Send us a message', he: 'שלחו לנו הודעה' },
  'contact.form.name': { en: 'Full Name', he: 'שם מלא' },
  'contact.form.email': { en: 'Email Address', he: 'כתובת אימייל' },
  'contact.form.company': { en: 'Company Name', he: 'שם החברה' },
  'contact.form.phone': { en: 'Phone Number', he: 'מספר טלפון' },
  'contact.form.service': { en: 'Service of Interest', he: 'שירות מעניין' },
  'contact.form.message': { en: 'Message', he: 'הודעה' },
  'contact.form.required': { en: '*', he: '*' },
  'contact.form.select': { en: 'Select a service...', he: 'בחר שירות...' },
  'contact.form.send': { en: 'Send Message', he: 'שלח הודעה' },
  
  // Form Placeholders
  'contact.placeholder.name': { en: 'John Doe', he: 'ישראל ישראלי' },
  'contact.placeholder.email': { en: 'john@company.com', he: 'israel@company.com' },
  'contact.placeholder.company': { en: 'Your Company', he: 'החברה שלך' },
  'contact.placeholder.phone': { en: '+1 (555) 123-4567', he: '+972-50-123-4567' },
  'contact.placeholder.message': { en: 'Tell us about your automation needs and how we can help...', he: 'ספרו לנו על צרכי האוטומציה שלכם ואיך אנחנו יכולים לעזור...' },
  'contact.whatsapp.title': { en: 'WhatsApp', he: 'וואטסאפ' },
  'contact.whatsapp.description': { en: 'Connect with us on WhatsApp', he: 'התחברו אלינו בוואטסאפ' },
  'contact.telegram.title': { en: 'Telegram', he: 'טלגרם' },
  'contact.telegram.description': { en: 'Message us on Telegram', he: 'שלחו לנו הודעה בטלגרם' },

  
  // Service Options
  'contact.service.whatsapp': { en: 'AI WhatsApp Bot', he: 'בוט וואטסאפ בינה מלאכותית' },
  'contact.service.calls': { en: 'AI Booking & Order Calls', he: 'שיחות הזמנה ובקשות בינה מלאכותית' },
  'contact.service.leads': { en: 'Lead Qualification Bots', he: 'בוטים לכישור לידים' },
  'contact.service.ads': { en: 'AI Ad Campaigns', he: 'קמפיינים פרסומיים בינה מלאכותית' },
  'contact.service.web': { en: 'Web Development', he: 'פיתוח אתרים' },
  'contact.service.custom': { en: 'Custom Solution', he: 'פתרון מותאם אישית' },
  'contact.service.general': { en: 'General Inquiry', he: 'פנייה כללית' },
  
  // Office Information
  'contact.office.title': { en: 'Office Information', he: 'מידע משרד' },
  'contact.office.address': { en: 'Address', he: 'כתובת' },
  'contact.office.hours': { en: 'Business Hours', he: 'שעות פעילות' },
  'contact.office.support': { en: 'Support', he: 'תמיכה' },
  'contact.office.address.value': { en: '1578 Hunter St, North Vancouver, BC V7J 1H5', he: '1578 Hunter St, North Vancouver, BC V7J 1H5' },
  'contact.office.hours.value': { en: 'Mon-Fri: 9:00 AM - 6:00 PM PST', he: 'א\'-ו\': 9:00 - 18:00' },
  'contact.office.support.value': { en: '24/7 Technical Support Available', he: 'תמיכה טכנית זמינה 24/7' },
  
  // Map
  'contact.map.title': { en: 'Interactive Map', he: 'מפה אינטראקטיבית' },
  'contact.map.subtitle': { en: 'Google Maps integration', he: 'שילוב גוגל מפות' },
  
  // Quick Questions
  'contact.questions.title': { en: 'Quick Questions', he: 'שאלות מהירות' },
  'contact.questions.start.q': { en: 'How quickly can we get started?', he: 'כמה מהר נוכל להתחיל?' },
  'contact.questions.start.a': { en: 'Most projects can begin within 1-2 weeks after our initial consultation and requirements gathering.', he: 'רוב הפרויקטים יכולים להתחיל תוך שבוע-שבועיים לאחר הייעוץ הראשוני ואיסוף הדרישות.' },
  'contact.questions.consultation.q': { en: 'Do you offer free consultations?', he: 'האם אתם מציעים ייעוץ חינם?' },
  'contact.questions.consultation.a': { en: 'Yes! We provide free 30-minute consultations to discuss your automation needs and potential solutions.', he: 'כן! אנחנו מספקים ייעוץ חינם של 30 דקות כדי לדון בצרכי האוטומציה שלכם ובפתרונות אפשריים.' },
  'contact.questions.industries.q': { en: 'What industries do you serve?', he: 'באילו תחומים אתם עובדים?' },
  'contact.questions.industries.a': { en: 'We work with businesses across all industries including healthcare, e-commerce, restaurants, and professional services.', he: 'אנחנו עובדים עם עסקים מכל התחומים כולל בריאות, מסחר אלקטרוני, מסעדות ושירותים מקצועיים.' },
  'contact.questions.support.q': { en: 'Is ongoing support included?', he: 'האם תמיכה מתמשכת כלולה?' },
  'contact.questions.support.a': { en: 'Yes, all our solutions include ongoing support and maintenance to ensure optimal performance.', he: 'כן, כל הפתרונות שלנו כוללים תמיכה ותחזוקה מתמשכת כדי להבטיח ביצועים אופטימליים.' },
  
  // Bottom CTA
  'contact.cta.title': { en: 'Ready to Get Started?', he: 'מוכנים להתחיל?' },
  'contact.cta.description': { en: 'Don\'t wait to transform your business. Schedule a free consultation today and discover how automation can drive your success.', he: 'אל תחכו לשנות את העסק שלכם. קבעו ייעוץ חינם היום וגלו איך אוטומציה יכולה להניע את ההצלחה שלכם.' },
  'contact.cta.button': { en: 'Schedule Free Consultation', he: 'קבע ייעוץ חינם' },
  
  // Form Status Messages
  'contact.form.sending': { en: 'Sending...', he: 'שולח...' },
  'contact.form.success': { en: 'Message sent successfully! We\'ll get back to you soon.', he: 'ההודעה נשלחה בהצלחה! נחזור אליכם בקרוב.' },
  'contact.form.error': { en: 'Something went wrong. Please try again or contact us directly.', he: 'משהו השתבש. אנא נסו שוב או צרו קשר ישירות.' },
  'contact.form.service.select': { en: 'Select a service...', he: 'בחר שירות...' },
  
  // Contact FAQ Section
  'contact.faq.title': { en: 'Frequently Asked Questions', he: 'שאלות נפוצות' },
  'contact.faq.description': { en: 'Find quick answers to common questions about our services and getting started.', he: 'מצאו תשובות מהירות לשאלות נפוצות על השירותים שלנו ועל איך להתחיל.' },
  'contact.faq.q1': { en: 'How quickly can we get started with automation?', he: 'כמה מהר נוכל להתחיל עם אוטומציה?' },
  'contact.faq.a1': { en: 'Most automation projects can begin within 1-2 weeks after our initial consultation and requirements gathering. Simple chatbots can be deployed even faster, sometimes within 24-48 hours.', he: 'רוב פרויקטי האוטומציה יכולים להתחיל תוך שבוע-שבועיים לאחר הייעוץ הראשוני ואיסוף הדרישות. צ\'אטבוטים פשוטים יכולים להיפרס אפילו מהר יותר, לפעמים תוך 24-48 שעות.' },
  'contact.faq.q2': { en: 'Do you offer free consultations?', he: 'האם אתם מציעים ייעוץ חינם?' },
  'contact.faq.a2': { en: 'Yes! We provide free 30-minute consultations to discuss your automation needs, assess your current processes, and recommend the best solutions for your business.', he: 'כן! אנחנו מספקים ייעוץ חינם של 30 דקות כדי לדון בצרכי האוטומציה שלכם, להעריך את התהליכים הנוכחיים שלכם ולהמליץ על הפתרונות הטובים ביותר לעסק שלכם.' },
  'contact.faq.q3': { en: 'What industries do you work with?', he: 'עם אילו תחומים אתם עובדים?' },
  'contact.faq.a3': { en: 'We work with businesses across all industries including healthcare, e-commerce, restaurants, professional services, real estate, and more. Our AI solutions are customizable to fit any business model.', he: 'אנחנו עובדים עם עסקים מכל התחומים כולל בריאות, מסחר אלקטרוני, מסעדות, שירותים מקצועיים, נדלן ועוד. פתרונות הבינה המלאכותית שלנו ניתנים להתאמה אישית כדי להתאים לכל מודל עסקי.' },
  'contact.faq.q4': { en: 'Is ongoing support and maintenance included?', he: 'האם תמיכה ותחזוקה מתמשכת כלולות?' },
  'contact.faq.a4': { en: 'Yes, all our automation solutions include ongoing support, maintenance, and optimization to ensure peak performance. We also provide training for your team and regular performance reports.', he: 'כן, כל פתרונות האוטומציה שלנו כוללים תמיכה, תחזוקה ואופטימיזציה מתמשכת כדי להבטיח ביצועים מיטביים. אנחנו גם מספקים הכשרה לצוות שלכם ודוחות ביצועים סדירים.' },

  // Blog Page
  'blog.badge': { en: 'Insights & Updates', he: 'תובנות ועדכונים' },
  'blog.title': { en: 'Blog & Resources', he: 'בלוג ומשאבים' },
  'blog.description': { en: 'Discover the latest insights, automation strategies, and success stories to help your business thrive in the digital age.', he: 'גלו את התובנות האחרונות, אסטרטגיות אוטומציה וסיפורי הצלחה שיעזרו לעסק שלכם לשגשג בעידן הדיגיטלי.' },
  
  // Blog Search & Filter
  'blog.search.placeholder': { en: 'Search articles...', he: 'חפש מאמרים...' },
  'blog.filter.tags': { en: 'Filter by tags', he: 'סנן לפי תגיות' },
  'blog.filter.active': { en: 'Active filters', he: 'מסננים פעילים' },
  'blog.filter.clear': { en: 'Clear all', he: 'נקה הכל' },
  
  // Blog Content
  'blog.readTime': { en: 'min read', he: 'דק\' קריאה' },
  'blog.readMore': { en: 'Read more', he: 'קרא עוד' },
  'blog.loadMore': { en: 'Load More Articles', he: 'טען מאמרים נוספים' },
  'blog.loadingMore': { en: 'Loading...', he: 'טוען...' },
  
  // Blog Empty State
  'blog.empty.title': { en: 'No articles found', he: 'לא נמצאו מאמרים' },
  'blog.empty.description': { en: 'Try adjusting your search or filter criteria.', he: 'נסו לשנות את קריטריוני החיפוש או הסינון.' },
  
  // Blog Sidebar
  'blog.popular.title': { en: 'Popular Articles', he: 'מאמרים פופולריים' },
  'blog.tags.title': { en: 'All Tags', he: 'כל התגיות' },
  
  // Blog Post Page
  'blogPost.share': { en: 'Share this article', he: 'שתף מאמר זה' },
  'blogPost.shareTwitter': { en: 'Share on Twitter', he: 'שתף בטוויטר' },
  'blogPost.shareFacebook': { en: 'Share on Facebook', he: 'שתף בפייסבוק' },
  'blogPost.shareLinkedIn': { en: 'Share on LinkedIn', he: 'שתף בלינקדאין' },
  'blogPost.copyLink': { en: 'Copy link', he: 'העתק קישור' },
  'blogPost.linkCopied': { en: 'Link copied!', he: 'הקישור הועתק!' },
  'blogPost.backToBlog': { en: 'Back to Blogs', he: 'חזרה לבלוגים' },
  'blogPost.relatedPosts': { en: 'Related Articles', he: 'מאמרים קשורים' },
  'blogPost.author': { en: 'By', he: 'מאת' },
  'blogPost.tags': { en: 'Tags', he: 'תגיות' },
  'blogPost.publishedOn': { en: 'Published on', he: 'פורסם ב' },
  'blogPost.notFound.title': { en: 'Article Not Found', he: 'המאמר לא נמצא' },
  'blogPost.notFound.description': { en: 'The article you\'re looking for doesn\'t exist or has been moved.', he: 'המאמר שאתם מחפשים לא קיים או הועבר.' },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize language from localStorage or default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language') as Language;
      return savedLanguage && (savedLanguage === 'en' || savedLanguage === 'he') ? savedLanguage : 'en';
    }
    return 'en';
  });

  // Save language preference to localStorage whenever it changes
  const setLanguageWithPersistence = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang);
    }
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageWithPersistence, t }}>
      <div className={language === 'he' ? 'rtl' : 'ltr'} dir={language === 'he' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};