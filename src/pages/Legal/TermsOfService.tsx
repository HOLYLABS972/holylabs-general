import React from 'react';
import { FileTextIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const TermsOfService: React.FC = () => {
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
            <FileTextIcon className="w-4 h-4 text-[#161e2e] opacity-80" />
            <span className="font-normal text-[#161e2e] text-sm opacity-80">
              Terms of Service
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl text-center bg-gradient-to-t from-black to-black/60 bg-clip-text text-transparent mb-6 leading-tight" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
            Terms of Service
          </h1>
          
          <p className="text-lg text-[#64646e] max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using our services. By using our services, you agree to be bound by these terms.
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
              <h2 className="text-2xl font-semibold text-black mb-4">1. Acceptance of Terms</h2>
              <p className="text-[#64646e] leading-relaxed">
                By accessing and using the services provided by Holy Labs ("we," "us," or "our"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">2. Description of Service</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                Holy Labs provides business automation services including but not limited to:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li>WhatsApp AI chatbot development and implementation</li>
                <li>Order call automation systems</li>
                <li>Lead generation and management tools</li>
                <li>Digital advertising and marketing automation</li>
                <li>Web development and optimization services</li>
                <li>Custom business automation solutions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">3. User Accounts and Registration</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                To access certain features of our services, you may be required to create an account. When creating an account, you agree to:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">4. Acceptable Use Policy</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                You agree not to use our services:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>For any obscene or immoral purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">5. Service Availability</h2>
              <p className="text-[#64646e] leading-relaxed">
                We strive to maintain high service availability, but we do not guarantee that our services will be available at all times. Services may be temporarily unavailable for maintenance, updates, or due to circumstances beyond our control. We reserve the right to suspend or discontinue any part of our services at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">6. Payment Terms</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                Payment terms for our services:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li>All fees are due as specified in your service agreement</li>
                <li>Payments are non-refundable unless specifically stated otherwise</li>
                <li>We reserve the right to suspend services for non-payment</li>
                <li>All prices are subject to change with 30 days notice</li>
                <li>You are responsible for all taxes and fees associated with your use of our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">7. Intellectual Property Rights</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                Our services and their original content, features, and functionality are and will remain the exclusive property of Holy Labs and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
              </p>
              <p className="text-[#64646e] leading-relaxed">
                You retain ownership of any content you provide to us, but grant us a license to use such content as necessary to provide our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">8. Privacy and Data Protection</h2>
              <p className="text-[#64646e] leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices regarding the collection, use, and protection of your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">9. Limitation of Liability</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                To the maximum extent permitted by applicable law, in no event shall Holy Labs, its affiliates, agents, directors, employees, suppliers, or licensors be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses.
              </p>
              <p className="text-[#64646e] leading-relaxed">
                Our total liability to you for all damages, losses, and causes of action shall not exceed the amount paid by you, if any, for accessing our services during the twelve (12) months immediately preceding the date of the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">10. Indemnification</h2>
              <p className="text-[#64646e] leading-relaxed">
                You agree to defend, indemnify, and hold harmless Holy Labs and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">11. Termination</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                We may terminate or suspend your account and bar access to our services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
              <p className="text-[#64646e] leading-relaxed">
                If you wish to terminate your account, you may simply discontinue using our services and contact us to request account deletion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">12. Governing Law</h2>
              <p className="text-[#64646e] leading-relaxed">
                These Terms shall be interpreted and governed by the laws of Canada, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">13. Changes to Terms</h2>
              <p className="text-[#64646e] leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">14. Severability</h2>
              <p className="text-[#64646e] leading-relaxed">
                If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">15. Contact Information</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
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

export default TermsOfService; 