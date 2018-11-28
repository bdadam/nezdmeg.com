module.exports = {
    siteMetadata: {
        title: 'nezdmeg.com',
        siteUrl: 'https://www.nezdmeg.com',
    },
    plugins: [
        'gatsby-plugin-catch-links',
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-external-links',
                        options: {
                            target: '_blank',
                            rel: 'nofollow noopener noreferrer',
                        },
                    },
                    {
                        resolve: 'gatsby-remark-embed-video',
                        options: {
                            // width: 800,
                            // ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
                            // height: 400, // Optional: Overrides optional.ratio
                            related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
                            // noIframeBorder: true //Optional: Disable insertion of <style> border: 0
                        },
                    },
                    'gatsby-remark-responsive-iframe',
                ],
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/articles`,
                name: 'articles',
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'Nezdmeg.com',
                short_name: 'Nezdmeg',
                start_url: '/?pwa',
                background_color: '#6b37bf',
                theme_color: '#a00',
                display: 'minimal-ui',
                icon: 'static/logo.png',
            },
        },
        // 'gatsby-plugin-offline',
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                query: `
                    {
                    site {
                        siteMetadata {
                        siteUrl
                        }
                    }
                    allSitePage {
                        edges {
                        node {
                            path
                        }
                        }
                    }
                }`,
                output: `/sitemap.xml`,
                exclude: [`/dev-404-page`, `/404`, `/404.html`, `/offline-plugin-app-shell-fallback`],
                createLinkInHead: true,
                serialize: ({ site, allSitePage }) =>
                    allSitePage.edges.map(edge => {
                        return {
                            url: site.siteMetadata.siteUrl + edge.node.path,
                            // changefreq: `daily`,
                            // priority: 0.7
                        };
                    }),
            },
        },
    ],
};
