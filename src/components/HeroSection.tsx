import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import cyberBackground from '@/assets/cyber-background.jpg';
import Scene3D from './Scene3D';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const { t } = useLanguage();
  const fullText = t('hero.subtitle');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let index = 0;

    // Reset display text when fullText changes
    setDisplayText('');

    const typeText = () => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
        timeoutId = setTimeout(typeText, 100);
      }
    };

    // Start typing after 1 second
    timeoutId = setTimeout(typeText, 1000);

    return () => clearTimeout(timeoutId);
  }, [fullText]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${cyberBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/80" />
      
      {/* 3D Cybernetic Model */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Scene3D />
      </div>
      
      {/* Animated data particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full data-flow-animation opacity-70"
            style={{
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 0.8}s`
            }}
          />
        ))}
      </div>

      {/* Social links - top right */}
      <div className="absolute top-8 right-8 flex gap-4 z-10">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-card/20 backdrop-blur-sm border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 neon-glow"
        >
          <Github className="w-5 h-5 text-foreground" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-card/20 backdrop-blur-sm border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 neon-glow"
        >
          <Linkedin className="w-5 h-5 text-foreground" />
        </a>
        <a
          href="mailto:contact@nassim.dev"
          className="p-3 rounded-full bg-card/20 backdrop-blur-sm border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 neon-glow"
        >
          <Mail className="w-5 h-5 text-foreground" />
        </a>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 animate-fade-in-up">
          <span className="block gradient-text">{t('hero.title')}</span>
          <span className="block text-neon">NASSIM BEN NSIB</span>
        </h1>
        
        {/* Nickname */}
        <div className="mb-6">
          <p className="text-lg md:text-xl text-cyan-400/80 font-mono">
            aka <span className="text-cyan-300 font-semibold">ShadeVybes</span> • <span className="text-purple-300 font-semibold">ShadeVi</span> • <span className="text-pink-300 font-semibold">SVi</span>
          </p>
        </div>
        
        <div className="h-16 mb-8">
          <p className="text-xl md:text-2xl font-mono text-muted-foreground">
            {displayText}
            <span className="animate-pulse text-primary">|</span>
          </p>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('hero.description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Button
            size="lg"
            onClick={() => scrollToSection('projects')}
            className="bg-gradient-primary text-primary-foreground hover:shadow-neon-strong transform hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold pulse-neon-animation"
          >
            {t('hero.cta.primary')}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary px-8 py-6 text-lg cybernetic-border"
          >
            {t('hero.cta.secondary')}
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;