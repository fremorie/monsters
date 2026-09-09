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
import { BACKGROUND, DIRECTIONAL_LIGHT_POSITION } from './constants';
import { useLightStore } from './store/useLightStore';
import {
    getAmbientLightIntensity,
    getDirectionalLightIntensity,
    getEnvironmentMapIntensity,
} from './utils/light';

export function Environment() {
    const debug = useDebug();
    const brightness = useLightStore((state) => state.brightness);

    const ambientLightIntensity = getAmbientLightIntensity(brightness);
    const directionalLightIntensity = getDirectionalLightIntensity(brightness);
    const environmentMapIntensity = getEnvironmentMapIntensity(brightness);
    const lightRef = useRef<DirectionalLight>(null);
    const shadowCameraRef = useRef<Camera>(null);
    const [hasShadowCamera, setHasShadowCamera] = useState(false);

    const { ambientColor, directionalColor } = useControls('Lights', {
        ambientColor: '#ffefd2',
        directionalColor: '#ffe6b4',
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
                position={DIRECTIONAL_LIGHT_POSITION}
                intensity={directionalLightIntensity}
                shadow-normalBias={0}
                shadow-camera-left={-16}
                shadow-camera-right={16}
                shadow-camera-top={16}
                shadow-camera-bottom={-16}
                shadow-camera-near={20}
                shadow-camera-far={90}
                shadow-radius={3}
                shadow-mapSize={[1024, 1024]}
            />
            <ambientLight
                color={ambientColor}
                intensity={ambientLightIntensity}
            />
            <EnvMap
                preset="studio"
                environmentIntensity={environmentMapIntensity}
            />
            <color attach="background" args={[BACKGROUND]} />
            <fog attach="fog" args={[BACKGROUND, 75, 170]} />
        </>
    );
}
