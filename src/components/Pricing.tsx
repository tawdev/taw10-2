"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";
import SplitTextReveal from "./SplitTextReveal";

const plans = [
    {
        name: "INTILAQA",
        price: "3499",
        features: [
            { text: "Certificat Négatif", included: true },
            { text: "L'enregistrement des statuts", included: true },
            { text: "Inscription à la Patente", included: true },
            { text: "Registre de Commerce", included: true },
            { text: "Identifiant Fiscal", included: true },
            { text: "Affiliation à la CNSS", included: true },
            { text: "Annonce Légale", included: true },
            { text: "Domiciliation dans une adresse prestigieuse (12 month)", included: false },
            { text: "Model J", included: false },
            { text: "Adhésion au service de télédéclaration DGI", included: false },
            { text: "Adhésion au service de DAMANCOM", included: false },
            { text: "Cachet", included: false },
            { text: "Accompagnement à l'ouverture de compte Bancaire", included: false },
            { text: "Site web", included: false },
        ],
        popular: false,
    },
    {
        name: "INTILAQA PRO",
        price: "4699",
        features: [
            { text: "Certificat Négatif", included: true },
            { text: "L'enregistrement des statuts", included: true },
            { text: "Inscription à la Patente", included: true },
            { text: "Registre de Commerce", included: true },
            { text: "Identifiant Fiscal", included: true },
            { text: "Affiliation à la CNSS", included: true },
            { text: "Annonce Légale", included: true },
            { text: "Domiciliation dans une adresse prestigieuse (12 month)", included: true },
            { text: "Model J", included: true },
            { text: "Adhésion au service de télédéclaration DGI", included: true },
            { text: "Adhésion au service de DAMANCOM", included: true },
            { text: "Cachet", included: true },
            { text: "Accompagnement à l'ouverture de compte Bancaire", included: true },
            { text: "Site web", included: false },
        ],
        popular: true,
    },
    {
        name: "INTILAQA PLUS",
        price: "5999",
        features: [
            { text: "Certificat Négatif", included: true },
            { text: "L'enregistrement des statuts", included: true },
            { text: "Inscription à la Patente", included: true },
            { text: "Registre de Commerce", included: true },
            { text: "Identifiant Fiscal", included: true },
            { text: "Affiliation à la CNSS", included: true },
            { text: "Annonce Légale", included: true },
            { text: "Domiciliation dans une adresse prestigieuse (24 month)", included: true },
            { text: "Model J", included: true },
            { text: "Adhésion au service de télédéclaration DGI", included: true },
            { text: "Adhésion au service de DAMANCOM", included: true },
            { text: "Cachet", included: true },
            { text: "Accompagnement à l'ouverture de compte Bancaire", included: true },
            { text: "Site web", included: false },
        ],
        popular: false,
    },
    {
        name: "INTILAQA PREMIUM",
        price: "8999",
        features: [
            { text: "Certificat Négatif", included: true },
            { text: "L'enregistrement des statuts", included: true },
            { text: "Inscription à la Patente", included: true },
            { text: "Registre de Commerce", included: true },
            { text: "Identifiant Fiscal", included: true },
            { text: "Affiliation à la CNSS", included: true },
            { text: "Annonce Légale", included: true },
            { text: "Domiciliation dans une adresse prestigieuse (24 month)", included: true },
            { text: "Model J", included: true },
            { text: "Adhésion au service de télédéclaration DGI", included: true },
            { text: "Adhésion au service de DAMANCOM", included: true },
            { text: "Cachet", included: true },
            { text: "Accompagnement à l'ouverture de compte Bancaire", included: true },
            { text: "Site web", included: true },
        ],
        popular: false,
    },
];

const Pricing = () => {
    return (
        <section id="tarifs" className="py-32 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <SplitTextReveal
                        className="text-secondary font-bold uppercase tracking-[0.2em] text-sm mb-4 block"
                        type="chars"
                    >
                        Nos Tarifs
                    </SplitTextReveal>
                    <SplitTextReveal
                        className="text-5xl md:text-6xl font-bold text-primary mb-8"
                        type="words"
                        delay={0.2}
                    >
                        Transparence et Simplicité pour Tous Vos Besoins
                    </SplitTextReveal>
                    <ScrollReveal delay={0.4}>
                        <p className="text-gray-500 text-xl font-light">
                            Des formules adaptées à chaque étape de votre croissance. Pas de frais cachés.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {plans.map((plan, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <div
                                className={cn(
                                    "relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 h-full flex flex-col",
                                    plan.popular
                                        ? "border-secondary bg-primary text-white shadow-2xl scale-105 z-10"
                                        : "border-gray-50 bg-white hover:border-primary/20 hover:shadow-xl"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-secondary text-primary font-bold px-8 py-2 rounded-full text-xs uppercase tracking-[0.2em] shadow-lg">
                                        POPULAIRE
                                    </div>
                                )}

                                <div className="mb-8 text-center">
                                    <h3 className={cn("text-xl font-bold mb-4", plan.popular ? "text-secondary" : "text-primary")}>
                                        {plan.name}
                                    </h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-4xl font-extrabold tracking-tighter">{plan.price}</span>
                                        <span className={cn("text-sm font-medium uppercase", plan.popular ? "text-white/60" : "text-gray-400")}>Dhs HT</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-10 flex-grow">
                                    {plan.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-3">
                                            <div className={cn(
                                                "mt-1 p-0.5 rounded-full shrink-0",
                                                feature.included
                                                    ? (plan.popular ? "bg-secondary text-primary" : "bg-green-50 text-green-500")
                                                    : (plan.popular ? "bg-white/10 text-white/30" : "bg-gray-50 text-gray-300")
                                            )}>
                                                {feature.included ? <Check size={12} /> : <X size={12} />}
                                            </div>
                                            <span className={cn(
                                                "text-xs font-medium leading-tight",
                                                !feature.included && (plan.popular ? "text-white/30" : "text-gray-400"),
                                                feature.included && (plan.popular ? "text-white/90" : "text-gray-700")
                                            )}>
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="#contact"
                                    className={cn(
                                        "w-full block text-center py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl",
                                        plan.popular
                                            ? "bg-secondary text-primary hover:bg-white"
                                            : "bg-cyan-400 text-primary hover:bg-primary hover:text-white"
                                    )}
                                >
                                    COMMENCER
                                </a>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
