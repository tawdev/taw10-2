"use client";

import React from "react";
import Image from "next/image";
import { Linkedin, Mail, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SplitTextReveal from "./SplitTextReveal";
import MagneticButton from "./MagneticButton";

const teamMembers = [
    {
        name: "Hicham MHAMEDI",
        role: "CEO",
        description: "PDG de TAW 10, expert en création d'entreprise et domiciliation au Maroc.",
        image: "/images/team/hicham.jpeg",
    },
    {
        name: "Salma AAOUAD",
        role: "Sales Department",
        description: "Spécialiste en vente et relation client, dédiée à votre satisfaction.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    },
    {
        name: "AFAFE KHLIFAL",
        role: "Office Manager",
        description: "Gestionnaire de bureau expérimentée, garantissant le bon fonctionnement de nos services.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    },
];

const Team = () => {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-10">
                    <div className="max-w-2xl">
                        <SplitTextReveal
                            className="text-secondary font-bold uppercase tracking-[0.2em] text-sm mb-4 block"
                            type="chars"
                        >
                            Meet With Our Expert
                        </SplitTextReveal>
                        <SplitTextReveal
                            className="text-5xl md:text-6xl font-bold text-primary mb-0"
                            type="words"
                            delay={0.2}
                        >
                            Découvrez notre équipe d&apos;experts dédiés à votre succès.
                        </SplitTextReveal>
                    </div>
                    <ScrollReveal delay={0.4}>
                        <p className="text-gray-500 text-xl font-light max-w-md">
                            Des professionnels passionnés qui mettent leur expertise à votre service pour transformer vos idées en succès.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {teamMembers.map((member, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <div className="group relative">
                                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 shadow-2xl bg-gray-100">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={index === 0}
                                        unoptimized={true}
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Social links hover card */}
                                    <div className="absolute bottom-8 left-8 right-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex justify-between items-center">
                                        <div className="flex gap-3">
                                            <a href="#" className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center hover:bg-white transition-colors">
                                                <Linkedin size={18} />
                                            </a>
                                            <a href="#" className="w-10 h-10 rounded-full bg-white/20 text-white backdrop-blur-md flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                                                <Mail size={18} />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-secondary font-bold uppercase tracking-widest text-xs mb-4">{member.role}</p>
                                <p className="text-gray-500 font-light leading-relaxed">
                                    {member.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* CTA Card */}
                <ScrollReveal delay={0.5}>
                    <div className="mt-24 p-12 md:p-16 rounded-[4rem] bg-primary text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-3xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2" />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Prêt à discuter de votre projet ?</h2>
                            <p className="text-white/60 text-xl font-light">Prenez rendez-vous pour une consultation gratuite dès maintenant.</p>
                        </div>

                        <MagneticButton>
                            <a
                                href="#contact"
                                className="bg-secondary text-primary px-10 py-5 rounded-full font-bold text-lg flex items-center gap-4 hover:bg-white transition-all shadow-xl group/btn"
                            >
                                COMMENCER MAINTENANT
                                <ArrowRight size={22} className="group-hover/btn:translate-x-2 transition-transform" />
                            </a>
                        </MagneticButton>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Team;
