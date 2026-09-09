import { create } from 'zustand';

export const AMBIENT_DEFAULT = 1.5;
export const DIRECTIONAL_DEFAULT = 6.5;

export const AMBIENT_MAX = 4;
export const DIRECTIONAL_MAX = 15;

type LightState = {
    ambientIntensity: number;
    directionalIntensity: number;
    setAmbientIntensity: (intensity: number) => void;
    setDirectionalIntensity: (intensity: number) => void;
};

export const useLightStore = create<LightState>()((set) => ({
    ambientIntensity: AMBIENT_DEFAULT,
    directionalIntensity: DIRECTIONAL_DEFAULT,
    setAmbientIntensity: (intensity) => set({ ambientIntensity: intensity }),
    setDirectionalIntensity: (intensity) =>
        set({ directionalIntensity: intensity }),
}));
