import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend, type ThreeElement } from '@react-three/fiber';

import vertexShader from '../shaders/eye/vertex.glsl';
import fragmentShader from '../shaders/eye/fragment.glsl';

export const EYE_DEFAULTS = {
    baseColor: '#000000',
    noiseColor: '#317c67',
    centerColor: '#b4a072',
    stripesColor: '#608079',
    stripesNoiseStrength: 0.5,
    pupilRadius: 0.3,
    vignetteStrength: 1,
};

const uniforms = {
    uTime: 0,
    uBaseColor: new THREE.Color(EYE_DEFAULTS.baseColor),
    uNoiseColor: new THREE.Color(EYE_DEFAULTS.noiseColor),
    uCenterColor: new THREE.Color(EYE_DEFAULTS.centerColor),
    uStripesColor: new THREE.Color(EYE_DEFAULTS.stripesColor),
    uStripesNoiseStrength: EYE_DEFAULTS.stripesNoiseStrength,
    uVignetteStrength: EYE_DEFAULTS.vignetteStrength,
    uPupilRadius: EYE_DEFAULTS.pupilRadius,
};

export const EyeMaterial = shaderMaterial(
    uniforms,
    vertexShader,
    fragmentShader,
);

export type EyeMaterialImpl = InstanceType<typeof EyeMaterial>;

extend({ EyeMaterial });

declare module '@react-three/fiber' {
    interface ThreeElements {
        eyeMaterial: ThreeElement<typeof EyeMaterial>;
    }
}
