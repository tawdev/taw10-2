import type { Metadata } from "next";
import { Montserrat, Cairo } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Script from "next/script";
import "../globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import WhatsappContact from "@/components/WhatsappContact";
import JsonLd from "@/components/JsonLd";

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

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        alternates: {
            canonical: `https://taw10.ma/${locale}`,
            languages: {
                'fr': 'https://taw10.ma/fr',
                'ar': 'https://taw10.ma/ar',
            },
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: `https://taw10.ma/${locale}`,
            siteName: 'TAW 10',
            locale: locale === 'ar' ? 'ar_MA' : 'fr_MA',
            type: 'website',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'TAW 10 - Domiciliation et Création d\'Entreprise',
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
            images: ['/og-image.jpg'],
        },
        icons: {
            icon: [
                { url: '/favicon.ico' },
                { url: '/icon.png', type: 'image/png' },
            ],
            apple: [
                { url: '/apple-icon.png' },
            ],
        },
    };
}


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
                        <JsonLd data={{
                            "@context": "https://schema.org",
                            "@type": "LocalBusiness",
                            "name": "TAW 10",
                            "image": "https://taw10.ma/logo.png",
                            "@id": "https://taw10.ma",
                            "url": "https://taw10.ma",
                            "telephone": "+212000000000",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "Guéliz",
                                "addressLocality": "Marrakech",
                                "postalCode": "40000",
                                "addressCountry": "MA"
                            },
                            "geo": {
                                "@type": "GeoCoordinates",
                                "latitude": 31.6295,
                                "longitude": -7.9811
                            },
                            "openingHoursSpecification": {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": [
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                    "Saturday"
                                ],
                                "opens": "09:00",
                                "closes": "20:00"
                            }
                        }} />
                        <div className="fouc-guard opacity-0">
                            {children}
                        </div>
                        <WhatsappContact />
                    </SmoothScroll>
                </NextIntlClientProvider>

                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-L6T4YCH90X"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-L6T4YCH90X');
                    `}
                </Script>
            </body>
        </html>
    );
}
