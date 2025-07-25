import React from 'react';
import { SearchIcon, BarChart3Icon, TrendingUpIcon } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const ComprehensiveInsights: React.FC = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <TrendingUpIcon className="w-6 h-6" style={{ color: '#389CFF' }} />,
      title: t('insights.realtime.title'),
      description: t('insights.realtime.description'),
      image: "/services/Cartoon1.png"
    },
    {
      icon: <BarChart3Icon className="w-6 h-6" style={{ color: '#389CFF' }} />,
      title: t('insights.actionable.title'),
      description: t('insights.actionable.description'),
      image: "/services/Cartoon2.png"
    }
  ];

  const featureTags1 = [
    t('insights.tags.retention'),
    t('insights.tags.integrations'),
    t('insights.tags.reports'),
    t('insights.tags.engagement')
  ];

  const featureTags2 = [
    t('insights.tags.costeffective'),
    t('insights.tags.smartspending'),
    t('insights.tags.datadriven'),
    t('insights.tags.efficiency')
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
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#d8dfe5] bg-[rgba(241,242,251,0.9)] shadow-[0px_0px_0px_2px_rgba(241,242,251,0.9)]">
            <SearchIcon className="w-4 h-4 text-[#161e2e] opacity-80" />
            <span className="font-normal text-[#161e2e] text-sm opacity-80">
              {t('insights.badge')}
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl text-center tracking-[-2.60px] leading-[71.5px] whitespace-pre-line bg-gradient-to-t from-black to-black/60 bg-clip-text text-transparent"
            dangerouslySetInnerHTML={{ __html: t('insights.title') }}
          />
          <p className="text-lg text-[#64646e] max-w-3xl mx-auto leading-relaxed">
            {t('insights.description')}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="rounded-2xl p-8"
              style={{
                backgroundColor: 'rgb(246, 251, 255)',
                boxShadow: 'rgba(16, 49, 77, 0.05) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.06) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.06) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.07) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.1) 0px 30px 30px -1.75px'
              }}
            >
              {/* Feature Image */}
              <div 
                className="rounded-2xl mb-6 h-48 overflow-hidden"
                style={{
                  boxShadow: 'rgba(16, 49, 77, 0.05) 0px 0.597144px 0.597144px -0.4375px, rgba(16, 49, 77, 0.06) 0px 1.81088px 1.81088px -0.875px, rgba(16, 49, 77, 0.07) 0px 4.78699px 4.78699px -1.3125px, rgba(16, 49, 77, 0.1) 0px 15px 15px -1.75px'
                }}
              >
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div>
                {/* Icon and Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-black">
                    {feature.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-[#64646e] leading-relaxed opacity-80">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scrolling Feature Tags */}
        <div className="space-y-4">
          {/* First Row - Left to Right */}
          <div 
            className="overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)'
            }}
          >
            <div 
              className="flex justify-center"
              style={{
                gap: '60px',
                animation: 'marquee-left 30s linear infinite',
                width: '200%'
              }}
            >
              {/* Double the tags for seamless scrolling */}
              {[...featureTags1, ...featureTags1, ...featureTags1, ...featureTags1].map((tag, index) => (
                <div 
                  key={`tag1-${index}`}
                  className="flex-shrink-0 px-6 py-3 rounded-full whitespace-nowrap"
                  style={{
                    backgroundColor: 'rgb(216, 223, 229)',
                    borderRadius: '228px'
                  }}
                >
                  <span className="text-[#64646e] text-sm font-medium">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Right to Left */}
          <div 
            className="overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)'
            }}
          >
            <div 
              className="flex justify-center"
              style={{
                gap: '60px',
                animation: 'marquee-right 30s linear infinite',
                width: '200%'
              }}
            >
              {/* Double the tags for seamless scrolling */}
              {[...featureTags2, ...featureTags2, ...featureTags2, ...featureTags2].map((tag, index) => (
                <div 
                  key={`tag2-${index}`}
                  className="flex-shrink-0 px-6 py-3 rounded-full whitespace-nowrap"
                  style={{
                    backgroundColor: 'rgb(216, 223, 229)',
                    borderRadius: '228px'
                  }}
                >
                  <span className="text-[#64646e] text-sm font-medium">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Cloud Element */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-70 pointer-events-none hidden lg:block"
        style={{
          width: '400px',
          height: '260px',
          backgroundImage: 'url("/api/placeholder/617/400")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />


    </section>
  );
};

export default ComprehensiveInsights; 