"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { CheckCircle2, Quote, Globe } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap-animations";
import ScrollReveal from "./ScrollReveal";
import SplitTextReveal from "./SplitTextReveal";
import { useTranslations } from "next-intl";

const WhyUs = () => {
    const t = useTranslations('WhyUs');
    const containerRef = useRef<HTMLDivElement>(null);
    const image1Ref = useRef<HTMLDivElement>(null);
    const image2Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(image1Ref.current, {
            y: -50,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });

        gsap.to(image2Ref.current, {
            y: 50,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });
    }, { scope: containerRef });

    const benefits = [
        t('benefits.0'),
        t('benefits.1'),
        t('benefits.2'),
        t('benefits.3'),
    ];

    return (
        <section ref={containerRef} id="pourquoi" className="py-32 overflow-hidden bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-24">
                    {/* Images Side */}
                    <div className="lg:w-1/2 relative">
                        <ScrollReveal>
                            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl group">
                                <div ref={image1Ref}>
                                    <Image
                                        src="/images/b_Image_de_fond_modern.png"
                                        alt={t('title')}
                                        width={600}
                                        height={800}
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Stats Card Overlay */}
                            <div ref={image2Ref} className="absolute -bottom-16 -right-16 bg-secondary p-10 rounded-[2.5rem] shadow-2xl z-20 text-primary hidden md:block border-8 border-white">
                                <span className="text-5xl font-extrabold block mb-2 tracking-tighter">2,250+</span>
                                <span className="text-sm font-bold uppercase tracking-widest opacity-80">{t('stats.clients')}</span>
                                <Globe className="absolute top-4 right-4 text-primary/10 w-12 h-12" />
                            </div>
                        </ScrollReveal>

                        {/* Decorative Background Element */}
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -z-10 animate-pulse" />
                    </div>

                    {/* Content Side */}
                    <div className="lg:w-1/2">
                        <div className="mb-10">
                            <SplitTextReveal
                                className="text-secondary font-bold uppercase tracking-[0.2em] text-sm mb-6 block"
                                type="chars"
                            >
                                {t('title')}
                            </SplitTextReveal>
                            <SplitTextReveal
                                className="text-5xl md:text-6xl font-bold text-primary mb-10 leading-[1.1]"
                                type="words"
                                delay={0.2}
                            >
                                {t('subtitle')}
                            </SplitTextReveal>
                        </div>

                        <ScrollReveal delay={0.4}>
                            <p className="text-gray-500 text-xl mb-12 leading-relaxed font-light">
                                {t('description')}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                                {benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="bg-secondary/10 p-2 rounded-lg group-hover:bg-secondary group-hover:text-primary transition-all">
                                            <CheckCircle2 className="w-6 h-6 text-secondary group-hover:text-inherit" />
                                        </div>
                                        <span className="text-primary font-bold">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="p-10 bg-gray-50 rounded-[2.5rem] border-l-8 border-secondary relative overflow-hidden group">
                                <Quote className="absolute top-6 right-8 text-secondary/10 w-24 h-24 -z-0" />
                                <p className="text-primary/80 italic text-xl relative z-10 leading-relaxed">
                                    &ldquo;{t('quote')}&rdquo;
                                </p>
                                <div className="mt-6 flex items-center gap-4">
                                    <div className="w-12 h-1 bg-secondary rounded-full" />
                                    <span className="font-bold text-primary uppercase tracking-widest text-sm">{t('direction')}</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
