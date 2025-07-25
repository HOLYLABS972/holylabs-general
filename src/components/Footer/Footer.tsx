import React from "react";
import { Instagram, LinkedinIcon, MailIcon } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

export const Footer = (): JSX.Element => {
  const { t } = useLanguage();

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" }
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "GDPR", href: "/gdpr" }
    ]
  };

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/theholylabs/", label: "Instagram" },
    { icon: <LinkedinIcon className="w-5 h-5" />, href: "https://www.linkedin.com/company/holylabs/", label: "LinkedIn" },
    { icon: <MailIcon className="w-5 h-5" />, href: "mailto:support@theholylabs.com", label: "Email" }
  ];

  return (
    <footer className="bg-black text-white ">
      <div 
        className="absolute inset-0 opacity-[0.20] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex flex-row items-center mb-6 text-white text-2xl font-light tracking-[-0.6px]">
                <svg className="w-10 h-10 me-2" viewBox="0 0 365.02 365.02" xmlns="http://www.w3.org/2000/svg">
                  <path fill="white" d="M182.51,238.96c-5.25-12.57-12.92-24.11-22.63-33.82-8.24-8.24-17.61-14.94-27.77-19.96-2.22-1.1-2.22-4.25,0-5.34,10.16-5.02,19.53-11.72,27.77-19.96,8.17-8.17,14.9-17.64,19.95-27.93,1.09-2.23,4.25-2.23,5.35,0,5.05,10.29,11.78,19.75,19.95,27.93,8.24,8.24,17.61,14.94,27.77,19.96,2.22,1.1,2.22,4.25,0,5.34-10.16,5.02-19.53,11.72-27.77,19.96-9.71,9.71-17.38,21.25-22.63,33.82M182.51,365.02c2.58,0,5.15-.98,7.12-2.95l41.47-41.47c3.3-3.3,3.89-8.42,1.44-12.4-13.04-21.19-10.39-49.37,7.96-67.71,10.72-10.72,24.8-16.08,38.89-16.08,10.01,0,20.02,2.71,28.83,8.13,1.64,1.01,3.47,1.5,5.29,1.5,2.6,0,5.17-1,7.11-2.94l41.47-41.47c3.93-3.93,3.93-10.3,0-14.23l-41.47-41.47c-1.94-1.94-4.51-2.94-7.11-2.94-1.82,0-3.65.49-5.29,1.5-8.8,5.42-18.81,8.13-28.83,8.13-14.08,0-28.17-5.36-38.89-16.08-18.34-18.34-20.99-46.53-7.96-67.71,2.44-3.97,1.85-9.1-1.44-12.4L189.62,2.95c-1.97-1.96-4.54-2.95-7.12-2.95s-5.15.98-7.12,2.95l-41.47,41.47c-3.3,3.3-3.89,8.42-1.44,12.4,13.04,21.19,10.39,49.37-7.96,67.71-10.72,10.72-24.8,16.08-38.89,16.08-10.01,0-20.02-2.71-28.83-8.13-1.64-1.01-3.47-1.5-5.29-1.5-2.6,0-5.17,1-7.11,2.94L2.95,175.39c-3.93,3.93-3.93,10.3,0,14.23l41.47,41.47c1.94,1.94,4.51,2.94,7.11,2.94,1.82,0,3.65-.49,5.29-1.5,8.8-5.42,18.81-8.13,28.83-8.13,14.08,0,28.17,5.36,38.89,16.08,18.34,18.34,20.99,46.53,7.96,67.71-2.44,3.97-1.85,9.1,1.44,12.4l41.47,41.47c1.97,1.96,4.54,2.95,7.12,2.95h0Z"/>
                </svg>
                Holylabs Ltd
              </div>
              <p className="text-white/60 mb-6 leading-relaxed max-w-sm">
                {t('footer.tagline')}
              </p>
              
              {/* UK Mailbox Address */}
              <div className="mb-6">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-2xl">📬</span>
                  <div>
                    <p className="text-white/80 font-medium text-sm">UK Mailbox</p>
                    <p className="text-white/60 text-sm">Holylabs Ltd</p>
                    <p className="text-white/60 text-sm">275 New North Road Islington # 1432</p>
                    <p className="text-white/60 text-sm">London, N1 7AA</p>
                    <p className="text-white/60 text-sm">United Kingdom</p>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/40 transition-colors duration-200"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">{t('footer.company')}</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">{t('footer.legal')}</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>



        {/* Bottom Bar */}
        <div className="border-t border-white/30 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <span>{t('footer.made')}</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{t('footer.status')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};