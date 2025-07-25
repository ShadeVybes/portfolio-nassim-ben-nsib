import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import CyberneticModel from './CyberneticModel';

const Scene3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-auto">
      <Canvas
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8} 
          color="#00F0FF"
        />
        <pointLight 
          position={[-10, -10, -5]} 
          intensity={0.5} 
          color="#A300FF"
        />
        
        {/* Interactive Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        
        {/* 3D Model */}
        <Suspense fallback={null}>
          <CyberneticModel />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;