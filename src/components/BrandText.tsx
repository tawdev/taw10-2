"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BrandTextProps {
    text: string;
    className?: string;
}

const BrandText = forwardRef<HTMLSpanElement, BrandTextProps>(({ text, className }, ref) => {
    const content = typeof text === 'string' ? text : "";

    // Most permissive matching: "taw" followed by anything that isn't a word character, followed by "10"
    const regex = /(taw[\s\W]{0,3}10)/gi;
    const parts = content.split(regex);

    return (
        <span ref={ref} className={cn("inline", className)}>
            {parts.map((part, i) => {
                const normalized = part.toLowerCase().replace(/[^taw0-9]/g, "");

                if (normalized === "taw10") {
                    return (
                        <strong
                            key={i}
                            className="brand-highlight"
                            style={{
                                fontWeight: "900 !important" as any,
                                color: "#ffd700 !important" as any, // Bright gold
                                fontSize: "1.15em !important" as any,
                                display: "inline-block !important" as any,
                                textShadow: "0 0 10px rgba(255,215,0,0.3) !important" as any,
                                fontFamily: "var(--font-montserrat), sans-serif"
                            }}
                        >
                            {part.toUpperCase()}
                        </strong>
                    );
                }
                return <React.Fragment key={i}>{part}</React.Fragment>;
            })}
        </span>
    );
});

BrandText.displayName = "BrandText";

export default BrandText;
