import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';

import { EyeMaterial, eyeRadiusOf } from '../materials/eyeMaterial';
import { useBlink } from '../hooks/useBlink';
import { useCyclopsEyeTracking } from '../hooks/useCyclopsEyeTracking';
import { usePupilResponse } from '../hooks/usePupilResponse';
import { bodyMaterial } from '../materials/bodyMaterial';
import { CorneaMaterial } from '../materials/corneaMaterial';

type GLTFResult = GLTF & {
    nodes: {
        Body002: THREE.Mesh;
        Cornea002: THREE.Mesh;
        Eye002: THREE.Mesh;
        EyeLidTop: THREE.Mesh;
        EyeLidBottom: THREE.Mesh;
    };
};

export function Cyclops() {
    const { nodes } = useGLTF('./Cyclops.glb') as unknown as GLTFResult;

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
                <CorneaMaterial thickness={0.65} />
            </mesh>

            <mesh
                ref={eyeRef}
                geometry={nodes.Eye002.geometry}
                position={[0, 4.619, 3.928]}
            >
                <eyeMaterial
                    key={EyeMaterial.key}
                    uPupilRadius={0.15}
                    uPupilDilation={0.58}
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
