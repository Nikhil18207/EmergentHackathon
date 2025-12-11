import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { Group } from 'three';

interface CameraRigProps {
    children: React.ReactNode;
}

const CameraRig = ({ children }: CameraRigProps) => {
    const group = useRef<Group>(null);

    useFrame((state, delta) => {
        const isBreakpoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        // Set the initial position of the model
        let targetPosition: [number, number, number] = [0, 0, 2];

        if (isMobile) {
            targetPosition = [0, 0.2, 2.5];
        } else if (isBreakpoint) {
            targetPosition = [0, 0, 2.2];
        } else {
            targetPosition = [0, 0, 2];
        }

        // Set model camera position with smooth easing
        easing.damp3(state.camera.position, targetPosition, 0.25, delta);

        // Set the model rotation smoothly based on mouse position
        if (group.current) {
            easing.dampE(
                group.current.rotation,
                [state.pointer.y / 10, -state.pointer.x / 5, 0],
                0.25,
                delta
            );
        }
    });

    return <group ref={group}>{children}</group>;
};

export default CameraRig;
