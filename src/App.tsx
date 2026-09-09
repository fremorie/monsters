import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { Preload } from '@react-three/drei';
import { Leva } from 'leva';

import { Experience } from './Experience';
import { LoadingScreen } from './LoadingScreen';
import { useDebug } from './hooks/useDebug';
import './App.css';

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
                onCreated={({ camera }) => camera.lookAt(...CAMERA_TARGET)}
            >
                <Suspense fallback={null}>
                    <Experience />
                    <Preload all />
                </Suspense>

                {debug && <Perf position="bottom-left" />}
            </Canvas>

            <LoadingScreen />

            <Leva
                hidden={!debug}
                theme={{ sizes: { rootWidth: '350px' } }}
                collapsed
            />
        </>
    );
}

export default App;
