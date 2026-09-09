import * as THREE from 'three';
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { folder, useControls } from 'leva';

import { EyeMaterial, eyeRadiusOf } from '../materials/eyeMaterial';
import { useBlink } from '../hooks/useBlink';
import { useCyclopsEyeTracking } from '../hooks/useCyclopsEyeTracking';
import { usePupilResponse } from '../hooks/usePupilResponse';

type GLTFResult = GLTF & {
    nodes: {
        Body002: THREE.Mesh;
        Cornea002: THREE.Mesh;
        Eye002: THREE.Mesh;
        EyeLidTop: THREE.Mesh;
        EyeLidBottom: THREE.Mesh;
    };
};

const bodyMaterial = new THREE.MeshStandardMaterial({
    color: '#000000',
    roughness: 1,
});

export function Cyclops() {
    const { nodes } = useGLTF('./Cyclops.glb') as unknown as GLTFResult;

    const controls = useControls({
        'Cornea material (cyclops)': folder({
            transmission: { value: 1, min: 0, max: 1 },
            roughness: { value: 0.2, min: 0, max: 1 },
            iridescence: { value: 0.001, min: 0.001, max: 1 },
            thickness: { value: 0.65, min: 0, max: 1 },
            color: '#ffffff',
        }),
    });

    const { topEyeLidRef, bottomEyeLidRef } = useBlink({
        topClosed: 0.15,
        bottomClosed: -0.15,
        duration: 0.2,
        interval: 6,
    });
    const { eyeRef } = useCyclopsEyeTracking({ maxYaw: 20 });

    usePupilResponse([eyeRef], {
        label: 'Cyclops pupils',
        alignmentMin: 0.45,
        alignmentMax: 0.78,
    });

    return (
        <group rotation-y={-0.6} position={[20, 1.2, 10]} dispose={null}>
            <mesh
                castShadow
                geometry={nodes.Body002.geometry}
                position={[0, 4.505, 0]}
                material={bodyMaterial}
            />

            <mesh
                ref={topEyeLidRef}
                geometry={nodes.EyeLidTop.geometry}
                position={[0, 4.619, 3.928]}
                rotation={[-0.4, 0, 0]}
                material={bodyMaterial}
            />

            <mesh
                ref={bottomEyeLidRef}
                geometry={nodes.EyeLidBottom.geometry}
                position={[0, 4.619, 3.928]}
                rotation={[0.3, 0, 0]}
                material={bodyMaterial}
            />

            <mesh
                geometry={nodes.Cornea002.geometry}
                position={[0, 4.619, 3.928]}
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
                ref={eyeRef}
                geometry={nodes.Eye002.geometry}
                position={[0, 4.619, 3.928]}
            >
                <eyeMaterial
                    key={EyeMaterial.key}
                    uPupilRadius={0.15}
                    uPupilDilation={0.26}
                    uIrisRadius={0.85}
                    uEyeRadius={eyeRadiusOf(nodes.Eye002.geometry)}
                    uNoiseColor={new THREE.Color('#c2ebff')}
                    uCenterColor={new THREE.Color('#837048')}
                    uStripesColor={new THREE.Color('#90a79b')}
                    uVignetteStrength={1}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload('./Cyclops.glb');
