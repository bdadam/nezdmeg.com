const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const fs = require('fs-extra');
const sortBy = require('lodash/sortBy');

const findPages = async () => {
    const articles = await glob('static/data/cikkek/*.json');

    return [...articles.map(f => ({ route: `/cikkek/${path.basename(f, '.json')}` }))];
};

module.exports = {
    modules: [
        [
            '@nuxtjs/pwa',
            {
                meta: {
                    theme_color: '#a00',
                    // lang: 'hu-HU',
                },
                manifest: {
                    name: 'Nézd meg! - nezdmeg.com',
                    short_name: 'Nézd meg!',
                    lang: 'hu',
                },
                icon: {
                    iconSrc: 'static/logo_big.png',
                },
            },
        ],
        '~/modules/content-generator',
        '@nuxtjs/sitemap',
        '@nuxtjs/feed',
    ],
    css: ['~/css/main.scss'],
    head: {
        htmlAttrs: {
            lang: 'hu-HU',
        },
        meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
        link: [
            // {
            //     rel: 'stylesheet',
            //     href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600&amp;subset=latin-ext',
            // },
            // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
    },
    // router: {
    //     extendRoutes(routes, resolve) {
    //         routes.push({
    //             name: 'custom',
    //             path: '/:page',
    //             component: resolve(__dirname, 'pages/index.vue'),
    //         });
    //     },
    // },
    generate: {
        async routes() {
            const routes = await findPages();
            return routes;
        },
        subFolders: false,
    },

    server: {
        port: 3000,
        host: '0.0.0.0',
    },
    sitemap: {
        path: '/sitemap.xml',
        hostname: 'https://nezdmeg.com',
        generate: true,
        async routes() {
            const routes = await findPages();
            return routes.map(r => r.route);
        },
    },
    feed: [
        {
            type: 'rss2',
            path: '/rss.xml', // The route to your feed.
            cacheTime: 1000 * 60 * 15,
            async create(feed) {
                feed.options = {
                    title: 'Nézd meg! (nezdmeg.com)',
                    link: 'https://nezdmeg.com/rss.xml',
                    description: 'A legfrissebb cikkek, videok és érdekességek.',
                    id: 'http://nezdmeg.com/',
                    image: 'https://nezdmeg.com/logo_big.png',
                };

                const articleFiles = await glob('static/data/cikkek/*.json');
                const articles = await Promise.all(
                    articleFiles.map(async file => {
                        const content = await fs.readFile(file, 'utf-8');
                        return JSON.parse(content);
                    })
                );

                // console.log(articles);

                const sortedArticles = sortBy(articles, 'date')
                    .reverse()
                    .slice(0, 40);

                sortedArticles.forEach(article => {
                    feed.addItem({
                        title: article.title,
                        id: `https://nezdmeg.com${article.url}`,
                        link: `https://nezdmeg.com${article.url}`,
                        date: new Date(article.date),
                        description: article.teaser,
                        content: `<h1>${article.title}</h1><p>${article.teaser}</p><p><a href="https://nezdmeg.com${
                            article.url
                        }">Tovább a cikkhez</a></p>`,
                    });
                });
            },
        },
    ],
};
