import * as THREE from 'three';
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { folder, useControls } from 'leva';
import { useMemo } from 'react';
import { EyeMaterial } from './materials/eyeMaterial';

type GLTFResult = GLTF & {
    nodes: {
        Cornea: THREE.Mesh;
        Eye: THREE.Mesh;
    };
};

export function Eye() {
    const { nodes } = useGLTF('./eye.glb') as GLTFResult;
    const eyeMaterial = useMemo(() => new EyeMaterial(), []);

    const controls = useControls({
        'Cornea material': folder({
            transmission: { value: 1, min: 0, max: 1 },
            roughness: { value: 0.02, min: 0, max: 1 },
            iridescence: { value: 0.001, min: 0.001, max: 1 },
            thickness: { value: 0.1, min: 0, max: 1 },
            color: '#ffffff',
        }),
    });

    return (
        <group dispose={null}>
            <mesh
                geometry={nodes.Cornea.geometry}
                material={nodes.Cornea.material}
            >
                <MeshTransmissionMaterial
                    transparent
                    depthWrite={true}
                    transmission={controls.transmission}
                    roughness={controls.roughness}
                    ior={1.376}
                    iridescence={controls.iridescence}
                    thickness={controls.thickness}
                    stencilBuffer={true}
                    color={controls.color}
                />
            </mesh>
            <mesh geometry={nodes.Eye.geometry} material={eyeMaterial} />
        </group>
    );
}
