import React from 'react';
import { UsersIcon } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const SocialProof: React.FC = () => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Mediagate CEO",
      text: t('testimonial.ron.text'),
      image: "/services/Testimonial.png"
    },
    {
      name: "Michael Chen",
      company: "Dominos CTO", 
      text: t('testimonial.tamar.text'),
      image: "/services/Testimonial3.png"
    },
    {
      name: "David Rodriguez",
      company: "Smartcom CEO",
      text: t('testimonial.erez.text'),
      image: "/services/Testimonial2.png"
    }
  ];

  const partners = [
    { name: "Google", logo: "/api/placeholder/120/60" },
    { name: "Microsoft", logo: "/api/placeholder/120/60" },
    { name: "Slack", logo: "/api/placeholder/120/60" },
    { name: "Zapier", logo: "/api/placeholder/120/60" },
    { name: "OpenAI", logo: "/api/placeholder/120/60" }
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#d8dfe5] bg-[rgba(241,242,251,0.9)] shadow-[0px_0px_0px_2px_rgba(241,242,251,0.9)]">
            <UsersIcon className="w-4 h-4 text-[#161e2e] opacity-80" />
            <span className="font-normal text-[#161e2e] text-sm opacity-80">
              {t('social.badge')}
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl text-center tracking-[-2.60px] leading-[71.5px] whitespace-pre-line bg-gradient-to-t from-black to-black/60 bg-clip-text text-transparent"
            dangerouslySetInnerHTML={{ __html: t('social.title') }}
          />
          <p className="text-lg text-[#64646e] max-w-3xl mx-auto leading-relaxed">
            {t('social.description')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'rgb(246, 251, 255)',
                boxShadow: 'rgba(16, 49, 77, 0.055) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.055) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.063) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.075) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.098) 0px 30px 30px -1.75px'
              }}
            >
              {/* Testimonial Text */}
              <div className="mb-6">
                <p className="text-[#64646e] leading-relaxed text-left">
                  {testimonial.text}
                </p>
              </div>

              {/* Profile Section */}
              <div className="flex items-center gap-4">
                {/* Profile Image */}
                <div 
                  className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                  style={{
                    borderRadius: '12%',
                    boxShadow: 'rgba(16, 49, 77, 0.208) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.204) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.196) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.184) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.157) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px'
                  }}
                >
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dotted Separator */}
                <div 
                  className="h-8 flex-shrink-0"
                  style={{
                    width: '3px',
                    borderLeft: '3px dotted rgba(94, 120, 143, 0.5)'
                  }}
                />

                {/* Name and Company */}
                <div className="flex-1">
                  <div className="font-medium text-[#64646e] text-left text-sm">
                    {testimonial.name}
                  </div>
                  {testimonial.company && (
                    <div className="text-[#64646e] text-xs opacity-80 text-left">
                      {testimonial.company}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section - Trusted by with avatars */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mt-6">
                         {/* Avatar Stack */}
             <div className="flex -space-x-2">
               {[
                 '/services/Testimonial.png',
                 '/services/Testimonial4.png',
                 '/services/Testimonial3.png',
                 '/services/Testimonial2.png'
               ].map((image, i) => (
                 <div 
                   key={i}
                   className="w-7 h-7 rounded-full border-2 border-white overflow-hidden"
                   style={{
                     backgroundImage: `url('${image}')`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center'
                   }}
                 />
               ))}
             </div>
            
            {/* Text */}
            <div className="text-left">
              <div className="text-[#64646e] text-sm">{t('social.trusted')} {t('social.innovators')}</div>
    
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof; 