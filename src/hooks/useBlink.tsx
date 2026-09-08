import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

type BlinkOptions = {
    /** rotation.x for each lid when the eye is shut */
    topClosed?: number;
    bottomClosed?: number;
    /** seconds for one half of the blink (close or open) */
    duration?: number;
    /** seconds of open-eyed pause between blinks */
    interval?: number;
};

export function useBlink({
    topClosed = 0.15,
    bottomClosed = -0.15,
    duration = 0.2,
    interval = 4,
}: BlinkOptions = {}) {
    const topEyeLidRef = useRef<THREE.Mesh>(null);
    const bottomEyeLidRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        const top = topEyeLidRef.current;
        const bottom = bottomEyeLidRef.current;
        if (!top || !bottom) return;

        // rest pose comes from the JSX rotation, so we always return exactly to it
        const topOpen = top.rotation.x;
        const bottomOpen = bottom.rotation.x;

        const tl = gsap.timeline({
            delay: 1,
            repeat: -1,
            repeatDelay: interval,
            defaults: { duration, ease: 'power2.inOut' },
        });

        tl.to(top.rotation, { x: topClosed }, 0)
            .to(bottom.rotation, { x: bottomClosed }, 0)
            .to(top.rotation, { x: topOpen }, '>')
            .to(bottom.rotation, { x: bottomOpen }, '<');

        return () => {
            tl.kill();
            // if we're killed mid-blink, don't leave the eyes stuck shut
            gsap.set(top.rotation, { x: topOpen });
            gsap.set(bottom.rotation, { x: bottomOpen });
        };
    }, [topClosed, bottomClosed, duration, interval]);

    return { topEyeLidRef, bottomEyeLidRef };
}
