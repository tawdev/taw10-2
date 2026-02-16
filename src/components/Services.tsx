"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import SplitTextReveal from "./SplitTextReveal";
import { services } from "@/data/services";

const Services = () => {
    return (
        <section id="services" className="py-32 bg-white relative overflow-hidden">
            {/* Decorative background elements */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-0 right-0 w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] -z-0 translate-x-1/4 -translate-y-1/4"
            />
            <motion.div
                animate={{
                    x: [0, -40, 0],
                    y: [0, 40, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[120px] -z-0 -translate-x-1/4 translate-y-1/4"
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <SplitTextReveal
                        className="text-secondary font-bold uppercase tracking-[0.25em] text-sm mb-6 block"
                        type="chars"
                    >
                        Nos Domaines d&apos;Expertise
                    </SplitTextReveal>
                    <SplitTextReveal
                        className="text-5xl md:text-7xl font-extrabold text-primary mb-10 leading-tight tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary"
                        type="words"
                        delay={0.2}
                    >
                        Solutions Complètes pour Entrepreneurs
                    </SplitTextReveal>
                    <ScrollReveal delay={0.4}>
                        <p className="text-gray-500 text-xl font-light leading-relaxed max-w-2xl mx-auto">
                            Chez TAW 10, nous propulsons vos ambitions avec des solutions sur-mesure et une expertise reconnue au cœur de Marrakech.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {services.map((service, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <motion.div
                                whileHover={{ y: -15 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="bg-white p-12 rounded-[3.5rem] shadow-[0_10px_60px_-20px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_90px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 group border border-gray-100/50 flex flex-col items-start h-full relative overflow-hidden active:scale-95"
                            >
                                <div className="absolute top-0 left-0 w-2 h-full bg-secondary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                                <div className={cn("p-6 rounded-3xl mb-12 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 border shadow-sm relative z-10", service.color)}>
                                    {React.cloneElement(service.icon as React.ReactElement<any>, { size: 40 })}
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-6 group-hover:text-secondary transition-colors duration-500">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500 mb-12 leading-relaxed font-light text-lg">
                                    {service.text}
                                </p>
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="mt-auto flex items-center gap-3 text-primary font-bold group-hover:gap-5 transition-all duration-500 relative overflow-hidden"
                                >
                                    <span className="relative z-10">En savoir plus</span>
                                    <ArrowRight size={20} className="text-secondary transition-transform duration-500 group-hover:translate-x-1" />
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                </Link>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
