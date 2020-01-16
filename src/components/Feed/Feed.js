// @flow strict
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import type { Edges } from '../../types';
import styles from './Feed.module.scss';

type Props = {
  edges: Edges
};

let tag_array = [];

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
          <Link className={styles['feed__item-title-link']} to={edge.node.fields.slug}>
            <img src={"https://images.weserv.nl/?url=" + edge.node.fields.images[0] + "&w=1440&output=webp"} alt="Main article image" />
          </Link>
          <h3 className={styles['feed__item-title']}>
            <Link className={styles['feed__item-title-link']} to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link>
          </h3>
          <p className={styles['feed__item-p']}>
            By <a href={"/author/" + edge.node.fields.author} style={{color:"green"}}>@{edge.node.fields.author}</a><br/>
            Tags: {edge.node.frontmatter.tags.map(tag => <a href={"/tag/" + tag} style={{color:"green"}}>{tag + ", "}</a>)}<br/>
            {edge.node.fields.net_votes} users rewarded @{edge.node.fields.author} {parseInt((edge.node.fields.total_payout_value).replace(' SMOKE','')) + parseInt((edge.node.fields.pending_payout_value).replace(' SMOKE',''))} Smoke for this post.
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default Feed;
