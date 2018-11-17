module.exports = {
    siteMetadata: {
        title: `nezdmeg.com`
    },
    plugins: [
        'gatsby-plugin-catch-links',
        'gatsby-plugin-react-helmet',
        'gatsby-transformer-remark',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/articles`,
                name: 'articles'
            }
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
                icon: 'static/logo.png'
            }
        }
        // 'gatsby-plugin-offline'
    ]
};
