import { ArrowRightIcon, PhoneIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useLanguage } from "../../../../contexts/LanguageContext";

export const HeaderSection = (): JSX.Element => {
  const { t } = useLanguage();

  const handleCallNow = () => {
    window.location.href = "tel:+12362344580";
  };


  return (
    <header className="flex flex-col items-center gap-6 w-full max-w-[710px] mx-auto pt-16 sm:pt-20 md:pt-[120px] pb-8 mt-8 sm:mt-12 md:mt-20 relative">
      {/* Grain effect overlay - positioned behind content */}
      
      
      <div className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-t from-[#ffffffa6] to-[#ffffffa6]/60 rounded-full backdrop-blur-[30px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(30px)_brightness(100%)] relative z-10">
        <span className="font-normal text-[#43454a] text-base leading-[19px]">
          {t('hero.badge')}
        </span>
      </div>


      <div className="flex flex-col items-center gap-8 w-full relative z-10">
        <div className="flex flex-col items-center gap-8 w-full">
          <h1 
            className="font-semibold text-6xl text-center tracking-[-2.60px] leading-[71.5px] whitespace-pre-line bg-gradient-to-t from-black to-black/60 bg-clip-text text-transparent"
            dangerouslySetInnerHTML={{ __html: t('hero.title') }}
          />

          <p className="font-medium text-[#64646e] text-lg text-center tracking-[-0.18px] leading-[23.4px] whitespace-pre-line">
            {t('hero.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <Button variant="cta-primary" size="cta" onClick={handleCallNow}>
            <span className="flex items-center gap-2">
              {t('hero.cta.primary')}
              <PhoneIcon className="w-4 h-4" />
            </span>
          </Button>

          <Button variant="cta-secondary" size="cta" onClick={() => {
            window.location.href = "/services";
          }}>
            <span className="flex items-center gap-2">
              {t('hero.cta.secondary')}
              <ArrowRightIcon className="w-4 h-4" />
            </span>
          </Button>
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
    </header>
  );
};