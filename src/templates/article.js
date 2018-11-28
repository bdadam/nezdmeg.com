import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';

export default function Template({ data }, x) {
    const { markdownRemark: post } = data;
    return (
        <div className="blog-post-container">
            <Link to="/">Home</Link>
            <Helmet>
                <title>{post.frontmatter.title}</title>
                <link rel="canonical" href={`https://www.nezdmeg.com${post.fields.path}`} />
                <meta property="og:site_name" content="Nézd meg!" />
                <meta property="og:locale" content="hu_HU" />
            </Helmet>
            <div className="blog-post">
                <h1>{post.frontmatter.title}</h1>
                <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.frontmatter.teaser }} />
                <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </div>
    );
}

export const pageQuery = graphql`
    query BlogPostBySlug($path: String!) {
        markdownRemark(fields: { path: { eq: $path } }) {
            html
            fields {
                path
            }
            frontmatter {
                title
                teaser
                #date(formatString: "MMMM DD, YYYY")
            }
        }
    }
`;
