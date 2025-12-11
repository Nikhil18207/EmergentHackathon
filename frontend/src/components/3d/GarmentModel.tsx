import { useEffect, useRef, Suspense } from 'react';
import { useGLTF, Decal, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import * as THREE from 'three';

interface GarmentModelProps {
    modelPath?: string;
    primaryColor: string;
    secondaryColor?: string;
    accentColor?: string;
    material: {
        roughness: number;
        metalness: number;
        textureUrl?: string;
    };
    scale: number;
    features?: string[];
    logoTexture?: string;
    fullTexture?: string;
}

// Component to load actual GLB models with professional rendering
function LoadedModel({
    modelPath,
    primaryColor,
    material,
    features,
    scale,
    logoTexture,
    fullTexture
}: {
    modelPath: string;
    primaryColor: string;
    material: any;
    features: string[];
    scale: number;
    logoTexture?: string;
    fullTexture?: string;
}) {
    const { scene, nodes, materials } = useGLTF(modelPath) as any;
    const clonedScene = scene.clone();

    // Load textures if provided
    const logo = logoTexture ? useTexture(logoTexture) : null;
    const full = fullTexture ? useTexture(fullTexture) : null;

    // Smooth color transition using maath easing
    useFrame((state, delta) => {
        clonedScene.traverse((child: any) => {
            if (child.isMesh && child.material) {
                easing.dampC(child.material.color, primaryColor, 0.25, delta);
            }
        });
    });

    useEffect(() => {
        clonedScene.traverse((child: any) => {
            if (child.isMesh) {
                // Clone material to avoid affecting other instances
                child.material = child.material.clone();

                // Apply material properties
                child.material.roughness = material.roughness;
                child.material.metalness = material.metalness;

                // Apply emissive for reflective features
                if (features.includes('reflective-piping')) {
                    child.material.emissive = new THREE.Color('#ffffff');
                    child.material.emissiveIntensity = 0.3;
                }

                child.castShadow = true;
                child.receiveShadow = true;
                child.material.needsUpdate = true;
            }
        });
    }, [clonedScene, material, features]);

    return (
        <group scale={scale}>
            <primitive object={clonedScene} />
        </group>
    );
}

// Placeholder geometry with professional rendering
function PlaceholderModel({
    primaryColor,
    secondaryColor,
    accentColor,
    material,
    scale,
    features
}: GarmentModelProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    // Smooth color transition
    useFrame((state, delta) => {
        if (meshRef.current && meshRef.current.material instanceof THREE.MeshStandardMaterial) {
            easing.dampC(meshRef.current.material.color, primaryColor, 0.25, delta);
        }
    });

    useEffect(() => {
        if (!meshRef.current) return;

        if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
            meshRef.current.material.roughness = material.roughness;
            meshRef.current.material.metalness = material.metalness;

            if (features?.includes('reflective-piping')) {
                meshRef.current.material.emissive = new THREE.Color('#ffffff');
                meshRef.current.material.emissiveIntensity = 0.3;
            } else {
                meshRef.current.material.emissive = new THREE.Color('#000000');
                meshRef.current.material.emissiveIntensity = 0;
            }

            meshRef.current.material.needsUpdate = true;
        }
    }, [material, features]);

    useEffect(() => {
        if (groupRef.current) {
            groupRef.current.scale.set(scale, scale, scale);
        }
    }, [scale]);

    return (
        <group ref={groupRef}>
            {/* Main Body - T-shirt shape */}
            <mesh ref={meshRef} castShadow receiveShadow position={[0, 0, 0]}>
                <boxGeometry args={[1.8, 2.2, 0.25]} />
                <meshStandardMaterial
                    color={primaryColor}
                    roughness={material.roughness}
                    metalness={material.metalness}
                />
            </mesh>

            {/* Left Sleeve */}
            <mesh castShadow receiveShadow position={[-1.1, 0.6, 0]} rotation={[0, 0, -0.2]}>
                <boxGeometry args={[0.6, 1.2, 0.25]} />
                <meshStandardMaterial
                    color={secondaryColor || primaryColor}
                    roughness={material.roughness}
                    metalness={material.metalness}
                />
            </mesh>

            {/* Right Sleeve */}
            <mesh castShadow receiveShadow position={[1.1, 0.6, 0]} rotation={[0, 0, 0.2]}>
                <boxGeometry args={[0.6, 1.2, 0.25]} />
                <meshStandardMaterial
                    color={secondaryColor || primaryColor}
                    roughness={material.roughness}
                    metalness={material.metalness}
                />
            </mesh>

            {/* Collar/Neck */}
            <mesh castShadow receiveShadow position={[0, 1.3, 0]}>
                <cylinderGeometry args={[0.35, 0.35, 0.3, 16]} />
                <meshStandardMaterial
                    color={accentColor || primaryColor}
                    roughness={material.roughness}
                    metalness={material.metalness}
                />
            </mesh>
        </group>
    );
}

export function GarmentModel(props: GarmentModelProps) {
    const { modelPath } = props;

    // Check if modelPath exists and is a .glb file
    const isGLBModel = modelPath && modelPath.endsWith('.glb');

    return (
        <Suspense fallback={<PlaceholderModel {...props} />}>
            {isGLBModel ? (
                <LoadedModel
                    modelPath={modelPath}
                    primaryColor={props.primaryColor}
                    material={props.material}
                    features={props.features || []}
                    scale={props.scale}
                    logoTexture={props.logoTexture}
                    fullTexture={props.fullTexture}
                />
            ) : (
                <PlaceholderModel {...props} />
            )}
        </Suspense>
    );
}

export default GarmentModel;
