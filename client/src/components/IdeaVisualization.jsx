import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const AXIS_LEN = 11;
const COLORS = [
  '#4f8ef7', '#f76f4f', '#4ff79e', '#f7d94f', '#c44ff7',
  '#4ff7f0', '#f74fa8', '#a8f74f', '#f7a84f', '#4f4ff7',
];

function Axes() {
  const axes = [
    { points: [[0,0,0],[AXIS_LEN,0,0]], color: '#e05555', label: 'Expense (X)', pos: [AXIS_LEN+0.5,0,0] },
    { points: [[0,0,0],[0,AXIS_LEN,0]], color: '#55e055', label: 'Energy (Y)', pos: [0,AXIS_LEN+0.5,0] },
    { points: [[0,0,0],[0,0,AXIS_LEN]], color: '#5555e0', label: 'Impact (Z)', pos: [0,0,AXIS_LEN+0.5] },
  ];

  const ticks = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <>
      {axes.map(({ points, color, label, pos }) => (
        <group key={label}>
          <Line points={points} color={color} lineWidth={2} />
          <Text position={pos} fontSize={0.5} color={color} anchorX="center" anchorY="middle">
            {label}
          </Text>
        </group>
      ))}
      {ticks.map(t => (
        <group key={t}>
          <Text position={[t, -0.4, 0]} fontSize={0.3} color="#888" anchorX="center">{t}</Text>
          <Text position={[-0.4, t, 0]} fontSize={0.3} color="#888" anchorX="center">{t}</Text>
          <Text position={[0, -0.4, t]} fontSize={0.3} color="#888" anchorX="center">{t}</Text>
        </group>
      ))}
    </>
  );
}

function GridPlane() {
  const lines = [];
  for (let i = 1; i <= 10; i++) {
    lines.push(
      <Line key={`xz-x${i}`} points={[[i,0,0],[i,0,10]]} color="#333" lineWidth={0.5} />,
      <Line key={`xz-z${i}`} points={[[0,0,i],[10,0,i]]} color="#333" lineWidth={0.5} />,
    );
  }
  return <>{lines}</>;
}

function IdeaPoint({ idea, color, onHover }) {
  const meshRef = useRef();

  return (
    <group position={[idea.expense, idea.energy, idea.impact]}>
      <mesh
        ref={meshRef}
        onPointerOver={() => onHover(idea.id)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      <Text
        position={[0, 0.45, 0]}
        fontSize={0.35}
        color="white"
        anchorX="center"
        anchorY="bottom"
        maxWidth={3}
      >
        {idea.title}
      </Text>
    </group>
  );
}

export default function IdeaVisualization({ ideas, onHover }) {
  return (
    <div className="viz-container">
      <Canvas
        camera={{ position: [18, 14, 18], fov: 45 }}
        style={{ background: '#111' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[15, 15, 15]} intensity={1} />
        <Axes />
        <GridPlane />
        {ideas.map((idea, i) => (
          <IdeaPoint
            key={idea.id}
            idea={idea}
            color={COLORS[i % COLORS.length]}
            onHover={onHover}
          />
        ))}
        <OrbitControls makeDefault />
      </Canvas>
      <div className="viz-hint">Drag to rotate · Scroll to zoom · Right-drag to pan</div>
    </div>
  );
}
