import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { Preload } from '@react-three/drei';
import { Leva } from 'leva';

import { Experience } from './Experience';
import { LoadingScreen } from './LoadingScreen';
import { GithubLink } from './GithubLink';
import { LightControls } from './LightControls';
import { useDebug } from './hooks/useDebug';
import { CAMERA_POSITION, CAMERA_TARGET } from './constants';
import './App.css';

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

                {debug && <Perf position="top-left" />}
            </Canvas>

            <LightControls />

            <GithubLink />

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
