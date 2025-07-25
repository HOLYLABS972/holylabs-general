import React from 'react';
import { ShieldCheckIcon, MailIcon, PhoneIcon, UserCheckIcon, DownloadIcon, TrashIcon, EditIcon, EyeIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const GDPR: React.FC = () => {
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
            <ShieldCheckIcon className="w-4 h-4 text-[#161e2e] opacity-80" />
            <span className="font-normal text-[#161e2e] text-sm opacity-80">
              GDPR Compliance
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl text-center bg-gradient-to-t from-black to-black/60 bg-clip-text text-transparent mb-6 leading-tight" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
            GDPR Compliance
          </h1>
          
          <p className="text-lg text-[#64646e] max-w-3xl mx-auto leading-relaxed">
            Your data protection rights under the General Data Protection Regulation (GDPR) and how Holy Labs ensures compliance.
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
              <h2 className="text-2xl font-semibold text-black mb-4">1. What is GDPR?</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                The General Data Protection Regulation (GDPR) is a European Union regulation that governs how personal data is collected, processed, and stored. It came into effect on May 25, 2018, and applies to all organizations that process personal data of EU residents, regardless of where the organization is located.
              </p>
              <p className="text-[#64646e] leading-relaxed">
                Holy Labs is committed to protecting your privacy and complying with GDPR requirements to ensure your personal data is handled responsibly and transparently.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">2. Your Data Protection Rights</h2>
              <p className="text-[#64646e] leading-relaxed mb-6">
                Under GDPR, you have several rights regarding your personal data. We are committed to facilitating the exercise of these rights:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-[#d8dfe5]">
                  <div className="flex items-start gap-3">
                    <EyeIcon className="w-6 h-6 text-[#389CFF] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-black mb-2">Right to Access</h3>
                      <p className="text-[#64646e] text-sm">
                        You have the right to know what personal data we hold about you and request a copy of this information.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-[#d8dfe5]">
                  <div className="flex items-start gap-3">
                    <EditIcon className="w-6 h-6 text-[#389CFF] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-black mb-2">Right to Rectification</h3>
                      <p className="text-[#64646e] text-sm">
                        You can request that we correct any inaccurate or incomplete personal data we hold about you.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-[#d8dfe5]">
                  <div className="flex items-start gap-3">
                    <TrashIcon className="w-6 h-6 text-[#389CFF] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-black mb-2">Right to Erasure</h3>
                      <p className="text-[#64646e] text-sm">
                        Also known as the "right to be forgotten," you can request that we delete your personal data in certain circumstances.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-[#d8dfe5]">
                  <div className="flex items-start gap-3">
                    <DownloadIcon className="w-6 h-6 text-[#389CFF] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-black mb-2">Right to Data Portability</h3>
                      <p className="text-[#64646e] text-sm">
                        You can request to receive your personal data in a structured, commonly used format.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-[#d8dfe5]">
                  <div className="flex items-start gap-3">
                    <UserCheckIcon className="w-6 h-6 text-[#389CFF] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-black mb-2">Right to Restrict Processing</h3>
                      <p className="text-[#64646e] text-sm">
                        You can request that we limit how we process your personal data in certain situations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-[#d8dfe5]">
                  <div className="flex items-start gap-3">
                    <ShieldCheckIcon className="w-6 h-6 text-[#389CFF] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-black mb-2">Right to Object</h3>
                      <p className="text-[#64646e] text-sm">
                        You can object to certain types of processing, including processing for marketing purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">3. Legal Basis for Processing</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                We only process your personal data when we have a legal basis to do so. The legal bases we rely on include:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li><strong>Consent:</strong> You have given clear consent for us to process your personal data for specific purposes</li>
                <li><strong>Contract:</strong> Processing is necessary for a contract we have with you, or because you have asked us to take specific steps before entering into a contract</li>
                <li><strong>Legal obligation:</strong> Processing is necessary for us to comply with the law</li>
                <li><strong>Legitimate interests:</strong> Processing is necessary for our legitimate interests or the legitimate interests of a third party, unless there is a good reason to protect your personal data which overrides those interests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">4. Data Processing Activities</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                We process personal data for the following purposes:
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-[#d8dfe5]">
                  <h3 className="font-medium text-black mb-2">Service Provision</h3>
                  <p className="text-sm text-[#64646e] mb-2">
                    <strong>Purpose:</strong> Delivering our automation services to clients
                  </p>
                  <p className="text-sm text-[#64646e] mb-2">
                    <strong>Legal Basis:</strong> Contract and legitimate interests
                  </p>
                  <p className="text-sm text-[#64646e]">
                    <strong>Data Categories:</strong> Contact information, service preferences, usage data
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-[#d8dfe5]">
                  <h3 className="font-medium text-black mb-2">Customer Support</h3>
                  <p className="text-sm text-[#64646e] mb-2">
                    <strong>Purpose:</strong> Responding to inquiries and providing support
                  </p>
                  <p className="text-sm text-[#64646e] mb-2">
                    <strong>Legal Basis:</strong> Consent and legitimate interests
                  </p>
                  <p className="text-sm text-[#64646e]">
                    <strong>Data Categories:</strong> Contact information, communication records
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-[#d8dfe5]">
                  <h3 className="font-medium text-black mb-2">Marketing Communications</h3>
                  <p className="text-sm text-[#64646e] mb-2">
                    <strong>Purpose:</strong> Sending newsletters and promotional materials
                  </p>
                  <p className="text-sm text-[#64646e] mb-2">
                    <strong>Legal Basis:</strong> Consent
                  </p>
                  <p className="text-sm text-[#64646e]">
                    <strong>Data Categories:</strong> Email address, communication preferences
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-[#d8dfe5]">
                  <h3 className="font-medium text-black mb-2">Website Analytics</h3>
                  <p className="text-sm text-[#64646e] mb-2">
                    <strong>Purpose:</strong> Understanding website usage and improving user experience
                  </p>
                  <p className="text-sm text-[#64646e] mb-2">
                    <strong>Legal Basis:</strong> Legitimate interests
                  </p>
                  <p className="text-sm text-[#64646e]">
                    <strong>Data Categories:</strong> Usage data, device information, cookies
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">5. Data Retention</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, including:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li><strong>Customer data:</strong> Retained for the duration of the business relationship plus 7 years for legal and tax purposes</li>
                <li><strong>Marketing data:</strong> Retained until consent is withdrawn or for 3 years of inactivity</li>
                <li><strong>Website analytics:</strong> Anonymized after 26 months</li>
                <li><strong>Support tickets:</strong> Retained for 3 years after resolution</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">6. International Data Transfers</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                Your personal data may be transferred to and processed in countries outside the European Economic Area (EEA). When we do this, we ensure adequate protection through:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li>European Commission adequacy decisions</li>
                <li>Standard Contractual Clauses (SCCs)</li>
                <li>Binding Corporate Rules</li>
                <li>Appropriate technical and organizational measures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">7. Data Security Measures</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to ensure data security:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-[#d8dfe5]">
                  <h3 className="font-medium text-black mb-2">Technical Measures</h3>
                  <ul className="text-sm text-[#64646e] space-y-1">
                    <li>• Encryption in transit and at rest</li>
                    <li>• Access controls and authentication</li>
                    <li>• Regular security updates</li>
                    <li>• Secure backup procedures</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#d8dfe5]">
                  <h3 className="font-medium text-black mb-2">Organizational Measures</h3>
                  <ul className="text-sm text-[#64646e] space-y-1">
                    <li>• Staff training on data protection</li>
                    <li>• Data processing agreements</li>
                    <li>• Regular security assessments</li>
                    <li>• Incident response procedures</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">8. How to Exercise Your Rights</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                To exercise any of your data protection rights, please contact us using the information below. We will:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2 mb-6">
                <li>Respond to your request without undue delay and within one month</li>
                <li>Verify your identity before processing your request</li>
                <li>Provide information free of charge (unless requests are excessive)</li>
                <li>Explain any reasons if we cannot fulfill your request</li>
              </ul>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-3">Data Subject Request Form</h3>
                <p className="text-green-800 text-sm mb-3">
                  To make a data protection request, please email us with the following information:
                </p>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Your full name and contact information</li>
                  <li>• Description of your request</li>
                  <li>• Proof of identity (for security purposes)</li>
                  <li>• Any relevant reference numbers or account details</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">9. Complaints and Supervisory Authority</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                If you believe we have not handled your personal data in accordance with GDPR, you have the right to lodge a complaint with a supervisory authority. You can contact:
              </p>
              <ul className="list-disc list-inside text-[#64646e] space-y-2">
                <li>The supervisory authority in your EU country of residence</li>
                <li>The supervisory authority in your place of work</li>
                <li>The supervisory authority where the alleged violation occurred</li>
              </ul>
              <p className="text-[#64646e] leading-relaxed mt-4">
                However, we encourage you to contact us first so we can try to resolve any concerns directly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">10. Updates to GDPR Compliance</h2>
              <p className="text-[#64646e] leading-relaxed">
                We regularly review and update our GDPR compliance measures. Any material changes to how we process your personal data or your rights will be communicated through our website and, where required, through direct communication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">11. Contact Us</h2>
              <p className="text-[#64646e] leading-relaxed mb-4">
                For any questions about GDPR compliance or to exercise your data protection rights, please contact us:
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
                  <div className="mt-4 pt-4 border-t border-[#d8dfe5]">
                    <p className="text-sm text-[#64646e]">
                      <strong>Subject line for GDPR requests:</strong> "GDPR Data Subject Request - [Your Name]"
                    </p>
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

export default GDPR; 