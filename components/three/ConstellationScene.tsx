'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { projectsMetadata, ProjectMetadata } from '@/lib/projects';
import { usePageTransition } from '@/components/transitions/TransitionContext';

// Define fixed 3D coordinates for all projects in a clean centered constellation
const nodePositions: { [slug: string]: [number, number, number] } = {
  slopslayer: [-2.5, 2, -1],
  opinionminer: [-1.2, 1, -2],
  nutrilogic: [0.5, 1.8, -1.5],
  'ai-course-recommender': [2.2, 1.2, -1.2],
  
  dira: [-1.8, -0.5, 0],
  diffgeo: [0.2, 0.2, -1],
  musicgame: [2, -0.2, -0.8],
  
  spiks: [-2.2, -1.8, -1],
  'legacy-core': [0.2, -2, -1.5],
  miniecommerce: [2.2, -1.5, -0.8],
  'quickfood-frontend': [3.5, -1.2, -1],
  'the-househub': [1.5, -2.8, -1.2],
  
  intuilab: [-3, -3.2, -2],
  ukweli: [-1.2, -3.5, -1.5],
  nyaraka: [0.8, -3.5, -2],
  veld: [2.5, -3, -1.5],
  'digital-economy': [4.2, -2.5, -2],
  
  collab: [1, -0.8, -3],
};

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
            className="text-[9px] font-mono whitespace-nowrap px-1.5 py-0.5 rounded bg-canvas-bg/85 border border-canvas-border text-canvas-text"
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
      const start = nodePositions[startSlug];
      const end = nodePositions[endSlug];
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
        color="#262626"
        transparent
        opacity={isFiltering ? 0.15 : 0.4}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function SceneOrchestrator({ activeFilter }: { activeFilter: string }) {
  const { camera } = useThree();
  const { startTransition } = usePageTransition();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll-driven camera pullback Z=5 -> Z=12
    const trigger = ScrollTrigger.create({
      trigger: '#constellation-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        // pull back camera dynamically from z=5 to z=12
        camera.position.z = 5 + self.progress * 7;
        camera.position.y = -self.progress * 2;
        camera.lookAt(0, -1, -3);
      }
    });

    return () => {
      trigger.kill();
    };
  }, [camera]);

  const handleNodeClick = (slug: string) => {
    startTransition(`/work/${slug}`, window.innerWidth / 2);
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <ConstellationLines activeFilter={activeFilter} />
      {projectsMetadata.map((project) => {
        const position = nodePositions[project.slug];
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
    </>
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
