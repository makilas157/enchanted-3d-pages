import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { constellations, fieldStars, raDecToVector, type Star } from "@/data/stars";

const SKY_RADIUS = 16;

/** Soft round sprite used for every star point. */
function useStarTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(255,246,230,1)");
    grad.addColorStop(0.28, "rgba(255,206,140,0.85)");
    grad.addColorStop(0.65, "rgba(214,120,48,0.22)");
    grad.addColorStop(1, "rgba(120,50,20,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

/** Star magnitudes → point brightness (mag -1.5 is brightest, 5 is faintest). */
function magToBrightness(mag: number) {
  return THREE.MathUtils.clamp(1.05 - (mag + 1.5) * 0.14, 0.25, 1);
}

function StarPoints({
  stars,
  texture,
  size,
}: {
  stars: Star[];
  texture: THREE.Texture | null;
  size: number;
}) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(stars.length * 3);
    const colors = new Float32Array(stars.length * 3);
    const warm = new THREE.Color("#ffd8a3");
    const hot = new THREE.Color("#fff6e6");
    stars.forEach((star, i) => {
      const [x, y, z] = raDecToVector(star.ra, star.dec, SKY_RADIUS);
      positions.set([x, y, z], i * 3);
      const b = magToBrightness(star.mag);
      const c = warm.clone().lerp(hot, b * 0.6).multiplyScalar(b);
      colors.set([c.r, c.g, c.b], i * 3);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [stars]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={size}
        map={texture}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/** Faint catalogue-like scatter so the sky isn't empty between bright stars. */
function BackgroundStars({ texture }: { texture: THREE.Texture | null }) {
  const stars = useMemo<Star[]>(() => {
    let seed = 20260912;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    return Array.from({ length: 900 }, () => ({
      name: "",
      ra: rand() * 24,
      dec: (Math.acos(2 * rand() - 1) * 180) / Math.PI - 90,
      mag: 3.6 + rand() * 2.4,
    }));
  }, []);

  return <StarPoints stars={stars} texture={texture} size={0.11} />;
}

function ConstellationLines() {
  const geometry = useMemo(() => {
    const points: number[] = [];
    for (const figure of constellations) {
      for (const [a, b] of figure.lines) {
        const from = figure.stars[a];
        const to = figure.stars[b];
        if (!from || !to) continue;
        points.push(...raDecToVector(from.ra, from.dec, SKY_RADIUS * 0.995));
        points.push(...raDecToVector(to.ra, to.dec, SKY_RADIUS * 0.995));
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(points), 3));
    return geo;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color="#e9974a"
        transparent
        opacity={0.28}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

/** Layered procedural nebula clouds in amber, drifting slowly behind the sky. */
function nebulaTexture(variant: number) {
  if (typeof document === "undefined") return null;
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  let seed = 977 * (variant + 3);
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  const palettes = [
    ["rgba(255,196,120,0.55)", "rgba(196,86,32,0.28)", "rgba(74,26,12,0)"],
    ["rgba(255,150,70,0.42)", "rgba(140,52,24,0.24)", "rgba(40,16,8,0)"],
    ["rgba(255,226,178,0.34)", "rgba(206,110,46,0.2)", "rgba(30,12,6,0)"],
  ];
  const palette = palettes[variant % palettes.length]!;

  ctx.clearRect(0, 0, size, size);
  for (let i = 0; i < 70; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 30 + rand() * 150;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, palette[0]!);
    grad.addColorStop(0.45, palette[1]!);
    grad.addColorStop(1, palette[2]!);
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.45 + rand() * 0.7), rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // dark dust lanes to break up the glow
  ctx.globalCompositeOperation = "destination-out";
  for (let i = 0; i < 34; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 20 + rand() * 110;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, "rgba(0,0,0,0.55)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.4 + rand() * 0.8), rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = "source-over";

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function NebulaShell() {
  const layers = useRef<(THREE.Mesh | null)[]>([]);
  const textures = useMemo(() => [0, 1, 2].map((v) => nebulaTexture(v)), []);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    layers.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.y += delta * (0.004 + i * 0.0025);
      mesh.rotation.x += delta * 0.0012 * (i % 2 === 0 ? 1 : -1);
    });
  });

  const configs = [
    { radius: 19, opacity: 0.5, repeat: 1.6, rotation: [0.2, 0, 0.1] },
    { radius: 21.5, opacity: 0.38, repeat: 2.4, rotation: [-0.4, 1.2, -0.2] },
    { radius: 24, opacity: 0.28, repeat: 1.1, rotation: [0.9, 2.4, 0.4] },
  ] as const;

  return (
    <group>
      {configs.map((cfg, i) => {
        const tex = textures[i];
        if (tex) tex.repeat.set(cfg.repeat, cfg.repeat);
        return (
          <mesh
            key={i}
            ref={(el) => {
              layers.current[i] = el;
            }}
            rotation={cfg.rotation as unknown as [number, number, number]}
          >
            <sphereGeometry args={[cfg.radius, 48, 32]} />
            <meshBasicMaterial
              map={tex ?? null}
              side={THREE.BackSide}
              transparent
              opacity={cfg.opacity}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/** Real-sky star field with constellation figures and an amber nebula backdrop. */
export default function StarSky() {
  const starTexture = useStarTexture();
  const group = useRef<THREE.Group>(null);

  const brightStars = useMemo(
    () => [...fieldStars, ...constellations.flatMap((c) => c.stars)],
    [],
  );

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (group.current) group.current.rotation.y += delta * 0.012;
  });

  return (
    <>
      <NebulaShell />
      <group ref={group} rotation={[0.35, 0.6, 0.08]}>
        <BackgroundStars texture={starTexture} />
        <StarPoints stars={brightStars} texture={starTexture} size={0.42} />
        <ConstellationLines />
      </group>
    </>
  );
}
