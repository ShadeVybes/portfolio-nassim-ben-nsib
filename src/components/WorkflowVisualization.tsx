import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Check } from 'lucide-react';

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

interface WorkflowVisualizationProps {
  steps: WorkflowStep[];
  activeStep: number | null;
  onStepClick: (stepId: number) => void;
}

const WorkflowNode = ({ 
  step, 
  isActive, 
  isHovered, 
  onHover, 
  onClick 
}: {
  step: WorkflowStep;
  isActive: boolean;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = step.position[1] + Math.sin(state.clock.elapsedTime * 2 + step.id) * 0.15;
      
      // Rotation animation - slower for better visibility
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + step.id;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 + step.id * 0.5;
    }
  });

  // Enhanced scaling for better visual feedback
  const scale = isActive ? 1.6 : isHovered ? 1.3 : 1;
  const emissiveIntensity = isActive ? 0.8 : isHovered ? 0.6 : 0.3;
  const color = isActive ? "#A300FF" : isHovered ? "#00FF88" : "#00F0FF";

  return (
    <group ref={groupRef} position={step.position}>
      {/* Outer glow ring for better visibility */}
      {(isActive || isHovered) && (
        <mesh scale={scale * 1.2}>
          <torusGeometry args={[0.8, 0.05, 8, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}

      {/* Main Node */}
      <mesh
        ref={meshRef}
        scale={scale}
        onClick={onClick}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
      >
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Visited Checkmark - Enhanced */}
      {step.visited && (
        <mesh position={[0, 0, 0.8]} scale={0.4}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#00FF88"
            emissive="#00FF88"
            emissiveIntensity={0.6}
          />
        </mesh>
      )}

      {/* 2D Label - Enhanced */}
      <Html
        position={[0, 0, 1.2]}
        center
        distanceFactor={10}
        occlude
        style={{
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        <div className={`bg-background/95 backdrop-blur-sm border rounded-lg px-3 py-2 min-w-[140px] text-center transition-all duration-300 ${
          isActive 
            ? 'border-secondary/60 shadow-neon scale-110' 
            : isHovered 
              ? 'border-primary/50 scale-105' 
              : 'border-primary/30'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className={`text-xs transition-colors ${
              isActive ? 'text-secondary' : 'text-primary'
            }`}>
              {step.icon}
            </div>
            {step.visited && (
              <Check className="w-3 h-3 text-green-400" />
            )}
          </div>
          <div className={`text-xs font-mono font-medium transition-colors ${
            isActive ? 'text-foreground' : 'text-muted-foreground'
          }`}>
            {step.shortTitle}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Step {step.id}
          </div>
        </div>
      </Html>
    </group>
  );
};

const ConnectionLine = ({ 
  start, 
  end 
}: { 
  start: [number, number, number]; 
  end: [number, number, number] 
}) => {
  const points = [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ];
  
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ 
      color: "#00F0FF", 
      transparent: true, 
      opacity: 0.8,
      linewidth: 3
    }))} />
  );
};

const WorkflowVisualization = ({ 
  steps, 
  activeStep, 
  onStepClick 
}: WorkflowVisualizationProps) => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const { camera, controls } = useThree();
  
  // Camera animation state
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const cameraLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const isAnimatingRef = useRef(false);
  const animationProgressRef = useRef(0);

  // Update camera target when active step changes
  useEffect(() => {
    if (activeStep) {
      const step = steps.find(s => s.id === activeStep);
      if (step) {
        // Calculate optimal camera position relative to the step
        const stepPosition = new THREE.Vector3(...step.position);
        
        // Position camera at an angle above and to the side of the step
        const cameraOffset = new THREE.Vector3(4, 3, 5);
        const targetPosition = stepPosition.clone().add(cameraOffset);
        
        cameraTargetRef.current.copy(targetPosition);
        cameraLookAtRef.current.copy(stepPosition);
        isAnimatingRef.current = true;
        animationProgressRef.current = 0;
        
        // Disable orbit controls during animation
        if (controls) {
          controls.enabled = false;
        }
      }
    }
  }, [activeStep, steps, controls]);

  // Smooth camera animation
  useFrame((state, delta) => {
    if (isAnimatingRef.current) {
      animationProgressRef.current += delta * 2; // Animation speed
      
      if (animationProgressRef.current >= 1) {
        // Animation complete
        animationProgressRef.current = 1;
        isAnimatingRef.current = false;
        
        // Re-enable orbit controls
        if (controls) {
          controls.enabled = true;
          controls.target.copy(cameraLookAtRef.current);
          controls.update();
        }
      }
      
      // Smooth easing function (ease-out)
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const progress = easeOut(Math.min(animationProgressRef.current, 1));
      
      // Interpolate camera position
      camera.position.lerp(cameraTargetRef.current, progress * 0.1);
      
      // Update camera look-at
      camera.lookAt(cameraLookAtRef.current);
      camera.updateProjectionMatrix();
    }
  });

  const handleStepClick = (stepId: number) => {
    onStepClick(stepId);
  };

  return (
    <group>
      {/* Connecting Lines */}
      {steps.slice(0, -1).map((step, index) => (
        <ConnectionLine
          key={`line-${step.id}`}
          start={step.position}
          end={steps[index + 1].position}
        />
      ))}

      {/* Workflow Nodes */}
      {steps.map((step) => (
        <WorkflowNode
          key={step.id}
          step={step}
          isActive={activeStep === step.id}
          isHovered={hoveredStep === step.id}
          onHover={(hovered) => setHoveredStep(hovered ? step.id : null)}
          onClick={() => handleStepClick(step.id)}
        />
      ))}

      {/* Camera Focus Indicator - Shows where camera is focusing */}
      {activeStep && (
        <mesh
          position={steps.find(s => s.id === activeStep)?.position || [0, 0, 0]}
        >
          <torusGeometry args={[1.2, 0.02, 8, 32]} />
          <meshBasicMaterial
            color="#A300FF"
            transparent
            opacity={0.4}
          />
        </mesh>
      )}

      {/* Ambient Particles */}
      {[...Array(30)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 10
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial
            color="#00F0FF"
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

export default WorkflowVisualization;
