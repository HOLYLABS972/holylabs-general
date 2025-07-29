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
                <img src="/logo.svg" alt="HOLYLABS" className="w-10 h-10 me-2 brightness-0 invert" />
                HOLYLABS
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