import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://taw10.ma';
    const locales = ['fr', 'ar', 'en'];
    const pages = ['', '/about', '/contact', '/services'];

    const entries: MetadataRoute.Sitemap = [];

    locales.forEach((locale) => {
        pages.forEach((page) => {
            entries.push({
                url: `${baseUrl}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: page === '' ? 1 : 0.8,
            });
        });
    });

    return entries;
}
