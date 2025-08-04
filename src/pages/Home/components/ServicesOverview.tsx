import React from 'react';
import { BotIcon, PhoneIcon, CalendarIcon, MessageSquareIcon, UsersIcon, LinkIcon, TrendingUpIcon, MegaphoneIcon, GlobeIcon } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const ServicesOverview: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <MessageSquareIcon className="w-6 h-6" />,
      title: t('services.whatsapp.title'),
      description: t('services.whatsapp.description'),
      color: "text-[#389CFF]"
    },
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: t('services.calls.title'),
      description: t('services.calls.description'),
      color: "text-[#389CFF]"
    },
    {
      icon: <CalendarIcon className="w-6 h-6" />,
      title: t('services.booking.title'),
      description: t('services.booking.description'),
      color: "text-[#389CFF]"
    },
    {
      icon: <BotIcon className="w-6 h-6" />,
      title: t('services.leads.title'),
      description: t('services.leads.description'),
      color: "text-[#389CFF]"
    },
    {
      icon: <MegaphoneIcon className="w-6 h-6" />,
      title: t('services.ads.title'),
      description: t('services.ads.description'),
      color: "text-[#389CFF]"
    },
    {
      icon: <GlobeIcon className="w-6 h-6" />,
      title: t('services.web.title'),
      description: t('services.web.description'),
      color: "text-[#389CFF]"
    }
  ];

  const benefits = [
    {
      icon: <UsersIcon className="w-6 h-6" />,
      title: t('services.benefits.collaboration')
    },
    {
      icon: <LinkIcon className="w-6 h-6" />,
      title: t('services.benefits.integration')
    },
    {
      icon: <TrendingUpIcon className="w-6 h-6" />,
      title: t('services.benefits.scalable')
    }
  ];

  return (
    <section className="py-20 bg-[#FBFCFF] relative overflow-hidden">
      {/* Grain effect overlay */}
      <div 
        className="absolute inset-0 opacity-[0.20] pointer-events-none -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#d8dfe5] bg-[rgba(241,242,251,0.9)] shadow-[0px_0px_0px_2px_rgba(241,242,251,0.9)]">
            <BotIcon className="w-4 h-4 text-[#161e2e] opacity-80" />
            <span className="font-normal text-[#161e2e] text-sm opacity-80">
              {t('services.badge')}
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl text-center whitespace-pre-line text-black">
            {t('services.title')}
          </h2>
          
          {/* Description */}
          <p className="text-lg text-[#64646e] max-w-3xl mx-auto leading-relaxed">
            {t('services.description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          {/* First Row - 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {services.slice(0, 3).map((service, index) => (
              <div 
                key={index}
                className="w-full opacity-100"
                style={{ willChange: 'transform', transform: 'none' }}
              >
                <div 
                  className="rounded-2xl w-full opacity-100 "
                  style={{
                    backgroundColor: 'rgb(246, 251, 255)',
                    boxShadow: 'rgba(16, 49, 77, 0.05) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.06) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.06) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.07) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.1) 0px 30px 30px -1.75px'
                  }}
                >
                  <div className="p-6 opacity-100">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 opacity-100"
                      style={{
                        backgroundColor: 'rgb(246, 251, 255)',
                        boxShadow: 'rgba(141, 194, 235, 0.25) 0px -3px 0px 2px inset, rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.2) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.18) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px'
                      }}
                    >
                      <div style={{ color: 'rgb(14, 28, 41)' }}>
                        {service.icon}
                      </div>
                    </div>
                    <div className="flex flex-col justify-start flex-shrink-0 mb-3">
                      <h4 className="text-xl font-semibold text-black">
                        {service.title}
                      </h4>
                    </div>
                    <div 
                      className="flex flex-col justify-start flex-shrink-0"
                      style={{ opacity: 0.8 }}
                    >
                      <p className="text-[#64646e] leading-relaxed text-left">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row - 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(3, 6).map((service, index) => (
              <div 
                key={index + 3}
                className="w-full opacity-100"
                style={{ willChange: 'transform', transform: 'none' }}
              >
                <div 
                  className="rounded-2xl w-full opacity-100 "
                  style={{
                    backgroundColor: 'rgb(246, 251, 255)',
                    boxShadow: 'rgba(16, 49, 77, 0.05) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.06) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.06) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.07) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.1) 0px 30px 30px -1.75px'
                  }}
                >
                  <div className="p-6 opacity-100">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 opacity-100"
                      style={{
                        backgroundColor: 'rgb(246, 251, 255)',
                        boxShadow: 'rgba(141, 194, 235, 0.25) 0px -3px 0px 2px inset, rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.2) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.18) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px'
                      }}
                    >
                      <div style={{ color: 'rgb(14, 28, 41)' }}>
                        {service.icon}
                      </div>
                    </div>
                    <div className="flex flex-col justify-start flex-shrink-0 mb-3">
                      <h4 className="text-xl font-semibold text-black">
                        {service.title}
                      </h4>
                    </div>
                    <div 
                      className="flex flex-col justify-start flex-shrink-0"
                      style={{ opacity: 0.8 }}
                    >
                      <p className="text-[#64646e] leading-relaxed text-left">
                        {service.description} 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-16">
          {benefits.map((benefit, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <>
                  {/* Mobile separator - horizontal line */}
                  <div 
                    className="sm:hidden w-16 h-px opacity-20"
                    style={{ backgroundColor: 'rgb(216, 223, 229)' }}
                  />
                  {/* Desktop separator - vertical line */}
                  <div 
                    className="hidden sm:block w-px h-8 opacity-20"
                    style={{ backgroundColor: 'rgb(216, 223, 229)' }}
                  />
                </>
              )}
              <div className="flex items-center gap-3 opacity-100 text-center sm:text-left">
                <div style={{ color: 'rgb(14, 28, 41)' }}>
                  {benefit.icon}
                </div>
                <div 
                  className="flex flex-col justify-start flex-shrink-0"
                  style={{ opacity: 0.8 }}
                >
                  <p className="text-[#64646e] font-medium whitespace-nowrap">
                    {benefit.title}
                  </p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview; 