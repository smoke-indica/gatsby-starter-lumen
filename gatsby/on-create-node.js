'use strict';

const _ = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem');

const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    if (typeof node.frontmatter.slug !== 'undefined') {
      const dirname = getNode(node.parent).relativeDirectory;
      createNodeField({
        node,
        name: 'slug',
        value: `/${dirname}/${node.frontmatter.slug}`
      });
    } else {
      const value = createFilePath({ node, getNode });
      createNodeField({
        node,
        name: 'slug',
        value
      });
    }

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map((tag) => `/tag/${_.kebabCase(tag)}/`);
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs });
      const tags = node.frontmatter.tags.map((tag) => tag);
      createNodeField({ node, name: 'tags', value: tags });
    }

    /*
    if (node.frontmatter.category) {
      const categorySlug = `/category/${_.kebabCase(node.frontmatter.category)}/`;
      createNodeField({ node, name: 'categorySlug', value: categorySlug });
    }
    */

    if (node.frontmatter.images) {
      createNodeField({ node, name: 'images', value: node.frontmatter.images });
    }

    if (node.frontmatter.author) {
      createNodeField({ node, name: 'author', value: node.frontmatter.author });
    }

    if (node.frontmatter.net_votes) {
      createNodeField({ node, name: 'net_votes', value: node.frontmatter.net_votes });
    }

    if (node.frontmatter.total_payout_value) {
      createNodeField({ node, name: 'total_payout_value', value: node.frontmatter.total_payout_value });
    }

    if (node.frontmatter.pending_payout_value) {
      createNodeField({ node, name: 'pending_payout_value', value: node.frontmatter.pending_payout_value });
    }
  }
};

module.exports = onCreateNode;
