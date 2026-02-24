import type { Metadata } from "next";
import { Montserrat, Cairo } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const cairo = Cairo({
    variable: "--font-cairo",
    subsets: ["arabic"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "TAW 10 - Domiciliation et Création d'Entreprise au Maroc",
    description: "TAW 10 est votre partenaire de confiance pour la domiciliation d'entreprises et la création de sociétés au Maroc.",
};

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import WhatsappContact from "@/components/WhatsappContact";

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className="scroll-smooth">
            <body
                className={`${montserrat.variable} ${cairo.variable} antialiased selection:bg-secondary/30`}
            >
                <NextIntlClientProvider messages={messages}>
                    <Preloader />
                    <SmoothScroll>
                        <CustomCursor />
                        <div className="fouc-guard opacity-0">
                            {children}
                        </div>
                        <WhatsappContact />
                    </SmoothScroll>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
