import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/* Theme colours (kept in sync with src/index.css tokens) */
const BG = 0x0d1117;
const TEAL = 0x5fc8d4;
const ORANGE = 0xff7a1a;

/* Grid floor */
const GRID_WIDTH = 240;      // total x extent
const GRID_DEPTH = 220;      // how far the floor recedes (z)
const GRID_SPACING = 6;      // distance between lines
const GRID_Y = -6;           // floor height relative to camera origin
const SCROLL_SPEED = 2.2;    // units per second toward the viewer

/* Particles */
const PARTICLE_COUNT = 260;

/** Soft round sprite so points render as glows instead of squares. */
function makeGlowTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.6)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildGrid() {
  const positions = [];
  const half = GRID_WIDTH / 2;

  // Lines running away from the viewer (constant x)
  for (let x = -half; x <= half; x += GRID_SPACING) {
    positions.push(x, GRID_Y, GRID_SPACING, x, GRID_Y, -GRID_DEPTH);
  }
  // Lines across the viewer (constant z); one extra so the wrap is seamless
  for (let z = GRID_SPACING; z >= -GRID_DEPTH; z -= GRID_SPACING) {
    positions.push(-half, GRID_Y, z, half, GRID_Y, z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({
    color: TEAL,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
  });
  return new THREE.LineSegments(geometry, material);
}

function buildParticles(texture) {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const speeds = new Float32Array(PARTICLE_COUNT);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * GRID_WIDTH * 0.8;
    positions[i * 3 + 1] = GRID_Y + Math.random() * 34;
    positions[i * 3 + 2] = -Math.random() * GRID_DEPTH * 0.8 + 4;
    speeds[i] = 0.25 + Math.random() * 0.55;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: TEAL,
    map: texture,
    size: 1.9,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geometry, material);
  points.userData.speeds = speeds;
  return points;
}

/** Faint warm glow sitting on the horizon for depth. */
function buildHorizonGlow(texture) {
  const material = new THREE.SpriteMaterial({
    map: texture,
    color: ORANGE,
    transparent: true,
    opacity: 0.12,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const sprite = new THREE.Sprite(material);
  sprite.position.set(14, GRID_Y + 4, -GRID_DEPTH * 0.7);
  sprite.scale.set(150, 60, 1);
  return sprite;
}

export default function BackgroundCanvas() {
  const containerRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer;
    let frameId = 0;
    let disposed = false;
    const disposables = [];

    try {
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(BG, 18, GRID_DEPTH * 0.85);

      const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 400);
      camera.position.set(0, 2.5, 12);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const glowTexture = makeGlowTexture();
      const grid = buildGrid();
      const particles = buildParticles(glowTexture);
      const horizon = buildHorizonGlow(glowTexture);
      scene.add(grid, particles, horizon);
      disposables.push(glowTexture, grid.geometry, grid.material, particles.geometry, particles.material, horizon.material);

      /* Mouse parallax, eased */
      const target = { x: 0, y: 0 };
      const current = { x: 0, y: 0 };
      const onMouseMove = (e) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 2;
        target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('resize', onResize);

      const lookAt = new THREE.Vector3(0, -1, -60);
      const clock = new THREE.Clock();
      const speeds = particles.userData.speeds;
      const positions = particles.geometry.attributes.position;

      const renderFrame = (dt) => {
        // Grid scrolls toward the viewer and wraps every spacing unit
        grid.position.z = (grid.position.z + SCROLL_SPEED * dt) % GRID_SPACING;

        // Particles rise slowly and recycle at the top
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          let y = positions.getY(i) + speeds[i] * dt;
          if (y > GRID_Y + 36) y = GRID_Y;
          positions.setY(i, y);
        }
        positions.needsUpdate = true;

        // Camera drifts with the pointer
        current.x += (target.x - current.x) * 0.04;
        current.y += (target.y - current.y) * 0.04;
        camera.position.x = current.x * 3;
        camera.position.y = 2.5 - current.y * 1.2;
        camera.lookAt(lookAt);

        renderer.render(scene, camera);
      };

      const loop = () => {
        if (disposed) return;
        frameId = requestAnimationFrame(loop);
        if (document.hidden) return;
        renderFrame(Math.min(clock.getDelta(), 0.05));
      };

      if (reduceMotion) {
        renderFrame(0);
      } else {
        loop();
      }

      return () => {
        disposed = true;
        cancelAnimationFrame(frameId);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        disposables.forEach((d) => d.dispose && d.dispose());
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    } catch (e) {
      console.error('Background animation error:', e);
      // Intentional: fall back to the static gradient when WebGL setup throws
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasError(true);
      return undefined;
    }
  }, []);

  if (hasError) {
    return <div className="bg-container" id="canvas-container" />;
  }

  return <div ref={containerRef} className="bg-container" id="canvas-container" />;
}
