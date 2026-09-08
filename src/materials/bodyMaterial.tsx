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

export const BodyDepthMaterial = shaderMaterial(uniforms, vertexShader);

export type BodyMaterialImpl = InstanceType<typeof BodyMaterial>;
export type BodyDepthMaterialImpl = InstanceType<typeof BodyDepthMaterial>;

extend({ BodyMaterial, BodyDepthMaterial });

declare module '@react-three/fiber' {
    interface ThreeElements {
        bodyMaterial: ThreeElement<typeof BodyMaterial>;
        bodyDepthMaterial: ThreeElement<typeof BodyDepthMaterial>;
    }
}
