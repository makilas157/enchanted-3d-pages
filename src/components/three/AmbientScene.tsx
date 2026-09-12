import { Environment, Float, Lightformer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const pageShapes: Record<string, number> = {
  "/": 0,
  "/services": 1,
  "/products": 2,
  "/projects": 3,
  "/why-us": 4,
  "/about": 5,
  "/blogs": 6,
  "/contact": 7,
};

function SculpturalCore({ pathname }: { pathname: string }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const detailPath = pathname.split("/").filter(Boolean)[0];
  const shapeIndex = pageShapes[`/${detailPath ?? ""}`] ?? 0;

  useFrame(({ pointer }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, pointer.y * 0.18, 4, delta);
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        pointer.x * 0.28 + shapeIndex * 0.16,
        4,
        delta,
      );
    }
    if (inner.current) inner.current.rotation.z += delta * 0.12;
  });

  return (
    <group ref={group} position={[2.65, 0.15, -1.5]} rotation={[0.2, shapeIndex * 0.16, 0.08]}>
      <Float speed={1.15} rotationIntensity={0.22} floatIntensity={0.38}>
        <mesh castShadow>
          <torusKnotGeometry args={[1.62, 0.34, 160, 24, 2 + (shapeIndex % 2), 3]} />
          <meshPhysicalMaterial
            color="#e58b32"
            metalness={0.78}
            roughness={0.22}
            clearcoat={0.7}
            clearcoatRoughness={0.2}
          />
        </mesh>
        <mesh ref={inner} scale={0.68}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshPhysicalMaterial
            color="#f5d9a7"
            emissive="#a94d20"
            emissiveIntensity={0.28}
            metalness={0.42}
            roughness={0.3}
            wireframe
          />
        </mesh>
      </Float>
      <mesh rotation={[1.2, 0.25, shapeIndex * 0.2]}>
        <torusGeometry args={[2.45, 0.018, 8, 160]} />
        <meshBasicMaterial color="#efaa55" transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[0.45, 1.1, -0.55]}>
        <torusGeometry args={[2.85, 0.012, 8, 160]} />
        <meshBasicMaterial color="#d56735" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function Dust() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(120 * 3);
    for (let index = 0; index < 120; index += 1) {
      const angle = index * 2.39996;
      const radius = 2.5 + ((index * 47) % 100) / 15;
      values[index * 3] = Math.cos(angle) * radius;
      values[index * 3 + 1] = (((index * 31) % 100) / 100 - 0.5) * 8;
      values[index * 3 + 2] = Math.sin(angle) * radius - 2;
    }
    return values;
  }, []);

  useFrame((_, rawDelta) => {
    if (points.current) points.current.rotation.y += Math.min(rawDelta, 0.05) * 0.018;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#e9a052" size={0.025} transparent opacity={0.58} sizeAttenuation />
    </points>
  );
}

export default function AmbientScene({ pathname }: { pathname: string }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      shadows
    >
      <ambientLight intensity={0.38} />
      <directionalLight position={[4, 6, 5]} intensity={2.6} color="#ffd69c" castShadow />
      <pointLight position={[-3, -1, 3]} intensity={18} color="#b9401f" distance={12} />
      <SculpturalCore pathname={pathname} />
      <Dust />
      <Environment>
        <Lightformer intensity={2.5} color="#f7c77d" position={[0, 4, 2]} scale={[8, 3, 1]} />
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