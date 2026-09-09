import { create } from 'zustand';

export const BRIGHTNESS_DEFAULT = 1;
export const BRIGHTNESS_MAX = 1.5;

type LightState = {
    brightness: number;
    setBrightness: (brightness: number) => void;
};

export const useLightStore = create<LightState>()((set) => ({
    brightness: BRIGHTNESS_DEFAULT,
    setBrightness: (brightness) => set({ brightness }),
}));
