import { Environment } from './Environment';
import { Kisa } from './monsters/Kisa';
import { Stage } from './Stage';
import { Cyclops } from './monsters/Cyclops';
import { useCameraTilt } from './hooks/useCameraTilt';

export function Experience() {
    useCameraTilt();

    return (
        <>
            <Kisa />
            <Cyclops />

            <Stage />
            <Environment />
        </>
    );
}
