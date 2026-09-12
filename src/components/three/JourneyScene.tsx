import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { JourneyWorld } from "@/data/journeys";

function useDrift(strength = 0.25) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ pointer, clock }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      pointer.x * strength + Math.sin(t * 0.08) * 0.1,
      2.4,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -pointer.y * strength * 0.5,
      2.4,
      delta,
    );
  });
  return group;
}

function Forest() {
  const group = useDrift(0.3);
  const trees = useMemo(() => {
    const rng = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
      };
    };
    const rand = rng(42);
    return Array.from({ length: 42 }, (_, i) => {
      const angle = rand() * Math.PI * 2;
      const radius = 2.2 + rand() * 5.5;
      const height = 1.2 + rand() * 2.4;
      return {
        key: i,
        position: [Math.cos(angle) * radius, height * 0.28 - 1.3, Math.sin(angle) * radius] as const,
        height,
        tilt: (rand() - 0.5) * 0.14,
      };
    });
  }, []);

  return (
    <group ref={group}>
      {trees.map((t) => (
        <group key={t.key} position={[t.position[0], t.position[1], t.position[2]]} rotation={[t.tilt, 0, -t.tilt]}>
          <mesh position={[0, t.height * 0.5, 0]}>
            <coneGeometry args={[t.height * 0.34, t.height, 7]} />
            <meshStandardMaterial color="#123a26" roughness={0.9} emissive="#0f5132" emissiveIntensity={0.18} />
          </mesh>
          <mesh position={[0, t.height * 0.16, 0]}>
            <cylinderGeometry args={[0.05, 0.08, t.height * 0.36, 6]} />
            <meshStandardMaterial color="#241a12" roughness={1} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -1.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[9, 48]} />
        <meshStandardMaterial color="#07130c" roughness={1} />
      </mesh>
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
        <mesh position={[0, 0.4, 0]}>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshPhysicalMaterial
            color="#7ee2a8"
            emissive="#1fae5e"
            emissiveIntensity={0.9}
            roughness={0.25}
            transmission={0.4}
          />
        </mesh>
      </Float>
      <Sparkles count={220} scale={[14, 7, 14]} size={3.2} speed={0.35} color="#a8f0c0" position={[0, 1, 0]} />
      <ambientLight intensity={0.22} color="#9fd8b4" />
      <directionalLight position={[3, 7, 4]} intensity={1.1} color="#d9f7e2" />
      <pointLight position={[0, 0.6, 0]} intensity={18} color="#3ddc84" distance={9} />
      <fog attach="fog" args={["#04120a", 6, 15]} />
    </group>
  );
}

function Ruins() {
  const group = useDrift(0.28);
  const columns = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        const row = Math.floor(i / 2);
        const broken = i % 3 === 0;
        return {
          key: i,
          position: [side * (2.4 + (row % 2) * 0.5), -0.6, -row * 1.35 + 2.5] as const,
          height: broken ? 0.9 + (i % 4) * 0.3 : 2.6,
          fallen: i % 5 === 0,
        };
      }),
    [],
  );

  return (
    <group ref={group}>
      {columns.map((c) =>
        c.fallen ? (
          <mesh key={c.key} position={[c.position[0] * 0.7, -1.15, c.position[2]]} rotation={[Math.PI / 2, 0, c.key]}>
            <cylinderGeometry args={[0.28, 0.32, 2.2, 10]} />
            <meshStandardMaterial color="#8a7358" roughness={0.95} />
          </mesh>
        ) : (
          <group key={c.key} position={[c.position[0], c.position[1], c.position[2]]}>
            <mesh position={[0, c.height / 2, 0]}>
              <cylinderGeometry args={[0.26, 0.32, c.height, 10]} />
              <meshStandardMaterial color="#9a8264" roughness={0.92} />
            </mesh>
            <mesh position={[0, c.height + 0.08, 0]}>
              <boxGeometry args={[0.74, 0.16, 0.74]} />
              <meshStandardMaterial color="#a89070" roughness={0.9} />
            </mesh>
          </group>
        ),
      )}
      <mesh position={[0, -1.34, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[10, 48]} />
        <meshStandardMaterial color="#2b2118" roughness={1} />
      </mesh>
      {/* the last standing arch */}
      <group position={[0, -0.7, -2.4]}>
        <mesh position={[-0.9, 1.1, 0]}>
          <boxGeometry args={[0.34, 2.2, 0.34]} />
          <meshStandardMaterial color="#a58a66" roughness={0.9} />
        </mesh>
        <mesh position={[0.9, 1.1, 0]}>
          <boxGeometry args={[0.34, 2.2, 0.34]} />
          <meshStandardMaterial color="#a58a66" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.28, 0]}>
          <boxGeometry args={[2.3, 0.3, 0.4]} />
          <meshStandardMaterial color="#b0946e" roughness={0.88} />
        </mesh>
      </group>
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.45}>
        <mesh position={[0, 0.9, -2.4]}>
          <octahedronGeometry args={[0.42, 0]} />
          <meshPhysicalMaterial color="#f2b25c" emissive="#c26a1b" emissiveIntensity={0.85} roughness={0.3} metalness={0.4} />
        </mesh>
      </Float>
      <Sparkles count={160} scale={[12, 6, 12]} size={2.4} speed={0.22} color="#e8c9a0" position={[0, 0.6, 0]} />
      <ambientLight intensity={0.3} color="#e8c39a" />
      <directionalLight position={[-5, 4, 2]} intensity={1.6} color="#ffbe78" />
      <pointLight position={[0, 1.2, -2.2]} intensity={20} color="#ff8c2e" distance={10} />
      <fog attach="fog" args={["#1a120a", 6.5, 15]} />
    </group>
  );
}

function Sky() {
  const group = useDrift(0.34);
  const isles = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const angle = (i / 7) * Math.PI * 2;
        const radius = 2.6 + (i % 3) * 1.1;
        return {
          key: i,
          position: [Math.cos(angle) * radius, Math.sin(i * 1.7) * 1.1, Math.sin(angle) * radius] as const,
          scale: 0.5 + (i % 3) * 0.28,
          speed: 0.9 + (i % 4) * 0.3,
        };
      }),
    [],
  );

  return (
    <group ref={group}>
      {isles.map((isle) => (
        <Float key={isle.key} speed={isle.speed} rotationIntensity={0.3} floatIntensity={0.9}>
          <group position={[isle.position[0], isle.position[1], isle.position[2]]} scale={isle.scale}>
            <mesh>
              <dodecahedronGeometry args={[0.7, 0]} />
              <meshStandardMaterial color="#5b6f8f" roughness={0.85} flatShading />
            </mesh>
            <mesh position={[0, 0.55, 0]}>
              <coneGeometry args={[0.5, 0.5, 6]} />
              <meshStandardMaterial color="#7fb069" roughness={0.9} flatShading />
            </mesh>
            <mesh position={[0, 0.95, 0]}>
              <coneGeometry args={[0.16, 0.55, 5]} />
              <meshStandardMaterial color="#e8eef7" roughness={0.6} />
            </mesh>
          </group>
        </Float>
      ))}
      {/* the sun court */}
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.4}>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.62, 24, 24]} />
          <meshPhysicalMaterial color="#ffd98a" emissive="#ffab2e" emissiveIntensity={1.1} roughness={0.35} />
        </mesh>
      </Float>
      <Sparkles count={180} scale={[16, 8, 16]} size={2.6} speed={0.28} color="#cfe4ff" />
      <ambientLight intensity={0.5} color="#bcd6ff" />
      <directionalLight position={[4, 6, 3]} intensity={1.7} color="#fff3d6" />
      <pointLight position={[0, 0.6, 0]} intensity={16} color="#ffb84d" distance={11} />
      <fog attach="fog" args={["#0a1626", 7, 16]} />
    </group>
  );
}

export default function JourneyScene({ world }: { world: JourneyWorld }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.6, 8.2], fov: 48 }} gl={{ alpha: true, antialias: true }}>
      {world === "forest" ? <Forest /> : world === "ruins" ? <Ruins /> : <Sky />}
      <Environment>
        <Lightformer intensity={1.6} color="#f7c77d" position={[0, 4, 2]} scale={[8, 3, 1]} />
        <Lightformer intensity={0.9} color="#5f7fb0" position={[-5, 0, -1]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
      </Environment>
    </Canvas>
  );
}
