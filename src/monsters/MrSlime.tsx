import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';

import { EyeMaterial } from '../materials/eyeMaterial';
import { eyeRadiusOf } from '../materials/eyeUniforms';
import { useBlink } from '../hooks/useBlink';
import { useEyeControls } from '../hooks/useEyeControls';
import { useEyeTracking } from '../hooks/useEyeTracking';
import { usePupilResponse } from '../hooks/usePupilResponse';
import { bodyMaterial } from '../materials/bodyMaterial';
import { CorneaMaterial } from '../materials/corneaMaterial';

type GLTFResult = GLTF & {
    nodes: {
        Body004: THREE.Mesh;
        BottomLid003: THREE.Mesh;
        Corneas003: THREE.Mesh;
        EyeLeft003: THREE.Mesh;
        EyeRight003: THREE.Mesh;
        TopLid003: THREE.Mesh;
    };
};

const EYE_PARAMETERS = {
    baseColor: '#690202',
    noiseColor: '#a75931',
    centerColor: '#d1894d',
    stripesColor: '#000000',
    scleraEdgeColor: '#b13f5d',
    irisRadius: 0.9,
};

export function MrSlime() {
    const { nodes } = useGLTF('./MrSlime.glb') as unknown as GLTFResult;

    const { topEyeLidRef, bottomEyeLidRef } = useBlink({
        interval: 9,
    });
    const { eyeLeftRef, eyeRightRef } = useEyeTracking();

    usePupilResponse([eyeLeftRef, eyeRightRef], { label: 'MrSlime pupils' });
    useEyeControls([eyeLeftRef, eyeRightRef], {
        label: 'MrSlime eyes',
        ...EYE_PARAMETERS,
    });

    return (
        <group
            position={[4, 0, 27]}
            rotation-y={-0.3}
            scale={0.5}
            dispose={null}
        >
            <mesh
                castShadow
                geometry={nodes.Body004.geometry}
                position={[0, 5.285, 0]}
                material={bodyMaterial}
            />

            <mesh
                ref={topEyeLidRef}
                geometry={nodes.TopLid003.geometry}
                position={[1.869, 4.908, 5.979]}
                rotation={[-0.8, 0, 0]}
                material={bodyMaterial}
            />

            <mesh
                ref={bottomEyeLidRef}
                geometry={nodes.BottomLid003.geometry}
                position={[1.869, 4.908, 5.979]}
                rotation={[0.4, 0, 0]}
                material={bodyMaterial}
            />

            <mesh
                geometry={nodes.Corneas003.geometry}
                position={[1.869, 4.908, 5.979]}
            >
                <CorneaMaterial />
            </mesh>

            <mesh
                ref={eyeLeftRef}
                geometry={nodes.EyeLeft003.geometry}
                position={[1.869, 4.908, 5.979]}
            >
                <EyeMaterial
                    {...EYE_PARAMETERS}
                    eyeRadius={eyeRadiusOf(nodes.EyeLeft003.geometry)}
                />
            </mesh>

            <mesh
                ref={eyeRightRef}
                geometry={nodes.EyeRight003.geometry}
                position={[-1.884, 4.908, 5.979]}
            >
                <EyeMaterial
                    {...EYE_PARAMETERS}
                    eyeRadius={eyeRadiusOf(nodes.EyeRight003.geometry)}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload('./MrSlime.glb');
