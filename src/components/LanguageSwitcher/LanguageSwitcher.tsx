import React from 'react';
import { useLanguage, Language } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  return (
    <Button
        variant="secondary"
        size="icon"
      onClick={toggleLanguage}
      className=" transition-all duration-200 w-auto aspect-square"
      title={`Switch to ${language === 'en' ? 'Hebrew' : 'English'}`}
    >
      <Globe className="w-10 h-10" />
    </Button>
  );
};