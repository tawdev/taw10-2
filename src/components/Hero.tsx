"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap-animations";
import MagneticButton from "./MagneticButton";
import BrandText from "./BrandText";
import SplitTextReveal from "./SplitTextReveal";
import { useTranslations } from "next-intl";

const Hero = () => {
    const t = useTranslations('Hero');
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Initial state for non-split elements
        const animateTargets = [titleRef.current, textRef.current, actionsRef.current].filter(Boolean);
        if (animateTargets.length > 0) {
            gsap.set(animateTargets, {
                opacity: 0,
                y: 30
            });
        }
        gsap.set(imageRef.current, { scale: 1.2, filter: "blur(10px)" });
        gsap.set(overlayRef.current, { opacity: 0 });

        // Entrance Animation Sequence
        tl.to(overlayRef.current, { opacity: 1, duration: 1.5 })
            .to(imageRef.current, { scale: 1, filter: "blur(0px)", duration: 2 }, 0);

        if (titleRef.current) {
            tl.to(titleRef.current, { opacity: 1, y: 0, duration: 1 }, 0.8);
        }

        if (textRef.current) {
            tl.to(textRef.current, { opacity: 1, y: 0, duration: 1 }, 1);
        }

        if (actionsRef.current) {
            tl.to(actionsRef.current, { opacity: 1, y: 0, duration: 1 }, 1.2);
        }

        // Parallax Scroll Effect
        gsap.to(imageRef.current, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        // Content subtle float up on scroll
        const scrollTargets = [titleRef.current, textRef.current, actionsRef.current].filter(Boolean);
        if (scrollTargets.length > 0) {
            gsap.to(scrollTargets, {
                y: -30,
                stagger: 0.05,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center pt-48 md:pt-40">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <div ref={imageRef} className="relative h-[120%] w-full -top-[10%]">
                    <Image
                        src="/images/b_Image_de_fond_profes.jpeg"
                        alt="Hero Background"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>
                <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent z-10" />
            </div>

            <div className="container mx-auto px-4 relative z-20">
                <div className="max-w-4xl mx-auto text-center">
                    <BrandText
                        ref={titleRef}
                        className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6 md:mb-10 tracking-tighter block"
                        text={t.raw('title')}
                    />


                    <BrandText
                        ref={textRef}
                        className="text-white/70 text-lg md:text-2xl mb-8 md:mb-14 max-w-2xl leading-relaxed font-light mx-auto block"
                        text={String(t.raw('subtitle') || '').replace(/<\/?[^>]+(>|$)/g, "")}
                    />

                    <div
                        ref={actionsRef}
                        className="flex flex-wrap gap-10 items-center justify-center"
                    >
                        <MagneticButton>
                            <a
                                href="#contact"
                                className="bg-secondary text-primary px-12 py-6 rounded-full font-bold text-xl flex items-center gap-4 hover:bg-white transition-all shadow-2xl group overflow-hidden relative"
                            >
                                <span className="relative z-10">{t('cta')}</span>
                                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform relative z-10" />
                            </a>
                        </MagneticButton>

                        <a
                            href="tel:+212524308038"
                            className="text-white group hover:text-secondary transition-colors font-bold text-2xl flex items-center gap-4 decoration-secondary/30 underline-offset-8 underline"
                        >
                            <div className="bg-white/10 p-2 rounded-full group-hover:bg-secondary group-hover:text-primary transition-all">
                                <Phone size={22} />
                            </div>
                            +212 52430-8038
                        </a>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 -right-48 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] z-10 animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-[150px] z-10" />

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 opacity-40">
                <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
                <span className="text-white text-[10px] uppercase tracking-[0.5em] font-bold vertical-text">Scroll</span>
            </div>
        </section>
    );
};

export default Hero;
