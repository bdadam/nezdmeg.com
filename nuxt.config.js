const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));

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
                    name: 'Nézd meg!',
                    lang: 'hu',
                },
                icon: {
                    iconSrc: 'static/logo_big.png',
                },
            },
        ],
        '~/modules/content-generator',
        '@nuxtjs/sitemap',
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
};
