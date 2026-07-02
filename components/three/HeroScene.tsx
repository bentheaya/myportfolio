'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { projectsMetadata, ProjectMetadata } from '@/lib/projects';
import { usePageTransition } from '@/components/transitions/TransitionContext';

// ─── Node positions ───────────────────────────────────────────────────────────
// Y range is constrained to roughly [-3, 2.5] so nodes stay inside a single
// viewport height at fov=60, camera z=5. Farther nodes are revealed by scroll.
const nodePositions: { [slug: string]: [number, number, number] } = {
  // Top cluster (visible immediately)
  slopslayer:               [-3,    2,    -2],
  opinionminer:             [-1,    2.2,  -3],
  nutrilogic:               [1.5,   2,    -2.5],
  'ai-course-recommender':  [3.5,   1.5,  -2],

  // Mid cluster
  dira:                     [-2,    0.2,  -1],
  diffgeo:                  [0,     0.5,  -2],
  musicgame:                [2.5,  -0.5,  -1.5],
  collab:                   [1,    -0.8,  -4],

  // Lower cluster (revealed on scroll)
  spiks:                    [-2.5, -2,    -2],
  'legacy-core':            [0.5,  -2.2,  -2.5],
  miniecommerce:            [3,    -2,    -2],
  'quickfood-frontend':     [4.5,  -1.5,  -2],
  'the-househub':           [2,    -3,    -1.8],

  // Bottom cluster (revealed further on scroll)
  intuilab:                 [-3.5, -3.8,  -3],
  ukweli:                   [-1.5, -4.2,  -2.5],
  nyaraka:                  [0.5,  -4.2,  -3],
  veld:                     [2.5,  -3.8,  -2.5],
  'digital-economy':        [4.5,  -3.2,  -3],
};

// ─── Graph edges ─────────────────────────────────────────────────────────────
const connections: [string, string][] = [
  ['slopslayer',            'opinionminer'],
  ['opinionminer',          'nutrilogic'],
  ['nutrilogic',            'ai-course-recommender'],
  ['dira',                  'diffgeo'],
  ['diffgeo',               'musicgame'],
  ['spiks',                 'legacy-core'],
  ['legacy-core',           'miniecommerce'],
  ['miniecommerce',         'quickfood-frontend'],
  ['quickfood-frontend',    'the-househub'],
  ['intuilab',              'ukweli'],
  ['ukweli',                'nyaraka'],
  ['nyaraka',               'veld'],
  ['veld',                  'digital-economy'],
  // Cross-track bridges
  ['ai-course-recommender', 'dira'],
  ['musicgame',             'spiks'],
  ['the-househub',          'intuilab'],
  // Hub spokes
  ['collab',                'diffgeo'],
  ['collab',                'legacy-core'],
  ['collab',                'dira'],
];

const EDGE_COLOR        = '#3a8c6e';
const EDGE_COLOR_BRIDGE = '#2a5e4a';
const EDGE_OPACITY      = 0.6;

// ─── Node ────────────────────────────────────────────────────────────────────
interface NodeProps {
  project: ProjectMetadata;
  position: [number, number, number];
  onNodeClick: (slug: string) => void;
}

function Node({ project, position, onNodeClick }: NodeProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(Math.random() * 100);

  useFrame(() => {
    if (!meshRef.current || !glowRef.current) return;
    const targetScale = hovered ? 1.9 : 1.0;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.12
    );
    timeRef.current += 0.018;
    const breathe = 1 + Math.sin(timeRef.current) * 0.25;
    glowRef.current.scale.setScalar(breathe);
    (glowRef.current.material as THREE.MeshBasicMaterial).opacity = hovered
      ? 0.3
      : 0.07 + Math.sin(timeRef.current) * 0.03;
  });

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial
          color={project.accentColor}
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onNodeClick(project.slug); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshBasicMaterial color={project.accentColor} />
      </mesh>
      <Html
        distanceFactor={6}
        center
        style={{
          pointerEvents: 'none',
          transition: 'all 0.25s ease',
          opacity: hovered ? 1 : 0.35,
          transform: `scale(${hovered ? 1.1 : 0.85})`,
          userSelect: 'none',
        }}
      >
        <div className="flex flex-col items-center">
          <span
            className="text-[9px] font-mono whitespace-nowrap px-1.5 py-0.5 rounded bg-canvas-bg/90 border text-canvas-text"
            style={{ borderColor: hovered ? project.accentColor : 'rgba(38,38,38,0.8)' }}
          >
            {project.title}
          </span>
        </div>
      </Html>
    </group>
  );
}

// ─── Graph edges ─────────────────────────────────────────────────────────────
function GraphEdges() {
  const primaryRef = useRef<THREE.BufferGeometry>(null);
  const bridgeRef  = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    const primary = connections.slice(0, -4);
    const bridges = connections.slice(-4);

    const buildPoints = (edges: [string, string][]) => {
      const pts: THREE.Vector3[] = [];
      edges.forEach(([a, b]) => {
        const posA = nodePositions[a];
        const posB = nodePositions[b];
        if (posA && posB) {
          pts.push(new THREE.Vector3(...posA));
          pts.push(new THREE.Vector3(...posB));
        }
      });
      return pts;
    };

    if (primaryRef.current) primaryRef.current.setFromPoints(buildPoints(primary));
    if (bridgeRef.current)  bridgeRef.current.setFromPoints(buildPoints(bridges));
  }, []);

  return (
    <>
      <lineSegments>
        <bufferGeometry ref={primaryRef} />
        <lineBasicMaterial color={EDGE_COLOR} transparent opacity={EDGE_OPACITY} depthWrite={false} />
      </lineSegments>
      <lineSegments>
        <bufferGeometry ref={bridgeRef} />
        <lineBasicMaterial color={EDGE_COLOR_BRIDGE} transparent opacity={EDGE_OPACITY * 0.5} depthWrite={false} />
      </lineSegments>
    </>
  );
}

// ─── Scene Orchestrator ───────────────────────────────────────────────────────
function SceneOrchestrator({ heroHeight }: { heroHeight: number }) {
  const { camera, clock } = useThree();
  const mouse      = useRef({ x: 0, y: 0 });
  const scrollY    = useRef(0);
  const { startTransition } = usePageTransition();

  // Track mouse for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track scroll — only within the hero section height
  useEffect(() => {
    const handleScroll = () => {
      // Clamp so scroll only affects camera within the hero section
      scrollY.current = Math.min(window.scrollY, heroHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroHeight]);

  useFrame(() => {
    const time = clock.getElapsedTime() * 0.14;

    // Scroll-parallax: as user scrolls down hero, camera moves down to reveal lower nodes
    // scrollProgress: 0 (top) → 1 (bottom of hero)
    const scrollProgress = heroHeight > 0 ? scrollY.current / heroHeight : 0;
    // Camera Y starts at 0, goes to -3.5 as you scroll the full hero height
    const scrollCameraY  = -scrollProgress * 3.5;

    // Gentle ambient drift + mouse parallax
    const targetX = Math.sin(time) * 0.7 + mouse.current.x * 0.35;
    const targetY = Math.cos(time) * 0.4 + mouse.current.y * 0.25 + scrollCameraY;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, scrollCameraY - 0.5, -3);
  });

  const handleNodeClick = (slug: string) => {
    startTransition(`/work/${slug}`, window.innerWidth / 2);
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <GraphEdges />
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

// ─── Canvas root ─────────────────────────────────────────────────────────────
export default function HeroScene({ heroHeight }: { heroHeight: number }) {
  return (
    // bg-transparent + no bg class = WebGL alpha punches through to the photo
    <div className="absolute inset-0 z-[1] w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <SceneOrchestrator heroHeight={heroHeight} />
      </Canvas>
    </div>
  );
}
