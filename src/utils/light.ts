export const AMBIENT_LIGHT_INTENSITY_AT_FULL_BRIGHTNESS = 1.5;
export const DIRECTIONAL_LIGHT_INTENSITY_AT_FULL_BRIGHTNESS = 6.5;

const DIRECTIONAL_LIGHT_FALLOFF = 1.5;

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

export function getDirectionalLightIntensity(brightness: number) {
    return (
        DIRECTIONAL_LIGHT_INTENSITY_AT_FULL_BRIGHTNESS *
        getDirectionalLightLevel(brightness)
    );
}
