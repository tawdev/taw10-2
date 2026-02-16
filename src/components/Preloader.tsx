"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap-animations";
import Image from "next/image";

const Preloader = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setIsVisible(false);
                document.body.style.overflow = "auto";
                // Show the main content with a smooth fade
                gsap.to(".fouc-guard", {
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                });
            },
        });

        // Initial setup
        tl.set(".preloader-logo", { opacity: 0, scale: 0.8, y: 20 });
        tl.set(".preloader-bg", { y: 0 });
        tl.set(".fouc-guard", { opacity: 0 });

        // Animation sequence
        tl.to(".preloader-logo", {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
            delay: 0.3
        })
            .to(".preloader-logo", {
                opacity: 0,
                scale: 1.1,
                duration: 0.6,
                ease: "power2.in"
            }, "+=0.5")
            .to(".preloader-bg", {
                y: "-100%",
                duration: 1.2,
                ease: "expo.inOut",
                stagger: 0.1
            }, "-=0.2");

        // Force body to be unscrollable during preloader
        document.body.style.overflow = "hidden";

        return () => {
            // Safety cleanup
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
            {/* Background Panels for cinematic curtain effect */}
            <div className="preloader-bg absolute inset-0 bg-primary" />
            <div className="preloader-bg absolute inset-0 bg-primary/95" />

            <div className="relative z-10 preloader-logo flex flex-col items-center">
                <div className="relative h-20 w-48 md:h-24 md:w-56 overflow-hidden">
                    <Image
                        src="/logo.png"
                        alt="TAW10 Logo"
                        fill
                        sizes="(max-width: 768px) 100vw, 224px"
                        className="object-contain brightness-0 invert"
                        priority
                    />
                </div>
                {/* Subtle loading line */}
                <div className="mt-8 h-[2px] w-32 bg-white/10 relative overflow-hidden rounded-full">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-secondary w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Preloader;
