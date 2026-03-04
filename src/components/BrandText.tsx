"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BrandTextProps {
    text: string;
    className?: string;
    as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const BrandText = forwardRef<HTMLElement, BrandTextProps>(({ text, className, as: Component = 'span' }, ref) => {
    const content = typeof text === 'string' ? text : "";

    // Most permissive matching: "taw" followed by anything that isn't a word character, followed by "10"
    const regex = /(taw[\s\W]{0,3}10)/gi;
    const parts = content.split(regex);

    return (
        <Component ref={ref as any} className={cn(className)}>
            {parts.map((part, i) => {
                const normalized = part.toLowerCase().replace(/[^taw0-9]/g, "");

                if (normalized === "taw10") {
                    return (
                        <strong
                            key={i}
                            className="brand-highlight"
                            style={{
                                color: "#ffd700 !important" as any, // Bright gold
                                fontSize: "1.15em !important" as any,
                                display: "inline-block !important" as any,
                                textShadow: "0 0 10px rgba(255,215,0,0.3) !important" as any,
                            }}
                        >
                            {part.toUpperCase()}
                        </strong>
                    );
                }
                return <React.Fragment key={i}>{part}</React.Fragment>;
            })}
        </Component>
    );
});

BrandText.displayName = "BrandText";

export default BrandText;
