import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import state from '../../store';

const Shirt = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/models/shirt_baked.glb') as any;

    const logoTexture = snap.isLogoTexture ? useTexture(snap.logoDecal) : null;
    const fullTexture = snap.isFullTexture ? useTexture(snap.fullDecal) : null;

    useFrame((_, delta) => {
        if (materials.lambert1) {
            easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
        }
    });

    const stateString = JSON.stringify(snap);

    return (
        <group key={stateString}>
            <mesh
                castShadow
                geometry={nodes.T_Shirt_male?.geometry}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}
            >
                {snap.isFullTexture && fullTexture && (
                    <Decal
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={1}
                        map={fullTexture}
                    />
                )}

                {snap.isLogoTexture && logoTexture && (
                    <Decal
                        position={[0, 0.04, 0.15]}
                        rotation={[0, 0, 0]}
                        scale={0.15}
                        map={logoTexture}
                        // @ts-ignore
                        map-anisotropy={16}
                        depthTest={false}
                        depthWrite={true}
                    />
                )}
            </mesh>
        </group>
    );
};

export default Shirt;
