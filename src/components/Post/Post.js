// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Sidebar from '../Sidebar';
import Tags from './Tags';
import styles from './Post.module.scss';
import type { Node } from '../../types';

type Props = {
  post: Node
};

const h1Style = {
  textAlign:'center',
  marginTop:'15px'
};

const aStyle = {
  fontWeight:'bold',
  fontSize:'22px',
  color:'white'
};

const Post = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, slug, author, images } = post.fields;
  const { tags, title, date } = post.frontmatter;

  return (
    <div className={styles['post']}>
      <a href="/" className={styles['post__home-button']}>Go back</a>

      <div className={styles['post__content']}>
      <Meta date={date} />
        <Content body={html} title={title} imgsrc={images[0]} tags={tags} tagSlugs={tagSlugs} />
      </div>

      <div className={styles['post__footer']}>
        <h1 style={h1Style}>
        <a style={aStyle} href={"https://smoke.io/@" + author + slug}>Want to comment on this post?<br/>Head on over to Smoke.io!</a>
        </h1>
      </div>
    </div>
  );
};

export default Post;
