import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative bg-background/20 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all"
          aria-label={t('theme.toggle')}
        >
          {getThemeIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-background/95 backdrop-blur-sm border-primary/20"
      >
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className="cursor-pointer hover:bg-primary/10"
        >
          <Sun className="h-4 w-4 mr-2" />
          {t('theme.light')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className="cursor-pointer hover:bg-primary/10"
        >
          <Moon className="h-4 w-4 mr-2" />
          {t('theme.dark')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className="cursor-pointer hover:bg-primary/10"
        >
          <Monitor className="h-4 w-4 mr-2" />
          {t('theme.system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
