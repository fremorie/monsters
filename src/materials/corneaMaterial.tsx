import {
    MeshTransmissionMaterial,
    type MeshTransmissionMaterialProps,
} from '@react-three/drei';

const CORNEA_DEFAULTS = {
    transparent: true,
    depthWrite: true,
    transmission: 1,
    roughness: 0.12,
    ior: 1.376,
    iridescence: 0.001,
    thickness: 0.53,
    color: '#ffffff',
};

export function CorneaMaterial(props: MeshTransmissionMaterialProps) {
    return <MeshTransmissionMaterial {...CORNEA_DEFAULTS} {...props} />;
}
