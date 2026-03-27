"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function VortexParticles({ count = 8000 }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color('#0f172a'), // deep purple/slate
      new THREE.Color('#06b6d4'), // cyan
      new THREE.Color('#7e22ce'), // purple
      new THREE.Color('#000000'), // black
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spiral math
      const radius = Math.random() * 5;
      const spinAngle = radius * 5;
      const branchAngle = ((i % 3) * 2 * Math.PI) / 3;

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3;

      positions[i3] = Math.cos(spinAngle + branchAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(spinAngle + branchAngle) * radius + randomZ;

      const mixedColor = colorPalette[Math.floor(Math.random() * colorPalette.length)].clone();
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group rotation={[Math.PI / 6, 0, 0]}>
      <Points ref={pointsRef} positions={particles.positions} colors={particles.colors} stride={3}>
        <PointMaterial
          transparent
          vertexColors
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function GalaxyBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#030303]">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <VortexParticles />
      </Canvas>
    </div>
  );
}
