import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { useLanguage } from '../../../contexts/LanguageContext';

const CTASection: React.FC = () => {
  const { t } = useLanguage();
  
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-br from-blue-600 to-purple-700 border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-12 text-center text-white">
            <div className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
              <span className="font-medium text-white text-sm">{t('cta.badge')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              {t('cta.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              {t('cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-auto"
                >
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  {t('cta.primary')}
                </Button>
              </Link>
              
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 h-auto"
                >
                  {t('cta.secondary')}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="opacity-90">{t('cta.consultation')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-2">30 min</div>
                <div className="opacity-90">{t('cta.discovery')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-2">0</div>
                <div className="opacity-90">{t('cta.commitment')}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTASection; 