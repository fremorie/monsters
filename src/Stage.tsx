import * as THREE from 'three';

const wallMaterial = new THREE.MeshStandardMaterial({
    color: '#70675f',
    roughness: 1,
});

const wallGeometry = new THREE.PlaneGeometry();

export function Stage() {
    return (
        <group>
            {/* Floor */}
            <mesh
                receiveShadow
                rotation-x={-Math.PI / 2}
                scale={[400, 400, 1]}
                geometry={wallGeometry}
                material={wallMaterial}
            />
        </group>
    );
}
