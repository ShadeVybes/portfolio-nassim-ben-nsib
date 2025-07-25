import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage, type Language } from '@/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: t('language.english'), flag: '🇺🇸' },
    { code: 'fr', name: t('language.french'), flag: '🇫🇷' },
    { code: 'ar', name: t('language.arabic'), flag: '🇸🇦' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="relative bg-background/20 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all px-3"
          aria-label={t('language.switch')}
        >
          <Languages className="h-4 w-4 mr-2" />
          <span className="text-sm">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-background/95 backdrop-blur-sm border-primary/20"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer hover:bg-primary/10 ${
              language === lang.code ? 'bg-primary/5' : ''
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
