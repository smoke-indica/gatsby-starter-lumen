// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark } from '../types';

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const PostTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { frontmatter } = data.markdownRemark;
  const { title: postTitle, description: postDescription, socialImage } = frontmatter;
  const metaDescription = postDescription !== null ? postDescription : siteSubtitle;

  return (
    <Layout title={`${postTitle} - ${siteTitle}`} description={metaDescription} >
      <Post post={(data.markdownRemark)} />
    </Layout>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
        images
        author
        net_votes
        total_payout_value
        pending_payout_value
      }
      frontmatter {
        date
        title
        tags
      }
    }
  }
`;

export default PostTemplate;
