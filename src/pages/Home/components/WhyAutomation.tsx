import React from 'react';
import { ClockIcon, TrendingUpIcon, UsersIcon, DollarSignIcon } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import { useLanguage } from '../../../contexts/LanguageContext';

const WhyAutomation: React.FC = () => {
  const { t } = useLanguage();
  
  const benefits = [
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: t('whyautomation.savetime.title'),
      description: t('whyautomation.savetime.description'),
      stat: t('whyautomation.savetime.stat'),
      color: "text-blue-600"
    },
    {
      icon: <TrendingUpIcon className="w-8 h-8" />,
      title: t('whyautomation.efficiency.title'),
      description: t('whyautomation.efficiency.description'),
      stat: t('whyautomation.efficiency.stat'),
      color: "text-green-600"
    },
    {
      icon: <UsersIcon className="w-8 h-8" />,
      title: t('whyautomation.experience.title'),
      description: t('whyautomation.experience.description'),
      stat: t('whyautomation.experience.stat'),
      color: "text-purple-600"
    },
    {
      icon: <DollarSignIcon className="w-8 h-8" />,
      title: t('whyautomation.costs.title'),
      description: t('whyautomation.costs.description'),
      stat: t('whyautomation.costs.stat'),
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-[#FBFCFF] relative overflow-hidden">
      {/* Grain effect overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full mb-6 border border-white/40">
            <span className="font-medium text-[#4f4f4f] text-sm">{t('whyautomation.badge')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 gradient-text">
            {t('whyautomation.title')}
          </h1>
          <p className="text-lg text-[#64646e] max-w-3xl mx-auto leading-relaxed">
            {t('whyautomation.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:bg-white/60 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <div className={benefit.color}>
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-black mb-3"> 
                  {benefit.title}
                </h3>
                <p className="text-[#64646e] mb-4 leading-relaxed">
                  {benefit.description}
                </p>
                <div className="text-2xl font-bold text-black">
                  {benefit.stat}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAutomation; 