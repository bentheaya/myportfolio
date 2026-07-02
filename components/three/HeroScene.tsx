'use client';

import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { projectsMetadata, ProjectMetadata } from '@/lib/projects';
import { usePageTransition } from '@/components/transitions/TransitionContext';

// ─── Node positions (desktop reference frame) ─────────────────────────────────
// X span: -3.5 to +4.5 = 8 world units at desktop fov60/z5 (vp width ≈ 5.77)
// On mobile the xScale factor compresses them so nothing spills offscreen.
const nodePositions: { [slug: string]: [number, number, number] } = {
  slopslayer:               [-2.8,  2,    -2],
  opinionminer:             [-1,    2.2,  -3],
  nutrilogic:               [1.2,   2,    -2.5],
  'ai-course-recommender':  [3,     1.5,  -2],

  dira:                     [-2,    0.2,  -1],
  diffgeo:                  [0,     0.5,  -2],
  musicgame:                [2.2,  -0.5,  -1.5],
  collab:                   [0.8,  -0.8,  -4],

  spiks:                    [-2.2, -2,    -2],
  'legacy-core':            [0.4,  -2.2,  -2.5],
  miniecommerce:            [2.5,  -2,    -2],
  'quickfood-frontend':     [3.8,  -1.5,  -2],
  'the-househub':           [1.8,  -3,    -1.8],

  intuilab:                 [-3,   -3.8,  -3],
  ukweli:                   [-1.2, -4.2,  -2.5],
  nyaraka:                  [0.4,  -4.2,  -3],
  veld:                     [2,    -3.8,  -2.5],
  'digital-economy':        [3.6,  -3.2,  -3],
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
  ['ai-course-recommender', 'dira'],
  ['musicgame',             'spiks'],
  ['the-househub',          'intuilab'],
  ['collab',                'diffgeo'],
  ['collab',                'legacy-core'],
  ['collab',                'dira'],
];

const EDGE_COLOR        = '#3a8c6e';
const EDGE_COLOR_BRIDGE = '#2a5e4a';
const EDGE_OPACITY      = 0.6;

// ─── xScale context — shared between orchestrator, nodes, and edges ───────────
const XScaleContext = createContext<number>(1);

// ─── Helpers ─────────────────────────────────────────────────────────────────
function scaleX(pos: [number, number, number], xScale: number): [number, number, number] {
  return [pos[0] * xScale, pos[1], pos[2]];
}

// Deterministic function to calculate drifting node position based on time and index
function getDriftedPosition(slug: string, time: number, xScale: number): [number, number, number] {
  const base = nodePositions[slug];
  if (!base) return [0, 0, 0];
  let seed = 0;
  for (let i = 0; i < slug.length; i++) {
    seed += slug.charCodeAt(i);
  }
  
  // Subtle ambient drift: 0.15 max offset in coordinates
  const driftX = Math.sin(time * 0.7 + seed) * 0.15;
  const driftY = Math.cos(time * 0.5 + seed * 1.3) * 0.12;
  const driftZ = Math.sin(time * 0.4 + seed * 0.7) * 0.10;
  
  return [base[0] * xScale + driftX, base[1] + driftY, base[2] + driftZ];
}

// ─── Node ────────────────────────────────────────────────────────────────────
interface NodeProps {
  project: ProjectMetadata;
  position: [number, number, number]; // raw (desktop) position
  onNodeClick: (slug: string) => void;
}

function Node({ project, position, onNodeClick }: NodeProps) {
  const xScale  = useContext(XScaleContext);
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(Math.random() * 100);
  const { clock } = useThree();

  useFrame(() => {
    if (!meshRef.current || !glowRef.current) return;
    
    // Position drift update
    const time = clock.getElapsedTime() * 0.4;
    const drifted = getDriftedPosition(project.slug, time, xScale);
    if (groupRef.current) {
      groupRef.current.position.set(drifted[0], drifted[1], drifted[2]);
    }

    const targetScale = hovered ? 1.9 : 1.0;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale), 0.12
    );
    timeRef.current += 0.018;
    const breathe = 1 + Math.sin(timeRef.current) * 0.25;
    glowRef.current.scale.setScalar(breathe);
    (glowRef.current.material as THREE.MeshBasicMaterial).opacity = hovered
      ? 0.3
      : 0.07 + Math.sin(timeRef.current) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial color={project.accentColor} transparent opacity={0.08} depthWrite={false} />
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
            className="text-[9px] font-mono whitespace-nowrap px-1.5 py-0.5 rounded bg-canvas-bg/90 border text-canvas-text shadow-lg shadow-black/40"
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
  const xScale     = useContext(XScaleContext);
  const primaryRef = useRef<THREE.BufferGeometry>(null);
  const bridgeRef  = useRef<THREE.BufferGeometry>(null);
  const { clock } = useThree();

  // Rebuild edge geometry on start or xScale changes (fallback/mobile resize)
  useEffect(() => {
    const primary = connections.slice(0, -4);
    const bridges = connections.slice(-4);

    const buildPoints = (edges: [string, string][]) => {
      const pts: THREE.Vector3[] = [];
      edges.forEach(([a, b]) => {
        const posA = nodePositions[a];
        const posB = nodePositions[b];
        if (posA && posB) {
          pts.push(new THREE.Vector3(...scaleX(posA, xScale)));
          pts.push(new THREE.Vector3(...scaleX(posB, xScale)));
        }
      });
      return pts;
    };

    if (primaryRef.current) primaryRef.current.setFromPoints(buildPoints(primary));
    if (bridgeRef.current)  bridgeRef.current.setFromPoints(buildPoints(bridges));
  }, [xScale]);

  // Dynamically update line segment endpoints based on node drifting positions
  useFrame(() => {
    if (!primaryRef.current || !bridgeRef.current) return;
    const time = clock.getElapsedTime() * 0.4;
    
    // Primary edges
    const primaryPoints: number[] = [];
    connections.slice(0, -4).forEach(([a, b]) => {
      const posA = getDriftedPosition(a, time, xScale);
      const posB = getDriftedPosition(b, time, xScale);
      primaryPoints.push(...posA, ...posB);
    });
    primaryRef.current.setAttribute('position', new THREE.Float32BufferAttribute(primaryPoints, 3));
    primaryRef.current.attributes.position.needsUpdate = true;

    // Bridge edges
    const bridgePoints: number[] = [];
    connections.slice(-4).forEach(([a, b]) => {
      const posA = getDriftedPosition(a, time, xScale);
      const posB = getDriftedPosition(b, time, xScale);
      bridgePoints.push(...posA, ...posB);
    });
    bridgeRef.current.setAttribute('position', new THREE.Float32BufferAttribute(bridgePoints, 3));
    bridgeRef.current.attributes.position.needsUpdate = true;
  });

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
  const { camera, clock, viewport } = useThree();
  const mouse      = useRef({ x: 0, y: 0 });
  const scrollY    = useRef(0);
  const { startTransition } = usePageTransition();

  // ── Compute xScale from current viewport width ──
  // Desktop ref viewport width at fov60/z5 ≈ 5.77 world units
  // We measure full x-span: from -3 to +4 = 7 world units
  // xScale clamps x positions so max x-extent stays within the viewport
  const xMaxDesktop = 3.8; // max abs x in nodePositions (after tightening)
  // Half the viewport width in world units, with a 15% margin
  const halfVP      = viewport.width * 0.42;
  const xScale      = Math.min(1, halfVP / xMaxDesktop);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = Math.min(window.scrollY, heroHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroHeight]);

  useFrame(() => {
    const time = clock.getElapsedTime() * 0.14;
    const scrollProgress = heroHeight > 0 ? scrollY.current / heroHeight : 0;
    const scrollCameraY  = -scrollProgress * 3.5;
    const scrollCameraZ  = 5 - scrollProgress * 2.5; // Zoom in from Z=5 to Z=2.5 on scroll

    const targetX = Math.sin(time) * 0.6 + mouse.current.x * 0.3;
    const targetY = Math.cos(time) * 0.4 + mouse.current.y * 0.25 + scrollCameraY;
    const targetZ = scrollCameraZ;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.lookAt(0, scrollCameraY - 0.5, -3);
  });

  const handleNodeClick = (slug: string) => {
    startTransition(`/work/${slug}`, window.innerWidth / 2, window.innerHeight / 2);
  };

  return (
    <XScaleContext.Provider value={xScale}>
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
    </XScaleContext.Provider>
  );
}

// ─── Canvas root ─────────────────────────────────────────────────────────────
export default function HeroScene({ heroHeight }: { heroHeight: number }) {
  return (
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
