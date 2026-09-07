import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend, type ThreeElement } from '@react-three/fiber';

import vertexShader from '../shaders/eye/vertex.glsl';
import fragmentShader from '../shaders/eye/fragment.glsl';

const uniforms = {
    uTime: 0,
    uBaseColor: new THREE.Color('#259ac1'),
    uNoiseColor: new THREE.Color('#b1a328'),
    uInnerColor: new THREE.Color('#30545e'),
    uLineColor: new THREE.Color('#276779'),
    uLineFactor: 0.5,
    uNoiseFrequency: 15.0,
    uNoiseStrength: 0.5,
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
