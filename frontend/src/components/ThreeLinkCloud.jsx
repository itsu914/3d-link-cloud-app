import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

export default function ThreeLinkCloud({ links }) {
  // 3D空間内でランダムに配置
  const radius = 5;
  const points = links.map((_, i) => {
    const phi = Math.acos(-1 + (2 * i) / links.length);
    const theta = Math.sqrt(links.length * Math.PI) * phi;
    return [
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi),
    ];
  });

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enablePan enableZoom enableRotate />
      {links.map((link, idx) => (
        <mesh key={link.id || idx} position={points[idx]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color={new THREE.Color(`hsl(${(idx * 360) / links.length}, 80%, 60%)`)} />
          <Html center>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#222",
                background: "#fff9",
                padding: "3px 8px",
                borderRadius: "5px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "0.95rem",
                boxShadow: "0 2px 8px #0003"
              }}
            >
              {link.title}
            </a>
          </Html>
        </mesh>
      ))}
    </Canvas>
  );
}