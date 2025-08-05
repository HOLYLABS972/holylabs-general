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
  FilterIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SparklesIcon
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useLanguage } from '../../contexts/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFeatures, setExpandedFeatures] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'automation', name: 'Automation' },
    { id: 'communication', name: 'Communication' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'development', name: 'Development' }
  ];

  const services = [
    {
      id: 'whatsapp-ai',
      category: 'communication',
      icon: <MessageSquareIcon className="w-8 h-8" />,
      title: t('services.whatsapp.title'),
      subtitle: t('services.whatsapp.subtitle'),
      description: t('services.whatsapp.detailed'),
      image: "/services/whatsappbot.avif",
      isNew: false,
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
      category: 'automation',
      icon: <PhoneIcon className="w-8 h-8" />,
      title: t('services.calls.title'),
      subtitle: t('services.calls.subtitle'),
      description: t('services.calls.detailed'),
      image: "/services/ordercalls.avif",
      isNew: true,
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
      category: 'automation',
      icon: <BotIcon className="w-8 h-8" />,
      title: t('services.leads.title'),
      subtitle: t('services.leads.subtitle'),
      description: t('services.leads.detailed'),
      image: "/api/placeholder/600/400",
      isNew: false,
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
      category: 'marketing',
      icon: <MegaphoneIcon className="w-8 h-8" />,
      title: t('services.ads.title'),
      subtitle: t('services.ads.subtitle'),
      description: t('services.ads.detailed'),
      image: "/api/placeholder/600/400",
      isNew: false,
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
      category: 'development',
      icon: <GlobeIcon className="w-8 h-8" />,
      title: t('services.web.title'),
      subtitle: t('services.web.subtitle'),
      description: t('services.web.detailed'),
      image: "/api/placeholder/600/400",
      isNew: false,
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

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

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

      

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
        {/* Header Section */}
        <div className="text-center mb-16 mt-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#d8dfe5] bg-[rgba(241,242,251,0.9)] shadow-[0px_0px_0px_2px_rgba(241,242,251,0.9)]">
            <UsersIcon className="w-4 h-4 text-[#161e2e] opacity-80" />
            <span className="font-normal text-[#161e2e] text-sm opacity-80">
              {t('services.page.badge')}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl text-center whitespace-pre-line mb-6 gradient-text">
            {t('services.page.title')}
          </h1>
          
          <p className="text-lg text-[#64646e] max-w-2xl mx-auto leading-relaxed">
            {t('services.page.description')}
          </p>
        </div>

        {/* Category Filter - Inline */}
        <div className="mb-12 max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#d8dfe5] bg-[rgba(241,242,251,0.9)]">
              <FilterIcon className="w-4 h-4 text-[#161e2e] opacity-80" />
              <span className="font-normal text-[#161e2e] text-sm opacity-80">
                Filter Services
              </span>
            </div>
          </div>
          
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
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 cursor-pointer transition-all duration-200`}
                  style={{
                    backgroundColor: selectedCategory === category.id ? 'rgb(216, 223, 229)' : 'rgba(216, 223, 230, 0)',
                    borderRadius: '6px'
                  }}
                >
                  <span className="text-md text-[rgb(14, 28, 41)] whitespace-nowrap">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Category Filter */}
          <div className="md:hidden mb-8">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 text-center font-medium text-[rgb(14, 28, 41)] border-0 focus:outline-none focus:ring-2 focus:ring-[#389CFF] transition-colors appearance-none cursor-pointer"
              style={{
                backgroundColor: 'rgb(246, 251, 255)',
                borderRadius: '12px',
                boxShadow: 'rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px'
              }}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}

              >
                <div 
                  className={`relative p-6 rounded-2xl transition-all duration-300 ${
                    hoveredCard === index ? 'shadow-2xl' : ''
                  }`}
                  style={{
                    backgroundColor: 'rgb(246, 251, 255)',
                    boxShadow: hoveredCard === index 
                      ? 'rgba(16, 49, 77, 0.15) 0px 10px 40px -10px, rgba(16, 49, 77, 0.1) 0px 0px 0px 1px'
                      : 'rgba(16, 49, 77, 0.05) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.06) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.06) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.07) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.1) 0px 30px 30px -1.75px'
                  }}
                >
                  {/* New Badge */}
                  {service.isNew && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#389CFF] to-[#7597B6] text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                      <SparklesIcon className="w-3 h-3" />
                      NEW
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl opacity-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundColor: 'rgb(246, 251, 255)',
                        boxShadow: 'rgba(141, 194, 235, 0.25) 0px -3px 0px 2px inset, rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.2) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.18) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px'
                      }}
                    >
                      <div style={{ color: 'rgb(14, 28, 41)' }}>
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-[#389CFF] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-[#64646e] text-sm mb-4 leading-relaxed">
                      {service.subtitle}
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {service.stats.slice(0, 3).map((stat, statIndex) => (
                        <div key={statIndex} className="text-center">
                          <div className="text-lg font-bold text-[#389CFF]">
                            {stat.value}
                          </div>
                          <div className="text-xs text-[#64646e]">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Expand Features Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedFeatures(expandedFeatures === index ? null : index);
                      }}
                      className="w-full flex items-center justify-center gap-2 text-[#389CFF] text-sm font-medium hover:text-[#7597B6] transition-colors duration-300"
                    >
                      See All Features
                      {expandedFeatures === index ? (
                        <ChevronUpIcon className="w-4 h-4" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4" />
                      )}
                    </button>
                    
                    {/* Expandable Features */}
                    {expandedFeatures === index && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 animate-in slide-in-from-top duration-300 text-left">
                        {service.features.slice(0, 4).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-left">
                            <CheckIcon className="w-3 h-3 text-[#389CFF] flex-shrink-0" />
                            <span className="text-xs text-[#64646e]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* CTA Button */}
                     
                  </div>
                </div>
              </div>
            ))}
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
            <h3 className="text-2xl font-bold text-black mb-2 gradient-text">
              {t('services.cta.ready')}
            </h3>
            
            <p className="text-[#64646e] mb-6 max-w-2xl mx-auto">
              {t('services.cta.join')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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