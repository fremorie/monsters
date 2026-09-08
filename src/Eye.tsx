import * as THREE from 'three';
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { type GLTF } from 'three-stdlib';
import { folder, useControls } from 'leva';
import { useRef } from 'react';
import { EyeMaterial, type EyeMaterialImpl } from './materials/eyeMaterial';
import { useEyeMaterialControls } from './useEyeMaterialControls';

type GLTFResult = GLTF & {
    nodes: {
        Cornea: THREE.Mesh;
        Eye: THREE.Mesh;
    };
};

export function Eye() {
    const { nodes } = useGLTF('./eye.glb') as unknown as GLTFResult;
    const materialRef = useRef<EyeMaterialImpl>(null);

    useEyeMaterialControls(materialRef);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.elapsedTime;
        }
    });

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
                    color={controls.color}
                />
            </mesh>
            <mesh geometry={nodes.Eye.geometry}>
                <eyeMaterial ref={materialRef} key={EyeMaterial.key} />
            </mesh>
        </group>
    );
}
