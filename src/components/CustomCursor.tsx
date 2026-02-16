"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap-animations";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Outer follower (lagging effect)
            gsap.to(follower, {
                x: clientX,
                y: clientY,
                duration: 0.5,
                ease: "power2.out",
            });

            // Inner cursor (precise)
            gsap.set(cursor, {
                x: clientX,
                y: clientY,
            });
        };

        const onMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("button") ||
                target.closest("a") ||
                target.classList.contains("cursor-pointer")
            ) {
                setIsPointer(true);
                gsap.to(follower, {
                    scale: 2.5,
                    backgroundColor: "rgba(230, 187, 85, 0.15)", // Using secondary color
                    borderColor: "rgba(230, 187, 85, 1)",
                    duration: 0.3,
                });
                gsap.to(cursor, {
                    scale: 0.5,
                    duration: 0.3,
                });
            } else {
                setIsPointer(false);
                gsap.to(follower, {
                    scale: 1,
                    backgroundColor: "transparent",
                    borderColor: "rgba(230, 187, 85, 0.5)",
                    duration: 0.3,
                });
                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.3,
                });
            }
        };

        const onMouseDown = () => {
            gsap.to([cursor, follower], { scale: 0.8, duration: 0.2 });
        };

        const onMouseUp = () => {
            gsap.to([cursor, follower], { scale: isPointer ? 2.5 : 1, duration: 0.2 });
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", onMouseEnter);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseEnter);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [isPointer]);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-secondary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-secondary/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
            />
        </>
    );
}
