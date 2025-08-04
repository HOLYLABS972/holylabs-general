import React from 'react';
import { RocketIcon, UsersIcon, TrendingUpIcon, HeartIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useLanguage } from '../../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  const values = [
    {
      icon: <RocketIcon className="w-6 h-6" />,
      title: t('about.page.innovation'),
      description: t('about.page.innovationdesc')
    },
    {
      icon: <UsersIcon className="w-6 h-6" />,
      title: t('about.page.customer'),
      description: t('about.page.customerdesc')
    },
    {
      icon: <HeartIcon className="w-6 h-6" />,
      title: t('about.page.transparency'),
      description: t('about.page.transparencydesc')
    },
    {
      icon: <TrendingUpIcon className="w-6 h-6" />,
      title: t('about.page.growth'),
      description: t('about.page.growthdesc')
    }
  ];



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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 mt-20">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#d8dfe5] bg-[rgba(241,242,251,0.9)] shadow-[0px_0px_0px_2px_rgba(241,242,251,0.9)]">
            <UsersIcon className="w-4 h-4 text-[#161e2e] opacity-80" />
            <span className="font-normal text-[#161e2e] text-sm opacity-80">
              {t('about.page.aboutus')}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl text-center whitespace-pre-line mb-6 gradient-text">
            {t('about.page.empowering')}
          </h1>
          
          <p className="text-lg text-[#64646e] max-w-3xl mx-auto leading-relaxed">
            {t('about.page.mission')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-12 mb-16">
          
          {/* Left Column - Story & Mission */}
          <div 
            className="p-8"
            style={{
              
            }}
          >
            <h2 className="text-2xl font-semibold text-black mb-6">{t('about.page.ourstory')}</h2>
            
            <div className="space-y-4 text-[#64646e] leading-relaxed">
              <p>
                {t('about.page.story1')}
              </p>
              
              <p>
                {t('about.page.story2')}
              </p>
              
              <p>
                {t('about.page.story3')}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-black mb-4">{t('about.page.ourmission')}</h3>
              <p className="text-[#64646e] leading-relaxed">
                {t('about.page.missiondesc')}
              </p>
            </div>
          </div>

        </div>

        

        {/* Values Section */}
        <div 
          className="p-8 mb-16 max-w-4xl mx-auto"
          style={{
            backgroundColor: 'rgb(246, 251, 255)',
            borderRadius: '16px',
            boxShadow: 'rgba(16, 49, 77, 0.05) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.06) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.06) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.07) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.1) 0px 30px 30px -1.75px',
            opacity: 1
          }}
        >
          <h2 className="text-2xl font-semibold text-black mb-8 text-center">{t('about.page.ourvalues')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl opacity-100 flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: 'rgb(246, 251, 255)',
                    boxShadow: 'rgba(141, 194, 235, 0.25) 0px -3px 0px 2px inset, rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.2) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.18) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px'
                  }}
                >
                  <div style={{ color: 'rgb(14, 28, 41)' }}>
                    {value.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">{value.title}</h3>
                  <p className="text-[#64646e] leading-relaxed text-sm">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div 
          className="text-center p-12 rounded-2xl max-w-4xl mx-auto"
          style={{
            backgroundColor: 'rgb(246, 251, 255)',
            boxShadow: 'rgba(16, 49, 77, 0.05) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.06) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.06) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.07) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.1) 0px 30px 30px -1.75px'
          }}
        >
          <h3 className="text-2xl font-bold text-black mb-2">
            {t('about.page.transform')}
          </h3>
          
          <p className="text-[#64646e] mb-6 max-w-2xl mx-auto">
            {t('about.page.join')}
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Button variant="cta-primary" size="cta">
              <span className="flex items-center gap-2">
                {t('about.page.startyourjourney')}
                <RocketIcon className="w-4 h-4" />
              </span>
            </Button>
            
            <Button variant="cta-secondary" size="cta">
              <span className="flex items-center gap-2">
                {t('about.page.learnmore')}
                <UsersIcon className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 