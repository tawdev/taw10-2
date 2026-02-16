"use client";

import { useRef } from "react";
import SplitType from "split-type";
import { gsap, useGSAP } from "@/lib/gsap-animations";
import { useLocale } from "next-intl";

interface SplitTextRevealProps {
    children: string;
    className?: string;
    type?: "chars" | "words" | "lines";
    delay?: number;
    once?: boolean;
}

export default function SplitTextReveal({
    children,
    className = "",
    type = "words",
    delay = 0,
    once = true,
}: SplitTextRevealProps) {
    const textRef = useRef<HTMLHeadingElement>(null);
    const locale = useLocale();

    // Force "words" or "lines" for Arabic to avoid breaking ligatures with "chars"
    const effectiveType = (locale === 'ar' && type === 'chars') ? 'words' : type;

    useGSAP(() => {
        if (!textRef.current) return;

        const text = new SplitType(textRef.current, { types: effectiveType });
        const targets = effectiveType === "chars" ? text.chars : effectiveType === "words" ? text.words : text.lines;

        gsap.fromTo(
            targets,
            {
                y: "100%",
                opacity: 0,
                rotateX: -45,
                transformOrigin: "top center",
            },
            {
                y: "0%",
                opacity: 1,
                rotateX: 0,
                duration: 1.2,
                stagger: 0.05,
                delay: delay,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 95%",
                    once: once,
                },
            }
        );

        return () => text.revert();
    }, [children, effectiveType, delay, once]); // Use effectiveType in dependency array

    return (
        <div className="overflow-hidden">
            <h2
                ref={textRef}
                className={className}
                dangerouslySetInnerHTML={{ __html: children }}
                suppressHydrationWarning
            />
        </div>
    );
}
