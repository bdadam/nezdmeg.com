const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const findPages = async () => {
    const articles = await glob('static/data/cikkek/*.json');

    return [
        // { route: '/' },
        // { route: '/impresszum.html' },

        ...articles.map(f => ({ route: `/cikkek/${path.basename(f, '.json')}` })),
    ];
};

module.exports = {
    modules: ['@nuxtjs/sitemap', '~/modules/content-generator'],
    css: ['~/css/main.scss'],
    head: {
        meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
        link: [
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
            console.log('Generating...');
            const routes = await findPages();
            console.log(routes);
            return routes;
        },
        subFolders: false,
    },
};
