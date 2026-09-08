import { shaderMaterial } from '@react-three/drei';
import { extend, type ThreeElement } from '@react-three/fiber';

import vertexShader from '../shaders/body/vertex.glsl';
import fragmentShader from '../shaders/body/fragment.glsl';

export const BODY_DEFAULTS = {};

const uniforms = {
    uTime: 0,
};

export const BodyMaterial = shaderMaterial(
    uniforms,
    vertexShader,
    fragmentShader,
);

export type BodyMaterialImpl = InstanceType<typeof BodyMaterial>;

extend({ BodyMaterial });

declare module '@react-three/fiber' {
    interface ThreeElements {
        bodyMaterial: ThreeElement<typeof BodyMaterial>;
    }
}
