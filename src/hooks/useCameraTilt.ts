import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

import { CAMERA_TARGET } from '../constants';
import { useIsPointerOverCanvas } from './useIsPointerOverCanvas';

type CameraTiltOptions = {
    /** furthest the camera slides left or right of its rest position, in world units */
    horizontalReach?: number;
    /** furthest the camera slides up or down from its rest position, in world units */
    verticalReach?: number;
    /** how fast the camera catches up, in 1/seconds */
    smoothing?: number;
};

export function useCameraTilt({
    horizontalReach = 3.2,
    verticalReach = 1.8,
    smoothing = 2,
}: CameraTiltOptions = {}) {
    const camera = useThree((state) => state.camera);
    const isPointerOverCanvas = useIsPointerOverCanvas();

    const target = useMemo(() => new THREE.Vector3(...CAMERA_TARGET), []);
    const restPosition = useMemo(() => new THREE.Vector3(), []);
    const restRight = useMemo(() => new THREE.Vector3(), []);
    const restUp = useMemo(() => new THREE.Vector3(), []);
    const tiltedPosition = useMemo(() => new THREE.Vector3(), []);

    useEffect(() => {
        camera.updateMatrixWorld();
        camera.matrixWorld.extractBasis(restRight, restUp, new THREE.Vector3());

        restPosition.copy(camera.position);
    }, [camera, restPosition, restRight, restUp]);

    useFrame(({ pointer }, delta) => {
        tiltedPosition.copy(restPosition);

        if (isPointerOverCanvas.current) {
            tiltedPosition
                .addScaledVector(restRight, pointer.x * horizontalReach)
                .addScaledVector(restUp, pointer.y * verticalReach);
        }

        camera.position.lerp(tiltedPosition, 1 - Math.exp(-smoothing * delta));
        camera.lookAt(target);
    });
}
