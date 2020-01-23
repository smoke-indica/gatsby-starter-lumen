// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useSiteMetadata, authorDetails, fetchPosts } from '../hooks';
import type { MarkdownRemark } from '../types';

type Props = {
  data: {
    markdownRemark: MarkdownRemark,
  }
};

function getTagPosts(postResults, tags) {
  const tagPosts = {};
  postResults.forEach((currentPost) => {
    tags.forEach((currentTag) => {
      if (currentPost.node.frontmatter.tags.includes(currentTag)) {
        if (tagPosts[currentTag]) {
          tagPosts[currentTag].push(currentPost);
        } else {
          tagPosts[currentTag] = [currentPost];
        }
      }
    });
  });

  return tagPosts;
}

const PostTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { frontmatter } = data.markdownRemark;
  const authorResult = authorDetails();
  const postResults = fetchPosts();
  const { title: postTitle, description: postDescription } = frontmatter;
  const metaDescription = postDescription !== null ? postDescription : siteSubtitle;

  const tempResult = authorResult.filter((a) => {
    if (a.node.frontmatter.title === data.markdownRemark.fields.author) {
      return true;
    }
    return false;
  })[0].node.frontmatter;

  const contentResult = postResults.filter((b) => {
    if (b.node.frontmatter.author === data.markdownRemark.fields.author) {
      return true;
    }
    return false;
  });

  const tagPostArray = getTagPosts(
    postResults,
    data.markdownRemark.frontmatter.tags
  );

  return (
    <Layout title={`${postTitle} - ${siteTitle}`} description={metaDescription} >
      <Post
        post={(data.markdownRemark)}
        authorArray={(tempResult)}
        contentArray={(contentResult)}
        contentTagPosts={(tagPostArray)}
      />
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
