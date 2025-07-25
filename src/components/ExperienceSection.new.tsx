import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  ChevronDown,
  ExternalLink,
  Trophy,
  Users,
  Code,
  Briefcase
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ExperienceSection() {
  const { t } = useLanguage();
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);

  // Define experiences structure using translation keys
  const experiences = [
    {
      id: 'remotion',
      company: t('experience.remotion.company'),
      title: t('experience.remotion.title'),
      location: t('experience.remotion.location'),
      period: t('experience.remotion.period'),
      description: t('experience.remotion.desc1'),
      responsibilities: [
        t('experience.remotion.desc1'),
        t('experience.remotion.desc2'),
        t('experience.remotion.desc3')
      ],
      technologies: ['React', 'Node.js', 'Docker', 'Microservices', 'HIPAA', 'GDPR', 'GitHub Actions'],
      achievements: [
        'Successfully migrated legacy system to microservices',
        'Implemented HIPAA/GDPR compliance measures',
        'Automated CI/CD pipeline reducing deployment time by 60%'
      ],
      website: 'https://remotion.com'
    },
    {
      id: 'waaw',
      company: t('experience.waaw.company'),
      title: t('experience.waaw.title'),
      location: t('experience.waaw.location'),
      period: t('experience.waaw.period'),
      description: t('experience.waaw.desc1'),
      responsibilities: [
        t('experience.waaw.desc1'),
        t('experience.waaw.desc2'),
        t('experience.waaw.desc3')
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      achievements: [
        'Developed scalable web application architecture',
        'Implemented real-time features improving user engagement',
        'Optimized performance resulting in 40% faster load times'
      ],
      website: 'https://waaw.com'
    },
    {
      id: 'unfrauded',
      company: t('experience.unfrauded.company'),
      title: t('experience.unfrauded.title'),
      location: t('experience.unfrauded.location'),
      period: t('experience.unfrauded.period'),
      description: t('experience.unfrauded.desc1'),
      responsibilities: [
        t('experience.unfrauded.desc1'),
        t('experience.unfrauded.desc2'),
        t('experience.unfrauded.desc3')
      ],
      technologies: ['React', 'Express.js', 'MongoDB', 'Machine Learning', 'Python', 'TensorFlow'],
      achievements: [
        'Built fraud detection system with 95% accuracy',
        'Reduced false positive rates by 30%',
        'Processed over 1M transactions daily'
      ],
      website: 'https://unfrauded.com'
    },
    {
      id: 'gomycode',
      company: t('experience.gomycode.company'),
      title: t('experience.gomycode.title'),
      location: t('experience.gomycode.location'),
      period: t('experience.gomycode.period'),
      description: t('experience.gomycode.desc1'),
      responsibilities: [
        t('experience.gomycode.desc1'),
        t('experience.gomycode.desc2'),
        t('experience.gomycode.desc3')
      ],
      technologies: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git', 'Agile'],
      achievements: [
        'Mentored 100+ students in web development',
        'Developed comprehensive curriculum for full-stack development',
        'Achieved 90% student completion rate'
      ],
      website: 'https://gomycode.com'
    },
    {
      id: 'clevertech',
      company: t('experience.clevertech.company'),
      title: t('experience.clevertech.title'),
      location: t('experience.clevertech.location'),
      period: t('experience.clevertech.period'),
      description: t('experience.clevertech.desc1'),
      responsibilities: [
        t('experience.clevertech.desc1'),
        t('experience.clevertech.desc2'),
        t('experience.clevertech.desc3')
      ],
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS', 'Redis', 'Elasticsearch'],
      achievements: [
        'Delivered 5+ client projects on time and under budget',
        'Implemented search functionality handling 10M+ queries',
        'Led team of 3 developers in agile environment'
      ],
      website: 'https://clevertech.com'
    }
  ];

  const toggleExperience = (id: string) => {
    setExpandedExperience(expandedExperience === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="experience" className="py-20 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Briefcase className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {t('experience.title')}
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative mb-8 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full border-4 border-black z-10"></div>

                <div className="ml-20">
                  <Card className="bg-gray-900/50 border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div 
                        className="cursor-pointer"
                        onClick={() => toggleExperience(exp.id)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Building2 className="w-5 h-5 text-cyan-400" />
                              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                {exp.title}
                              </h3>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm mb-3">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{exp.company}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{exp.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{exp.period}</span>
                              </div>
                            </div>

                            <p className="text-gray-400 mb-4">{exp.description}</p>

                            {/* Technologies */}
                            {exp.technologies && exp.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {exp.technologies.map((tech, techIndex) => (
                                  <Badge 
                                    key={techIndex}
                                    variant="outline" 
                                    className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-cyan-400 hover:text-white hover:bg-cyan-400/10"
                          >
                            {expandedExperience === exp.id ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Expanded content */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedExperience === exp.id ? 'auto' : 0,
                          opacity: expandedExperience === exp.id ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-gray-700/50">
                          {/* Key Achievements */}
                          {exp.achievements && exp.achievements.length > 0 && (
                            <div className="mb-6">
                              <div className="flex items-center gap-2 mb-3">
                                <Trophy className="w-5 h-5 text-yellow-400" />
                                <h4 className="font-semibold text-white">Key Achievements</h4>
                              </div>
                              <ul className="space-y-2">
                                {exp.achievements.map((achievement, achievementIndex) => (
                                  <li 
                                    key={achievementIndex}
                                    className="flex items-start gap-3 text-gray-300"
                                  >
                                    <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Responsibilities */}
                          {exp.responsibilities && exp.responsibilities.length > 0 && (
                            <div className="mb-6">
                              <div className="flex items-center gap-2 mb-3">
                                <Code className="w-5 h-5 text-purple-400" />
                                <h4 className="font-semibold text-white">Key Responsibilities</h4>
                              </div>
                              <ul className="space-y-2">
                                {exp.responsibilities.map((responsibility, respIndex) => (
                                  <li 
                                    key={respIndex}
                                    className="flex items-start gap-3 text-gray-300"
                                  >
                                    <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                    <span>{responsibility}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Company website link */}
                          {exp.website && (
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400"
                                onClick={() => window.open(exp.website, '_blank')}
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Visit Company
                              </Button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            {t('experience.cta') || "Ready to discuss how my experience can benefit your project?"}
          </p>
          <Button
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Work Together
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
