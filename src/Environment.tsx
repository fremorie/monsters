import { useHelper, Environment as EnvMap } from '@react-three/drei';
import { type RefObject, useEffect, useRef, useState } from 'react';
import {
    CameraHelper,
    DirectionalLightHelper,
    type Camera,
    type DirectionalLight,
    type Object3D,
} from 'three';
import { useControls } from 'leva';

import { useDebug } from './hooks/useDebug';

export function Environment() {
    const debug = useDebug();
    const lightRef = useRef<DirectionalLight>(null);
    const shadowCameraRef = useRef<Camera>(null);
    const [hasShadowCamera, setHasShadowCamera] = useState(false);

    const { ambientColor, directionalColor } = useControls('Lights', {
        ambientColor: '#ffefd2',
        directionalColor: '#fffaf1',
    });

    useEffect(() => {
        if (!lightRef.current) return;

        shadowCameraRef.current = lightRef.current.shadow.camera;
        setHasShadowCamera(true);
    }, []);

    useHelper(
        debug && (lightRef as RefObject<Object3D>),
        DirectionalLightHelper,
        1,
    );
    useHelper(
        debug && hasShadowCamera && (shadowCameraRef as RefObject<Object3D>),
        CameraHelper,
    );

    return (
        <>
            <directionalLight
                ref={lightRef}
                castShadow
                color={directionalColor}
                position={[5, 4, 5]}
                intensity={1.5}
                shadow-normalBias={0}
                shadow-camera-left={-5}
                shadow-camera-right={5}
                shadow-camera-top={2}
                shadow-camera-bottom={-4}
                shadow-camera-near={-5}
                shadow-camera-far={10}
                shadow-radius={10}
                shadow-mapSize={[1500, 1500]}
            />
            <ambientLight color={ambientColor} intensity={1.5} />
            <EnvMap preset="studio" environmentIntensity={0.6} />
        </>
    );
}
