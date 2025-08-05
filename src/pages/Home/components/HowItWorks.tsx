import React from 'react';
import { MessageCircleIcon, PhoneIcon, CalendarIcon, BotIcon, WebhookIcon, EarthIcon, RocketIcon } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const HowItWorks: React.FC = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he';
  
  const leftIcons = [
    { icon: <MessageCircleIcon className="w-6 h-6" />, position: 'top' },
    { icon: <EarthIcon className="w-6 h-6" />, position: 'middle' },
    { icon: <WebhookIcon className="w-6 h-6" />, position: 'bottom' }
  ];

  const rightIcons = [
    { icon: <PhoneIcon className="w-6 h-6" />, position: 'top' },
    { icon: <CalendarIcon className="w-6 h-6" />, position: 'middle' },
    { icon: <BotIcon className="w-6 h-6" />, position: 'bottom' }
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
            <RocketIcon className="w-4 h-4 text-[#161e2e] opacity-80" />
            <span className="font-normal text-[#161e2e] text-sm opacity-80">
              {t('howitworks.badge')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl text-center whitespace-pre-line mb-6 gradient-text">
            {t('howitworks.title')}
          </h1>
          <p className="text-lg text-[#64646e] max-w-3xl mx-auto leading-relaxed">
            {t('howitworks.description')}
          </p>
        </div>

        {/* Icon Flow Diagram */}
        <div className="relative max-w-3xl mx-auto h-96 hidden md:block">
          {/* Dotted Connection Lines - Behind icons */}
          <svg 
            className="absolute top-0 start-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
            viewBox="0 0 768 384"
          >
            {isRTL ? (
              // RTL SVG paths - mirrored
              <>
                {/* Right Top to Center (MessageCircle to Logo) */}
                <path
                  d="M 768 64 L 646 64 C 638 64 631 71 631 79 L 631 152 C 631 160 624 167 616 167 L 493 167 C 485 167 478 174 478 182 L 478 192 L 408 192"
                  fill="transparent"
                  stroke="rgb(45,106,119)"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  strokeMiterlimit="10"
                  opacity="0.6"
                />
                {/* Right Center to Center (Settings to Logo) */}
                <path
                  d="M 768 192 L 408 192"
                  fill="transparent"
                  stroke="rgb(45,106,119)"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  strokeMiterlimit="10"
                  opacity="0.6"
                />
                {/* Right Bottom to Center (Rocket to Logo) */}
                <path
                  d="M 768 320 L 646 320 C 638 320 631 313 631 305 L 631 232 C 631 224 624 217 616 217 L 493 217 C 485 217 478 210 478 202 L 478 192 L 408 192"
                  fill="transparent"
                  stroke="rgb(45,106,119)"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  strokeMiterlimit="10"
                  opacity="0.6"
                />
                {/* Left Top to Center (Phone to Logo) */}
                <path
                  d="M 0 64 L 122 64 C 130 64 137 71 137 79 L 137 152 C 137 160 144 167 152 167 L 275 167 C 283 167 290 174 290 182 L 290 192 L 360 192"
                  fill="transparent"
                  stroke="rgb(45,106,119)"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  strokeMiterlimit="10"
                  opacity="0.6"
                />
                {/* Left Center to Center (Calendar to Logo) */}
                <path
                  d="M 0 192 L 360 192"
                  fill="transparent"
                  stroke="rgb(45,106,119)"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  strokeMiterlimit="10"
                  opacity="0.6"
                />
                {/* Left Bottom to Center (Bot to Logo) */}
                <path
                  d="M 0 320 L 122 320 C 130 320 137 313 137 305 L 137 232 C 137 224 144 217 152 217 L 275 217 C 283 217 290 210 290 202 L 290 192 L 360 192"
                  fill="transparent"
                  stroke="rgb(45,106,119)"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  strokeMiterlimit="10"
                  opacity="0.6"
                />
              </>
            ) : (
              // LTR SVG paths - original
              <>
                {/* Left Top to Center (MessageCircle to Logo) */}
                <path
                  d="M 0 64 L 122 64 C 130 64 137 71 137 79 L 137 152 C 137 160 144 167 152 167 L 275 167 C 283 167 290 174 290 182 L 290 192 L 360 192"
                  fill="transparent"
                  stroke="rgb(45,106,119)"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  strokeMiterlimit="10"
                  opacity="0.6"
                />
                {/* Left Center to Center (Settings to Logo) */}
                <path
                  d="M 0 192 L 360 192"
                  fill="transparent"
                  stroke="rgb(45,106,119)"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  strokeMiterlimit="10"
                  opacity="0.6"
                />
                {/* Left Bottom to Center (Rocket to Logo) */}
                <path
                  d="M 0 320 L 122 320 C 130 320 137 313 137 305 L 137 232 C 137 224 144 217 152 217 L 275 217 C 283 217 290 210 290 202 L 290 192 L 360 192"
                  fill="transparent"
                  stroke="rgb(45,106,119)"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  strokeMiterlimit="10"
                  opacity="0.6"
                />
                {/* Right Top to Center (Phone to Logo) */}
                <path
                  d="M 768 64 L 646 64 C 638 64 631 71 631 79 L 631 152 C 631 160 624 167 616 167 L 493 167 C 485 167 478 174 478 182 L 478 192 L 408 192"
                  fill="transparent"
                  stroke="rgb(45,106,119)"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  strokeMiterlimit="10"
                  opacity="0.6"
                />
                {/* Right Center to Center (Calendar to Logo) */}
                <path
                  d="M 768 192 L 408 192"
                  fill="transparent"
                  stroke="rgb(45,106,119)"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  strokeMiterlimit="10"
                  opacity="0.6"
                />
                {/* Right Bottom to Center (Bot to Logo) */}
                <path
                  d="M 768 320 L 646 320 C 638 320 631 313 631 305 L 631 232 C 631 224 624 217 616 217 L 493 217 C 485 217 478 210 478 202 L 478 192 L 408 192"
                  fill="transparent"
                  stroke="rgb(45,106,119)"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  strokeMiterlimit="10"
                  opacity="0.6"
                />
              </>
            )}
          </svg>

          {/* Left Icons Column */}
          <div className={`absolute ${isRTL ? 'end-16' : 'start-0'}`} style={{ zIndex: 2 }}>
            {(isRTL ? rightIcons : leftIcons).map((item, index) => {
              const yPositions = [64, 192, 320]; // Match SVG coordinates
              return (
                <div 
                  key={`left-${index}`}
                  className="w-16 h-16 rounded-2xl opacity-100 flex items-center justify-center absolute"
                  style={{
                    top: `${yPositions[index] - 32}px`, // Subtract half the icon height (32px) to center
                    backgroundColor: 'rgb(246, 251, 255)',
                    boxShadow: 'rgba(141, 194, 235, 0.25) 0px -3px 0px 2px inset, rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.2) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.18) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ borderRadius: '72px' }}
                  >
                    <div style={{ color: 'rgb(14, 28, 41)' }}>
                      {item.icon}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Icons Column */}
          <div className={`absolute ${isRTL ? 'start-0' : 'end-16'}`} style={{ zIndex: 2 }}>
            {(isRTL ? leftIcons : rightIcons).map((item, index) => {
              const yPositions = [64, 192, 320]; // Match SVG coordinates
              return (
                <div 
                  key={`right-${index}`}
                  className="w-16 h-16 rounded-2xl opacity-100 flex items-center justify-center absolute"
                  style={{
                    top: `${yPositions[index] - 32}px`, // Subtract half the icon height (32px) to center
                    backgroundColor: 'rgb(246, 251, 255)',
                    boxShadow: 'rgba(141, 194, 235, 0.25) 0px -3px 0px 2px inset, rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.2) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.18) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ borderRadius: '72px' }}
                  >
                    <div style={{ color: 'rgb(14, 28, 41)' }}>
                      {item.icon}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Central Logo */}
          <div 
            className="absolute rounded-2xl opacity-100 flex items-center justify-center"
            style={{
              top: `${192 - 40}px`, // Center at Y=192, subtract half height (40px)
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '80px',
              backgroundColor: 'rgb(246, 251, 255)',
              boxShadow: 'rgba(141, 194, 235, 0.25) 0px -3px 0px 2px inset, rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.2) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.18) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px',
              zIndex: 3
            }}
          >
            <div 
              className="w-11 h-11 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: 'rgb(14, 28, 41)',
                borderRadius: '10px',
                boxShadow: 'rgba(16, 49, 77, 0.24) 0px 0.706592px 0.706592px -0.666667px, rgba(16, 49, 77, 0.23) 0px 1.80656px 1.80656px -1.33333px, rgba(16, 49, 77, 0.22) 0px 3.62176px 3.62176px -2px, rgba(16, 49, 77, 0.2) 0px 6.8656px 6.8656px -2.66667px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -3.33333px, rgba(16, 49, 77, 0.06) 0px 30px 30px -4px'
              }}
            >
              <img 
                src="/logo.svg" 
                alt="Logo" 
                className="w-8 h-8 object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Fallback - Vertical Flow with Central Logo */}
        <div className="md:hidden">
          {/* Top Row - First 3 icons */}
          <div className={`grid grid-cols-3 gap-6 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {(isRTL ? [...rightIcons, ...leftIcons] : [...leftIcons, ...rightIcons]).slice(0, 3).map((item, index) => (
              <div 
                key={`mobile-top-${index}`}
                className="w-16 h-16 rounded-2xl opacity-100 flex items-center justify-center mx-auto"
                style={{
                  backgroundColor: 'rgb(246, 251, 255)',
                  boxShadow: 'rgba(141, 194, 235, 0.25) 0px -3px 0px 2px inset, rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.2) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.18) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ borderRadius: '72px' }}
                >
                  <div style={{ color: 'rgb(14, 28, 41)' }}>
                    {item.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Connecting Lines */}
          <div className="flex flex-col items-center mb-8">
            {/* Top connecting lines */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-[rgb(45,106,119)] opacity-60"></div>
            <div className="relative">
              <div className="w-96 h-px bg-gradient-to-r from-transparent via-[rgb(45,106,119)] to-transparent opacity-60"></div>
              {/* Vertical lines connecting to top icons */}
              <div className="absolute top-0 left-16 w-px h-8 bg-gradient-to-b from-transparent to-[rgb(45,106,119)] opacity-60 transform -translate-y-8"></div>
              <div className="absolute top-0 left-1/2 w-px h-8 bg-gradient-to-b from-transparent to-[rgb(45,106,119)] opacity-60 transform -translate-x-1/2 -translate-y-8"></div>
              <div className="absolute top-0 right-16 w-px h-8 bg-gradient-to-b from-transparent to-[rgb(45,106,119)] opacity-60 transform -translate-y-8"></div>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-[rgb(45,106,119)] to-transparent opacity-60"></div>
          </div>

          {/* Central Logo */}
          <div className="flex justify-center mb-8">
            <div 
              className="rounded-2xl opacity-100 flex items-center justify-center"
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'rgb(246, 251, 255)',
                boxShadow: 'rgba(141, 194, 235, 0.25) 0px -3px 0px 2px inset, rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.2) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.18) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px'
              }}
            >
              <div 
                className="w-11 h-11 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: 'rgb(14, 28, 41)',
                  borderRadius: '10px',
                  boxShadow: 'rgba(16, 49, 77, 0.24) 0px 0.706592px 0.706592px -0.666667px, rgba(16, 49, 77, 0.23) 0px 1.80656px 1.80656px -1.33333px, rgba(16, 49, 77, 0.22) 0px 3.62176px 3.62176px -2px, rgba(16, 49, 77, 0.2) 0px 6.8656px 6.8656px -2.66667px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -3.33333px, rgba(16, 49, 77, 0.06) 0px 30px 30px -4px'
                }}
              >
                <img 
                  src="/logo.svg" 
                  alt="Logo" 
                  className="w-8 h-8 object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>
          </div>

          {/* Connecting Lines */}
          <div className="flex flex-col items-center mb-8">
            {/* Bottom connecting lines */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-[rgb(45,106,119)] opacity-60"></div>
            <div className="relative">
              <div className="w-96 h-px bg-gradient-to-r from-transparent via-[rgb(45,106,119)] to-transparent opacity-60"></div>
              {/* Vertical lines connecting to bottom icons */}
              <div className="absolute bottom-0 left-16 w-px h-8 bg-gradient-to-b from-[rgb(45,106,119)] to-transparent opacity-60 transform translate-y-8"></div>
              <div className="absolute bottom-0 left-1/2 w-px h-8 bg-gradient-to-b from-[rgb(45,106,119)] to-transparent opacity-60 transform -translate-x-1/2 translate-y-8"></div>
              <div className="absolute bottom-0 right-16 w-px h-8 bg-gradient-to-b from-[rgb(45,106,119)] to-transparent opacity-60 transform translate-y-8"></div>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-[rgb(45,106,119)] to-transparent opacity-60"></div>
          </div>

          {/* Bottom Row - Last 3 icons */}
          <div className={`grid grid-cols-3 gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {(isRTL ? [...rightIcons, ...leftIcons] : [...leftIcons, ...rightIcons]).slice(3, 6).map((item, index) => (
              <div 
                key={`mobile-bottom-${index}`}
                className="w-16 h-16 rounded-2xl opacity-100 flex items-center justify-center mx-auto"
                style={{
                  backgroundColor: 'rgb(246, 251, 255)',
                  boxShadow: 'rgba(141, 194, 235, 0.25) 0px -3px 0px 2px inset, rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.2) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.18) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ borderRadius: '72px' }}
                >
                  <div style={{ color: 'rgb(14, 28, 41)' }}>
                    {item.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Description */}
        <div className="text-center mt-16 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">{t('howitworks.step1.title')}</h3>
              <p className="text-[#64646e] text-sm leading-relaxed">
                {t('howitworks.step1.description')}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">{t('howitworks.step2.title')}</h3>
              <p className="text-[#64646e] text-sm leading-relaxed">
                {t('howitworks.step2.description')}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">{t('howitworks.step3.title')}</h3>
              <p className="text-[#64646e] text-sm leading-relaxed">
                {t('howitworks.step3.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 