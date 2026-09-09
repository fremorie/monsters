import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';

import { EyeMaterial, eyeRadiusOf } from '../materials/eyeMaterial';
import { useBlink } from '../hooks/useBlink';
import { useEyeTracking } from '../hooks/useEyeTracking';
import { usePupilResponse } from '../hooks/usePupilResponse';
import { bodyMaterial } from '../materials/bodyMaterial';
import { CorneaMaterial } from '../materials/corneaMaterial';

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

export function Kisa() {
    const { nodes } = useGLTF('./KisaLowPoly.glb') as unknown as GLTFResult;

    const { topEyeLidRef, bottomEyeLidRef } = useBlink();
    const { eyeLeftRef, eyeRightRef } = useEyeTracking();

    usePupilResponse([eyeLeftRef, eyeRightRef], { label: 'Kisa pupils' });

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
                <CorneaMaterial />
            </mesh>

            <mesh
                ref={eyeLeftRef}
                geometry={nodes.EyeLeft001.geometry}
                position={[1.115, 6.133, 4.862]}
            >
                <eyeMaterial
                    key={EyeMaterial.key}
                    uEyeRadius={eyeRadiusOf(nodes.EyeLeft001.geometry)}
                />
            </mesh>

            <mesh
                ref={eyeRightRef}
                geometry={nodes.EyeRight001.geometry}
                position={[-1.095, 6.133, 4.862]}
            >
                <eyeMaterial
                    key={EyeMaterial.key}
                    uEyeRadius={eyeRadiusOf(nodes.EyeRight001.geometry)}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload('./KisaLowPoly.glb');
