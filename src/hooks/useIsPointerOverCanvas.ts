import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';

export function useIsPointerOverCanvas() {
    const domElement = useThree((state) => state.gl.domElement);
    const isPointerOverCanvas = useRef(false);

    useEffect(() => {
        const handlePointerMove = () => {
            isPointerOverCanvas.current = true;
        };
        const handlePointerLeave = () => {
            isPointerOverCanvas.current = false;
        };

        domElement.addEventListener('pointermove', handlePointerMove);
        domElement.addEventListener('pointerleave', handlePointerLeave);

        return () => {
            domElement.removeEventListener('pointermove', handlePointerMove);
            domElement.removeEventListener('pointerleave', handlePointerLeave);
        };
    }, [domElement]);

    return isPointerOverCanvas;
}
