import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

import { type EyeMaterialImpl } from '../materials/eyeMaterial';
import { EYE_DEFAULTS } from '../materials/eyeUniforms';

export type EyeColorValues = {
    baseColor: string;
    noiseColor: string;
    centerColor: string;
    stripesColor: string;
    scleraEdgeColor: string;
};

const DEFAULTS: EyeColorValues = {
    baseColor: EYE_DEFAULTS.baseColor,
    noiseColor: EYE_DEFAULTS.noiseColor,
    centerColor: EYE_DEFAULTS.centerColor,
    stripesColor: EYE_DEFAULTS.stripesColor,
    scleraEdgeColor: EYE_DEFAULTS.scleraEdgeColor,
};

type EyeColorControlsOptions = Partial<EyeColorValues> & { label: string };

export function useEyeColorControls(
    eyeRefs: RefObject<THREE.Mesh | null>[],
    { label, ...overrides }: EyeColorControlsOptions,
) {
    const colors = useControls(
        label,
        { ...DEFAULTS, ...overrides },
        { collapsed: true },
    );

    const isPending = useRef(true);

    useEffect(() => {
        isPending.current = true;
    }, [
        colors.baseColor,
        colors.noiseColor,
        colors.centerColor,
        colors.stripesColor,
        colors.scleraEdgeColor,
    ]);

    useFrame(() => {
        if (!isPending.current) return;

        let appliedCount = 0;

        for (const eyeRef of eyeRefs) {
            const material = eyeRef.current?.material as
                EyeMaterialImpl | undefined;
            if (!material?.uniforms?.uBaseColor) continue;

            material.uniforms.uBaseColor.value.set(colors.baseColor);
            material.uniforms.uNoiseColor.value.set(colors.noiseColor);
            material.uniforms.uCenterColor.value.set(colors.centerColor);
            material.uniforms.uStripesColor.value.set(colors.stripesColor);
            material.uniforms.uScleraEdgeColor.value.set(
                colors.scleraEdgeColor,
            );

            appliedCount++;
        }

        if (appliedCount === eyeRefs.length) isPending.current = false;
    });
}
