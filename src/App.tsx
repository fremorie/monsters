import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { Preload, OrbitControls } from '@react-three/drei';
import { Leva } from 'leva';

import { Experience } from './Experience';
import { useDebug } from './hooks/useDebug';
import './App.css';

function App() {
    const debug = useDebug();

    return (
        <>
            <Canvas
                shadows
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 2000,
                    position: [1, 2, 3],
                }}
            >
                <OrbitControls makeDefault />
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
