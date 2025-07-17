import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';

function Cube() {
  const meshRef = useRef<Mesh>(null!);

  useFrame((_state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
}

function App() {
  return (
    <Canvas
      camera={{ position: [2, 2, 2], fov: 25 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Cube />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

export default App;
