"use client";

import React from "react";
import { Quote, Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SplitTextReveal from "./SplitTextReveal";
import { useTranslations } from "next-intl";
import BrandText from "./BrandText";

const Testimonials = () => {
    const t = useTranslations('Testimonials');

    const testimonials = [
        {
            name: "Paddy Hardy",
            role: t('reviews.0.role'),
            content: t.raw('reviews.0.content'),
            stars: 5,
        },
        {
            name: "Hari Wheatley",
            role: t('reviews.1.role'),
            content: t.raw('reviews.1.content'),
            stars: 5,
        },
        {
            name: "Priscilla Russo",
            role: t('reviews.2.role'),
            content: t.raw('reviews.2.content'),
            stars: 5,
        },
        {
            name: "Fannie Sanders",
            role: t('reviews.3.role'),
            content: t.raw('reviews.3.content'),
            stars: 5,
        },
    ];

    return (
        <section id="temoignages" className="py-32 bg-primary text-white overflow-hidden relative">
            {/* Decorative background gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <SplitTextReveal
                        className="text-secondary font-bold uppercase tracking-[0.2em] text-sm mb-4 block"
                        type="chars"
                    >
                        {t.raw('title')}
                    </SplitTextReveal>
                    <SplitTextReveal
                        className="text-5xl md:text-6xl font-bold mb-8 tracking-tight"
                        type="words"
                        delay={0.2}
                    >
                        {t('subtitle')}
                    </SplitTextReveal>
                    <ScrollReveal delay={0.4}>
                        <p className="text-white/60 text-xl font-light">
                            {t.raw('description')}
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <ScrollReveal key={i} delay={i * 0.1} className="h-full">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] relative h-full flex flex-col hover:bg-white/10 transition-all duration-500 group border-b-4 border-b-transparent hover:border-b-secondary">
                                <Quote className="text-secondary w-10 h-10 mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                                <div className="flex gap-1 mb-6 text-secondary">
                                    {[...Array(testimonial.stars)].map((_, idx) => (
                                        <Star key={idx} size={14} fill="currentColor" />
                                    ))}
                                </div>
                                <BrandText
                                    className="text-white/80 text-lg mb-10 leading-relaxed font-light italic flex-grow block"
                                    text={`“${t.raw(`reviews.${i}.content`).replace(/<\/?[^>]+(>|$)/g, "")}”`}
                                />
                                <div className="border-t border-white/10 pt-6 mt-auto">
                                    <h4 className="font-bold text-white text-lg tracking-wide">{testimonial.name}</h4>
                                    <p className="text-secondary/60 text-xs font-medium uppercase tracking-widest mt-1">{testimonial.role}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
