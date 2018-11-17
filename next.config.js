const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');

const nextOptions = {
    exportPathMap: async () => {
        await Promise.resolve();
        return {
            '/': { page: '/' },
            '/cikkek/1': { page: '/article' }
        };
    },
    useFileSystemPublicRoutes: false
};

module.exports = withPlugins([[sass]], nextOptions);
