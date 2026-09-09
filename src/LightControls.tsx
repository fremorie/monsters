import {
    AMBIENT_MAX,
    DIRECTIONAL_MAX,
    useLightStore,
} from './store/useLightStore';
import './LightControls.css';

export function LightControls() {
    const ambientLightIntensity = useLightStore(
        (state) => state.ambientIntensity,
    );
    const directionalLightIntensity = useLightStore(
        (state) => state.directionalIntensity,
    );
    const setAmbientIntensity = useLightStore(
        (state) => state.setAmbientIntensity,
    );
    const setDirectionalIntensity = useLightStore(
        (state) => state.setDirectionalIntensity,
    );

    return (
        <div className="light-controls">
            <label className="light-controls__slider">
                <span className="light-controls__label">Ambient</span>
                <input
                    type="range"
                    min={0}
                    max={AMBIENT_MAX}
                    step={0.05}
                    value={ambientLightIntensity}
                    onChange={(event) =>
                        setAmbientIntensity(event.target.valueAsNumber)
                    }
                />
            </label>

            <label className="light-controls__slider">
                <span className="light-controls__label">Sunlight</span>
                <input
                    type="range"
                    min={0}
                    max={DIRECTIONAL_MAX}
                    step={0.1}
                    value={directionalLightIntensity}
                    onChange={(event) =>
                        setDirectionalIntensity(event.target.valueAsNumber)
                    }
                />
            </label>
        </div>
    );
}
