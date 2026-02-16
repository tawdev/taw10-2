"use client";

import React from "react";
import { MousePointer2, FileText, CheckCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SplitTextReveal from "./SplitTextReveal";
import { useTranslations } from "next-intl";

const Process = () => {
    const t = useTranslations('Process');

    const steps = [
        {
            title: t('steps.0.title'),
            description: t('steps.0.description'),
            icon: <MousePointer2 size={32} className="text-secondary" />,
        },
        {
            title: t('steps.1.title'),
            description: t('steps.1.description'),
            icon: <FileText size={32} className="text-secondary" />,
        },
        {
            title: t('steps.2.title'),
            description: t('steps.2.description'),
            icon: <CheckCircle size={32} className="text-secondary" />,
        },
    ];

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px] -z-0 -translate-x-1/4 -translate-y-1/4" />
            <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[100px] -z-0 translate-x-1/4 translate-y-1/4" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <SplitTextReveal
                        className="text-secondary font-bold uppercase tracking-[0.2em] text-sm mb-4 block"
                        type="chars"
                    >
                        {t('title')}
                    </SplitTextReveal>
                    <SplitTextReveal
                        className="text-5xl md:text-6xl font-bold text-primary mb-8"
                        type="words"
                        delay={0.2}
                    >
                        {t('subtitle')}
                    </SplitTextReveal>
                    <ScrollReveal delay={0.4}>
                        <p className="text-gray-500 text-xl font-light">
                            {t('description')}
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting lines for desktop */}
                    <div className="hidden md:block absolute top-[40px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent -z-0" />

                    {steps.map((step, index) => (
                        <ScrollReveal key={index} delay={index * 0.2}>
                            <div className="flex flex-col items-center text-center group relative z-10">
                                <div className="w-20 h-20 rounded-[2rem] bg-white shadow-xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-gray-100 relative">
                                    {step.icon}
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform">
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-5 group-hover:text-secondary transition-colors duration-500">
                                    {step.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed font-light text-lg">
                                    {step.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
