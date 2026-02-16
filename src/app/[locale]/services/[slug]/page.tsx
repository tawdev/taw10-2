"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { services } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "@/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import SplitTextReveal from "@/components/SplitTextReveal";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export default function ServiceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const service = services.find((s) => s.slug === params.slug);
    const t = useTranslations('Services');
    const tDetail = useTranslations('ServiceDetail');

    if (!service) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>{tDetail('notFound')}</p>
                <Link href="/#services">{tDetail('back')}</Link>
            </div>
        );
    }

    const features = t.raw(`items.${service.slug}.features`) as string[];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section for Detail */}
            <section className="relative pt-40 pb-20 overflow-hidden bg-primary text-white">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <Link
                        href="/#services"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-secondary transition-colors mb-12 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        {tDetail('back')}
                    </Link>

                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className={cn("p-4 rounded-2xl w-fit mb-8 border", service.color)}
                        >
                            {React.cloneElement(service.icon as React.ReactElement<any>, { size: 48 })}
                        </motion.div>

                        <SplitTextReveal
                            className="text-5xl md:text-7xl font-black mb-8 leading-[1.1]"
                            type="words"
                        >
                            {t(`items.${service.slug}.title`)}
                        </SplitTextReveal>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-2xl"
                        >
                            {t(`items.${service.slug}.text`)}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        {/* Description */}
                        <ScrollReveal>
                            <div className="space-y-8">
                                <h2 className="text-3xl font-bold text-primary relative inline-block">
                                    {tDetail('overview')}
                                    <span className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary rounded-full" />
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {t(`items.${service.slug}.fullDescription`)}
                                </p>

                                <div className="pt-8">
                                    <Link
                                        href="/#contact"
                                        className="bg-primary text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-secondary hover:text-primary transition-all shadow-xl hover:shadow-2xl"
                                    >
                                        {tDetail('quote')}
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Features List */}
                        <ScrollReveal delay={0.2}>
                            <div className="bg-gray-50/50 p-12 rounded-[2.5rem] border border-gray-100">
                                <h3 className="text-2xl font-bold text-primary mb-10">{tDetail('whatWeOffer')}</h3>
                                <ul className="space-y-6">
                                    {features.map((feature, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex gap-4 items-center group"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                                <CheckCircle2 size={20} />
                                            </div>
                                            <span className="text-gray-700 font-medium text-lg">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
