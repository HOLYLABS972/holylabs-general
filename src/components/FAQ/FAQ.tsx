import React, { useState } from "react";
import { BotIcon, ChevronDownIcon, ChevronUpIcon, HelpCircleIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useLanguage } from "../../contexts/LanguageContext";

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ = (): JSX.Element => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const faqData: FAQItem[] = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1')
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2')
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3')
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4')
    },
    {
      question: t('faq.q5'),
      answer: t('faq.a5')
    },
    {
      question: t('faq.q6'),
      answer: t('faq.a6')
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#FBFCFF] relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.20] pointer-events-none -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#d8dfe5] bg-[rgba(241,242,251,0.9)] shadow-[0px_0px_0px_2px_rgba(241,242,251,0.9)]">
            <HelpCircleIcon className="w-4 h-4 text-[#161e2e] opacity-80" />
            <span className="font-normal text-[#161e2e] text-sm opacity-80">
              Frequently Asked Questions
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl text-center tracking-[-2.60px] leading-[71.5px] whitespace-pre-line bg-gradient-to-t from-black to-black/60 bg-clip-text text-transparent"
            dangerouslySetInnerHTML={{ __html: t('faq.title') }}
          />
          <p className="text-lg text-[#64646e] max-w-2xl mx-auto leading-relaxed">
            {t('faq.description')}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <Card 
              key={index} 
              className="bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md hover:bg-white/60"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/20 transition-colors duration-200"
                >
                  <span className="font-semibold text-black text-lg pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUpIcon className="w-5 h-5 text-[#64646e]" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-[#64646e]" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <div className="pt-2 border-t border-white/20">
                      <p className="text-[#64646e] leading-relaxed mt-3">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-[#64646e] mb-4">
            {t('faq.contact')}
          </p>
          <a 
            href="mailto:support@theholylabs.com"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            {t('faq.contact.cta')}
          </a>
        </div>
      </div>
    </section>
  );
};