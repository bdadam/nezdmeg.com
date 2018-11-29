const findPages = () =>
    Promise.resolve([
        { route: '/', payload: { qwe: 'asd' } },
        { route: '/abc', payload: { qwe: 'asd' } },
        { route: '/def', payload: { qwe: 'asd' } },
        { route: '/ghi', payload: { qwe: 'asd' } },
        { route: '/jkl', payload: { qwe: 'asd' } },
    ]);

module.exports = {
    modules: ['@nuxtjs/sitemap', '~/modules/content-generator'],
    head: {
        meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
        link: [
            // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
    },
    router: {
        extendRoutes(routes, resolve) {
            routes.push({
                name: 'custom',
                path: '/:page',
                component: resolve(__dirname, 'pages/index.vue'),
            });
        },
    },
    generate: {
        async routes() {
            console.log('Generating...');
            const routes = await findPages();
            console.log(routes);
            return routes;
        },
    },
};
