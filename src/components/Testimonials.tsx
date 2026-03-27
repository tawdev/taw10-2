"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SplitTextReveal from "./SplitTextReveal";
import { useTranslations } from "next-intl";
import BrandText from "./BrandText";

const Testimonials = () => {
    const t = useTranslations('Testimonials');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);
    const [isPaused, setIsPaused] = useState(false);

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
        {
            name: "Sarah Alami",
            role: t('reviews.4.role'),
            content: t.raw('reviews.4.content'),
            stars: 5,
        },
        {
            name: "Mehdi Benani",
            role: t('reviews.5.role'),
            content: t.raw('reviews.5.content'),
            stars: 5,
        },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setItemsPerView(3);
            else if (window.innerWidth >= 768) setItemsPerView(2);
            else setItemsPerView(1);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = testimonials.length - itemsPerView;

    const next = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(interval);
    }, [isPaused, itemsPerView, maxIndex]);

    return (
        <section 
            id="temoignages" 
            className="py-32 bg-primary text-white overflow-hidden relative"
        >
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

                <div className="relative max-w-6xl mx-auto">
                    <div 
                        className="overflow-hidden"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <motion.div
                            className="flex cursor-grab active:cursor-grabbing"
                            drag="x"
                            dragConstraints={{ right: 0, left: -(maxIndex * (100 / itemsPerView)) }}
                            onDragEnd={(_, info) => {
                                if (info.offset.x < -100) next();
                                if (info.offset.x > 100) prev();
                            }}
                            animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
                            transition={{ type: "spring", stiffness: 200, damping: 30 }}
                        >
                            {testimonials.map((testimonial, i) => (
                                <div 
                                    key={i} 
                                    className="shrink-0 px-3"
                                    style={{ width: `${100 / itemsPerView}%` }}
                                >
                                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] relative h-full flex flex-col hover:bg-white/10 transition-all duration-500 group border-b-4 border-b-transparent hover:border-b-secondary">
                                        <Quote className="text-secondary w-10 h-10 mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                                        <div className="flex gap-1 mb-6 text-secondary">
                                            {[...Array(testimonial.stars)].map((_, idx) => (
                                                <Star key={idx} size={14} fill="currentColor" />
                                            ))}
                                        </div>
                                        <BrandText
                                            as="p"
                                            className="text-white/80 text-lg mb-10 leading-relaxed font-light italic flex-grow block"
                                            text={`“${testimonial.content.replace(/<\/?[^>]+(>|$)/g, "")}”`}
                                        />
                                        <div className="border-t border-white/10 pt-6 mt-auto">
                                            <h4 className="font-bold text-white text-lg tracking-wide">{testimonial.name}</h4>
                                            <p className="text-secondary/60 text-xs font-medium uppercase tracking-widest mt-1">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center md:justify-between items-center mt-12 gap-8 relative">
                        <div className="flex gap-4">
                            <button
                                onClick={prev}
                                className="w-12 h-12 rounded-full bg-white/5 hover:bg-secondary hover:text-primary border border-white/10 flex items-center justify-center transition-all z-20"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={next}
                                className="w-12 h-12 rounded-full bg-white/5 hover:bg-secondary hover:text-primary border border-white/10 flex items-center justify-center transition-all z-20"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Indicators */}
                        <div className="flex justify-center gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === i ? "bg-secondary w-8" : "bg-white/20 hover:bg-white/40"
                                        }`}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
