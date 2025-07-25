import React from 'react';
import { CookieIcon, MailIcon, PhoneIcon, SettingsIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const CookiePolicy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FBFCFF] relative overflow-hidden">
      {/* Grain effect overlay */}
      <div 
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 mt-20">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#d8dfe5] bg-[rgba(241,242,251,0.9)] shadow-[0px_0px_0px_2px_rgba(241,242,251,0.9)]">
            <CookieIcon className="w-4 h-4 text-[#161e2e] opacity-80" />
            <span className="font-normal text-[#161e2e] text-sm opacity-80">
              Cookie Policy
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl text-center bg-gradient-to-t from-black to-black/60 bg-clip-text text-transparent mb-6 leading-tight" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
            Cookie Policy
          </h1>
          
          <p className="text-lg text-[#64646e] max-w-3xl mx-auto leading-relaxed">
            This Cookie Policy explains how Holy Labs uses cookies and similar technologies when you visit our website.
          </p>
          
          <div className="mt-6 text-sm text-[#64646e]">
            <p>Effective Date: July 25, 2025</p>
            <p>Last Updated: July 25, 2025</p>
          </div>
        </div>

        {/* Main Content */}
        <div 
          className="prose prose-lg max-w-none p-8"
          style={{
            backgroundColor: 'rgb(246, 251, 255)',
            borderRadius: '16px',
            boxShadow: 'rgba(16, 49, 77, 0.05) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.06) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.06) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.07) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.1) 0px 30px 30px -1.75px'
          }}
        >
          <div className="space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">1. What Are Cookies?</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
              </p>
              <p className="text-[#64646e] leading-relaxed">
                Cookies allow us to recognize your device and store some information about your preferences or past actions on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">2. How We Use Cookies</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                We use cookies for several purposes:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li>To ensure our website functions properly</li>
                <li>To remember your preferences and settings</li>
                <li>To analyze how visitors use our website</li>
                <li>To improve our services and user experience</li>
                <li>To deliver relevant content and advertisements</li>
                <li>To comply with legal requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">3. Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-[#d8dfe5]">
                  <h3 className="text-xl font-medium text-black mb-3">Essential Cookies</h3>
                  <p className="text-[#64646e] leading-relaxed mb-3">
                    These cookies are necessary for our website to function properly. They enable core functionality such as security, network management, and accessibility.
                  </p>
                  <div className="text-sm text-[#64646e]">
                    <strong>Purpose:</strong> Website functionality, security, load balancing<br/>
                    <strong>Duration:</strong> Session or up to 1 year<br/>
                    <strong>Can be disabled:</strong> No (required for website operation)
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-[#d8dfe5]">
                  <h3 className="text-xl font-medium text-black mb-3">Analytics Cookies</h3>
                  <p className="text-[#64646e] leading-relaxed mb-3">
                    We use analytics cookies to understand how visitors interact with our website. This helps us improve our content and user experience.
                  </p>
                  <div className="text-sm text-[#64646e]">
                    <strong>Purpose:</strong> Website analytics, performance measurement<br/>
                    <strong>Duration:</strong> Up to 2 years<br/>
                    <strong>Third parties:</strong> Google Analytics, Meta Pixel<br/>
                    <strong>Can be disabled:</strong> Yes
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-[#d8dfe5]">
                  <h3 className="text-xl font-medium text-black mb-3">Functional Cookies</h3>
                  <p className="text-[#64646e] leading-relaxed mb-3">
                    These cookies allow us to remember choices you make and provide enhanced, more personal features.
                  </p>
                  <div className="text-sm text-[#64646e]">
                    <strong>Purpose:</strong> Language preferences, user settings<br/>
                    <strong>Duration:</strong> Up to 1 year<br/>
                    <strong>Can be disabled:</strong> Yes (may affect functionality)
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-[#d8dfe5]">
                  <h3 className="text-xl font-medium text-black mb-3">Marketing Cookies</h3>
                  <p className="text-[#64646e] leading-relaxed mb-3">
                    These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.
                  </p>
                  <div className="text-sm text-[#64646e]">
                    <strong>Purpose:</strong> Targeted advertising, remarketing<br/>
                    <strong>Duration:</strong> Up to 2 years<br/>
                    <strong>Third parties:</strong> Facebook, Google Ads<br/>
                    <strong>Can be disabled:</strong> Yes
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">4. Third-Party Cookies</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                We use several third-party services that may set cookies on your device:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
                <li><strong>Meta Pixel (Facebook):</strong> For advertising and analytics purposes</li>
                <li><strong>Google Ads:</strong> To deliver targeted advertisements</li>
                <li><strong>Firebase:</strong> For website functionality and user authentication</li>
              </ul>
              <p className="text-[#64646e] leading-relaxed mt-4">
                These third parties have their own privacy policies and cookie policies. We recommend reviewing their policies to understand how they use cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">5. Managing Your Cookie Preferences</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-3">
                  <SettingsIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Cookie Settings</h3>
                    <p className="text-blue-800 text-sm">
                      You can manage your cookie preferences through your browser settings or by using our cookie consent tool when available.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-medium text-black mb-3">Browser Settings</h3>
              <p className="text-[#64646e] leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2 mb-4">
                <li>View what cookies are stored on your device</li>
                <li>Delete cookies that are already stored</li>
                <li>Block or allow cookies from specific websites</li>
                <li>Block third-party cookies</li>
                <li>Delete all cookies when you close your browser</li>
                <li>Turn off cookies completely</li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">Browser-Specific Instructions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-[#d8dfe5]">
                  <h4 className="font-medium text-black mb-2">Chrome</h4>
                  <p className="text-sm text-[#64646e]">Settings → Privacy and security → Cookies and other site data</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#d8dfe5]">
                  <h4 className="font-medium text-black mb-2">Firefox</h4>
                  <p className="text-sm text-[#64646e]">Options → Privacy & Security → Cookies and Site Data</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#d8dfe5]">
                  <h4 className="font-medium text-black mb-2">Safari</h4>
                  <p className="text-sm text-[#64646e]">Preferences → Privacy → Manage Website Data</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#d8dfe5]">
                  <h4 className="font-medium text-black mb-2">Edge</h4>
                  <p className="text-sm text-[#64646e]">Settings → Site permissions → Cookies and site data</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">6. Impact of Disabling Cookies</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                Please note that if you disable or refuse cookies, some parts of our website may become inaccessible or not function properly. Specifically:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li>Your language preference may not be saved</li>
                <li>Some interactive features may not work</li>
                <li>We won't be able to remember your preferences</li>
                <li>You may need to re-enter information repeatedly</li>
                <li>Analytics and performance improvements may be affected</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">7. Updates to This Policy</h2>
              <p className="text-[#64646e] leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on our website and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">8. Contact Us</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-white p-6 rounded-lg border border-[#d8dfe5]">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MailIcon className="w-5 h-5 text-[#389CFF]" />
                    <span className="text-[#64646e]">support@theholylabs.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="w-5 h-5 text-[#389CFF]" />
                    <span className="text-[#64646e]">+1 (778) 907-7638</span>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy; 