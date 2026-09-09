import * as THREE from 'three';
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { folder, useControls } from 'leva';

import { EyeMaterial } from '../materials/eyeMaterial';
import { useBlink } from '../hooks/useBlink';
import { useEyeTracking } from '../hooks/useEyeTracking';

type GLTFResult = GLTF & {
    nodes: {
        Body001: THREE.Mesh;
        BottomLid001: THREE.Mesh;
        Corneas001: THREE.Mesh;
        EyeLeft001: THREE.Mesh;
        EyeRight001: THREE.Mesh;
        TopLid001: THREE.Mesh;
    };
};

const bodyMaterial = new THREE.MeshStandardMaterial({
    color: '#000000',
    roughness: 1,
});

export function Kisa() {
    const { nodes } = useGLTF('./KisaLowPoly.glb') as unknown as GLTFResult;

    const controls = useControls({
        'Cornea material': folder({
            transmission: { value: 1, min: 0, max: 1 },
            roughness: { value: 0.02, min: 0, max: 1 },
            iridescence: { value: 0.001, min: 0.001, max: 1 },
            thickness: { value: 0.1, min: 0, max: 1 },
            color: '#ffffff',
        }),
    });

    const { topEyeLidRef, bottomEyeLidRef } = useBlink();
    const { eyeLeftRef, eyeRightRef } = useEyeTracking();

    return (
        <group dispose={null}>
            <mesh
                castShadow
                geometry={nodes.Body001.geometry}
                position={[0, 5.161, -0.014]}
                material={bodyMaterial}
            />

            <mesh
                ref={topEyeLidRef}
                geometry={nodes.TopLid001.geometry}
                position={[1.115, 6.133, 4.862]}
                rotation={[-0.2, 0, 0]}
                material={bodyMaterial}
            />

            <mesh
                ref={bottomEyeLidRef}
                geometry={nodes.BottomLid001.geometry}
                position={[1.115, 6.133, 4.862]}
                rotation={[0.5, 0, 0]}
                material={bodyMaterial}
            />

            <mesh
                geometry={nodes.Corneas001.geometry}
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
                ref={eyeLeftRef}
                geometry={nodes.EyeLeft001.geometry}
                position={[1.115, 6.133, 4.862]}
            >
                <eyeMaterial key={EyeMaterial.key} />
            </mesh>

            <mesh
                ref={eyeRightRef}
                geometry={nodes.EyeRight001.geometry}
                position={[-1.095, 6.133, 4.862]}
            >
                <eyeMaterial key={EyeMaterial.key} />
            </mesh>
        </group>
    );
}

useGLTF.preload('./Kisa.glb');
