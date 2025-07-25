import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'academic', 'projects', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'academic', label: t('nav.academic') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const externalNavItems = [
    { path: '/workflow', label: t('nav.workflow') }
  ];

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-elegant' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="text-2xl font-display font-bold gradient-text hover:scale-105 transition-transform duration-300"
          >
            NB<span className="text-neon">N</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  relative px-4 py-2 font-medium transition-all duration-300
                  ${activeSection === item.id 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full" />
                )}
              </button>
            ))}
            
            {/* External Links */}
            {externalNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 font-medium transition-all duration-300 text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Controls Section - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-primary text-primary-foreground hover:shadow-neon transition-all duration-300"
            >
              {t('contact.title')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-primary/20">
            <div className="flex flex-col gap-2 mt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    text-left px-4 py-3 rounded-lg font-medium transition-all duration-300
                    ${activeSection === item.id 
                      ? 'text-primary bg-primary/10 border border-primary/30' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
              
              {/* External Links */}
              {externalNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-muted/10"
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Controls */}
              <div className="flex items-center gap-2 mt-2 px-4">
                <LanguageSwitcher />
              </div>
              
              <Button
                onClick={() => scrollToSection('contact')}
                className="mt-2 bg-gradient-primary text-primary-foreground"
              >
                {t('contact.title')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;