/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://taw10.ma',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'weekly',
    priority: 0.8,
    exclude: ['/private/*', '/admin/*'],
    alternateRefs: [
        {
            href: 'https://taw10.ma/fr',
            hreflang: 'fr',
        },
        {
            href: 'https://taw10.ma/ar',
            hreflang: 'ar',
        },
        {
            href: 'https://taw10.ma/en',
            hreflang: 'en',
        },
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/private/', '/admin/'],
            },
        ],
        additionalSitemaps: [
            'https://taw10.ma/sitemap.xml',
        ],
    },
}
