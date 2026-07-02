'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { projectsMetadata, ProjectMetadata } from '@/lib/projects';
import { usePageTransition } from '@/components/transitions/TransitionContext';

// ─── Node positions in 3D space ────────────────────────────────────────────
const nodePositions: { [slug: string]: [number, number, number] } = {
  slopslayer:               [-3,    2,    -2],
  opinionminer:             [-1,    2.5,  -3],
  nutrilogic:               [1.5,   2,    -2.5],
  'ai-course-recommender':  [3.5,   1.5,  -2],

  dira:                     [-2,    0,    -1],
  diffgeo:                  [0,     0.5,  -2],
  musicgame:                [2.5,  -0.5,  -1.5],

  spiks:                    [-2.5, -2,    -2],
  'legacy-core':            [0.5,  -2.5,  -2.5],
  miniecommerce:            [3,    -2,    -2],
  'quickfood-frontend':     [4.5,  -1.5,  -2],
  'the-househub':           [2,    -3.2,  -1.8],

  intuilab:                 [-3.5, -4,    -3],
  ukweli:                   [-1.5, -4.5,  -2.5],
  nyaraka:                  [0.5,  -4.5,  -3],
  veld:                     [2.5,  -4,    -2.5],
  'digital-economy':        [4.5,  -3.5,  -3],

  collab:                   [1,    -1,    -4],
};

// ─── Edges (graph connections between nodes) ────────────────────────────────
const connections: [string, string][] = [
  // AI & Models Track
  ['slopslayer',            'opinionminer'],
  ['opinionminer',          'nutrilogic'],
  ['nutrilogic',            'ai-course-recommender'],

  // Spatial & Geometry Track
  ['dira',                  'diffgeo'],
  ['diffgeo',               'musicgame'],

  // Architectures & Backends Track
  ['spiks',                 'legacy-core'],
  ['legacy-core',           'miniecommerce'],
  ['miniecommerce',         'quickfood-frontend'],
  ['quickfood-frontend',    'the-househub'],

  // Civic Data & Archives Track
  ['intuilab',              'ukweli'],
  ['ukweli',                'nyaraka'],
  ['nyaraka',               'veld'],
  ['veld',                  'digital-economy'],

  // Cross-track bridges
  ['ai-course-recommender', 'dira'],
  ['musicgame',             'spiks'],
  ['the-househub',          'intuilab'],

  // Central hub spokes via collab
  ['collab',                'diffgeo'],
  ['collab',                'legacy-core'],
  ['collab',                'dira'],
];

// ─── Edge colour and opacity per category ──────────────────────────────────
const EDGE_COLOR = '#3a8c6e';       // muted teal, visible on dark bg
const EDGE_COLOR_BRIDGE = '#2a5e4a'; // slightly dimmer for cross-track bridges
const EDGE_OPACITY = 0.55;

// ─── Node Component ─────────────────────────────────────────────────────────
interface NodeProps {
  project: ProjectMetadata;
  position: [number, number, number];
  onNodeClick: (slug: string) => void;
}

function Node({ project, position, onNodeClick }: NodeProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(Math.random() * 100); // stagger idle pulse

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;

    // Target scale
    const targetScale = hovered ? 1.9 : 1.0;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.12
    );

    // Idle breathe animation for glow sphere
    timeRef.current += 0.018;
    const breathe = 1 + Math.sin(timeRef.current) * 0.25;
    glowRef.current.scale.setScalar(breathe);
    (glowRef.current.material as THREE.MeshBasicMaterial).opacity = hovered
      ? 0.3
      : 0.06 + Math.sin(timeRef.current) * 0.03;
  });

  return (
    <group position={position}>
      {/* Outer glow sphere — breathes gently */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial
          color={project.accentColor}
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>

      {/* Hard core node sphere */}
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
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshBasicMaterial color={project.accentColor} />
      </mesh>

      {/* HTML label */}
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

// ─── Edges Component ─────────────────────────────────────────────────────────
function GraphEdges() {
  const primaryRef = useRef<THREE.BufferGeometry>(null);
  const bridgeRef  = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    // Separate primary from cross-track bridge edges
    const primaryConnections: [string, string][] = connections.slice(0, -4);
    const bridgeConnections:  [string, string][] = connections.slice(-4);

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

    if (primaryRef.current) {
      primaryRef.current.setFromPoints(buildPoints(primaryConnections));
    }
    if (bridgeRef.current) {
      bridgeRef.current.setFromPoints(buildPoints(bridgeConnections));
    }
  }, []);

  return (
    <>
      {/* Primary track edges — visible teal */}
      <lineSegments>
        <bufferGeometry ref={primaryRef} />
        <lineBasicMaterial
          color={EDGE_COLOR}
          transparent
          opacity={EDGE_OPACITY}
          depthWrite={false}
        />
      </lineSegments>

      {/* Bridge edges — slightly dimmer + dashed appearance via lower opacity */}
      <lineSegments>
        <bufferGeometry ref={bridgeRef} />
        <lineBasicMaterial
          color={EDGE_COLOR_BRIDGE}
          transparent
          opacity={EDGE_OPACITY * 0.55}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

// ─── Scene Orchestrator ───────────────────────────────────────────────────────
function SceneOrchestrator() {
  const { camera, clock } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const { startTransition } = usePageTransition();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    const time = clock.getElapsedTime() * 0.14;
    const targetX = Math.sin(time) * 0.7 + mouse.current.x * 0.4;
    const targetY = Math.cos(time) * 0.5 + mouse.current.y * 0.3;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, -1, -3);
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

// ─── Canvas Root ─────────────────────────────────────────────────────────────
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
