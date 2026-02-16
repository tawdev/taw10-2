"use client";

import React from "react";
import { Quote, Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SplitTextReveal from "./SplitTextReveal";

const testimonials = [
    {
        name: "Paddy Hardy",
        role: "Entrepreneur",
        content: "TAW 10 a transformé notre expérience de domiciliation. Rapide, transparent et professionnel – une adresse prestigieuse qui booste vraiment notre image !",
        stars: 5,
    },
    {
        name: "Hari Wheatley",
        role: "Manager",
        content: "Excellente expérience avec TAW 10. Le processus est simple, l'équipe est réactive, et le service de secrétariat virtuel est top. Recommandé sans hésitation.",
        stars: 5,
    },
    {
        name: "Priscilla Russo",
        role: "CEO Brand",
        content: "TAW 10 offre un service de domiciliation impeccable. Leur support administratif personnalisé est un véritable atout pour notre gestion quotidienne. Très satisfait !",
        stars: 5,
    },
    {
        name: "Fannie Sanders",
        role: "Entrepreneur",
        content: "Depuis que nous avons choisi TAW 10, notre entreprise a gagné en visibilité et en crédibilité. Leur accompagnement est exceptionnel, et leur service en ligne est très pratique.",
        stars: 5,
    },
];

const Testimonials = () => {
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
                        Témoignages
                    </SplitTextReveal>
                    <SplitTextReveal
                        className="text-5xl md:text-6xl font-bold mb-8 tracking-tight"
                        type="words"
                        delay={0.2}
                    >
                        Ce Que Nos Clients Disent
                    </SplitTextReveal>
                    <ScrollReveal delay={0.4}>
                        <p className="text-white/60 text-xl font-light">
                            Découvrez les témoignages de nos clients qui ont bénéficié de nos services de domiciliation et de gestion.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((t, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] relative h-full flex flex-col hover:bg-white/10 transition-all duration-500 group border-b-4 border-b-transparent hover:border-b-secondary">
                                <Quote className="text-secondary w-10 h-10 mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                                <div className="flex gap-1 mb-6 text-secondary">
                                    {[...Array(t.stars)].map((_, idx) => (
                                        <Star key={idx} size={14} fill="currentColor" />
                                    ))}
                                </div>
                                <p className="text-white/80 text-lg mb-10 leading-relaxed font-light italic flex-grow">
                                    &ldquo;{t.content}&rdquo;
                                </p>
                                <div className="border-t border-white/10 pt-6 mt-auto">
                                    <h4 className="font-bold text-white text-lg tracking-wide">{t.name}</h4>
                                    <p className="text-secondary/60 text-xs font-medium uppercase tracking-widest mt-1">{t.role}</p>
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
