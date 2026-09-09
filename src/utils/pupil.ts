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

type ExposureInput = {
    ambientLightLevel: number;
    directionalLightLevel: number;
    lightAlignment: number;
    ambientLightWeight: number;
    directionalLightBounce: number;
};

export function getExposure({
    ambientLightLevel,
    directionalLightLevel,
    lightAlignment,
    ambientLightWeight,
    directionalLightBounce,
}: ExposureInput) {
    const directionalLightWeight = 1 - ambientLightWeight;

    const glareFraction = (1 - directionalLightBounce) * lightAlignment;
    const directionalLightReachingEye = directionalLightBounce + glareFraction;

    const ambientLightShare = ambientLightWeight * ambientLightLevel;
    const directionalLightShare =
        directionalLightWeight *
        directionalLightLevel *
        directionalLightReachingEye;

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
