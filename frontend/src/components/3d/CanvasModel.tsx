import { Canvas } from '@react-three/fiber';
import { Environment, Center, OrbitControls } from '@react-three/drei';
import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';

interface CanvasModelProps {
    enableOrbitControls?: boolean;
}

const CanvasModel = ({ enableOrbitControls = false }: CanvasModelProps) => {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 0], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
            className="w-full max-w-full h-full transition-all ease-in"
            style={{ touchAction: 'none' }}
        >
            <ambientLight intensity={0.5} />
            <Environment preset="city" />

            {enableOrbitControls ? (
                <>
                    <OrbitControls
                        enableZoom={true}
                        enablePan={true}
                        minDistance={2}
                        maxDistance={10}
                        maxPolarAngle={Math.PI / 2}
                        enableDamping
                        dampingFactor={0.05}
                    />
                    <Backdrop />
                    <Center>
                        <Shirt />
                    </Center>
                </>
            ) : (
                <CameraRig>
                    <Backdrop />
                    <Center>
                        <Shirt />
                    </Center>
                </CameraRig>
            )}
        </Canvas>
    );
};

export default CanvasModel;
