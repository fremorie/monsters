import { type RefObject, useEffect } from 'react';
import { type EyeMaterialImpl } from './materials/eyeMaterial';
import { EYE_DEFAULTS } from './materials/eyeUniforms';
import { folder, useControls } from 'leva';

export function useEyeMaterialControls(
    materialRef: RefObject<EyeMaterialImpl | null>,
) {
    const {
        uBaseColor,
        uNoiseColor,
        uCenterColor,
        uStripesColor,
        uStripesNoiseStrength,
        uScleraEdgeColor,
        uScleraRedness,
        uScleraRednessSpread,
        uPupilRadius,
        uPupilDilation,
        uVignetteStrength,
    } = useControls({
        Eye: folder({
            uBaseColor: EYE_DEFAULTS.baseColor,
            uNoiseColor: EYE_DEFAULTS.noiseColor,
            uCenterColor: EYE_DEFAULTS.centerColor,
            uStripesColor: EYE_DEFAULTS.stripesColor,
            uStripesNoiseStrength: {
                value: EYE_DEFAULTS.stripesNoiseStrength,
                min: 0,
                max: 1,
                step: 0.01,
            },
        }),
        Sclera: folder({
            uScleraEdgeColor: EYE_DEFAULTS.scleraEdgeColor,
            uScleraRedness: {
                value: EYE_DEFAULTS.scleraRedness,
                min: 0,
                max: 1,
                step: 0.01,
            },
            uScleraRednessSpread: {
                value: EYE_DEFAULTS.scleraRednessSpread,
                min: 0.1,
                max: 3,
                step: 0.01,
            },
        }),
        Pupil: folder({
            uPupilRadius: {
                value: EYE_DEFAULTS.pupilRadius,
                min: 0.02,
                max: 0.72,
                step: 0.01,
            },
            uPupilDilation: {
                value: EYE_DEFAULTS.pupilDilation,
                min: 0,
                max: 0.5,
                step: 0.01,
            },
        }),
        Vignette: folder({
            uVignetteStrength: {
                value: EYE_DEFAULTS.vignetteStrength,
                min: 0,
                max: 1,
                step: 0.01,
            },
        }),
    });

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uBaseColor.value.set(uBaseColor);
            materialRef.current.uniforms.uNoiseColor.value.set(uNoiseColor);
            materialRef.current.uniforms.uCenterColor.value.set(uCenterColor);
            materialRef.current.uniforms.uStripesColor.value.set(uStripesColor);
            materialRef.current.uniforms.uStripesNoiseStrength.value =
                uStripesNoiseStrength;
            materialRef.current.uniforms.uScleraEdgeColor.value.set(
                uScleraEdgeColor,
            );
            materialRef.current.uniforms.uScleraRedness.value = uScleraRedness;
            materialRef.current.uniforms.uScleraRednessSpread.value =
                uScleraRednessSpread;
            materialRef.current.uniforms.uVignetteStrength.value =
                uVignetteStrength;
            materialRef.current.uniforms.uPupilRadius.value = uPupilRadius;
            materialRef.current.uniforms.uPupilDilation.value = uPupilDilation;
        }
    }, [
        uBaseColor,
        uNoiseColor,
        uCenterColor,
        uStripesColor,
        uStripesNoiseStrength,
        uScleraEdgeColor,
        uScleraRedness,
        uScleraRednessSpread,
        uVignetteStrength,
        uPupilRadius,
        uPupilDilation,
        materialRef,
    ]);
}
