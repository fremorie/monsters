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
    brightness: number;
    lightAlignment: number;
    gazeIndependentLightShare: number;
};

export function getExposure({
    brightness,
    lightAlignment,
    gazeIndependentLightShare,
}: ExposureInput) {
    const gazeDependentLightShare = 1 - gazeIndependentLightShare;

    const lightReachingEye =
        gazeIndependentLightShare + gazeDependentLightShare * lightAlignment;

    return brightness * lightReachingEye;
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
