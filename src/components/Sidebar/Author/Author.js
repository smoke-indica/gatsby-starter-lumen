// @flow strict
import React from 'react';
import { withPrefix, Link } from 'gatsby';
import styles from './Author.module.scss';

type Props = {
  author: {
    name: string,
    bio: string,
    photo: string
  },
  isIndex: ?boolean
};

const Author = ({ author, isIndex }: Props) => (
  <div className={styles['author']}>
    <h1 className={styles['author__title']}>
      <Link to="/">
        <img
          src={"/photo.jpg"}
          className={styles['author__photo']}
          width="45"
          height="45"
          alt={author.name}
        />
      </Link>
      <Link className={styles['author__title-link']} to="/">{author.name}</Link>
    </h1>
  </div>
);

export default Author;
