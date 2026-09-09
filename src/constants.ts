/** Shared by the canvas background and the fog, so the horizon disappears. */
export const BACKGROUND = '#70675f';

/**
 * Shared by the light itself and the pupil response, so they can't drift apart.
 */
export const DIRECTIONAL_LIGHT_POSITION: [number, number, number] = [
    22, 18, 30,
];

export const CAMERA_POSITION: [number, number, number] = [-10, 13, 72];
export const CAMERA_TARGET: [number, number, number] = [15, 11.5, 0];
