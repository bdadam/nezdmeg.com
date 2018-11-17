const path = require('path');

const speakingurl = require('speakingurl');

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const slug = node.frontmatter.slug || speakingurl(node.frontmatter.title, { lang: 'hu' });

        createNodeField({
            node,
            name: `path`,
            value: `/cikkek/${slug}/`
        });
    }
};

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;

    const articleTemplate = path.resolve(`src/templates/article.js`);

    const result = await graphql(`
        {
            allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
                edges {
                    node {
                        fields {
                            path
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        throw result.errors;
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: `${node.fields.path}`,
            component: articleTemplate,
            context: {}
        });
    });

    return result;
};
