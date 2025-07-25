import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cloud, 
  Server, 
  Monitor, 
  Brain, 
  Code, 
  Database,
  Shield,
  Zap,
  Layers,
  GitBranch,
  Award,
  Globe,
  TestTube,
  Cpu,
  Settings,
  Users,
  Languages,
  FileText,
  Clock
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Proficient';
  icon: React.ReactNode;
  category: 'languages' | 'frontend' | 'backend' | 'devops' | 'database' | 'testing' | 'ai' | 'tools' | 'soft' | 'spoken';
  description?: string;
  yearsOfExperience?: string;
}

const skills: Skill[] = [
  // Programming Languages
  { name: 'JavaScript', level: 'Expert', icon: <Code className="w-5 h-5" />, category: 'languages', description: 'Advanced ES6+ features and modern JavaScript', yearsOfExperience: '4+ years' },
  { name: 'TypeScript', level: 'Expert', icon: <Code className="w-5 h-5" />, category: 'languages', description: 'Strong typing and advanced type patterns', yearsOfExperience: '3+ years' },
  { name: 'Python', level: 'Advanced', icon: <Brain className="w-5 h-5" />, category: 'languages', description: 'Backend development and AI/ML applications', yearsOfExperience: '3+ years' },
  { name: 'Java', level: 'Intermediate', icon: <Cpu className="w-5 h-5" />, category: 'languages', description: 'Enterprise applications and microservices', yearsOfExperience: '2+ years' },
  { name: 'Go', level: 'Intermediate', icon: <Zap className="w-5 h-5" />, category: 'languages', description: 'High-performance backend services', yearsOfExperience: '1+ years' },
  { name: 'SCSS', level: 'Advanced', icon: <Monitor className="w-5 h-5" />, category: 'languages', description: 'Advanced CSS preprocessing and styling', yearsOfExperience: '4+ years' },

  // Frontend & Libraries
  { name: 'Next.js', level: 'Expert', icon: <Monitor className="w-5 h-5" />, category: 'frontend', description: 'Full-stack React framework with SSR/SSG', yearsOfExperience: '3+ years' },
  { name: 'React.js', level: 'Expert', icon: <Monitor className="w-5 h-5" />, category: 'frontend', description: 'Modern hooks, context, and component patterns', yearsOfExperience: '4+ years' },
  { name: 'React Native', level: 'Advanced', icon: <Monitor className="w-5 h-5" />, category: 'frontend', description: 'Cross-platform mobile development', yearsOfExperience: '2+ years' },
  { name: 'Tailwind CSS', level: 'Expert', icon: <Monitor className="w-5 h-5" />, category: 'frontend', description: 'Utility-first CSS framework and design systems', yearsOfExperience: '3+ years' },
  { name: 'Redux', level: 'Advanced', icon: <Settings className="w-5 h-5" />, category: 'frontend', description: 'State management for complex applications', yearsOfExperience: '3+ years' },
  { name: 'Axios', level: 'Advanced', icon: <Globe className="w-5 h-5" />, category: 'frontend', description: 'HTTP client for API interactions', yearsOfExperience: '4+ years' },

  // Backend & Frameworks
  { name: 'Node.js', level: 'Expert', icon: <Server className="w-5 h-5" />, category: 'backend', description: 'Server-side JavaScript runtime and APIs', yearsOfExperience: '4+ years' },
  { name: 'Express.js', level: 'Expert', icon: <Server className="w-5 h-5" />, category: 'backend', description: 'Lightweight web framework for Node.js', yearsOfExperience: '4+ years' },
  { name: 'NestJS', level: 'Advanced', icon: <Server className="w-5 h-5" />, category: 'backend', description: 'Enterprise-grade Node.js framework', yearsOfExperience: '2+ years' },
  { name: 'FastAPI', level: 'Advanced', icon: <Server className="w-5 h-5" />, category: 'backend', description: 'Modern Python web framework for APIs', yearsOfExperience: '2+ years' },
  { name: 'Strapi CMS', level: 'Advanced', icon: <Settings className="w-5 h-5" />, category: 'backend', description: 'Headless CMS for content management', yearsOfExperience: '2+ years' },
  { name: 'Odoo', level: 'Intermediate', icon: <Settings className="w-5 h-5" />, category: 'backend', description: 'ERP module development and customization', yearsOfExperience: '1+ years' },

  // DevOps & Cloud
  { name: 'Docker', level: 'Expert', icon: <Layers className="w-5 h-5" />, category: 'devops', description: 'Containerization and microservices deployment', yearsOfExperience: '3+ years' },
  { name: 'GitHub Actions', level: 'Expert', icon: <GitBranch className="w-5 h-5" />, category: 'devops', description: 'CI/CD pipelines and workflow automation', yearsOfExperience: '3+ years' },
  { name: 'GitLab CI/CD', level: 'Advanced', icon: <GitBranch className="w-5 h-5" />, category: 'devops', description: 'Continuous integration and deployment', yearsOfExperience: '2+ years' },
  { name: 'Azure', level: 'Advanced', icon: <Cloud className="w-5 h-5" />, category: 'devops', description: 'Cloud services and AI fundamentals certified', yearsOfExperience: '2+ years' },
  { name: 'AWS', level: 'Advanced', icon: <Cloud className="w-5 h-5" />, category: 'devops', description: 'Cloud infrastructure and services', yearsOfExperience: '2+ years' },
  { name: 'DevSecOps', level: 'Advanced', icon: <Shield className="w-5 h-5" />, category: 'devops', description: 'Security integration in development lifecycle', yearsOfExperience: '2+ years' },
  { name: 'Grafana', level: 'Intermediate', icon: <Monitor className="w-5 h-5" />, category: 'devops', description: 'Monitoring and observability dashboards', yearsOfExperience: '1+ years' },
  { name: 'Prometheus', level: 'Intermediate', icon: <Monitor className="w-5 h-5" />, category: 'devops', description: 'Metrics collection and alerting', yearsOfExperience: '1+ years' },
  { name: 'SonarQube', level: 'Advanced', icon: <Shield className="w-5 h-5" />, category: 'devops', description: 'Code quality and security analysis', yearsOfExperience: '2+ years' },
  { name: 'Git', level: 'Expert', icon: <GitBranch className="w-5 h-5" />, category: 'devops', description: 'Version control and collaborative development', yearsOfExperience: '4+ years' },

  // Databases & ORM
  { name: 'MongoDB', level: 'Advanced', icon: <Database className="w-5 h-5" />, category: 'database', description: 'NoSQL document database and aggregation', yearsOfExperience: '3+ years' },
  { name: 'MySQL', level: 'Advanced', icon: <Database className="w-5 h-5" />, category: 'database', description: 'Relational database design and optimization', yearsOfExperience: '3+ years' },
  { name: 'PostgreSQL', level: 'Expert', icon: <Database className="w-5 h-5" />, category: 'database', description: 'Advanced SQL and database administration', yearsOfExperience: '3+ years' },
  { name: 'Prisma', level: 'Advanced', icon: <Database className="w-5 h-5" />, category: 'database', description: 'Modern ORM with type safety', yearsOfExperience: '2+ years' },
  { name: 'TypeORM', level: 'Advanced', icon: <Database className="w-5 h-5" />, category: 'database', description: 'TypeScript ORM for Node.js applications', yearsOfExperience: '2+ years' },

  // Testing
  { name: 'Jest', level: 'Advanced', icon: <TestTube className="w-5 h-5" />, category: 'testing', description: 'Unit and integration testing framework', yearsOfExperience: '3+ years' },
  { name: 'Supertest', level: 'Advanced', icon: <TestTube className="w-5 h-5" />, category: 'testing', description: 'HTTP assertion testing for APIs', yearsOfExperience: '2+ years' },
  { name: 'Playwright', level: 'Intermediate', icon: <TestTube className="w-5 h-5" />, category: 'testing', description: 'End-to-end testing for web applications', yearsOfExperience: '1+ years' },

  // AI & Machine Learning
  { name: 'Genetic Algorithm', level: 'Intermediate', icon: <Brain className="w-5 h-5" />, category: 'ai', description: 'Optimization and evolutionary computing', yearsOfExperience: '1+ years' },
  { name: 'OCR (AWS Textract)', level: 'Advanced', icon: <Brain className="w-5 h-5" />, category: 'ai', description: 'Optical character recognition and document analysis', yearsOfExperience: '2+ years' },
  { name: 'Machine Learning', level: 'Intermediate', icon: <Brain className="w-5 h-5" />, category: 'ai', description: 'Data analysis and predictive modeling', yearsOfExperience: '2+ years' },
  { name: 'TensorFlow', level: 'Intermediate', icon: <Brain className="w-5 h-5" />, category: 'ai', description: 'Deep learning and neural networks', yearsOfExperience: '1+ years' },

  // Tools & Methodologies
  { name: 'Microservices', level: 'Expert', icon: <Layers className="w-5 h-5" />, category: 'tools', description: 'Distributed architecture and service design', yearsOfExperience: '3+ years' },
  { name: 'n8n Workflows', level: 'Advanced', icon: <Settings className="w-5 h-5" />, category: 'tools', description: 'Workflow automation and integration', yearsOfExperience: '2+ years' },
  { name: 'RPA', level: 'Intermediate', icon: <Cpu className="w-5 h-5" />, category: 'tools', description: 'Robotic process automation', yearsOfExperience: '1+ years' },
  { name: 'API Design', level: 'Expert', icon: <Globe className="w-5 h-5" />, category: 'tools', description: 'RESTful and GraphQL API development', yearsOfExperience: '4+ years' },
  { name: 'Jupyter', level: 'Advanced', icon: <Code className="w-5 h-5" />, category: 'tools', description: 'Interactive development and data analysis', yearsOfExperience: '2+ years' },
  { name: 'HIPAA/GDPR', level: 'Advanced', icon: <Shield className="w-5 h-5" />, category: 'tools', description: 'Healthcare and data privacy compliance', yearsOfExperience: '2+ years' },
  { name: 'Agile/Scrum', level: 'Advanced', icon: <Users className="w-5 h-5" />, category: 'tools', description: 'Project management and team collaboration', yearsOfExperience: '4+ years' },
  { name: 'Technical Writing', level: 'Advanced', icon: <Code className="w-5 h-5" />, category: 'tools', description: 'Documentation and knowledge sharing', yearsOfExperience: '3+ years' },

  // Soft Skills
  { name: 'Problem Solving', level: 'Expert', icon: <Brain className="w-5 h-5" />, category: 'soft', description: 'Complex system analysis and optimization' },
  { name: 'Leadership', level: 'Advanced', icon: <Users className="w-5 h-5" />, category: 'soft', description: 'Team management and mentoring' },
  { name: 'Communication', level: 'Expert', icon: <Users className="w-5 h-5" />, category: 'soft', description: 'Cross-functional collaboration and presentation' },
  { name: 'Mentoring', level: 'Expert', icon: <Users className="w-5 h-5" />, category: 'soft', description: 'Student guidance and knowledge transfer' },
  { name: 'Adaptability', level: 'Expert', icon: <Zap className="w-5 h-5" />, category: 'soft', description: 'Learning new technologies and environments' },

  // Spoken Languages
  { name: 'Arabic', level: 'Expert', icon: <Languages className="w-5 h-5" />, category: 'spoken', description: 'Native speaker' },
  { name: 'English', level: 'Expert', icon: <Languages className="w-5 h-5" />, category: 'spoken', description: 'Professional proficiency' },
  { name: 'French', level: 'Advanced', icon: <Languages className="w-5 h-5" />, category: 'spoken', description: 'Professional proficiency' },
];

const categoryLabels = {
  languages: 'Programming Languages',
  frontend: 'Frontend & Libraries',
  backend: 'Backend & Frameworks',
  devops: 'DevOps & Cloud',
  database: 'Databases & ORM',
  testing: 'Testing',
  ai: 'AI & Machine Learning',
  tools: 'Tools & Methodologies',
  soft: 'Soft Skills',
  spoken: 'Languages'
};

const SkillsSection = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('languages');

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30';
      case 'Advanced':
        return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'Proficient':
        return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
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
    <section id="skills" className="py-20 bg-gray-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {t('skills.title')}
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 mb-12 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 h-auto p-1">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <TabsTrigger 
                key={key} 
                value={key}
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-400/50 border border-transparent transition-all duration-300 text-xs lg:text-sm p-2 lg:p-3"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(categoryLabels).map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {getSkillsByCategory(category).map((skill) => (
                  <motion.div key={skill.name} variants={itemVariants}>
                    <Card className="p-6 bg-gray-900/50 backdrop-blur-sm border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 group h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-cyan-500/20 rounded-lg text-cyan-400 group-hover:bg-cyan-500/30 transition-colors flex-shrink-0">
                          {skill.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-white text-lg truncate">{skill.name}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge 
                              variant="outline" 
                              className={getLevelColor(skill.level)}
                            >
                              {skill.level}
                            </Badge>
                            {skill.yearsOfExperience && (
                              <Badge 
                                variant="outline" 
                                className="bg-gray-500/20 text-gray-300 border-gray-500/30 text-xs"
                              >
                                <Clock className="w-3 h-3 mr-1" />
                                {skill.yearsOfExperience}
                              </Badge>
                            )}
                          </div>
                          {skill.description && (
                            <p className="text-gray-400 text-sm leading-relaxed">{skill.description}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-7 h-7 text-yellow-400" />
              <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Professional Certifications
              </h3>
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h4 className="text-2xl font-bold text-white mb-2">
                  AL-900: Microsoft Azure AI Fundamentals
                </h4>
                <p className="text-gray-300 mb-4">
                  Certified in Azure AI services, machine learning fundamentals, and AI workloads implementation
                </p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30">Microsoft Certified</Badge>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-400/30">Azure AI</Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-400/30">November 2023</Badge>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Certified
                </div>
                <p className="text-gray-400 text-sm">Professional</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
              <p className="text-gray-300">Technologies</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">4+</div>
              <p className="text-gray-300">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">1</div>
              <p className="text-gray-300">Certification</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">3</div>
              <p className="text-gray-300">Languages</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
