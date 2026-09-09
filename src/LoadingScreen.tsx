import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

import './LoadingScreen.css';

/**
 * How long the bar stays at its current value before the screen fades out.
 * It also covers the first frames after mount, where nothing has started
 * loading yet and `active` is still false.
 */
const SETTLE_DELAY = 300;

export function LoadingScreen() {
    const { active, progress } = useProgress();
    const [done, setDone] = useState(false);
    const [unmounted, setUnmounted] = useState(false);

    useEffect(() => {
        if (active) return;

        const timeout = setTimeout(() => setDone(true), SETTLE_DELAY);
        return () => clearTimeout(timeout);
    }, [active]);

    if (unmounted) return null;

    return (
        <div
            className={`loading-screen${done ? ' loading-screen--done' : ''}`}
            onTransitionEnd={() => setUnmounted(done)}
        >
            <div className="loading-screen__bar">
                <div
                    className="loading-screen__fill"
                    style={{ transform: `scaleX(${progress / 100})` }}
                />
            </div>
            <p className="loading-screen__label">{Math.round(progress)}%</p>
        </div>
    );
}
