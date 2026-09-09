import * as THREE from 'three';

export function getLightAlignment(
    gazeDotLightDirection: number,
    alignmentMin: number,
    alignmentMax: number,
) {
    return THREE.MathUtils.smoothstep(
        gazeDotLightDirection,
        alignmentMin,
        alignmentMax,
    );
}

export function getExposure(
    ambientLightLevel: number,
    directionalLightLevel: number,
    lightAlignment: number,
    ambientLightWeight: number,
) {
    const directionalLightWeight = 1 - ambientLightWeight;

    const ambientLightShare = ambientLightWeight * ambientLightLevel;
    const directionalLightShare =
        directionalLightWeight * directionalLightLevel * lightAlignment;

    return ambientLightShare + directionalLightShare;
}

export function getPupilOpenness(
    exposure: number,
    exposureMin: number,
    exposureMax: number,
) {
    const constriction = THREE.MathUtils.smoothstep(
        exposure,
        exposureMin,
        exposureMax,
    );

    return 1 - constriction;
}
