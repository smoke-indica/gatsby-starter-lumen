// @flow strict
import { useStaticQuery, graphql } from 'gatsby';

const authorDetails = () => {
  const data = useStaticQuery(graphql`
    {allMarkdownRemark(filter: {frontmatter: {author_page: {eq: true}}}) {
      edges {
        node {
          frontmatter {
            author_page
            title
            cover_image
            post_count
            profile_image
            reputation
            about_author
          }
        }
      }
    }}
  `);
  return data.allMarkdownRemark.edges;
};

export default authorDetails;
