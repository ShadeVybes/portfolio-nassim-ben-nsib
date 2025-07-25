import { Card } from '@/components/ui/card';
import professionalHeadshot from '@/assets/professional-headshot.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 gradient-text">
          {t('about.title')}
        </h2>
        
        {/* Nickname */}
        <div className="text-center mb-16">
          <p className="text-sm md:text-base text-gray-400 font-mono">
            Known as <span className="text-cyan-400 font-semibold">ShadeVybes</span>, <span className="text-purple-400 font-semibold">ShadeVi</span>, or <span className="text-pink-400 font-semibold">SVi</span>
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Professional Photo with Dynamic Background */}
          <div className="relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Generative background pattern */}
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 animate-pulse" />
              <div className="absolute inset-4 bg-gradient-glow rounded-full opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
              
              {/* Profile image */}
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-primary/30 shadow-neon">
                <img 
                  src={professionalHeadshot}
                  alt="Nassim BEN NSIB - Software Engineer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20 cybernetic-border">
              <h3 className="text-xl font-semibold text-neon mb-4">{t('about.subtitle')}</h3>
              <p className="text-lg leading-relaxed text-foreground mb-4">
                {t('about.description')}
              </p>
            </Card>

            {/* Key Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-primary/10 border-primary/30 text-center">
                <div className="text-2xl font-bold text-neon mb-2">25+</div>
                <div className="text-sm text-muted-foreground">{t('about.stats.projects')}</div>
              </Card>
              
              <Card className="p-4 bg-secondary/10 border-secondary/30 text-center">
                <div className="text-2xl font-bold text-magenta mb-2">4+</div>
                <div className="text-sm text-muted-foreground">{t('about.stats.experience')}</div>
              </Card>
              
              <Card className="p-4 bg-primary/10 border-primary/30 text-center">
                <div className="text-2xl font-bold text-neon mb-2">30+</div>
                <div className="text-sm text-muted-foreground">{t('about.stats.technologies')}</div>
              </Card>
              
              <Card className="p-4 bg-secondary/10 border-secondary/30 text-center">
                <div className="text-2xl font-bold text-magenta mb-2">15+</div>
                <div className="text-sm text-muted-foreground">{t('about.stats.clients')}</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;