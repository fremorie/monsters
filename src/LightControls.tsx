import {
    BRIGHTNESS_MAX,
    BRIGHTNESS_MIN,
    useLightStore,
} from './store/useLightStore';
import './LightControls.css';

export function LightControls() {
    const brightness = useLightStore((state) => state.brightness);
    const setBrightness = useLightStore((state) => state.setBrightness);

    return (
        <label className="light-controls">
            <span className="light-controls__label">Light</span>
            <input
                type="range"
                min={BRIGHTNESS_MIN}
                max={BRIGHTNESS_MAX}
                step={0.01}
                value={brightness}
                onChange={(event) => setBrightness(event.target.valueAsNumber)}
            />
        </label>
    );
}
