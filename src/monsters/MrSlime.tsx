import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
        Body003: THREE.Mesh
        BottomLid002: THREE.Mesh
        Corneas002: THREE.Mesh
        EyeLeft002: THREE.Mesh
        EyeRight002: THREE.Mesh
        TopLid002: THREE.Mesh
    }
    materials: {}
}

export function MrSlime() {
    const { nodes } = useGLTF('./MrSlime.glb') as GLTFResult
    return (
        <group position={[4, 0, 27]} rotation-y={-0.3} dispose={null} scale={0.5}>
            <mesh
                castShadow
                geometry={nodes.Body003.geometry}
                material={nodes.Body003.material}
                position={[0, 5.285, 0]}
            />
            <mesh
                geometry={nodes.BottomLid002.geometry}
                material={nodes.BottomLid002.material}
                position={[1.429, 4.908, 5.979]}
            />
            <mesh
                geometry={nodes.Corneas002.geometry}
                material={nodes.Corneas002.material}
                position={[1.429, 4.908, 5.979]}
            />
            <mesh
                geometry={nodes.EyeLeft002.geometry}
                material={nodes.EyeLeft002.material}
                position={[1.429, 4.908, 5.979]}
            />
            <mesh
                geometry={nodes.EyeRight002.geometry}
                material={nodes.EyeRight002.material}
                position={[-1.592, 4.908, 5.979]}
            />
            <mesh
                geometry={nodes.TopLid002.geometry}
                material={nodes.TopLid002.material}
                position={[1.429, 4.908, 5.979]}
            />
        </group>
    )
}

useGLTF.preload('./MrSlime.glb')