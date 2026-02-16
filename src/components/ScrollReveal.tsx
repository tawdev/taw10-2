"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    staggerChildren?: boolean;
    delay?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    width = "100%",
    staggerChildren = false,
    delay = 0
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: delay,
                staggerChildren: staggerChildren ? 0.15 : 0,
            },
        },
    };

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "visible" }}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
