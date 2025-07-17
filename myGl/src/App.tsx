import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';

function Cube() {
  const meshRef = useRef<Mesh>(null!);

  useFrame((_state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'#5A7D5A'} />
    </mesh>
  );
}

function App() {
  return (
    <Canvas
      orthographic
      camera={{
        zoom: 150,
        position: [0, 0, 5],
      }}
    >
      <color attach="background" args={['#D8E4D8']} />
      <ambientLight intensity={1.5} color="#E0FFE0" />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <Cube />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

export default App;
