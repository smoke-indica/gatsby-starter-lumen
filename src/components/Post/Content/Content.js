// @flow strict
import React from 'react';
import styles from './Content.module.scss';
import Tags from '../Tags';

type Props = {
  body: string,
  title: string,
  imgsrc: string,
  tags: string,
  tagSlugs: string
};

const imgCSS = {
  minWidth:'100%'
};

const Content = ({ body, title, imgsrc, tags, tagSlugs }: Props) => (
  <div className={styles['content']}>
    <img src={imgsrc} style={imgCSS} alt="main image"/>
    <h1 className={styles['content__title']}>{title}</h1>
    {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
    <hr/>
    <div className={styles['content__body']} dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default Content;
