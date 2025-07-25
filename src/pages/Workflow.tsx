import { useState, useEffect } from 'react';
import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import WorkflowVisualization from '@/components/WorkflowVisualization';
import CameraController from '@/components/CameraController';
import { 
  MessageSquare, 
  FileText, 
  GitBranch, 
  Palette, 
  Users, 
  Code, 
  Bug, 
  Settings, 
  Shield, 
  TrendingUp, 
  Megaphone, 
  Scale, 
  BookOpen,
  Check
} from 'lucide-react';

interface WorkflowStep {
  id: number;
  title: string;
  shortTitle: string;
  icon: React.ReactNode;
  description: string;
  keywords: string[];
  position: [number, number, number];
  visited: boolean;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Strategic Discovery & Client Alignment",
    shortTitle: "Strategic Discovery",
    icon: <MessageSquare className="w-4 h-4" />,
    description: "Focus on deep-dive workshops, stakeholder interviews, uncovering business challenges, and defining success metrics for innovative solutions.",
    keywords: ["Strategic Planning", "Requirement Elicitation", "Innovation Workshops", "Stakeholder Management", "Business Analysis"],
    position: [0, 0, 0],
    visited: false
  },
  {
    id: 2,
    title: "Comprehensive Solution Blueprint",
    shortTitle: "Solution Blueprint",
    icon: <FileText className="w-4 h-4" />,
    description: "Translating requirements into a meticulous technical specification document, outlining functional and non-functional requirements, system architecture, data models, and acceptance criteria.",
    keywords: ["Technical Specifications", "Solution Architecture", "Detailed Planning", "Scope Definition", "Future-Proofing"],
    position: [2, 1, -1],
    visited: false
  },
  {
    id: 3,
    title: "Advanced Architecture & System Design",
    shortTitle: "Architecture Design",
    icon: <GitBranch className="w-4 h-4" />,
    description: "Designing resilient, scalable, and secure cloud-native microservices, event-driven patterns, data flow, and API contracts, visualized through advanced UML and custom diagrams.",
    keywords: ["Cloud-Native", "Microservices", "Event-Driven Architecture", "UML", "API Design", "Scalability", "Security by Design"],
    position: [4, 0, 1],
    visited: false
  },
  {
    id: 4,
    title: "Interactive Prototyping & UX Validation",
    shortTitle: "Prototyping & UX",
    icon: <Palette className="w-4 h-4" />,
    description: "Crafting interactive prototypes and high-fidelity mockups for UX visualization and core functionality validation, involving rapid prototyping, usability testing, and early user feedback.",
    keywords: ["Prototyping", "UX/UI Design", "Usability Testing", "User-Centric Design", "Rapid Iteration", "Wireframing"],
    position: [6, -1, -1],
    visited: false
  },
  {
    id: 5,
    title: "Iterative Client Review & Refinement",
    shortTitle: "Client Review",
    icon: <Users className="w-4 h-4" />,
    description: "Structured review sessions with clients for feedback on prototypes and designs, ensuring alignment, agile adjustments, and collaborative decision-making.",
    keywords: ["Client Collaboration", "Feedback Cycles", "Agile Methodologies", "Stakeholder Engagement", "Refinement"],
    position: [8, 0.5, 0],
    visited: false
  },
  {
    id: 6,
    title: "Cutting-Edge Development & Implementation",
    shortTitle: "Development",
    icon: <Code className="w-4 h-4" />,
    description: "Writing clean, modular, and high-performance code using modern frameworks and best practices, focusing on robust feature implementation across all layers.",
    keywords: ["Full-Stack Development", "Clean Code", "Modern Frameworks", "Performance Optimization", "Modular Design", "Test-Driven Development"],
    position: [10, -0.5, 1],
    visited: false
  },
  {
    id: 7,
    title: "Automated Quality Assurance & Testing",
    shortTitle: "Automated QA & Testing",
    icon: <Bug className="w-4 h-4" />,
    description: "Implementing comprehensive, automated testing strategies (unit, integration, E2E, performance) for high software quality, early bug detection, and continuous validation.",
    keywords: ["Automated Testing", "QA", "Unit Testing", "Integration Testing", "E2E Testing", "Performance Testing", "Test Automation"],
    position: [12, 1, -0.5],
    visited: false
  },
  {
    id: 8,
    title: "Robust CI/CD & Automated Deployment",
    shortTitle: "CI/CD & Deployment",
    icon: <Settings className="w-4 h-4" />,
    description: "Designing and implementing advanced CI/CD pipelines, leveraging GitOps and Infrastructure as Code to automate builds, tests, security scans, and deployments for rapid, reliable releases.",
    keywords: ["CI/CD", "DevOps Automation", "GitOps", "Infrastructure as Code", "Automated Deployment", "Release Management"],
    position: [14, 0, 0.5],
    visited: false
  },
  {
    id: 9,
    title: "Proactive Security & Penetration Testing",
    shortTitle: "DevSecOps & Pentesting",
    icon: <Shield className="w-4 h-4" />,
    description: "Integrating security throughout the development lifecycle, including continuous vulnerability scanning, penetration testing, threat modeling, and adherence to compliance standards.",
    keywords: ["DevSecOps", "Penetration Testing", "Vulnerability Management", "Security Audits", "Threat Modeling", "Compliance"],
    position: [16, -1, -1],
    visited: false
  },
  {
    id: 10,
    title: "Post-Deployment Monitoring & AI-Driven Analytics",
    shortTitle: "Monitoring & AI Analytics",
    icon: <TrendingUp className="w-4 h-4" />,
    description: "Establishing comprehensive observability solutions (logging, metrics, tracing) and utilizing AI-driven analytics for anomaly detection, predictive insights, and proactive issue resolution.",
    keywords: ["Observability", "Monitoring", "Logging", "Metrics", "Tracing", "AI Analytics", "Anomaly Detection", "Predictive Maintenance"],
    position: [18, 0.5, 1],
    visited: false
  },
  {
    id: 11,
    title: "User Feedback Integration & Feature Evolution",
    shortTitle: "User Feedback & Evolution",
    icon: <Megaphone className="w-4 h-4" />,
    description: "Implementing mechanisms for continuous user feedback collection and analysis, informing iterative feature enhancements, A/B testing, and product evolution.",
    keywords: ["User Feedback", "A/B Testing", "Feature Flags", "Product Evolution", "Data-Driven Decisions", "Agile Iteration"],
    position: [20, -0.5, 0],
    visited: false
  },
  {
    id: 12,
    title: "Continuous Optimization & Scalability",
    shortTitle: "Optimization & Scalability",
    icon: <Scale className="w-4 h-4" />,
    description: "Ongoing performance tuning, resource optimization, and architectural scaling to handle increasing load and data volumes, ensuring cost-efficiency and future growth readiness.",
    keywords: ["Performance Tuning", "Scalability", "Cost Optimization", "Resource Management", "Load Balancing", "System Resilience"],
    position: [22, 1, -0.5],
    visited: false
  },
  {
    id: 13,
    title: "Comprehensive Documentation & Knowledge Transfer",
    shortTitle: "Documentation & KT",
    icon: <BookOpen className="w-4 h-4" />,
    description: "Creating and maintaining living documentation for codebases, APIs, architecture, and deployment processes, facilitating knowledge transfer and long-term maintainability.",
    keywords: ["Technical Documentation", "API Documentation", "Knowledge Base", "Onboarding", "Maintainability", "Collaboration"],
    position: [24, 0, 0.5],
    visited: false
  }
];

const Workflow = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [steps, setSteps] = useState<WorkflowStep[]>(workflowSteps);
  const [cameraTarget, setCameraTarget] = useState<{
    position: [number, number, number];
    lookAt: [number, number, number];
  } | null>(null);
  
  const progress = (steps.filter(step => step.visited).length / steps.length) * 100;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        handleNextStep();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        handlePrevStep();
      } else if (event.key === 'Home') {
        event.preventDefault();
        handleStepClick(1);
      } else if (event.key === 'End') {
        event.preventDefault();
        handleStepClick(steps.length);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        setActiveStep(null);
        setCameraTarget(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeStep, steps.length]);

  const calculateCameraPosition = (stepPosition: [number, number, number]): {
    position: [number, number, number];
    lookAt: [number, number, number];
  } => {
    const [x, y, z] = stepPosition;
    
    // Calculate optimal camera position based on step location
    const cameraDistance = 6;
    const cameraHeight = 4;
    
    // Position camera at an angle that provides good visibility
    const cameraX = x + cameraDistance * Math.cos(x * 0.1);
    const cameraY = y + cameraHeight;
    const cameraZ = z + cameraDistance * Math.sin(x * 0.1);
    
    return {
      position: [cameraX, cameraY, cameraZ],
      lookAt: stepPosition
    };
  };

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId ? { ...step, visited: true } : step
      )
    );
    
    // Update camera target
    const step = steps.find(s => s.id === stepId);
    if (step) {
      const cameraConfig = calculateCameraPosition(step.position);
      setCameraTarget(cameraConfig);
    }
  };

  const handleNextStep = () => {
    if (activeStep && activeStep < steps.length) {
      const nextStepId = activeStep + 1;
      handleStepClick(nextStepId);
    } else if (!activeStep) {
      handleStepClick(1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep && activeStep > 1) {
      const prevStepId = activeStep - 1;
      handleStepClick(prevStepId);
    }
  };

  const handleStartJourney = () => {
    handleStepClick(1);
  };

  const activeStepData = steps.find(step => step.id === activeStep);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {[...Array(144)].map((_, i) => (
            <div 
              key={i} 
              className="border border-primary/20 animate-pulse"
              style={{ animationDelay: `${(i % 12) * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 px-6 py-12">
        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-display font-bold gradient-text mb-4 animate-fade-in-up">
            My Expert Workflow
          </h1>
          <p className="text-xl md:text-2xl text-neon font-mono mb-6">
            Interactive 3D Journey
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-mono text-muted-foreground">Progress</span>
              <span className="text-sm font-mono text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted/30">
              <div 
                className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` } as React.CSSProperties}
              />
            </div>
          </div>
        </div>

        {/* 3D Canvas Container */}
        <div className="max-w-7xl mx-auto mb-8">
          <Card className="p-2 bg-card/20 backdrop-blur-sm border-secondary/50 cybernetic-border overflow-hidden">
            <div className="h-[600px] rounded-lg overflow-hidden bg-gradient-to-br from-background/50 to-background/80">
              <Canvas
                camera={{ position: [12, 8, 15], fov: 60 }}
                gl={{ alpha: true, antialias: true }}
              >
                <PerspectiveCamera makeDefault />
                
                {/* Camera Controller */}
                <CameraController target={cameraTarget} />
                
                {/* Lighting Setup */}
                <ambientLight intensity={0.2} />
                <directionalLight 
                  position={[20, 20, 10]} 
                  intensity={0.8} 
                  color="#00F0FF"
                />
                <pointLight 
                  position={[-10, -10, -5]} 
                  intensity={0.6} 
                  color="#A300FF"
                />
                <pointLight 
                  position={[30, 5, 5]} 
                  intensity={0.4} 
                  color="#00FF88"
                />
                
                {/* Interactive Controls */}
                <OrbitControls
                  enableZoom={true}
                  enablePan={true}
                  enableRotate={true}
                  maxDistance={50}
                  minDistance={5}
                  maxPolarAngle={Math.PI / 1.5}
                  minPolarAngle={Math.PI / 6}
                  enableDamping={true}
                  dampingFactor={0.05}
                />
                
                {/* Workflow Visualization */}
                <WorkflowVisualization
                  steps={steps}
                  activeStep={activeStep}
                  onStepClick={handleStepClick}
                />
              </Canvas>
            </div>
          </Card>
        </div>

        {/* Detailed Description Panel */}
        {activeStepData && (
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <Card className="p-8 bg-card/40 backdrop-blur-sm border-secondary/30 cybernetic-border shadow-neon">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-primary/20 rounded-lg text-primary">
                  {activeStepData.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <h3 className="text-2xl font-semibold text-foreground">
                        {activeStepData.title}
                      </h3>
                      {activeStepData.visited && (
                        <div className="p-1 bg-green-500/20 rounded-full">
                          <Check className="w-4 h-4 text-green-400" />
                        </div>
                      )}
                    </div>
                    <div className="text-sm font-mono text-muted-foreground">
                      Step {activeStepData.id} of {steps.length}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {activeStepData.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-neon mb-3">Key Technologies & Concepts</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeStepData.keywords.map((keyword) => (
                        <Badge 
                          key={keyword} 
                          variant="outline" 
                          className="text-xs border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      disabled={activeStep === 1}
                      className="border-primary/30 text-primary hover:bg-primary/10"
                    >
                      ← Previous Step
                    </Button>
                    
                    <div className="flex gap-2">
                      {steps.slice(0, 5).map((step) => (
                        <button
                          key={step.id}
                          onClick={() => handleStepClick(step.id)}
                          title={`Go to ${step.shortTitle}`}
                          aria-label={`Go to step ${step.id}: ${step.shortTitle}`}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            step.id === activeStep 
                              ? 'bg-primary shadow-neon' 
                              : step.visited 
                                ? 'bg-green-400' 
                                : 'bg-muted-foreground/30 hover:bg-primary/50'
                          }`}
                        />
                      ))}
                      {steps.length > 5 && (
                        <>
                          <span className="text-muted-foreground">...</span>
                          {steps.slice(-3).map((step) => (
                            <button
                              key={step.id}
                              onClick={() => handleStepClick(step.id)}
                              title={`Go to ${step.shortTitle}`}
                              aria-label={`Go to step ${step.id}: ${step.shortTitle}`}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                step.id === activeStep 
                                  ? 'bg-primary shadow-neon' 
                                  : step.visited 
                                    ? 'bg-green-400' 
                                    : 'bg-muted-foreground/30 hover:bg-primary/50'
                              }`}
                            />
                          ))}
                        </>
                      )}
                    </div>
                    
                    <Button
                      onClick={handleNextStep}
                      disabled={activeStep === steps.length}
                      className="bg-gradient-primary text-primary-foreground hover:shadow-neon"
                    >
                      Next Step →
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Instructions */}
        {!activeStep && (
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up workflow-instructions-delay">
            <Card className="p-8 bg-card/20 backdrop-blur-sm border-primary/20 cybernetic-border">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Explore the Development Journey
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Navigate through the 3D workflow visualization above. Click on any node to learn about that stage of the development process. Use your mouse to rotate, zoom, and explore the interactive 3D environment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleStartJourney}
                  className="bg-gradient-primary text-primary-foreground hover:shadow-neon transform hover:scale-105 transition-all duration-300"
                >
                  🚀 Start the Journey
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleStepClick(Math.floor(Math.random() * steps.length) + 1)}
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  🎲 Random Step
                </Button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <p>💡 <strong>Tip:</strong> Green checkmarks appear on visited steps</p>
                  <p>🖱️ <strong>3D Controls:</strong> Click + drag to rotate, scroll to zoom</p>
                </div>
                <div>
                  <p>⌨️ <strong>Keyboard:</strong> ← → arrows to navigate</p>
                  <p>🏠 <strong>Quick nav:</strong> Home/End keys, Esc to close</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workflow;
