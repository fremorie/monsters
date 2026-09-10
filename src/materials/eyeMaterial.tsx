import { useState } from 'react';
import * as THREE from 'three';
import CustomShaderMaterial from 'three-custom-shader-material';
import type CustomShaderMaterialVanilla from 'three-custom-shader-material/vanilla';

import vertexShader from '../shaders/eye/vertex.glsl';
import fragmentShader from '../shaders/eye/fragment.glsl';
import { createEyeUniforms, type EyeParameters } from './eyeUniforms';

export type EyeMaterialImpl = CustomShaderMaterialVanilla<
    typeof THREE.MeshStandardMaterial
>;

export function EyeMaterial(parameters: EyeParameters) {
    const [uniforms] = useState(() => createEyeUniforms(parameters));

    return (
        <CustomShaderMaterial
            baseMaterial={THREE.MeshStandardMaterial}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
        />
    );
}
