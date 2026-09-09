export const AMBIENT_LIGHT_INTENSITY_AT_FULL_BRIGHTNESS = 1.5;
export const DIRECTIONAL_LIGHT_INTENSITY_AT_FULL_BRIGHTNESS = 6.5;

export const ENVIRONMENT_MAP_INTENSITY_AT_FULL_BRIGHTNESS = 0.2;

const DIRECTIONAL_LIGHT_FALLOFF = 1.5;
const ENVIRONMENT_MAP_CUTOFF_BRIGHTNESS = 0.3;

function getAmbientLightLevel(brightness: number) {
    return brightness;
}

function getDirectionalLightLevel(brightness: number) {
    return Math.pow(brightness, DIRECTIONAL_LIGHT_FALLOFF);
}

export function getAmbientLightIntensity(brightness: number) {
    return (
        AMBIENT_LIGHT_INTENSITY_AT_FULL_BRIGHTNESS *
        getAmbientLightLevel(brightness)
    );
}

export function getEnvironmentMapIntensity(brightness: number) {
    const brightnessAboveCutoff = Math.max(
        0,
        brightness - ENVIRONMENT_MAP_CUTOFF_BRIGHTNESS,
    );
    const environmentMapLevel =
        brightnessAboveCutoff / (1 - ENVIRONMENT_MAP_CUTOFF_BRIGHTNESS);

    return ENVIRONMENT_MAP_INTENSITY_AT_FULL_BRIGHTNESS * environmentMapLevel;
}

export function getDirectionalLightIntensity(brightness: number) {
    return (
        DIRECTIONAL_LIGHT_INTENSITY_AT_FULL_BRIGHTNESS *
        getDirectionalLightLevel(brightness)
    );
}
