import { Github, Linkedin, Mail, Heart, Code } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-primary/20 bg-gradient-dark">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold gradient-text mb-4">
              Nassim BEN NSIB
            </h3>
            <p className="text-muted-foreground mb-4">
              Cybernetic Architect crafting scalable solutions with passion for DevOps, cloud technologies, and AI innovation.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors neon-glow"
              >
                <Github className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors neon-glow"
              >
                <Linkedin className="w-5 h-5 text-primary" />
              </a>
              <a
                href="mailto:contact@nassim.dev"
                className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors neon-glow"
              >
                <Mail className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Projects', 'Skills', 'Experience', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Expertise</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">DevOps & CI/CD</li>
              <li className="text-muted-foreground">Microservices Architecture</li>
              <li className="text-muted-foreground">Cloud Infrastructure</li>
              <li className="text-muted-foreground">Full-Stack Development</li>
              <li className="text-muted-foreground">AI Integration</li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>and</span>
            <Code className="w-4 h-4 text-primary" />
            <span>by Nassim BEN NSIB</span>
          </div>
          
          <div className="text-muted-foreground text-sm">
            © {currentYear} Nassim BEN NSIB. All rights reserved.
          </div>
        </div>

        {/* Subtle animation */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="font-mono">Ready to innovate together</span>
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;