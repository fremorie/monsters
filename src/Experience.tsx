import { Environment } from './Environment';
import { Kisa } from './monsters/Kisa';
import { Stage } from './Stage';
import { Cyclops } from './monsters/Cyclops';

export function Experience() {
    return (
        <>
            <Kisa />
            <Cyclops />

            <Stage />
            <Environment />
        </>
    );
}
