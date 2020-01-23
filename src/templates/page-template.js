// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata, authorDetails, fetchPosts } from '../hooks';
import type { MarkdownRemark } from '../types';

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const PageTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { html: pageBody,  } = data.markdownRemark;
  const { frontmatter } = data.markdownRemark;
  const { title: pageTitle, description: pageDescription, socialImage, author_page: author_page } = frontmatter;
  const metaDescription = pageDescription !== null ? pageDescription : siteSubtitle;

  const pageTitleNew = author_page
                        ? `${pageTitle}'s profile page`
                        : `${pageTitle}`;

  if (data.markdownRemark.fields.template === 'post' || !author_page) { // normal page
    return (
      <Layout title={`${pageTitle} - ${siteTitle}`} description={metaDescription} socialImage={socialImage} >
        <Sidebar />
        <Page title={pageTitle}>
          <div dangerouslySetInnerHTML={{ __html: pageBody }} />
        </Page>
      </Layout>
    );
  } else {
    return (
      <Layout title={pageTitleNew + ' - ' + siteTitle} description={metaDescription} socialImage={socialImage} >
        <Sidebar />
        <Page title={pageTitleNew}>
          <div />
        </Page>
      </Layout>
    );
  }

};

export const query = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        author
        net_votes
        total_payout_value
        pending_payout_value
      }
      frontmatter {
        title
        date
        tags
        author_page
      }
    }
  }
`;

export default PageTemplate;
