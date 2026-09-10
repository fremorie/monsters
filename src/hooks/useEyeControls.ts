import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

import { type EyeMaterialImpl } from '../materials/eyeMaterial';
import { EYE_DEFAULTS } from '../materials/eyeUniforms';

export type EyeControlValues = {
    baseColor: string;
    noiseColor: string;
    centerColor: string;
    stripesColor: string;
    scleraEdgeColor: string;
    irisRadius: number;
};

const DEFAULTS: EyeControlValues = {
    baseColor: EYE_DEFAULTS.baseColor,
    noiseColor: EYE_DEFAULTS.noiseColor,
    centerColor: EYE_DEFAULTS.centerColor,
    stripesColor: EYE_DEFAULTS.stripesColor,
    scleraEdgeColor: EYE_DEFAULTS.scleraEdgeColor,
    irisRadius: EYE_DEFAULTS.irisRadius,
};

type EyeControlsOptions = Partial<EyeControlValues> & { label: string };

export function useEyeControls(
    eyeRefs: RefObject<THREE.Mesh | null>[],
    { label, ...overrides }: EyeControlsOptions,
) {
    const values = { ...DEFAULTS, ...overrides };

    const controls = useControls(
        label,
        {
            baseColor: values.baseColor,
            noiseColor: values.noiseColor,
            centerColor: values.centerColor,
            stripesColor: values.stripesColor,
            scleraEdgeColor: values.scleraEdgeColor,
            irisRadius: {
                value: values.irisRadius,
                min: 0.3,
                max: 0.9,
                step: 0.01,
            },
        },
        { collapsed: true },
    );

    const materials = useRef<(EyeMaterialImpl | null)[]>([]);
    const isPending = useRef(true);

    useEffect(() => {
        isPending.current = true;
    }, [
        controls.baseColor,
        controls.noiseColor,
        controls.centerColor,
        controls.stripesColor,
        controls.scleraEdgeColor,
        controls.irisRadius,
    ]);

    useFrame(() => {
        if (!isPending.current) return;

        let appliedCount = 0;

        for (let index = 0; index < eyeRefs.length; index++) {
            const eye = eyeRefs[index].current;
            if (!eye) continue;

            if (materials.current[index] !== eye.material) {
                materials.current[index] = eye.material as EyeMaterialImpl;
            }

            const material = materials.current[index];
            if (!material?.uniforms?.uBaseColor) continue;

            material.uniforms.uBaseColor.value.set(controls.baseColor);
            material.uniforms.uNoiseColor.value.set(controls.noiseColor);
            material.uniforms.uCenterColor.value.set(controls.centerColor);
            material.uniforms.uStripesColor.value.set(controls.stripesColor);
            material.uniforms.uScleraEdgeColor.value.set(
                controls.scleraEdgeColor,
            );
            material.uniforms.uIrisRadius.value = controls.irisRadius;

            appliedCount++;
        }

        if (appliedCount === eyeRefs.length) isPending.current = false;
    });
}
