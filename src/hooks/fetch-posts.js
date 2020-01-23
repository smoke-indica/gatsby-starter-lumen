// @flow strict
import { useStaticQuery, graphql } from 'gatsby';

const fetchPosts = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: {frontmatter: {draft: {eq: false}, template: {eq: "post"}}}) {
        edges {
          node {
            frontmatter {
              author
              title
              date
              net_votes
              pending_payout_value
              tags
              total_payout_value
            }
            fields {
              slug
              images
            }
          }
        }
      }
    }
  `);
  return data.allMarkdownRemark.edges;
};

export default fetchPosts;
