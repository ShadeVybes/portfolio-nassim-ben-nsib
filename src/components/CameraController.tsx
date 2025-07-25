import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraControllerProps {
  target?: {
    position: [number, number, number];
    lookAt: [number, number, number];
  } | null;
  animationSpeed?: number;
  onAnimationComplete?: () => void;
}

const CameraController = ({ 
  target,
  animationSpeed = 2,
  onAnimationComplete 
}: CameraControllerProps) => {
  const { camera, controls } = useThree();
  const animationProgressRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const initialPositionRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const initialTargetRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const targetPositionRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const lookAtPositionRef = useRef<THREE.Vector3>(new THREE.Vector3());

  useEffect(() => {
    if (target) {
      // Store current positions
      initialPositionRef.current.copy(camera.position);
      if (controls && 'target' in controls) {
        initialTargetRef.current.copy(controls.target as THREE.Vector3);
      }
      
      // Set new targets
      targetPositionRef.current.set(...target.position);
      lookAtPositionRef.current.set(...target.lookAt);
      
      // Start animation
      animationProgressRef.current = 0;
      isAnimatingRef.current = true;
      
      // Disable controls during animation
      if (controls && 'enabled' in controls) {
        (controls as any).enabled = false;
      }
    }
  }, [target, camera, controls]);

  useFrame((state, delta) => {
    if (isAnimatingRef.current) {
      animationProgressRef.current += delta * animationSpeed;
      
      if (animationProgressRef.current >= 1) {
        // Animation complete
        animationProgressRef.current = 1;
        isAnimatingRef.current = false;
        
        // Re-enable controls and update target
        if (controls && 'enabled' in controls && 'target' in controls) {
          (controls as any).enabled = true;
          (controls.target as THREE.Vector3).copy(lookAtPositionRef.current);
          if ('update' in controls) {
            (controls as any).update();
          }
        }
        
        onAnimationComplete?.();
      }
      
      // Smooth easing function (ease-in-out)
      const easeInOut = (t: number) => {
        return t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      
      const progress = easeInOut(Math.min(animationProgressRef.current, 1));
      
      // Interpolate camera position
      camera.position.lerpVectors(
        initialPositionRef.current,
        targetPositionRef.current,
        progress
      );
      
      // Interpolate look-at target
      const currentLookAt = new THREE.Vector3().lerpVectors(
        initialTargetRef.current,
        lookAtPositionRef.current,
        progress
      );
      
      camera.lookAt(currentLookAt);
      camera.updateProjectionMatrix();
    }
  });

  return null;
};

export default CameraController;
