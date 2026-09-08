import { Environment } from './Environment';
import { Kisa } from './monsters/Kisa';
import { Stage } from './Stage';

export function Experience() {
    return (
        <>
            <Kisa />

            <Stage />
            <Environment />
        </>
    );
}
