import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
      className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
      title={language === 'en' ? 'Switch to Hindi' : 'अंग्रेजी में बदलें'}
    >
      <Languages className="h-4 w-4 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">
        {language === 'en' ? 'हिं' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageSwitch;