"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

// Safe plugin registration helper
export const registerGSAPPlugins = () => {
    if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }
};

interface UseGSAPConfig {
    scope?: React.RefObject<HTMLElement | null>;
    dependencies?: unknown[];
}

/**
 * A custom hook to safely use GSAP in React with automatic cleanup.
 * Support either a dependency array or a configuration object (like { scope: ref }).
 */
export const useGSAP = (
    callback: () => void,
    config?: unknown[] | UseGSAPConfig
) => {
    const deps = Array.isArray(config) ? config : config?.dependencies || [];
    const scope = Array.isArray(config) ? undefined : config?.scope;

    useLayoutEffect(() => {
        // Automatically register plugins if needed before running animations
        registerGSAPPlugins();

        const ctx = gsap.context(callback, scope || undefined);
        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};

export { gsap, ScrollTrigger };
