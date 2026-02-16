"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/navigation";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations('Footer');

    return (
        <footer className="bg-primary text-white pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Link href="/" className="inline-block relative h-10 w-24 md:h-12 md:w-32 active:scale-95 transition-transform">
                            <Image
                                src="/logo.png"
                                alt="TAW10 Logo"
                                fill
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-white/60 leading-relaxed">
                            {t('description')}
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-bold mb-8 relative inline-block">
                            {t('quickLinks')}
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary rounded-full" />
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { name: t('links.home'), href: "/" },
                                { name: t('links.services'), href: "/#services" },
                                { name: t('links.pricing'), href: "/#tarifs" },
                                { name: t('links.contact'), href: "/#contact" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-secondary hover:translate-x-2 transition-all inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Detail Section */}
                    <div>
                        <h4 className="text-xl font-bold mb-8 relative inline-block">
                            {t('contact')}
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary rounded-full" />
                        </h4>
                        <ul className="space-y-6 text-white/60">
                            <li className="flex gap-4 items-start">
                                <Mail className="text-secondary shrink-0" size={20} />
                                <a href="mailto:Contact@taw10.ma" className="hover:text-secondary transition-colors">Contact@taw10.ma</a>
                            </li>
                            <li className="flex gap-4 items-start">
                                <Phone className="text-secondary shrink-0" size={20} />
                                <div className="space-y-1">
                                    <p>+212 52430-8038</p>
                                    <p>+212 607790956</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Address Column */}
                    <div>
                        <h4 className="text-xl font-bold mb-8 relative inline-block">
                            {t('address')}
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary rounded-full" />
                        </h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4 items-start">
                                <MapPin className="text-secondary shrink-0" size={20} />
                                <span className="text-white/60 leading-relaxed">
                                    N , TAW10, lot Iguder, 48 AV Alla El Fassi<br />
                                    Marrakech 40000, Morocco
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 text-center text-white/30 text-sm">
                    <p>&copy; {new Date().getFullYear()} C-Digital. {t('rights')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
