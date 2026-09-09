import { useCallback, useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import { DIRECTIONAL_LIGHT_POSITION } from '../constants';
import { useLightStore } from '../store/useLightStore';
import { type EyeMaterialImpl } from '../materials/eyeMaterial';
import { damp } from '../utils/damp';
import {
    getExposure,
    getLightAlignment,
    getPupilOpenness,
} from '../utils/pupil';
import { usePupilControls, type PupilControlValues } from './usePupilControls';

const LIGHT_DIRECTION = new THREE.Vector3(
    ...DIRECTIONAL_LIGHT_POSITION,
).normalize();

const DEFAULTS: PupilControlValues = {
    alignmentMin: 0.6,
    alignmentMax: 0.9,
    gazeIndependentLightShare: 0.55,
    exposureMin: 0,
    exposureMax: 1.05,
    smoothing: 2.5,
};

type PupilResponseOptions = Partial<PupilControlValues> & { label: string };

export function usePupilResponse(
    eyeRefs: RefObject<THREE.Mesh | null>[],
    { label, ...overrides }: PupilResponseOptions,
) {
    const openness = useRef<number[]>([]);
    const materials = useRef<(EyeMaterialImpl | null)[]>([]);
    const gazeDotLightDirection = useRef(0);
    const gaze = useMemo(() => new THREE.Vector3(), []);

    const readGazeDotLightDirection = useCallback(
        () => gazeDotLightDirection.current,
        [],
    );

    const controls = usePupilControls(
        label,
        { ...DEFAULTS, ...overrides },
        readGazeDotLightDirection,
    );

    useFrame((_, delta) => {
        const { brightness } = useLightStore.getState();

        for (let index = 0; index < eyeRefs.length; index++) {
            const eye = eyeRefs[index].current;
            if (!eye) continue;

            if (materials.current[index] !== eye.material) {
                materials.current[index] = eye.material as EyeMaterialImpl;
            }

            const material = materials.current[index];
            if (!material?.uniforms?.uPupilOpenness) continue;

            eye.getWorldDirection(gaze);

            const facingLight = gaze.dot(LIGHT_DIRECTION);
            if (index === 0) gazeDotLightDirection.current = facingLight;

            const lightAlignment = getLightAlignment(
                facingLight,
                controls.alignmentMin,
                controls.alignmentMax,
            );

            const exposure = getExposure({
                brightness,
                lightAlignment,
                gazeIndependentLightShare: controls.gazeIndependentLightShare,
            });

            const targetOpenness = getPupilOpenness(
                exposure,
                controls.exposureMin,
                controls.exposureMax,
            );

            const currentOpenness = openness.current[index] ?? targetOpenness;
            const nextOpenness = damp(
                currentOpenness,
                targetOpenness,
                controls.smoothing,
                delta,
            );

            openness.current[index] = nextOpenness;
            material.uniforms.uPupilOpenness.value = nextOpenness;
        }
    });
}
