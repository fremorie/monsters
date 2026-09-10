import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';

import { EyeMaterial } from '../materials/eyeMaterial';
import { eyeRadiusOf } from '../materials/eyeUniforms';
import { useBlink } from '../hooks/useBlink';
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

export function MrSlime() {
    const { nodes } = useGLTF('./MrSlime.glb') as unknown as GLTFResult;

    const { topEyeLidRef, bottomEyeLidRef } = useBlink();
    const { eyeLeftRef, eyeRightRef } = useEyeTracking();

    usePupilResponse([eyeLeftRef, eyeRightRef], { label: 'MrSlime pupils' });

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
                rotation={[-0.2, 0, 0]}
                material={bodyMaterial}
            />

            <mesh
                ref={bottomEyeLidRef}
                geometry={nodes.BottomLid003.geometry}
                position={[1.869, 4.908, 5.979]}
                rotation={[0.5, 0, 0]}
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
                    eyeRadius={eyeRadiusOf(nodes.EyeLeft003.geometry)}
                />
            </mesh>

            <mesh
                ref={eyeRightRef}
                geometry={nodes.EyeRight003.geometry}
                position={[-1.884, 4.908, 5.979]}
            >
                <EyeMaterial
                    eyeRadius={eyeRadiusOf(nodes.EyeRight003.geometry)}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload('./MrSlime.glb');
