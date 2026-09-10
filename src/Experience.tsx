import { Environment } from './Environment';
import { Kisa } from './monsters/Kisa';
import { Stage } from './Stage';
import { Cyclops } from './monsters/Cyclops';
import { useCameraTilt } from './hooks/useCameraTilt';
import { MrSlime } from './monsters/MrSlime';

export function Experience() {
    useCameraTilt();

    return (
        <>
            <Kisa />
            <Cyclops />
            <MrSlime />

            <Stage />
            <Environment />
        </>
    );
}
