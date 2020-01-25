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
import { useSiteMetadata, fetchPosts } from '../../hooks';

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

const spanCSS2 = {
  float: 'right',
  paddingLeft:'10px',
  paddingRight:'10px'
};

const h2Style = {
  marginTop:'0px',
  paddingLeft:'0px',
  paddingRight:'10px'
};

const aCSS = {
  paddingLeft: '5px',
  fontWeight: '550'
};

function mostRewardedAuthors (postResults) {
  var authors = {};
  postResults.forEach(item => {
    var pending_payout_value = 0;
    var total_payout_value = 0;
    var sum_payout = 0;
    const current_item = item.node.frontmatter;

    if ((current_item.hasOwnProperty('pending_payout_value')) && (current_item.hasOwnProperty('total_payout_value'))) {
      total_payout_value = parseInt((current_item.total_payout_value).replace(" SMOKE", ""));
      pending_payout_value = parseInt((current_item.pending_payout_value).replace(" SMOKE", ""));
      sum_payout = total_payout_value + pending_payout_value;

      if (current_item.author in authors) {
        authors[current_item.author] += sum_payout;
      } else {
        authors[current_item.author] = sum_payout;
      }
    }
  });

  var sorted_authors = Object.keys(authors).sort(function(a,b){return authors[b]-authors[a]});
  let response = [];
  sorted_authors.forEach((sorted_author, i) => {
    if (i < 10) {
      response.push(<tr><td>{i+1 + " "}</td><td><a href={"/" + sorted_author}>{sorted_author.toUpperCase()}</a></td><a href={"https://smoke.io/@" + sorted_author}>🏠</a></tr>);
    }
  })
  return response;
}

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();

  const postResults = fetchPosts();
  const mostRewardedAuthorsRes = mostRewardedAuthors(postResults);

  if (isBrowser) {
    return (
        <header>
          <div className={styles['sidebar']}>
            <div className={styles['sidebar__inner']}>
              <Author author={author} isIndex={isIndex} />
              <Menu menu={menu} />
              <Contacts contacts={author.contacts} />
              <Copyright copyright={copyright} />
              <h4 style={h2Style}>Top authors</h4>
              <table style={{'boxShadow': '2px 3px 3px 3px #8DB98A','backgroundColor': 'white'}}>
                {mostRewardedAuthorsRes}
              </table>
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
