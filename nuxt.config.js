const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const findPages = async () => {
    const articles = await glob('static/data/cikkek/*.json');

    return [...articles.map(f => ({ route: `/cikkek/${path.basename(f, '.json')}` }))];
};

module.exports = {
    modules: [
        '@nuxtjs/sitemap',
        [
            '@nuxtjs/pwa',
            {
                manifest: {
                    name: 'Nézd meg!',
                    lang: 'hu',
                },
            },
        ],
        '~/modules/content-generator',
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
};
