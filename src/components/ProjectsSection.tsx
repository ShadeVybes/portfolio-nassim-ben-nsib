import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Server, Smartphone, Brain, Cloud } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  role: string;
  outcome: string;
  tech: string[];
  icon: React.ReactNode;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 'ecommerce',
    title: 'E-commerce Microservices Platform',
    description: 'Scalable microservices architecture with automated CI/CD pipeline',
    problem: 'Legacy monolithic application causing deployment bottlenecks and scaling issues',
    role: 'Lead Backend Engineer - Designed microservices architecture, implemented CI/CD automation',
    outcome: 'Reduced deployment time by 70% and improved system scalability by 300%',
    tech: ['NestJS', 'Docker', 'Kubernetes', 'Azure', 'PostgreSQL', 'Redis'],
    icon: <Server className="w-6 h-6" />,
    featured: true
  },
  {
    id: 'healthcare',
    title: 'Healthcare Data Migration',
    description: 'Migrated healthcare solution to cloud-native microservices on Azure',
    problem: 'On-premise healthcare system with poor scalability and security concerns',
    role: 'DevOps Engineer - Implemented DevSecOps practices and Azure migration strategy',
    outcome: 'Achieved 99.9% uptime and improved data security compliance by 40%',
    tech: ['Azure', 'Docker', 'GitLab CI/CD', 'SonarQube', 'Grafana', 'Prometheus'],
    icon: <Cloud className="w-6 h-6" />,
    featured: true
  },
  {
    id: 'smart-home',
    title: 'Smart Home Automation',
    description: 'IoT-based home automation system with real-time monitoring',
    problem: 'Need for intelligent home automation with energy efficiency optimization',
    role: 'Full-Stack Developer - Built IoT integration and real-time dashboard',
    outcome: 'Reduced energy consumption by 25% and improved user satisfaction by 90%',
    tech: ['NextJS', 'FastAPI', 'IoT', 'WebSockets', 'MongoDB', 'Docker'],
    icon: <Smartphone className="w-6 h-6" />,
    featured: false
  },
  {
    id: 'ai-chatbot',
    title: 'AI-Powered Customer Support',
    description: 'Intelligent chatbot with natural language processing capabilities',
    problem: 'High volume of customer support tickets overwhelming support team',
    role: 'AI Engineer - Developed NLP models and integration with existing systems',
    outcome: 'Reduced support ticket volume by 60% and improved response time by 80%',
    tech: ['Python', 'TensorFlow', 'Azure Cognitive Services', 'React', 'Node.js'],
    icon: <Brain className="w-6 h-6" />,
    featured: false
  }
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 gradient-text">
          Featured Projects
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-primary opacity-50" />

          {/* Project nodes */}
          <div className="space-y-24">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Timeline node */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full cursor-pointer hover:scale-150 transition-transform duration-300 z-10 pulse-neon-animation"
                  onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                />

                {/* Project card */}
                <Card 
                  className={`
                    w-full max-w-lg p-6 bg-card/40 backdrop-blur-sm border-primary/20 cybernetic-border
                    ${index % 2 === 0 ? 'mr-8' : 'ml-8'}
                    ${selectedProject === project.id ? 'ring-2 ring-primary shadow-neon-strong' : ''}
                    cursor-pointer hover:shadow-neon transition-all duration-300
                  `}
                  onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                      {project.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                    {project.featured && (
                      <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-4">{project.description}</p>

                  {/* Expanded details */}
                  {selectedProject === project.id && (
                    <div className="space-y-4 animate-fade-in-up">
                      <div>
                        <h4 className="font-semibold text-neon mb-2">Problem</h4>
                        <p className="text-sm text-muted-foreground">{project.problem}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-magenta mb-2">My Role</h4>
                        <p className="text-sm text-muted-foreground">{project.role}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-neon mb-2">Outcome</h4>
                        <p className="text-sm text-muted-foreground">{project.outcome}</p>
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-border">
                        <button className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors">
                          <Github className="w-4 h-4 text-primary" />
                        </button>
                        <button className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors">
                          <ExternalLink className="w-4 h-4 text-primary" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.slice(0, selectedProject === project.id ? project.tech.length : 3).map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className="text-xs border-primary/30 text-primary bg-primary/5"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {selectedProject !== project.id && project.tech.length > 3 && (
                      <Badge variant="outline" className="text-xs border-muted text-muted-foreground">
                        +{project.tech.length - 3} more
                      </Badge>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;