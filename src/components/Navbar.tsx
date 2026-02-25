"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, Phone, Clock, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/gsap-animations";
import MagneticButton from "./MagneticButton";

const Navbar = () => {
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const headerRef = useRef<HTMLElement>(null);
    const topBarRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Initial Appearance Animation
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        gsap.set(headerRef.current, { y: -100, opacity: 0 });

        tl.to(headerRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.2
        });
    }, { scope: headerRef });

    // Scroll Logic: Hide on scroll down, show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Background opacity logic
            setScrolled(currentScrollY > 20);

            // Visibility logic
            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY.current) {
                    setIsVisible(false); // Scrolling down
                } else {
                    setIsVisible(true); // Scrolling up
                }
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: t('home'), href: "/" },
        { name: t('services'), href: "/#services" },
        { name: t('whyUs'), href: "/#pourquoi" },
        { name: t('pricing'), href: "/#tarifs" },
        { name: t('contact'), href: "/#contact" },
    ];

    return (
        <>
            <header
                ref={headerRef}
                className={cn(
                    "fixed top-0 left-0 w-full z-50 transition-all duration-500 transform",
                    (isVisible || isOpen) ? "translate-y-0" : "-translate-y-full",
                    scrolled ? "py-2" : "py-0"
                )}
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
            >
                {/* Top Bar - Fades out on scroll */}
                <div
                    ref={topBarRef}
                    className={cn(
                        "hidden lg:block bg-primary text-white py-2 transition-all duration-500 overflow-hidden",
                        scrolled ? "h-0 opacity-0" : "h-auto opacity-100"
                    )}
                >
                    <div className={cn(
                        "container mx-auto px-6 flex justify-between items-center text-[11px] font-bold uppercase",
                        locale === 'ar' ? "tracking-normal" : "tracking-[0.2em]"
                    )}>
                        <div className="flex items-center gap-8">
                            <span className="flex items-center gap-2">
                                <Clock size={12} className="text-secondary" />
                                {t('hours')}
                            </span>
                            <span className="flex items-center gap-2">
                                <Mail size={12} className="text-secondary" />
                                Contact@taw10.com
                            </span>
                        </div>
                        <div className="flex items-center gap-8">
                            <a href="tel:+212524308038" className="flex items-center gap-2 hover:text-secondary transition-colors">
                                <Phone size={12} className="text-secondary" />
                                +212 52430-8038
                            </a>
                            <div className="flex items-center gap-3">
                                <Link href={pathname} locale="fr" className={cn("hover:text-secondary transition-colors", locale === 'fr' ? "text-secondary underline decoration-secondary/30 underline-offset-4" : "opacity-60")}>FR</Link>
                                <span className="text-white/20">/</span>
                                <Link href={pathname} locale="ar" className={cn("hover:text-secondary transition-colors", locale === 'ar' ? "text-secondary underline decoration-secondary/30 underline-offset-4" : "opacity-60")}>AR</Link>
                                <span className="text-white/20">/</span>
                                <Link href={pathname} locale="en" className={cn("hover:text-secondary transition-colors", locale === 'en' ? "text-secondary underline decoration-secondary/30 underline-offset-4" : "opacity-60")}>EN</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Navigation Row */}
                <div
                    ref={navRef}
                    className={cn(
                        "transition-all duration-500 mx-auto",
                        scrolled
                            ? "container mt-2 bg-primary/90 backdrop-blur-xl rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 px-8 py-3"
                            : "bg-primary border-b border-white/5 px-6 py-4"
                    )}
                >
                    <div className="flex items-center justify-between">
                        {/* Logo Fix: Specific size and priority */}
                        <Link href="/" className="relative flex items-center transition-transform hover:scale-105 active:scale-95">
                            <div className="relative h-14 w-36 md:h-16 md:w-44">
                                <Image
                                    src="/logo.png"
                                    alt="TAW10 Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <ul className="hidden lg:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-white/80 text-sm font-bold uppercase hover:text-secondary transition-colors relative group",
                                            locale === 'ar' ? "tracking-normal" : "tracking-widest"
                                        )}
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-500 group-hover:w-full" />
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* CTA with Magnetic Effect */}
                        <div className="hidden lg:flex items-center gap-4">
                            <div className="h-8 w-[1px] bg-gray-100 me-2" />
                            <MagneticButton>
                                <Link
                                    href="/#contact"
                                    className={cn(
                                        "bg-secondary text-primary px-8 py-3 rounded-full text-xs font-black uppercase shadow-lg hover:shadow-2xl transition-all block",
                                        locale === 'ar' ? "tracking-normal" : "tracking-[0.2em]"
                                    )}
                                >
                                    {t('consultation')}
                                </Link>
                            </MagneticButton>
                        </div>

                        {/* Mobile Controls */}
                        <div className="lg:hidden flex items-center gap-4">
                            {/* Mobile Language Switcher */}
                            <div className="flex items-center gap-3 text-[10px] font-bold text-white/60 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                <Link href={pathname} locale="fr" className={cn("hover:text-secondary transition-colors", locale === 'fr' ? "text-secondary" : "")}>FR</Link>
                                <span className="w-1 h-1 rounded-full bg-white/10" />
                                <Link href={pathname} locale="ar" className={cn("hover:text-secondary transition-colors", locale === 'ar' ? "text-secondary" : "")}>AR</Link>
                                <span className="w-1 h-1 rounded-full bg-white/10" />
                                <Link href={pathname} locale="en" className={cn("hover:text-secondary transition-colors", locale === 'en' ? "text-secondary" : "")}>EN</Link>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-white active:scale-90 transition-transform"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Premium Mobile Menu - Moved outside header stacking context */}
            <div
                ref={mobileMenuRef}
                style={{
                    backgroundColor: '#0a192f',
                    opacity: isOpen ? 1 : 0,
                    visibility: isOpen ? 'visible' : 'hidden',
                    zIndex: 999
                }}
                className={cn(
                    "lg:hidden fixed inset-0 transition-opacity duration-500 pointer-events-none flex items-center justify-center",
                    isOpen && "pointer-events-auto"
                )}
            >
                {/* Extra Background Layer - Guaranteed Solid */}
                <div className="absolute inset-0 bg-[#0a192f]" />

                <button
                    className="absolute top-8 right-8 text-white/50 hover:text-secondary transition-colors z-[101]"
                    onClick={() => setIsOpen(false)}
                >
                    <X size={40} strokeWidth={1} />
                </button>

                <div className="container px-6 flex flex-col items-center gap-12 text-center relative z-[101]">
                    <ul className="flex flex-col gap-8">
                        {navLinks.map((link, i) => (
                            <li
                                key={link.name}
                                className={cn(
                                    "transform transition-all duration-700",
                                    isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                )}
                                style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                            >
                                <Link
                                    href={link.href}
                                    className="text-4xl md:text-5xl text-white font-black uppercase tracking-tighter hover:text-secondary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className={cn(
                        "flex flex-col gap-6 items-center transform transition-all duration-700",
                        isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    )} style={{ transitionDelay: '500ms' }}>
                        <Link
                            href="/#contact"
                            className="bg-secondary text-primary px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] shadow-xl"
                            onClick={() => setIsOpen(false)}
                        >
                            {t('consultation')}
                        </Link>
                        <div className="flex items-center gap-8 text-white/40 font-bold uppercase tracking-widest text-sm pt-8 border-t border-white/5 w-64 justify-center">
                            <Link href={pathname} locale="fr" className={cn(locale === 'fr' ? "text-secondary underline decoration-secondary/30 underline-offset-8" : "")}>FR</Link>
                            <Link href={pathname} locale="ar" className={cn(locale === 'ar' ? "text-secondary underline decoration-secondary/30 underline-offset-8" : "")}>AR</Link>
                            <Link href={pathname} locale="en" className={cn(locale === 'en' ? "text-secondary underline decoration-secondary/30 underline-offset-8" : "")}>EN</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Navbar;
