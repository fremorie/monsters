import { monitor, useControls } from 'leva';

export type PupilControlValues = {
    alignmentMin: number;
    alignmentMax: number;
    gazeIndependentLightShare: number;
    exposureMin: number;
    exposureMax: number;
    smoothing: number;
};

export function usePupilControls(
    label: string,
    defaults: PupilControlValues,
    readGazeDotLightDirection: () => number,
): PupilControlValues {
    return useControls(
        label,
        {
            alignmentMin: {
                value: defaults.alignmentMin,
                min: -1,
                max: 1,
                step: 0.01,
            },
            alignmentMax: {
                value: defaults.alignmentMax,
                min: -1,
                max: 1,
                step: 0.01,
            },
            gazeIndependentLightShare: {
                value: defaults.gazeIndependentLightShare,
                min: 0,
                max: 1,
                step: 0.01,
            },
            exposureMin: {
                value: defaults.exposureMin,
                min: 0,
                max: 2,
                step: 0.01,
            },
            exposureMax: {
                value: defaults.exposureMax,
                min: 0,
                max: 2,
                step: 0.01,
            },
            smoothing: {
                value: defaults.smoothing,
                min: 0.2,
                max: 12,
                step: 0.1,
            },
            gazeDotLightDirection: monitor(readGazeDotLightDirection, {
                graph: true,
            }),
        },
        { collapsed: true },
    );
}
