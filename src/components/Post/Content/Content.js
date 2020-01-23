// @flow strict
import React from 'react';
import moment from 'moment';
import styles from './Content.module.scss';
// import Tags from '../Tags';

import {
  isBrowser,
  isMobile
} from 'react-device-detect';

type Props = {
  body: string,
  title: string,
  imgsrc: string,
  author: string,
  tags: string,
  tagSlugs: string,
  date: string,
  netVotes: string,
  totalPayoutValue: string,
  pendingPayoutValue: string,
  postSlug: string
};

const imgCSS = {
  minWidth: '100%',
  paddingTop: '0px'
};

let titleCSS;
if (isBrowser) {
  titleCSS = {
    fontSize: '32px',
    marginTop: '0px',
    marginBottom: '0px',
    paddingLeft:'26px'
  };
} else if (isMobile) {
  titleCSS = {
    fontSize: '32px',
    marginTop: '0px',
    marginBottom: '0px',
    paddingLeft:'0px'
  };
}

let subtitleCSS;
if (isBrowser) {
  subtitleCSS = {
    marginTop: '0px',
    marginBottom: '0px',
    fontWeight: '500',
    paddingLeft:'26px'
  };
} else if (isMobile) {
  subtitleCSS = {
    marginTop: '0px',
    marginBottom: '0px',
    fontWeight: '500',
    paddingLeft:'0px'
  };
}

const hrCSS = {
  marginTop: '20px',
  marginBottom: '0px'
};

const Content = ({
  body, title, imgsrc, tags, author, date, netVotes, totalPayoutValue, pendingPayoutValue, postSlug
}: Props) => (
  <div className={styles['content']}>
    <img src={"https://images.weserv.nl/?url=" + imgsrc + "&w=960&output=webp"} style={imgCSS} alt="main image"/>
    <h1 style={titleCSS}>{title}</h1>
    <h2 style={subtitleCSS}>
      By <a href={`/${author}`}>@{author}</a> on {moment(date).format('D MMM YYYY')}.<br/>
      Tags: {tags.map((tag) => <a href={`/tag/${tag}`} style={{ color: 'green' }}>{`${tag}, `}</a>)}<br/>
      {netVotes} users rewarded @{author} {parseInt((totalPayoutValue).replace(' SMOKE', ''), 10) + parseInt((pendingPayoutValue).replace(' SMOKE', ''), 10)} Smoke for this post.<br/>
      <a href={`https://smoke.io/@${author}${postSlug}`}>Read on smoke.io</a>, <a href={`https://twitter.com/intent/tweet?url=https://smoke-indica.com/${author}/&text=${title} - ${author}&hashtags=${tags.join(',')}`}>Share on Twitter</a>, <a href={`https://reddit.com/submit?url=https://smoke-indica.com/${author}/&title=${title} - ${author} - ${tags.join(', ')}`}>Submit to Reddit</a>
    </h2>
    <hr style={hrCSS} />
    <div className={styles['content__body']} dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default Content;
