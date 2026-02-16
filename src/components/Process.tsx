"use client";

import React from "react";
import { MousePointer2, FileText, CheckCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SplitTextReveal from "./SplitTextReveal";

const steps = [
    {
        title: "Sélectionnez votre adresse",
        description: "Choisissez l'une de nos adresses prestigieuses à Marrakech ou Laâyoune qui correspond le mieux à l'image de votre entreprise.",
        icon: <MousePointer2 size={32} className="text-secondary" />,
    },
    {
        title: "Complétez le formulaire en ligne",
        description: "Remplissez notre formulaire simple et intuitif en quelques minutes. Toutes les démarches sont 100% en ligne, avec un accompagnement à chaque étape si nécessaire.",
        icon: <FileText size={32} className="text-secondary" />,
    },
    {
        title: "Recevez votre confirmation instantanée",
        description: "En moins de 10 minutes, obtenez votre contrat de domiciliation et commencez à utiliser votre nouvelle adresse pour propulser votre business.",
        icon: <CheckCircle size={32} className="text-secondary" />,
    },
];

const Process = () => {
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
                        Comment ça marche ?
                    </SplitTextReveal>
                    <SplitTextReveal
                        className="text-5xl md:text-6xl font-bold text-primary mb-8"
                        type="words"
                        delay={0.2}
                    >
                        Comment ça marche en 3 étapes ?
                    </SplitTextReveal>
                    <ScrollReveal delay={0.4}>
                        <p className="text-gray-500 text-xl font-light">
                            Complétez notre formulaire simple et rapide en quelques clics. Toutes les démarches se font en ligne.
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
