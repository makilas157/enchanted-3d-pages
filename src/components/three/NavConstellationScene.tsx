import "@/lib/three-dev-attrs";
import { Environment, Float, Html, Lightformer } from "@react-three/drei";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useNavigate } from "@tanstack/react-router";
import { navDestinations, type NavDestination } from "@/data/site";

function NavNode({
  item,
  index,
  total,
  active,
  onHover,
  onSelect,
}: {
  item: NavDestination;
  index: number;
  total: number;
  active: boolean;
  onHover: (slug: string | null) => void;
  onSelect: (item: NavDestination) => void;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const angle = (index / total) * Math.PI * 2;
  const radius = 3.15;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius * 0.42;
  const z = Math.sin(angle) * 1.1;

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!mesh.current) return;
    const target = active ? 1.34 : 1;
    const s = THREE.MathUtils.damp(mesh.current.scale.x, target, 6, delta);
    mesh.current.scale.setScalar(s);
    mesh.current.rotation.y += delta * (active ? 0.9 : 0.28);
    mesh.current.rotation.x += delta * 0.12;
  });

  const stop = (event: ThreeEvent<PointerEvent>) => event.stopPropagation();

  return (
    <group position={[x, y, z]}>
      <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.5}>
        <mesh
          ref={mesh}
          onPointerOver={(e) => {
            stop(e);
            onHover(item.slug);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={(e) => {
            stop(e);
            onHover(null);
            document.body.style.cursor = "";
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
          castShadow
        >
          <icosahedronGeometry args={[0.62, 0]} />
          <meshPhysicalMaterial
            color={active ? "#f6c98a" : "#e58b32"}
            emissive={active ? "#b4551f" : "#5c2a11"}
            emissiveIntensity={active ? 0.6 : 0.28}
            metalness={0.72}
            roughness={0.24}
            clearcoat={0.6}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.2, 0.3, 0]}>
          <torusGeometry args={[0.95, 0.006, 8, 96]} />
          <meshBasicMaterial color="#efaa55" transparent opacity={active ? 0.7 : 0.3} />
        </mesh>
        <Html center distanceFactor={9} position={[0, -1.15, 0]} zIndexRange={[20, 0]}>
          <span
            className={`nav-node-label ${active ? "is-active" : ""}`}
            onClick={() => onSelect(item)}
          >
            {item.label}
          </span>
        </Html>
      </Float>
    </group>
  );
}

function OrbitingKnot() {
  const pivot = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (pivot.current) pivot.current.rotation.y += delta * 0.22;
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.35;
      mesh.current.rotation.z += delta * 0.18;
    }
  });

  return (
    <group ref={pivot} rotation={[0.32, 0, 0.18]}>
      <group position={[0, -2.1, 0]}>
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
          <mesh ref={mesh} castShadow>
            <torusKnotGeometry args={[0.42, 0.14, 128, 16]} />
            <meshPhysicalMaterial
              color="#e58b32"
              emissive="#5c2a11"
              emissiveIntensity={0.32}
              metalness={0.78}
              roughness={0.22}
              clearcoat={0.7}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2.4, -0.4, 0]}>
            <torusGeometry args={[0.85, 0.005, 8, 96]} />
            <meshBasicMaterial color="#efaa55" transparent opacity={0.35} />
          </mesh>
        </Float>
      </group>
    </group>
  );
}

function OrbitingSpiral() {
  const pivot = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const loops = 2.5;
    const radius = 0.55;
    const height = 1.25;
    const segments = 120;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 2 * loops;
      const r = radius * (1 - t * 0.3);
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = (t - 0.5) * height;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (pivot.current) pivot.current.rotation.y -= delta * 0.18;
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.22;
      mesh.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={pivot} rotation={[0.2, 0, -0.22]}>
      <group position={[0, 2.25, 0]}>
        <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.55}>
          <mesh ref={mesh} castShadow>
            <tubeGeometry args={[curve, 120, 0.038, 8, false]} />
            <meshPhysicalMaterial
              color="#f6c98a"
              emissive="#b4551f"
              emissiveIntensity={0.55}
              metalness={0.65}
              roughness={0.18}
              clearcoat={1}
              transparent
              opacity={0.94}
            />
          </mesh>
        </Float>
      </group>
    </group>
  );
}

function Constellation({
  activeSlug,
  onHover,
  onSelect,
}: {
  activeSlug: string | null;
  onHover: (slug: string | null) => void;
  onSelect: (item: NavDestination) => void;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ pointer }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      pointer.x * 0.34,
      3.2,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -pointer.y * 0.18,
      3.2,
      delta,
    );
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshPhysicalMaterial
          color="#f5d9a7"
          emissive="#a94d20"
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.3}
          wireframe
        />
      </mesh>
      <OrbitingKnot />
      <OrbitingSpiral />
      {navDestinations.map((item, index) => (
        <NavNode
          key={item.slug}
          item={item}
          index={index}
          total={navDestinations.length}
          active={activeSlug === item.slug}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

export default function NavConstellationScene({
  activeSlug,
  onHover,
}: {
  activeSlug: string | null;
  onHover: (slug: string | null) => void;
}) {
  const navigate = useNavigate();
  const [, setTick] = useState(0);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8.4], fov: 46 }}
      gl={{ alpha: true, antialias: true }}
      shadows
      onCreated={() => setTick(1)}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} color="#ffd69c" castShadow />
      <pointLight position={[-3, -1, 3]} intensity={16} color="#b9401f" distance={14} />
      <Constellation
        activeSlug={activeSlug}
        onHover={onHover}
        onSelect={(item) => {
          document.body.style.cursor = "";
          navigate({ to: item.to });
        }}
      />
      <Environment>
        <Lightformer intensity={2.4} color="#f7c77d" position={[0, 4, 2]} scale={[8, 3, 1]} />
        <Lightformer
          intensity={1.4}
          color="#b64c28"
          position={[-5, 0, -1]}
          rotation-y={Math.PI / 2}
          scale={[8, 2, 1]}
        />
      </Environment>
    </Canvas>
  );
}
