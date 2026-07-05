'use client';

import React, { useEffect, useRef } from 'react';

interface ProjectHeroBackgroundProps {
  slug: string;
  accentHue?: number;
}

export function ProjectHeroBackground({ slug, accentHue = 200 }: ProjectHeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    const mouse = { x: -1000, y: -1000, active: false };

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 500;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // ────────────────────────────────────────────────────────────────────────
    // PRE-INITIALIZE DATA STRUCTURES FOR SPECIFIC SLUGS TO AVOID RE-ALLOCATION
    // ────────────────────────────────────────────────────────────────────────
    
    // 2. OpinionMiner strings
    const opinionPhrases = [
      { text: 'Scalable', val: 1 }, { text: 'Inefficient', val: -1 },
      { text: 'Performant', val: 1 }, { text: 'Bottleneck', val: -1 },
      { text: 'Optimized', val: 1 }, { text: 'Buggy', val: -1 },
      { text: 'Robust', val: 1 }, { text: 'Jank', val: -1 },
      { text: 'Verified', val: 1 }, { text: 'Latency', val: -1 },
      { text: 'Sleek', val: 1 }, { text: 'Bloated', val: -1 },
    ];
    const opinionWords = Array.from({ length: 35 }).map((_, i) => {
      const phrase = opinionPhrases[i % opinionPhrases.length];
      return {
        text: phrase.text,
        val: phrase.val,
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.001,
        vy: (Math.random() - 0.5) * 0.001,
        size: 9 + Math.random() * 4
      };
    });

    // 3. NutriLogic Voronoi breathing cells
    const voronoiCells = Array.from({ length: 12 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0015,
      vy: (Math.random() - 0.5) * 0.0015,
      hue: 90 + Math.random() * 40,
      phase: Math.random() * Math.PI * 2
    }));

    // 4. Course Recommender data streams
    const recommenderNodes = Array.from({ length: 15 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      size: 2 + Math.random() * 3,
      pulsePhase: Math.random() * Math.PI * 2
    }));

    // 5. Dira AR pins
    const diraPins = Array.from({ length: 4 }).map(() => ({
      gridX: 0.2 + Math.random() * 0.6,
      gridZ: 0.1 + Math.random() * 0.8,
      pulse: Math.random() * Math.PI
    }));

    // 7. MusicPlayerGame elements
    const waveBarsCount = 30;

    // 8. Spiks ride hailing routes
    const spiksCars = Array.from({ length: 6 }).map((_, i) => ({
      progress: Math.random(),
      speed: 0.002 + Math.random() * 0.002,
      pathIndex: i % 3
    }));

    // 9. Legacy Core API endpoints
    const legacyNodes = Array.from({ length: 8 }).map((_, i) => ({
      name: `GET /api/v1/endpoint_${i}`,
      x: 0.15 + (i % 3) * 0.35 + (Math.random() - 0.5) * 0.1,
      y: 0.15 + Math.floor(i / 3) * 0.3 + (Math.random() - 0.5) * 0.1,
      pulse: Math.random() * Math.PI * 2
    }));

    // 10. MiniEcommerce microservices
    const ecomNodes = [
      { name: 'USER', x: 0.2, y: 0.3 },
      { name: 'CART', x: 0.5, y: 0.3 },
      { name: 'PRODUCT', x: 0.8, y: 0.3 },
      { name: 'ORDER', x: 0.35, y: 0.7 },
      { name: 'PAYMENT', x: 0.65, y: 0.7 },
    ];
    const ecomPackets = Array.from({ length: 8 }).map(() => ({
      from: Math.floor(Math.random() * ecomNodes.length),
      to: Math.floor(Math.random() * ecomNodes.length),
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.008
    }));

    // 11. Quickfood Frontend UI cards
    const foodCards = Array.from({ length: 5 }).map((_, i) => ({
      x: 0.2 + i * 0.15,
      y: 0.3 + (i % 2) * 0.15,
      scale: 1.0,
      phase: Math.random() * Math.PI * 2
    }));

    // 12. HouseHub Isometric grids
    const housePoints = Array.from({ length: 9 }).map((_, i) => ({
      gridX: i % 3,
      gridY: Math.floor(i / 3),
      h: 20 + Math.random() * 50,
      phase: Math.random() * Math.PI * 2
    }));

    // 13. IntuiLab orbital gravity system
    const nuclei = [
      { x: 0.25, y: 0.3 }, { x: 0.75, y: 0.3 },
      { x: 0.5, y: 0.7 }, { x: 0.3, y: 0.8 }
    ];
    const intuiparticles = Array.from({ length: 120 }).map(() => {
      const nucleusIdx = Math.floor(Math.random() * nuclei.length);
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 80;
      return {
        nucleusIdx,
        angle,
        dist,
        speed: 0.01 + Math.random() * 0.015,
        size: 1.2 + Math.random() * 1.5
      };
    });

    // 15. Nyaraka cabinet drawers
    const nyarakaDrawers = [
      { x: 0.35, y: 0.4, open: 0 },
      { x: 0.65, y: 0.4, open: 0 },
      { x: 0.35, y: 0.7, open: 0 },
      { x: 0.65, y: 0.7, open: 0 },
    ];

    // 16. Veld / 17. Digital Economy Africa Node grids
    const africaCentroids = [
      { name: 'Nairobi', x: 0.62, y: 0.58, pulse: 0 },
      { name: 'Lagos', x: 0.35, y: 0.50, pulse: Math.PI / 3 },
      { name: 'Cairo', x: 0.58, y: 0.25, pulse: Math.PI / 1.5 },
      { name: 'Cape Town', x: 0.48, y: 0.88, pulse: Math.PI },
      { name: 'Dakar', x: 0.18, y: 0.42, pulse: Math.PI * 1.2 }
    ];

    // ────────────────────────────────────────────────────────────────────────
    // DRAW LOOP FUNCTION SWITCH
    // ────────────────────────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      const W = canvas.width;
      const H = canvas.height;
      const accentColor = `hsl(${accentHue}, 90%, 60%)`;
      const accentDim = `hsla(${accentHue}, 90%, 60%, 0.1)`;

      // Draw depending on project slug
      if (slug === 'slopslayer') {
        // Red radar sweeps & corner brackets
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.08)';
        ctx.lineWidth = 1.0;
        const grid = 28;
        for (let x = 0; x < W; x += grid) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
        }
        for (let y = 0; y < H; y += grid) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }
        const scanY = (time * 120) % H;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(W, scanY);
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
        ctx.stroke();

        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 1.5;
        const pad = 35;
        ctx.beginPath(); ctx.moveTo(pad, pad + 15); ctx.lineTo(pad, pad); ctx.lineTo(pad + 15, pad); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(W - pad, pad + 15); ctx.lineTo(W - pad, pad); ctx.lineTo(W - pad - 15, pad); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(pad, H - pad - 15); ctx.lineTo(pad, H - pad); ctx.lineTo(pad + 15, H - pad); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(W - pad, H - pad - 15); ctx.lineTo(W - pad, H - pad); ctx.lineTo(W - pad - 15, H - pad); ctx.stroke();

      } else if (slug === 'opinionminer') {
        // sentiment floating word clusters
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        opinionWords.forEach((word) => {
          word.x += word.vx;
          word.y += word.vy;
          if (word.x < 0 || word.x > 1) word.vx *= -1;
          if (word.y < 0 || word.y > 1) word.vy *= -1;

          const px = word.x * W;
          const py = word.y * H;
          ctx.fillStyle = word.val > 0 ? 'rgba(249, 115, 22, 0.28)' : 'rgba(100, 116, 139, 0.28)';
          ctx.fillText(word.text, px, py);
        });

      } else if (slug === 'nutrilogic') {
        // breathing cell clusters representing neuro-symbolic Voronoi
        voronoiCells.forEach((c) => {
          c.x += c.vx;
          c.y += c.vy;
          if (c.x < 0 || c.x > 1) c.vx *= -1;
          if (c.y < 0 || c.y > 1) c.vy *= -1;
        });
        ctx.lineWidth = 0.8;
        for (let x = 0; x < W; x += 40) {
          for (let y = 0; y < H; y += 40) {
            let minDist = 9999;
            let nearestIdx = 0;
            voronoiCells.forEach((c, idx) => {
              const dx = x - c.x * W;
              const dy = y - c.y * H;
              const d = dx * dx + dy * dy;
              if (d < minDist) {
                minDist = d;
                nearestIdx = idx;
              }
            });
            const cell = voronoiCells[nearestIdx];
            const size = 6 + Math.sin(time + cell.phase) * 3;
            ctx.fillStyle = `hsla(${cell.hue}, 60%, 45%, 0.015)`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

      } else if (slug === 'ai-course-recommender') {
        // glowing nodes connected by stream packets
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.08)';
        ctx.lineWidth = 0.8;
        for (let i = 0; i < recommenderNodes.length; i++) {
          for (let j = i + 1; j < recommenderNodes.length; j++) {
            const n1 = recommenderNodes[i];
            const n2 = recommenderNodes[j];
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            if (dx * dx + dy * dy < 0.08) {
              ctx.beginPath();
              ctx.moveTo(n1.x * W, n1.y * H);
              ctx.lineTo(n2.x * W, n2.y * H);
              ctx.stroke();
            }
          }
        }
        recommenderNodes.forEach((n) => {
          const px = n.x * W;
          const py = n.y * H;
          const pulse = n.size * (1 + Math.sin(time * 2.5 + n.pulsePhase) * 0.25);
          ctx.beginPath();
          ctx.arc(px, py, pulse, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(234, 179, 8, 0.25)';
          ctx.fill();
        });

      } else if (slug === 'dira') {
        // Perspective 3D grid plane extending to horizon
        ctx.strokeStyle = 'rgba(99, 147, 255, 0.12)';
        ctx.lineWidth = 1.0;
        const horizon = H * 0.45;
        
        // Vertical perspective lines
        const linesCount = 20;
        for (let i = 0; i <= linesCount; i++) {
          const ratio = i / linesCount;
          const xBottom = W * ratio;
          const xHorizon = W / 2 + (ratio - 0.5) * 120;
          ctx.beginPath();
          ctx.moveTo(xHorizon, horizon);
          ctx.lineTo(xBottom, H);
          ctx.stroke();
        }

        // Horizontal lines flowing forward
        const flowOffset = (time * 15) % 30;
        for (let y = horizon; y < H; y += 22) {
          const dy = y + flowOffset;
          if (dy > H) continue;
          ctx.beginPath();
          ctx.moveTo(0, dy);
          ctx.lineTo(W, dy);
          ctx.stroke();
        }

        // Location pins with expanding ring
        diraPins.forEach((pin) => {
          pin.pulse += 0.015;
          const pz = pin.gridZ + (time * 0.05) % 0.8;
          const px = W / 2 + (pin.gridX - 0.5) * W * (pz + 0.3);
          const py = horizon + (H - horizon) * pz;

          // Expanding radar ring
          const ringRad = 4 + (pin.pulse * 15) % 45;
          const ringAlpha = Math.max(0, 0.35 - (ringRad / 45));
          ctx.beginPath();
          ctx.arc(px, py, ringRad, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(99, 147, 255, ${ringAlpha})`;
          ctx.stroke();

          // Anchor point pin
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(99, 147, 255, 0.65)';
          ctx.fill();
        });

      } else if (slug === 'diffgeo') {
        // 3D rotating mathematical torus knot wireframe
        const centerX = W / 2;
        const centerY = H / 2;
        const scale = Math.min(W, H) * 0.28;
        const distance = 3.5;

        ctx.lineWidth = 1.0;
        ctx.strokeStyle = 'rgba(192, 132, 252, 0.15)';
        const knotSteps = 120;
        let lastPt: { x: number; y: number } | null = null;

        for (let i = 0; i <= knotSteps; i++) {
          const t = (i / knotSteps) * Math.PI * 2 * 3;
          const r = Math.cos(7 * t) * 0.3 + 0.8;
          let rx = r * Math.cos(3 * t);
          let ry = r * Math.sin(3 * t);
          let rz = -Math.sin(7 * t) * 0.4;

          // Rotate
          const cosY = Math.cos(time * 0.8);
          const sinY = Math.sin(time * 0.8);
          const rx_rot = rx * cosY + rz * sinY;
          rz = -rx * sinY + rz * cosY;
          rx = rx_rot;

          const px = (rx * scale) / (rz + distance) + centerX;
          const py = (ry * scale) / (rz + distance) + centerY;

          if (lastPt) {
            ctx.beginPath();
            ctx.moveTo(lastPt.x, lastPt.y);
            ctx.lineTo(px, py);
            ctx.stroke();
          }
          lastPt = { x: px, y: py };
        }

      } else if (slug === 'musicgame') {
        // wave bars + snake trail
        ctx.fillStyle = 'rgba(167, 139, 250, 0.08)';
        const barWidth = W / waveBarsCount;
        for (let i = 0; i < waveBarsCount; i++) {
          const h = 20 + Math.sin(time * 4 + i * 0.5) * 55;
          ctx.fillRect(i * barWidth, H - h, barWidth - 3, h);
        }
        // Floating trail
        ctx.beginPath();
        for (let i = 0; i < 15; i++) {
          const sx = W * 0.1 + i * (W * 0.06);
          const sy = H / 2 + Math.sin(time * 3.5 + i * 0.4) * 40;
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.28)';
        ctx.lineWidth = 2.0;
        ctx.stroke();

      } else if (slug === 'spiks') {
        // top down road navigation
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
        ctx.lineWidth = 2.0;
        
        // draw a simple grid of roads
        ctx.beginPath();
        ctx.moveTo(W * 0.2, 0); ctx.lineTo(W * 0.2, H);
        ctx.moveTo(W * 0.8, 0); ctx.lineTo(W * 0.8, H);
        ctx.moveTo(0, H * 0.4); ctx.lineTo(W, H * 0.4);
        ctx.stroke();

        // animate spiks taxi cars
        spiksCars.forEach((car) => {
          car.progress += car.speed;
          if (car.progress > 1.0) car.progress = 0;

          let cx = 0, cy = 0;
          if (car.pathIndex === 0) {
            cx = W * 0.2;
            cy = car.progress * H;
          } else if (car.pathIndex === 1) {
            cx = W * 0.8;
            cy = H - (car.progress * H);
          } else {
            cx = car.progress * W;
            cy = H * 0.4;
          }

          ctx.beginPath();
          ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.55)';
          ctx.fill();
        });

      } else if (slug === 'legacy-core') {
        // API endpoint network nodes
        ctx.strokeStyle = 'rgba(232, 121, 249, 0.08)';
        ctx.lineWidth = 1.0;
        legacyNodes.forEach((node, idx) => {
          node.pulse += 0.02;
          const px = node.x * W;
          const py = node.y * H;

          // Connect to next
          if (idx < legacyNodes.length - 1) {
            const next = legacyNodes[idx + 1];
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(next.x * W, next.y * H); ctx.stroke();
          }

          const size = 3 + Math.sin(node.pulse) * 1.5;
          ctx.beginPath(); ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(232, 121, 249, 0.35)';
          ctx.fill();
        });

      } else if (slug === 'miniecommerce') {
        // Force directed graph microservices
        ctx.strokeStyle = 'rgba(251, 113, 133, 0.12)';
        ctx.lineWidth = 1.2;
        // Draw links
        ecomPackets.forEach((p) => {
          p.progress += p.speed;
          if (p.progress > 1.0) {
            p.progress = 0;
            p.from = Math.floor(Math.random() * ecomNodes.length);
            p.to = Math.floor(Math.random() * ecomNodes.length);
          }

          const n1 = ecomNodes[p.from];
          const n2 = ecomNodes[p.to];
          
          ctx.beginPath();
          ctx.moveTo(n1.x * W, n1.y * H);
          ctx.lineTo(n2.x * W, n2.y * H);
          ctx.stroke();

          // Packet moving
          const px = n1.x * W + (n2.x * W - n1.x * W) * p.progress;
          const py = n1.y * H + (n2.y * H - n1.y * H) * p.progress;
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(251, 113, 133, 0.65)';
          ctx.fill();
        });

      } else if (slug === 'quickfood-frontend') {
        // Floating UI food elements
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.08)';
        ctx.lineWidth = 1.0;
        foodCards.forEach((c) => {
          c.phase += 0.01;
          const px = c.x * W;
          const py = c.y * H + Math.sin(c.phase) * 12;

          ctx.strokeRect(px - 35, py - 20, 70, 40);
          ctx.fillStyle = 'rgba(236, 72, 153, 0.015)';
          ctx.fillRect(px - 35, py - 20, 70, 40);
        });

      } else if (slug === 'the-househub') {
        // isometric 3D housing units
        ctx.strokeStyle = 'rgba(20, 184, 166, 0.12)';
        ctx.lineWidth = 1.0;
        const cx = W / 2;
        const cy = H / 2 - 40;

        housePoints.forEach((p) => {
          const isoX = cx + (p.gridX - p.gridY) * 60;
          const isoY = cy + (p.gridX + p.gridY) * 30;
          const h = p.h + Math.sin(time * 3 + p.phase) * 12;

          // Draw isometric box
          ctx.beginPath();
          ctx.moveTo(isoX, isoY);
          ctx.lineTo(isoX + 30, isoY + 15);
          ctx.lineTo(isoX, isoY + 30);
          ctx.lineTo(isoX - 30, isoY + 15);
          ctx.closePath();
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(isoX - 30, isoY + 15);
          ctx.lineTo(isoX - 30, isoY + 15 + h);
          ctx.lineTo(isoX, isoY + 30 + h);
          ctx.lineTo(isoX + 30, isoY + 15 + h);
          ctx.lineTo(isoX + 30, isoY + 15);
          ctx.stroke();
        });

      } else if (slug === 'intuilab') {
        // Orbit particle system with nuclei gravity wells
        intuiparticles.forEach((p) => {
          p.angle += p.speed;
          const nucleus = nuclei[p.nucleusIdx];
          
          let targetX = nucleus.x * W + Math.cos(p.angle) * p.dist;
          let targetY = nucleus.y * H + Math.sin(p.angle) * p.dist;

          // Mouse gravity pull
          if (mouse.active) {
            const dx = mouse.x - targetX;
            const dy = mouse.y - targetY;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 90) {
              const pull = (90 - d) * 0.28;
              const a = Math.atan2(dy, dx);
              targetX += Math.cos(a) * pull;
              targetY += Math.sin(a) * pull;
            }
          }

          ctx.beginPath();
          ctx.arc(targetX, targetY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(251, 191, 36, 0.28)';
          ctx.fill();
        });

      } else if (slug === 'ukweli') {
        // giant faded UKWELI text + checkmarks
        ctx.font = '10vw sans-serif';
        ctx.fillStyle = 'rgba(45, 212, 160, 0.015)';
        ctx.textAlign = 'center';
        ctx.fillText('UKWELI', W / 2, H / 2);

        // draw assembling shield
        ctx.strokeStyle = 'rgba(45, 212, 160, 0.08)';
        ctx.strokeRect(W / 2 - 30, H / 2 - 40, 60, 80);

      } else if (slug === 'nyaraka') {
        // warm off white cabinet drawer outline
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
        ctx.lineWidth = 1.0;
        
        nyarakaDrawers.forEach((d) => {
          const dx = d.x * W;
          const dy = d.y * H;
          
          // Draw drawer box
          ctx.strokeRect(dx - 30, dy - 20, 60, 40);
          
          // Drawer handle
          ctx.beginPath();
          ctx.arc(dx, dy, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(148, 163, 184, 0.28)';
          ctx.fill();
        });

      } else if (slug === 'veld' || slug === 'digital-economy') {
        // Africa network outline
        ctx.strokeStyle = slug === 'veld' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)';
        ctx.lineWidth = 1.0;
        
        // draw network lines connecting centroids
        for (let i = 0; i < africaCentroids.length; i++) {
          for (let j = i + 1; j < africaCentroids.length; j++) {
            ctx.beginPath();
            ctx.moveTo(africaCentroids[i].x * W, africaCentroids[i].y * H);
            ctx.lineTo(africaCentroids[j].x * W, africaCentroids[j].y * H);
            ctx.stroke();
          }
        }

        // draw pulse rings
        africaCentroids.forEach((c) => {
          c.pulse += 0.02;
          const px = c.x * W;
          const py = c.y * H;
          const rad = 2 + (c.pulse * 12) % 36;
          const alpha = Math.max(0, 0.35 - (rad / 36));

          ctx.beginPath();
          ctx.arc(px, py, rad, 0, Math.PI * 2);
          ctx.strokeStyle = slug === 'veld' ? `rgba(245, 158, 11, ${alpha})` : `rgba(16, 185, 129, ${alpha})`;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = slug === 'veld' ? 'rgba(245, 158, 11, 0.6)' : 'rgba(16, 185, 129, 0.6)';
          ctx.fill();
        });

      } else if (slug === 'collab') {
        // Orbit organization nodes
        const cx = W / 2;
        const cy = H / 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 116, 139, 0.7)';
        ctx.fill();

        const collabNodes = ['NEXUS', 'learn_io', 'UTAVU', 'GitHub'];
        collabNodes.forEach((node, idx) => {
          const orbitAngle = time * 0.7 + idx * (Math.PI / 2);
          const nx = cx + Math.cos(orbitAngle) * 75;
          const ny = cy + Math.sin(orbitAngle) * 75;

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(nx, ny);
          ctx.strokeStyle = 'rgba(100, 116, 139, 0.12)';
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(100, 116, 139, 0.45)';
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [slug, accentHue]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-60">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
