import React from 'react';
import { ShieldIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const PrivacyPolicy: React.FC = () => {
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
            <ShieldIcon className="w-4 h-4 text-[#161e2e] opacity-80" />
            <span className="font-normal text-[#161e2e] text-sm opacity-80">
              Privacy Policy
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl text-center bg-gradient-to-t from-black to-black/60 bg-clip-text text-transparent mb-6 leading-tight" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
            Privacy Policy
          </h1>
          
          <p className="text-lg text-[#64646e] max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
              <h2 className="text-2xl font-semibold text-black mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-black mb-3">Personal Information</h3>
              <p className="text-[#64646e] leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2 mb-6">
                <li>Contact us through our website forms</li>
                <li>Subscribe to our newsletter</li>
                <li>Request our services</li>
                <li>Communicate with us via email, phone, or messaging platforms</li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">Automatically Collected Information</h3>
              <p className="text-[#64646e] leading-relaxed mb-4">
                We automatically collect certain information when you visit our website:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referral sources</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">2. How We Use Your Information</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li>Provide and improve our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send you updates and marketing communications (with your consent)</li>
                <li>Analyze website usage and optimize user experience</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraud and security threats</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">3. Information Sharing</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li>With your explicit consent</li>
                <li>With service providers who assist us in operating our business</li>
                <li>To comply with legal requirements or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>In connection with a business transaction (merger, acquisition, etc.)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">4. Data Security</h2>
              <p className="text-[#64646e] leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">5. Your Rights</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate information</li>
                <li>Right to delete your personal data</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">6. Cookies</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience. Types of cookies we use:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li><strong>Essential cookies:</strong> Required for basic website functionality</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
              <p className="text-[#64646e] leading-relaxed mt-4">
                You can control cookies through your browser settings, but disabling certain cookies may affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">7. International Data Transfers</h2>
              <p className="text-[#64646e] leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">8. Children's Privacy</h2>
              <p className="text-[#64646e] leading-relaxed">
                Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected such information, we will take steps to delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">9. Changes to This Policy</h2>
              <p className="text-[#64646e] leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">10. Contact Us</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
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

export default PrivacyPolicy; 