// @flow strict
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import type { Edges } from '../../types';
import styles from './Feed.module.scss';

type Props = {
  edges: Edges
};

function imgElement (image_src, post_src) {
  if (image_src) {
    return (
      <Link className={styles['feed__item-title-link']} to={post_src}>
        <img src={`https://images.weserv.nl/?url=${image_src[0]}&w=960&output=webp&we`} alt="Main article image" />
      </Link>
      )
  }
}

const Feed = ({ edges }: Props) => (
  <div className={styles['feed']}>
    {edges.map((edge) => (
      <div className={styles['feed__item']} key={edge.node.fields.slug}>
        <div className={styles['feed__item-meta']}>
          <time className={styles['feed__item-meta-time']} dateTime={moment(edge.node.frontmatter.date).format('MMMM D, YYYY')}>
            {moment(edge.node.frontmatter.date).format('DD MMMM YYYY')}
          </time>
          <span className={styles['feed__item-meta-divider']} />
          <span className={styles['feed__item-meta-category']}>
            <Link to={edge.node.fields.categorySlug} className={styles['feed__item-meta-category-link']}>{edge.node.frontmatter.category}</Link>
          </span>
        </div>
        <div className={styles['feed__item-content']}>
          {imgElement(edge.node.fields.images, edge.node.fields.slug)}
          <h3 className={styles['feed__item-title']}>
            <Link className={styles['feed__item-title-link']} to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link>
          </h3>
          <p className={styles['feed__item-p']}>
            By <a href={`/${edge.node.fields.author}`} style={{ color: 'green' }}>@{edge.node.fields.author}</a><br/>
            Tags: {edge.node.frontmatter.tags.map((tag) => <a href={`/tag/${tag}`} style={{ color: 'green' }}>{`${tag}, `}</a>)}<br/>
            {edge.node.fields.net_votes} users rewarded @{edge.node.fields.author} {parseInt((edge.node.fields.total_payout_value).replace(' SMOKE', '')) + parseInt((edge.node.fields.pending_payout_value).replace(' SMOKE', ''))} Smoke for this post.
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default Feed;
