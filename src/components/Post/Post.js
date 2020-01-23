// @flow strict
import React from 'react';
// import { Link } from 'gatsby';
// import Author from './Author';
// import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
// import Sidebar from '../Sidebar';
// import Tags from './Tags';
import styles from './Post.module.scss';
import type { Node } from '../../types';

type Props = {
  post: Node
};

const h1Style = {
  textAlign: 'center',
  marginTop: '15px'
};

const h3Style = {
  textAlign: 'center',
  marginTop: '15px',
  paddingTop: '5px',
  paddingBottom: '10px',
  boxShadow: '2px 3px 3px 3px #8DB98A',
  backgroundColor: 'white'
};

const aStyle = {
  fontWeight: 'bold',
  fontSize: '22px',
  color: 'white'
};

const liStyle = {
  color: 'black'
};

function authorPosts(contentArray) {
  const elements = [];
  for (let i = 0; i < 5; i += 1) {
    if (contentArray[i]) {
      elements.push(<a style={liStyle} href={`https://smoke-indica.com${contentArray[i].node.fields.slug}`}>{contentArray[i].node.frontmatter.title}</a>);
      elements.push(<br/>);
    }
  }
  return elements;
}

// //////////////////////

const tagDivLost = {
  lostColumn: '1/3',
  display:'inline-block'
};

const liAStyle = {
  paddingLeft: '5px',
  paddingRight: '5px'
};

const imgStyle = {
  float: 'left',
  paddingRight: '5px'
};

const spanLost = {
  float: 'right'
}

function generateLiElements(currentKeyPosts) {
  const displayedPostPermalinks = [];
  const titleArrayTags = [];
  const aElements = [];

  for (let i = 0; i < 6; i++) {
    // const rnd = Math.floor(Math.random() * currentKeyPosts.length) + 1;
    currentKeyPosts.forEach((item) => {
      const current_item = item.node.frontmatter;
      if (
        !displayedPostPermalinks.includes(item.node.fields.slug)
        && !titleArrayTags.includes(current_item.title)
      ) {
        displayedPostPermalinks.push(item.node.fields.slug);
        titleArrayTags.push(current_item.title);
        if (current_item.images) {
          aElements.push(
            <div style={tagDivLost}><a href={item.node.fields.slug}>
              <img src={`//images.weserv.nl/?url=${(current_item.images)[0]}&w=95&h=95&output=webp`} alt={current_item.title} title={current_item.title} style={imgStyle} />
              <span style={spanLost}>{current_item.title}<br/>By @{current_item.author}</span>
            </a></div>
          );
        } else {
          aElements.push(
            <div style={tagDivLost}><a href={current_item.permalink}>{current_item.title}</a></div>
          );
        }
      }
    });
  }

  return aElements;
}

function tagElement(contentTagPosts) {
  const response = [];
  const keys = Object.keys(contentTagPosts);

  keys.forEach((tagStr) => {
    // Each tag creates following
    response.push(
      <h3><a href={`/tag/${tagStr}`}>Related '{ tagStr }' posts</a></h3>
    );

    // Shuffle array
    const shuffled = contentTagPosts[tagStr].sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    let n_elements = shuffled.length > 6
                      ? 6
                      : shuffled.length;

    let selectedPosts = shuffled.slice(0, n_elements);

    response.push(
      <div style={tagDivStyle}>
        {generateLiElements(selectedPosts)}
      </div>
    );
  });
  return response;
}

////////////////////////

const tagDivStyle = {
  boxShadow: '2px 3px 3px 3px #8DB98A',
  backgroundColor: 'white',
  paddingTop: '10px',
  paddingLeft: '10px',
  paddingRight: '10px',
  marginRight: '10px',
  height: '100%',
};

const sectionStyle = {
  lostUtility: 'clearfix',
  lostCenter: '980px'
}

////////////////////////

const Post = ({
  post, authorArray, contentArray, contentTagPosts
}: Props) => {
  const { html } = post;
  const {
    tagSlugs,
    slug,
    author,
    images,
    net_votes,
    total_payout_value,
    pending_payout_value
  } = post.fields;
  const { tags, title, date } = post.frontmatter;

  return (
    <div className={styles['post']}>
      <a href="/" className={styles['post__home-button']}>Go back</a>
      <div className={styles['post__content']}>
        <Content
          body={html}
          title={title}
          imgsrc={images[0]}
          tags={tags}
          tagSlugs={tagSlugs}
          author={author}
          date={date}
          netVotes={net_votes}
          totalPayoutValue={total_payout_value}
          pendingPayoutValue={pending_payout_value}
          postSlug={slug}
          profile_image={authorArray.profile_image}
          rep={authorArray.reputation}
          about={authorArray.about_author}
        />
      </div>

      <div className={styles['post__footer']}>
        <h3 style={h1Style}>
          <a style={aStyle} href={`https://smoke.io/@${author}${slug}`}>Want to comment on this post?<br/>Head on over to Smoke.io</a><br/>
        </h3>
        <h3 style={h3Style}>
          More content by {author}:<br/>
          {authorPosts(contentArray, author)}
        </h3>
        <section style={sectionStyle}>
          {tagElement(contentTagPosts)}
        </section>
      </div>

    </div>
  );
};

export default Post;
