import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Center } from '@react-three/drei';
import { ReactNode } from 'react';
import CameraRig from './CameraRig';
import Backdrop from './Backdrop';

interface SceneProps {
    children: ReactNode;
    lighting?: 'studio' | 'outdoor' | 'neon';
    background?: string;
}

export function Scene({ children, lighting = 'studio', background = '#f5f5f5' }: SceneProps) {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 0], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
            dpr={[1, 2]}
        >
            {/* Background */}
            <color attach="background" args={[background]} />

            {/* Lighting based on preset */}
            {lighting === 'studio' && (
                <>
                    <ambientLight intensity={0.5} />
                    <spotLight
                        intensity={0.5}
                        angle={0.1}
                        penumbra={1}
                        position={[10, 15, 10]}
                        castShadow
                    />
                </>
            )}

            {lighting === 'outdoor' && (
                <>
                    <ambientLight intensity={0.7} />
                    <directionalLight
                        position={[5, 10, 7.5]}
                        intensity={1.5}
                        castShadow
                    />
                    <hemisphereLight args={['#87CEEB', '#8B4513', 0.5]} />
                </>
            )}

            {lighting === 'neon' && (
                <>
                    <ambientLight intensity={0.2} />
                    <pointLight position={[0, 2, 0]} intensity={2} color="#ff00ff" />
                    <pointLight position={[2, 0, 0]} intensity={2} color="#00ffff" />
                    <pointLight position={[-2, 0, 0]} intensity={2} color="#ffff00" />
                    <fog attach="fog" args={['#000000', 5, 15]} />
                </>
            )}

            {/* Camera Rig with mouse-following rotation */}
            <CameraRig>
                {/* Backdrop with professional shadows */}
                <Backdrop />

                {/* Center the model */}
                <Center>
                    {children}
                </Center>
            </CameraRig>

            {/* Environment map for realistic reflections */}
            <Environment preset="city" />
        </Canvas>
    );
}

export default Scene;
