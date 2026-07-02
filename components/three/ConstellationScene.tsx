'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { projectsMetadata, ProjectMetadata } from '@/lib/projects';
import { usePageTransition } from '@/components/transitions/TransitionContext';

// Dynamically compute the spherical coordinate positions of all projects
const numProjects = projectsMetadata.length;
export const sphericalPositions: { [slug: string]: [number, number, number] } = {};

projectsMetadata.forEach((project, idx) => {
  const radius = 2.4; // Slightly compact sphere for perfect framing
  const offset = 2 / numProjects;
  const increment = Math.PI * (3 - Math.sqrt(5)); // Golden angle
  
  const y = ((idx * offset) - 1) + (offset / 2);
  const r = Math.sqrt(1 - y * y);
  const phi = idx * increment;
  
  const x = Math.cos(phi) * r;
  const z = Math.sin(phi) * r;
  
  sphericalPositions[project.slug] = [x * radius, y * radius, z * radius];
});

const connections = [
  ['slopslayer', 'opinionminer'],
  ['opinionminer', 'nutrilogic'],
  ['nutrilogic', 'ai-course-recommender'],
  
  ['dira', 'diffgeo'],
  ['diffgeo', 'musicgame'],
  
  ['spiks', 'legacy-core'],
  ['legacy-core', 'miniecommerce'],
  ['miniecommerce', 'quickfood-frontend'],
  ['quickfood-frontend', 'the-househub'],
  
  ['intuilab', 'ukweli'],
  ['ukweli', 'nyaraka'],
  ['nyaraka', 'veld'],
  ['veld', 'digital-economy'],
  
  // Subtle cross-track structural links
  ['ai-course-recommender', 'dira'],
  ['musicgame', 'spiks'],
  ['the-househub', 'intuilab'],
];

interface NodeProps {
  project: ProjectMetadata;
  position: [number, number, number];
  activeFilter: string;
  onNodeClick: (slug: string) => void;
}

function ConstellationNode({ project, position, activeFilter, onNodeClick }: NodeProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Dim node if it doesn't match active track filter
  const isDimmed = activeFilter !== 'All' && project.track !== activeFilter;

  useFrame(() => {
    if (!meshRef.current) return;
    const targetScale = hovered ? 1.6 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
  });

  return (
    <group position={position}>
      {/* Glow */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color={project.accentColor}
          transparent
          opacity={isDimmed ? 0.01 : (hovered ? 0.25 : 0.08)}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Interactive Node */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          if (!isDimmed) onNodeClick(project.slug);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (!isDimmed) {
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial 
          color={project.accentColor}
          transparent
          opacity={isDimmed ? 0.15 : 1}
        />
      </mesh>

      {/* Label */}
      <Html
        distanceFactor={6}
        center
        style={{
          pointerEvents: 'none',
          transition: 'opacity 0.4s ease, transform 0.2s ease',
          opacity: isDimmed ? 0.1 : (hovered ? 1 : 0.5),
          transform: `scale(${hovered ? 1.05 : 0.95})`,
        }}
      >
        <div className="flex flex-col items-center">
          <span 
            className="text-[9px] font-mono whitespace-nowrap px-1.5 py-0.5 rounded bg-canvas-bg/85 border border-canvas-border text-canvas-text shadow-md shadow-black/35"
            style={{ borderColor: hovered ? project.accentColor : 'var(--color-canvas-border)' }}
          >
            {project.title}
          </span>
        </div>
      </Html>
    </group>
  );
}

function ConstellationLines({ activeFilter }: { activeFilter: string }) {
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    if (!lineGeometryRef.current) return;

    const points: THREE.Vector3[] = [];
    connections.forEach(([startSlug, endSlug]) => {
      const start = sphericalPositions[startSlug];
      const end = sphericalPositions[endSlug];
      if (start && end) {
        points.push(new THREE.Vector3(...start));
        points.push(new THREE.Vector3(...end));
      }
    });

    lineGeometryRef.current.setFromPoints(points);
  }, []);

  // Make lines darker/dimmed when filtering
  const isFiltering = activeFilter !== 'All';

  return (
    <lineSegments>
      <bufferGeometry ref={lineGeometryRef} />
      <lineBasicMaterial
        color="#3a8c6e"
        transparent
        opacity={isFiltering ? 0.10 : 0.35}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function SceneOrchestrator({ activeFilter }: { activeFilter: string }) {
  const { camera, clock } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const { startTransition } = usePageTransition();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll-driven camera pullback Z=5 -> Z=10
    const trigger = ScrollTrigger.create({
      trigger: '#constellation-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        // pull back camera dynamically from z=5 to z=9
        camera.position.z = 5 + self.progress * 4;
        camera.position.y = -self.progress * 1.5;
        camera.lookAt(0, 0, 0);
      }
    });

    return () => {
      trigger.kill();
    };
  }, [camera]);

  useFrame(() => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime();
    // Rotate the entire spherical cluster slowly in 3D
    groupRef.current.rotation.y = time * 0.05;
    groupRef.current.rotation.x = Math.sin(time * 0.03) * 0.08;
    // Add a tiny bit of continuous vertical drift
    groupRef.current.position.y = Math.sin(time * 0.2) * 0.1;
  });

  const handleNodeClick = (slug: string) => {
    startTransition(`/work/${slug}`, window.innerWidth / 2, window.innerHeight / 2);
  };

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <ConstellationLines activeFilter={activeFilter} />
      {projectsMetadata.map((project) => {
        const position = sphericalPositions[project.slug];
        if (!position) return null;
        return (
          <ConstellationNode
            key={project.slug}
            project={project}
            position={position}
            activeFilter={activeFilter}
            onNodeClick={handleNodeClick}
          />
        );
      })}
    </group>
  );
}

export default function ConstellationScene({ activeFilter }: { activeFilter: string }) {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-auto bg-canvas-bg">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <SceneOrchestrator activeFilter={activeFilter} />
      </Canvas>
    </div>
  );
}
