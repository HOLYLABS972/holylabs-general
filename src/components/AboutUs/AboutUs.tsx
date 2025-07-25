import { Card, CardContent } from "../ui/card";
import { CheckIcon, BotIcon, Clock, TrendingUpIcon } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

export const AboutUs = (): JSX.Element => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <BotIcon className="w-6 h-6 text-blue-600" />,
      title: t('about.feature1.title'),
      description: t('about.feature1.description')
    },
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      title: t('about.feature2.title'),
      description: t('about.feature2.description')
    },
    {
      icon: <TrendingUpIcon className="w-6 h-6 text-purple-600" />,
      title: t('about.feature3.title'),
      description: t('about.feature3.description')
    }
  ];

  const stats = [
    { number: "500+", label: t('about.stats.clients') },
    { number: "50K+", label: t('about.stats.automation') },
    { number: "99%", label: t('about.stats.satisfaction') },
    { number: "24/7", label: t('about.stats.support') }
  ];

  return (
    <section id="about" className="py-20 bg-[#FBFCFF] relative overflow-hidden">
      {/* Grain effect overlay */}
      <div 
        className="absolute inset-0 opacity-[0.20] pointer-events-none -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full mb-6 border border-white/40">
            <span className="font-medium text-[#4f4f4f] text-sm">{t('about.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-[-1.5px] whitespace-pre-line">
            {t('about.title')}
          </h2>
          <p className="text-lg text-[#64646e] max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-black mb-2 tracking-[-1px]">
                {stat.number}
              </div>
              <div className="text-[#64646e] font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-black mb-6 tracking-[-1px]">
              Why Choose HOLYLABS?
            </h3>
            <p className="text-[#64646e] mb-8 text-lg leading-relaxed">
              We're more than just an automation platform. We're your partner in scaling 
              your business with intelligent AI solutions that work tirelessly for your success.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 flex items-center justify-center shadow-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-2 text-lg">
                      {feature.title}
                    </h4>
                    <p className="text-[#64646e] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <Card className="bg-white/40 backdrop-blur-sm border border-white/30 rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#E3E9FC] to-[#D1DCFB] rounded-full flex items-center justify-center">
                      <CheckIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="font-medium text-black">Smart Chatbots</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#E3E9FC] to-[#D1DCFB] rounded-full flex items-center justify-center">
                      <CheckIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-black">Automated Calls</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#E3E9FC] to-[#D1DCFB] rounded-full flex items-center justify-center">
                      <CheckIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="font-medium text-black">Smart Booking</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#E3E9FC] to-[#D1DCFB] rounded-full flex items-center justify-center">
                      <CheckIcon className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="font-medium text-black">Analytics Dashboard</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission Statement */}
        <Card className="bg-white/50 backdrop-blur-sm text-black rounded-2xl overflow-hidden border border-white/40">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-6 tracking-[-1px]">
              {t('about.mission.title')}
            </h3>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto text-[#64646e]">
              {t('about.mission.description')}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};