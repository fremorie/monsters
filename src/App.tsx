import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { Preload, OrbitControls } from '@react-three/drei';
import { Leva } from 'leva';

import { Experience } from './Experience';
import { useDebug } from './hooks/useDebug';
import './App.css';

/**
 * Kisa stands on the floor at the origin. The camera is aimed up and to her
 * right instead of straight at her, which drops her into the bottom-left of the
 * frame on load; OrbitControls takes over from there.
 */
const CAMERA_POSITION: [number, number, number] = [-10, 13, 72];
const CAMERA_TARGET: [number, number, number] = [15, 11.5, 0];

function App() {
    const debug = useDebug();

    return (
        <>
            <Canvas
                shadows
                camera={{
                    fov: 35,
                    near: 1,
                    far: 500,
                    position: CAMERA_POSITION,
                }}
            >
                <OrbitControls makeDefault maxPolarAngle={Math.PI / 2} target={CAMERA_TARGET} />
                <Suspense fallback={null}>
                    <Experience />
                    <Preload all />
                </Suspense>

                {debug && <Perf position="bottom-left" />}
            </Canvas>

            <Leva
                hidden={!debug}
                theme={{ sizes: { rootWidth: '350px' } }}
                collapsed
            />
        </>
    );
}

export default App;
