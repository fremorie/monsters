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
    scleraEdgeColor: '#b8564a',
    stripesNoiseStrength: 0.5,
    scleraRedness: 0.65,
    scleraRednessSpread: 1.2,
    pupilRadius: 0.22,
    pupilDilation: 0.48,
    pupilOpenness: 0.5,
    vignetteStrength: 1,
    irisRadius: 0.8,
    eyeRadius: 1,
};

const uniforms = {
    uTime: 0,
    uBaseColor: new THREE.Color(EYE_DEFAULTS.baseColor),
    uNoiseColor: new THREE.Color(EYE_DEFAULTS.noiseColor),
    uCenterColor: new THREE.Color(EYE_DEFAULTS.centerColor),
    uStripesColor: new THREE.Color(EYE_DEFAULTS.stripesColor),
    uScleraEdgeColor: new THREE.Color(EYE_DEFAULTS.scleraEdgeColor),
    uStripesNoiseStrength: EYE_DEFAULTS.stripesNoiseStrength,
    uScleraRedness: EYE_DEFAULTS.scleraRedness,
    uScleraRednessSpread: EYE_DEFAULTS.scleraRednessSpread,
    uVignetteStrength: EYE_DEFAULTS.vignetteStrength,
    uPupilRadius: EYE_DEFAULTS.pupilRadius,
    uPupilDilation: EYE_DEFAULTS.pupilDilation,
    uPupilOpenness: EYE_DEFAULTS.pupilOpenness,
    uIrisRadius: EYE_DEFAULTS.irisRadius,
    uEyeRadius: EYE_DEFAULTS.eyeRadius,
};

/**
 * Radius of the eyeball sphere the iris is painted on.
 */
export function eyeRadiusOf(geometry: THREE.BufferGeometry) {
    geometry.computeBoundingSphere();
    return geometry.boundingSphere?.radius ?? EYE_DEFAULTS.eyeRadius;
}

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
