import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function RotatingBlob() {
  const mesh = useRef<Mesh | null>(null);
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.15;
    mesh.current.rotation.x += delta * 0.07;
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.2, 4]} />
      <meshStandardMaterial color="#7684ff" metalness={0.2} roughness={0.35} />
    </mesh>
  );
}

export default function ThreeHeroCanvas() {
  const prefersReducedMotion = usePrefersReducedMotion();
  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 z-0 pointer-events-none select-none">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 3, 3]} intensity={1.0} />
        <group position={[0, 0, 0]}>
          <RotatingBlob />
        </group>
      </Canvas>
    </div>
  );
}

