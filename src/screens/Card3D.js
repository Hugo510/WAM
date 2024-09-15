import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useFrame } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';

// Crear una tarjeta con rotación animada
const Card3D = () => {
    const cardRef = useRef();

    // Rotar la tarjeta continuamente
    useFrame(() => {
        cardRef.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={cardRef} position={[0, 0, 0]} scale={[2.5, 1.5, 0.1]}>
            <boxGeometry args={[2, 1, 0.1]} /> {/* Tamaño de la tarjeta */}
            <meshStandardMaterial color="#d32f2f" metalness={0.5} roughness={0.3} /> {/* Material de la tarjeta */}
        </mesh>
    );
};

// Configurar la escena 3D
const Scene = () => {
    return (
        <Canvas style={{ height: 300 }}>
            {/* Iluminación */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 5, 2]} intensity={1} />
            <Card3D />
            {/* Controles de la cámara para rotar */}
            <OrbitControls enableZoom={false} />
        </Canvas>
    );
};

export default Scene;
