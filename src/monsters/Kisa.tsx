import * as THREE from 'three'
import {MeshTransmissionMaterial, useGLTF} from '@react-three/drei'
import { type GLTF } from 'three-stdlib'

import {EyeMaterial} from "../materials/eyeMaterial";
import {folder, useControls} from "leva";

type GLTFResult = GLTF & {
    nodes: {
        Body: THREE.Mesh
        CorneaLeft: THREE.Mesh
        CorneaRight: THREE.Mesh
        EyeLeft: THREE.Mesh
        EyeLids: THREE.Mesh
        EyeRight: THREE.Mesh
    }
}

export function Kisa() {
    const { nodes } = useGLTF('./Kisa.glb') as unknown as GLTFResult

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
                geometry={nodes.Body.geometry}
                material={nodes.Body.material}
                position={[0, 5.161, -0.014]}
            >
                <meshStandardMaterial color="#000000" roughness={1} />
            </mesh>
            <mesh
                geometry={nodes.CorneaLeft.geometry}
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
                geometry={nodes.CorneaRight.geometry}
                position={[-1.095, 6.133, 4.862]}
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
                geometry={nodes.EyeLids.geometry}
                position={[1.115, 6.133, 4.862]}
                scale={1.099}
            >
                <meshStandardMaterial color="#000000" roughness={1} />
            </mesh>
            <mesh
                geometry={nodes.EyeRight.geometry}
                position={[-1.095, 6.133, 4.862]}
            >
                <eyeMaterial key={EyeMaterial.key} />
            </mesh>
        </group>
    )
}

useGLTF.preload('./Kisa.glb')

