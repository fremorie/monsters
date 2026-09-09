import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

type EyeTrackingOptions = {
    /** furthest the gaze swings left or right of the viewer, in degrees */
    maxYaw?: number;
    /** furthest the gaze swings up or down from the viewer, in degrees */
    maxPitch?: number;
    /** >1 responds quickly near the center and flattens toward the screen edges; approaches a linear response as it nears 0 */
    falloff?: number;
    /** how fast the gaze catches up, in 1/seconds */
    smoothing?: number;
};

export function useCyclopsEyeTracking({
    maxYaw = 18,
    maxPitch = 12,
    falloff = 1.2,
    smoothing = 6,
}: EyeTrackingOptions = {}) {
    const eyeRef = useRef<THREE.Mesh>(null);

    const camera = useThree((state) => state.camera);
    const domElement = useThree((state) => state.gl.domElement);

    const cameraBasis = useMemo(
        () => ({ right: new THREE.Vector3(), up: new THREE.Vector3() }),
        [],
    );

    const gazeTarget = useMemo(() => new THREE.Vector3(), []);
    const gazeCurrent = useMemo(() => camera.position.clone(), [camera]);

    const reach = useRef({ horizontal: 0, vertical: 0 });
    const isPointerOverCanvas = useRef(false);

    const response = useMemo(() => {
        const curve = Math.max(falloff, 1e-3);
        return { curve, atEdge: Math.tanh(curve) };
    }, [falloff]);

    useEffect(() => {
        const eye = eyeRef.current;
        if (!eye) return;

        camera.updateMatrixWorld();
        camera.matrixWorld.extractBasis(
            cameraBasis.right,
            cameraBasis.up,
            new THREE.Vector3(),
        );

        const eyeCenter = eye.getWorldPosition(new THREE.Vector3());
        const eyeToCameraDistance = eyeCenter.distanceTo(camera.position);

        reach.current = {
            horizontal:
                eyeToCameraDistance *
                Math.tan(THREE.MathUtils.degToRad(maxYaw)),
            vertical:
                eyeToCameraDistance *
                Math.tan(THREE.MathUtils.degToRad(maxPitch)),
        };
    }, [camera, maxYaw, maxPitch, cameraBasis]);

    useEffect(() => {
        const handlePointerMove = () => {
            isPointerOverCanvas.current = true;
        };
        const handlePointerLeave = () => {
            isPointerOverCanvas.current = false;
        };

        domElement.addEventListener('pointermove', handlePointerMove);
        domElement.addEventListener('pointerleave', handlePointerLeave);

        return () => {
            domElement.removeEventListener('pointermove', handlePointerMove);
            domElement.removeEventListener('pointerleave', handlePointerLeave);
        };
    }, [domElement]);

    useFrame(({ pointer }, delta) => {
        const eye = eyeRef.current;
        if (!eye) return;

        gazeTarget.copy(camera.position);

        if (isPointerOverCanvas.current) {
            const swingX =
                Math.tanh(pointer.x * response.curve) / response.atEdge;
            const swingY =
                Math.tanh(pointer.y * response.curve) / response.atEdge;

            gazeTarget.addScaledVector(
                cameraBasis.right,
                swingX * reach.current.horizontal,
            );
            gazeTarget.addScaledVector(
                cameraBasis.up,
                swingY * reach.current.vertical,
            );
        }

        gazeCurrent.lerp(gazeTarget, 1 - Math.exp(-smoothing * delta));

        eye.lookAt(gazeCurrent);
    });

    return { eyeRef };
}
