import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CyberneticModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const dataNodesRef = useRef<THREE.Group>(null);

  // Create a pulsing animation state
  const pulsePhase = useRef(0);

  useFrame((state) => {
    pulsePhase.current += 0.02;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (coreRef.current) {
      coreRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      // Add pulsing effect to core
      const pulse = 1 + Math.sin(pulsePhase.current) * 0.1;
      coreRef.current.scale.setScalar(pulse);
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    }
    if (dataNodesRef.current) {
      // Animate data nodes in orbital motion
      dataNodesRef.current.children.forEach((node, i) => {
        const angle = state.clock.elapsedTime * 0.5 + (i * Math.PI * 2) / 6;
        const radius = 3 + Math.sin(state.clock.elapsedTime + i) * 0.3;
        node.position.x = Math.cos(angle) * radius;
        node.position.y = Math.sin(angle) * radius;
        node.rotation.x = state.clock.elapsedTime * 2;
        node.rotation.y = state.clock.elapsedTime * 1.5;
      });
    }
  });

  // Generate random positions for ambient particles
  const particlePositions = useMemo(() => {
    return Array.from({ length: 30 }, () => [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6
    ]);
  }, []);

  return (
    <group ref={groupRef}>
      {/* Central Core - Enhanced */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Inner energy core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#A300FF"
          emissive="#A300FF"
          emissiveIntensity={0.6}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Orbital Rings - Enhanced */}
      <group ref={ringsRef}>
        {/* Primary ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.08, 8, 32]} />
          <meshStandardMaterial
            color="#A300FF"
            emissive="#A300FF"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Secondary ring */}
        <mesh rotation={[0, Math.PI / 3, 0]}>
          <torusGeometry args={[2.8, 0.06, 8, 32]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={0.2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Tertiary ring */}
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[3.4, 0.04, 6, 24]} />
          <meshStandardMaterial
            color="#00FF88"
            emissive="#00FF88"
            emissiveIntensity={0.15}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Data Nodes - Enhanced with orbital motion */}
      <group ref={dataNodesRef}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i}>
            <octahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial
              color="#00FF88"
              emissive="#00FF88"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Energy connectors */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const x = Math.cos(angle) * 4;
        const y = Math.sin(angle) * 4;
        return (
          <mesh
            key={`connector-${i}`}
            position={[x, y, 0]}
          >
            <cylinderGeometry args={[0.02, 0.02, 1, 6]} />
            <meshStandardMaterial
              color="#00F0FF"
              emissive="#00F0FF"
              emissiveIntensity={0.3}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}

      {/* Ambient particles - Enhanced */}
      {particlePositions.map(([x, y, z], i) => (
        <mesh
          key={i}
          position={[x, y, z]}
        >
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial
            color="#00F0FF"
            transparent
            opacity={0.4 + Math.sin(i) * 0.2}
          />
        </mesh>
      ))}

      {/* Data streams */}
      {[...Array(4)].map((_, i) => (
        <mesh
          key={`stream-${i}`}
          position={[
            Math.cos(i * Math.PI / 2) * 5,
            Math.sin(i * Math.PI / 2) * 5,
            (Math.random() - 0.5) * 2
          ]}
        >
          <boxGeometry args={[0.05, 0.05, 2]} />
          <meshStandardMaterial
            color="#A300FF"
            emissive="#A300FF"
            emissiveIntensity={0.4}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

export default CyberneticModel;