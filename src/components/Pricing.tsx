"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import ScrollReveal from "./ScrollReveal";
import SplitTextReveal from "./SplitTextReveal";
import { useTranslations } from "next-intl";

const Pricing = () => {
    const t = useTranslations('Pricing');

    const plans = [
        {
            name: "intilaqa",
            price: "3499",
            features: [
                { id: "certificat", included: true },
                { id: "statuts", included: true },
                { id: "patente", included: true },
                { id: "rc", included: true },
                { id: "if", included: true },
                { id: "cnss", included: true },
                { id: "annonce", included: true },
                { id: "domiciliation_12", included: false },
                { id: "model_j", included: false },
                { id: "dgi", included: false },
                { id: "damancom", included: false },
                { id: "cachet", included: false },
                { id: "compte_bancaire", included: false },
                { id: "site_web", included: false },
            ],
            popular: false,
        },
        {
            name: "intilaqa_pro",
            price: "4699",
            features: [
                { id: "certificat", included: true },
                { id: "statuts", included: true },
                { id: "patente", included: true },
                { id: "rc", included: true },
                { id: "if", included: true },
                { id: "cnss", included: true },
                { id: "annonce", included: true },
                { id: "domiciliation_12", included: true },
                { id: "model_j", included: true },
                { id: "dgi", included: true },
                { id: "damancom", included: true },
                { id: "cachet", included: true },
                { id: "compte_bancaire", included: true },
                { id: "site_web", included: false },
            ],
            popular: true,
        },
        {
            name: "intilaqa_plus",
            price: "5999",
            features: [
                { id: "certificat", included: true },
                { id: "statuts", included: true },
                { id: "patente", included: true },
                { id: "rc", included: true },
                { id: "if", included: true },
                { id: "cnss", included: true },
                { id: "annonce", included: true },
                { id: "domiciliation_24", included: true },
                { id: "model_j", included: true },
                { id: "dgi", included: true },
                { id: "damancom", included: true },
                { id: "cachet", included: true },
                { id: "compte_bancaire", included: true },
                { id: "site_web", included: false },
            ],
            popular: false,
        },
        {
            name: "intilaqa_premium",
            price: "8999",
            features: [
                { id: "certificat", included: true },
                { id: "statuts", included: true },
                { id: "patente", included: true },
                { id: "rc", included: true },
                { id: "if", included: true },
                { id: "cnss", included: true },
                { id: "annonce", included: true },
                { id: "domiciliation_24", included: true },
                { id: "model_j", included: true },
                { id: "dgi", included: true },
                { id: "damancom", included: true },
                { id: "cachet", included: true },
                { id: "compte_bancaire", included: true },
                { id: "site_web", included: true },
            ],
            popular: false,
        },
    ];

    return (
        <section id="tarifs" className="py-32 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto mb-20">
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

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {plans.map((plan, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <div
                                className={cn(
                                    "relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 h-full flex flex-col group",
                                    plan.popular
                                        ? "border-secondary bg-primary text-white shadow-2xl scale-105 z-10"
                                        : "border-secondary/30 bg-white hover:bg-[#C9A84C] hover:border-secondary hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-secondary text-primary font-bold px-8 py-2 rounded-full text-xs uppercase tracking-[0.2em] shadow-lg">
                                        {t('popular')}
                                    </div>
                                )}

                                <div className="mb-8 text-center">
                                    <h3 className={cn("text-xl font-bold mb-4 transition-colors duration-500", plan.popular ? "text-secondary" : "text-primary group-hover:text-white")}>
                                        {t(`plans.${plan.name}`)}
                                    </h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className={cn("text-4xl font-extrabold tracking-tighter transition-colors duration-500", plan.popular ? "text-white" : "text-primary group-hover:text-white")}>{plan.price}</span>
                                        <span className={cn("text-sm font-medium uppercase transition-colors duration-500", plan.popular ? "text-white/60" : "text-gray-400 group-hover:text-white/80")}>{t('dhs_ht')}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-10 flex-grow">
                                    {plan.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-3">
                                            <div className={cn(
                                                "mt-1 p-0.5 rounded-full shrink-0 transition-colors duration-500",
                                                feature.included
                                                    ? (plan.popular ? "bg-secondary text-primary" : "bg-green-50 text-green-500 group-hover:bg-white group-hover:text-[#C9A84C]")
                                                    : (plan.popular ? "bg-white/10 text-white/30" : "bg-gray-50 text-gray-300 group-hover:bg-white/20 group-hover:text-white/40")
                                            )}>
                                                {feature.included ? <Check size={12} /> : <X size={12} />}
                                            </div>
                                            <span className={cn(
                                                "text-xs font-medium leading-tight transition-colors duration-500",
                                                !feature.included && (plan.popular ? "text-white/30" : "text-gray-400 group-hover:text-white/40"),
                                                feature.included && (plan.popular ? "text-white/90" : "text-gray-700 group-hover:text-white")
                                            )}>
                                                {t(`features.${feature.id}`)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={`/?pack=${t(`plans.${plan.name}`)}#contact`}
                                    className={cn(
                                        "w-full block text-center py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl",
                                        plan.popular
                                            ? "bg-secondary text-primary hover:bg-white"
                                            : "bg-secondary text-primary hover:bg-primary hover:text-white"
                                    )}
                                >
                                    {t('start')}
                                </Link>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
