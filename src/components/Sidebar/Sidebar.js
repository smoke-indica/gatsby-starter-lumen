// @flow strict
import React from 'react';
import { withPrefix } from 'gatsby';
import {
  isBrowser,
  isMobile
} from 'react-device-detect';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import { useSiteMetadata } from '../../hooks';

type Props = {
  isIndex?: boolean,
};

const spanCSS = {
  color: 'white',
  verticalAlign: 'middle',
  paddingLeft: '10px'
};

const imgCSS = {
  float: 'left'
};

const h1CSS = {
  marginTop: '5px',
  marginBottom: '0px'
};

const linkCSS = {
  color: 'white',
  fontWeight: 'bold'
};

const linkSpan = {
  marginLeft: '-40px'
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();

  if (isBrowser) {
    return (
        <header>
          <div className={styles['sidebar']}>
            <div className={styles['sidebar__inner']}>
              <Author author={author} isIndex={isIndex} />
              <Menu menu={menu} />
              <Contacts contacts={author.contacts} />
              <Copyright copyright={copyright} />
            </div>
          </div>
        </header>
    );
  }
  return (
        <header>
          <div className={styles['sidebar']}>
            <div className={styles['sidebar__innerMob']}>
              <h2 style={h1CSS}>
                <a href="/">
                  <img
                    src={"/photo.jpg"}
                    width="45"
                    height="45"
                    style={imgCSS}
                  />
                  <span style={spanCSS}>{author.name}</span>
                </a>
              </h2>
              <span style={linkSpan}>
                <a style={linkCSS} href="/">Content</a> <a style={linkCSS} href="/pages/about">About</a> <a style={linkCSS} href="/pages/related">Related</a> <a style={linkCSS} href="/pages/insights">Insights</a> <a style={linkCSS} href="/pages/explorers">Explorers</a>
              </span>
            </div>
          </div>
        </header>
  );
};

export default Sidebar;
