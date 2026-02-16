"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Mail, Phone, MapPin, Send, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";
import SplitTextReveal from "./SplitTextReveal";

const ContactContent = () => {
    const searchParams = useSearchParams();
    const packParam = searchParams.get("pack");
    const [selectedPack, setSelectedPack] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    useEffect(() => {
        if (packParam) {
            const packs = ["INTILAQA", "INTILAQA PRO", "INTILAQA PLUS", "INTILAQA PREMIUM"];
            const matchedPack = packs.find(p => p.toLowerCase() === packParam.toLowerCase());
            if (matchedPack) {
                setSelectedPack(`Pack ${matchedPack}`);
            }
        }
    }, [packParam]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const whatsappNumber = "+212607790956";
        const text = `*Nouveau Message de TAW 10*%0A%0A` +
            `*Nom:* ${formData.name}%0A` +
            `*Email:* ${formData.email}%0A` +
            `*Téléphone:* ${formData.phone}%0A` +
            `*Service/Pack:* ${selectedPack || "Non spécifié"}%0A` +
            `*Message:* ${formData.message}`;

        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
    };
    return (
        <section id="contact" className="py-32 bg-white relative overflow-hidden">
            {/* Cinematic Background Glows */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-0 right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[150px] -z-0"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.05, 0.1, 0.05],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-[120px] -z-0"
            />
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-24">
                    {/* Info Side */}
                    <div className="lg:w-1/2">
                        <div className="mb-10">
                            <SplitTextReveal
                                className="text-secondary font-bold uppercase tracking-[0.2em] text-sm mb-6 block"
                                type="chars"
                            >
                                Contactez-Nous
                            </SplitTextReveal>
                            <SplitTextReveal
                                className="text-5xl md:text-6xl font-bold text-primary mb-10 leading-[1.1]"
                                type="words"
                                delay={0.2}
                            >
                                Prêt à Lancer Votre Projet ?
                            </SplitTextReveal>
                        </div>

                        <ScrollReveal delay={0.4}>
                            <p className="text-gray-500 text-xl mb-16 leading-relaxed font-light">
                                Chez TAW 10, nous avons à cœur de transformer vos défis administratifs en opportunités de croissance. Parlons de votre vision.
                            </p>

                            <div className="space-y-10">
                                <div className="flex items-start gap-8 group">
                                    <div className="bg-white p-5 rounded-2xl shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-gray-100">
                                        <Mail className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-2 text-xl tracking-tight">Email Direct</h4>
                                        <a href="mailto:Contact@taw10.ma" className="text-gray-500 text-lg hover:text-secondary transition-colors underline decoration-secondary/30 underline-offset-4">Contact@taw10.ma</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-8 group">
                                    <div className="bg-white p-5 rounded-2xl shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-gray-100">
                                        <Phone className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-2 text-xl tracking-tight">Téléphone</h4>
                                        <div className="space-y-2">
                                            <p className="text-gray-500 text-lg">+212 52430-8038</p>
                                            <p className="text-gray-500 text-lg">+212 607790956</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-8 group">
                                    <div className="bg-white p-5 rounded-2xl shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-gray-100">
                                        <MapPin className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-2 text-xl tracking-tight">Siège Social</h4>
                                        <p className="text-gray-500 text-lg">N, TAW10, lot Iguder, 48 AV Alla El Fassi, Marrakech</p>
                                        <p className="text-secondary font-bold text-sm uppercase tracking-widest mt-2">Ouvert du Lundi au Samedi</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Form Side */}
                    <div className="lg:w-1/2">
                        <ScrollReveal delay={0.3}>
                            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-[0_30px_100px_-30px_rgba(0,0,0,0.08)] border border-gray-100/50 relative overflow-hidden group">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-32 -right-32 w-64 h-64 bg-secondary/5 rounded-full blur-[60px] -z-0"
                                />

                                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Nom Complet</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Votre nom"
                                            className="w-full px-7 py-4 rounded-2xl bg-blue-50/30 border-gray-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 transition-all outline-none font-medium text-sm shadow-sm text-primary"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Address Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="email@example.com"
                                                className="w-full px-7 py-4 rounded-2xl bg-blue-50/30 border-gray-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 transition-all outline-none font-medium text-sm shadow-sm text-primary"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Telephone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="06 00 00 00 00"
                                                className="w-full px-7 py-4 rounded-2xl bg-blue-50/30 border-gray-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 transition-all outline-none font-medium text-sm shadow-sm text-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Sélectionnez un service ou un pack</label>
                                        <div className="relative">
                                            <select
                                                value={selectedPack}
                                                onChange={(e) => setSelectedPack(e.target.value)}
                                                className="w-full px-7 py-4 rounded-2xl bg-blue-50/30 border-gray-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 transition-all outline-none appearance-none font-medium text-sm cursor-pointer text-primary shadow-sm"
                                            >
                                                <option value="" disabled className="text-gray-400">Choisissez un service ou un pack</option>
                                                <option value="Pack INTILAQA" className="text-primary bg-white">Pack INTILAQA</option>
                                                <option value="Pack INTILAQA PRO" className="text-primary bg-white">Pack INTILAQA PRO</option>
                                                <option value="Pack INTILAQA PLUS" className="text-primary bg-white">Pack INTILAQA PLUS</option>
                                                <option value="Pack INTILAQA PREMIUM" className="text-primary bg-white">Pack INTILAQA PREMIUM</option>
                                            </select>
                                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-primary pointer-events-none opacity-50" size={18} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Message</label>
                                        <textarea
                                            rows={3}
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            placeholder="Comment pouvons-nous vous accompagner ?"
                                            className="w-full px-7 py-4 rounded-2xl bg-blue-50/30 border-gray-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 transition-all outline-none resize-none font-medium text-sm text-primary shadow-sm"
                                        ></textarea>
                                    </div>

                                    <MagneticButton className="w-full">
                                        <button
                                            type="submit"
                                            className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary-light transition-all shadow-xl flex items-center justify-center gap-3 group/btn"
                                        >
                                            Envoyez
                                            <Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform text-secondary" />
                                        </button>
                                    </MagneticButton>
                                </form>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    return (
        <Suspense fallback={<div className="h-[600px] flex items-center justify-center bg-white rounded-[3rem] shadow-sm border border-gray-100/50"><div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div></div>}>
            <ContactContent />
        </Suspense>
    );
};

export default Contact;
