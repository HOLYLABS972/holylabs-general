import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquareIcon, 
  PhoneIcon, 
  BotIcon, 
  MegaphoneIcon, 
  GlobeIcon,
  CheckIcon,
  ArrowRightIcon,
  UsersIcon,
  TrendingUpIcon
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useLanguage } from '../../contexts/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      id: 'whatsapp-ai',
      icon: <MessageSquareIcon className="w-8 h-8" />,
      title: t('services.whatsapp.title'),
      subtitle: t('services.whatsapp.subtitle'),
      description: t('services.whatsapp.detailed'),
      image: "/services/whatsappbot.avif",
      features: [
        t('services.features.nlp'),
        t('services.features.multilang'),
        t('services.features.qualification'),
        t('services.features.booking'),
        t('services.features.faq'),
        t('services.features.sentiment')
      ],
      useCases: [
        {
          industry: t('services.usecase.restaurants'),
          scenario: t('services.scenario.reservations'),
          result: t('services.result.reduction')
        },
        {
          industry: t('services.usecase.healthcare'),
          scenario: t('services.scenario.appointments'),
          result: t('services.result.bookings')
        },
        {
          industry: t('services.usecase.ecommerce'),
          scenario: t('services.scenario.orders'),
          result: t('services.result.satisfaction')
        }
      ],
      pricing: {
        starter: "$99/month",
        professional: "$199/month",
        enterprise: t('services.pricing.custom')
      },
      stats: [
        { label: t('services.stats.response'), value: t('services.value.10sec') },
        { label: t('services.stats.accuracy'), value: t('services.value.95percent') },
        { label: t('services.stats.satisfaction'), value: t('services.value.48of5') }
      ]
    },
    {
      id: 'ai-calls',
      icon: <PhoneIcon className="w-8 h-8" />,
      title: t('services.calls.title'),
      subtitle: t('services.calls.subtitle'),
      description: t('services.calls.detailed'),
      image: "/services/ordercalls.avif",
      features: [
        t('services.features.voice'),
        t('services.features.realtime'),
        t('services.features.crm'),
        t('services.features.recording'),
        t('services.features.multilang'),
        t('services.features.scheduling')
      ],
      useCases: [
        {
          industry: t('services.usecase.medical'),
          scenario: t('services.scenario.confirmations'),
          result: t('services.result.noshows')
        },
        {
          industry: t('services.usecase.automotive'),
          scenario: t('services.scenario.service'),
          result: t('services.result.service')
        },
        {
          industry: t('services.usecase.realestate'),
          scenario: t('services.scenario.property'),
          result: t('services.result.leads')
        }
      ],
      pricing: {
        starter: "$149/month",
        professional: "$299/month",
        enterprise: t('services.pricing.custom')
      },
      stats: [
        { label: t('services.stats.success'), value: t('services.value.92percent') },
        { label: t('services.stats.duration'), value: t('services.value.32min') },
        { label: t('services.stats.conversion'), value: t('services.value.68percent') }
      ]
    },
    {
      id: 'lead-bots',
      icon: <BotIcon className="w-8 h-8" />,
      title: t('services.leads.title'),
      subtitle: t('services.leads.subtitle'),
      description: t('services.leads.detailed'),
      image: "/api/placeholder/600/400",
      features: [
        t('services.features.questionnaires'),
        t('services.features.scoring'),
        t('services.features.behavioral'),
        t('services.features.crm'),
        t('services.features.testing'),
        t('services.features.analytics')
      ],
      useCases: [
        {
          industry: t('services.usecase.software'),
          scenario: t('services.scenario.demos'),
          result: t('services.result.qualified')
        },
        {
          industry: t('services.usecase.insurance'),
          scenario: t('services.scenario.insurance'),
          result: t('services.result.conversion')
        },
        {
          industry: t('services.usecase.financial'),
          scenario: t('services.scenario.loans'),
          result: t('services.result.processing')
        }
      ],
      pricing: {
        starter: "$129/month",
        professional: "$249/month",
        enterprise: t('services.pricing.custom')
      },
      stats: [
        { label: t('services.stats.quality'), value: t('services.value.88percent') },
        { label: t('services.stats.speed'), value: t('services.value.5x') },
        { label: t('services.stats.improvement'), value: t('services.value.plus65') }
      ]
    },
    {
      id: 'ai-ads',
      icon: <MegaphoneIcon className="w-8 h-8" />,
      title: t('services.ads.title'),
      subtitle: t('services.ads.subtitle'),
      description: t('services.ads.detailed'),
      image: "/api/placeholder/600/400",
      features: [
        t('services.features.campaigns'),
        t('services.features.targeting'),
        t('services.features.creative'),
        t('services.features.bidding'),
        t('services.features.tracking'),
        t('services.features.roi')
      ],
      useCases: [
        {
          industry: t('services.usecase.ecommerce'),
          scenario: t('services.scenario.products'),
          result: t('services.result.roas')
        },
        {
          industry: t('services.usecase.local'),
          scenario: t('services.scenario.geo'),
          result: t('services.result.traffic')
        },
        {
          industry: t('services.usecase.saas'),
          scenario: t('services.scenario.multichannel'),
          result: t('services.result.acquisition')
        }
      ],
      pricing: {
        starter: "$199/month",
        professional: "$399/month",
        enterprise: t('services.pricing.custom')
      },
      stats: [
        { label: t('services.stats.roas'), value: t('services.value.plus150') },
        { label: t('services.stats.ctr'), value: t('services.value.32percent') },
        { label: t('services.stats.cost'), value: t('services.value.40percent') }
      ]
    },
    {
      id: 'web-development',
      icon: <GlobeIcon className="w-8 h-8" />,
      title: t('services.web.title'),
      subtitle: t('services.web.subtitle'),
      description: t('services.web.detailed'),
      image: "/api/placeholder/600/400",
      features: [
        t('services.features.development'),
        t('services.features.chatbot'),
        t('services.features.performance'),
        t('services.features.responsive'),
        t('services.features.seo'),
        t('services.features.integration')
      ],
      useCases: [
        {
          industry: t('services.usecase.professional'),
          scenario: t('services.scenario.leadgen'),
          result: t('services.result.inquiries')
        },
        {
          industry: t('services.usecase.retail'),
          scenario: t('services.scenario.recommendations'),
          result: t('services.result.ordervalue')
        },
        {
          industry: t('services.usecase.healthcare'),
          scenario: t('services.scenario.portal'),
          result: t('services.result.appointments')
        }
      ],
      pricing: {
        starter: "$2,999 " + t('services.pricing.onetime'),
        professional: "$4,999 " + t('services.pricing.onetime'),
        enterprise: t('services.pricing.custom')
      },
      stats: [
        { label: t('services.stats.loadspeed'), value: t('services.value.2sec') },
        { label: t('services.stats.mobile'), value: t('services.value.95of100') },
        { label: t('services.stats.conversionrate'), value: t('services.value.plus80') }
      ]
    }
  ];

  const currentService = services[selectedService];

  return (
    <div className="min-h-screen bg-[#FBFCFF] relative overflow-hidden">
      {/* Grain effect overlay */}
      <div 
        className="absolute inset-0 opacity-[0.20] pointer-events-none -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 mt-20">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#d8dfe5] bg-[rgba(241,242,251,0.9)] shadow-[0px_0px_0px_2px_rgba(241,242,251,0.9)]">
            <UsersIcon className="w-4 h-4 text-[#161e2e] opacity-80" />
            <span className="font-normal text-[#161e2e] text-sm opacity-80">
              {t('services.page.badge')}
            </span>
          </div>
          
          <h1 
            className="text-4xl md:text-5xl  whitespace-pre-line bg-gradient-to-t from-black to-black/60 bg-clip-text text-transparent mb-6"
            dangerouslySetInnerHTML={{ __html: t('services.page.title') }}
          />
          
          <p className="text-lg text-[#64646e] max-w-3xl mx-auto leading-relaxed">
            {t('services.page.description')}
          </p>
        </div>

        {/* Service Navigation */}
        <div className="mb-12">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center mb-8">
            <div 
              className="inline-flex p-2 gap-1"
              style={{
                backgroundColor: 'rgb(246, 251, 255)',
                borderRadius: '8px',
                boxShadow: 'rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.2) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.18) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px'
              }}
            >
              {services.map((service, index) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(index)}
                  className={`flex items-center gap-2 px-4 py-3 cursor-pointer transition-all duration-200`}
                  style={{
                    backgroundColor: selectedService === index ? 'rgb(216, 223, 229)' : 'rgba(216, 223, 230, 0)',
                    borderRadius: '6px'
                  }}
                >
                  <span className="font-medium text-sm text-[rgb(14, 28, 41)] whitespace-nowrap">
                    {service.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation - Dropdown */}
          <div className="md:hidden mb-8">
            <div className="relative">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(parseInt(e.target.value))}
                className="w-full px-4 py-3 text-center font-medium text-[rgb(14, 28, 41)] border-0 focus:outline-none focus:ring-2 focus:ring-[#389CFF] transition-colors appearance-none cursor-pointer"
                style={{
                  backgroundColor: 'rgb(246, 251, 255)',
                  borderRadius: '12px',
                  boxShadow: 'rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.2) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.18) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px'
                }}
              >
                {services.map((service, index) => (
                  <option key={service.id} value={index}>
                    {service.title}
                  </option>
                ))}
              </select>
              
              {/* Custom dropdown arrow */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-[rgb(14, 28, 41)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Navigation - Card Grid Alternative */}
          <div className="md:hidden mb-8 hidden">
            <div className="grid grid-cols-1 gap-3">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(index)}
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    selectedService === index ? 'ring-2 ring-[#389CFF]' : ''
                  }`}
                  style={{
                    backgroundColor: selectedService === index ? 'rgb(216, 223, 229)' : 'rgb(246, 251, 255)',
                    borderRadius: '12px',
                    boxShadow: 'rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.2) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.18) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: selectedService === index ? 'rgb(246, 251, 255)' : 'rgb(216, 223, 229)',
                        color: 'rgb(14, 28, 41)'
                      }}
                    >
                      {React.cloneElement(service.icon, { className: "w-5 h-5" })}
                    </div>
                    <div>
                      <h3 className="font-medium text-[rgb(14, 28, 41)] text-sm">{service.title}</h3>
                      <p className="text-[#64646e] text-xs">{service.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

                         {/* Selected Service Details */}
        <div 
          className="max-w-4xl mx-auto mb-16 p-8"
          style={{
            backgroundColor: 'rgb(246, 251, 255)',
            borderRadius: '16px',
            boxShadow: 'rgba(16, 49, 77, 0.05) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.06) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.06) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.07) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.1) 0px 30px 30px -1.75px',
            opacity: 1
          }}
        >
          {/* Service Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl opacity-100 flex items-center justify-center"
                style={{
                  backgroundColor: 'rgb(246, 251, 255)',
                  boxShadow: 'rgba(141, 194, 235, 0.25) 0px -3px 0px 2px inset, rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.2) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.18) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px'
                }}
              >
                <div style={{ color: 'rgb(14, 28, 41)' }}>
                  {currentService.icon}
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl text-center tracking-[-2.60px] leading-[71.5px] whitespace-pre-line bg-gradient-to-t from-black to-black/60 bg-clip-text text-transparent mb-4">
              {currentService.title}
            </h2>
            
            <p className="text-lg text-[#64646e] font-medium mb-6">
              {currentService.subtitle}
            </p>
            
            <p className="text-lg text-[#64646e] leading-relaxed max-w-3xl mx-auto">
              {currentService.description}
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-12">
            <Link to="/contact">
              <Button variant="cta-primary" size="cta">
                <span className="flex items-center gap-2">
                  {t('services.cta.schedule')}
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Use Cases */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-black mb-6 text-center">Real-World Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentService.useCases.map((useCase, index) => (
                <div key={index} className="text-center">
                  {/* Industry & Scenario */}
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <UsersIcon className="w-5 h-5 text-[#389CFF]" />
                      <span className="font-semibold text-black">{useCase.industry}</span>
                    </div>
                    <p className="text-[#64646e] leading-relaxed text-sm">
                      {useCase.scenario}
                    </p>
                  </div>
                  
                  {/* Results */}
                  <div 
                    className="p-4"
                    style={{
                      backgroundColor: 'rgb(246, 251, 255)', borderRadius: '0px',
                      borderTop: '1px solid #d8dfe5'
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <TrendingUpIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        {useCase.result}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-2xl font-semibold text-black mb-6 text-center">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {currentService.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#389CFF]/10 flex items-center justify-center flex-shrink-0">
                    <CheckIcon className="w-3 h-3 text-[#389CFF]" />
                  </div>
                  <span className="text-[#64646e]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div 
          className="text-center p-12 rounded-2xl max-w-4xl mx-auto"
          style={{
            backgroundColor: 'rgb(246, 251, 255)',
            boxShadow: 'rgba(16, 49, 77, 0.05) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.06) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.06) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.07) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.1) 0px 30px 30px -1.75px'
          }}
        >
         
          
          <h3 className="text-2xl font-bold text-black mb-2">
            {t('services.cta.ready')}
          </h3>
          
          <p className="text-[#64646e] mb-6 max-w-2xl mx-auto">
            {t('services.cta.join')}
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Link to="/contact">
              <Button variant="cta-primary" size="cta">
                <span className="flex items-center gap-2">
                  {t('services.cta.schedule')}
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </Button>
            </Link>
            
            <Link to="/about">
              <Button variant="cta-secondary" size="cta">
                <span className="flex items-center gap-2">
                  {t('services.cta.learnmore')}
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 