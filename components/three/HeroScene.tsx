'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { projectsMetadata, ProjectMetadata } from '@/lib/projects';
import { usePageTransition } from '@/components/transitions/TransitionContext';

// Define fixed 3D coordinates for all 18 nodes in the constellation
const nodePositions: { [slug: string]: [number, number, number] } = {
  slopslayer: [-3, 2, -2],
  opinionminer: [-1, 2.5, -3],
  nutrilogic: [1.5, 2, -2.5],
  'ai-course-recommender': [3.5, 1.5, -2],
  
  dira: [-2, 0, -1],
  diffgeo: [0, 0.5, -2],
  musicgame: [2.5, -0.5, -1.5],
  
  spiks: [-2.5, -2, -2],
  'legacy-core': [0.5, -2.5, -2.5],
  miniecommerce: [3, -2, -2],
  'quickfood-frontend': [4.5, -1.5, -2],
  'the-househub': [2, -3.2, -1.8],
  
  intuilab: [-3.5, -4, -3],
  ukweli: [-1.5, -4.5, -2.5],
  nyaraka: [0.5, -4.5, -3],
  veld: [2.5, -4, -2.5],
  'digital-economy': [4.5, -3.5, -3],
  
  collab: [1, -1, -4], // central offset
};

// Define lines connecting nodes (based on tracks and bridges)
const connections = [
  // AI & Models Track
  ['slopslayer', 'opinionminer'],
  ['opinionminer', 'nutrilogic'],
  ['nutrilogic', 'ai-course-recommender'],
  
  // Spatial & Geometry Track
  ['dira', 'diffgeo'],
  ['diffgeo', 'musicgame'],
  
  // Architectures & Backends Track
  ['spiks', 'legacy-core'],
  ['legacy-core', 'miniecommerce'],
  ['miniecommerce', 'quickfood-frontend'],
  ['quickfood-frontend', 'the-househub'],
  
  // Civic Data & Archives Track
  ['intuilab', 'ukweli'],
  ['ukweli', 'nyaraka'],
  ['nyaraka', 'veld'],
  ['veld', 'digital-economy'],

  // Thematic cross-track bridges (subtle connections)
  ['ai-course-recommender', 'dira'],
  ['musicgame', 'spiks'],
  ['the-househub', 'intuilab'],
];

interface NodeProps {
  project: ProjectMetadata;
  position: [number, number, number];
  onNodeClick: (slug: string) => void;
}

function Node({ project, position, onNodeClick }: NodeProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  // Animate node hover scale
  useFrame(() => {
    if (!meshRef.current) return;
    const targetScale = hovered ? 1.8 : 1.0;
MeshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
  });

  return (
    <group position={position}>
      {/* Fake Bloom (larger transparent sphere) */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color={project.accentColor}
          transparent
          opacity={hovered ? 0.25 : 0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main Node Sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onNodeClick(project.slug);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={project.accentColor} />
      </mesh>

      {/* Dynamic Drei HTML Label */}
      <Html
        distanceFactor={6}
        center
        style={{
          pointerEvents: 'none',
          transition: 'all 0.2s ease',
          opacity: hovered ? 1 : 0.4,
          transform: `scale(${hovered ? 1.1 : 0.9})`,
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

function ConstellationLines() {
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

  return (
    <lineSegments>
      <bufferGeometry ref={lineGeometryRef} />
      <lineBasicMaterial
        color="#262626"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function SceneOrchestrator() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const { startTransition } = usePageTransition();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -1 to 1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Ambient camera drift + mouse parallax
  useFrame(() => {
    // slow continuous oscillation
    const time = clock.getElapsedTime() * 0.15;
    const targetX = Math.sin(time) * 0.8 + mouse.current.x * 0.4;
    const targetY = Math.cos(time) * 0.6 + mouse.current.y * 0.3;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, -1, -3);
  });

  const { clock } = useThree();

  const handleNodeClick = (slug: string) => {
    startTransition(`/work/${slug}`, window.innerWidth / 2);
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <ConstellationLines />
      {projectsMetadata.map((project) => {
        const position = nodePositions[project.slug];
        if (!position) return null;
        return (
          <Node
            key={project.slug}
            project={project}
            position={position}
            onNodeClick={handleNodeClick}
          />
        );
      })}
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-auto bg-canvas-bg">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <SceneOrchestrator />
      </Canvas>
    </div>
  );
}
