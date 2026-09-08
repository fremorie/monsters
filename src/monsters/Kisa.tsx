import * as THREE from 'three';
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { folder, useControls } from 'leva';

import { EyeMaterial } from '../materials/eyeMaterial';
import { useEffect, useMemo } from 'react';

type GLTFResult = GLTF & {
    nodes: {
        Body: THREE.Mesh;
        BottomLid: THREE.Mesh;
        Corneas: THREE.Mesh;
        EyeLeft: THREE.Mesh;
        EyeRight: THREE.Mesh;
        TopLid: THREE.Mesh;
    };
};

export function Kisa() {
    const { nodes } = useGLTF('./Kisa.glb') as unknown as GLTFResult;

    const controls = useControls({
        'Cornea material': folder({
            transmission: { value: 1, min: 0, max: 1 },
            roughness: { value: 0.02, min: 0, max: 1 },
            iridescence: { value: 0.001, min: 0.001, max: 1 },
            thickness: { value: 0.1, min: 0, max: 1 },
            color: '#ffffff',
        }),
    });

    const bodyMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: '#000000',
                roughness: 1,
            }),
        [],
    );

    useEffect(() => {
        return bodyMaterial.dispose();
    });

    return (
        <group dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Body.geometry}
                position={[0, 5.161, -0.014]}
                material={bodyMaterial}
            />

            <mesh
                geometry={nodes.TopLid.geometry}
                position={[1.115, 6.133, 4.862]}
                rotation={[-0.2, 0, 0]}
                material={bodyMaterial}
            />

            <mesh
                geometry={nodes.BottomLid.geometry}
                position={[1.115, 6.133, 4.862]}
                rotation={[0.5, 0, 0]}
                material={bodyMaterial}
            />

            <mesh
                geometry={nodes.Corneas.geometry}
                position={[1.115, 6.133, 4.862]}
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

            <mesh
                geometry={nodes.EyeLeft.geometry}
                position={[1.115, 6.133, 4.862]}
            >
                <eyeMaterial key={EyeMaterial.key} />
            </mesh>

            <mesh
                geometry={nodes.EyeRight.geometry}
                position={[-1.095, 6.133, 4.862]}
            >
                <eyeMaterial key={EyeMaterial.key} />
            </mesh>
        </group>
    );
}

useGLTF.preload('./Kisa.glb');
