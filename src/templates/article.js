import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';

export default function Template({ data }) {
    const { markdownRemark: post } = data;
    return (
        <div className="blog-post-container">
            <Link to="/">Home</Link>
            <Helmet>
                <title>TITLE: {`${post.frontmatter.title}`}</title>
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
            frontmatter {
                #date(formatString: "MMMM DD, YYYY")
                title
                teaser
            }
        }
    }
`;
