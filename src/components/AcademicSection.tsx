import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AcademicSection = () => {
  const { t, isRTL } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const academicData = [
    {
      id: 1,
      title: t('academic.masters.title'),
      university: t('academic.masters.university'),
      period: t('academic.masters.period'),
      type: 'Masters',
      status: 'In Progress',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      description: 'Advanced research in software engineering methodologies, AI integration, and distributed systems architecture.'
    },
    {
      id: 2,
      title: t('academic.engineering.title'),
      university: t('academic.engineering.university'),
      period: t('academic.engineering.period'),
      type: 'Engineering',
      status: 'Completed',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Comprehensive software development program covering full-stack development, project management, and software architecture.'
    },
    {
      id: 3,
      title: t('academic.bachelor.title'),
      university: t('academic.bachelor.university'),
      period: t('academic.bachelor.period'),
      type: 'Bachelor',
      status: 'Completed',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      description: 'Foundation in computer science fundamentals, programming languages, data structures, and algorithms.'
    }
  ];

  return (
    <section id="academic" className="py-20 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 gap-4 h-full">
          {[...Array(64)].map((_, i) => (
            <div 
              key={i} 
              className="border border-primary/20 animate-pulse"
              style={{ animationDelay: `${(i % 8) * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* Floating academic icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-primary/10 animate-float text-${2 + (i % 3)}xl`}
            style={{
              top: `${20 + (i * 13)}%`,
              left: `${10 + (i * 15)}%`,
              animationDelay: `${i * 0.8}s`
            } as React.CSSProperties}
          >
            <GraduationCap />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isRTL ? 'rtl' : ''}`}>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-fade-in-up">
            <span className="gradient-text">{t('academic.title')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-mono animate-fade-in-up delay-100">
            {t('academic.subtitle')}
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-8 rounded-full animate-fade-in-up delay-200" />
        </div>

        {/* Academic Timeline */}
        <div className="space-y-8">
          {academicData.map((item, index) => (
            <Card
              key={item.id}
              className={`
                group relative overflow-hidden bg-card/40 backdrop-blur-sm border-primary/20 
                hover:border-primary/50 transition-all duration-500 cybernetic-border
                ${hoveredCard === item.id ? 'transform scale-105' : ''}
                ${isRTL ? 'rtl' : ''}
              `}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated background gradient */}
              <div 
                className={`
                  absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 
                  group-hover:opacity-10 transition-opacity duration-500
                `} 
              />

              {/* Card content */}
              <div className={`relative z-10 p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-start gap-6`}>
                  {/* Icon */}
                  <div className={`
                    p-4 rounded-full bg-gradient-to-r ${item.color} 
                    text-white shadow-lg group-hover:shadow-neon transition-all duration-300
                  `}>
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-start justify-between gap-4`}>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        
                        <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-center gap-2 text-muted-foreground mb-2`}>
                          <MapPin className="w-4 h-4" />
                          <span className="font-medium">{item.university}</span>
                        </div>
                        
                        <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-center gap-2 text-muted-foreground`}>
                          <Calendar className="w-4 h-4" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex flex-col gap-2">
                        <Badge 
                          variant={item.status === 'In Progress' ? 'default' : 'secondary'}
                          className={`
                            ${item.status === 'In Progress' 
                              ? 'bg-gradient-primary text-primary-foreground' 
                              : 'bg-muted text-muted-foreground'
                            } font-medium
                          `}
                        >
                          {item.status}
                        </Badge>
                        <Badge variant="outline" className="border-primary/30 text-primary">
                          {item.type}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>

                    {/* Progress indicator for current studies */}
                    {item.status === 'In Progress' && (
                      <div className="space-y-2">
                        <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between text-sm text-muted-foreground`}>
                          <span>Progress</span>
                          <span>25%</span>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <div 
                            className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 ease-out w-1/4"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-lg transition-all duration-300" />
            </Card>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-primary/60">
            <div className="w-8 h-0.5 bg-gradient-primary rounded-full" />
            <GraduationCap className="w-6 h-6" />
            <div className="w-8 h-0.5 bg-gradient-primary rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicSection;
