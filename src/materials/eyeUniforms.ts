import * as THREE from 'three';

export const EYE_DEFAULTS = {
    baseColor: '#000000',
    noiseColor: '#317c67',
    centerColor: '#b4a072',
    stripesColor: '#608079',
    scleraEdgeColor: '#b8564a',
    stripesNoiseStrength: 0.5,
    scleraRedness: 1.1,
    scleraRednessSpread: 1.2,
    pupilRadius: 0.22,
    pupilDilation: 0.48,
    pupilOpenness: 0.5,
    vignetteStrength: 1,
    irisRadius: 0.8,
    eyeRadius: 1,
};

export type EyeParameters = Partial<typeof EYE_DEFAULTS>;

export function createEyeUniforms(parameters: EyeParameters) {
    const values = { ...EYE_DEFAULTS, ...parameters };

    return {
        uTime: new THREE.Uniform(0),
        uBaseColor: new THREE.Uniform(new THREE.Color(values.baseColor)),
        uNoiseColor: new THREE.Uniform(new THREE.Color(values.noiseColor)),
        uCenterColor: new THREE.Uniform(new THREE.Color(values.centerColor)),
        uStripesColor: new THREE.Uniform(new THREE.Color(values.stripesColor)),
        uScleraEdgeColor: new THREE.Uniform(
            new THREE.Color(values.scleraEdgeColor),
        ),
        uStripesNoiseStrength: new THREE.Uniform(values.stripesNoiseStrength),
        uScleraRedness: new THREE.Uniform(values.scleraRedness),
        uScleraRednessSpread: new THREE.Uniform(values.scleraRednessSpread),
        uVignetteStrength: new THREE.Uniform(values.vignetteStrength),
        uPupilRadius: new THREE.Uniform(values.pupilRadius),
        uPupilDilation: new THREE.Uniform(values.pupilDilation),
        uPupilOpenness: new THREE.Uniform(values.pupilOpenness),
        uIrisRadius: new THREE.Uniform(values.irisRadius),
        uEyeRadius: new THREE.Uniform(values.eyeRadius),
    };
}

/**
 * Radius of the eyeball sphere the iris is painted on.
 */
export function eyeRadiusOf(geometry: THREE.BufferGeometry) {
    geometry.computeBoundingSphere();
    return geometry.boundingSphere?.radius ?? EYE_DEFAULTS.eyeRadius;
}
